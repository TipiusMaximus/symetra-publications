import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {frontmatter} from './lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFile(path.join(root, file), 'utf8');
export async function loadContent() {
  const sources = JSON.parse(await read('data/sources.json'));
  const documents = JSON.parse(await read('data/documents.json'));
  const observations = JSON.parse(await read('data/observations.json'));
  const publication = JSON.parse(await read('data/publication.json'));
  const legacyAnchors = JSON.parse(await read('data/legacy-anchors.json'));
  const registry = new Map([...sources, ...documents].map(s => [s.id, s]));
  if (registry.size !== sources.length + documents.length) throw new Error('Duplicate source or document ID');
  const evidence = new Map(observations.map(o => [o.id, o]));
  if (evidence.size !== observations.length) throw new Error('Duplicate observation ID');
  for (const o of observations) {
    for (const key of ['id','question','sourceRef','period','locator','finding','limitation','comparability','openData','checked','status']) {
      if (!o[key]) throw new Error(`Observation ${o.id}: missing ${key}`);
    }
    if (!registry.has(o.sourceRef)) throw new Error(`Unknown source ${o.sourceRef}`);
    const source = registry.get(o.sourceRef);
    if (!(source.reviewScope || []).includes(o.id)) throw new Error(`Observation ${o.id}: missing from ${o.sourceRef} reviewScope`);
  }
  for (const source of registry.values()) {
    for (const id of source.reviewScope || []) if (!evidence.has(id)) throw new Error(`Source ${source.id}: unknown reviewScope ${id}`);
  }
  const chapters = new Map();
  for (const file of (await readdir(path.join(root,'content/chapters'))).filter(f=>f.endsWith('.md')).sort()) {
    chapters.set(file.slice(0,-3), await read('content/chapters/'+file));
  }
  const cite = body => body.replace(/\{\{cite:([A-Z0-9-]+)\}\}/g, (_, id) => {
    const o = evidence.get(id);
    if (!o) throw new Error(`Unknown observation ${id}`);
    const s = registry.get(o.sourceRef);
    return `[${s.publisher}: ${s.title}; ${o.locator}](${s.url})`;
  });
  const expand = body => cite(body.replace(/\{\{chapter:([a-z0-9-]+)\}\}/g, (_,id) => {
    if (!chapters.has(id)) throw new Error(`Unknown chapter ${id}`);
    return chapters.get(id);
  }));
  const pages = await Promise.all((await readdir(path.join(root,'content'))).filter(f=>f.endsWith('.md')).sort().map(async file => {
    const p = frontmatter(await read('content/'+file));
    return {...p,file,rawBody:p.body,body:expand(p.body)};
  }));
  if (!/^\/(?:[a-z0-9-]+\/)+$/.test(publication.canonicalRoute) || !/^\/(?:[a-z0-9-]+\/)+$/.test(publication.compatibilityRoute)) throw new Error('Invalid publication route');
  if (!Array.isArray(publication.reportSections) || !Array.isArray(publication.downloadAppendices)) throw new Error('Invalid publication manifest');
  const allowedKinds = new Set(['page','chapter','questions']);
  const pageIds = new Set(pages.map(p => p.meta.slug));
  for (const section of [...publication.reportSections, ...publication.downloadAppendices]) {
    if (!allowedKinds.has(section.kind) || !/^[a-z0-9-]+$/.test(section.id) || !/^[a-z0-9-]+$/.test(section.group)) throw new Error(`Invalid publication section ${JSON.stringify(section)}`);
    if (section.kind === 'chapter' && !chapters.has(section.id)) throw new Error(`Unknown report chapter ${section.id}`);
    if (section.kind !== 'chapter' && !pageIds.has(section.id)) throw new Error(`Unknown report page ${section.id}`);
  }
  const reportIds = publication.reportSections.map(section => section.id);
  if (new Set(reportIds).size !== reportIds.length) throw new Error('Repeated report section');
  if (publication.reportSections[0]?.id !== 'datakeskukset') throw new Error('Report must begin with the canonical orientation');
  if (!reportIds.includes('vaiteet') || reportIds.indexOf('vaiteet') > reportIds.indexOf('johtopaatokset')) throw new Error('Claims must precede conclusions');
  for (const p of pages) if (/\{\{/.test(p.body)) throw new Error(`Unresolved content token in ${p.file}`);
  for (const [route, ids] of Object.entries(legacyAnchors)) {
    if (!Array.isArray(ids) || new Set(ids).size !== ids.length) throw new Error(`Invalid legacy anchors for ${route}`);
  }
  return {pages,sources,documents,observations,publication,legacyAnchors,chapters,cite,expand};
}
