---
title: Kohteet ja vertailun rajat
slug: vertailu
route: /analyysit/datakeskukset/vertailu/
language: fi
status: ready
published: false
updated: 2026-09-22
description: Sama tunnusluku ei vielä tarkoita samaa mittaria. Vertailu alkaa kohteesta, ajanjaksosta ja laskentarajasta.
layout: article
---
Vertailu ei ala neljän kohteen rinnastamisesta. Ensin on ymmärrettävä yksi kohde riittävän hyvin, jotta tiedetään **mitä suureita ylipäätään voidaan verrata**. Tässä julkaisussa ensimmäinen pääcase on Hamina: sen kautta erotetaan konserni, suomalainen yhtiö, fyysinen kampus ja Suomeen syntyvä yhteiskunnallinen vaikutus. Vasta tämän jälkeen mukaan tuodaan Hepokorpi, Kemi ja Kemi–Tornio.

## Mitä datakeskus taloudellisesti tekee?

Valmistavassa teollisuudessa tuotteen seuraaminen on usein konkreettista: raaka-aine tulee tehtaalle ja valmis tuote lähtee ulos. Datakeskuksessa arvoketju on vaikeampi nähdä, koska fyysisen laitoksen tehtävä on tuottaa ja ylläpitää **laskenta-, tallennus- ja verkkokapasiteettia**, jota käytetään osana digitaalisia palveluja.

Yksinkertaistettu toimintaketju on:

**sähkö + sähköverkko + maa ja rakennukset + palvelimet ja verkkolaitteet + työ ja palvelut → datakeskusoperaatio → käyttökelpoinen laskenta- ja tallennuskapasiteetti → Googlen digitaaliset palvelut**

Google julkaisee myös markkinahintoja pilvilaskennan resursseille, mikä havainnollistaa sitä, että laskentakapasiteetilla on palvelumarkkinassa rahallinen arvo. Tämä ei kuitenkaan osoita, että Haminan kapasiteetti myytäisiin juuri näillä tuotteilla tai että loppuasiakkaan maksama hinta kirjautuisi Tuike Finland Oy:n liikevaihdoksi. [Google Cloud S066](/analyysit/datakeskukset/lahteet/#S066).

Taloudellisen vaikutuksen kannalta ketjussa on siksi kaksi eri kysymystä:

1. **Minkä arvoista digitaalista palvelua fyysisen datakeskuksen avulla tuotetaan?**
2. **Kuinka suuri osa tämän arvoketjun tuloista, palkoista, ostoista ja veroista syntyy tai jää Suomeen?**

Tämä auditointi pystyy tällä hetkellä vastaamaan jälkimmäiseen vain osittain. Julkisista lähteistä nähdään suomalaisen Tuike Finland Oy:n tunnuslukuja, Haminan kampusta koskevia tietoja sekä joitakin paikallisia vero- ja investointivirtoja. Sen sijaan käytössä ei ole sellaista konsernin sisäisten liiketoimien erittelyä, jolla Haminassa tuotettu laskentakapasiteetti voitaisiin luotettavasti yhdistää Googlen loppuasiakasmyyntiin.

### Miksi Tuiken 574 miljoonan euron liikevaihto ei vielä vastaa kysymykseen?

Tuike Finland Oy:n vuoden 2025 liikevaihto on julkisissa yritystietopalveluissa 574,374 M€. Se on tärkeä havainto, koska se kertoo suomalaisen oikeushenkilön läpi kulkevasta suuresta liiketoiminnan volyymista. Mutta ennen yhteiskunnallisen hyödyn arviointia pitäisi tietää ainakin:

- mistä Tuiken liikevaihto koostuu ja kuinka suuri osa liiketoimista on konsernin sisäisiä;
- kuinka paljon toimintaan liittyy Suomessa ostettuja tavaroita ja palveluja;
- paljonko Suomessa syntyy palkkoja ja muuta arvonlisää;
- mitä veroja syntyy millekin julkisen talouden tasolle;
- mitä pääoma- ja omistajatuloja siirtyy Suomen ulkopuolelle tai Suomeen;
- mitä resursseja ja julkisia investointeja toiminta samalla sitoo.

Siksi tässä julkaisussa **liikevaihto on tuotanto- ja rahavirran mittari, ei yhteiskunnallisen nettohyödyn mittari**. Sama sääntö koskee myös valmistavan teollisuuden verrokkeja.

## Hamina: ensin on ymmärrettävä, mikä Tuike Finland Oy on

Haminan datakeskus tunnetaan Googlen datakeskuksena, mutta talouslukuja tarkasteltaessa vastaan tulee nimi **Tuike Finland Oy**. Tämä ei tarkoita, että analyysi vaihtaisi kohdetta kesken kaiken. Google-brändi, Google-konserni, suomalainen oikeushenkilö ja Haminan fyysinen kampus ovat saman kokonaisuuden eri tarkastelutasoja.

Googlen omassa konserniyhtiöiden alihankkijaluettelossa Tuike Finland Oy on merkitty Google Group Subprocessor -toimijaksi. Sen tehtäväksi on ilmoitettu **Data Center Operations** Suomessa ja osoitteeksi Ensontie 1, Hamina. Samassa lähteessä todetaan, että luettelon Google Group Subprocessors -yhtiöiden ylin emoyhtiö on Google LLC, joka kuuluu Alphabet Inc:iin. [Google S072](/analyysit/datakeskukset/lahteet/#S072).

Tämän vuoksi julkaisussa erotetaan neljä tasoa:

| Taso | Mitä sillä tarkoitetaan tässä julkaisussa? | Esimerkki tiedosta |
|---|---|---|
| Alphabet / Google-konserni | Kansainvälinen konsernikokonaisuus | Konsernin omistus- ja palvelurakenne |
| Tuike Finland Oy | Suomessa toimiva oikeushenkilö, jonka Google nimeää datakeskusoperaatioiden toimijaksi | Yhtiön liikevaihto, tulos ja oma henkilöstö |
| Haminan kampus | Fyysinen datakeskusalue ja siellä tehtävä työ | Kampuksella työskentelevien henkilöiden määrä |
| Suomessa syntyvä yhteiskunnallinen vaikutus | Yhtiö- ja kampuslukujen lisäksi verot, kotimaiset ostot, palkat, julkiset kustannukset ja muut vaikutukset | Tämän auditoinnin varsinainen arviointikohde |

Näitä tasoja ei saa sekoittaa. Tuiken liikevaihdosta ei voida ilman erillistä näyttöä päätellä Googlen Haminassa tuotetun laskentapalvelun koko markkina-arvoa, koko Google-konsernin Suomessa syntyvää liikevaihtoa tai Suomeen jäävää nettohyötyä. Samoin kampuksella työskentelevien henkilöiden määrä ei ole sama asia kuin Tuike Finland Oy:n oma henkilöstömäärä.

### Mitä julkisista luvuista voidaan tämän jälkeen havaita?

**Tutkimuskysymys:** mitä Googlen Haminan toiminnan taloudesta voidaan havaita, kun yhtiö ja kampus pidetään erillään?

**Lähde ja havaintojakso:** Googlen konsernirakennetta kuvaava lähde, Tuike Finland Oy:n vuoden 2025 yritystiedot Proffissa ja Profinderissa sekä Haminan kaupungin 22.6.2026 tiedote. [S001–S003](/analyysit/datakeskukset/lahteet/#S001), [S072](/analyysit/datakeskukset/lahteet/#S072).

**Mitä lähteet osoittavat:** Google nimeää Tuike Finland Oy:n Suomessa datakeskusoperaatioita hoitavaksi konsernitoimijaksi. Yritystietopalvelut ilmoittavat Tuiken vuoden 2025 liikevaihdoksi 574,374 M€, käyttökatteeksi 60,0 % ja henkilöstöksi 120. Haminan kaupunki puolestaan ilmoittaa kampuksella työskentelevän noin 500 henkilöä.

**Mitä ne eivät osoita:** Tuiken liikevaihto ei ole sama asia kuin Suomessa syntyvä yhteiskunnallinen nettohyöty eikä kampuksen noin 500 henkilöä ole Tuiken henkilötyövuosien määrä. Yritystietopalvelut ovat toissijaisia lähteitä, joiden riippumattomuutta toisistaan ei ole varmistettu. Julkisesta aineistosta ei tässä vaiheessa myöskään rakenneta oletusta siitä, miten Google-konsernin sisäinen laskutus jakaa laskentapalvelujen tuotot eri oikeushenkilöille.

**Vertailukelpoisuus:** yrityksen henkilöstölukua verrataan saman rajauksen henkilöstölukuun. Vuoden 2025 ja kesäkuun 2026 lukujen erotusta ei tulkita alihankkijoiden määräksi. Yhtiön talous, kampuksen toiminta ja konsernin asiakasmyynti käsitellään eri tasoina.

**Avoin tieto:** Tuiken alkuperäinen tilinpäätös liitetietoineen, konsernin sisäisten liiketoimien merkitys, kampuksen saman vuoden henkilötyövuodet, energia sekä hankintojen kotimaiset arvonlisäosuudet. [Laskelmat](/analyysit/datakeskukset/lahteet/#laskelmat).


## Neljä kohdetta, eri lähtökohdat

| Kohde | Tarkasteluraja | Keskeinen avoin tieto |
|---|---|---|
| Google / Tuike, Hamina | Suomen oikeushenkilön talous 2025 ja erikseen kampuksen tiedot 2026 | Saman vuoden kampuskohtainen energia, työpanos ja kotimainen arvonlisä |
| Microsoft HEL16, Hepokorpi | HEL16:n hakemus ja ympäristölupa 302/2025 | Käyttöönotto, toteutuneet energia- ja vesivirrat sekä tarkkailu |
| Metsä Fibre, Kemi | Biotuotetehdas; yrityksen kohdekuvaus ja 2024 avaamistiedote | Toteutunut vuosikohtainen nettoenergia ja samoilla rajauksilla lasketut talousvaikutukset |
| Outokumpu, Kemi–Tornio | Ferrochrome-liiketoiminta-alue 2025; kaivos ja ferrokromituotanto | Suomen toimipaikkojen ja konsernin sisäisten virtojen erittely; erillinen terästuotannon vertailu |

Taulukon pohjana ovat [Tuike ja Hamina S001–S003](/analyysit/datakeskukset/lahteet/#S001), [HEL16 D08](/analyysit/datakeskukset/lahteet/#D08) sekä [teollisuuslähteet S068–S071](/analyysit/datakeskukset/lahteet/#S068).

## Mitä vertailusta voidaan päätellä?

Lähteet käyttävät yritys-, alue- ja liiketoimintarajoja sekä eri havaintojaksoja. Niiden luvut auttavat kuvaamaan kohteita, mutta eivät sellaisinaan muodosta yhteistä tehokkuusmittaria. Tämä on aineiston rakenteesta tehty menetelmäpäätelmä.

> **Vertailun rajaus.** Tässä julkaisussa ei esitetä toimialojen paremmuusjärjestystä. Puuttuvat energia-, kustannus- ja vaihtoehtotiedot estävät yhden luotettavan nettohyötyluvun. Valmistavan teollisuuden kohteita ei ole ympäristöauditoitu yhtä kattavasti kuin HEL16:n lupa-aineistoa.

## Hepokorpi: HEL16 ei ole koko kampus

**Tutkimuskysymys:** mitä HEL16:n toiminnasta ja sen ympäristöehdoista tiedetään ennen varmennettua käyttötoteumaa?

**Lähde ja havaintojakso:** hakemus 9.12.2024, täydennys 27.1.2025 ja päätös 302/2025, 7.10.2025. [D01, D04 ja D08](/analyysit/datakeskukset/lahteet/#D01).

**Mitä lähde osoittaa:** lupa koskee HEL16:n varavoimaa ja polttoainevarastointia sekä sisältää melu-, vesi-, riski- ja tarkkailuehtoja. Päätöksen hakemuskuvauksessa aloitusajaksi esitetään marraskuu 2026 (s. 34). Varavoiman noin 161 MW on polttoainetehoa, ei verkkosähkön ottotehoa.

**Mitä se ei osoita:** todellista käyttöönottoa, kampuksen keskimääräistä sähkötehoa, kaikkien tulevien rakennusten toteutusta tai vuoden 2026 lainvoimaisuustilannetta.

**Vertailukelpoisuus:** suunnittelu- ja lupatietoja verrataan vastaavan vaiheen tietoihin. Ne eivät ole samaa näyttöä kuin käytössä olevan tehtaan vuosimittaukset.

**Avoin tieto:** myöhemmät päätösmuutokset, käyttöönotto ja sen jälkeen syntyvät tarkkailutiedot. [Ympäristövaikutukset](/analyysit/datakeskukset/vaikutukset/#ymparisto).

## Kemi: sähköntuotanto kuuluu vertailuun

**Tutkimuskysymys:** miten biotuotetehtaan työ ja energiavirrat eroavat datakeskuksen vertailurajasta?

**Lähde ja havaintojakso:** Metsä Fibren kohdesivu, luettu 22.9.2026, sekä Metsä Groupin avaamistiedote 23.10.2024. [S068–S069](/analyysit/datakeskukset/lahteet/#S068).

**Mitä lähde osoittaa:** nykyinen kohdesivu ilmoittaa henkilöstöksi 300 ja sähkön omavaraisuudeksi 250 %; vuotuisen tuotannon kuvaukseksi annetaan 2,0 TWh. Vuoden 2024 tiedote ilmoitti tehtaalle noin 250 ja koko tehdasalueelle noin 500 henkilöä.

**Mitä se ei osoita:** kohdesivun luvut eivät ole tässä luettu tietyn kalenterivuoden mittaussarja. Eri ajankohtien henkilöstöluvut eivät yksin osoita uusien työpaikkojen nettomäärää. Yrityksen vaikutusarviot eivät ole riippumattomasti toistettuja kansantalouslaskelmia.

**Vertailukelpoisuus:** oma sähköntuotanto, oma kulutus, verkkoon myynti ja verkosta otto tarvitaan erikseen. Nettotuottajan kokonaissähköä ei rinnasteta datakeskuksen verkkosähkön ottoon. Tämä tulkinta seuraa ilmoitetusta tuotantorakenteesta.

**Avoin tieto:** valitun vertailuvuoden mitattu energia, työpanos ja tehdaskohtainen arvonlisä. Koko arvoketjun työllisyys ei korvaa tehtaan henkilöstömittaria.

## Kemi–Tornio: segmentti ei ole yksittäinen tehdas

**Tutkimuskysymys:** mitä Outokummun Ferrochrome-segmentin talousluvut kertovat valmistavan teollisuuden vertailusta?

**Lähde ja havaintojakso:** Outokummun vuosikertomus 2025, painettu s. 170, sekä liiketoiminta-alueen kuvaus. [S070–S071](/analyysit/datakeskukset/lahteet/#S070).

**Mitä lähde osoittaa:** segmentin vuoden 2025 myynti oli 462 M€, josta ulkoista 217 M€ ja sisäistä 245 M€. Käyttökate oli 137 M€; oikaistu käyttökate 138 M€ on eri tunnusluku. Vuoden lopun henkilöstö oli 454 henkilötyövuotta (FTE). Toimintakuvaus yhdistää Kemin kaivoksen Tornion ferrokromituotantoon.

**Mitä se ei osoita:** 462 M€ ei ole kokonaan konsernin ulkoista myyntiä eikä Suomen nettotulo. Segmentti ei kata kaikkea Tornion ruostumattoman teräksen tuotantoa.

**Vertailukelpoisuus:** oikeushenkilö, tehdas, liiketoiminta-alue ja konserni erotetaan. Tilinpäätöksen vuoden lopun FTE ei ole suoraan sama mittari kuin vuoden keskimääräinen henkilöluku.

**Avoin tieto:** yhteinen kohde- ja vuosirajaus Tuiken kanssa sekä sähkö-, arvonlisä- ja omistajatulojen erittely. Omistuksen kansallisuus ei sellaisenaan ratkaise tulovirtojen kohdentumista.

## Yhteismitallisen jatkovertailun tietotarve

| Mittari | Yhteinen määritelmä | Miksi tarvitaan? |
|---|---|---|
| Työpanos | Operoinnin FTE samalla vuodella ja samalla työnantajarajalla | Erotetaan henkilömäärä, työpanos ja rakentaminen |
| Sähkö | Vuoden mitattu verkosta otto, verkkoon vienti ja oma tuotanto, MWh | Erotetaan energia, nimellisteho ja nettotase |
| Arvonlisä | Tuotoksen ja välituotekäytön erotus samalla rajalla | Vältetään liikevaihdon ja ostojen päällekkäisyys |
| Julkistalous | Kohdistettavat tulot ja menot sekä investointien ajallinen käsittely | Verotulo ei yksin ole nettohyöty |
| Ympäristö | Toteutuneet paikalliset vaikutukset ja yhteinen elinkaariraja | Lupa tai tekniikkakuvaus ei korvaa seurantaa |
| Vaihtoehto | Toteuttamiskelpoinen vertailutilanne samalle resurssille | Teoreettinen hanke ei todista syrjäytettyä investointia |
