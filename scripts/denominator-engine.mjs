const round=(x,n=3)=>{const p=10**n;return Math.round(x*p)/p;};

const statusClass=status=>{
  if(status.includes('design')||status.includes('proxy')||status.includes('impact')) return 'qualified';
  if(status.includes('estimate')) return 'estimate';
  if(status.includes('derived')) return 'derived';
  if(/^observed|^company_reported/.test(status)) return 'direct';
  return 'qualified';
};

const qualityRank={direct:0,derived:1,estimate:2,qualified:3};

const getField=(item,field)=>{
  if(!Object.hasOwn(item,field)) throw new Error(`Evidence ${item.id} missing field ${field}`);
  const v=item[field];
  if(!Number.isFinite(v)) throw new Error(`Evidence ${item.id} field ${field} is not numeric`);
  return v;
};

const combineQuality=(a,b,boundaryPolicy,periodPolicy)=>{
  const classes=[statusClass(a.status),statusClass(b.status)];
  let quality=classes.sort((x,y)=>qualityRank[y]-qualityRank[x])[0];
  if(boundaryPolicy==='cross_boundary') quality='qualified';
  if(periodPolicy==='mixed_explicit' && qualityRank[quality]<qualityRank.estimate) quality='estimate';
  return quality;
};

export function runDenominatorEngine(evidence,registry){
  const byId=new Map(evidence.map(x=>[x.id,x]));
  const results=[];
  for(const recipe of registry.recipes){
    const n=byId.get(recipe.numerator.evidence);
    const d=byId.get(recipe.denominator.evidence);
    if(!n||!d) throw new Error(`Missing evidence for recipe ${recipe.id}`);
    if(!['strict','near_match','cross_boundary'].includes(recipe.boundaryPolicy)) throw new Error(`Invalid boundary policy in ${recipe.id}`);
    if(!['same','near_period','mixed_explicit'].includes(recipe.periodPolicy)) throw new Error(`Invalid period policy in ${recipe.id}`);
    if(recipe.periodPolicy==='same' && n.period!==d.period) throw new Error(`Same-period recipe ${recipe.id} mixes ${n.period} and ${d.period}`);
    const numerator=getField(n,recipe.numerator.field)*(recipe.numerator.scale??1);
    const denominator=getField(d,recipe.denominator.field)*(recipe.denominator.scale??1);
    if(denominator===0) throw new Error(`Zero denominator in recipe ${recipe.id}`);
    const raw=numerator/denominator;
    const value=round(raw*(recipe.resultScale??1),3);
    results.push({
      id:recipe.id,
      label:recipe.label,
      question:recipe.question,
      value,
      unit:recipe.resultUnit,
      numerator:{evidence:n.id,value:numerator,sourceValue:getField(n,recipe.numerator.field),sourceUnit:n.unit,status:n.status,boundary:n.boundary,period:n.period},
      denominator:{evidence:d.id,value:denominator,sourceValue:getField(d,recipe.denominator.field),sourceUnit:d.unit,status:d.status,boundary:d.boundary,period:d.period},
      boundaryPolicy:recipe.boundaryPolicy,
      periodPolicy:recipe.periodPolicy,
      quality:combineQuality(n,d,recipe.boundaryPolicy,recipe.periodPolicy),
      comparisonGroup:recipe.comparisonGroup??null,
      rabbitHoleRule:recipe.rabbitHole??null
    });
  }

  const rabbitHoles=[];
  for(const r of results){
    if(r.rabbitHoleRule?.kind==='absolute_multiple' && Math.abs(r.value)>=r.rabbitHoleRule.threshold){
      rabbitHoles.push({
        id:`RH-${r.id}`,
        type:'absolute_multiple',
        severity:'investigate',
        recipe:r.id,
        magnitude:r.value,
        threshold:r.rabbitHoleRule.threshold,
        question:r.question,
        note:'Threshold is a discovery heuristic, not a good/bad judgment.'
      });
    }
  }

  const groups=new Map();
  for(const r of results){
    if(!r.comparisonGroup) continue;
    const arr=groups.get(r.comparisonGroup)??[];
    arr.push(r);
    groups.set(r.comparisonGroup,arr);
  }
  const comparisons=[];
  for(const [group,items] of groups){
    if(items.length<2) continue;
    const positive=items.filter(x=>x.value>0);
    if(positive.length<2) continue;
    const max=positive.reduce((a,b)=>a.value>b.value?a:b);
    const min=positive.reduce((a,b)=>a.value<b.value?a:b);
    const spread=round(max.value/min.value,2);
    const comparison={
      group,
      min:{recipe:min.id,value:min.value},
      max:{recipe:max.id,value:max.value},
      spread
    };
    comparisons.push(comparison);
    if(spread>=registry.rabbitHoleHeuristics.group_spread){
      rabbitHoles.push({
        id:`RH-GROUP-${group}`,
        type:'group_spread',
        severity:'investigate',
        group,
        spread,
        threshold:registry.rabbitHoleHeuristics.group_spread,
        between:[min.id,max.id],
        note:'Large spread asks why the normalized structures differ; it is not a ranking.'
      });
    }
  }

  return {
    version:'0.1',
    generatedFrom:{
      evidenceItems:evidence.length,
      recipes:registry.recipes.length
    },
    principle:registry.principle,
    heuristics:registry.rabbitHoleHeuristics,
    results,
    comparisons,
    rabbitHoles
  };
}
