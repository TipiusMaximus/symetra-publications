const r1=x=>Math.round(x*10)/10;
const c=(x,a=0,b=100)=>Math.max(a,Math.min(b,x));
const lg=x=>Math.log(x)/Math.log(2);
const higher=(x,b)=>c(50+20*lg(x/b));
const lower=(x,b)=>c(50-20*lg(x/b));
const threshold=(x,b)=>c(50*x/b);

export function symetrixMatrixV02(){
  const entities={
    tuike:{name:'Google / Tuike Finland Oy, Hamina',stage:'operating'},
    nebius:{name:'Nebius DC Oy / Mäntsälä',stage:'operating'},
    kemi:{name:'Metsä Fibre, Kemin biotuotetehdas',stage:'operating'},
    ferrochrome:{name:'Outokumpu Ferrochrome, Kemi–Tornio',stage:'operating'},
    hel16:{name:'Microsoft HEL16, Hepokorpi',stage:'pre-operational'}
  };
  const raw={
    tuike:{workforce:120,revenueM:574.374,ebitdaM:344.6244,ebitM:30.305},
    nebius:{workforce:37,revenueM:28.083,ebitdaPct:47.5,ebitdaM:28.083*.475,ebitM:2.361,wue:0.018,heatGWh:19.5,capacityMW2026:75},
    kemi:{workforce:300,electricityProductionTWh:2.0,selfSufficiencyPct:250,derivedConsumptionTWh:.8,derivedSurplusTWh:1.2},
    ferrochrome:{workforce:454,salesM:462,externalSalesM:217,internalSalesM:245,ebitdaM:137},
    hel16:{}
  };
  const metrics={
    revenuePerWorkforce:{
      group:'Talous',label:'Myynti / oma henkilöstö tai FTE',unit:'M€/hlö tai FTE',
      baseline:{value:1,type:'provisional_reference',label:'1,0 M€/hlö'},
      values:{tuike:raw.tuike.revenueM/120,nebius:raw.nebius.revenueM/37,ferrochrome:462/454},
      score:higher,comparability:{tuike:75,nebius:75,ferrochrome:50}
    },
    ebitdaPerWorkforce:{
      group:'Talous',label:'Käyttökate / oma henkilöstö tai FTE',unit:'M€/hlö tai FTE',
      baseline:{value:.3,type:'provisional_reference',label:'0,30 M€/hlö'},
      values:{tuike:raw.tuike.ebitdaM/120,nebius:raw.nebius.ebitdaM/37,ferrochrome:137/454},
      score:higher,comparability:{tuike:75,nebius:75,ferrochrome:50}
    },
    workforcePer100mRevenue:{
      group:'Työ',label:'Oma henkilöstö / 100 M€ myyntiä',unit:'hlö tai FTE / 100 M€',
      baseline:{value:100,type:'reciprocal_reference',label:'100 / 100 M€'},
      values:{tuike:120/(574.374/100),nebius:37/(28.083/100),ferrochrome:454/(462/100)},
      score:higher,comparability:{tuike:75,nebius:75,ferrochrome:50}
    },
    workforcePer100mEbitda:{
      group:'Työ',label:'Oma henkilöstö / 100 M€ käyttökatetta',unit:'hlö tai FTE / 100 M€',
      baseline:{value:100/.3,type:'reciprocal_reference',label:'333,3 / 100 M€'},
      values:{tuike:120/(344.6244/100),nebius:37/(raw.nebius.ebitdaM/100),ferrochrome:454/(137/100)},
      score:higher,comparability:{tuike:75,nebius:75,ferrochrome:50}
    },
    electricitySelfSufficiency:{
      group:'Energia',label:'Sähköomavaraisuus',unit:'%',
      baseline:{value:100,type:'technical_threshold',label:'100 %'},
      values:{kemi:250},score:threshold,comparability:{kemi:75}
    },
    waterUsageEffectiveness:{
      group:'Resurssit',label:'WUE',unit:'L/kWh IT',
      baseline:{value:.45,type:'external_benchmark',label:'0,45 L/kWh'},
      values:{nebius:.018},score:lower,comparability:{nebius:100}
    }
  };
  const scored={};
  for(const [id,m] of Object.entries(metrics)){
    scored[id]={...m,scores:Object.fromEntries(Object.entries(m.values).map(([e,v])=>[e,r1(m.score(v,m.baseline.value))]))};
    delete scored[id].score;
  }
  const lenses={
    capitalThroughput:{label:'Capital / Throughput',weights:{revenuePerWorkforce:.5,ebitdaPerWorkforce:.5}},
    employmentIntensity:{label:'Employment intensity',weights:{workforcePer100mRevenue:.5,workforcePer100mEbitda:.5}}
  };
  const lensResults={};
  for(const [lid,l] of Object.entries(lenses)){
    const entitiesOut={};
    for(const id of Object.keys(entities)){
      let num=0,den=0,cmp=0;
      for(const [mid,w] of Object.entries(l.weights)){
        const s=scored[mid].scores[id];
        if(Number.isFinite(s)){num+=s*w;den+=w;cmp+=(scored[mid].comparability[id]??0)*w;}
      }
      entitiesOut[id]={score:den?r1(num/den):null,coveragePct:r1(den*100),comparabilityPct:den?r1(cmp/den):null,stage:entities[id].stage};
    }
    const ranking=Object.entries(entitiesOut).filter(([id,v])=>entities[id].stage==='operating'&&v.coveragePct===100)
      .sort((a,b)=>b[1].score-a[1].score).map(([entity,v],i)=>({rank:i+1,entity,score:v.score}));
    lensResults[lid]={...l,entities:entitiesOut,ranking};
  }
  return {
    version:'0.2',status:'exploratory-baseline',
    principle:'50 pistettä tarkoittaa näkyvää baselinea; piste ei riipu vertailujoukon minimi- ja maksimiarvoista.',
    baselineRules:{
      ratioHigher:'50 + 20 × log2(value / baseline)',
      ratioLower:'50 − 20 × log2(value / baseline)',
      thresholdLinear:'50 × value / threshold',
      note:'Kaikki pisteet rajataan välille 0–100.'
    },
    entities,raw,metrics:scored,lenses:lensResults,
    referenceOnly:{
      nebiusCapacityMW2026:{value:75,note:'Valmistui alkuvuonna 2026; ei jaeta vuoden 2025 talous- tai käyttölukuihin.'},
      nebiusHeatGWh2025:{value:19.5,note:'Mitattu hukkalämmön vienti vuonna 2025.'},
      kemiDerivedEnergy:{consumptionTWh:.8,surplusTWh:1.2,note:'+1,2 TWh ei ole mitattu nettovienti.'}
    },
    stageRule:'HEL16 näkyy pre-operational reference -kohteena mutta ei osallistu käyttövaiheen Lens-rankingeihin.'
  };
}
