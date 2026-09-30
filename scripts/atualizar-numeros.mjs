// Atualiza os números de prova da LP (src/data/home.ts) com o banco de produção:
// soma de seguidores e total de contas do Instagram ATIVAS. Só lê o banco.
// Uso: npm run numeros   (precisa do acesso SSH "notifiquei-vps" nesta máquina)
// Depois confira o "+360 perfis ativos" em src/i18n/home/{pt,en,es}.ts: ele é
// arredondado pra baixo de propósito e não é trocado aqui.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const sql = `select count(*), coalesce(sum("followersCount"),0) from "InstagramAccount" where status='ACTIVE';`;
const remoto = `cd /opt/instav2-backend && U=$(grep -E "^DATABASE_URL=" .env | head -1 | cut -d= -f2- | tr -d '"' | sed "s/sslaccept=accept_invalid_certs//; s/[?&]$//"); docker run --rm -i --network host postgres:16-alpine psql "$U" -At -F,`;
const saida = execFileSync("ssh", ["notifiquei-vps", remoto], { input: sql, encoding: "utf8" }).trim();
const [contas, seguidores] = saida.split("\n").pop().split(",").map(Number);
if (!contas || !seguidores) throw new Error(`Resposta inesperada do banco: ${saida}`);

const arq = "src/data/home.ts";
const hoje = new Date().toLocaleDateString("pt-BR");
const milhar = (n) => n.toLocaleString("en-US").replace(/,/g, "_");
let s = readFileSync(arq, "utf8");
s = s
  .replace(/totalFollowers: [\d_]+,/, `totalFollowers: ${milhar(seguidores)},`)
  .replace(/contasAtivas: [\d_]+,/, `contasAtivas: ${contas},`)
  .replace(/ATIVAS no banco em [\d/]+ \(\d+\n\/\/ contas;/, `ATIVAS no banco em ${hoje} (${contas}\n// contas;`);
writeFileSync(arq, s);
console.log(`${contas} contas ativas · ${seguidores.toLocaleString("pt-BR")} seguidores → ${arq}`);
console.log(`Perfis ativos arredondados pra baixo: +${Math.floor(contas / 10) * 10}`);
