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

Laskentaketju käyttää Tuiken vuoden 2025 yritystietoja: liikevaihto 574,374 M€, lähteen pyöristetty käyttökate 60,0 % ja liiketulos 30,305 M€. [Proff — Tuike Finland Oy](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG), [Profinder — Tuike Finland Oy](https://b2b.profinder.fi/haku/tuike-finland-oy/22060717). Alkuperäistä tilinpäätöstä liitetietoineen ei ole luettu.

| Laskutoimitus | Laskentatulos | Tulkintaraja |
|---|---:|---|
| 574,374 × 0,600 | 344,6244 M€ → noin 344,6 M€ | Käyttökatearvio; ei vapaa kassavirta |
| 344,6244 − 30,305 | 314,3194 M€ → noin 314,3 M€ | EBITDA–EBIT-erotus; ei suoraan luettu poistojen erä |
| 574,374 − 344,6244 | 229,7496 M€ → noin 229,7 M€ | Jäännös; ei kotimaisten hankintojen määrä |

Laskennan ylimääräiset desimaalit näyttävät ketjun, eivät lähtötiedon tarkkuutta. Tuotosta, palkkoja, hankintoja ja veroja ei lasketa yhteen samaksi nettohyödyksi.

[Lataa laskelmat JSON-muodossa](/downloads/calculations.json). Repositoriossa laskenta tehdään kokonaislukuyksiköillä ja testataan; verkkosivun luvut täsmäytetään laskentatuloksiin.

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
