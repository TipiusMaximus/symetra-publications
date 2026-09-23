const classifyStatus=status=>{
  if(/^observed|^company_reported/.test(status)) return 'direct';
  if(status.includes('derived')) return 'derived';
  return 'qualified';
};

const entityKey=entity=>{
  const s=entity.toLowerCase();
  if(s.includes('google hamina')||s.includes('tuike')) return 'hamina';
  if(s.includes('nebius')) return 'nebius';
  if(s.includes('metsä fibre')||s.includes('kemi bioproduct')||s.includes('kemi mill')) return 'kemi';
  if(s.includes('outokumpu')||s.includes('ferrochrome')) return 'outokumpu';
  return 'other';
};

export function evidenceCoverage(evidence){
  const entities={
    hamina:{label:'Google / Tuike, Hamina'},
    nebius:{label:'Nebius, Mäntsälä'},
    kemi:{label:'Metsä Fibre, Kemi'},
    outokumpu:{label:'Outokumpu, Kemi–Tornio'}
  };
  const coverage=Object.fromEntries(Object.keys(entities).map(id=>[id,{}]));
  for(const item of evidence){
    const id=entityKey(item.entity);
    if(id==='other') continue;
    const domain=coverage[id][item.domain]??={direct:0,derived:0,qualified:0,total:0};
    domain[classifyStatus(item.status)]++;
    domain.total++;
    coverage[id][item.domain]=domain;
  }
  const domains=[...new Set(Object.values(coverage).flatMap(x=>Object.keys(x)))].sort();
  return {
    version:'0.1',
    meaning:{
      direct:'Lähdehavainto tai suoraan yhtiön/viranomaisen raportoima havainto',
      derived:'Johdettu laskelma, jonka lähteet ja kaava ovat näkyvissä',
      qualified:'Proxy, suunnitteluarvo tai yhtiön vaikutusarvio; käyttö vaatii rajausvaroituksen',
      missing:'Ei tarkoita automaattisesti datavajetta: mittari voi olla kohteelle soveltumaton'
    },
    entities,domains,coverage
  };
}
