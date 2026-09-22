# Julkaisun preflight — 22.9.2026

**Tila: toteutus valmis tarkasteltavaksi; julkinen julkaisu ja selainhyväksyntä odottavat.** GitHub Pagesin julkaisu on lukittu muuttujalla `PUBLISH_APPROVED`.

## Sisältö ja aineisto

- 8 suunnitelman mukaista pääsivua, lisäksi pitkä raportti ja 404: yhteensä 10 HTML-sivua.
- Kaikki A01–A11-kysymykset, niiden alkuperä, kuvaileva arvio, lähteet ja avoimet tiedot mukana.
- Kohdevertailu ja kuusi vaikutusaluetta noudattavat kuusiosaista havaintomallia. Ei yhteispisteitä, voittajaa tai politiikkasuositusta.
- 74 verkkolähdettä ja kymmenen HEL16-asiakirjan metadata. Kemin ja Outokummun alkuperäislähteet lisätty ja tarkistettu julkaisuvaiheessa.
- Laskennassa kokonaislukuaritmetiikka; käyttökatteen pyöristys ja johdettujen lukujen rajat näkyvät.
- Alkuperäistä keskusteluarkistoa, käyttäjän paikallisia polkuja ja PDF-kokotekstejä ei sisällytetä julkaisurepoon tai buildiin.
- Ei väitettä koko valmistavan teollisuuden kattavasta auditoinnista; verrokkien suppeampi tutkimussyvyys näkyy.

## Automaattiset tarkistukset

- `npm run preflight`: 7 testiä hyväksytty; 10 HTML-sivua; 290 sisäistä linkki-, resurssi- ja ankkuriviittausta; yksi H1 sivua kohti; ei otsikkotasojen hyppyjä tai päällekkäisiä tunnisteita.
- Kanonisten Markdown-sisältöjen tekstivastaavuus HTML:ään tarkistettu, mukaan lukien jokaisen tutkimuskysymyksen koko teksti.
- Sekä `/symetra-publications/`-alihakemisto että tyhjä juuripolku rakennettu ja tarkistettu.
- Puhtaassa tilapäishakemistossa tehty `npm ci --ignore-scripts`, preflight ja juuripolun tarkistus hyväksytysti (paikallinen Node 23.11.0). GitHub Actions varmentaa erikseen Node 22:n.
- 74 yksilöllistä ulkoista lähdeosoitetta tarkistettu: 72 vastasi onnistuneesti; Stora Enson vuoden 2010 tilinpäätös ja IMF:n taustalähde palauttivat HTTP 403. Ei HTTP 404 -lähteitä. Käyttörajaukset näkyvät lähdesivulla. HTTP-tulos ei ole sisällön varmennus.
- Asennuksen riippuvuusauditointi: ei havaittuja haavoittuvuuksia. Yksi riippuvuuden vanhentumisilmoitus (`whatwg-encoding`); ei estä buildia, vaihto jätetään riippuvuuden ylläpitäjälle.

### Termiselitysten tarkistus — 22.9.2026

Liikevaihto, EBITDA/käyttökate, EBIT/liiketulos, tilikauden tulos, FTE, henkilötyövuosi, arvonlisä sekä sisäinen ja ulkoinen myynti on avattu lukijalle. Laskentasivun termitaulukon linkit ja ankkuri tarkistuvat myös pitkän raportin kautta. Tilastokeskuksen kaksi käsitelähdettä on lisätty rekisteriin ja saatavuustarkistukseen.

Muokattujen neljän sisältösivun kaikki aiemmat suorat ulkoiset lähdelinkit sekä aiemmat lähderekisterin merkinnät on verrattu Git-versioon: ne säilyvät. Laskentakoodi, lähtöluvut ja HEL16-asiakirjarekisteri eivät muutu. Vuoden lopun FTE:n nimitys ja sisäisen myynnin 53 prosentin sanallinen kuvaus on täsmennetty. `git diff --check` hyväksytty. Tässä päivityksessä ei tehty uutta selaimen ulkoasu- tai saavutettavuusauditointia.

## Ulkoasu ja saavutettavuus

Image Gen -konseptit ja 1200 × 630 Open Graph -kuva katsottu `view_image`-työkalulla. Konseptit ovat sommittelun viitteitä; ne eivät ole selaimesta otettuja toteutuskuvia. Julkaisussa kaikki varsinainen teksti ja taulukot ovat HTML:ää.

Lähdekoodista tarkistetut viisi vertailukohtaa: valkoinen/petrooli-paletti; Georgia-otsikot ja sans-serif-leipäteksti; etusivun otsikon ja toimintolinkin teksti; etusivun osiojärjestys; artikkelin sivunavigaatio ja vaakaviivoin erotetut taulukot. Etusivun näkyvä teksti vastaa valittua konseptia. Generoidun vertailukuvan keksityt faktatekstit on korvattu lähdehavainnoilla; tätä ei käsitellä visuaalisena virheenä.

CSS sisältää 720 px:n mobiilivaihdon, näppäimistöfokuksen, ohituslinkin, vaakavieritettävät taulukot ja A4-tulostustyylin. Nämä ovat toteutettuja ominaisuuksia, **eivät vielä selaimessa hyväksyttyjä tuloksia**.

Väriparien laskennalliset kontrastit: pääteksti/valkoinen 14,57:1, linkki/valkoinen 7,74:1, toissijainen teksti/valkoinen 5,98:1, pääteksti/taulukkopinta 12,98:1 ja linkki/taulukkopinta 6,89:1. Kaikki ylittävät tavallisen tekstin 4,5:1-rajan. Tämä ei ole koko sivuston selainpohjainen saavutettavuusauditointi.

### Selainvarmennuksen este

Sisäisen selaimen yritys avata paikallinen sivusto estyi, koska organisaation pakotettua tietoturvakäytäntöä ei voitu tarkistaa: “The admin-enforced policy could not be verified, so access was not granted.” Työkalu kielsi kiertämästä tarkistusta. Siksi Playwrightia tai toista epäsuoraa selausmenetelmää ei käytetty.

Toteutuksesta ei ole selaimen kuvakaappausta eikä konseptin ja toteutuksen lopullista visuaalista vastaavuutta väitetä varmennetuksi. Natiivikoon 1440 × 1100, mobiilin 320/390 px, näppäimistöpolun, selaimen konsolin ja PDF-tulostuksen tarkistus ovat edelleen tekemättä. Myöskään sosiaalisen palvelun todellista esikatseluhakua ei ole testattu; metadata ja PNG ovat paikallisesti olemassa.

Varmennettava polku: etusivu → Tutustu analyysiin → Kohdevertailu → Tutkimuskysymykset → A03 → lähde. Testaa myös paluu, mobiilivalikon avaaminen, vaakataulukon näppäimistövieritys, raportin lataus, tulostus ja tuntematon osoite.

## Julkaisupäätös

Julkaisuportti pidetään suljettuna, kunnes edellä nimetyt selainkokeet on voitu tehdä. Tämä toteuttaa käyttäjän suunnitelman julkaisemista edeltävät responsiivisuus- ja tulostuskriteerit. Muut aineistopuutteet ovat analyysin näkyviä tuloksia; niitä ei piiloteta julkaisumuotoa vaihtamalla.
