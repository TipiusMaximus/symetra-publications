# Symetra Publications

Suomenkielinen staattinen julkaisu: **Datakeskusten taloudellisten ja yhteiskunnallisten vaikutusten auditointi**. Erillinen julkaisurepo, jolla ei ole riippuvuutta Symetra-sovelluksesta.

## Käyttö

Node 22 tai uudempi. Riippuvuudet on lukittu `package-lock.json`-tiedostoon.

```sh
npm ci --ignore-scripts
npm run preflight
npm run preview
```

Esikatselu: `http://127.0.0.1:4173/symetra-publications/`. Palvelin kuuntelee vain paikallista loopback-osoitetta. Portin voi vaihtaa `PORT`-ympäristömuuttujalla.

Oman verkkotunnuksen juurihakemistoon:

```sh
BASE_PATH='' SITE_ORIGIN=https://example.org npm run build
npm run check
```

`BASE_PATH` sisältää alkuvinoviivan mutta ei loppuvinoviivaa; tyhjä arvo tarkoittaa juurta. `SITE_ORIGIN` on pelkkä verkkosivuston alkuperä ilman hakemistopolkua. Muuta pysyvät oletukset `config.json`-tiedostoon, kun todellinen julkaisupaikka on valittu. Vaihda myös työnkulun ympäristömuuttujat, jos otat oman verkkotunnuksen käyttöön.

## Sisältö

- `content/*.md`: sivujen ensisijainen sisältö.
- `content/chapters/*.md`: pääkertomukseen ja kohdennettuihin näkymiin koottavat yhteiset luvut.
- `content/questions/A01.md`–`A11.md`: tutkimuskysymykset ja koneluettavat metatiedot.
- `data/sources.json`: 92 verkkolähdettä ja niiden alkuperäketju.
- `data/documents.json`: HEL16:n kymmenen asiakirjan metadata; ei alkuperäisiä PDF:iä tai henkilökohtaisia polkuja.
- `data/observations.json`: rajatusti varmennetut havainnot, niiden lähteet ja tulkintarajat.
- `data/publication.json`: kanonisen raportin, yhteensopivuusreitin, latauksen ja tulosteen yhteinen järjestetty sisältömanifesti.
- `data/legacy-anchors.json`: aiempien versioiden pysyvät fragmenttitunnisteet.
- `scripts/calculations.mjs`: toistettava laskenta.
- `assets/`: CSS, pieni tulostus-JavaScript ja 1200 × 630 PNG-jakokuva.
- `dist/`: generoitu HTML ja ladattavat aineistot, ei Gitissä.

Kanoninen raportti on osoitteessa `/analyysit/datakeskukset/`. Yhteensopivuusreitti `/analyysit/datakeskukset/raportti/`, Markdown-lataus ja tulostusversio generoidaan samasta manifestista; niiden runkosisältöä ei muokata erikseen. Tulosteessa ja Markdown-latauksessa on täydellinen lähdeliite. Sivusto toimii ilman JavaScriptiä; silloin selaimen oma tulostustoiminto on käytettävissä.

Frontmatter tukee yhtä skalaaria per rivi sekä JSON-muotoisia listoja (kelvollista YAMLia). Monirivisiä YAML-rakenteita ei tueta. Pakolliset sivukentät: `title`, `slug`, `route`, `language`, `status`, `published`, `updated`, `description`, `layout`. `published: false` ilmaisee, ettei verkkoversiota ole vielä julkaistu; valmis sisältö merkitään `status: ready`.

Kysymyksillä lisäksi `id`, `question`, `classification`, `original`, `rationale`, `sourceRefs` ja `openData`. Luokat ovat kuvailevia, eivät pisteitä. Markdowniin saa lisätä vain repossa toimitettua luotettua sisältöä; build ei ole julkisen käyttäjäsyötteen HTML-puhdistin.

## Testit ja lähdelinkit

`npm run preflight` rakentaa sivut, testaa polku- ja laskentasäännöt sekä tarkistaa sisäiset linkit, kaikki ankkurit, otsikkotasot, Markdown-vastaavuuden, raporttijärjestyksen, metadatajoukon, lähdetunnisteet, ladattavan raportin ja aineiston julkaisurajan. `npm run check:external` tarkistaa ulkoiset lähdeosoitteet ja päivittää `data/link-check.json`-tiedoston. Jos kaikki osoitteet epäonnistuvat verkkotasolla, aiempi kelvollinen rekisteri säilytetään. Rakenna sivusto tämän jälkeen uudelleen, jotta saatavuustiedot näkyvät lukijalle.

Linkkien tarkistus tarvitsee verkkoyhteyden. HTTP 403 merkitään estyneeksi; sitä ei tulkita kadonneeksi lähteeksi. HTTP 200 ei ole lähteen faktantarkistus. Aidosti puuttuvat sivut (404) aiheuttavat virhekoodin. Automaattinen CI ei tee toistuvia verkkohakuja: päivätty saatavuustulos versioidaan erikseen.

## GitHub Pages

Työnkulku rakentaa PR:t ja main-haaran, tarkistaa sekä projektipolun että juuripolun ja tuottaa Pages-artefaktin. Main-haaran onnistunut build julkaisee Pages-artefaktin.

Julkaisun yhteydessä:

1. Varmista dokumentoidut sisältö-, linkki- ja Git-tarkistukset.
2. Varmenna työpöytä, mobiili (myös 320 px), näppäimistö, tulostus/PDF ja jakokuvan esikatselu oikeassa selaimessa.
3. Päivitä metatietojen `published`-tila ja `docs/preflight.md` todellisten tulosten perusteella.
4. Ota repossa Pagesin lähteeksi GitHub Actions ja varmista julkisen julkaisemisen edellytykset.
5. Käynnistä työnkulku ja tarkista julkinen sivusto sekä tuntemattoman polun 404-vastaus.

Toteutus noudattaa [GitHubin Pages-työnkulkuohjetta](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Tausta-aineisto ja tietosuoja

Alkuperäinen 122 viestin tutkimuskeskustelu ja sen kahdeksan lukupakettia säilytetään paikallisessa Symetra-auditointiaineistossa erillään tästä repositoriosta. Myös käyttäjän alkuperäiset PDF:t jäävät lähdeaineistoon. Build lukee vain tämän repositorion `content/`, `data/` ja `assets/`-aineistoa; se ei kopioi ylempää hakemistoa tai keskusteluita.

Lähteillä on omat käyttöehtonsa. Tähän repoon ei ole liitetty kolmansien osapuolten kokotekstejä. Julkaisun lisenssivalintaa ei ole tehty käyttäjän puolesta.
