import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';
import assert from 'node:assert/strict';
import {frontmatter,renderMarkdown} from './lib.mjs';
import {calculations} from './calculations.mjs';
import {symetrixMatrixV01} from './symetrix.mjs';
import {symetrixMatrixV02} from './symetrix-v02.mjs';
import {symetrixMatrixV03} from './symetrix-v03.mjs';
import {evidenceCoverage} from './evidence.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist');
const meta=JSON.parse(await readFile(path.join(dist,'build-meta.json'),'utf8'));
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]))).flat();}
const files=await walk(dist), htmls=new Map();
const normalize=s=>s.replace(/\s+/g,' ').trim();
for(const file of files){if(!file.endsWith('.html'))continue;const html=await readFile(file,'utf8');assert(!/\/Users\/|\/Volumes\/|chatgpt-content-reference|keskustelu-raaka|gho_[A-Za-z0-9]/.test(html),`Private data in ${file}`);const $=load(html);assert.equal($('html').attr('lang'),'fi');assert.equal($('h1').length,1);assert.equal($('main').length,1);assert.equal($('meta[property="og:image"]').attr('content'),meta.origin+meta.basePath+'/assets/og.png');const ids=new Set();$('[id]').each((_,el)=>{const id=$(el).attr('id');assert(!ids.has(id),`Duplicate ${id} in ${file}`);ids.add(id);});let previous=0;$('h1,h2,h3,h4,h5,h6').each((_,el)=>{const level=Number(el.tagName[1]);assert(level<=previous+1,`Heading jump ${previous}->${level}: ${$(el).text()} in ${file}`);previous=level;});htmls.set(file,{$,ids});}
let checked=0;
for(const [file,{$}] of htmls){for(const el of $('a[href],link[href],script[src],img[src]').toArray()){const href=$(el).attr('href')||$(el).attr('src');if(!href||/^(https?:|mailto:)/.test(href))continue;assert(!/^(javascript:|data:|file:|\/\/)/i.test(href),'Unsafe URL');const pagePath='/'+path.relative(dist,file).split(path.sep).join('/');const target=new URL(href,'https://local.test'+meta.basePath+pagePath);assert(!meta.basePath||target.pathname.startsWith(meta.basePath+'/'),`Missing base path: ${href}`);let relative=decodeURIComponent(target.pathname.slice(meta.basePath.length));if(relative.endsWith('/'))relative+='index.html';const full=path.join(dist,relative);assert(files.includes(full),`Missing file ${href} from ${pagePath}`);if(target.hash){assert(htmls.get(full)?.ids.has(decodeURIComponent(target.hash.slice(1))),`Missing anchor ${href} from ${pagePath}`);}checked++;}}
// Public citations must point to original sources, not internal source-registry anchors or private working-paper paths.
const publicMarkdownFiles=[
  ...(await readdir(path.join(root,'content'))).filter(f=>f.endsWith('.md')).map(f=>path.join(root,'content',f)),
  ...(await readdir(path.join(root,'content/questions'))).filter(f=>f.endsWith('.md')).map(f=>path.join(root,'content/questions',f))
];
for(const file of publicMarkdownFiles){
  const text=await readFile(file,'utf8');
  assert(!/\/analyysit\/datakeskukset\/lahteet\/#(?:S\d+|D\d+)/.test(text),`Internal source-registry citation in ${file}`);
  assert(!/\]\(#(?:S\d+|D\d+)\)/.test(text),`Internal source anchor in ${file}`);
  assert(!/datakeskusaudit-v\d|keskusteluarkisto/i.test(text),`Internal background-material reference in ${file}`);
}
const publicSources=JSON.parse(await readFile(path.join(root,'data/sources.json'),'utf8'));
for(const source of publicSources){
  assert(/^https?:\/\//.test(source.url),`Source ${source.id} must link to an original external URL`);
  assert(!Object.hasOwn(source,'provenance'),`Public source ${source.id} must not expose internal provenance`);
}
const sourceIds=new Set(publicSources.map(s=>s.id));
const evidenceRaw=await readFile(path.join(root,'data/evidence-index.jsonl'),'utf8');
const evidence=evidenceRaw.trim().split(/\n+/).filter(Boolean).map((line,i)=>{
  try{return JSON.parse(line);}catch(error){throw new Error(`Invalid evidence JSONL line ${i+1}: ${error.message}`);}
});
assert(evidence.length>=45,'Evidence ledger unexpectedly small');
const evidenceIds=new Set();
for(const item of evidence){
  assert(item.id && !evidenceIds.has(item.id),`Duplicate or missing evidence id: ${item.id}`);
  evidenceIds.add(item.id);
  assert(item.entity && item.domain && item.metric && item.status && item.boundary,`Incomplete evidence item: ${item.id}`);
  assert(Array.isArray(item.sourceRefs) && item.sourceRefs.length>0,`Evidence sourceRefs missing: ${item.id}`);
  for(const ref of item.sourceRefs) assert(sourceIds.has(ref),`Evidence ${item.id} references missing source ${ref}`);
  if(Object.hasOwn(item,'value')) assert(Number.isFinite(item.value),`Evidence value must be numeric: ${item.id}`);
}

// Canonical Markdown text must survive into the page, including all question bodies.
for(const file of (await readdir(path.join(root,'content'))).filter(f=>f.endsWith('.md'))){const {meta:p,body}=frontmatter(await readFile(path.join(root,'content',file),'utf8'));const dest=path.join(dist,p.route,'index.html');const actual=normalize(htmls.get(dest).$('main').text());const expected=load(renderMarkdown(body,meta.basePath).html);expected('p,td,th,h2,h3,li').each((_,el)=>{assert(actual.includes(normalize(expected(el).text())),`Markdown mismatch ${file}: ${expected(el).text().slice(0,80)}`);});}
for(let i=1;i<=11;i++){const id='A'+String(i).padStart(2,'0');const {body}=frontmatter(await readFile(path.join(root,'content/questions',id+'.md'),'utf8'));const $=htmls.get(path.join(dist,'analyysit/datakeskukset/vaiteet/index.html')).$;assert.equal($('#'+id).length,1);const expected=load(renderMarkdown(body,meta.basePath).html);assert(normalize($('#'+id).text()).includes(normalize(expected.text())),`Question body mismatch ${id}`);}
const report=await readFile(path.join(dist,'downloads/datakeskukset.md'),'utf8');for(const id of ['A01','A11','S001','S071','D08'])assert(report.includes(id));assert(!/\/Users\/|\/Volumes\/|chatgpt-content-reference/.test(report));
const c=calculations();assert.equal(c.tuike.output.ebitda,'344.6244');assert.equal(c.tuike.output.ebitdaMinusEbit,'314.3194');assert.equal(c.tuike.output.revenueMinusEbitda,'229.7496');assert.equal(c.kemiIllustration.status,'johdettu havainnollistus, ei mitattu verkkotase');assert.equal(c.kemiIllustration.output.impliedOwnConsumption,0.8);assert.equal(c.kemiIllustration.output.arithmeticProductionMinusConsumption,1.2);assert.equal(c.structuralComparison.status,'rakenteellinen vertailu, ei tuottavuus- tai yhteiskuntahyötymittari');
const calcPage=htmls.get(path.join(dist,'analyysit/datakeskukset/lahteet/index.html')).$.text();for(const value of ['344,6','314,3','0,8','+1,2','4,786','2,872','1,018','0,478','0,302','53,0'])assert(calcPage.includes(value),`Displayed calculation mismatch: ${value}`);
const sx=symetrixMatrixV01();
assert.equal(sx.lenses.capitalThroughput.entities.tuike.score,100);
assert.equal(sx.lenses.capitalThroughput.entities.ferrochrome.score,0);
assert.equal(sx.lenses.employmentIntensity.entities.tuike.score,0);
assert.equal(sx.lenses.employmentIntensity.entities.ferrochrome.score,100);
assert.equal(sx.lenses.reportedWorkforceScale.entities.kemi.score,53.9);
assert.equal(sx.lenses.gridIndependence.entities.kemi.score,100);
assert.equal(sx.strict.scoreableCrossIndustryLenses,0);
const sxPage=htmls.get(path.join(dist,'analyysit/datakeskukset/symetrix/index.html')).$.text();
for(const value of ['Symetrix Matrix v0.3','Taloudellinen volyymi / työpanos','Työllistävyys suhteessa volyymiin','73 P','27 P','74','61 P','100 E*','96','63','Pre-op','Kontekstirivit','0,87 TWh','13,2 Mm³/v','80 Mm³/v','0,0014 L/kWh IT','25,1 m³/M€','5 670 m³/M€'])assert(sxPage.includes(value),`Displayed Symetrix mismatch: ${value}`);
const sxDetails=htmls.get(path.join(dist,'analyysit/datakeskukset/symetrix-mittarit/index.html')).$.text();
for(const value of ['Pisteytyksen perussääntö','0,386 M€/henkilötyövuosi','Metsä Fibre -liiketoiminnan proxy','PUE − 1','0,45 L/kWh','250 %','Candidate metrics','2 500','600 ha','1,5 M€','Evidenssin kattavuus','3 D + 2 Q','Työllisyyden systeemirajat E0–E3','4,2','8 000 Q','Scope jump','10×','17,6× Q','kaninkolo','Haminan sähkö','0,87 TWh/v','13 200 000 m³/v','1 160×','80 miljoonaa m³/v','0,0014 L/kWh IT','100 E*','Resurssivirran neljä ulottuvuutta','Vesi suhteessa liikevaihtoon','25,1 m³/M€','5 670 m³/M€','225×','226×','Denominator Engine v0.1'])assert(sxDetails.includes(value),`Displayed Symetrix details mismatch: ${value}`);
const sxDownload=JSON.parse(await readFile(path.join(dist,'downloads/symetrix-v0.1.json'),'utf8'));
assert.equal(sxDownload.version,'0.1');
const sx2=symetrixMatrixV02();
assert.equal(sx2.lenses.capitalThroughput.entities.tuike.score,91.4);
const sx3=symetrixMatrixV03();
assert.equal(sx3.metrics.economicThroughput.scores.kemi,72.7);
assert.equal(sx3.metrics.employmentIntensity.scores.kemi,27.3);
assert.equal(sx3.metrics.waterEfficiency.scores.tuike,100);
assert.equal(sx3.matrix.waterEfficiency.tuike.evidence,'estimate_non_seawater_mixed_period');
assert.equal(sx3.matrix.dataCenterFacilityEfficiency.kemi.state,'not-applicable');
const sx3Download=JSON.parse(await readFile(path.join(dist,'downloads/symetrix-v0.3.json'),'utf8'));
assert.equal(sx3Download.version,'0.3');
assert.equal(Number(sx3Download.baselines.turnoverPerWorkforce.value.toFixed(3)),0.386);
assert(report.includes('Symetrix Matrix v0.3'),'Long report missing Symetrix v0.3 chapter');
const evidenceJson=JSON.parse(await readFile(path.join(dist,'downloads/evidence-index.json'),'utf8'));
assert.equal(evidenceJson.length,evidence.length,'Evidence JSON download mismatch');
const evidenceJsonl=await readFile(path.join(dist,'downloads/evidence-index.jsonl'),'utf8');
assert.equal(evidenceJsonl.trim().split(/\n+/).length,evidence.length,'Evidence JSONL download mismatch');
assert(evidenceJson.some(x=>x.id==='EV-HAM-WATER-003'&&x.value===0.3));
assert(evidenceJson.some(x=>x.id==='EV-FC-FIN-001'&&x.value===462));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-ENERGY-002'&&x.value===250));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WORK-004'&&x.value===2500));
assert(evidenceJson.some(x=>x.id==='EV-HAM-TAX-001'&&x.value===1.5));
assert(evidenceJson.some(x=>x.id==='EV-TORNIO-LAND-001'&&x.value===600));
assert(evidenceJson.some(x=>x.id==='EV-HAM-POWER-001'&&x.value===870));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATER-002'&&x.value===13.2));
assert(evidenceJson.some(x=>x.id==='EV-HAM-WATER-004'&&x.value===80));
assert(evidenceJson.some(x=>x.id==='EV-HAM-WATER-006'&&x.value===0.00144));
assert(evidenceJson.some(x=>x.id==='EV-HAM-WATERREV-001'&&Math.abs(x.value-25.085)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATERREV-001'&&Math.abs(x.value-5669.4)<0.01));
assert(evidenceJson.some(x=>x.id==='EV-WATERREV-GAP-001'&&Math.abs(x.value-226.0)<0.01));
const coverage=evidenceCoverage(evidence);
assert.equal(coverage.coverage.hamina.water.direct,3);
assert.equal(coverage.coverage.kemi.energy.direct,2);
assert.equal(coverage.coverage.kemi.energy.derived,2);
assert.equal(coverage.coverage.outokumpu.land.direct,2);
const coverageDownload=JSON.parse(await readFile(path.join(dist,'downloads/evidence-coverage.json'),'utf8'));
assert.equal(coverageDownload.coverage.hamina.water.direct,3,'Evidence coverage download mismatch');
assert.equal(coverageDownload.coverage.outokumpu.finance.direct,4,'Evidence coverage download mismatch');
const metricRegistry=JSON.parse(await readFile(path.join(dist,'downloads/metric-registry.json'),'utf8'));
assert.equal(metricRegistry.version,'0.1');
assert(metricRegistry.metrics.some(x=>x.id==='domestic_value_added_per_grid_energy'&&x.readiness==='blocked_high_priority'));
assert(metricRegistry.metrics.some(x=>x.id==='capital_per_site_worker'&&x.readiness==='illustrative_only'));
assert(metricRegistry.metrics.some(x=>x.id==='employment_scope_jump'&&x.readiness==='descriptive_ready_partial'));
assert(metricRegistry.metrics.some(x=>x.id==='non_seawater_water_intensity_proxy'&&x.readiness==='estimate_scoreable_with_flag'));
assert(metricRegistry.metrics.some(x=>x.id==='datacenter_water_efficiency'&&x.readiness==='scoreable_with_estimate_flag'));
assert(metricRegistry.metrics.some(x=>x.id==='water_withdrawal_per_revenue'&&x.readiness==='descriptive_ready_partial'));
assert(metricRegistry.metrics.some(x=>x.id==='water_consumption_per_revenue'&&x.readiness==='descriptive_ready_single_entity'));
const employmentBoundaries=JSON.parse(await readFile(path.join(dist,'downloads/employment-boundaries.json'),'utf8'));
assert.equal(employmentBoundaries.version,'0.1');
assert.equal(employmentBoundaries.entity_map.hamina.E1.value,500);
assert.equal(employmentBoundaries.entity_map.kemi.E2.value,2500);
assert.equal(employmentBoundaries.entity_map.outokumpu.E3.value,8000);
assert.equal(employmentBoundaries.derived_descriptive.find(x=>x.id==='site_to_own_workforce_ratio').values.hamina,4.17);
assert.equal(employmentBoundaries.scope_jump_analysis.ratios.find(x=>x.id==='E2_over_E0').values.kemi,10);
assert.equal(employmentBoundaries.scope_jump_analysis.ratios.find(x=>x.id==='E3_over_E0').values.outokumpu,17.62);
const resourceScenarios=JSON.parse(await readFile(path.join(dist,'downloads/energy-water-scenarios.json'),'utf8'));
assert.equal(resourceScenarios.hamina_electricity.anchor.annual_GWh,870);
assert.equal(resourceScenarios.hamina_electricity.derived.average_total_load_MW,99.3);
assert.equal(resourceScenarios.water_scope_jump.kemi.derived_design_proxy_m3_per_year,13200000);
assert.equal(resourceScenarios.water_scope_jump.descriptive_ratio.kemi_design_proxy_over_hamina_reported_withdrawal,1162);
assert.equal(resourceScenarios.water_scope_jump.hamina.seawater_cooling.permit_ceiling_m3_per_year,80000000);
assert.equal(resourceScenarios.water_scope_jump.descriptive_ratio.hamina_seawater_permit_ceiling_over_kemi_design_proxy,6.06);
assert.equal(resourceScenarios.water_scope_jump.hamina.non_seawater_consumption_intensity_proxy.anchor_L_per_kWh_IT,0.00144);
const resourceTaxonomy=JSON.parse(await readFile(path.join(dist,'downloads/resource-flow-taxonomy.json'),'utf8'));
assert.equal(resourceTaxonomy.version,'0.1');
assert.equal(resourceTaxonomy.examples.hamina_seawater_ceiling.accounting,'permit_ceiling');
assert.equal(resourceTaxonomy.examples.kemi_water_design_proxy.accounting,'design_proxy');
assert(resourceTaxonomy.rule.includes('Never convert capacity'));
const denominatorEngine=JSON.parse(await readFile(path.join(dist,'downloads/denominator-engine-v0.1.json'),'utf8'));
assert.equal(denominatorEngine.version,'0.1');
assert.equal(denominatorEngine.generatedFrom.recipes,10);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_site_amplification').value,4.167);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_direct_value_chain_multiplier').value,10);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_water_withdrawal_per_revenue').value,25.085);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_water_design_per_revenue_floor').value,5669.373);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_property_tax_share_of_revenue').value,0.331);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_electricity_per_revenue').value,1.922);
assert(Math.abs(denominatorEngine.comparisons.find(x=>x.group==='water_per_revenue').spread-226)<0.05);
for(const id of ['RH-hamina_site_amplification','RH-kemi_direct_value_chain_multiplier','RH-GROUP-water_per_revenue']) assert(denominatorEngine.rabbitHoles.some(x=>x.id===id),`Missing denominator rabbit hole ${id}`);
assert(files.some(f=>f.endsWith('/assets/og.png')),'OG image missing');
assert.equal(files.filter(f=>f.endsWith('.html')).length,12);
console.log(`PASS: ${htmls.size} HTML pages; ${checked} internal links/assets/anchors; Markdown correspondence; 11 questions; calculations; evidence ledger exports; Symetrix v0.1/v0.2/v0.3; publication allowlist.`);
