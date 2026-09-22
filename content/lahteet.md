---
title: Lähteet, laskelmat ja aineistorajaukset
slug: lahteet
route: /analyysit/datakeskukset/lahteet/
language: fi
status: ready
published: false
updated: 2026-09-22
description: Seuraa päätelmä takaisin alkuperäiseen lähteeseen. Lähteen havaintojakso, lukemisen laajuus ja saatavuus erotetaan toisistaan.
layout: sources
---
## Laskelmat

Tällä sivulla julkaistaan vain laskelmia, joilla on analyysissä jokin tehtävä. Jokainen johdettu luku erotetaan lähteestä suoraan luetusta luvusta.

| Status | Mitä se tarkoittaa? |
|---|---|
| **Lähdehavainto** | Luku on luettu nimetystä alkuperäislähteestä. |
| **Johdettu laskelma** | Luku on laskettu näkyvällä kaavalla lähdehavainnoista. |
| **Herkkyysskenaario** | Laskutapaa vaihdetaan tarkoituksella sen testaamiseksi, kuinka paljon tulkinta muuttuu. |
| **Avoin** | Tarvittava lähtötieto puuttuu; arvoa ei täytetä oletuksella. |

Johdettu tai skenaarioluku ei muutu mittaukseksi sillä, että laskutoimitus on täsmällinen. Laskennan tarkkuus ja lähtötiedon varmuus ovat eri asioita.

### Tuike Finland Oy: mitä 60 prosentin käyttökate tarkoittaa euroina?

Tuiken vuoden 2025 yritystiedoissa liikevaihto on 574,374 M€, käyttökateprosentti 60,0 % ja liiketulos 30,305 M€. [Proff: Tuike Finland Oy](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG), [Profinder: Tuike Finland Oy](https://b2b.profinder.fi/haku/tuike-finland-oy/22060717).

Pyöristetystä käyttökateprosentista voidaan johtaa:

**574,374 M€ × 60,0 % ≈ 344,6 M€ käyttökate.**

Tämä auttaa hahmottamaan yhtiön tulorakennetta, mutta sitä ei tulkita vapaaksi kassavirraksi, Suomen arvonlisäksi tai yhteiskunnalliseksi nettohyödyksi.

Myös EBITDA–EBIT-erotus on laskennallisesti noin **314,3 M€**. Se on tutkimuksellisesti kiinnostava juuri siksi, että alkuperäistä tilinpäätöstä liitetietoineen ei ole vielä luettu: erotuksen sisältöä ei nimetä oletuksella poistoiksi tai muuksi yksittäiseksi eräksi.

Sen sijaan liikevaihdon ja käyttökatteen erotusta ei nosteta päämittariksi. Se voidaan laskea aritmeettisesti, mutta ilman kulurakennetta se ei kerro esimerkiksi kotimaisten hankintojen määrää.

### Tuike ja Ferrochrome: rahavirta suhteessa omaan henkilöstöön

Rakennelaskelma käyttää Tuiken vuoden 2025 yhtiölukuja ja Outokummun Ferrochrome-segmentin vuoden 2025 lukuja. [Proff: Tuike Finland Oy](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG), [Outokumpu: Annual Report 2025, s. 170](https://www.outokumpu.com/-/media/files/investors/annual-reports/annual-report-2025/outokumpu_annual_report_2025_a4.pdf?hash=A9F7D1F6309A51EC70DC676A8907E46B&modified=20260227103807&revision=549bc02d-644c-4edb-b7bc-20b85245380b).

| Johdettu suhdeluku | Tulos |
|---|---:|
| Tuike: 574,374 M€ / 120 henkilöä | noin 4,786 M€ liikevaihtoa / oma henkilö |
| Tuike: 344,6244 M€ / 120 henkilöä | noin 2,872 M€ käyttökatetta / oma henkilö |
| Ferrochrome: 462 M€ / 454 FTE | noin 1,018 M€ myyntiä / FTE |
| Ferrochrome: 217 M€ / 454 FTE | noin 0,478 M€ ulkoista myyntiä / FTE |
| Ferrochrome: 137 M€ / 454 FTE | noin 0,302 M€ käyttökatetta / FTE |
| Ferrochrome: 245 M€ / 462 M€ | noin 53,0 % myynnistä konsernin sisäistä |

Laskelmaa ei nimetä tuottavuusmittariksi. Tuiken henkilöstö ja Outokummun vuoden lopun FTE eivät ole sama henkilöstömittari, eikä oikeushenkilö ole sama organisaatioraja kuin liiketoimintasegmentti. [Vertailun tulkinta](/analyysit/datakeskukset/vertailu/#rakennelaskelma-paljonko-rahavirtaa-nakyy-omaa-henkilostoa-kohti).

### Kemi: sama sähkölähde, eri laskentatapa

Metsä Fibre ilmoittaa Kemin biotuotetehtaan sähköntuotannoksi 2,0 TWh/v ja sähköomavaraisuudeksi 250 %. [Metsä Fibre: Kemin biotuotetehtaan kohdekuvaus](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/).

Jos 250 % tulkitaan havainnollistavasti suhteeksi **oma sähköntuotanto / oma sähkönkulutus = 2,5**, voidaan johtaa:

| Laskelma | Johdettu tulos | Status |
|---|---:|---|
| 2,0 TWh / 2,5 | noin 0,8 TWh/v oma sähkönkulutus | Johdettu havainnollistus |
| 2,0 TWh − 0,8 TWh | noin +1,2 TWh/v tuotannon ja johdetun kulutuksen erotus | Johdettu havainnollistus, **ei mitattu nettovienti** |

Tämä laskelma ei korvaa tehtaan todellista verkosta ottoa ja verkkoon syöttöä. Sen tarkoitus on osoittaa mittariherkkyys:

- jos tarkastellaan kaikkea prosessissa käytettyä sähköä, Kemi on merkittävä sähkönkäyttäjä;
- jos tarkastellaan omaa tuotantoa suhteessa omaan kulutukseen, sama tehdas näyttää erittäin vahvalta;
- jos nimittäjäksi valitaan verkosta otettu sähkö, mittaria ei voida vielä laskea ilman mitattua verkkotasetta;
- jos verkko-otto olisi hyvin pieni tai negatiivinen nettotaseen vuoksi, jotkin suhdeluvut voisivat kasvaa poikkeuksellisen suuriksi tai muuttua tulkinnallisesti käyttökelvottomiksi.

Tämä ei ole virhe, joka pitäisi peittää. Se kertoo, että **mittarin valinta sisältää kysymyksen siitä, mitä vaikutusta pidetään olennaisena**. [Mittari muuttaa vastausta](/analyysit/datakeskukset/vertailu/#mittari-muuttaa-vastausta-kemin-sahkoesimerkki).

### Koneellinen status ja ladattava aineisto

Laskelmat ja niiden oletukset ovat myös [ladattavassa JSON-aineistossa](/downloads/calculations.json). Siellä Tuiken yritystalouden laskut ja Kemin sähköesimerkki on erotettu omiksi objekteikseen. Kemin esimerkin status on koneellisesti merkitty **johdetuksi havainnollistukseksi, ei mitatuksi verkkotaseeksi**.

## Aineiston kattavuus

Lähdehakemisto sisältää julkaisussa käytetyt verkkolähteet ja erikseen yksilöidyt HEL16-asiakirjat. Mukana on myös lähteitä, joita käytetään rajauksen tai taustan varmistamiseen ilman erillistä johtopäätöstä. Lähteen sisällöllinen tarkistus ja tekninen saatavuustarkistus ovat eri asioita.

HEL16:n kymmenen PDF:n metadata ja tiivisteet yksilöivät käytetyn aineiston. Päätöksen kaikki 17 lupamääräystä on luettu. Päätöksen sivuviitteet tarkoittavat painettuja sivuja 1–77; tiedostossa on 80 PDF-sivua. Hakemuksen D01 PDF-sivu on kaksi suurempi kuin painettu sivu. Kaikkia hakemuksen erillisiä liitteitä ei ole käytössä.

Hakemukset kertovat suunnitelmista, päätökset luvan ehdoista ja myöhempi tarkkailu toteumasta. Päätöksen muutoksenhaku- tai lainvoimaisuustilannetta ei päätellä kuulutuksen valitusajan päättymisestä. Yritystietopalveluiden yhteinen taustalähde voi tarkoittaa, etteivät ne ole toisistaan riippumattomia varmennuksia.


## Ladattava julkaisu

- [Pitkä raportti Markdownina](/downloads/datakeskukset.md)
- [Lähderekisteri JSON-muodossa](/downloads/sources.json)
- [Lähderekisteri CSV-muodossa](/downloads/sources.csv)
- [Tutkimuskysymykset metatietoineen](/downloads/questions.json)
- [HEL16:n asiakirjarekisteri ja SHA-256-tiivisteet](/downloads/documents.json)

## Verkkolähteet

Jokaisen verkkolähteen otsikko linkittää suoraan alkuperäiseen lähdesivuun tai alkuperäiseen PDF-tiedostoon. S-tunniste on vain pysyvä tekninen tunniste lähderekisterissä, ei lukijalle tarkoitettu viittaustapa.

HEL16:n viranomaisasiakirjoissa käytetty tiedosto yksilöidään nimellä, päivämäärällä, sivumäärällä ja SHA-256-tiivisteellä. Viranomaisen tietopalvelu tarjoaa tässä aineistossa pysyvän linkin asian sivulle; yksittäisille käytetyille PDF-tiedostoille ei ole kirjattu varmennettua pysyvää suoraa URL-osoitetta, joten sellaista ei ole keksitty.

Kunkin linkin yhteydessä näkyvä tekninen tarkistus kertoo vain palvelimen vastauksen. Esimerkiksi käyttörajoitus ei todista lähdettä virheelliseksi; onnistunut HTTP-vastaus ei vahvista sisältöä.
