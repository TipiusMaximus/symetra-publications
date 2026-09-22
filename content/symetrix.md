---
title: Symetrix Matrix v0.2
slug: symetrix
route: /analyysit/datakeskukset/symetrix/
language: fi
status: ready
published: false
updated: 2026-09-22
description: Baseline-ankkuroitu vertailumatriisi näyttää auditin kohteet rinnakkain ja erottaa pisteen, kattavuuden ja vertailukelpoisuuden.
layout: article
---
## Sama data, näkyvä arvotus

Symetrix ei muodosta yhtä yleistä “hyvyyspistettä”. Jokainen piste kuuluu nimetylle mittarille tai Lensille.

> **50 pistettä = näkyvä baseline. Piste ei enää riipu vertailujoukon pienimmästä ja suurimmasta arvosta.**

Ratio-mittareissa v0.2 käyttää kaavaa:

`50 + 15 × log2(arvo / baseline)`

Kun pienempi arvo on parempi, etumerkki käännetään. Näin 2 × baseline = 65 pistettä, 4 × = 80 ja 8 × = 95. Puuttuva tieto on **Open**, ei nolla.

## Lens-yhteenveto

| Lens | Google / Tuike | Nebius Mäntsälä | Kemi Bio | Ferrochrome | HEL16 |
|---|---:|---:|---:|---:|---:|
| **Capital / Throughput** | **91,4** | **49,0** | Open | **50,3** | Pre-op |
| **Employment intensity** | **8,6** | **51,0** | Open | **49,7** | Pre-op |

Molemmissa Lenseissä coverage on Tuikelle, Nebiukselle ja Ferrochromelle 100 %. **Comparability** on Tuike 75 %, Nebius 75 % ja Ferrochrome 50 %, koska yritys-, segmentti- ja henkilöstörajat eivät ole täysin samoja.

HEL16 näkyy matriisissa, mutta **pre-operational**-kohde ei osallistu käyttövaiheen rankingiin.

## Auditin kohteet rinnakkain

### Talous ja työ

| Mittari | Baseline | Tuike | Nebius | Kemi | Ferrochrome | HEL16 |
|---|---:|---:|---:|---:|---:|---:|
| Myynti / oma henkilöstö tai FTE | 1,0 M€/hlö | 4,786 → **83,9 p** | 0,759 → **44,0 p** | Open | 1,018 → **50,4 p** | Pre-op |
| EBITDA / oma henkilöstö tai FTE | 0,30 M€/hlö | 2,872 → **98,9 p** | 0,361 → **54,0 p** | Open | 0,302 → **50,1 p** | Pre-op |
| Oma henkilöstö / 100 M€ myyntiä | 100 | 20,9 → **16,1 p** | 131,8 → **56,0 p** | Open | 98,3 → **49,6 p** | Pre-op |
| Oma henkilöstö / 100 M€ EBITDAa | 333,3 | 34,8 → **1,1 p** | 277,4 → **46,0 p** | Open | 331,4 → **49,9 p** | Pre-op |
| Raportoitu oma henkilöstö / FTE | — | 120 | 37 | 300 | 454 | Open |
| Liikevaihto / myynti | — | 574,374 M€ | 28,083 M€ | Open | 462 M€ | Open |
| EBITDA | — | 344,624 M€* | 13,339 M€* | Open | 137 M€ | Open |
| EBIT / liiketulos | — | 30,305 M€ | 2,361 M€ | Open | Open | Open |

\* Johdettu julkaistusta EBITDA-prosentista.

Talouslukujen lähteet: [Proff: Tuike Finland Oy](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG), [Proff: Nebius DC Oy](https://www.proff.fi/yrityksen/nebius-dc-oy/m%C3%A4nts%C3%A4l%C3%A4/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2541661-9I0ZDG) ja [Outokumpu Annual Report 2025, s. 170](https://www.outokumpu.com/-/media/files/investors/annual-reports/annual-report-2025/outokumpu_annual_report_2025_a4.pdf?hash=A9F7D1F6309A51EC70DC676A8907E46B&modified=20260227103807&revision=549bc02d-644c-4edb-b7bc-20b85245380b).

### Energia ja resurssit

| Mittari | Baseline | Tuike | Nebius | Kemi | Ferrochrome | HEL16 |
|---|---:|---:|---:|---:|---:|---:|
| Sähköomavaraisuus | 100 % | Open | Open | 250 % → **100 p** | Open | Pre-op |
| WUE, L/kWh IT | 0,45 | Open | 0,018 → **100 p** | — | — | Pre-op |
| Oma sähköntuotanto | — | Open | Open | 2,0 TWh/v | Open | Pre-op |
| Johdettu oma sähkönkulutus | — | Open | Open | 0,8 TWh/v* | Open | Pre-op |
| Tuotanto − johdettu kulutus | 0 TWh | Open | Open | +1,2 TWh/v* | Open | Pre-op |
| Hukkalämmön vienti | — | Open | 19,5 GWh/v | Open | Open | Pre-op |
| Kapasiteetti | — | Open | 75 MW **(2026)** | — | — | suunnitelma/lupa |

\* Johdettu havainnollistus, ei mitattu verkkotase.

Nebius raportoi Mäntsälän vuoden 2025 WUE-luvuksi 0,018 L/kWh IT ja hukkalämmön vienniksi 19,5 GWh. [Nebius Sustainability 2025](https://nebius.com/newsroom/nebius-publishes-2025-sustainability-report-outlining-blueprint-for-scaling-responsibly). WUE-baseline 0,45 L/kWh tulee Lawrence Berkeley National Laboratoryn vuoden 2024 datakeskusraportin vuoden 2023 jälkeisen 0,45–0,48 L/kWh skenaarioalueen alarajasta. [LBNL](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report.pdf).

Mäntsälän 75 MW:n laajennus valmistui vasta alkuvuonna 2026, joten sitä **ei käytetä vuoden 2025 talous- tai käyttölukujen nimittäjänä**. [Nebius 31.3.2026](https://nebius.com/newsroom/nebius-to-construct-310-mw-ai-factory-in-finland).

Kemin sähköluvut: [Metsä Fibre](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/).

## Baseline-rekisteri v0.2

| Mittari | Baseline | Tyyppi | Miksi juuri tämä? |
|---|---:|---|---|
| Myynti / henkilöstö | 1,0 M€/hlö | provisional reference | Pyöreä ankkuri = 100 henkilöä / 100 M€ myyntiä |
| EBITDA / henkilöstö | 0,30 M€/hlö | provisional reference | Pyöreä ankkuri = 30 M€ EBITDAa / 100 henkilöä |
| Henkilöstö / 100 M€ myyntiä | 100 | reciprocal reference | Edellisen mittarin käänteinen ankkuri |
| Henkilöstö / 100 M€ EBITDAa | 333,3 | reciprocal reference | 0,30 M€/hlö -ankkurin käänteinen |
| Sähköomavaraisuus | 100 % | technical threshold | Oma tuotanto vastaa omaa vuosikulutusta |
| WUE | 0,45 L/kWh | external benchmark | LBNL:n ulkoinen datakeskusvertailu |

**Provisional reference** ei ole väite Suomen teollisuuden keskiarvosta. Se on näkyvä v0.2-ankkuri, joka voidaan myöhemmin korvata empiirisellä mediaanilla ilman että pisteytysperiaate muuttuu.

## Mitä Lensit tällä hetkellä mittaavat?

**Capital / Throughput** = 50 % myynti/henkilöstö + 50 % EBITDA/henkilöstö.

**Employment intensity** = 50 % henkilöstö/100 M€ myyntiä + 50 % henkilöstö/100 M€ EBITDAa.

Tulos ei enää synny siitä, kuka sattuu olemaan vertailujoukon pienin tai suurin. Esimerkiksi Ferrochrome osuu molemmissa Lenseissä lähelle 50 pisteen baselinea, Nebius myös lähelle sitä, mutta Tuike siirtyy voimakkaasti eri suuntiin riippuen siitä palkitaanko rahavirtaa vai omaa työpanosta.

## Score, coverage ja comparability ovat eri asioita

| Kenttä | Kysymys |
|---|---|
| **Score** | Miten arvo sijoittuu näkyvään baselineen nähden? |
| **Coverage** | Kuinka suuri osa Lensin painosta voidaan laskea? |
| **Comparability** | Kuinka hyvin käytetty organisaatio-, aika- ja henkilöstöraja vastaa yhteistä mittaria? |
| **Stage** | Onko kohde käytössä vai vasta suunnitelma/lupa/rakennusvaiheessa? |

Tuike ja Nebius ovat vuoden 2025 suomalaisia oikeushenkilöitä, mutta henkilöstöluku ei ole varmennettu keskimääräiseksi FTE:ksi. Ferrochrome on segmentti ja henkilöstö vuoden lopun FTE. Siksi 100 % coverage ei tarkoita 100 % vertailukelpoisuutta.

## Open-solut ovat seuraava tutkimuslista

Matriisi hyötyisi eniten seuraavista samoilla vuosilla ja rajoilla mitatuista tiedoista:

**verkosta otettu ja verkkoon syötetty MWh · operoinnin FTE · kotimainen arvonlisä · verot ja julkiset kustannukset · maa-ala · CAPEX · toteutunut hukkalämpö.**

Näiden täyttyessä voidaan rakentaa seuraavat aidosti monialaiset Lensit: **Grid, Domestic Value, Public Economy ja Physical Footprint**.

<details>
<summary>Tekninen pisteytyssääntö</summary>

Ratio higher: `50 + 15 × log2(arvo / baseline)`.

Ratio lower: `50 − 15 × log2(arvo / baseline)`.

Threshold: `50 × arvo / raja`.

Piste rajataan välille 0–100. Baseline, scorer-tyyppi, raakadata ja rajaus julkaistaan koneellisesti ladattavassa Symetrix-aineistossa.

</details>
