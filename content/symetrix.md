---
title: Symetrix Matrix v0.3
slug: symetrix
route: /analyysit/datakeskukset/symetrix/
language: fi
status: ready
published: false
updated: 2026-09-22
description: Yksi matriisi näyttää, miten auditin kohteet sijoittuvat näkyviin baselineihin eri mittareilla.
layout: article
---
## Piste kertoo vain tämän mittarin näkökulman

**50 pistettä = mittarin baseline.** Piste ei tarkoita yleistä hyvyyttä eikä toimialojen kokonaisjärjestystä.

- **↑ suurempi parempi** kyseisen mittarin näkökulmasta
- **↓ pienempi parempi**
- **?** mittari sopii kohteelle, mutta tarvittava havainto puuttuu
- **—** mittari ei sovellu tähän kohteeseen
- **P** piste käyttää proxy-rajausta eikä täysin samaa kohde- tai vuosirajaa
- **Pre-op** kohde ei ole vielä käyttövaiheen vertailussa

[Katso kaikkien mittarien baseline, raakadata, lähteet ja rajaukset](/analyysit/datakeskukset/symetrix-mittarit/).

## Vertailumatriisi

| Mittari | Kaava | Suunta | Google / Tuike | Nebius Mäntsälä | Kemi Bio | Ferrochrome | HEL16 |
|---|---|:---:|---:|---:|---:|---:|---:|
| [Taloudellinen volyymi / työpanos](/analyysit/datakeskukset/symetrix-mittarit/#taloudellinen-volyymi-tyopanos) | liikevaihto / oma henkilöstö | ↑ | **86** | **60** | **73 P** | **64 P** | Pre-op |
| [Työllistävyys suhteessa volyymiin](/analyysit/datakeskukset/symetrix-mittarit/#tyollistavyys-suhteessa-volyymiin) | oma henkilöstö / 100 M€ liikevaihtoa | ↑ | **14** | **40** | **27 P** | **36 P** | Pre-op |
| [Datakeskuksen energiatehokkuus](/analyysit/datakeskukset/symetrix-mittarit/#datakeskuksen-energiatehokkuus) | PUE − 1 | ↓ | **74** | **61 P** | — | — | Pre-op |
| [Datakeskuksen vedenkäytön tehokkuus](/analyysit/datakeskukset/symetrix-mittarit/#datakeskuksen-vedenkayton-tehokkuus) | WUE, L/kWh IT | ↓ | ? | **96** | — | — | Pre-op |
| [Sähköomavaraisuus](/analyysit/datakeskukset/symetrix-mittarit/#sahkoomavaraisuus) | oma tuotanto / oma kulutus | ↑ | ? | ? | **63** | ? | Pre-op |

### Miten pisteasteikko käyttäytyy?

Ratio-mittareissa yksi kaksinkertaistuminen baselineen nähden muuttaa pistettä 10 pistettä:

**30 = ¼× · 40 = ½× · 50 = baseline · 60 = 2× · 70 = 4× · 80 = 8×**

Kun pienempi on parempi, asteikon suunta käännetään.

Tämä tekee pisteestä vakaan: uuden yrityksen lisääminen vertailuun ei muuta vanhojen pisteitä.

## Kontekstirivit — ei pisteitä

Nämä rivit lisäävät vertailuun informaatiota ilman näennäistä tarkkuutta. **E = estimate**, **J = johdettu**, **D = design**.

| Resurssi | Google / Hamina | Nebius Mäntsälä | Kemi Bio | Ferrochrome | HEL16 |
|---|---:|---:|---:|---:|---:|
| Vuotuinen sähkönkäyttö | **E ~0,87 TWh** [0,87–2,0] | ? | **J ~0,8 TWh** oma kulutus | ? | Pre-op |
| Nettosähkötase | ~+0,87 TWh **E*** | ? | **J ~−1,2 TWh** | ? | Pre-op |
| Vesi: raportoitu / design-proxy | **~11 356 m³/v** (2024 reported) | ? | **D ~15,0 Mm³/v** | ? | Pre-op |
| Nettovedenkulutus | **~1 136 m³/v** (2024, seawater excluded) | WUE 0,018 L/kWh IT | ? | ? | Pre-op |
| Ei-merivesi-intensiteetti | **E ~0,0014 L/kWh IT** | — | — | — | Pre-op |
| Vedenotto / liikevaihto | **~25,1 m³/M€** | ? | **≥6 440 m³/M€ Q** | ? | Pre-op |
| Merivedenoton lupakatto | **80 Mm³/v** (ei toteuma) | — | — | — | Pre-op |

\* Haminan nettosähkötase käyttää tässä sähkönkulutuksen estimaattia ja olettaa normaalikäytössä, ettei kampuksella ole merkittävää omaa sähköntuotantoa. Varavoimageneraattorit eivät ole normaalia perustuotantoa.

[Katso estimaatin kaava, herkkyysskenaariot ja vesirajaukset](/analyysit/datakeskukset/symetrix-mittarit/#haminan-sahko-kysymysmerkista-lapinakyvaksi-estimaatiksi).

## Mitä tästä näkee yhdellä silmäyksellä?

Tuike saa korkean pistemäärän taloudellisessa volyymissa suhteessa omaan henkilöstöön, mutta saman suhteen käänteinen työllistävyysmittari painuu matalaksi. Nebius ja Ferrochrome osuvat näissä mittareissa lähemmäs Tilastokeskuksesta johdettua poikkitoimialaista baselinea. Kemi käyttää näissä kahdessa rivissä **Metsä Fibre -liiketoiminnan 2025 proxy-lukuja**, ei Kemin tehtaan omaa talous- tai henkilöstörajaa, joten pisteen perässä on P.

Datakeskusten teknisissä mittareissa Haminan PUE on selvästi vuoden 2025 globaalin datakeskusbaselinen paremmalla puolella. Nebiuksen PUE-piste on **P**, koska 1,25 on Nebiuksen koko portfolion vuoden 2025 keskiarvo eikä Mäntsälän erillinen PUE. Nebiuksen Suomen WUE-luku sen sijaan on toimipaikkakohtainen.

Kemin sähköomavaraisuus näyttää toisen tyyppisen vahvuuden: 250 % oma tuotanto / oma kulutus on selvästi 100 % tasapainobaselinen yläpuolella. Se ei kuitenkaan tee Kemistä automaattisesti “parasta”, koska mittari vastaa vain sähköomavaraisuuden kysymykseen.

## Miksi matriisissa on vielä kysymysmerkkejä?

Kysymysmerkki on tutkimustulos, ei tyhjä solu. Tällä hetkellä arvokkaimmat puuttuvat havainnot ovat:

**Kemin tehtaan oma liikevaihto/arvonlisä ja työpanos · Haminan kampuskohtainen WUE (vedenkäyttö tunnetaan, mutta samaan rajaan kuuluva IT-kWh puuttuu) · oma tuotanto/verkko-otto datakeskuksille · Ferrochrome-segmentin erillinen energiankulutus · HEL16:n käyttövaiheen toteuma.**

Kaikki muu nippelitieto — esimerkiksi Haminan vedenkulutus, Nebiuksen 19,5 GWh mitattu hukkalämmön vienti ja Tornion koko tehdasalueen noin 4 TWh energiankulutus — pidetään [mittarien perustelusivulla](/analyysit/datakeskukset/symetrix-mittarit/), kunnes sille löytyy vertailukelpoinen nimittäjä ja baseline.
