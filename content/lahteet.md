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

Laskentaketju käyttää Tuiken vuoden 2025 yritystietoja: liikevaihto 574,374 M€, lähteen pyöristetty käyttökate 60,0 % ja liiketulos 30,305 M€. [Proff S001](#S001), [Profinder S002](#S002). Alkuperäistä tilinpäätöstä liitetietoineen ei ole luettu.

| Laskutoimitus | Laskentatulos | Tulkintaraja |
|---|---:|---|
| 574,374 × 0,600 | 344,6244 M€ → noin 344,6 M€ | Käyttökatearvio; ei vapaa kassavirta |
| 344,6244 − 30,305 | 314,3194 M€ → noin 314,3 M€ | EBITDA–EBIT-erotus; ei suoraan luettu poistojen erä |
| 574,374 − 344,6244 | 229,7496 M€ → noin 229,7 M€ | Jäännös; ei kotimaisten hankintojen määrä |

Laskennan ylimääräiset desimaalit näyttävät ketjun, eivät lähtötiedon tarkkuutta. Tuotosta, palkkoja, hankintoja ja veroja ei lasketa yhteen samaksi nettohyödyksi. Aiemman keskustelun noin 217 M€:n ostot, 358 M€:n arvonlisä ja 14 M€/v:n paikallinen alaraja eivät ole tässä varmennettuja.

[Lataa laskelmat JSON-muodossa](/downloads/calculations.json). Repositoriossa laskenta tehdään kokonaislukuyksiköillä ja testataan; verkkosivun luvut täsmäytetään laskentatuloksiin.

## Aineiston kattavuus

Lähdehakemisto säilyttää aiemman auditoinnin 67 verkkolähdettä (S001–S067). Julkaisuvaiheessa lisättiin neljä valmistavan teollisuuden alkuperäislähdettä (S068–S071). Mukana on myös taustalähteitä, joista ei tehdä tässä julkaisussa erillistä johtopäätöstä. Lähteiden lukupäivä ja tekninen saatavuustarkistus ovat eri tietoja.

HEL16:n kymmenen PDF:n metadata ja tiivisteet yksilöivät toimitetun aineiston. Päätöksen kaikki 17 lupamääräystä luettiin aiemmassa tarkistuksessa. Päätöksen sivuviitteet tarkoittavat painettuja sivuja 1–77; tiedostossa on 80 PDF-sivua. Hakemuksen D01 PDF-sivu on kaksi suurempi kuin painettu sivu. Kaikkia hakemuksen erillisiä liitteitä ei ole käytössä.

Hakemukset kertovat suunnitelmista, päätökset luvan ehdoista ja myöhempi tarkkailu toteumasta. Päätöksen muutoksenhaku- tai lainvoimaisuustilannetta ei päätellä kuulutuksen valitusajan päättymisestä. Yritystietopalveluiden yhteinen taustalähde voi tarkoittaa, etteivät ne ole toisistaan riippumattomia varmennuksia.

## Keskusteluarkisto

Auditoinnin alkupuoli on säilytetty erillisessä Haminan työntekijämäärä -keskusteluarkistossa: 122 palautettua viestiä, 32 historiallista versiota ja kahdeksan lukupakettia. Arkisto sisältää alustavia arvioita ja Symetran kehityskeskustelua. Se on toimituksen tausta-aineistoa, eikä yksityisiä keskusteluja julkaista automaattisesti.

Arkistossa on 379 sisäistä lähdeviitemerkintää, joiden alkuperäistä verkkokohdetta ei saatu palautetusta keskustelusta. Niille ei ole keksitty URL-osoitteita. Julkaisun johtopäätökset perustuvat alla yksilöityihin lähteisiin ja näkyviin rajauksiin. Alkuperäinen arkisto on toimituksen paikallisessa auditointiaineistossa; tämä verkkoversio sisältää toimitetun raportin.

## Ladattava julkaisu

- [Pitkä raportti Markdownina](/downloads/datakeskukset.md)
- [Lähderekisteri JSON-muodossa](/downloads/sources.json)
- [Lähderekisteri CSV-muodossa](/downloads/sources.csv)
- [Tutkimuskysymykset metatietoineen](/downloads/questions.json)
- [HEL16:n asiakirjarekisteri ja SHA-256-tiivisteet](/downloads/documents.json)

## Verkkolähteet

S-tunnisteet ovat pysyviä. Kunkin linkin yhteydessä näkyvä tekninen tarkistus kertoo vain palvelimen vastauksen. Esimerkiksi käyttörajoitus ei todista lähdettä virheelliseksi; onnistunut HTTP-vastaus ei vahvista sisältöä.
