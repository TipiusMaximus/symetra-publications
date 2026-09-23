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
import {loadContent} from './content.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist');
const meta=JSON.parse(await readFile(path.join(dist,'build-meta.json'),'utf8'));
const content=await loadContent();
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]))).flat();}
const files=await walk(dist), htmls=new Map();
const normalize=s=>s.replace(/\s+/g,' ').trim();
for(const file of files){if(!file.endsWith('.html'))continue;const html=await readFile(file,'utf8');assert(!/\/Users\/|\/Volumes\/|chatgpt-content-reference|keskustelu-raaka|gho_[A-Za-z0-9]/.test(html),`Private data in ${file}`);assert(!/\{\{(?:chapter|cite):/.test(html),`Unresolved content token in ${file}`);const $=load(html);assert.equal($('html').attr('lang'),'fi');assert.equal($('h1').length,1);assert.equal($('main').length,1);assert.equal($('meta[property="og:image"]').attr('content'),meta.origin+meta.basePath+'/assets/og.png');assert($('link[rel="canonical"]').attr('href'));assert($('meta[name="robots"]').attr('content'));if(!$('body').hasClass('home')&&!file.endsWith('/404.html')){const json=$('script[type="application/ld+json"]');assert.equal(json.length,1,`Article JSON-LD missing in ${file}`);const data=JSON.parse(json.text());assert.equal(data['@type'],'Article');assert.equal(data.author.name,'Symetra');assert.equal(data.publisher.name,'Symetra');}const ids=new Set();$('[id]').each((_,el)=>{const id=$(el).attr('id');assert(!ids.has(id),`Duplicate ${id} in ${file}`);ids.add(id);});let previous=0;$('h1,h2,h3,h4,h5,h6').each((_,el)=>{const level=Number(el.tagName[1]);assert(level<=previous+1,`Heading jump ${previous}->${level}: ${$(el).text()} in ${file}`);previous=level;});htmls.set(file,{$,ids});}
let checked=0;
for(const [file,{$}] of htmls){for(const el of $('a[href],link[href],script[src],img[src]').toArray()){const href=$(el).attr('href')||$(el).attr('src');if(!href||/^(https?:|mailto:)/.test(href))continue;assert(!/^(javascript:|data:|file:|\/\/)/i.test(href),'Unsafe URL');const pagePath='/'+path.relative(dist,file).split(path.sep).join('/');const target=new URL(href,'https://local.test'+meta.basePath+pagePath);assert(!meta.basePath||target.pathname.startsWith(meta.basePath+'/'),`Missing base path: ${href}`);let relative=decodeURIComponent(target.pathname.slice(meta.basePath.length));if(relative.endsWith('/'))relative+='index.html';const full=path.join(dist,relative);assert(files.includes(full),`Missing file ${href} from ${pagePath}`);if(target.hash){assert(htmls.get(full)?.ids.has(decodeURIComponent(target.hash.slice(1))),`Missing anchor ${href} from ${pagePath}`);}checked++;}}
// Public citations must point to original sources, not internal source-registry anchors or private working-paper paths.
const publicMarkdownFiles=[
  ...(await readdir(path.join(root,'content'))).filter(f=>f.endsWith('.md')).map(f=>path.join(root,'content',f)),
  ...(await readdir(path.join(root,'content/chapters'))).filter(f=>f.endsWith('.md')).map(f=>path.join(root,'content/chapters',f)),
  ...(await readdir(path.join(root,'content/questions'))).filter(f=>f.endsWith('.md')).map(f=>path.join(root,'content/questions',f))
];
for(const file of publicMarkdownFiles){
  const text=await readFile(file,'utf8');
  assert(!/\/analyysit\/datakeskukset\/lahteet\/#(?:S\d+|D\d+)/.test(text),`Internal source-registry citation in ${file}`);
  assert(!/\]\(#(?:S\d+|D\d+)\)/.test(text),`Internal source anchor in ${file}`);
  assert(!/datakeskusaudit-v\d|keskusteluarkisto/i.test(text),`Internal background-material reference in ${file}`);
}
const publicSources=content.sources;
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
for(const page of content.pages){const dest=path.join(dist,page.meta.route,'index.html');const actual=normalize(htmls.get(dest).$('main').text());const expected=load(renderMarkdown(page.body,meta.basePath).html);expected('p,td,th,h2,h3,li').each((_,el)=>{assert(actual.includes(normalize(expected(el).text())),`Markdown mismatch ${page.file}: ${expected(el).text().slice(0,80)}`);});}
for(let i=1;i<=11;i++){const id='A'+String(i).padStart(2,'0');const {body}=frontmatter(await readFile(path.join(root,'content/questions',id+'.md'),'utf8'));const $=htmls.get(path.join(dist,'analyysit/datakeskukset/vaiteet/index.html')).$;assert.equal($('#'+id).length,1);const expected=load(renderMarkdown(body,meta.basePath).html);assert(normalize($('#'+id).text()).includes(normalize(expected.text())),`Question body mismatch ${id}`);}
for(const [route,anchors] of Object.entries(content.legacyAnchors)){const target=route==='/'?path.join(dist,'index.html'):path.join(dist,route,'index.html');const entry=htmls.get(target);assert(entry,`Legacy route missing: ${route}`);for(const id of anchors)assert(entry.ids.has(id),`Legacy anchor missing: ${route}#${id}`);}
const canonicalFile=path.join(dist,'analyysit/datakeskukset/index.html');
const compatibilityFile=path.join(dist,'analyysit/datakeskukset/raportti/index.html');
const canonicalPage=htmls.get(canonicalFile).$;
const compatibilityPage=htmls.get(compatibilityFile).$;
const expectedReportSections=content.publication.reportSections.map(section=>'raportti-'+section.id);
for(const $ of [canonicalPage,compatibilityPage]){
  assert.deepEqual($('section.report-section').toArray().map(x=>$(x).attr('id')),expectedReportSections);
  assert.equal($('#raportti-esipuhe').length,1);
  assert.equal($('#raportti-esipuhe h2').first().text(),'Esipuhe');
  assert.equal($('#raportti-esipuhe').text().includes('Symetra on suomalainen'),true);
  assert.equal(($('#raportti-esipuhe').text().match(/Tämän analyysin on toimittanut Symetra/g)||[]).length,1);
  assert.equal(($('#raportti-esipuhe').text().match(/Symetra on suomalainen/g)||[]).length,1);
  assert.equal($('#tulostus-lahteet').length,1);
  for(const id of ['A01','A11','raportti-A03'])assert.equal($('#'+id).length,1,`Report anchor ${id} missing`);
  for(const id of new Set([...(content.legacyAnchors[content.publication.canonicalRoute]||[]),...(content.legacyAnchors[content.publication.compatibilityRoute]||[])]))assert.equal($('#'+id).length,1,`Shared legacy anchor ${id} missing`);
}
assert(canonicalPage('#raportti-vertailu').index()<canonicalPage('#raportti-vaiteet').index());
assert(canonicalPage('#raportti-vaiteet').index()<canonicalPage('#raportti-johtopaatokset').index());
assert.equal(canonicalPage('link[rel="canonical"]').attr('href'),meta.origin+meta.basePath+content.publication.canonicalRoute);
assert.equal(compatibilityPage('link[rel="canonical"]').attr('href'),meta.origin+meta.basePath+content.publication.canonicalRoute);
assert.equal(canonicalPage('meta[property="og:url"]').attr('content'),meta.origin+meta.basePath+content.publication.canonicalRoute);
assert.equal(compatibilityPage('meta[property="og:url"]').attr('content'),meta.origin+meta.basePath+content.publication.canonicalRoute);
assert.equal(compatibilityPage('meta[name="robots"]').attr('content'),'noindex,follow');
assert.deepEqual(canonicalPage('.site-header nav').first().find('a').toArray().map(x=>canonicalPage(x).text()),['Raportti','Väitteet A01–A11','Lähteet ja laskelmat','Menetelmä','Muutokset']);
const homePage=htmls.get(path.join(dist,'index.html')).$;
assert.equal(homePage('.hero .button').text(),'Lue raportti');
const sitemap=await readFile(path.join(dist,'sitemap.xml'),'utf8');
assert(sitemap.includes(meta.origin+meta.basePath+content.publication.canonicalRoute));
assert(!sitemap.includes(meta.origin+meta.basePath+content.publication.compatibilityRoute));
const report=await readFile(path.join(dist,'downloads/datakeskukset.md'),'utf8');for(const id of ['A01','A11','S001','S071','D08'])assert(report.includes(id));assert(!/\/Users\/|\/Volumes\/|chatgpt-content-reference/.test(report));assert(!/\{\{(?:chapter|cite):/.test(report),'Unresolved content token in downloadable report');
assert.equal((report.match(/^## Esipuhe$/gm)||[]).length,1);
assert.equal((report.match(/Tämän analyysin on toimittanut Symetra/g)||[]).length,1);
assert.equal((report.match(/Symetra on suomalainen/g)||[]).length,1);
assert(report.indexOf('## Mitä kohteista voidaan verrata?')<report.indexOf('## Kansalaisaloitteen väitteiden lähdeauditointi'));
assert(report.indexOf('## Kansalaisaloitteen väitteiden lähdeauditointi')<report.indexOf('## Mitä tarkastelluista vaikutuksista voidaan päätellä?'));
assert(files.includes(path.join(dist,'downloads/observations.json')),'Observation download missing');
assert.equal(meta.sourceCount,content.sources.length);assert.equal(meta.observationCount,content.observations.length);assert.equal(meta.reportSectionCount,content.publication.reportSections.length);assert.equal(meta.author,'Symetra');assert.equal(meta.version,'1.2.0');
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
for(const value of ['Symetrix Matrix v0.3','Taloudellinen volyymi / työpanos','Työllistävyys suhteessa volyymiin','73 P','27 P','74','61 P','100 E*','96','63','Pre-op','Kontekstirivit','0,87 TWh','32,819 Mm³/v','80 Mm³/v','0,0014 L/kWh IT','25,1 m³/M€','12 623 m³/M€','Sähkö / liikevaihto','1,92 GWh/M€','0,344 GWh/M€','12 623 m³/M€','35,4 m³/t','15,0 m³/t'])assert(sxPage.includes(value),`Displayed Symetrix mismatch: ${value}`);
const sxDetails=htmls.get(path.join(dist,'analyysit/datakeskukset/symetrix-mittarit/index.html')).$.text();
for(const value of ['Pisteytyksen perussääntö','0,386 M€/henkilötyövuosi','Metsä Fibre -liiketoiminnan proxy','PUE − 1','0,45 L/kWh','250 %','Candidate metrics','2 500','600 ha','1,5 M€','Evidenssin kattavuus','3 D + 2 Q','Työllisyyden systeemirajat E0–E3','4,2','8 000 Q','Scope jump','10×','17,6× Q','kaninkolo','Haminan sähkö','0,87 TWh/v','80 Mm³/v','0,0014 L/kWh IT','100 E*','Resurssivirran neljä ulottuvuutta','Vesi suhteessa liikevaihtoon','25,1 m³/M€','Denominator Engine v0.1','Sähkö suhteessa liikevaihtoon','1,92 GWh/M€','0,344 GWh/M€','533 kWh/t','416 M€','Nettoriippuvuus sähköverkosta','−150 %','S ~+100 %','32,819 Mm³/v','13,931 Mm³/v','35,4 m³/t','15,0 m³/t','12 623 m³/M€','503×'])assert(sxDetails.includes(value),`Displayed Symetrix details mismatch: ${value}`);
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
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATER-002'&&x.value===15));
assert(evidenceJson.some(x=>x.id==='EV-HAM-WATER-004'&&x.value===80));
assert(evidenceJson.some(x=>x.id==='EV-HAM-WATER-006'&&x.value===0.00144));
assert(evidenceJson.some(x=>x.id==='EV-HAM-WATERREV-001'&&Math.abs(x.value-25.085)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATERREV-001'&&Math.abs(x.value-6442.469)<0.01));
assert(evidenceJson.some(x=>x.id==='EV-WATERREV-GAP-001'&&Math.abs(x.value-256.827)<0.01));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-ENERGY-005'&&Math.abs(x.value-0.533)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-ENERGYREV-001'&&Math.abs(x.value-0.344)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-GRID-001'&&Math.abs(x.value-1.2)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-GRID-002'&&x.value===-150));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATER-003'&&Math.abs(x.value-32.819)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATER-004'&&Math.abs(x.value-13.931)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATER-005'&&Math.abs(x.value-35.403)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-KEMI-WATER-006'&&Math.abs(x.value-15.028)<0.001));
assert(evidenceJson.some(x=>x.id==='EV-ENERGYREV-GAP-001'&&Math.abs(x.value-5.593)<0.01));
const coverage=evidenceCoverage(evidence);
assert.equal(coverage.coverage.hamina.water.direct,3);
assert.equal(coverage.coverage.kemi.energy.direct,2);
assert.equal(coverage.coverage.kemi.energy.derived,2);
assert.equal(coverage.coverage.outokumpu.land.direct,2);
const coverageDownload=JSON.parse(await readFile(path.join(dist,'downloads/evidence-coverage.json'),'utf8'));
assert.equal(coverageDownload.coverage.hamina.water.direct,3,'Evidence coverage download mismatch');
assert.equal(coverageDownload.coverage.outokumpu.finance.direct,6,'Evidence coverage download mismatch');
const metricRegistry=JSON.parse(await readFile(path.join(dist,'downloads/metric-registry.json'),'utf8'));
assert.equal(metricRegistry.version,'0.1');
assert(metricRegistry.metrics.some(x=>x.id==='domestic_value_added_per_grid_energy'&&x.readiness==='blocked_high_priority'));
assert(metricRegistry.metrics.some(x=>x.id==='capital_per_site_worker'&&x.readiness==='illustrative_only'));
assert(metricRegistry.metrics.some(x=>x.id==='employment_scope_jump'&&x.readiness==='descriptive_ready_partial'));
assert(metricRegistry.metrics.some(x=>x.id==='non_seawater_water_intensity_proxy'&&x.readiness==='estimate_scoreable_with_flag'));
assert(metricRegistry.metrics.some(x=>x.id==='datacenter_water_efficiency'&&x.readiness==='scoreable_with_estimate_flag'));
assert(metricRegistry.metrics.some(x=>x.id==='water_withdrawal_per_revenue'&&x.readiness==='descriptive_ready_partial'));
assert(metricRegistry.metrics.some(x=>x.id==='water_consumption_per_revenue'&&x.readiness==='descriptive_ready_single_entity'));
assert(metricRegistry.metrics.some(x=>x.id==='net_grid_dependence'&&x.readiness==='descriptive_ready_partial'));
assert(metricRegistry.metrics.some(x=>x.id==='pulp_water_withdrawal_per_tonne'&&x.readiness==='descriptive_ready_single_entity'));
assert(metricRegistry.metrics.some(x=>x.id==='pulp_wastewater_per_tonne'&&x.readiness==='descriptive_ready_single_entity'));
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
assert.equal(resourceScenarios.water_scope_jump.kemi.derived_design_proxy_m3_per_year,15000000);
assert.equal(resourceScenarios.water_scope_jump.descriptive_ratio.kemi_design_proxy_over_hamina_reported_withdrawal,1321);
assert.equal(resourceScenarios.water_scope_jump.hamina.seawater_cooling.permit_ceiling_m3_per_year,80000000);
assert.equal(resourceScenarios.water_scope_jump.descriptive_ratio.hamina_seawater_permit_ceiling_over_kemi_design_proxy,5.33);
assert.equal(resourceScenarios.water_scope_jump.hamina.non_seawater_consumption_intensity_proxy.anchor_L_per_kWh_IT,0.00144);
assert.equal(resourceScenarios.net_grid_dependence.kemi.value_percent,-150);
assert.equal(resourceScenarios.net_grid_dependence.hamina.value_percent,100);
assert.equal(resourceScenarios.net_grid_dependence.hamina.status,'scenario_assumption');
const resourceTaxonomy=JSON.parse(await readFile(path.join(dist,'downloads/resource-flow-taxonomy.json'),'utf8'));
assert.equal(resourceTaxonomy.version,'0.1');
assert.equal(resourceTaxonomy.examples.hamina_seawater_ceiling.accounting,'permit_ceiling');
assert.equal(resourceTaxonomy.examples.kemi_water_design_proxy.accounting,'design_proxy');
assert(resourceTaxonomy.rule.includes('Never convert capacity'));
const auditGoals=JSON.parse(await readFile(path.join(dist,'downloads/audit-goals.json'),'utf8'));
assert.equal(auditGoals.version,'0.1');
assert.equal(auditGoals.goals.find(x=>x.id==='G-KEMI-GRID').status,'partial');
assert.equal(auditGoals.goals.find(x=>x.id==='G-KEMI-WATER').status,'partial');
const denominatorEngine=JSON.parse(await readFile(path.join(dist,'downloads/denominator-engine-v0.1.json'),'utf8'));
assert.equal(denominatorEngine.version,'0.1');
assert.equal(denominatorEngine.generatedFrom.recipes,22);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_site_amplification').value,4.167);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_direct_value_chain_multiplier').value,10);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_water_withdrawal_per_revenue').value,25.085);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_water_design_per_revenue_floor').value,6442.469);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_actual_water_withdrawal_per_business_revenue_floor').value,12622.692);
assert.equal(denominatorEngine.results.find(x=>x.id==='nebius_water_withdrawal_per_revenue').value,51.953);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_nebius_water_withdrawal_multiple').value,22494.174);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_water_withdrawal_per_value_added_proxy').value,230892.078);
assert.equal(denominatorEngine.results.find(x=>x.id==='nebius_water_withdrawal_per_value_added_floor').value,109.375);
assert.equal(denominatorEngine.results.find(x=>x.id==='nebius_electricity_per_value_added_floor').value,7.309);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_electricity_per_value_added_proxy').value,5.628);
assert.equal(denominatorEngine.results.find(x=>x.id==='tornio_nebius_water_withdrawal_multiple').value,14196.241);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_tornio_water_withdrawal_multiple').value,1.585);
assert.equal(denominatorEngine.results.find(x=>x.id==='tornio_nebius_electricity_multiple').value,27.046);
assert.equal(denominatorEngine.results.find(x=>x.id==='tornio_kemi_electricity_multiple').value,3.296);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_property_tax_share_of_revenue').value,0.331);
assert.equal(denominatorEngine.results.find(x=>x.id==='hamina_electricity_per_revenue').value,1.922);
assert.equal(denominatorEngine.results.find(x=>x.id==='kemi_electricity_per_business_revenue_floor').value,0.344);
assert(Math.abs(denominatorEngine.comparisons.find(x=>x.group==='electricity_per_revenue').spread-5.59)<0.05);
assert(denominatorEngine.rabbitHoles.some(x=>x.id==='RH-GROUP-electricity_per_revenue'));
assert(Math.abs(denominatorEngine.comparisons.find(x=>x.group==='water_withdrawal_per_revenue').spread-503.2)<0.1);
assert(Math.abs(denominatorEngine.comparisons.find(x=>x.group==='water_withdrawal_per_value_added').spread-2111.01)<0.05);
assert(Math.abs(denominatorEngine.comparisons.find(x=>x.group==='electricity_per_value_added').spread-1.3)<0.02);
for(const id of ['RH-hamina_site_amplification','RH-kemi_direct_value_chain_multiplier','RH-kemi_nebius_water_withdrawal_multiple','RH-GROUP-water_withdrawal_per_revenue','RH-GROUP-water_withdrawal_per_value_added','RH-tornio_nebius_water_withdrawal_multiple','RH-tornio_nebius_electricity_multiple']) assert(denominatorEngine.rabbitHoles.some(x=>x.id===id),`Missing denominator rabbit hole ${id}`);
const resourceMatrix=JSON.parse(await readFile(path.join(dist,'downloads/resource-flow-matrix-v0.1.json'),'utf8'));
assert.equal(resourceMatrix.version,'0.1');
assert.equal(resourceMatrix.water.nebius_finland1.in.withdrawal.value,1459);
assert.equal(resourceMatrix.water.nebius_finland1.net.consumption.state,'unknown');
assert.equal(resourceMatrix.water.kemi.in.withdrawal.value,32819000);
assert.equal(resourceMatrix.electricity.nebius_finland1.in.total_consumption.value,97.5);
assert.equal(resourceMatrix.electricity.kemi.net.measured_grid_balance.state,'unknown');
assert.equal(resourceMatrix.water.tornio_2024.in.withdrawal.value,20712315);
assert.equal(resourceMatrix.water.tornio_2024.net.consumption.state,'unknown');
assert.equal(resourceMatrix.electricity.tornio_2024.in.total_consumption.value,2637);
assert(files.some(f=>f.endsWith('/assets/og.png')),'OG image missing');
assert.equal(files.filter(f=>f.endsWith('.html')).length,12);
console.log(`PASS: ${htmls.size} HTML pages; ${checked} internal links/assets/anchors; Markdown correspondence; 11 questions; calculations; evidence ledger exports; Symetrix v0.1/v0.2/v0.3; publication allowlist.`);
