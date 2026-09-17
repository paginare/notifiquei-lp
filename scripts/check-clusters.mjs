// Verifica a teia pilar/satelite descrita em docs/blog-clusters.md.
// Regra: todo satelite linka pro pilar do cluster, e o pilar linka pra cada satelite.
import { readFileSync, readdirSync } from 'node:fs';

const MAPA = 'docs/blog-clusters.md';
const POSTS = 'src/content/blog';

const clusters = [];
let atual = null;
for (const linha of readFileSync(MAPA, 'utf8').split('\n')) {
  const titulo = linha.match(/^## (C\d+) [-–—] (.+)$/);
  if (titulo) {
    atual = { id: titulo[1], nome: titulo[2], pilar: null, satelites: [] };
    clusters.push(atual);
    continue;
  }
  if (linha.startsWith('## ')) atual = null;
  const celula = linha.match(/^\| ([a-z0-9-]+) \| (pilar|satelite) \|$/);
  if (celula && atual) {
    if (celula[2] === 'pilar') atual.pilar = celula[1];
    else atual.satelites.push(celula[1]);
  }
}

const noMapa = new Set(clusters.flatMap((c) => [c.pilar, ...c.satelites]));
const noDisco = readdirSync(POSTS).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
const links = Object.fromEntries(
  noDisco.map((s) => [s, [...readFileSync(`${POSTS}/${s}.md`, 'utf8').matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)].map((m) => m[1])]),
);

const erros = [];
for (const s of noDisco) if (!noMapa.has(s)) erros.push(`post fora do mapa: ${s} (adicione em ${MAPA})`);
for (const s of noMapa) if (!links[s]) erros.push(`slug no mapa sem post: ${s}`);

for (const c of clusters) {
  if (!c.pilar) { erros.push(`${c.id} sem pilar`); continue; }
  for (const s of c.satelites) {
    if (!links[s]?.includes(c.pilar)) erros.push(`${c.id}: satelite ${s} nao linka pro pilar ${c.pilar}`);
    if (!links[c.pilar]?.includes(s)) erros.push(`${c.id}: pilar ${c.pilar} nao linka pro satelite ${s}`);
  }
}

for (const [s, destinos] of Object.entries(links))
  for (const d of destinos) if (!links[d]) erros.push(`link quebrado: ${s} -> /blog/${d}`);

if (erros.length) {
  console.error(`teia com ${erros.length} pendencia(s):`);
  for (const e of erros) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`teia ok: ${clusters.length} clusters, ${noDisco.length} posts, ${Object.values(links).flat().length} links internos`);
