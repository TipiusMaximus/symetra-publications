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
| [Taloudellinen volyymi / työpanos](/analyysit/datakeskukset/symetrix-mittarit/#taloudellinen-volyymi-tyopanos) | liikevaihto / oma henkilöstö | ↑ | **86** | **60** | ? | **64 P** | Pre-op |
| [Työllistävyys suhteessa volyymiin](/analyysit/datakeskukset/symetrix-mittarit/#tyollistavyys-suhteessa-volyymiin) | oma henkilöstö / 100 M€ liikevaihtoa | ↑ | **14** | **40** | ? | **36 P** | Pre-op |
| [Datakeskuksen energiatehokkuus](/analyysit/datakeskukset/symetrix-mittarit/#datakeskuksen-energiatehokkuus) | PUE − 1 | ↓ | **74** | **61 P** | — | — | Pre-op |
| [Datakeskuksen vedenkäytön tehokkuus](/analyysit/datakeskukset/symetrix-mittarit/#datakeskuksen-vedenkayton-tehokkuus) | WUE, L/kWh IT | ↓ | ? | **96** | — | — | Pre-op |
| [Sähköomavaraisuus](/analyysit/datakeskukset/symetrix-mittarit/#sahkoomavaraisuus) | oma tuotanto / oma kulutus | ↑ | ? | ? | **63** | ? | Pre-op |

### Miten pisteasteikko käyttäytyy?

Ratio-mittareissa yksi kaksinkertaistuminen baselineen nähden muuttaa pistettä 10 pistettä:

**30 = ¼× · 40 = ½× · 50 = baseline · 60 = 2× · 70 = 4× · 80 = 8×**

Kun pienempi on parempi, asteikon suunta käännetään.

Tämä tekee pisteestä vakaan: uuden yrityksen lisääminen vertailuun ei muuta vanhojen pisteitä.

## Mitä tästä näkee yhdellä silmäyksellä?

Tuike saa korkean pistemäärän taloudellisessa volyymissa suhteessa omaan henkilöstöön, mutta saman suhteen käänteinen työllistävyysmittari painuu matalaksi. Nebius ja Ferrochrome osuvat näissä mittareissa lähemmäs Tilastokeskuksesta johdettua poikkitoimialaista baselinea.

Datakeskusten teknisissä mittareissa Haminan PUE on selvästi vuoden 2025 globaalin datakeskusbaselinen paremmalla puolella. Nebiuksen PUE-piste on **P**, koska 1,25 on Nebiuksen koko portfolion vuoden 2025 keskiarvo eikä Mäntsälän erillinen PUE. Nebiuksen Suomen WUE-luku sen sijaan on toimipaikkakohtainen.

Kemin sähköomavaraisuus näyttää toisen tyyppisen vahvuuden: 250 % oma tuotanto / oma kulutus on selvästi 100 % tasapainobaselinen yläpuolella. Se ei kuitenkaan tee Kemistä automaattisesti “parasta”, koska mittari vastaa vain sähköomavaraisuuden kysymykseen.

## Miksi matriisissa on vielä kysymysmerkkejä?

Kysymysmerkki on tutkimustulos, ei tyhjä solu. Tällä hetkellä arvokkaimmat puuttuvat havainnot ovat:

**saman vuoden liikevaihto/arvonlisä Kemille · kampuskohtainen WUE Haminalle · oma tuotanto/verkko-otto datakeskuksille · Ferrochrome-segmentin erillinen energiankulutus · HEL16:n käyttövaiheen toteuma.**

Kaikki muu nippelitieto — esimerkiksi Haminan vedenkulutus, Nebiuksen 19,5 GWh mitattu hukkalämmön vienti ja Tornion koko tehdasalueen noin 4 TWh energiankulutus — pidetään [mittarien perustelusivulla](/analyysit/datakeskukset/symetrix-mittarit/), kunnes sille löytyy vertailukelpoinen nimittäjä ja baseline.
