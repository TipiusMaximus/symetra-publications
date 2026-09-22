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
test('global network failure preserves the previous link registry',()=>{assert.equal(shouldReplaceLinkRegistry([]),false);assert.equal(shouldReplaceLinkRegistry([{status:null},{status:null}]),false);assert.equal(shouldReplaceLinkRegistry([{status:null},{status:403}]),true);});
