import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {shouldReplaceLinkRegistry} from './link-check-policy.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sources=JSON.parse(await readFile(path.join(root,'data/sources.json'),'utf8'));
const docs=JSON.parse(await readFile(path.join(root,'data/documents.json'),'utf8'));
const urls=[...new Set([...sources,...docs].map(x=>x.url))];
const results=[];let cursor=0;
async function worker(){while(cursor<urls.length){const url=urls[cursor++];let status=null,result,error;
try{const response=await fetch(url,{signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Symetra-publication-link-check/1.0 (reference availability check)'}});status=response.status;await response.body?.cancel();result=response.ok?'palvelin vastasi onnistuneesti':[401,403,429].includes(status)?'automaattinen tarkistus estyi käyttörajoitukseen':status===404?'kohdetta ei löytynyt':'palvelinvirhe tai muu vastaus';}catch(err){error=err.cause?.code||err.name;result='yhteyttä ei voitu varmistaa';}
results.push({url,status,result,...(error?{error}:{}),checked:new Date().toISOString().slice(0,10)});}}
await Promise.all(Array.from({length:6},worker));results.sort((a,b)=>a.url.localeCompare(b.url));
console.log(JSON.stringify({total:results.length,ok:results.filter(r=>r.status>=200&&r.status<300).length,attention:results.filter(r=>!(r.status>=200&&r.status<300))},null,2));
if(!shouldReplaceLinkRegistry(results)){
  console.error('Kaikki osoitteet epäonnistuivat verkkotasolla. Aiempi linkkirekisteri säilytetään.');
  process.exitCode=1;
}else{
  await writeFile(path.join(root,'data/link-check.json'),JSON.stringify({note:'HTTP-saatavuus ei ole sisällön faktantarkistus.',results},null,2)+'\n');
}
if(results.some(r=>r.status===404))process.exitCode=1;
