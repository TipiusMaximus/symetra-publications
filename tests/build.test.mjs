import {readFile} from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import {frontmatter,basePath,renderMarkdown} from '../scripts/lib.mjs';
import {calculations} from '../scripts/calculations.mjs';
import {symetrixMatrixV01} from '../scripts/symetrix.mjs';
import {symetrixMatrixV02} from '../scripts/symetrix-v02.mjs';
import {symetrixMatrixV03} from '../scripts/symetrix-v03.mjs';
import {runDenominatorEngine} from '../scripts/denominator-engine.mjs';
import {loadContent} from '../scripts/content.mjs';
import {shouldReplaceLinkRegistry} from '../scripts/link-check-policy.mjs';
test('frontmatter preserves Finnish text, boolean and source arrays',()=>{const p=frontmatter('---\ntitle: Lähteet\npublished: false\nsourceRefs: ["S001","D08"]\n---\nSisältö');assert.equal(p.meta.published,false);assert.deepEqual(p.meta.sourceRefs,['S001','D08']);assert.equal(p.body,'Sisältö');});
test('duplicate metadata and missing separator fail',()=>{assert.throws(()=>frontmatter('---\ntitle: a\ntitle: b\n---\nx'));assert.throws(()=>frontmatter('# Hello'));});
test('root and GitHub project paths work without rewriting external or hash links',()=>{assert.equal(basePath('/repo/'),'/repo');assert.equal(basePath('/'),'');for(const invalid of ['/../secret','//evil','relative'])assert.throws(()=>basePath(invalid));const {html}=renderMarkdown('[local](/a/) [hash](#b) [web](https://example.org/)','/repo');assert(html.includes('href="/repo/a/"'));assert(html.includes('href="#b"'));assert(html.includes('href="https://example.org/"'));});
test('Finnish headings have unique stable anchors',()=>{const r=renderMarkdown('## Sähkö ja työ\n\n## Sähkö ja työ');assert.deepEqual(r.headings.map(h=>h.id),['sahko-ja-tyo','sahko-ja-tyo-2']);});
test('shared chapters expand before rendering',async()=>{const content=await loadContent();const comparison=content.pages.find(p=>p.meta.slug==='vertailu');assert(comparison.body.includes('Hamina: ensin on ymmärrettävä'));assert(!/\{\{(?:chapter|cite):/.test(comparison.body));assert.equal(content.publication.reportSections.length,19);assert.deepEqual(content.publication.reportSections.slice(0,4).map(x=>x.id),['datakeskukset','esipuhe','tutkimuskysymys','lukutapa']);assert.equal(content.publication.reportSections.findIndex(x=>x.id==='symetrix'),15);});
test('financial arithmetic keeps input precision and interpretation boundaries',()=>{assert.deepEqual(calculations().tuike.output,{ebitda:'344.6244',ebitdaMinusEbit:'314.3194',revenueMinusEbitda:'229.7496'});assert.equal(calculations().tuike.limitations.length,3);});
test('Kemi sensitivity calculation stays explicitly derived, not measured',()=>{const k=calculations().kemiIllustration;assert.equal(k.status,'johdettu havainnollistus, ei mitattu verkkotase');assert.deepEqual(k.output,{impliedOwnConsumption:0.8,arithmeticProductionMinusConsumption:1.2});assert(k.assumptions.length>0);assert(k.interpretation.some(x=>x.includes('ei ole mitattu nettovienti')));});

test('structural comparison keeps organizational limits explicit',()=>{const x=calculations().structuralComparison;assert.equal(x.status,'rakenteellinen vertailu, ei tuottavuus- tai yhteiskuntahyötymittari');assert.deepEqual(x.tuike,{boundary:'Tuike Finland Oy, henkilöstö 120',revenuePerOwnPersonnel:4.786,ebitdaPerOwnPersonnel:2.872});assert.deepEqual(x.outokumpuFerrochrome,{boundary:'Ferrochrome-segmentti, vuoden lopun FTE 454',salesPerFte:1.018,externalSalesPerFte:0.478,ebitdaPerFte:0.302,internalSalesSharePercent:53});assert.equal(x.limitations.length,3);});
test('Symetrix v0.1 exposes the first real rank flip',()=>{
  const s=symetrixMatrixV01();
  assert.equal(s.version,'0.1');
  assert.equal(s.status,'exploratory');
  assert.equal(s.strict.scoreableCrossIndustryLenses,0);
  assert.deepEqual(s.lenses.capitalThroughput.ranking,[
    {rank:1,entity:'tuike',score:100},
    {rank:2,entity:'ferrochrome',score:0}
  ]);
  assert.deepEqual(s.lenses.employmentIntensity.ranking,[
    {rank:1,entity:'ferrochrome',score:100},
    {rank:2,entity:'tuike',score:0}
  ]);
  assert.equal(s.lenses.reportedWorkforceScale.entities.kemi.score,53.9);
  assert.equal(s.lenses.gridIndependence.entities.kemi.score,100);
  assert.equal(s.lenses.gridIndependence.rankable,false);
  assert.equal(s.lenses.capitalThroughput.entities.kemi.coveragePct,0);
});

test('Symetrix v0.2 uses stable baselines and adds Nebius',()=>{
  const s=symetrixMatrixV02();
  assert.equal(s.version,'0.2');
  assert.equal(s.status,'exploratory-baseline');
  assert.equal(s.metrics.revenuePerWorkforce.scores.tuike,83.9);
  assert.equal(s.metrics.revenuePerWorkforce.scores.nebius,44);
  assert.equal(s.metrics.revenuePerWorkforce.scores.ferrochrome,50.4);
  assert.equal(s.metrics.workforcePer100mRevenue.scores.tuike,16.1);
  assert.equal(s.metrics.workforcePer100mRevenue.scores.nebius,56);
  assert.equal(s.lenses.capitalThroughput.entities.tuike.score,91.4);
  assert.equal(s.lenses.capitalThroughput.entities.nebius.score,49);
  assert.equal(s.lenses.employmentIntensity.entities.nebius.score,51);
  assert.equal(s.metrics.waterUsageEffectiveness.scores.nebius,100);
  assert.equal(s.metrics.electricitySelfSufficiency.scores.kemi,100);
  assert.equal(s.entities.hel16.stage,'pre-operational');
  assert.equal(s.referenceOnly.nebiusCapacityMW2026.value,75);
});

test('Symetrix v0.3 uses empirical baselines and explicit cell states',()=>{
  const s=symetrixMatrixV03();
  assert.equal(s.version,'0.3');
  assert.equal(Number(s.baselines.turnoverPerWorkforce.value.toFixed(3)),0.386);
  assert.equal(s.metrics.economicThroughput.scores.tuike,86.3);
  assert.equal(s.metrics.economicThroughput.scores.nebius,59.8);
  assert.equal(s.metrics.economicThroughput.scores.kemi,72.7);
  assert.equal(s.metrics.economicThroughput.scores.ferrochrome,64);
  assert.equal(s.metrics.employmentIntensity.scores.kemi,27.3);
  assert.equal(s.metrics.dataCenterFacilityEfficiency.scores.tuike,74.3);
  assert.equal(s.metrics.waterEfficiency.scores.tuike,100);
  assert.equal(s.metrics.waterEfficiency.scores.nebius,96.4);
  assert.equal(s.metrics.electricitySelfSufficiency.scores.kemi,63.2);
  assert.equal(s.matrix.dataCenterFacilityEfficiency.kemi.state,'not-applicable');
  assert.equal(s.matrix.waterEfficiency.tuike.state,'score');
  assert.equal(s.matrix.waterEfficiency.tuike.evidence,'estimate_non_seawater_mixed_period');
  assert.equal(s.matrix.economicThroughput.hel16.state,'pre-op');
  assert.equal(s.matrix.economicThroughput.kemi.evidence,'proxy_business_level');
});


test('published Symetrix title matches the current v0.3 model',async()=>{
  const source=await readFile(new URL('../content/symetrix.md',import.meta.url),'utf8');
  const {meta}=frontmatter(source);
  const current=symetrixMatrixV03();
  assert.equal(current.version,'0.3');
  assert.equal(meta.title,`Symetrix Matrix v${current.version}`);
});

test('Denominator Engine keeps boundaries and flags rabbit holes',()=>{
  const evidence=[
    {id:'A',value:500,unit:'persons',status:'observed_reported',boundary:'site',period:'2024'},
    {id:'B',value:100,unit:'persons',status:'observed_reported',boundary:'legal entity',period:'2024'},
    {id:'C',value:20,unit:'m3',status:'observed',boundary:'site',period:'2024'},
    {id:'D',value:10,unit:'MEUR',status:'observed',boundary:'legal entity',period:'2024'}
  ];
  const registry={
    principle:'explicit recipes only',
    rabbitHoleHeuristics:{absolute_multiple:4,group_spread:4},
    recipes:[
      {id:'scope',label:'scope',question:'why',numerator:{evidence:'A',field:'value'},denominator:{evidence:'B',field:'value'},resultUnit:'x',boundaryPolicy:'cross_boundary',periodPolicy:'same',rabbitHole:{kind:'absolute_multiple',threshold:4}},
      {id:'intensity',label:'intensity',question:'how much',numerator:{evidence:'C',field:'value'},denominator:{evidence:'D',field:'value'},resultUnit:'m3_per_MEUR',boundaryPolicy:'near_match',periodPolicy:'same'}
    ]
  };
  const x=runDenominatorEngine(evidence,registry);
  assert.equal(x.results.find(r=>r.id==='scope').value,5);
  assert.equal(x.results.find(r=>r.id==='scope').quality,'qualified');
  assert.equal(x.results.find(r=>r.id==='intensity').value,2);
  assert(x.rabbitHoles.some(r=>r.id==='RH-scope'));
});
test('resource flow matrix keeps withdrawal, consumption and grid balance distinct',async()=>{
  const flow=JSON.parse(await readFile(new URL('../data/resource-flow-matrix.json',import.meta.url),'utf8'));
  assert.equal(flow.version,'0.1');
  assert.equal(flow.water.nebius_finland1.in.withdrawal.value,1459);
  assert.equal(flow.water.nebius_finland1.net.consumption.state,'unknown');
  assert.equal(flow.water.kemi.in.withdrawal.value,32819000);
  assert.equal(flow.water.kemi.net.withdrawal_minus_wastewater.status,'derived_not_consumption');
  assert.equal(flow.electricity.nebius_finland1.in.total_consumption.value,97.5);
  assert.equal(flow.electricity.nebius_finland1.in.measured_grid_import.state,'unknown');
  assert.equal(flow.electricity.kemi.net.measured_grid_balance.state,'unknown');
  assert.equal(Number(flow.cross_entity_diagnostics.water_withdrawal_multiple.value.toFixed(3)),22494.174);
});

test('real withdrawal symetry recipes stay boundary-qualified',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const recipes=JSON.parse(await readFile(new URL('../data/denominator-recipes.json',import.meta.url),'utf8'));
  const x=runDenominatorEngine(evidence,recipes);
  const nebius=x.results.find(r=>r.id==='nebius_water_withdrawal_per_revenue');
  const scale=x.results.find(r=>r.id==='kemi_nebius_water_withdrawal_multiple');
  assert.equal(nebius.value,51.953);
  assert.equal(nebius.quality,'direct');
  assert.equal(nebius.boundaryPolicy,'near_match');
  assert.equal(scale.value,22494.174);
  assert.equal(scale.quality,'qualified');
  assert(x.rabbitHoles.some(r=>r.id==='RH-kemi_nebius_water_withdrawal_multiple'));
});

test('Kemi value-added proxy stays explicitly scenario-derived',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const byId=new Map(evidence.map(x=>[x.id,x]));
  const va=byId.get('EV-KEMI-VA-PROXY-001');
  assert.equal(va.value,142.14);
  assert.equal(va.status,'derived_scenario_proxy');
  assert(va.note.includes('Not observed value added'));
  const waterva=byId.get('EV-KEMI-WATERVA-001');
  assert.equal(Number(waterva.value.toFixed(3)),230892.078);
});

test('Kemi water per value-added Symetry remains qualified',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const recipes=JSON.parse(await readFile(new URL('../data/denominator-recipes.json',import.meta.url),'utf8'));
  const x=runDenominatorEngine(evidence,recipes);
  const r=x.results.find(r=>r.id==='kemi_water_withdrawal_per_value_added_proxy');
  assert.equal(r.value,230892.078);
  assert.equal(r.quality,'qualified');
  assert.equal(r.boundaryPolicy,'strict');
});

test('Nebius value-added floor stays conservative and traceable',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const byId=new Map(evidence.map(x=>[x.id,x]));
  const ebitda=byId.get('EV-NEB-EBITDA-001');
  const va=byId.get('EV-NEB-VA-FLOOR-001');
  assert.equal(Number(ebitda.value.toFixed(6)),13.339425);
  assert.equal(va.status,'derived_lower_bound_proxy');
  assert.equal(Number(va.value.toFixed(6)),13.339425);
  assert(va.note.includes('not observed') || va.note.includes('not observed'.replace('not','Not')));
});

test('value-added Symetries expose water rabbit hole but not an electricity-scale rabbit hole',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const recipes=JSON.parse(await readFile(new URL('../data/denominator-recipes.json',import.meta.url),'utf8'));
  const x=runDenominatorEngine(evidence,recipes);
  const water=x.results.find(r=>r.id==='nebius_water_withdrawal_per_value_added_floor');
  const ne=x.results.find(r=>r.id==='nebius_electricity_per_value_added_floor');
  const ke=x.results.find(r=>r.id==='kemi_electricity_per_value_added_proxy');
  assert.equal(water.value,109.375);
  assert.equal(water.quality,'qualified');
  assert.equal(ne.value,7.309);
  assert.equal(ke.value,5.628);
  const waterSpread=x.comparisons.find(c=>c.group==='water_withdrawal_per_value_added');
  const energySpread=x.comparisons.find(c=>c.group==='electricity_per_value_added');
  assert.equal(waterSpread.spread,2111.01);
  assert.equal(energySpread.spread,1.3);
  assert(x.rabbitHoles.some(r=>r.id==='RH-GROUP-water_withdrawal_per_value_added'));
  assert(!x.rabbitHoles.some(r=>r.id==='RH-GROUP-electricity_per_value_added'));
});

test('Tornio resource boundary separates electricity, total energy and water accounting',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const byId=new Map(evidence.map(x=>[x.id,x]));
  assert.equal(byId.get('EV-TORNIO-ELECTRICITY-002').value,2637);
  assert.equal(byId.get('EV-TORNIO-FUEL-001').value,1428);
  assert.equal(byId.get('EV-TORNIO-WATER-001').value,20712315);
  assert.equal(byId.get('EV-TORNIO-WATER-002').value,6977101);
  assert.equal(byId.get('EV-TORNIO-WATER-003').value,13735214);
  assert.equal(byId.get('EV-TORNIO-WATER-004').value,21033049);
  assert(byId.get('EV-TORNIO-WATER-004').note.includes('do not derive negative consumption'));
});

test('Tornio resource Symetries stay descriptive and mixed-period',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const recipes=JSON.parse(await readFile(new URL('../data/denominator-recipes.json',import.meta.url),'utf8'));
  const x=runDenominatorEngine(evidence,recipes);
  const tnW=x.results.find(r=>r.id==='tornio_nebius_water_withdrawal_multiple');
  const ktW=x.results.find(r=>r.id==='kemi_tornio_water_withdrawal_multiple');
  const tnE=x.results.find(r=>r.id==='tornio_nebius_electricity_multiple');
  const tkE=x.results.find(r=>r.id==='tornio_kemi_electricity_multiple');
  assert.equal(tnW.value,14196.241);
  assert.equal(ktW.value,1.585);
  assert.equal(tnE.value,27.046);
  assert.equal(tkE.value,3.296);
  assert.equal(tnW.periodPolicy,'near_period');
  assert.equal(tnW.quality,'qualified');
  assert(x.rabbitHoles.some(r=>r.id==='RH-tornio_nebius_water_withdrawal_multiple'));
  assert(x.rabbitHoles.some(r=>r.id==='RH-tornio_nebius_electricity_multiple'));
});

test('resource flow matrix carries Tornio site without inventing net consumption',async()=>{
  const flow=JSON.parse(await readFile(new URL('../data/resource-flow-matrix.json',import.meta.url),'utf8'));
  assert.equal(flow.water.tornio_2024.in.withdrawal.value,20712315);
  assert.equal(flow.water.tornio_2024.out.wastewater_discharge_P3_P7.value,21033049);
  assert.equal(flow.water.tornio_2024.net.consumption.state,'unknown');
  assert.equal(flow.electricity.tornio_2024.in.total_consumption.value,2637);
  assert.equal(flow.electricity.tornio_2024.in.measured_grid_import.state,'unknown');
});

test('Hamina water boundary keeps seawater actual unknown and permit ceiling separate',async()=>{
  const flow=JSON.parse(await readFile(new URL('../data/resource-flow-matrix.json',import.meta.url),'utf8'));
  const h=flow.water.hamina_2024;
  assert.equal(h.in.reported_non_seawater_withdrawal.value,11356);
  assert.equal(h.out.reported_non_seawater_discharge.value,10221);
  assert.equal(h.net.reported_non_seawater_consumption.value,1136);
  assert.equal(h.in.seawater_cooling_withdrawal.state,'unknown');
  assert.equal(h.in.seawater_cooling_withdrawal.permit_ceiling.value,80000000);
  assert.equal(h.in.seawater_cooling_withdrawal.permit_ceiling.status,'permit_ceiling');
  assert.equal(h.net.total_consumption.state,'unknown');
});

test('Hamina total-water cross-sector Symetry is blocked until seawater actual exists',async()=>{
  const flow=JSON.parse(await readFile(new URL('../data/resource-flow-matrix.json',import.meta.url),'utf8'));
  assert.equal(flow.cross_entity_diagnostics.kemi_hamina_total_water_comparison.state,'blocked');
  assert.equal(flow.cross_entity_diagnostics.tornio_hamina_total_water_comparison.state,'blocked');
  assert(flow.cross_entity_diagnostics.kemi_hamina_total_water_comparison.reason.includes('different water scopes'));
});

test('useful heat layer distinguishes external transfer, design and internal recovery',async()=>{
  const flow=JSON.parse(await readFile(new URL('../data/resource-flow-matrix.json',import.meta.url),'utf8'));
  assert.equal(flow.heat.nebius_finland1.out.useful_heat_export.value,19.5);
  assert.equal(flow.heat.kemi.out.district_heat_transfer.value,50.1);
  assert.equal(flow.heat.hamina_2024.out.actual_district_heat_delivery.state,'unknown');
  assert.equal(flow.heat.hamina_2024.out.design_district_heat_potential.value,40);
  assert.equal(flow.heat.tornio_2024.internal.recovered_heat.value,98);
  assert.equal(flow.cross_entity_diagnostics.hamina_external_useful_heat_actual_comparison.state,'blocked');
  assert.equal(flow.cross_entity_diagnostics.tornio_external_useful_heat_comparison.state,'blocked');
});

test('Kemi and Nebius form the first same-year external useful-heat Symetry pair',async()=>{
  const evidence=(await readFile(new URL('../data/evidence-index.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
  const recipes=JSON.parse(await readFile(new URL('../data/denominator-recipes.json',import.meta.url),'utf8'));
  const x=runDenominatorEngine(evidence,recipes);
  const r=x.results.find(r=>r.id==='kemi_nebius_external_useful_heat_multiple');
  assert.equal(r.value,2.569);
  assert.equal(r.periodPolicy,'same');
  assert.equal(r.boundaryPolicy,'near_match');
  assert.equal(r.quality,'direct');
});

test('global network failure preserves the previous link registry',()=>{assert.equal(shouldReplaceLinkRegistry([]),false);assert.equal(shouldReplaceLinkRegistry([{status:null},{status:null}]),false);assert.equal(shouldReplaceLinkRegistry([{status:null},{status:403}]),true);});
