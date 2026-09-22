---
title: Mitä datakeskus tekee ja miten sitä verrataan?
slug: vertailu
route: /analyysit/datakeskukset/vertailu/
language: fi
status: ready
published: false
updated: 2026-09-22
description: Ensin avataan datakeskuksen taloudellinen toimintamalli ja Haminan laskentarajat. Vasta sen jälkeen verrataan muita kohteita.
layout: article
---
Vertailu ei ala neljän kohteen rinnastamisesta. Ensin on ymmärrettävä yksi kohde riittävän hyvin, jotta tiedetään **mitä suureita ylipäätään voidaan verrata**. Tässä julkaisussa ensimmäinen pääcase on Hamina: sen kautta erotetaan konserni, suomalainen yhtiö, fyysinen kampus ja Suomeen syntyvä yhteiskunnallinen vaikutus. Vasta tämän jälkeen mukaan tuodaan Hepokorpi, Kemi ja Kemi–Tornio.

## Mitä datakeskus taloudellisesti tekee?

Valmistavassa teollisuudessa tuotteen seuraaminen on usein konkreettista: raaka-aine tulee tehtaalle ja valmis tuote lähtee ulos. Datakeskuksessa arvoketju on vaikeampi nähdä, koska fyysisen laitoksen tehtävä on tuottaa ja ylläpitää **laskenta-, tallennus- ja verkkokapasiteettia**, jota käytetään osana digitaalisia palveluja.

Yksinkertaistettu toimintaketju on:

**sähkö + sähköverkko + maa ja rakennukset + palvelimet ja verkkolaitteet + työ ja palvelut → datakeskusoperaatio → käyttökelpoinen laskenta- ja tallennuskapasiteetti → Googlen digitaaliset palvelut**

Google julkaisee myös markkinahintoja pilvilaskennan resursseille, mikä havainnollistaa sitä, että laskentakapasiteetilla on palvelumarkkinassa rahallinen arvo. Tämä ei kuitenkaan osoita, että Haminan kapasiteetti myytäisiin juuri näillä tuotteilla tai että loppuasiakkaan maksama hinta kirjautuisi Tuike Finland Oy:n liikevaihdoksi. [Google Cloud](https://cloud.google.com/products/compute/pricing).

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

Googlen omassa konserniyhtiöiden alihankkijaluettelossa Tuike Finland Oy on merkitty Google Group Subprocessor -toimijaksi. Sen tehtäväksi on ilmoitettu **Data Center Operations** Suomessa ja osoitteeksi Ensontie 1, Hamina. Samassa lähteessä todetaan, että luettelon Google Group Subprocessors -yhtiöiden ylin emoyhtiö on Google LLC, joka kuuluu Alphabet Inc:iin. [Google](https://workspace.google.com/terms/subprocessors-20260302/).

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

**Lähde ja havaintojakso:** Googlen konsernirakennetta kuvaava lähde, Tuike Finland Oy:n vuoden 2025 yritystiedot Proffissa ja Profinderissa sekä Haminan kaupungin 22.6.2026 tiedote. [Proff: Tuike Finland Oy](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG), [Profinder: Tuike Finland Oy](https://b2b.profinder.fi/haku/tuike-finland-oy/22060717), [Haminan kaupunki 22.6.2026](https://www.hamina.fi/haminan-datakeskuksen-vaikutukset-tutkimuskohteena-osallistu-sinakin/), [Google Workspace: Google Group Subprocessors, 2.3.2026](https://workspace.google.com/terms/subprocessors-20260302/).

**Mitä lähteet osoittavat:** Google nimeää Tuike Finland Oy:n Suomessa datakeskusoperaatioita hoitavaksi konsernitoimijaksi. Yritystietopalvelut ilmoittavat Tuiken vuoden 2025 liikevaihdoksi 574,374 M€, käyttökatteeksi 60,0 % ja henkilöstöksi 120. Haminan kaupunki puolestaan ilmoittaa kampuksella työskentelevän noin 500 henkilöä.

**Mitä ne eivät osoita:** Tuiken liikevaihto ei ole sama asia kuin Suomessa syntyvä yhteiskunnallinen nettohyöty eikä kampuksen noin 500 henkilöä ole Tuiken henkilötyövuosien määrä. Yritystietopalvelut ovat toissijaisia lähteitä, joiden riippumattomuutta toisistaan ei ole varmistettu. Julkisesta aineistosta ei tässä vaiheessa myöskään rakenneta oletusta siitä, miten Google-konsernin sisäinen laskutus jakaa laskentapalvelujen tuotot eri oikeushenkilöille.

**Vertailukelpoisuus:** yrityksen henkilöstölukua verrataan saman rajauksen henkilöstölukuun. Vuoden 2025 ja kesäkuun 2026 lukujen erotusta ei tulkita alihankkijoiden määräksi. Yhtiön talous, kampuksen toiminta ja konsernin asiakasmyynti käsitellään eri tasoina.

**Avoin tieto:** Tuiken alkuperäinen tilinpäätös liitetietoineen, konsernin sisäisten liiketoimien merkitys, kampuksen saman vuoden henkilötyövuodet, energia sekä hankintojen kotimaiset arvonlisäosuudet. [Laskelmat](/analyysit/datakeskukset/lahteet/#laskelmat).


## Miksi juuri nämä verrokit?

Hepokorpi, Kemi ja Kemi–Tornio eivät ole kolme satunnaista rinnakkaista casea. Jokainen niistä ratkaisee yhden Haminassa esiin nousseen vertailuongelman:

| Kohde | Miksi se on mukana? | Keskeinen avoin tieto |
|---|---|---|
| Google / Tuike, Hamina | Toimiva datakeskus näyttää yhtiön, kampuksen ja paikallisen vaikutuksen rajat | Saman vuoden kampuskohtainen energia, työpanos ja kotimainen arvonlisä |
| Microsoft HEL16, Hepokorpi | Tuleva datakeskus näyttää eron suunnitelman, luvan ja toteuman välillä | Käyttöönotto, toteutuneet energia- ja vesivirrat sekä tarkkailu |
| Metsä Fibre, Kemi | Energiaintensiivinen tehdas testaa, miten oma sähköntuotanto muuttaa vertailua | Toteutunut vuosikohtainen nettoenergia ja samoilla rajauksilla lasketut talousvaikutukset |
| Outokumpu, Kemi–Tornio | Segmenttiraportointi testaa, miten konsernin sisäiset virrat ja toimipaikkarajat vaikuttavat lukuihin | Suomen toimipaikkojen ja konsernin sisäisten virtojen erittely; erillinen terästuotannon vertailu |

Taulukon pohjana ovat [Proff: Tuike Finland Oy](https://www.proff.fi/yrityksen/tuike-finland-oy/hamina/it-alan-k%C3%A4ytt%C3%B6-ja-tukipalvelut/2206071-7I0ZDG), [Profinder: Tuike Finland Oy](https://b2b.profinder.fi/haku/tuike-finland-oy/22060717), [Haminan kaupunki 22.6.2026](https://www.hamina.fi/haminan-datakeskuksen-vaikutukset-tutkimuskohteena-osallistu-sinakin/), [HEL16](https://ytietopalvelu.lvv.fi/fi-FI/asia/3032711) sekä [Metsä Fibre: Kemin biotuotetehtaan kohdekuvaus](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/), [Metsä Group: Kemin biotuotetehtaan avajaiset, 23.10.2024](https://www.metsagroup.com/news-and-publications/news/2024/metsa-group-kemi-bioproduct-mill-inaugurated/), [Outokumpu: Annual Report 2025, s. 170](https://www.outokumpu.com/-/media/files/investors/annual-reports/annual-report-2025/outokumpu_annual_report_2025_a4.pdf?hash=A9F7D1F6309A51EC70DC676A8907E46B&modified=20260227103807&revision=549bc02d-644c-4edb-b7bc-20b85245380b), [Outokumpu: Ferrochrome-liiketoiminta-alue](https://www.outokumpu.com/fi-fi/about/organization/ferrochrome).

## Hepokorpi: tuleva keskus ei ole vielä toteutunut keskus

Hamina antaa tietoa toiminnassa olevasta datakeskuksesta. Hepokorpi tuo mukaan toisen tilanteen: **mitä voidaan päätellä hankkeesta ennen kuin käyttö on vakiintunut?**

HEL16:n hakemus, täydennykset ja ympäristölupa kuvaavat suunniteltua toimintaa ja sen ehtoja. Lupapäätös sisältää muun muassa varavoimaa, polttoainevarastointia, vettä, melua, riskejä ja tarkkailua koskevia määräyksiä. Päätöksen hakemuskuvauksessa aloitusajaksi esitetään marraskuu 2026. [Ympäristölupahakemuksen selostus, 9.12.2024](https://ytietopalvelu.lvv.fi/fi-FI/asia/3032711), [Tarkennus ja täydennys, 27.1.2025](https://ytietopalvelu.lvv.fi/fi-FI/asia/3032711), [Päätös 302/2025, 7.10.2025](https://ytietopalvelu.lvv.fi/fi-FI/asia/3032711).

Näistä asiakirjoista ei kuitenkaan saada vielä käyttövuoden sähköä, vettä, melua tai henkilöstöä. Esimerkiksi varavoiman noin 161 MW on polttoainetehoa, ei datakeskuksen mitattu verkkosähkön ottoteho.

Hepokorven tehtävä vertailussa on siksi näyttää, että **suunnitelma, luvan sallima raja, rakennettu kapasiteetti ja toteutunut käyttö ovat neljä eri näyttötasoa**. Käytössä olevan tehtaan vuosimittausta ei verrata suoraan datakeskuksen lupahakemuksen nimellisarvoon.

Avoimeksi jäävät käyttöönotto, myöhemmät päätösmuutokset, toteutuneet energia- ja vesivirrat sekä tarkkailutulokset. [Ympäristövaikutukset](/analyysit/datakeskukset/vaikutukset/#ymparisto-lupa-kertoo-ehdoista-ei-toteutuneesta-vaikutuksesta).

## Kemi: oma sähköntuotanto muuttaa koko energiavertailun

Kemin biotuotetehdas tuli mukaan, kun kävi selväksi, ettei energiaintensiivisiä laitoksia voi verrata pelkän “paljonko sähköä käytetään” -kysymyksen avulla.

Metsä Fibren nykyinen kohdekuvaus ilmoittaa henkilöstöksi 300, vuotuisen sähköntuotannon kuvaukseksi 2,0 TWh ja sähkön omavaraisuudeksi 250 %. Vuoden 2024 avaamistiedote ilmoitti tehtaalle noin 250 ja koko tehdasalueelle noin 500 henkilöä. [Metsä Fibre: Kemin biotuotetehtaan kohdekuvaus](https://www.metsagroup.com/metsafibre/about-metsafibre/pulp-production/kemi-bioproduct-mill/), [Metsä Group: Kemin biotuotetehtaan avajaiset, 23.10.2024](https://www.metsagroup.com/news-and-publications/news/2024/metsa-group-kemi-bioproduct-mill-inaugurated/).

Tämä tekee näkyväksi yhden ratkaisevan eron: tehdas voi olla samaan aikaan suuri energiankäyttäjä ja sähkön nettotuottaja. Datakeskuksen verkkosähkön ottoa ei siksi voi verrata sellutehtaan kokonaissähköntuotantoon tai -kulutukseen yhdellä luvulla.

Tarvitaan erikseen **oma tuotanto, oma kulutus, verkosta otto ja verkkoon vienti**. Vasta niiden jälkeen voidaan muodostaa yhteinen energiatase. Sama pätee työllisyyteen: tehtaan henkilöstö, koko tehdasalueen työjoukko ja koko arvoketjun työvaikutus eivät ole sama mittari.

Avoimeksi jäävät valitun vertailuvuoden mitattu nettoenergia, työpanos ja tehdaskohtainen arvonlisä samoilla rajauksilla kuin datakeskuksissa.

## Kemi–Tornio: konsernin segmentti opettaa saman ongelman kuin Tuike

Outokumpu tuli mukaan, kun auditissa haluttiin verrata datakeskuksen taloudellista rakennetta perinteiseen, energiaintensiiviseen teollisuuteen. Samalla vastaan tuli tuttu ongelma: **mikä organisaatiotaso oikeastaan tuottaa tarkasteltavan luvun?**

Outokummun vuoden 2025 vuosikertomuksessa Ferrochrome-segmentin myynti oli 462 M€, josta ulkoista myyntiä 217 M€ ja konsernin sisäistä 245 M€. Käyttökate oli 137 M€ ja vuoden lopun henkilöstö 454 henkilötyövuotta. Toimintakuvaus yhdistää Kemin kaivoksen Tornion ferrokromituotantoon. [Outokumpu: Annual Report 2025, s. 170](https://www.outokumpu.com/-/media/files/investors/annual-reports/annual-report-2025/outokumpu_annual_report_2025_a4.pdf?hash=A9F7D1F6309A51EC70DC676A8907E46B&modified=20260227103807&revision=549bc02d-644c-4edb-b7bc-20b85245380b), [Outokumpu: Ferrochrome-liiketoiminta-alue](https://www.outokumpu.com/fi-fi/about/organization/ferrochrome).

Tässä 462 M€ ei siis ole sama asia kuin ulkopuolisilta asiakkailta saatu 462 M€:n myynti. Lähes puolet ilmoitetusta myynnistä on segmentin sisäistä myyntiä muille konsernin osille. Tämä on vertailulle arvokas havainto juuri siksi, että myös Tuiken kohdalla konsernin sisäisten liiketoimien merkitys on avoin.

Outokumpu näyttää samalla, miksi **oikeushenkilö, tehdas, liiketoimintasegmentti ja konserni** on pidettävä erillään. Ferrochrome-segmentti ei kata kaikkea Tornion ruostumattoman teräksen tuotantoa, eikä vuoden lopun FTE ole suoraan sama asia kuin vuoden keskimääräinen henkilöstömäärä.

Avoimeksi jäävät yhteinen kohde- ja vuosirajaus Tuiken kanssa, toimipaikkakohtainen sähkö ja arvonlisä sekä Suomen ja konsernin sisäisten rahavirtojen tarkempi erittely.

## Mitä vertailusta voidaan tässä vaiheessa päätellä?

Neljän kohteen tärkein yhteinen havainto ei ole vielä se, kumpi toimiala “tuottaa enemmän”, vaan se, **kuinka helposti väärä laskentaraja tuottaa näennäisesti tarkan mutta väärän vertailun**.

Hamina opettaa erottamaan konsernin, yhtiön ja kampuksen. Hepokorpi erottaa suunnitelman toteumasta. Kemi erottaa energiankulutuksen nettotaseesta. Outokumpu erottaa segmentin ulkoisen myynnin konsernin sisäisestä myynnistä.

Siksi lähteiden nykyiset luvut auttavat kuvaamaan kohteita, mutta eivät vielä muodosta yhtä yhteistä tehokkuus- tai nettohyötymittaria.

> **Vertailun rajaus.** Tässä julkaisussa ei muodosteta toimialojen paremmuusjärjestystä. Puuttuvat energia-, arvonlisä-, kustannus- ja vaihtoehtotiedot estävät yhden luotettavan nettohyötyluvun. Valmistavan teollisuuden kohteita ei myöskään ole ympäristöauditoitu yhtä kattavasti kuin HEL16:n lupa-aineistoa.

## Mitä yhteismitallinen jatkovertailu vielä tarvitsee?

| Mittari | Yhteinen määritelmä | Miksi tarvitaan? |
|---|---|---|
| Työpanos | Operoinnin FTE samalla vuodella ja samalla työnantajarajalla | Erotetaan henkilömäärä, työpanos ja rakentaminen |
| Sähkö | Vuoden mitattu verkosta otto, verkkoon vienti ja oma tuotanto, MWh | Erotetaan energia, nimellisteho ja nettotase |
| Arvonlisä | Tuotoksen ja välituotekäytön erotus samalla rajalla | Vältetään liikevaihdon ja ostojen päällekkäisyys |
| Julkistalous | Kohdistettavat tulot ja menot sekä investointien ajallinen käsittely | Verotulo ei yksin ole nettohyöty |
| Ympäristö | Toteutuneet paikalliset vaikutukset ja yhteinen elinkaariraja | Lupa tai tekniikkakuvaus ei korvaa seurantaa |
| Vaihtoehto | Toteuttamiskelpoinen vertailutilanne samalle resurssille | Teoreettinen hanke ei todista syrjäytettyä investointia |

Tämä tietotarvelista on samalla Symetran seuraava mittarikerros: vasta kun yhteiset määritelmät ovat saatavissa, voidaan laskea esimerkiksi työ-, vero- tai arvonlisäintensiteettejä ilman että eri organisaatio- ja aikarajat sekoittuvat.
