import { marked } from 'marked';

export const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('Frontmatter puuttuu');
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.+)$/);
    if (!item || Object.hasOwn(meta,item[1])) throw new Error(`Virheellinen metadata: ${line}`);
    let value = item[2];
    if (/^(true|false|\[|\{|"|null)/.test(value)) value = JSON.parse(value);
    meta[item[1]] = value;
  }
  return {meta, body:match[2]};
}
export function basePath(value = '') {
  if (!value || value === '/') return '';
  if (!/^\/[a-zA-Z0-9_/-]+$/.test(value) || value.includes('..') || value.includes('//')) throw new Error('Virheellinen BASE_PATH');
  return value.replace(/\/$/,'');
}
export const slug = text => text.replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function renderMarkdown(body, base = '', prefix = '') {
  const headings = []; const used = new Map();
  const renderer = new marked.Renderer();
  renderer.heading = function(token) {
    const text = this.parser.parseInline(token.tokens);
    const root = prefix + slug(token.text);
    const count = used.get(root) || 0; used.set(root,count+1);
    const id = count ? `${root}-${count+1}` : root;
    headings.push({id,level:token.depth,text:token.text});
    return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
  };
  // Only repository-owned Markdown is rendered; never accept untrusted browser input.
  let html = marked.parse(body, {renderer,gfm:true});
  html = html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_,attr,path)=>`${attr}="${base}/${path}"`);
  html = html.replace(/<table>/g,'<div class="table-scroll" role="region" aria-label="Vertailutaulukko, tarvittaessa vieritettävä vaakasuunnassa" tabindex="0"><table>').replace(/<\/table>/g,'</table></div>');
  return {html,headings};
}
