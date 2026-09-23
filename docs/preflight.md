# Julkaisun preflight — 22.9.2026

**Tila: v1.2.0 on julkaistu teknisesti hyväksytyn preflightin jälkeen.** Selain- ja PDF-tarkistus jatkuu julkaisun jälkeisenä QA-tehtävänä käyttäjän hyväksynnän mukaisesti.

## Sisältö ja aineisto

- 10 sisältösivua, lisäksi kanoninen raportti, `/raportti/`-yhteensopivuussivu ja 404: yhteensä 12 HTML-sivua.
- `/analyysit/datakeskukset/` sisältää orientaation, esipuheen, tutkimuskysymyksen, lukutavan, varsinaisen analyysin, A01–A11-väiteauditoinnin, johtopäätökset ja menetelmän tässä järjestyksessä.
- Tekijä on Symetra organisaationa. Versio, julkaisu- ja päivityspäivä, aineiston katkaisupäivä sekä julkaistu tila näkyvät raportissa.
- Kaikki A01–A11-kysymykset, niiden alkuperä, kuvaileva arvio, lähteet ja avoimet tiedot mukana.
- Kohdevertailu ja kuusi vaikutusaluetta noudattavat kuusiosaista havaintomallia. Ei yhteispisteitä, voittajaa tai politiikkasuositusta.
- 95 verkkolähdettä ja kymmenen HEL16-asiakirjan metadata. Kemin vuoden 2025 toteumatietoja, Nebius Finland-1:n vuoden 2025 vesi- ja lämpödataa sekä Symetrix-mittariaineistoa säilytetään lähderekisterissä ja latauksissa.
- Resource Flow Matrix v0.1 erottaa vedenoton, vedenkulutuksen, jäte-/poistovirran, sähkön kokonaiskulutuksen, oman tuotannon, hyötylämmön ja mitatun verkkotaseen. Puuttuva toteuma pysyy `unknown`-tilassa.
- Kemin arvonlisästä on lisätty 2021 Ramboll-skenaario (230 M€/v suorana arvonlisänä 1,5 Mt/v tuotannolla) ja siitä 2025 toteutuneella 927 kt:n tuotannolla johdettu 142,14 M€ P/S-proxy. Proxyä ei käsitellä toteutuneena toimipaikkalukuna eikä Symetrix-pisteytetä.
- Nebius DC Oy:n 2025 julkisista taloustiedoista johdetaan noin 13,34 M€ EBITDA ja Tilastokeskuksen jalostusarvomääritelmän perusteella konservatiivinen jalostusarvon alarajaproxy. Vesi- ja sähköintensiteetit säilyttävät lower-bound/upper-bound-merkinnät; noin 2 111× veden spread on rabbit-hole-signaali, ei ranking.
- Laskennassa kokonaislukuaritmetiikka; käyttökatteen pyöristys ja johdettujen lukujen rajat näkyvät.
- Alkuperäistä keskusteluarkistoa, käyttäjän paikallisia polkuja ja PDF-kokotekstejä ei sisällytetä julkaisurepoon tai buildiin.
- Ei väitettä koko valmistavan teollisuuden kattavasta auditoinnista; verrokkien suppeampi tutkimussyvyys näkyy.

## Automaattiset tarkistukset

- `npm run preflight`: yhdistetyn puun testimäärä ja sisäisten viittausten määrä vahvistetaan viimeisessä ajossa; raporttijärjestys, Symetrix-viennit, metatiedot ja legacy-ankkurit ovat automaattisia portteja.
- Kanonisten Markdown-sisältöjen tekstivastaavuus HTML:ään tarkistettu, mukaan lukien jokaisen tutkimuskysymyksen koko teksti.
- Yhteiset lukutiedostot laajennetaan ennen renderöintiä; ratkaisemattomat `chapter`- ja `cite`-tokenit estävät preflightin. Raportin lukujärjestys tulee `data/publication.json`-tiedostosta. Esipuheen yksikäsitteisyys, A01–A11:n sijainti vertailun ja johtopäätösten välissä sekä aiempien versioiden ankkurit tarkistetaan automaattisesti.
- Pääraportin ja `/raportti/`-reitin canonical-, robots-, Open Graph- ja Article-JSON-LD-metatiedot tarkistetaan. Pääraportti on sitemapissa; yhteensopivuusreitti ei ole.
- Tulostus-HTML ja Markdown-lataus sisältävät täydellisen lähdeliitteen. Ulkoinen linkkitarkistus ei korvaa aiempaa rekisteriä, jos kaikki osoitteet epäonnistuvat verkkotasolla.
- Sekä `/symetra-publications/`-alihakemisto että tyhjä juuripolku rakennettu ja tarkistettu.
- Puhtaassa tilapäishakemistossa tehty `npm ci --ignore-scripts`, preflight ja juuripolun tarkistus hyväksytysti (paikallinen Node 23.11.0). GitHub Actions varmentaa erikseen Node 22:n.
- Ulkoinen linkkirekisteri on laajentunut 95 lähteeseen; täydellinen linkkitarkistus ja puhtaan asennuksen auditointi kirjataan yhdistetyn puun lopullisilla tuloksilla. HTTP-tulos ei ole sisällön varmennus.
- Aiemmin `npm audit` raportoi 0 haavoittuvuutta; yhdistetyn puun lopullinen auditointi ajetaan ennen pushia.

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

Varmennettava polku: etusivu → Lue raportti → sisällysluettelon luku → A03 → lähde → paluu. Testaa myös `/raportti/`-yhteensopivuusreitti, mobiilivalikon avaaminen, vaakataulukon näppäimistövieritys, raportin lataus, A4-tulostus, PDF, jakokuvan esikatselu ja tuntematon osoite.

## Julkaisupäätös

Versio 1.2.0 julkaistaan käyttäjän nimenomaisella päätöksellä ennen selain- ja PDF-kokeita. Nämä kokeet kirjataan julkaisemisen jälkeiseksi QA:ksi. Muut aineistopuutteet ovat analyysin näkyviä tuloksia; niitä ei piiloteta julkaisumuotoa vaihtamalla.
