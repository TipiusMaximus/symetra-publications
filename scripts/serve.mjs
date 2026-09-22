import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const meta=JSON.parse(await readFile(path.join(dir,'build-meta.json'),'utf8'));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.md':'text/markdown; charset=utf-8','.csv':'text/csv; charset=utf-8','.png':'image/png','.xml':'application/xml'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let p=decodeURIComponent(url.pathname);if(meta.basePath && p===meta.basePath){res.writeHead(302,{Location:meta.basePath+'/'});res.end();return;}if(meta.basePath && !p.startsWith(meta.basePath+'/'))throw Error('404');p=p.slice(meta.basePath.length);let file=path.resolve(dir,'.'+p);if(!file.startsWith(dir+path.sep)&&file!==dir)throw Error('404');if((await stat(file)).isDirectory())file=path.join(file,'index.html');res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(await readFile(file));}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(dir,'404.html')));}}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${process.env.PORT||4173}${meta.basePath}/`));
