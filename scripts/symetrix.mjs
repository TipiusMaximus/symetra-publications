const round1 = x => Math.round(x * 10) / 10;
const clamp = (x,min,max) => Math.max(min,Math.min(max,x));

export function symetrixMatrixV01() {
  const entities = {
    tuike:{name:'Google / Tuike Finland Oy, Hamina'},
    hel16:{name:'Microsoft HEL16, Hepokorpi'},
    kemi:{name:'Metsä Fibre, Kemin biotuotetehdas'},
    ferrochrome:{name:'Outokumpu Ferrochrome, Kemi–Tornio'}
  };

  const raw = {
    tuike:{
      workforce:120,
      revenueM:574.374,
      ebitdaM:344.6244
    },
    hel16:{},
    kemi:{
      workforce:300,
      electricityProductionTWh:2.0,
      electricitySelfSufficiencyPct:250
    },
    ferrochrome:{
      workforce:454,
      salesM:462,
      externalSalesM:217,
      ebitdaM:137
    }
  };

  const metrics = {
    revenuePerWorkforce:{
      label:'Myynti / oma henkilöstö tai FTE',
      unit:'M€/hlö tai FTE',
      direction:'higher',
      normalization:'comparative-minmax',
      mode:'exploratory',
      values:{
        tuike:raw.tuike.revenueM/raw.tuike.workforce,
        ferrochrome:raw.ferrochrome.salesM/raw.ferrochrome.workforce
      }
    },
    ebitdaPerWorkforce:{
      label:'Käyttökate / oma henkilöstö tai FTE',
      unit:'M€/hlö tai FTE',
      direction:'higher',
      normalization:'comparative-minmax',
      mode:'exploratory',
      values:{
        tuike:raw.tuike.ebitdaM/raw.tuike.workforce,
        ferrochrome:raw.ferrochrome.ebitdaM/raw.ferrochrome.workforce
      }
    },
    workforcePer100mRevenue:{
      label:'Oma henkilöstö / 100 M€ myyntiä',
      unit:'hlö tai FTE / 100 M€',
      direction:'higher',
      normalization:'comparative-minmax',
      mode:'exploratory',
      values:{
        tuike:raw.tuike.workforce/(raw.tuike.revenueM/100),
        ferrochrome:raw.ferrochrome.workforce/(raw.ferrochrome.salesM/100)
      }
    },
    workforcePer100mEbitda:{
      label:'Oma henkilöstö / 100 M€ käyttökatetta',
      unit:'hlö tai FTE / 100 M€',
      direction:'higher',
      normalization:'comparative-minmax',
      mode:'exploratory',
      values:{
        tuike:raw.tuike.workforce/(raw.tuike.ebitdaM/100),
        ferrochrome:raw.ferrochrome.workforce/(raw.ferrochrome.ebitdaM/100)
      }
    },
    reportedWorkforce:{
      label:'Raportoitu oma henkilöstö / FTE',
      unit:'hlö tai FTE',
      direction:'higher',
      normalization:'comparative-minmax',
      mode:'exploratory',
      values:{
        tuike:raw.tuike.workforce,
        kemi:raw.kemi.workforce,
        ferrochrome:raw.ferrochrome.workforce
      }
    },
    electricitySelfSufficiency:{
      label:'Sähköomavaraisuus',
      unit:'%',
      direction:'higher',
      normalization:'absolute-benchmark-cap-100',
      mode:'exploratory',
      values:{kemi:raw.kemi.electricitySelfSufficiencyPct}
    }
  };

  function metricScores(metric){
    const entries=Object.entries(metric.values).filter(([,v])=>Number.isFinite(v));
    if(metric.normalization==='absolute-benchmark-cap-100'){
      return Object.fromEntries(entries.map(([id,v])=>[id,round1(clamp(v,0,100))]));
    }
    if(entries.length<2) return {};
    const vals=entries.map(([,v])=>v), min=Math.min(...vals), max=Math.max(...vals);
    if(max===min) return Object.fromEntries(entries.map(([id])=>[id,50]));
    return Object.fromEntries(entries.map(([id,v])=>{
      const base=(v-min)/(max-min)*100;
      return [id,round1(metric.direction==='lower'?100-base:base)];
    }));
  }

  const metricResults=Object.fromEntries(Object.entries(metrics).map(([id,m])=>[id,{...m,scores:metricScores(m)}]));

  const lenses = {
    capitalThroughput:{
      label:'Capital / Throughput',
      description:'Palkitsee suurta myyntiä ja käyttökatetta suhteessa raportoituun omaan henkilöstöön.',
      mode:'exploratory',
      weights:{revenuePerWorkforce:0.5,ebitdaPerWorkforce:0.5}
    },
    employmentIntensity:{
      label:'Employment intensity',
      description:'Palkitsee suurta raportoitua omaa työpanosta suhteessa myynnin ja käyttökatteen mittakaavaan.',
      mode:'exploratory',
      weights:{workforcePer100mRevenue:0.5,workforcePer100mEbitda:0.5}
    },
    reportedWorkforceScale:{
      label:'Reported workforce scale',
      description:'Palkitsee raportoidun oman henkilöstön/FTE:n määrää riippumatta tuotannon koosta.',
      mode:'exploratory',
      weights:{reportedWorkforce:1}
    },
    gridIndependence:{
      label:'Grid independence benchmark',
      description:'Palkitsee sähköomavaraisuutta. 100 % tai enemmän saa tässä tarkoituksella 100 pistettä.',
      mode:'exploratory',
      weights:{electricitySelfSufficiency:1}
    }
  };

  function lensResult(lens){
    const total=Object.values(lens.weights).reduce((a,b)=>a+b,0);
    const entitiesOut={};
    for(const id of Object.keys(entities)){
      let weighted=0,available=0;
      for(const [metricId,w] of Object.entries(lens.weights)){
        const score=metricResults[metricId].scores[id];
        if(Number.isFinite(score)){weighted+=score*w;available+=w;}
      }
      entitiesOut[id]={
        score:available?round1(weighted/available):null,
        coveragePct:round1(available/total*100)
      };
    }
    const complete=Object.entries(entitiesOut).filter(([,v])=>v.score!==null&&v.coveragePct===100);
    const ranking=complete.length>=2
      ? complete.sort((a,b)=>b[1].score-a[1].score).map(([id,v],i)=>({rank:i+1,entity:id,score:v.score}))
      : [];
    return {...lens,entities:entitiesOut,ranking,rankable:ranking.length>=2};
  }

  const lensResults=Object.fromEntries(Object.entries(lenses).map(([id,l])=>[id,lensResult(l)]));

  return {
    version:'0.1',
    status:'exploratory',
    principle:'Epäreilu pisteytys on sallittu. Piilotettu epäreiluus ei ole.',
    strict:{
      scoreableCrossIndustryLenses:0,
      note:'Nykyinen aineisto ei vielä tarjoa vähintään kahta kohdetta samoilla organisaatio-, aika-, henkilö- ja energiakäsitteillä. Siksi v0.1:n pisteet ovat eksploratiivisia.'
    },
    entities,
    raw,
    metrics:metricResults,
    lenses:lensResults,
    rankFlips:[
      {
        entities:['tuike','ferrochrome'],
        from:'capitalThroughput',
        to:'employmentIntensity',
        note:'Sama yhtiö/segmenttidata vaihtaa järjestyksen täysin, kun arvotus vaihtuu rahavirrasta omaan työpanokseen.'
      }
    ]
  };
}
