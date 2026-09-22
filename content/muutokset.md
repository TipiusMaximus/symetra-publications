---
title: Versiot ja korjaukset
slug: muutokset
route: /muutokset/
language: fi
status: ready
published: false
updated: 2026-09-22
description: Mitä analyysissä on muuttunut, milloin ja miksi. Julkaisun kehityshistoria säilyy lukijan nähtävissä.
layout: standalone
---
## 1.2.0-rc.1 — raporttivetoinen julkaisukandidaatti 22.9.2026

Pitkä raportti on nyt julkaisun ensisijainen lukureitti osoitteessa `/analyysit/datakeskukset/`. Orientaatio, esipuhe, tutkimuskysymys, varsinainen analyysi, A01–A11-väiteauditointi, johtopäätökset ja menetelmä tuotetaan yhdestä järjestetystä sisältömanifestista.

Yhteensopivuusosoite `/analyysit/datakeskukset/raportti/` käyttää samaa runkosisältöä ja osoittaa canonical-metatiedolla pääraporttiin. Kohdennetut vaikutus- ja vertailunäkymät säilyvät, mutta eivät kuulu ensisijaiseen navigaatioon. Markdown-lataus ja tulostusversio sisältävät täydellisen lähdeliitteen.

Tekijäksi on merkitty Symetra organisaationa. Julkaisu sisältää näkyvät versio-, julkaisu-, päivitys- ja aineistopäivät sekä Article-JSON-LD:n. Julkaisuportti pysyy suljettuna selain- ja PDF-tarkistuksen hyväksyntään asti.

## 1.1.0 — rakenneuudistus, luonnos 22.9.2026

Julkaisun pääkertomus rakennetaan uudelleen tutkimuksen etenemisreitin mukaiseksi. Periaate on **selitä ennen kuin mittaat**: toimija, fyysinen kohde, ajanjakso ja laskentaraja avataan ennen tunnuslukua.

Haminan case avaa nyt Google-konsernin, Tuike Finland Oy:n, fyysisen kampuksen ja Suomessa syntyvän vaikutuksen eri tarkastelutasoiksi. Datakeskuksen taloudellinen toimintaketju selitetään ennen Tuiken tunnuslukuja, eikä 574,374 M€:n liikevaihtoa käsitellä Suomen nettohyötynä.

Vaikutukset-sivu etenee tutkimusreittinä työstä talouteen, sähköön, verkkoon, ympäristöön ja vaihtoehtoiskustannukseen. Hepokorpi, Kemi ja Kemi–Tornio esitellään sen kautta, mitä kukin opettaa vertailurajoista. Kansalaisaloitteen A01–A11-kysymykset säilyvät erillisenä lähdeauditointina pääanalyysin rinnalla.

Etusivu toimii nyt itsenäisenä tutkimusyhteenvetona: se kertoo ydinvastauksen, keskeiset havainnot, avoimet tiedot, verrokkien tarkoituksen ja sen, mitä nykyisestä aineistosta voidaan ja ei voida päätellä.

Vertailuun on lisätty mittariherkkyys: Kemin 2,0 TWh/v sähköntuotannosta ja 250 % sähköomavaraisuudesta johdettu 0,8 TWh/v oma kulutus sekä +1,2 TWh/v tuotannon ja johdetun kulutuksen erotus näytetään nimenomaan johdettuna havainnollistuksena, ei mitattuna verkkotaseena. Samalla Tuiken ja Outokummun Ferrochrome-segmentin myynti- ja käyttökatelukuja suhteutetaan omaan henkilöstöön rakenteellisena vertailuna, ei tuottavuus- tai yhteiskuntahyötymittarina.

Liiketalouden termit avataan nyt ensimmäisten esiintymien yhteydessä, ja laskentasivulla on yhteinen ”Termit lyhyesti” -taulukko. Käyttökateprosentti ja käyttökatteen sekä liiketuloksen erotus selitetään sanallisesti. Vuoden lopun FTE erotetaan koko vuoden henkilötyövuosista; Ferrochromen 454 FTE:n nimitys on korjattu tämän mukaiseksi. Sisäisen myynnin osuutta kuvaava ”lähes puolet” on täsmennetty muotoon ”hieman yli puolet” (53 %). Laskennan lähtöluvut, evidenssirajat ja päätelmät säilyvät.

## 1.0.0 — 22.9.2026

Ensimmäinen toimitettu HTML-versio. Pääkehys on datakeskusten taloudellisten ja yhteiskunnallisten vaikutusten kohdevertailu valmistavaan teollisuuteen. Kansalaisaloitteen A01–A11-kohdat säilyvät tutkimuskysymyksinä ja niiden alkuperä on näkyvissä.

Lisätty Kemin ajantasainen yrityskuvaus ja Outokummun vuoden 2025 alkuperäinen segmenttiraportointi. Kemin nykyisen kohdesivun henkilöstöluku 300 erotetaan vuoden 2024 avaamistiedotteen noin 250 henkilöstä. Erosta ei päätellä nettotyöllisyysmuutosta.

Sisältö julkaistaan Markdown-lähteineen ja laskentoineen. Tämä sivu kuvaa sisällön version; verkkopalvelun käyttöönotto kirjataan repositorion julkaisutietoihin.

## Keskeiset korjatut tulkinnat

| Kohta | Korjaus | Vaikutus tulkintaan |
|---|---|---|
| Hukkalämpö | Energiatehokkuuslain velvoite ja siirtymäsäännös tunnistettu | Aiempi käsitys yleisen lämpövelvoitteen puuttumisesta ei kuvaa nykytilaa; ks. [A03](/analyysit/datakeskukset/vaiteet/#A03). |
| Tuiken käyttökate | 60,0 % löytyy yritystietolähteistä; noin 314,3 M€ on johdettu erotus | Erotusta ei nimetä suoraan luetuksi poistojen tilinpäätöseräksi. |
| Tuiken tilikauden tulos | Käytetään vuoden 2025 −12,188 M€:a | Toisen palvelun yhteenvedossa näkyvää vuoden 2024 positiivista lukua ei siirretä vuodelle 2025. |
| Ostot ja arvonlisä | Hankintojen tai arvonlisän euromäärää ei esitetä ilman varmennettua alkuperäislähdettä | Puuttuvaa tietoa ei korvata aiemmalla arviolla. |
| Irlannin sähkö | 23 % koskee mitattua kulutusta | Nimittäjää ei vaihdeta sähköntuotannoksi; ks. [A06](/analyysit/datakeskukset/vaiteet/#A06). |
| Irlannin liittymisehdot | Koko-, siirtymä- ja käytettävyysrajaukset mukana | Tehovaatimus erotetaan vuosienergiasta ja omistamisesta. |
| HEL16:n generaattorit | Noin 161 MW on polttoainetehoa | Luku ei ole datakeskuksen mitattu verkkosähkön ottoteho. |

## Seuraava päivitys edellyttää uutta näyttöä

Keskeisiä avoimia kohtia ovat Tuiken alkuperäinen tilinpäätös, kampusten yhtenevät energia- ja työpanostiedot, HEL16:n käyttöönotto ja tarkkailu, verkkokustannusten kohdistus sekä vertailukelpoinen vaihtoehtotilanne. Puutteet eivät muutu ratkaistuiksi julkaisumuotoa vaihtamalla.
