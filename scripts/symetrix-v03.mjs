const r1=x=>Math.round(x*10)/10;
const clamp=x=>Math.max(0,Math.min(100,x));
const lg2=x=>Math.log(x)/Math.log(2);
const scoreHigher=(x,b)=>clamp(50+10*lg2(x/b));
const scoreLower=(x,b)=>clamp(50-10*lg2(x/b));

export function symetrixMatrixV03(){
  const baselines={
    turnoverPerWorkforce:{
      value:399262/1035346,
      unit:'M€/htv',
      type:'empirical_cross_industry',
      sourceRefs:['S080'],
      note:'Tilastokeskuksen vuoden 2024 yritysaineiston 20+ henkilön kokoluokkien yhdistetty liikevaihto / henkilötyövuodet.'
    },
    workforcePer100mTurnover:{
      value:100/(399262/1035346),
      unit:'htv / 100 M€',
      type:'empirical_cross_industry',
      sourceRefs:['S080'],
      note:'Edellisen baselinen käänteinen suhde.'
    },
    dataCenterOverhead:{
      value:.54,
      unit:'PUE-1',
      type:'industry_benchmark',
      sourceRefs:['S081'],
      note:'Uptime Institute 2025: globaali keskimääräinen PUE 1,54, joten infrastruktuurin overhead = 0,54.'
    },
    wue:{
      value:.45,
      unit:'L/kWh IT',
      type:'external_benchmark',
      sourceRefs:['S079'],
      note:'LBNL:n vuoden 2025 projektion alaraja 0,45–0,49 L/kWh.'
    },
    selfSufficiency:{
      value:100,
      unit:'%',
      type:'technical_baseline',
      sourceRefs:[],
      note:'100 % tarkoittaa, että oma vuosituotanto vastaa omaa vuosikulutusta.'
    }
  };
  const entities={
    tuike:{name:'Google / Tuike, Hamina',stage:'operating'},
    nebius:{name:'Nebius, Mäntsälä',stage:'operating'},
    kemi:{name:'Metsä Fibre, Kemi',stage:'operating'},
    ferrochrome:{name:'Outokumpu Ferrochrome',stage:'operating'},
    hel16:{name:'Microsoft HEL16',stage:'pre-operational'}
  };
  const raw={
    tuike:{revenueM:574.374,workforce:120,pue2025:1.10,waterConsumptionMillionGallons2024:.3},
    nebius:{revenueM:28.083,workforce:37,portfolioPue2025:1.25,wue2025:.018,heatExportGWh2025:19.5},
    kemi:{workforce:300,proxyBusinessRevenueM:2600,proxyBusinessWorkforce:1400,selfSufficiencyPct:250,electricityProductionTWh:2.0,derivedConsumptionTWh:.8},
    ferrochrome:{salesM:462,workforce:454,siteEnergyTWh:4},
    hel16:{}
  };
  const metrics={
    economicThroughput:{
      label:'Taloudellinen volyymi / työpanos',
      formula:'liikevaihto / oma henkilöstö',
      direction:'higher',
      baseline:baselines.turnoverPerWorkforce,
      applicability:'all_operating_businesses',
      values:{
        tuike:574.374/120,
        nebius:28.083/37,
        kemi:2600/1400,
        ferrochrome:462/454
      },
      scores:{},
      evidence:{tuike:'observed',nebius:'observed',kemi:'proxy_business_level',ferrochrome:'proxy_boundary'}
    },
    employmentIntensity:{
      label:'Työllistävyys suhteessa volyymiin',
      formula:'oma henkilöstö / 100 M€ liikevaihtoa',
      direction:'higher',
      baseline:baselines.workforcePer100mTurnover,
      applicability:'all_operating_businesses',
      values:{
        tuike:120/(574.374/100),
        nebius:37/(28.083/100),
        kemi:1400/(2600/100),
        ferrochrome:454/(462/100)
      },
      scores:{},
      evidence:{tuike:'observed',nebius:'observed',kemi:'proxy_business_level',ferrochrome:'proxy_boundary'}
    },
    dataCenterFacilityEfficiency:{
      label:'Datakeskuksen energiatehokkuus',
      formula:'PUE − 1',
      direction:'lower',
      baseline:baselines.dataCenterOverhead,
      applicability:'data_centers_only',
      values:{
        tuike:1.10-1,
        nebius:1.25-1
      },
      scores:{},
      evidence:{tuike:'site_observed',nebius:'portfolio_proxy'}
    },
    waterEfficiency:{
      label:'Datakeskuksen vedenkäytön tehokkuus',
      formula:'WUE = litraa / kWh IT',
      direction:'lower',
      baseline:baselines.wue,
      applicability:'data_centers_only',
      values:{tuike:.00144,nebius:.018},
      scores:{},
      evidence:{tuike:'estimate_non_seawater_mixed_period',nebius:'finland_site_observed'}
    },
    electricitySelfSufficiency:{
      label:'Sähköomavaraisuus',
      formula:'oma tuotanto / oma kulutus',
      direction:'higher',
      baseline:baselines.selfSufficiency,
      applicability:'sites_with_own_generation',
      values:{kemi:250},
      scores:{},
      evidence:{kemi:'observed'}
    }
  };
  for(const m of Object.values(metrics)){
    const scorer=m.direction==='higher'?scoreHigher:scoreLower;
    for(const [id,v] of Object.entries(m.values)) m.scores[id]=r1(scorer(v,m.baseline.value));
  }
  const cell=(metric,id)=>{
    if(entities[id].stage==='pre-operational') return {state:'pre-op'};
    if(Object.hasOwn(metric.scores,id)) return {state:'score',score:metric.scores[id],evidence:metric.evidence[id]};
    if(metric.applicability==='data_centers_only' && !['tuike','nebius','hel16'].includes(id)) return {state:'not-applicable'};
    if(metric.applicability==='sites_with_own_generation' && id==='ferrochrome') return {state:'unknown'};
    return {state:'unknown'};
  };
  const matrix={};
  for(const [mid,m] of Object.entries(metrics)){
    matrix[mid]={};
    for(const id of Object.keys(entities)) matrix[mid][id]=cell(m,id);
  }
  return {
    version:'0.3',
    status:'exploratory-baseline',
    scoring:{
      rule:'50 ± 10 × log2(value / baseline)',
      interpretation:['50 = baseline','60 = 2 × baseline','70 = 4 × baseline','40 = 0,5 × baseline','30 = 0,25 × baseline'],
      note:'Suurempi-parempi käyttää plusmerkkiä, pienempi-parempi miinusmerkkiä. Piste rajataan välille 0–100.'
    },
    entities,baselines,raw,metrics,matrix,
    context:{
      haminaWater2024:{value:.3,unit:'million US gallons consumed',sourceRefs:['S083']},
      haminaHeatRecovery:{value:40,unit:'GWh/v design potential',sourceRefs:['S084'],note:'Haminan Energian 5 MW lämpöpumppulaitoksen arvioitu vuosituotanto, ei vuoden 2025 toteuma.'},
      nebiusHeatRecovery:{value:19.5,unit:'GWh/v measured 2025',sourceRefs:['S076']},
      outokumpuTornioEnergy:{value:4,unit:'TWh/v site total',sourceRefs:[],note:'Tornion koko tehdasalueen energia, ei Ferrochrome-segmentin erillinen kulutus.'}
    }
  };
}
