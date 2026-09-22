// Transparent publication calculations. Derived values are explicitly labelled and must not be presented as measured observations.

export function calculations() {
  // Tuike: unit is one ten-thousandth of a million euros. Arithmetic stays exact.
  const revenue = 5743740n;
  const ebitda = revenue * 600n / 1000n;
  const ebit = 303050n;
  const value = n => `${n / 10000n}.${String(n % 10000n).padStart(4,'0')}`;

  // Kemi illustration from Metsä Fibre's published rounded descriptors:
  // electricity production 2.0 TWh/year and electricity self-sufficiency 250%.
  // If self-sufficiency means production / own consumption = 2.5,
  // implied own consumption = 2.0 / 2.5 = 0.8 TWh and arithmetic surplus = 1.2 TWh.
  // These are derived illustrations, NOT measured grid import/export.
  const kemiProductionTWh = 2.0;
  const kemiSelfSufficiency = 2.5;
  const kemiImpliedConsumptionTWh = kemiProductionTWh / kemiSelfSufficiency;
  const kemiArithmeticSurplusTWh = kemiProductionTWh - kemiImpliedConsumptionTWh;

  return {
    tuike:{
      unit:'M€',
      period:'2025',
      entity:'Tuike Finland Oy',
      sourceRefs:['S001','S002'],
      input:{revenue:'574.374',ebitdaPercent:'60.0',ebit:'30.305'},
      output:{ebitda:value(ebitda),ebitdaMinusEbit:value(ebitda-ebit),revenueMinusEbitda:value(revenue-ebitda)},
      limitations:[
        'Lähtötiedon käyttökateprosentti on pyöristetty.',
        'EBITDA–EBIT-erotus ei ole suoraan luettu poistojen erä.',
        'Liikevaihto–EBITDA-jäännös ei osoita kotimaisten hankintojen määrää.'
      ]
    },
    kemiIllustration:{
      unit:'TWh/v',
      entity:'Metsä Fibre Kemin biotuotetehdas',
      sourceRefs:['S068'],
      status:'johdettu havainnollistus, ei mitattu verkkotase',
      input:{electricityProduction:2.0,selfSufficiencyPercent:250},
      assumptions:['250 % sähköomavaraisuus tulkitaan tässä havainnollistuksessa suhteeksi oma sähköntuotanto / oma sähkönkulutus = 2,5.'],
      output:{
        impliedOwnConsumption:Number(kemiImpliedConsumptionTWh.toFixed(3)),
        arithmeticProductionMinusConsumption:Number(kemiArithmeticSurplusTWh.toFixed(3))
      },
      interpretation:[
        'Kokonaiskulutusta käyttävä mittari näkee tehtaan noin 0,8 TWh/v sähkönkäyttäjänä tämän johdon perusteella.',
        'Tuotanto miinus johdettu oma kulutus on +1,2 TWh/v, mikä nostaa tehtaan erittäin vahvaksi sähköjärjestelmänäkökulmassa.',
        'Luku +1,2 TWh/v ei ole mitattu nettovienti eikä korvaa verkosta oton ja verkkoon syötön mittaussarjaa.',
        'Jos nettokuorma toimii suhdeluvun nimittäjänä, negatiivinen tai nollaa lähestyvä nimittäjä voi tehdä mittarista harhaanjohtavan tai määrittelemättömän.'
      ]
    }
  };
}
