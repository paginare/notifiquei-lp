// Pulso da LP: os mesmos números do diagnóstico de 20/09, para comparar semana a semana.
// Rodar: npm run pulso  (acrescenta uma linha em docs/pulso-lp.csv e imprime o resumo)
//
// Precisa de:
//   ~/.config/notifiquei/posthog-key  — chave pessoal de leitura (projeto 487659)
//   acesso ssh a notifiquei-vps       — para contas e vendas do banco
// O Clarity fica de fora: a API dele só devolve 72h e tem 10 chamadas por dia.
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

const DIAS = Number(process.argv[2] ?? 30);
const PROJETO = 487659;
const CSV = 'docs/pulso-lp.csv';

const chave = readFileSync(join(homedir(), '.config/notifiquei/posthog-key'), 'utf8').trim();

async function hogql(query) {
  const r = await fetch(`https://us.posthog.com/api/projects/${PROJETO}/query/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${chave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
  });
  const d = await r.json();
  if (!d.results) throw new Error(`PostHog: ${JSON.stringify(d).slice(0, 200)}`);
  return d.results;
}

const banco = (sql) => {
  const saida = execFileSync(
    'ssh',
    ['-o', 'ConnectTimeout=10', 'notifiquei-vps',
     `docker exec -i instav2-backend-api node -e 'const {PrismaClient}=require("@prisma/client");const p=new PrismaClient();const sql=require("fs").readFileSync(0,"utf8");p.$queryRawUnsafe(sql).then(r=>{console.log(JSON.stringify(r,(k,v)=>typeof v==="bigint"?Number(v):v));process.exit(0)})'`],
    { input: sql, encoding: 'utf8' },
  );
  return JSON.parse(saida.trim().split('\n').pop());
};

const [[pessoas, entrar, cta]] = await hogql(`
  select count(distinct distinct_id),
    count(distinct if(event='nav_login_clicked', distinct_id, null)),
    count(distinct if(event in ('hero_cta_clicked','signup_cta_clicked','plan_cta_clicked','sticky_cta_clicked'), distinct_id, null))
  from events where timestamp > now() - interval ${DIAS} day`);

const [[saidas, topo]] = await hogql(`
  select count(), countIf(toFloat(properties.$prev_pageview_max_scroll_percentage) < 0.25)
  from events where event='$pageleave' and properties.$prev_pageview_pathname='/' and timestamp > now() - interval ${DIAS} day`);

const rolagem = await hogql(`
  select event, count() from events
  where event in ('Scroll20','Scroll40','Scroll60','Scroll80','Scroll100') and timestamp > now() - interval ${DIAS} day
  group by event order by event`).catch(() => []);

const [b] = banco(`
  select
    (select count(*) from "User" where "createdAt" > now() - interval '${DIAS} days' and "deletedAt" is null) contas,
    (select count(*) from "User" where "createdAt" > now() - interval '${DIAS} days' and "signupSrc"='home' and "deletedAt" is null) contas_lp,
    (select count(*) from "PaymentWebhook" where provider='CAKTO' and "eventType"='purchase_approved' and "createdAt" > now() - interval '${DIAS} days') vendas,
    (select count(*) from "PaymentWebhook" where provider='CAKTO' and "eventType"='purchase_approved' and "createdAt" > now() - interval '${DIAS} days' and "rawPayload"->'data'->>'checkoutUrl' like '%src=home%') vendas_lp`);

const pctTopo = saidas ? Math.round((topo / saidas) * 100) : 0;
const hoje = new Date().toISOString().slice(0, 10);
const linha = [hoje, DIAS, pessoas, entrar, cta, saidas, pctTopo, b.contas, b.contas_lp, b.vendas, b.vendas_lp].join(',');

if (!existsSync(CSV)) {
  appendFileSync(CSV, 'data,dias,pessoas,clicou_entrar,clicou_cta,saidas_home,pct_sai_no_topo,contas,contas_da_lp,vendas,vendas_da_lp\n');
}
appendFileSync(CSV, linha + '\n');

console.log(`\nPulso da LP — ${hoje}, últimos ${DIAS} dias\n`);
console.log(`  pessoas na home       ${pessoas}   (${entrar} só p/ entrar, ${cta} clicaram em CTA)`);
console.log(`  saem antes de 25%     ${pctTopo}%   (${topo} de ${saidas} saídas)`);
console.log(`  contas criadas        ${b.contas}   (${b.contas_lp} com src=home)`);
console.log(`  assinaturas novas     ${b.vendas}   (${b.vendas_lp} de link da LP)`);
if (rolagem.length) console.log('  marcos de rolagem     ' + rolagem.map(([e, n]) => `${e}=${n}`).join('  '));
console.log(`\nlinha acrescentada em ${CSV}\n`);
