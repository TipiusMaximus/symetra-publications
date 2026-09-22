---
title: Symetrix: mittarit ja perustelut
slug: symetrix-mittarit
route: /analyysit/datakeskukset/symetrix-mittarit/
language: fi
status: ready
published: false
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
| Google / Hamina | ? | ? | Haminan vuoden 2024 vedenkulutus tunnetaan, mutta kampuskohtainen WUE ei |
| Nebius Mäntsälä | 0,018 L/kWh | **96** | Suomen toimipaikka, 2025 |
| Kemi Bio | — | — | WUE ei ole sama mittari prosessiteollisuudelle |
| Ferrochrome | — | — | WUE ei ole sama mittari metallituotannolle |

Nebius: [Nebius Sustainability 2025](https://nebius.com/newsroom/nebius-publishes-2025-sustainability-report-outlining-blueprint-for-scaling-responsibly). Google raportoi Haminan vuoden 2024 vedenkulutukseksi 0,3 miljoonaa US-gallonaa, mutta ilman samaan rajaan kuuluvaa IT-kWh-lukua siitä ei rakenneta WUE-pistettä. [Google 2025 Environmental Report](https://sustainability.google/google-2025-environmental-report/).

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

## Candidate metrics: data on jo olemassa, piste ei vielä

Kaikkea hyvää evidenssiä ei pidä muuttaa pisteeksi. Alla oleva data on jo Evidence Ledgerissä, mutta yhteinen nimittäjä, baseline tai sama systeemiraja puuttuu.

| Ehdokas | Nyt tunnettu havainto | Mitä tarvitaan ennen pisteytystä? |
|---|---|---|
| **Lämmön hyödyntäminen** | Nebius Mäntsälä 19,5 GWh mitattua vientiä 2025; Haminan 5 MW järjestelmän suunnittelupotentiaali ~40 GWh/v ja ~80 % Haminan kaukolämpövolyymista | Sama status (toteuma vs toteuma) sekä mielellään GWh / IT-MWh tai GWh / MW |
| **Vedenkäyttö** | Hamina 2024: 0,3 milj. US-gallonaa kulutusta; Nebius Mäntsälä WUE 0,018 L/kWh IT | Haminan samaan vuoteen ja kampusrajaan kuuluva IT-energia → WUE |
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
| Talous | 3 D | 3 D | 1 Q | 4 D + 1 J |
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
