import {readFile,writeFile,readdir,mkdir,rm,cp} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';
import {escape as e,frontmatter,basePath,renderMarkdown} from './lib.mjs';
import {calculations} from './calculations.mjs';
import {symetrixMatrixV01} from './symetrix.mjs';
import {symetrixMatrixV02} from './symetrix-v02.mjs';
import {symetrixMatrixV03} from './symetrix-v03.mjs';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read = file => readFile(path.join(root,file),'utf8');
const config = JSON.parse(await read('config.json'));
const base = basePath(process.env.BASE_PATH ?? config.basePath);
const origin = process.env.SITE_ORIGIN ?? config.origin;
if (!/^https?:\/\/[^/]+$/.test(origin)) throw new Error('SITE_ORIGIN must be an origin without path');
const u = route => base + route;
const displayDate = value => new Date(value+'T00:00:00Z').toLocaleDateString('fi-FI',{timeZone:'UTC'});
const dist = path.join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(dist,{recursive:true});
await cp(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
async function put(file,text) { const dest=path.join(dist,file);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,text); }
const files=(await readdir(path.join(root,'content'))).filter(f=>f.endsWith('.md')).sort();
const pages=await Promise.all(files.map(async file=>({...frontmatter(await read('content/'+file)),file})));
const questions=await Promise.all((await readdir(path.join(root,'content/questions'))).sort().filter(f=>f.endsWith('.md')).map(async f=>frontmatter(await read('content/questions/'+f))));
const sources=JSON.parse(await read('data/sources.json'));
const documents=JSON.parse(await read('data/documents.json'));
const evidenceRaw=await read('data/evidence-index.jsonl');
const evidence=evidenceRaw.trim().split(/\n+/).filter(Boolean).map(JSON.parse);
let links=[];try{links=JSON.parse(await read('data/link-check.json')).results;}catch(error){if(error.code!=='ENOENT')throw error;}
const statuses=new Map(links.map(r=>[r.url,r]));
const routes=new Set();
for(const {meta} of pages){for(const key of ['title','slug','route','language','status','published','updated','description','layout'])if(meta[key]===undefined)throw new Error(`Missing ${key}`);if(!/^\/(?:[a-z0-9-]+\/)*$/.test(meta.route)||routes.has(meta.route))throw new Error('Invalid/duplicate route');routes.add(meta.route);}
const sourceIDs=new Set([...sources,...documents].map(s=>s.id));
const classes=['tuettu','osittain tuettu','epätarkka','avoin','näyttöä ei löytynyt'];
questions.forEach(({meta,body},i)=>{if(meta.id!==`A${String(i+1).padStart(2,'0')}`||!classes.includes(meta.classification)||!meta.question||!meta.rationale||!meta.openData||!meta.sourceRefs.length||!body)throw new Error('Invalid question');meta.sourceRefs.forEach(id=>{if(!sourceIDs.has(id))throw new Error(`Unknown source ${id}`);});});
if(questions.length!==11)throw new Error('Expected 11 questions');
const nav=[['Tiivistelmä',''],['Toimintamalli ja vertailu','vertailu/'],['Symetrix Matrix','symetrix/'],['Vaikutukset','vaikutukset/'],['Tutkimuskysymykset','vaiteet/'],['Lähteet ja laskelmat','lahteet/'],['Pitkä raportti','raportti/']];
function sectionNav(route) {return nav.map(([name,suffix])=>{const target='/analyysit/datakeskukset/'+suffix;return `<a href="${u(target)}"${route===target?' aria-current="page"':''}>${name}</a>`;}).join('');}
function tableOfContents(headings){const h=headings.filter(h=>h.level===2);return h.length<2?'':`<nav class="contents" aria-label="Tällä sivulla"><strong>Tällä sivulla</strong><ul>${h.map(x=>`<li><a href="#${e(x.id)}">${e(x.text)}</a></li>`).join('')}</ul></nav>`;}
function toolsBar(){return `<div class="tools"><button type="button" class="js-only" data-print>Tulosta / tallenna PDF</button><a href="${u('/downloads/datakeskukset.md')}" download>Lataa pitkä raportti (.md)</a></div>`;}
function template(meta,content,toc=''){
const article=meta.layout!=='home';const side=['article','questions','sources','report'].includes(meta.layout);
const inner=article?`${side?`<aside class="side"><div class="side-inner"><strong>Datakeskukset</strong><nav aria-label="Analyysin osiot">${sectionNav(meta.route)}</nav></div></aside><div><details class="mobile-nav"><summary>Analyysin osiot</summary><nav aria-label="Analyysin osiot mobiilissa">${sectionNav(meta.route)}</nav></details>`:''}<main id="sisalto" tabindex="-1" class="${side?'article':'standalone'}"><header class="article-head"><h1>${e(meta.title)}</h1><p class="lead">${e(meta.description)}</p><p class="meta">Versio ${e(config.version)} · <time datetime="${meta.updated}">${displayDate(meta.updated)}</time></p></header>${toc}<div class="prose">${content}</div>${toolsBar()}<p class="print-note">Symetra · ${e(origin+u(meta.route))} · aineisto 22.9.2026</p></main>${side?'</div>':''}`:`<main id="sisalto" tabindex="-1">${content}</main>`;
return `<!doctype html><html lang="fi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(meta.title)} | Symetra</title><meta name="description" content="${e(meta.description)}"><link rel="canonical" href="${e(origin+u(meta.route))}"><meta property="og:type" content="${article?'article':'website'}"><meta property="og:locale" content="fi_FI"><meta property="og:site_name" content="Symetra"><meta property="og:title" content="${e(meta.title)}"><meta property="og:description" content="${e(meta.description)}"><meta property="og:url" content="${e(origin+u(meta.route))}"><meta property="og:image" content="${e(origin+u('/assets/og.png'))}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Symetra — Datakeskusten taloudellisten ja yhteiskunnallisten vaikutusten auditointi"><meta name="twitter:card" content="summary_large_image">${meta.layout==='404'?'<meta name="robots" content="noindex">':''}<link rel="stylesheet" href="${u('/assets/site.css')}"><script defer src="${u('/assets/site.js')}"></script></head><body class="${meta.layout==='home'?'home':'reading'}"><a class="skip" href="#sisalto">Siirry sisältöön</a><div class="shell"><header class="site-header"><a class="brand" href="${u('/')}">Symetra</a><nav aria-label="Päänavigaatio"><a href="${u('/analyysit/datakeskukset/')}">Analyysit</a><a href="${u('/menetelma/')}">Menetelmä</a><a href="${u('/muutokset/')}">Muutokset</a></nav></header><div class="${side?'layout':''}">${inner}</div><footer class="site-footer"><a class="brand" href="${u('/')}">Symetra</a><span>Lähteet näkyviin. Rajaukset näkyviin.</span></footer></div></body></html>`;
}
function questionHTML({meta,body},prefix='') {return `<section class="question" id="${prefix+meta.id}"><h2>Tutkimuskysymys ${meta.id}: ${e(meta.question)}</h2><p class="verdict">Alkuperäisen väitteen näyttö: <strong>${e(meta.classification)}</strong></p>${renderMarkdown(body,base).html}</section>`;}
function availability(s) {const r=statuses.get(s.url);return !r?'Teknistä saatavuutta ei ole tarkistettu tässä buildissa.':`Tekninen tarkistus ${e(r.checked)}: ${e(r.result)}${r.status?` (HTTP ${r.status})`:''}.`;}
function sourcesHTML(){return sources.map(s=>`<section class="source-item" id="${s.id}"><h3>${s.id} · <a href="${e(s.url)}">${e(s.title)}</a></h3><p>${e(s.verification)}</p><p>${availability(s)}</p></section>`).join('')+`<h2 id="asiakirjat">HEL16:n asiakirjat</h2>`+documents.map(s=>`<section class="source-item" id="${s.id}"><h3>${s.id} · ${e(s.title)}</h3><p>${e(s.note)} ${s.pages} PDF-sivua. <a href="${e(s.url)}">Avaa asian tietopalvelusivu</a>.</p><p>${availability(s)}</p><details><summary>Tiedoston SHA-256-tiiviste</summary><p><code>${s.sha256}</code></p></details></section>`).join('');}
for(const page of pages){const {meta,body}=page;let {html,headings}=renderMarkdown(body,base);let toc=tableOfContents(headings);
if(meta.layout==='home'){const $=load(html);const ps=$('body>p');html=`<section class="hero"><h1>${e(meta.title)}</h1><p class="lead">${ps.eq(0).html()}</p><a class="button" href="${u('/analyysit/datakeskukset/')}">Tutustu analyysiin</a></section><section class="feature"><span class="feature-label">Ensimmäinen analyysi</span><div><h2>${$('h2').text()}</h2><p>${ps.eq(2).html()}</p>${ps.eq(3).html()}</div></section><div class="principles">${$('h3').toArray().map(h=>`<section><h2>${$(h).text()}</h2>${$(h).next('p').toString()}</section>`).join('')}</div>`;}
if(meta.layout==='questions'){toc=tableOfContents(questions.map(q=>({id:q.meta.id,level:2,text:q.meta.id+' · '+q.meta.question})));html+=questions.map(q=>questionHTML(q)).join('');}
if(meta.layout==='sources')html+=sourcesHTML();
await put(meta.route==='/'?'index.html':meta.route.slice(1)+'index.html',template(meta,html,toc));}
// The report is composed from the canonical pages and question files, not a second edited copy.
const chapterSlugs=['datakeskukset','vertailu','symetrix','vaikutukset','menetelma','vaiteet','lahteet'];
let reportHTML='',reportMD=`# Datakeskusten taloudellisten ja yhteiskunnallisten vaikutusten auditointi\n\nSymetra · versio ${config.version} · 22.9.2026\n\n`;
for(const id of chapterSlugs){const p=pages.find(p=>p.meta.slug===id);const shifted=p.body.replace(/^(#{2,5}) /gm,'#$1 ');reportHTML+=`<section class="chapter" id="raportti-${id}"><h2>${e(p.meta.title)}</h2>${renderMarkdown(shifted,base,id+'-').html}`;reportMD+=`\n## ${p.meta.title}\n\n${shifted}\n`;if(id==='vaiteet'){reportHTML+=questions.map(q=>questionHTML(q,'raportti-').replace(/<h2>/g,'<h3>').replace(/<\/h2>/g,'</h3>')).join('');reportMD+=questions.map(q=>`\n### ${q.meta.id}: ${q.meta.question}\n\nLuokka: ${q.meta.classification}\n\n${q.body}`).join('\n');}if(id==='lahteet'){reportHTML+=sourcesHTML().replace('<h2 id="asiakirjat">','<h3 id="asiakirjat">').replace('HEL16:n asiakirjat</h2>','HEL16:n asiakirjat</h3>');reportMD+=sources.map(s=>`\n### ${s.id}: ${s.title}\n\n${s.url}\n\n${s.verification}\n`).join('')+documents.map(d=>`\n### ${d.id}: ${d.title}\n\n${d.note}\n\n${d.url}\n\nSHA-256: ${d.sha256}\n`).join('');}reportHTML+='</section>';}
reportMD=reportMD.replace(/\]\(\/(?!\/)([^)]*)\)/g,(_,p)=>`](${origin+u('/'+p)})`).replace(/\]\(#(S\d+)\)/g,(_,id)=>`](${origin+u('/analyysit/datakeskukset/lahteet/#'+id)})`);
const reportMeta={title:'Datakeskukset: pitkä raportti',description:'Toimitettu analyysi, tutkimuskysymykset, menetelmä ja lähteet yhdessä. Sopii myös tulostettavaksi tai PDF-tiedostoksi tallennettavaksi.',route:'/analyysit/datakeskukset/raportti/',updated:config.updated,layout:'report'};
await put('analyysit/datakeskukset/raportti/index.html',template(reportMeta,reportHTML,tableOfContents(chapterSlugs.map(id=>({id:'raportti-'+id,level:2,text:pages.find(p=>p.meta.slug===id).meta.title})))));
await put('404.html',template({title:'Sivua ei löytynyt',description:'Osoite on voinut muuttua. Julkaisun sisältö löytyy etusivulta ja analyysin hakemistosta.',route:'/404.html',updated:config.updated,layout:'404'},`<p><a href="${u('/')}">Palaa Symetran etusivulle</a> tai <a href="${u('/analyysit/datakeskukset/')}">avaa datakeskusanalyysi</a>.</p>`));
await put('downloads/datakeskukset.md',reportMD);
await put('downloads/evidence-index.jsonl',evidenceRaw.endsWith('\n')?evidenceRaw:evidenceRaw+'\n');
for(const [name,data] of [['sources',sources],['documents',documents],['questions',questions.map(q=>({...q.meta,body:q.body}))],['calculations',calculations()],['symetrix-v0.1',symetrixMatrixV01()],['symetrix-v0.2',symetrixMatrixV02()],['symetrix-v0.3',symetrixMatrixV03()],['evidence-index',evidence]])await put(`downloads/${name}.json`,JSON.stringify(data,null,2)+'\n');
const csvValue=x=>'"'+String(x).replaceAll('"','""')+'"';await put('downloads/sources.csv','\ufeff'+[['id','title','url','verification'],...sources.map(s=>[s.id,s.title,s.url,s.verification])].map(row=>row.map(csvValue).join(',')).join('\r\n'));
await put('.nojekyll','');
await put('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...pages.map(p=>p.meta.route),reportMeta.route].map(r=>`<url><loc>${e(origin+u(r))}</loc><lastmod>${config.updated}</lastmod></url>`).join('')}</urlset>`);
await put('build-meta.json',JSON.stringify({version:config.version,basePath:base,origin,routes:[...routes,reportMeta.route],questionCount:questions.length},null,2));
console.log(`Built ${pages.length+2} HTML pages; ${questions.length} questions; ${sources.length} web sources. Base path: ${base||'/'}`);
