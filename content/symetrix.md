---
title: Symetrix Matrix v0.1
slug: symetrix
route: /analyysit/datakeskukset/symetrix/
language: fi
status: ready
published: false
updated: 2026-09-22
description: Sama aineisto, eri arvotukset. Ensimmäinen eksploratiivinen pisteytysmatriisi näyttää, kuinka tarkastelukulma muuttaa tulosta.
layout: article
---
## Mikä Symetrix Matrix on?

Symetrix Matrix ei yritä tuottaa yhtä objektiivista pistettä sille, mikä teollinen toiminta on “paras”. Sen tarkoitus on tehdä näkyväksi, **miten tulos muuttuu, kun arvotus muuttuu**.

Ensimmäisen version sääntö on:

> **Epäreilu pisteytys on sallittu. Piilotettu epäreiluus ei ole.**

Jokainen piste voidaan jäljittää raakadataan, kaavaan, normalisointiin ja valittuun Lens-profiiliin. Puuttuva tieto merkitään avoimeksi eikä nollaksi.

Kaikki v0.1:n toimialapisteet ovat **exploratory**-tilassa. Strict-tilassa nykyinen aineisto ei vielä riitä yhteenkään monen toimialan Lensiin, koska henkilöstö-, organisaatio-, energia- ja aikarajat eivät ole samoja.

## Ensimmäinen oikea pistematriisi

| Lens | Google / Tuike | Kemi biotuotetehdas | Outokumpu Ferrochrome | Microsoft HEL16 |
|---|---:|---:|---:|---:|
| **Capital / Throughput** | **100,0** · coverage 100 % | Open · 0 % | **0,0** · coverage 100 % | Open · 0 % |
| **Employment intensity** | **0,0** · coverage 100 % | Open · 0 % | **100,0** · coverage 100 % | Open · 0 % |
| **Reported workforce scale** | **0,0** · coverage 100 % | **53,9** · coverage 100 % | **100,0** · coverage 100 % | Open · 0 % |
| **Grid independence benchmark** | Open · 0 % | **100,0** · coverage 100 % | Open · 0 % | Open · 0 % |

**Coverage** kertoo, kuinka suuri osa kyseisen Lensin painosta pystyttiin laskemaan kyseiselle kohteelle. Se ei kerro vertailun laatua. Esimerkiksi Tuiken ja Ferrochromen Capital-laskelmissa coverage on 100 %, vaikka niiden organisaatio- ja henkilöstörajat eivät ole täysin yhteismitalliset. Siksi tulokset ovat eksploratiivisia.

Grid-linssissä vain Kemin lähtötieto on saatavissa. Sen 100 pistettä on absoluuttisen benchmarkin tulos — 100 % tai suurempi sähköomavaraisuus saa tässä Lensissä 100 pistettä — eikä neljän kohteen välinen sijoitus.

## Rank flip: sama data, täysin päinvastainen vastaus

Tuiken vuoden 2025 yritystiedoissa liikevaihto on 574,374 M€, johdettu käyttökate noin 344,6 M€ ja henkilöstö 120. [Proff: Tuike Finland Oy](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG), [Profinder: Tuike Finland Oy](https://b2b.profinder.fi/haku/tuike-finland-oy/22060717).

Outokummun Ferrochrome-segmentin vuoden 2025 myynti on 462 M€, käyttökate 137 M€ ja vuoden lopun henkilöstö 454 FTE. [Outokumpu: Annual Report 2025, s. 170](https://www.outokumpu.com/-/media/files/investors/annual-reports/annual-report-2025/outokumpu_annual_report_2025_a4.pdf?hash=A9F7D1F6309A51EC70DC676A8907E46B&modified=20260227103807&revision=549bc02d-644c-4edb-b7bc-20b85245380b).

### Lens A — Capital / Throughput

Tämä Lens kysyy: **kuinka suuri rahavirta näkyy suhteessa raportoituun omaan henkilöstöön?**

Painot:

- myynti / oma henkilöstö tai FTE: 50 %
- käyttökate / oma henkilöstö tai FTE: 50 %

Raakaluvut:

| Mittari | Tuike | Ferrochrome |
|---|---:|---:|
| Myynti / oma henkilöstö tai FTE | 4,786 M€/hlö | 1,018 M€/FTE |
| Käyttökate / oma henkilöstö tai FTE | 2,872 M€/hlö | 0,302 M€/FTE |
| **Lens score** | **100,0** | **0,0** |

Kahden kohteen min–max-normalisointi tekee erosta tarkoituksella rajun. Tuike on molemmissa mittareissa vertailujoukon korkein ja saa 100; Ferrochrome matalin ja saa 0.

Tämä ei tarkoita, että Tuike olisi “100 % hyvä” tai Ferrochrome “0 % hyvä”. Lens palkitsee juuri sitä rakennetta, jossa suuri rahavirta näkyy pienellä omalla henkilöstöllä.

### Lens B — Employment intensity

Nyt käytetään **täsmälleen samoja lähdelukuja**, mutta kysymys käännetään:

**kuinka paljon omaa henkilöstöä näkyy jokaista 100 miljoonan euron rahavirtaa kohti?**

| Mittari | Tuike | Ferrochrome |
|---|---:|---:|
| Oma henkilöstö / 100 M€ myyntiä | 20,9 | 98,3 |
| Oma henkilöstö / 100 M€ käyttökatetta | 34,8 | 331,4 |
| **Lens score** | **0,0** | **100,0** |

Järjestys vaihtuu kokonaan:

**Capital / Throughput:** Tuike 100 → Ferrochrome 0  
**Employment intensity:** Tuike 0 → Ferrochrome 100

Lähtödata ei muuttunut. **Arvotus muuttui.**

Tämä on Symetrixin ensimmäinen varsinainen rank flip.

## Kolmas näkökulma: pelkkä raportoitu henkilöstömäärä

Jos arvotus on vielä yksinkertaisempi — “enemmän suoraan raportoitua omaa henkilöstöä on parempi” — nykyiset luvut ovat:

- Tuike Finland Oy: 120 henkilöä vuonna 2025.
- Kemin biotuotetehtaan kohdesivu: 300 henkilöä.
- Outokumpu Ferrochrome: 454 FTE vuoden 2025 lopussa.

[Metsä Fibre: Kemin biotuotetehdas](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/).

Min–max-pisteet ovat:

| Kohde | Raakaluku | Piste |
|---|---:|---:|
| Tuike | 120 | **0,0** |
| Kemi | 300 | **53,9** |
| Ferrochrome | 454 | **100,0** |
| HEL16 | Open | — |

Tämä on tarkoituksella **epäreilu Lens**. Tuiken luku on oikeushenkilön henkilöstö, Kemin luku tehtaan raportoitu henkilöstö ja Ferrochromen luku vuoden lopun FTE. Mittari ei myöskään huomioi tuotannon kokoa.

Juuri siksi se on hyödyllinen: jos joku sanoo vain “arvostan työpaikkoja”, Symetrix voi näyttää, mitä näin karkea arvotus tekee — ja samalla näyttää miksi rajaus tarvitsee parantamista.

## Neljäs näkökulma: sähköomavaraisuus

Metsä Fibre ilmoittaa Kemin sähköntuotannoksi 2,0 TWh/v ja sähköomavaraisuudeksi 250 %. [Metsä Fibre: Kemin biotuotetehdas](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/).

Grid independence -Lens käyttää v0.1:ssä tarkoituksella yksinkertaista absoluuttista sääntöä:

**0 % sähköomavaraisuus = 0 pistettä**  
**100 % tai enemmän = 100 pistettä**

Kemi saa siis **100 pistettä**.

Muille kolmelle kohteelle vertailukelpoinen omavaraisuusluku on nykyisessä auditissa **Open**. Siksi tästä ei muodosteta toimialojen sijoitusta.

Tämä erottaa kaksi asiaa:

- kohteelle voidaan laskea Lens-piste;
- kohteita voidaan sijoittaa keskenään vasta, kun useammasta on vertailukelpoinen lähtötieto.

## Normalisointi v0.1

Vertailumittareissa käytetään yksinkertaista min–max-normalisointia.

Kun suurempi arvo saa enemmän pisteitä:

`score = 100 × (x − min) / (max − min)`

Jos kaikilla vertailukohteilla olisi sama arvo, jokainen saisi 50 pistettä.

Grid independence käyttää poikkeuksena etukäteen näkyväksi tehtyä absoluuttista benchmarkia.

Tämä normalisointi tarkoittaa myös, että piste **riippuu vertailujoukosta**. Jos matriisiin lisätään uusi ääripää, vanhojen kohteiden pisteet voivat muuttua vaikka niiden oma data ei muuttuisi. Tätä ei käsitellä virheenä vaan pisteytysjärjestelmän ominaisuutena, joka pitää näyttää.

## Coverage ei ole confidence

Symetrix v0.1 pitää erillään ainakin kolme asiaa:

1. **Score** — mitä valittu arvotus tekee käytettävissä oleville luvuille.
2. **Coverage** — kuinka suuri osa Lensin painosta pystyttiin laskemaan.
3. **Comparability** — ovatko käytetyt organisaatio-, aika-, henkilö- ja muut rajat oikeasti samoja.

Ensimmäisessä versiossa comparability esitetään sanallisesti. Sitä ei vielä kerrota pisteellä, koska muuten syntyisi uusi arvotuskerros ennen kuin sen sääntöjä on kunnolla määritelty.

## Strict vs Exploratory

**Strict** hyväksyy vertailuun vain saman käsitteen, ajanjakson, organisaatiorajan ja yksikön.

Nykyisellä auditilla strict-matriisi jää käytännössä tyhjäksi. Tämä on tulos: aineisto ei vielä mahdollista vahvaa toimialojen pistevertailua.

**Exploratory** sallii läpinäkyvästi esimerkiksi:

- oikeushenkilön henkilöstön ja segmentin FTE:n rinnastamisen;
- lähivuosien lukujen käytön;
- johdetut arvot;
- proxy-mittarit.

Kaikki tämän sivun numeeriset Lens-pisteet ovat v0.1:ssä exploratory-tuloksia.

## Mitä v0.1 opetti?

Jo nykyinen vajaa aineisto tuottaa kolme hyödyllistä havaintoa:

- **Rank flip on todellinen:** sama Tuike–Ferrochrome-data vaihtaa 100–0-järjestyksen täysin, kun arvotus vaihdetaan pääomatehokkuudesta työintensiteettiin.
- **Kemi paljastaa eri mittarityypin:** absoluuttinen sähköomavaraisuusbenchmark antaa pisteen, vaikka toimialojen keskinäinen ranking ei vielä onnistu.
- **Open-solut ovat tutkimuslista:** HEL16:n ja muiden kohteiden puuttuvat luvut näyttävät suoraan, mitä pitää seuraavaksi selvittää.

Symetrix Matrix v0.1 ei siis anna vastausta siihen, mikä toimiala on paras. Se tekee näkyväksi, **miksi eri ihmiset voivat päätyä täysin eri johtopäätökseen samasta aineistosta ilman että kumpikaan välttämättä laskee väärin.**

## Seuraavat tiedot, joilla matriisi paranee eniten

Ensimmäinen tutkimusprioriteetti on saada samoilla rajauksilla:

- operoinnin FTE tai henkilötyövuodet;
- mitattu verkosta otettu ja verkkoon syötetty MWh/v;
- oma sähköntuotanto;
- kotimainen arvonlisä;
- julkiset tulot ja kohdistettavat julkiset kustannukset;
- CAPEX ja käytössä oleva maa-ala.

Kun näitä saadaan vähintään kahdelle tai kolmelle kohteelle, seuraavat Lensit voidaan tehdä aidosti monialaisiksi: **Grid, Employment, Domestic Value ja Capital / Throughput**.
