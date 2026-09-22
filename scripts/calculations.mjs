// Unit: one ten-thousandth of a million euros. All arithmetic is exact integers.
export function calculations() {
  const revenue = 5743740n;
  const ebitda = revenue * 600n / 1000n;
  const ebit = 303050n;
  const value = n => `${n / 10000n}.${String(n % 10000n).padStart(4,'0')}`;
  return {
    unit:'M€', period:'2025', entity:'Tuike Finland Oy', sourceRefs:['S001','S002'],
    input:{revenue:'574.374',ebitdaPercent:'60.0',ebit:'30.305'},
    output:{ebitda:value(ebitda),ebitdaMinusEbit:value(ebitda-ebit),revenueMinusEbitda:value(revenue-ebitda)},
    limitations:['Lähtötiedon käyttökateprosentti on pyöristetty.','Erotus ei ole suoraan luettu poistojen erä.','Jäännös ei osoita hankintojen määrää.']
  };
}
