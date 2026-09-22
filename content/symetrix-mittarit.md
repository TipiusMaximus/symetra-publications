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

## Tietoa, jota ei vielä pisteytetä

Seuraavat havainnot ovat hyödyllisiä, mutta niille ei vielä ole yhteistä nimittäjää ja baselinea:

| Havainto | Arvo | Miksi ei vielä pisteytetä? |
|---|---:|---|
| Nebius Mäntsälä: hukkalämmön vienti 2025 | 19,5 GWh | Tarvitaan esim. /IT-MWh, /MW tai suhteessa paikalliseen lämpökuormaan |
| Hamina: hukkalämpölaitoksen suunnittelupotentiaali | noin 40 GWh/v | Suunnitteluarvo ei ole sama kuin mitattu toteuma |
| Hamina: vedenkulutus 2024 | 0,3 milj. US-gallonaa | Tarvitaan samaan rajaan kuuluva IT-energia |
| Tornion tehdasalue: kokonaisenergia | noin 4 TWh/v | Koko tehdasalue ≠ Ferrochrome-segmentti |

Nebius: [Nebius Sustainability 2025](https://nebius.com/newsroom/nebius-publishes-2025-sustainability-report-outlining-blueprint-for-scaling-responsibly). Hamina lämpö: [Haminan Energia](https://haminanenergia.fi/googlen-datakeskuksen-lampoa-alkaa-virrata-haminan-kaukolampoverkossa-vuoden-2025-aikana/). Tornio: [Outokumpu](https://www.outokumpu.com/en/expertise/industrial-evolution-insights/2026/circular-ecosystem-powering-industrial-side-streams).

## Mikä baseline on hyvä baseline?

Symetrix suosii tässä järjestyksessä:

1. **empiirinen baseline** laajasta vertailujoukosta;
2. **toimialan ulkoinen benchmark**;
3. **fysikaalinen tai tekninen raja**, kuten 100 % sähköomavaraisuus;
4. vasta viimeisenä näkyvästi merkitty väliaikainen reference baseline.

Baseline ei saa syntyä siitä, mikä yritys sattuu olemaan vertailujoukon pienin tai suurin. Siksi uuden yrityksen lisääminen ei muuta vanhojen pisteitä.
