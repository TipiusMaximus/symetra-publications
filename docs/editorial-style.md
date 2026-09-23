# Symetra — toimituksellinen standardi

Tämä tiedosto lukitsee Symetran julkaisutavan. Sen tarkoitus on tehdä uusien auditointien ja analyysien tuottamisesta toistettavaa riippumatta siitä, kuka tai mikä malli tekstin, laskennan tai sivuston parissa työskentelee.

Perusperiaate:

> **Selitä ennen kuin mittaat. Näytä raja ennen kuin vertaat. Erota havainto tulkinnasta.**

Symetra ei tavoittele yhtä näyttävää kokonaislukua. Julkaisun tehtävä on tehdä näkyväksi, mitä aineisto osoittaa, mitä se ei osoita, millä rajalla luku pätee ja mitä tietoa vielä puuttuu.

## 1. Julkaisun vakioitu lukureitti

Uusi analyysi rakennetaan lähtökohtaisesti seuraavaan järjestykseen:

1. **Orientaatio** — mitä tutkitaan ja miksi kysymys on olennainen.
2. **Esipuhe** — lyhyt toimituksellinen kehys: miten analyysi on tehty ja miten sitä luetaan.
3. **Tutkimuskysymys** — yksi selkeä pääkysymys ennen mittareita.
4. **Kohde ja rajaus** — toimija, fyysinen kohde, oikeushenkilö, ajanjakso ja laskentaraja erotetaan toisistaan.
5. **Varsinainen analyysi** — vaikutusketju etenee ilmiön luonnollisessa järjestyksessä.
6. **Vertailu ja mittarit** — vasta kun lukija tietää, mitä kukin luku tarkoittaa.
7. **Väite- tai kysymysauditointi** — alkuperäiset väitteet ja kysymykset säilytetään jäljitettävänä rinnakkaisnäkymänä.
8. **Johtopäätökset** — mitä aineistosta voidaan päätellä ja mitä ei voida.
9. **Menetelmä** — rajaukset, laskentasäännöt, epävarmuus ja käytetyt käsitteet.
10. **Lähteet ja aineisto** — lukijan pitää voida seurata päätelmä takaisin havaintoon ja alkuperäiseen lähteeseen.

Datakeskusauditissa varsinainen analyysi etenee työstä talouteen, sähköön, verkkoon, ympäristöön ja vaihtoehtoiskustannukseen. Toisessa aiheessa järjestys saa muuttua, jos ilmiön logiikka sitä vaatii.

Järjestystä ei muuteta vain siksi, että uusi AI-malli ehdottaa näyttävämpää rakennetta. Muutos vaatii sisällöllisen perusteen.

## 2. Ensin kohde, sitten luku

Jokaiselle keskeiselle luvulle pitää olla mahdollista vastata vähintään näihin kysymyksiin:

- **Mikä kohde?** Fyysinen laitos, yhtiö, konserni, segmentti vai toimiala?
- **Mikä aika?** Vuosi, tilikausi, suunnitteluvuosi vai usean vuoden jakso?
- **Mikä suure?** Mitattu toteuma, johdettu luku, kapasiteetti, lupa, skenaario vai ennuste?
- **Mikä nimittäjä?** MWh, euro, henkilötyövuosi, tuotantotonni, pinta-ala tai jokin muu?
- **Mikä lähde?** Mistä alkuperäinen havainto tulee?
- **Mikä tulkintaraja?** Mitä luvusta ei saa päätellä?

Eri organisaatio-, aika- tai käsiterajoja ei sulauteta yhdeksi luvuksi hiljaisesti.

## 3. Evidenssitilat ovat osa tulosta

Puuttuva tieto tai heikko vertailukelpoisuus ei ole julkaisuvirhe. Se on tutkimustulos.

| Tila | Merkintä | Merkitys |
|---|---|---|
| Havaittu | Observed / ei lisämerkintää | Lähde raportoi luvun kyseiselle kohteelle ja rajalle. |
| Johdettu | **J** | Luku on laskettu näkyvistä lähtötiedoista. Kaava ja lähtöarvot säilytetään. |
| Estimaatti | **E** | Läpinäkyvä arvio, ei mitattu toteuma. Oletukset pitää nimetä. |
| Proxy | **P** | Käyttökelpoinen suuntaa-antava havainto, mutta kohde-, aika- tai organisaatioraja ei täysin täsmää. |
| Skenaario | **S** | Tarkoituksellinen herkkyys- tai vaihtoehtoluku, ei väite toteumasta. |
| Design | **D** | Suunnittelu- tai mitoitusarvo, ei toteutunut käyttö. |
| Pre-op | **Pre-op** | Kohde ei ole vielä käyttövaiheen toteumavertailussa. |
| Tuntematon | **?** | Mittari sopii kohteelle, mutta tarvittava havainto puuttuu. |
| Ei sovellu | **—** | Mittari ei kuvaa kyseistä kohdetta mielekkäästi. |

Samaa fyysistä ilmiötä kuvaavat eri käsitteet pidetään erillään. Vedenotto, palautus tai jätevesivirta, nettokulutus ja jäähdytysveden läpivirtaus eivät ole sama suure. Samoin MW kapasiteettia ei muuteta MWh/v energiaksi ilman näkyvää käyttöaikaoletusta.

## 4. Lähdeketju ja provenance

Lukijan pitää voida kulkea suuntaan:

**johtopäätös → mittari → lähtöarvo → evidenssihavainto → alkuperäinen lähde**

Siksi:

- ensisijainen alkuperäislähde on aina parempi kuin uutinen tai koontipalvelu, jos se on saatavilla;
- toissijaista lähdettä saa käyttää, mutta sen asema ja rajoite kerrotaan;
- jokaisella koneellisesti käytetyllä havainnolla on lähdeviite ja rajaus;
- AI:n vastaus ei ole evidenssilähde;
- AI saa auttaa löytämään, jäsentämään, laskemaan ja tarkistamaan, mutta julkaistava väite sidotaan nimettyyn lähteeseen tai näkyvään laskentaan;
- HTTP-saatavuus ei tarkoita sisällön faktantarkistusta;
- lähteen puuttumista ei korvata todennäköisellä luvulla ilman E-, P- tai S-tilaa.

## 5. Symetry, symetriikka ja symetointi

Symetran analyysimenetelmä erottaa neljä kerrosta toisistaan:

**Observation → Symetry → Symetrix → Interpretation**

### Observation

**Observation** on lähteeseen sidottu havainto. Siihen kuuluvat aina arvo, yksikkö, kohde, ajanjakso, boundary, evidenssitila ja provenance. Havaintoa ei muuteta vain siksi, että myöhempi vertailu tarvitsee toisenlaisen mittarin.

Esimerkki:

**Kemin vedenotto 2025 = 32 819 000 m³, Observed.**

### Symetointi

**Symetointi** on operaatio, jossa havaittu tai muuten eksplisiittisesti luokiteltu suure suhteutetaan valittuun nimittäjään tutkimuskysymyksen muodostamiseksi.

Yleinen muoto:

[
R = rac{X}{D}
]

missä:

- **X** on tarkasteltava suure;
- **D** on valittu vertailunimittäjä;
- **R** on syntyvä symetriikka.

Sama havainto voidaan symetoida usealla eri, sisällöllisesti perustellulla nimittäjällä. Esimerkiksi vedenotto voidaan ilmaista suhteessa arvonlisään, energiankäyttöön, henkilöstöön, tuotantoon tai maa-alaan.

Symetointi ei itsessään väitä, että yksi nimittäjä olisi muita oikeampi. Se muotoilee uuden kysymyksen samalle havaintoaineistolle.

### Symetriikka / Symetry

**Symetriikka** (englanniksi **Symetry**) on symetoinnin tuloksena syntyvä suhteutettu mittari. Se säilyttää molempien lähtöarvojen provenance- ja boundary-tiedot.

Esimerkkejä:

- m³ vedenottoa / M€ arvonlisää;
- MWh sähköä / M€ arvonlisää;
- htv / M€ arvonlisää;
- m² maa-alaa / M€ arvonlisää;
- kg päästöä / tuotantotonni.

Symetriikka ei ole vielä Symetrix-piste eikä yleinen arvosana kohteesta.

### Symetoinnin yhteensopivuusportti

Symetointi tehdään vain, jos suhdeluku vastaa ymmärrettävään kysymykseen ja lähtöarvojen yhteensopivuus on näkyvästi arvioitu.

Tarkistetaan vähintään:

1. **Kohdeboundary** — kuvaavatko osoittaja ja nimittäjä samaa kohdetta tai onko niiden välinen kartoitus eksplisiittinen?
2. **Aika** — ovatko ajanjaksot samat tai onko aikapoikkeama perusteltu?
3. **Käsitemerkitys** — tarkoittavatko suureet juuri sitä, mitä mittarin nimi väittää?
4. **Yksiköt** — onko suhdeluvun dimensio määritelty ja toistettavissa?
5. **Provenance** — voidaanko kumpikin lähtöarvo jäljittää lähteeseen tai näkyvään laskentaan?
6. **Tulkinta** — onko selvää, mihin kysymykseen suhdeluku vastaa ja mihin se ei vastaa?

Jos nämä ehdot eivät täyty, suhdelukua ei esitetä vahvana vertailumittarina. Tarvittaessa se merkitään proxyksi tai jätetään avoimeksi.

Esimerkiksi vedenottoa ei nimetä WUE:ksi, jos WUE:n määritelmä edellyttää veden kulutusta. Tällöin voidaan määritellä erillinen **Water Withdrawal Intensity** -mittari, jos vedenotto ja nimittäjä ovat yhteensopivia.

### Evidenssin heikoin lenkki

Symetointi ei saa vahvistaa lähtöaineistoa keinotekoisesti.

Jos symetriikka johdetaan kahdesta havaitusta lähtöarvosta, itse suhdeluku on johdettu **J**, vaikka sen lähtöarvot ovat Observed. Jos jokin olennainen lähtöarvo on estimaatti, proxy tai skenaario, tämä epävarmuus säilytetään symetriikan metadatassa eikä tulosta esitetä vahvempana kuin sen heikoin olennainen lähtötekijä sallii.

Periaate:

> **Muunnos voi lisätä ymmärrettävyyttä, mutta ei evidenssin laatua.**

### Symetrix

**Symetrix** on seuraava kerros. Se suhteuttaa valitun symetriikan eksplisiittiseen baselineen tai muuhun ennalta määriteltyyn vertailukohtaan.

Putki on siten:

**raakahavainto → symetointi → symetriikka → baseline-normalisointi → Symetrix → tulkinta**

Symetrix ei oletusarvoisesti yhdistä eri mittareita yhdeksi kokonaispisteeksi. Eri symetriikat vastaavat eri kysymyksiin ja säilyvät näkyvinä rinnakkain.

Tämän rakenteen tarkoitus on tukea tutkivaa analyysiä: samaa todellisuutta voidaan tarkastella useista perustelluista näkökulmista muuttamatta alkuperäisiä havaintoja tai piilottamatta arvovalintoja.

### Syntraus — mielikuvitus kohtaa todisteet

**Syntraus** on Symetran tutkiva vaihe, jossa havaintojen, symetriikoiden ja tulkintojen väliltä etsitään uusia rakenteita, ristiriitoja, poikkeamia ja tutkimuskysymyksiä.

Perusperiaate:

> **Mielikuvitus kohtaa todisteet.**

Syntraus saa olla luovaa. Se voi ehdottaa uuden nimittäjän, uuden symetriikan, uuden verrokin, uuden boundaryn tai kokonaan uuden tutkimushaaran. Ehdotus ei kuitenkaan muutu havainnoksi, mittariksi tai johtopäätökseksi ennen kuin se läpäisee samat evidenssi-, provenance- ja boundary-säännöt kuin muu analyysi.

Syntrauksen tulos on ensisijaisesti **kandidaattikysymys tai hypoteesi**, ei fakta.

Esimerkiksi suuri ero kahden kohteen vedenotossa voi syntrata kysymyksen siitä, seuraako julkinen huomio fyysisen resurssivirran mittakaavaa. Tällöin voidaan ehdottaa uutta mittaria, kuten julkinen huomio / vedenotto, mutta mittaria ei julkaista vahvana vertailuna ennen kuin huomion mittausmenetelmä, aikaraja, aineisto ja nimittäjä ovat eksplisiittisiä.

Syntrauksen työkierto on:

**Observation → Symetry → Symetrix → Interpretation → Syntraus → uusi kysymys → uusi Observation**

Kierto saa jatkua niin kauan kuin uudet kysymykset tuottavat testattavia rakenteita. Menetelmä ei kuitenkaan palkitse pelkkää yllättävyyttä: rabbit hole on tutkimusvihje, ei johtopäätös.

Syntrauksen turvarajat:

1. **Mielikuvitus saa ehdottaa, ei todistaa.**
2. **Uusi suhdeluku tarvitsee aina nimettyyn kysymykseen sopivan nimittäjän.**
3. **Korrelaatio tai suuri kertaluokkaero ei yksin muodosta kausaaliväitettä.**
4. **Heikko evidenssi ei vahvistu sillä, että siitä johdetaan kiinnostava mittari.**
5. **Uusi tutkimushaara säilyttää alkuperäisen havainnon, boundaryn ja provenancen.**
6. **Jos ehdotus ei läpäise yhteensopivuusporttia, se jää rabbit holeksi, hypoteesiksi tai avoimeksi kysymykseksi.**

Lyhyt englanninkielinen muoto:

> **Imagination proposes the symmetry. Evidence decides whether it survives.**

## 6. Mittarit ja Symetrix

Mittari vastaa aina yhteen rajattuun kysymykseen. Se ei ole yleisarvosana kohteesta.

Jokaiselle mittarille määritellään:

- nimi ja kysymys;
- kaava;
- yksikkö;
- suunta, jos suunnalla on tulkinnallinen merkitys;
- baseline tai muu vertailukohta;
- kohteet, joihin mittari soveltuu;
- evidenssitila kohdekohtaisesti;
- mitä mittari **ei** kerro.

Symetrixissä **50 = näkyvä baseline**, ei keskinkertaisuus eikä neutraali yhteiskunnallinen arvo. Pisteen merkitys on rajattu kyseisen mittarin näkökulmaan.

Uuden kohteen lisääminen ei saa muuttaa vanhojen pisteitä vain vertailujoukon minimin tai maksimin muuttumisen vuoksi. Historialliset mallit säilytetään toistettavuuden vuoksi, mutta julkisen sivun version pitää aina vastata aktiivista laskentamallia.

Symetra ei muodosta eri mittareista yhteispistettä, voittajaa tai toimialojen yleistä paremmuusjärjestystä ilman erikseen määriteltyä ja perusteltua tutkimuskysymystä.

## 7. Kirjoitustapa

Teksti on rauhallista, täsmällistä ja luettavaa ihmiselle, joka ei tunne aihetta ennalta.

Vakiosäännöt:

- selitä termi ensimmäisellä olennaisella käyttökerralla;
- käytä konkreettisia kohteita abstraktin toimialapuheen tukena;
- kerro ensin, mitä luku tarkoittaa, vasta sitten mitä siitä seuraa;
- pidä havainto, laskenta ja tulkinta erillään;
- nimeä epävarmuus suoraan;
- vältä markkinointikieltä, dramatisointia ja näennäistä varmuutta;
- vältä tarpeetonta akateemista raskautta, jos sama asia voidaan sanoa täsmällisesti tavallisella kielellä;
- älä täytä aukkoja tekstillä vain siksi, että sivu näyttäisi valmiilta.

Hyvä Symetra-kappale vie lukijaa eteenpäin. Sen pitää vastata yhteen kysymykseen tai valmistaa seuraava kysymys.

## 8. Visuaalinen linja

Visuaalisen toteutuksen ensisijainen määrittely on docs/design.md.

Pysyvät periaatteet:

- hillitty, moderni ja lukupainotteinen;
- paljon tyhjää tilaa ja selkeä typografinen hierarkia;
- taulukot ja rajausnostot ovat informaatiota, eivät koristeita;
- ei dashboard-maista korttitulvaa;
- ei liikennevaloja, koristepisteitä tai visuaalista voittajan korostamista;
- ei kuvamateriaalia vain täytteen vuoksi;
- saavutettavuus, mobiili ja tulostettavuus kuuluvat julkaisuun alusta asti.

Ulkoasua ei suunnitella joka analyysille uudelleen. Uusi analyysi saa oman sisältönsä, ei omaa visuaalista järjestelmäänsä.

## 9. Navigaatio

Symetran navigaation pitää tukea lukemista eikä esitellä repositorion rakennetta.

Pääperiaate:

**etusivu → kanoninen raportti → tarvittaessa kohdennettu näkymä → lähde**

Päänavigaatio pidetään pienenä. Uutta päälinkkiä ei lisätä vain siksi, että uusi tiedosto tai laskentamalli on olemassa.

Kanoninen raportti on aina ensisijainen lukureitti. Kohdennetut sivut, raakadata, lataukset ja historialliset mallit täydentävät sitä.

Vanhat toimivat osoitteet ja olennaiset ankkurit säilytetään mahdollisuuksien mukaan yhteensopivuusreiteillä tai legacy-ankkureilla.

## 10. Mikä on vakio ja mikä saa muuttua

### Vakio

Seuraavat kuuluvat Symetra-malliin ja muuttuvat vain perustellulla standardipäivityksellä:

- selitä ennen mittaamista;
- kohde-, aika- ja käsiterajan näkyvyys;
- evidenssitilojen erottelu;
- lähdeketjun jäljitettävyys;
- kanoninen raportti ensisijaisena lukureittinä;
- hillitty visuaalinen järjestelmä;
- havaintojen ja tulkintojen erottaminen;
- puuttuvan tiedon näyttäminen;
- versiointi, changelog ja toistettavat laskelmat;
- automaattinen preflight ennen julkaisua.

### Analyysikohtainen

Seuraavat saavat muuttua tutkimuskysymyksen mukaan:

- kohteet ja verrokit;
- vaikutusalueiden järjestys;
- mittarit ja baseline-arvot;
- lähdetyypit;
- analyysin laajuus;
- tarvittavat liitteet;
- toimialakohtaiset käsitteet;
- Symetrixin soveltuvat rivit.
- valittu symetoinnin nimittäjä, kun tutkimuskysymys sitä perustelee.
- syntrauksessa syntyvät hypoteesit, rabbit holet ja uudet tutkimushaarat.

## 11. AI-driftin estäminen

AI-avusteinen kehitys saa nopeuttaa työtä, mutta ei määritellä julkaisumallia uudelleen jokaisessa työjaksossa.

Siksi tulevien mallien pitää noudattaa seuraavia sääntöjä:

1. **Älä rakenna julkaisua alusta uudelleen**, jos nykyinen rakenne pystyy esittämään uuden analyysin.
2. **Älä nimeä evidenssitiloja uudelleen** ilman standardin päivitystä.
3. **Älä yhdistä eri boundaryja** vain saadaksesi täydemmän taulukon.
4. **Älä korvaa kysymysmerkkiä arviolla** ilman näkyvää E-, P- tai S-merkintää ja perustetta.
5. **Älä muuta Symetrixin pistefilosofiaa** hiljaisesti.
6. **Älä symetoi yhteensopimattomia boundaryja** vain saadaksesi vertailuluvun; tee kartoitus näkyväksi tai jätä mittari avoimeksi.
7. **Älä lisää yhteispisteitä, rankingia tai normatiivista paras-tulkintaa** olemassa olevien mittareiden päälle.
8. **Älä muuta visuaalista järjestelmää** yksittäisen analyysin vuoksi.
9. **Älä poista vanhaa toimivaa lähde- tai laskentapolkua**, ellei korvaava polku ole testattu.
10. **Älä muuta julkaistua lukua ilman changelog-merkintää**, jos muutos vaikuttaa tulkintaan.
11. **Älä käsittele syntrauksessa syntyvää hypoteesia havaintona tai johtopäätöksenä** ennen evidenssi- ja boundary-porttia.
12. **Jos uusi tutkimustarve ei sovi standardiin, muuta standardia tietoisesti ensin** — älä tee poikkeusta piilossa.

## 12. Julkaisukynnys

Ennen mergeä main-haaraan uuden tai olennaisesti muuttuneen analyysin pitää täyttää vähintään:

- tutkimuskysymys on näkyvä;
- kohde- ja aikarajat on avattu;
- keskeisten lukujen evidenssitilat ovat oikein;
- lähteet ja laskentaketju ovat jäljitettävissä;
- avoimet tiedot on nimetty;
- johtopäätökset eivät ylitä näyttöä;
- kanoninen raportti ja olennaiset ankkurit rakentuvat;
- npm run preflight menee läpi;
- projektipolku ja juuripolku rakentuvat;
- mobiili- ja tulostuskäyttö eivät rikkoudu olennaisesti.

## 13. Standardin muuttaminen

Tätä tiedostoa käsitellään julkaisujärjestelmän osana, ei vapaana muistiinpanona.

Merkittävä muutos tehdään omassa commitissa tai PR:ssä ja sen syy kirjataan. Jos analyysikohtainen tarve ja tämä standardi ovat ristiriidassa, ristiriita ratkaistaan näkyvästi ennen julkaisua.

Tavoite ei ole jäykkyys. Tavoite on se, että Symetra voi tuottaa uusia analyysejä nopeasti **ilman että luotettavuus, luettavuus tai identiteetti rakennetaan joka kerta uudelleen**.
