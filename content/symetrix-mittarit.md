---
title: Symetrix: mittarit ja perustelut
slug: symetrix-mittarit
route: /analyysit/datakeskukset/symetrix-mittarit/
language: fi
status: ready
published: true
updated: 2026-09-22
description: Mitä kukin Symetrix-mittari mittaa, mikä on sen baseline, mitä suurempi tai pienempi piste tarkoittaa ja millä rajauksilla yritysten luvut on laskettu.
layout: article
---
## Pisteytyksen perussääntö

Symetrixin päämatriisissa näytetään vain mittarin nimi, kaava, suunta ja yrityskohtainen piste. Tällä sivulla avataan laskennan tausta.

Ratio-mittareissa käytetään kaavaa:

`piste = 50 ± 10 × log2(arvo / baseline)`

**50 = baseline.** Kun suurempi arvo on parempi, käytetään plusmerkkiä. Kun pienempi arvo on parempi, käytetään miinusmerkkiä. Yksi kaksinkertaistuminen muuttaa pistettä 10 pistettä. Piste rajataan välille 0–100.

Merkinnät:

- **Observed** = lähteen raportoima samaan kohteeseen kuuluva luku
- **P / Proxy** = luku on käyttökelpoinen suuntaa-antavana vertailuna, mutta organisaatio- tai vuosiraja ei vastaa täysin saraketta
- **E / Estimate** = lähteistetty estimaatti tai johdettu suuruusluokka, ei mitattu toteuma
- **S / Scenario** = tarkoituksellinen herkkyysarvo; ei väite toteutuneesta arvosta
- **?** = mittari sopii kohteelle, mutta tarvittava havainto puuttuu
- **—** = mittari ei sovellu kohteelle
- **Pre-op** = kohde ei ole vielä käyttövaiheessa

## Taloudellinen volyymi / työpanos

**Kaava:** liikevaihto / oma henkilöstö  
**Suunta:** suurempi → korkeampi piste  
**Kysymys:** kuinka paljon myyntivolyymia näkyy suhteessa raportoituun omaan työpanokseen?

**Baseline:** noin **0,386 M€/henkilötyövuosi**.

Baseline johdetaan Tilastokeskuksen vuoden 2024 yritysaineistosta yhdistämällä kaikki vähintään 20 henkilön kokoluokat: 399,262 mrd € liikevaihtoa / 1 035 346 henkilötyövuotta. [Tilastokeskus: Suomi lukuina 2026](https://otos.stat.fi/server/api/core/bitstreams/f3e835da-b220-4251-8079-7b7309d1d2a4/content).

| Kohde | Lähtöarvo | Piste | Rajaus |
|---|---:|---:|---|
| Google / Tuike | 574,374 M€ / 120 = 4,786 M€/hlö | **86** | yhtiötaso, 2025 |
| Nebius DC Oy | 28,083 M€ / 37 = 0,759 M€/hlö | **60** | yhtiötaso, 2025 |
| Kemi Bio | 2,6 mrd € / 1 400 = 1,857 M€/hlö | **73 P** | **Metsä Fibre -liiketoiminnan proxy**, ei Kemin tehtaan oma luku |
| Ferrochrome | 462 M€ / 454 FTE = 1,018 M€/FTE | **64 P** | liiketoimintasegmentti, vuoden lopun FTE |

Tuike: [Proff](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG). Nebius: [Proff](https://www.proff.fi/yrityksen/nebius-dc-oy/m%C3%A4nts%C3%A4l%C3%A4/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2541661-9I0ZDG). Kemi-proxy: [Metsä Fibre](https://www.metsagroup.com/metsafibre/about-metsafibre/key-figures-and-financial-reporting/). Ferrochrome: [Outokumpu Annual Report 2025](https://www.outokumpu.com/-/media/files/investors/annual-reports/annual-report-2025/outokumpu_annual_report_2025_a4.pdf?hash=A9F7D1F6309A51EC70DC676A8907E46B&modified=20260227103807&revision=549bc02d-644c-4edb-b7bc-20b85245380b).

**Mitä mittari ei kerro:** korkea piste ei tarkoita suurta kotimaista arvonlisää tai yhteiskunnallista hyötyä. Se voi kuvata pääomaintensiivistä rakennetta, konsernin sisäistä laskutusta tai ulkoistetun työn suurta osuutta.

## Työllistävyys suhteessa volyymiin

**Kaava:** oma henkilöstö / 100 M€ liikevaihtoa  
**Suunta:** suurempi → korkeampi piste  
**Kysymys:** kuinka paljon raportoitu oma työpanos kasvaa suhteessa saman toiminnan myyntivolyymiin?

**Baseline:** noin **259 henkilötyövuotta / 100 M€ liikevaihtoa**. Se on edellisen Tilastokeskus-baselinen käänteinen suhde.

| Kohde | Lähtöarvo | Piste | Rajaus |
|---|---:|---:|---|
| Google / Tuike | 20,9 hlö / 100 M€ | **14** | yhtiötaso |
| Nebius DC Oy | 131,8 hlö / 100 M€ | **40** | yhtiötaso |
| Kemi Bio | 53,8 hlö / 100 M€ | **27 P** | Metsä Fibre -liiketoiminnan proxy |
| Ferrochrome | 98,3 FTE / 100 M€ | **36 P** | liiketoimintasegmentti |

Tämä käyttää samoja lähteitä kuin taloudellinen volyymi / työpanos.

**Miksi sama data antaa päinvastaisen kuvan?** Edellinen mittari palkitsee paljon myyntiä suhteessa henkilöstöön. Tämä mittari palkitsee paljon henkilöstöä suhteessa myyntiin. Symetrix tekee tämän arvovalinnan näkyväksi sen sijaan, että piilottaisi sen yhteen “tehokkuuslukuun”.

## Haminan sähkö: kysymysmerkistä läpinäkyväksi estimaatiksi

Haminan tarkkaa mitattua vuotuista sähkönkulutusta ei ole julkisesti saatavilla. Se ei silti tarkoita, että solun pitäisi jäädä täysin tyhjäksi.

Vuonna 2026 julkaistu Hannu Jaakkolan tutkimus arvioi Haminan Googlen vuosikulutukseksi epäsuoralla laskennalla noin **870 GWh/v** ja korostaa samalla, ettei operaattorin varsinaista teknistä kulutuslukua ole julkisesti saatavilla. Siksi Symetrix luokittelee arvon **E = Estimate**, ei havainnoksi.

| Skenaario | Vuotuinen energia | Keskimääräinen kokonaiskuorma | PUE 1,10:llä johdettu keskimääräinen IT-kuorma | Status |
|---|---:|---:|---:|---|
| **A** | **0,87 TWh/v** | **~99 MW** | **~90 MW** | E · ulkoiseen arvioon ankkuroitu |
| **B** | **1,50 TWh/v** | **~171 MW** | **~156 MW** | S · herkkyystesti |
| **C** | **2,00 TWh/v** | **~228 MW** | **~208 MW** | S · herkkyystesti |

Kaavat ovat `energia / 8 760 h` ja IT-kuormalle lisäksi `kokonaisenergia / PUE`. PUE 1,10 on Haminan vuoden 2025 kampuskohtainen arvo.

### Varavoima sanity checkinä, ei kulutusmittarina

Tuiken vuoden 2024 YVA:ssa todetaan, että palvelinkeskuksella on **100 % varavoima kriittiselle laitteistolle** ja kaikkien olemassa olevien sekä suunniteltujen palvelinkeskusten varavoimageneraattoreiden yhteenlaskettu **polttoaineteho ylittää 300 MW**. Tämä on kiinnostava mittakaava-ankkuri, mutta sitä ei saa muuttaa suoraan vuosikulutukseksi:

- polttoaineteho ≠ sähköteho;
- YVA-raja sisältää myös suunnitellut laajennukset;
- varavoima mitoitetaan kriittiselle kuormalle;
- generaattorit eivät normaalisti käy 8 760 tuntia vuodessa.

Valmistajan teknisessä taustassa suuren dieselgeneraattorin kokonaisketjun hyötysuhde on suuruusluokaltaan noin 40 % moottorille ja noin 90 % AC-generaattorille. Tätä voidaan käyttää vain siihen, että varavoiman ja 99–228 MW:n kuormaskenaarioiden mittakaavat eivät ole ilmiselvästi ristiriidassa — **ei** Haminan sähkönkulutuksen laskemiseen.

Lähteet: [Jaakkola 2026](https://journals.sagepub.com/doi/full/10.3233/FAIA251716), [Google PUE](https://www.datacenters.google/efficiency/), [Tuike YVA](https://www.ymparisto.fi/sites/default/files/documents/Tuike%20Finland%20Oy%20-%20YVA%20selostus%20-%201%20versio%20-%2020240320.pdf), [Caterpillar: generator efficiency background](https://www.cat.com/en_MX/by-industry/electric-power/Articles/White-papers/answers-for-the-telecom-industry.html).

## Datakeskuksen energiatehokkuus

**Kaava:** PUE − 1  
**Suunta:** pienempi → korkeampi piste  
**Kysymys:** kuinka suuri osa datakeskuksen energiasta menee IT-kuorman lisäksi jäähdytykseen, sähkönjakeluun ja muuhun tukijärjestelmään?

PUE = datakeskuksen kokonaisenergia / IT-laitteiden energia. Täydellinen PUE olisi 1,00. Siksi pisteytyksessä käytetään **PUE − 1**, jolloin verrataan vain infrastruktuurin overhead-osuutta.

**Baseline:** vuoden 2025 globaali keskimääräinen PUE **1,54**, eli overhead **0,54**. [Uptime Institute Global Data Center Survey 2025](https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf?version=0).

| Kohde | PUE | Overhead | Piste | Rajaus |
|---|---:|---:|---:|---|
| Google / Hamina | noin 1,10 | 0,10 | **74** | Haminan kampus, 2025 |
| Nebius | 1,25 | 0,25 | **61 P** | Nebiuksen vuoden 2025 portfolio, ei Mäntsälä yksin |
| Kemi Bio | — | — | — | PUE ei ole sellutehtaan mittari |
| Ferrochrome | — | — | — | PUE ei ole ferrokromitehtaan mittari |

Hamina: [Google Data Centers: PUE](https://www.datacenters.google/efficiency/). Nebiuksen portfolio-PUE: [Nebius Sustainability 2025](https://nebius.com/newsroom/nebius-publishes-2025-sustainability-report-outlining-blueprint-for-scaling-responsibly).

## Datakeskuksen vedenkäytön tehokkuus

**Kaava:** WUE = litraa vettä / kWh IT-energiaa  
**Suunta:** pienempi → korkeampi piste  
**Kysymys:** kuinka paljon vettä datakeskus käyttää suhteessa IT-kuorman energiaan?

**Baseline:** **0,45 L/kWh**, Lawrence Berkeley National Laboratoryn raportin projektiotasosta. [LBNL: 2024 United States Data Center Energy Usage Report](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report.pdf).

| Kohde | WUE | Piste | Rajaus |
|---|---:|---:|---|
| Google / Hamina | **~0,0014 L/kWh E*** | **100 E*** | Ei-merivesi-nettokulutus 2024 / arvioitu IT-energia; eri vuosia yhdistävä estimaatti |
| Nebius Mäntsälä | 0,018 L/kWh | **96** | Suomen toimipaikka, 2025 |
| Kemi Bio | — | — | WUE ei ole sama mittari prosessiteollisuudelle |
| Ferrochrome | — | — | WUE ei ole sama mittari metallituotannolle |

**100 E*** ei tarkoita, että Hamina olisi todistetusti täydellinen tai että sen kokonaisvesivaikutus olisi Nebiusta pienempi. Se tarkoittaa vain, että nykyinen ei-merivesi-estimaatti on nykyisen WUE-baselinen näkökulmasta asteikon katon yli.

Nebius: [Nebius Sustainability 2025](https://nebius.com/newsroom/nebius-publishes-2025-sustainability-report-outlining-blueprint-for-scaling-responsibly). Google raportoi Haminan vuoden 2024 vedenkulutukseksi 0,3 miljoonaa US-gallonaa ja sulkee meriveden pois vesimittareistaan. Kun tämä yhdistetään 0,87 TWh/v sähköestimaattiin ja PUE 1,10:een, saadaan **~0,0014 L/kWh IT**. Nykyisellä 0,45 L/kWh baselinella kaava antaa pisteasteikon katon, **100**. Se merkitään `E*`, koska kyse ei ole mitatusta standardi-WUE:sta vaan eri vuosia yhdistävästä ei-merivesi-estimaatista. [Google 2025 Environmental Report](https://sustainability.google/google-2025-environmental-report/).

## Resurssivirran neljä ulottuvuutta

Työllisyys sopii E0→E3-rajoihin, mutta vesi ja energia tarvitsevat moniulotteisen rajauksen. Jokaiselle resurssihavainnolle kirjataan vähintään:

1. **lähde** — esimerkiksi makea pintavesi, talousvesi, merivesi tai kierrätetty vesi;
2. **käyttörooli** — prosessi, jäähdytys tai palvelukäyttö;
3. **kirjanpitokäsite** — withdrawal, discharge, consumption, throughput, lupa tai design;
4. **status** — toteuma, estimaatti, suunnittelu, lupa tai johdettu arvo.

Näin esimerkiksi Haminan **0,3 milj. gallonan ei-merivesi-nettokulutus** ja **80 Mm³/v merivedenoton lupakatto** voivat näkyä yhtä aikaa ilman että niitä summataan yhdeksi harhaanjohtavaksi “vedenkulutukseksi”. Sama sääntö koskee energiaa: **MW kapasiteettia ei muuteta MWh/v energiaksi ilman eksplisiittistä käyttöaikaoletusta.**

[Lataa resource-flow taxonomy](/downloads/resource-flow-taxonomy.json).

## Vesi: sama resurssi, kolme eri suuretta

Veden kohdalla Symetrix erottaa vähintään **vedenoton (withdrawal)**, **jätevesivirran/palautuksen** ja **nettokulutuksen (consumption)**. Jäähdytysveden läpivirtaus pidetään vielä erillään näistä.

### Kemi: vuoden 2025 toteuma

Metsä Groupin vuoden 2025 tuotantoyksikkötaulukossa Metsä Fibre Kemi on oma sarakkeensa. Raportoidut toteumat ovat:

- **vedenotto 32,819 Mm³/v**
- **jätevesivirta 13,931 Mm³/v**
- **kemiallisen sellun tuotanto 927 kt/v**

Näistä voidaan johtaa:

- **vedenotto / sellutonni ≈ 35,4 m³/t**
- **jätevesivirta / sellutonni ≈ 15,0 m³/t**

Mill-specific lukuja ei ole erikseen varmennettu, mutta ne sisältyvät liiketoiminta-/konsernitason rajalliseen varmennukseen.

Aiempi **10 m³/t** säilyy design-kontekstina. Metsä Fibre kutsuu sitä raakaveden suunnitteluarvoksi ja liittää saman design-arvon syntyvän jäteveden määrään. Vuoden 2025 toteutunut jätevesivirta ~15,0 m³/t on siis samaa suuruusluokkaa mutta ei identtinen käsite eikä sama status.

**32,819 − 13,931 = 18,888 Mm³** on vain vedenoton ja raportoidun jätevesivirran erotus. Sitä ei nimetä nettovedenkulutukseksi, koska jätevesivirta ei ole täydellinen palautusvesitase.

### Hamina

Google raportoi vuodelta 2024 noin **11 356 m³ vedenottoa** ja noin **1 136 m³ nettokulutusta**. Googlen metodologia sulkee meriveden pois näistä luvuista. Tuiken YVA:ssa merivedenoton lupakatto on **80 Mm³/v**, mutta se ei ole toteutunut vuosiarvo.

| Havainto | Hamina | Kemi Bio | Status |
|---|---:|---:|---|
| Vedenotto | ~11 356 m³/v | **32,819 Mm³/v** | Hamina actual 2024, seawater excluded · Kemi actual 2025 |
| Nettokulutus | ~1 136 m³/v | ? | Kemin sama määritelmä puuttuu |
| Jätevesivirta | ~10 221 m³/v discharge | **13,931 Mm³/v** | eri raportointikehikko |
| Vedenotto / tuotantotonni | — | **~35,4 m³/t** | Kemi 2025 actual-derived |
| Jätevesivirta / tuotantotonni | — | **~15,0 m³/t** | Kemi 2025 actual-derived |
| Jäähdytys | merivesijärjestelmä; actual throughput avoin | suljettu jäähdytysvesikierto | eri fysikaalinen rakenne |

Absoluuttisessa ei-merivesi-withdrawal-vertailussa Kemin 2025 vedenotto on noin **2 890×** Haminan 2024 raportoitu vedenotto. Tätä ei pisteytetä sellaisenaan, koska vuosirajat, tuotteet ja vesijärjestelmät eroavat. Haminan merivesijäähdytys tekee lisäksi näkyväksi, miksi "vesi" ei ole yksi akseli.

Lähteet: [Metsä Group Annual Review 2025](https://www.metsagroup.com/globalassets/metsa-group/documents/investors/financial-reporting/annual-reports/2025/metsa-group-annual-review-2025.pdf), [Metsä Fibre: Every drop counts](https://www.metsagroup.com/metsafibre/news-and-publications/news-and-releases/stories/2025/every-drop-counts/), [Google 2025 Environmental Report](https://sustainability.google/google-2025-environmental-report/), [Tuike YVA](https://www.ymparisto.fi/sites/default/files/documents/Tuike%20Finland%20Oy%20-%20YVA%20selostus%20-%201%20versio%20-%2020240320.pdf).

### Haminan ei-merivesi-intensiteetti estimaattina

Kun vuoden 2024 raportoitu, meriveden poissulkeva nettokulutus yhdistetään 0,87 TWh/v sähköestimaattiin ja PUE 1,10:een, saadaan kuvaileva proxy:

**~0,0014 L/kWh IT (E)**.

0,87–2,0 TWh/v sähkön herkkyyshaarukalla sama proxy olisi noin **0,0006–0,0014 L/kWh IT**.

Tätä **ei pisteytetä Nebiuksen WUE:ta vastaan**. Se sekoittaa vuoden 2024 veden, vuoden 2025 PUE:n ja vuoden 2026 ulkoisen sähköestimaatin, ja Googlen vesiluku sulkee meriveden kokonaan pois. Sen tehtävä on näyttää, että myös puuttuva WUE-solu voidaan korvata informatiivisella, eksplisiittisesti epävarmalla estimaatilla.


## Kemin toteutunut vedenkäyttö 2025

Metsä Groupin vuoden 2025 vuosiraportin tehdaskohtainen Metsä Fibre -taulukko antaa nyt Kemin biotuotetehtaalle toteutuneet vuosiarvot:

- **selluntuotanto 927 kt**
- **vedenotto 32,819 milj. m³**
- **jätevesivirta 13,931 milj. m³**

Näistä voidaan johtaa:

- **vedenotto ~35,4 m³ / tuotettu sellutonni**
- **jätevesivirta ~15,0 m³ / tuotettu sellutonni**

Nämä ovat paljon käyttökelpoisempia auditissa kuin pelkkä 10 m³/t design-arvo, mutta niitä pitää tulkita oikein. Vuosi 2025 ei ollut täydellinen steady-state-vuosi: Kemin tehtaalla oli korjausseisokkeja, ja tuotanto jäi selvästi 1,50 Mt/v nimelliskapasiteetista. Siksi actual-intensiteetti voi olla nimellistilaa korkeampi.

Lisäksi **vedenotto, jätevesivirta ja nettovedenkulutus eivät ole sama asia**. Metsä Group raportoi konsernitasolla vedenkulutuksen erikseen, mutta tästä tehdaskohtaisesta taulukosta ei saada suoraan Kemin haihtuvaa/sitoutuvaa nettokulutusta. Sitä ei johdeta automaattisesti vedenoton ja jätevesivirran erotuksena.

Tämä havainto sulkee yhden audit-aukon: Kemin actual withdrawal ja wastewater ovat nyt tiedossa. Avoimeksi jää site-kohtainen **consumptive water use** sekä myöhempi täyden kapasiteetin steady-state-vuosi.

## Vesi suhteessa liikevaihtoon

Poikkitoimialainen näkökulma normalisoi vedenoton taloudellisella myyntivolyymilla:

**vedenottointensiteetti = vedenotto m³ / liikevaihto M€**

### Hamina 2024

Tuike Finland Oy:n vuoden 2024 liikevaihto oli **452,704 M€** ja Googlen raportoitu ei-merivesi-vedenotto noin **11 356 m³**:

**~25,1 m³/M€**

Boundary on near-match: vesiluku on Haminan kampus ja liikevaihto suomalainen oikeushenkilö.

### Kemi 2025 — toteuman konservatiivinen alaraja

Kemin toteutunut vedenotto oli **32,819 Mm³** vuonna 2025. Kemin omaa liikevaihtoa ei ole julkisesti eroteltu. Jos numerator jaetaan tarkoituksella **koko Metsä Fibren vuoden 2025 liikevaihdolla 2,6 mrd €**, saadaan:

**≥ ~12 623 m³/M€**

Tämä on konservatiivinen alaraja, koska nimittäjä sisältää kaikki Metsä Fibren sellutehtaat ja sahat. Kemin oikea tehdaskohtainen liikevaihto on tätä pienempi, joten site-tason suhde olisi samalla numeratorilla suurempi.

Haminan ~25,1 m³/M€ ja Kemin konservatiivinen ≥12 623 m³/M€ tuottavat noin **503× scope-jumpin**. Tätä ei tulkita 503-kertaiseksi "huonommuudeksi": Kemi valmistaa fyysistä tuotetta vesiprosessissa, Haminan raportoitu luku sulkee meriveden pois, vuodet eroavat ja Kemin denominator on tarkoituksella liian suuri.

**Miksi mittari on hyödyllinen?** Se paljastaa taloudellisen tuotantorakenteen materiaalisen intensiteetin. Absoluuttinen vedenotto, m³/t, m³/M€ ja nettokulutus vastaavat eri kysymyksiin ja pidetään rinnakkain.

Lähteet: [Tuike 2024 taloustiedot](https://www.asiakastieto.fi/yritykset/fi/tuike-finland-oy/22060717/taloustiedot), [Google 2025 Environmental Report](https://sustainability.google/google-2025-environmental-report/), [Metsä Group Annual Review 2025](https://www.metsagroup.com/globalassets/metsa-group/documents/investors/financial-reporting/annual-reports/2025/metsa-group-annual-review-2025.pdf), [Metsä Fibre financials](https://www.metsagroup.com/metsafibre/about-metsafibre/key-figures-and-financial-reporting/).

## Sähkö suhteessa liikevaihtoon

PUE ja sellutehtaan kWh/t ovat molemmat hyödyllisiä **toimialan sisäisiä** tehokkuusmittareita, mutta niitä ei voi verrata numerona keskenään. Poikkitoimialainen kysymys voidaan sen sijaan muodostaa samalla tavalla kuin vedelle:

**sähköintensiteetti = vuotuinen sähkönkäyttö GWh / liikevaihto M€**

### Hamina

Haminan nykyinen sähköestimaatti on noin **870 GWh/v**. Tuike Finland Oy:n vuoden 2024 liikevaihto oli **452,704 M€**, joten exploratory-intensiteetti on:

**~1,92 GWh/M€ (E)**

Arvo yhdistää ulkoisen sähköestimaatin ja oikeushenkilön liikevaihdon, joten se ei ole mitattu site-tason tunnusluku.

### Kemi

Kemin biotuotetehdas tuottaa **2,0 TWh/v** sähköä ja ilmoittaa sähköomavaraisuudeksi **250 %**. Tulkinnalla tuotanto / oma kulutus = 2,5 saadaan johdettu oma sähkönkulutus noin **0,8 TWh/v**.

Kemin omaa liikevaihtoa ei ole julkaistu erikseen. Jos 0,8 TWh jaetaan tarkoituksella **koko Metsä Fibren vuoden 2024 liikevaihdolla 2 328,3 M€**, saadaan konservatiivinen alaraja:

**≥ ~0,344 GWh/M€ (Q)**

Tämä ei tarkoita, että Kemin todellinen site-intensiteetti olisi 0,344. Koska tehtaan oma liikevaihto on koko Metsä Fibreä pienempi, todellinen site-luku olisi tätä suurempi.

Mielenkiintoinen break-even-kysymys saadaan ratkaisemalla, millä Kemin site-liikevaihdolla 0,8 TWh/v antaisi saman ~1,92 GWh/M€ intensiteetin kuin Hamina:

**~416 M€ / vuosi.**

Jos Kemin site-liikevaihto olisi tätä suurempi, sähkö/liikevaihto olisi Haminan estimaattia pienempi; jos pienempi, suurempi. Metsä Fibre arvioi erikseen Kemin tehtaan lisäävän Suomen viennin arvoa noin **0,5 mrd € vuodessa**, mutta vientivaikutus ei ole sama asia kuin tehtaan liikevaihto, joten sitä ei käytetä harmonisoituna nimittäjänä.

### Kemin toimialakohtainen sisäinen energiamittari

Nykyisellä 1,50 Mt/v kokonaispulpin nimelliskapasiteetilla johdettu 0,8 TWh/v sähkönkulutus vastaa noin:

**0,533 MWh/t = 533 kWh/t sellua.**

Tämä on hyödyllinen sellutehtaan sisäinen tehokkuusmittari. Sen rooli on samantapainen kuin PUE:lla datakeskuksessa — se auttaa arvioimaan oman toimialan teknistä tehokkuutta — mutta **PUE ja kWh/t eivät ole keskenään yhteismitallisia**.

Lähteet: [Metsä Fibre: Kemin biotuotetehdas](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/), [Metsä Fibre: Kemin vaikutukset](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/), [Tuike 2024 taloustiedot](https://www.asiakastieto.fi/yritykset/fi/tuike-finland-oy/22060717/taloustiedot).

## Sähköomavaraisuus

**Kaava:** oma sähköntuotanto / oma sähkönkulutus  
**Suunta:** suurempi → korkeampi piste  
**Kysymys:** kuinka suuren osan omasta sähkönkulutuksesta toimipaikka tuottaa itse?

**Baseline:** **100 %**. Tällä tasolla oma vuosituotanto vastaa omaa vuosikulutusta.

| Kohde | Lähtöarvo | Piste | Rajaus |
|---|---:|---:|---|
| Google / Hamina | ? | ? | oma tuotanto / kulutus ei vielä samalla rajalla |
| Nebius Mäntsälä | ? | ? | oma tuotanto / kulutus ei vielä samalla rajalla |
| Kemi Bio | 250 % | **63** | toimipaikan raportoitu sähköomavaraisuus |
| Ferrochrome | ? | ? | oma tuotanto / kulutus ei vielä eroteltu Ferrochrome-rajalle |

Kemi: [Metsä Fibre: Kemin biotuotetehdas](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/).

Tämä mittari ei ole sama asia kuin verkon nettokuorma. Kemin 250 % omavaraisuudesta voidaan johtaa noin 0,8 TWh omaa kulutusta ja +1,2 TWh tuotannon ja johdetun kulutuksen erotusta, mutta +1,2 TWh **ei ole tässä auditissa mitattu verkkoon vienti**.


## Nettoriippuvuus sähköverkosta

Pelkkä sähkönkulutus ei kerro, onko toimipaikka verkon nettokuluttaja vai nettotuottaja. Tätä varten käytetään kuvailevaa mittaria:

**net grid dependence = (netto-otto verkosta − nettovienti verkkoon) / oma sähkönkulutus × 100**

Tulkinta:

- **+100 %** = koko oma sähkönkulutus tulee vuositasolla nettomääräisesti verkosta
- **0 %** = vuositasolla nettosähköomavarainen
- **negatiivinen arvo** = toimipaikka on nettoviejä sähköverkkoon

### Kemi

Metsä Fibre raportoi Kemin biotuotetehtaan tuottavan **2,0 TWh/v** sähköä, sähköomavaraisuuden olevan **250 %**, ja ylijäävän sähkön menevän valtakunnan verkkoon. Näistä voidaan johtaa:

- oma sähkönkulutus ≈ **0,8 TWh/v**
- vuosittainen nettosähköylijäämä ≈ **1,2 TWh/v**
- net grid dependence ≈ **−150 %**

Negatiivinen arvo tarkoittaa, että johdettu vuosittainen nettovienti vastaa noin 1,5-kertaisesti tehtaan omaa sähkönkulutusta.

Tämä on edelleen **johdettu vuositasetunnus**, ei erikseen raportoitu mittarilta luettu bruttoverkko-otto tai -vienti. Tehdas voi esimerkiksi yksittäisinä tunteina ostaa sähköä verkosta ja toisina syöttää sitä enemmän takaisin.

### Hamina

Haminan nykyinen sähköestimaatti on noin **0,87 TWh/v**. Tuiken YVA kuvaa dieselgeneraattorit varavoimaksi kriittiselle laitteistolle, ei normaaliksi sähköntuotannoksi. Jos oletetaan, ettei normaalikäytössä ole merkittävää omaa sähköntuotantoa, saadaan skenaario:

**S ~+100 %**

Tätä ei käsitellä havaintona ennen kuin kampuksen oma tuotanto ja mitattu verkkotase on varmennettu.

Tämä mittari tekee yhden kiinnostavan eron näkyväksi: datakeskus voi olla **erittäin hyvä PUE:ssa** mutta silti vahva verkon nettokuluttaja, kun taas sellutehdas voi käyttää paljon sähköä prosessissaan ja silti olla vuositasolla nettosähköntuottaja.

## Työllisyyden systeemirajat E0–E3

Työllisyysluvut jaetaan ennen pisteytystä neljään eri rajaan. Eri rajojen lukuja **ei verrata keskenään**.

| Taso | Mitä lasketaan? | Hamina | Nebius | Kemi Bio | Outokumpu |
|---|---|---:|---:|---:|---:|
| **E0 Oma henkilöstö** | Yhtiön/segmentin oma henkilöstö | 120 | 37 | ~250 | 454 FTE |
| **E1 Toimipaikan työvoima** | Samalla site-alueella säännöllisesti työskentelevät, työnantajasta riippumatta | ~500 | ? | ~500 | >2 000* |
| **E2 Suora kotimainen arvoketju** | Suomessa toimiva suora tuotanto-, raaka-aine-, logistiikka- ja palveluketju | ? | ? | ~2 500 | ? |
| **E3 Laajempi välillinen vaikutus** | Yhtiön/vaikutusarvion epäsuora työllisyys | ? | ? | ? | ~8 000 Q |

\* Outokummun >2 000 koskee Kemi–Tornio-kokonaisuuden suoria työntekijöitä, joten se on laajempi raja kuin Ferrochrome-segmentin E0.

**Haminan 600+ suomalaista toimittajayritystä ei ole E2-työpaikkaluku.** Yritysten määrä kertoo verkoston laajuudesta, mutta ei montako henkilötyövuotta Google-asiakkuus niissä synnyttää.

Kemin ~2 500 on tällä hetkellä puhtain E2-havainto: Metsä Fibre kuvaa sen nimenomaan tehtaan suoraksi arvoketjuksi Suomessa. Outokummun ~8 000 on puolestaan E3-tason yhtiön vaikutusarvio. Näiden rinnastaminen samaan scoreen olisi systeemirajavirhe.

Jo E0→E1-suhde on kiinnostava **kuvaileva** mittari: Haminassa ~500 / 120 ≈ **4,2**, Kemissä ~500 / 250 ≈ **2,0**. Tätä ei vielä pisteytetä, mutta se kertoo kuinka paljon toimipaikan työvoimaa jää oman juridisen henkilöstöluvun ulkopuolelle.

[Lataa työllisyyden systeemirajarekisteri](/downloads/employment-boundaries.json).

## Scope jump: etsitään tarkoituksella kaninkoloja

Harmonisoitu vertailu estää E0-, E1-, E2- ja E3-lukujen sekoittamisen samaan scoreen. **Se ei tarkoita, etteikö niiden välinen ero olisi itsessään kiinnostava.**

Scope-jump-näkymässä eri rajojen suhde lasketaan tarkoituksella ja merkitään kuvailevaksi:

| Kohde | Suhde | Arvo | Mitä se kertoo? |
|---|---|---:|---|
| Hamina | E1 / E0 | **~4,2×** | Kampuksella työskentelee noin 4,2 henkilöä jokaista Tuiken omaa työntekijää kohti |
| Kemi Bio | E1 / E0 | **~2,0×** | Tehdasalueen työvoima on noin kaksinkertainen tehtaan omaan henkilöstöön nähden |
| Kemi Bio | E2 / E0 | **~10×** | Suora kotimainen arvoketju on yhtiön arvion mukaan noin kymmenkertainen tehtaan omaan henkilöstöön nähden |
| Outokumpu | E3 / E0 | **~17,6× Q** | E3 on Kemi–Tornio-vaikutusarvio ja E0 Ferrochrome-segmentti: tarkoituksellinen mixed-boundary exploratory -suhde |

Nämä **eivät ole paremmuuspisteitä**. Suuri hyppy on signaali kysyä esimerkiksi:

- onko työ ulkoistettu juridisen yhtiön ulkopuolelle?
- syntyykö suuri osa työstä raaka-aine- ja logistiikkaketjussa?
- onko vaikutusarvion menetelmä paljon laajempi kuin toisella toimijalla?
- onko itse liiketoimintamalli poikkeuksellisen pääoma- tai työvoimavaltainen?
- piilottaako oikeushenkilön henkilöstöluku toiminnan todellisen fyysisen työpanoksen?

Juuri tällainen poikkeama on Symetrixissä **kaninkolo**, ei virhe. Harmonisoitu score kertoo yhden asian; scope jump kertoo, mistä kannattaa seuraavaksi kaivaa.


## Denominator Engine v0.1: automaattiset kaninkolot

Ensimmäinen reseptipohjainen denominator-moottori laskee suhdeluvut suoraan Evidence Ledgerin riveistä ja säilyttää mukana periodi- ja boundary-politiikan. Se ei päätä mikä tulos on hyvä tai huono.

Tämänhetkiset automaattiset löydöt:

| Rabbit hole | Suhde | Miksi tutkitaan? |
|---|---:|---|
| **Hamina site amplification** | **~4,17×** | Kampuksen säännöllinen työvoima on yli nelinkertainen Tuiken omaan henkilöstöön nähden |
| **Kemi direct value-chain multiplier** | **10×** | Suoran kotimaisen arvoketjun työmäärä on yhtiön arvion mukaan noin kymmenkertainen omaan henkilöstöön nähden |
| **Water / revenue spread** | **~257×** | Kemin konservatiivinen design-proxy/liikevaihto-alaraja ja Haminan 2024 ei-merivesi withdrawal/liikevaihto ovat erittäin kaukana toisistaan, mutta eivät harmonisoidulla boundarylla |

Moottori laskee lisäksi ilman rabbit-hole-lippua esimerkiksi investointi/site-työntekijä -luvut (**Hamina ~7 M€/hlö, Kemi ~4 M€/hlö**), Haminan kiinteistöveron suhteessa vuoden 2024 liikevaihtoon (**~0,33 %**) ja sähköestimaatin suhteessa liikevaihtoon (**~1,92 GWh/M€**).

Rabbit-hole-raja on tässä vaiheessa **4× löytöheuristiikka**. Sen tarkoitus on priorisoida jatkokysymyksiä, ei tuottaa arvojärjestystä.

[Lataa Denominator Engine v0.1](/downloads/denominator-engine-v0.1.json).

## Candidate metrics: data on jo olemassa, piste ei vielä

Kaikkea hyvää evidenssiä ei pidä muuttaa pisteeksi. Alla oleva data on jo Evidence Ledgerissä, mutta yhteinen nimittäjä, baseline tai sama systeemiraja puuttuu.

| Ehdokas | Nyt tunnettu havainto | Mitä tarvitaan ennen pisteytystä? |
|---|---|---|
| **Lämmön hyödyntäminen** | Nebius Mäntsälä 19,5 GWh mitattua vientiä 2025; Haminan 5 MW järjestelmän suunnittelupotentiaali ~40 GWh/v ja ~80 % Haminan kaukolämpövolyymista | Sama status (toteuma vs toteuma) sekä mielellään GWh / IT-MWh tai GWh / MW |
| **Vedenkäyttö** | Kemi actual withdrawal 32,819 Mm³ ja wastewater 13,931 Mm³ (2025); Hamina E-liputettu ~0,0014 L/kWh IT proxy; Nebius WUE 0,018 L/kWh IT | Kemin net consumption samalla määritelmällä + Haminan mitattu standardi-WUE |
| **Kotimainen tulovaikutus** | Metsä Group arvioi Kemin biotuotetehtaan vuosittaisen positiivisen tulovaikutuksen Suomessa noin 0,5 mrd € | Vastaava määritelmä muille kohteille ja vaikutusarvion laskentamenetelmä |
| **Arvoketjun työllisyys** | Kemi: ~2 500 henkilöä suorassa suomalaisessa arvoketjussa; Google: >600 suomalaista toimittajayritystä; Outokumpu Kemi–Tornio: >2 000 suoraa ja yhtiön arvio ~8 000 välillistä työpaikkaa | Sama työpaikkakäsite ja sama arvoketjuraja; yritysten määrä ei ole työpaikkojen määrä |
| **Paikallinen julkistalous** | Hamina sai vuonna 2024 noin 1,5 M€ kiinteistöveroa Google/Tuike-kokonaisuudesta | Sama verolaji ja vuosi muille kohteille tai normalisointi esimerkiksi /MW, /ha tai /100 M€ |
| **Fyysinen jalanjälki** | Tornion tehdasalue ~600 ha, rakennuksia ~56 ha; tuotanto 1,5 Mt terästä + 0,5 Mt ferrokromia/v | Vastaavat maa- ja tuotantorajat muille kohteille sekä päätös siitä, pisteytetäänkö pinta-alaa absoluuttisesti vai suhteessa tuotokseen |
| **Energia / kotimainen arvo** | Kemi tuottaa 2,0 TWh/v sähköä ja ilmoittaa 250 % sähköomavaraisuuden; Tornion koko tehdasalue käyttää noin 4 TWh/v kokonaisenergiaa | Mitattu verkkosähkö samalla rajalla sekä kotimainen arvonlisä samalla ajanjaksolla |

Kemi: [Metsä Group: Kemin biotuotetehtaan avajaiset](https://www.metsagroup.com/news-and-publications/news/2024/metsa-group-kemi-bioproduct-mill-inaugurated/). Nebius: [Nebius Sustainability 2025](https://nebius.com/newsroom/nebius-publishes-2025-sustainability-report-outlining-blueprint-for-scaling-responsibly). Hamina lämpö: [Haminan Energia](https://haminanenergia.fi/googlen-datakeskuksen-lampoa-alkaa-virrata-haminan-kaukolampoverkossa-vuoden-2025-aikana/). Haminan kiinteistövero: [Yle 12.5.2025](https://yle.fi/a/74-20160358). Tornio: [Outokumpu](https://www.outokumpu.com/en/expertise/industrial-evolution-insights/2026/circular-ecosystem-powering-industrial-side-streams). Googlen toimittajaverkosto: [Google 9.9.2026](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/google-ai-commitment-to-finland/).

Koneellisesti luettava havaintokerros löytyy [Evidence Ledgeristä](/downloads/evidence-index.json). Siellä lähdehavainto, johdettu arvo, proxy ja yhtiön oma vaikutusarvio ovat eri statuksia.

## Evidenssin kattavuus

Alla ei pisteytetä yrityksiä. Taulukko kertoo vain, **minkä tyyppistä käyttökelpoista aineistoa Ledgerissä jo on**.

**D** = suora lähdehavainto · **J** = johdettu laskelma · **Q** = proxy, suunnitteluarvo tai yhtiön vaikutusarvio.

| Aihe | Hamina / Tuike | Nebius | Kemi Bio | Outokumpu |
|---|---:|---:|---:|---:|
| Talous | 3 D | 3 D | 1 D + 1 Q | 4 D + 1 J |
| Työ | 2 D | 1 D | 3 D + 2 Q | 2 D + 1 Q |
| Energia / tehokkuus | 1 D | — | 2 D + 2 J | 1 D* |
| Vesi | 3 D | 1 D | — | — |
| Lämpö | 2 Q | 1 D | — | — |
| Maa | 1 D | — | — | 2 D |
| Investointi | 1 D | — | 1 D | — |
| Julkistalous | 2 D | — | — | — |

\* Tornion energia-arvo koskee koko tehdasaluetta ja kokonaisenergiaa, ei Ferrochrome-segmentin nykyistä verkkosähköä.

Tämä taulukko selittää, miksi Symetrix-matriisissa voi edelleen olla `?`, vaikka tausta-aineistossa on paljon tietoa. **Havainto voi olla olemassa ilman, että se sopii juuri kyseisen mittarin osoittajaan, nimittäjään, vuoteen tai systeemirajaan.**

[Koneellinen coverage-yhteenveto](/downloads/evidence-coverage.json) ja [koko Evidence Ledger](/downloads/evidence-index.json) päivittyvät buildissa lähdeaineiston mukana. [Metric Registry](/downloads/metric-registry.json) kertoo erikseen, mitkä mittarit ovat jo pisteytettävissä ja mikä täsmällinen blocker estää muita.

## Mikä baseline on hyvä baseline?

Symetrix suosii tässä järjestyksessä:

1. **empiirinen baseline** laajasta vertailujoukosta;
2. **toimialan ulkoinen benchmark**;
3. **fysikaalinen tai tekninen raja**, kuten 100 % sähköomavaraisuus;
4. vasta viimeisenä näkyvästi merkitty väliaikainen reference baseline.

Baseline ei saa syntyä siitä, mikä yritys sattuu olemaan vertailujoukon pienin tai suurin. Siksi uuden yrityksen lisääminen ei muuta vanhojen pisteitä.
