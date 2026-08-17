import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

/**
 * Hash do conteúdo de um arquivo de public/, pra usar como ?v= na URL.
 *
 * Existe por causa de um incidente real: o cookie-consent.js é servido de
 * public/ com URL fixa, e a Cloudflare guardou a versão antiga por 42 minutos
 * depois do deploy. O HTML novo (que chama window.nfAoConsentir antes de subir
 * o GTM) foi servido junto com o JS velho (que não define essa função) — e o
 * rastreamento parou de carregar por completo, mesmo pra quem aceitava.
 *
 * Com o hash no querystring, conteúdo novo é URL nova: cache não tem como
 * devolver a versão errada. Assets com hash no nome não precisam disso; este
 * precisa porque o nome é estável de propósito (as páginas jurídicas estáticas
 * o referenciam direto).
 */
function hashDeAsset(caminhoEmPublic: string): string {
  const bytes = readFileSync(new URL(`../../public/${caminhoEmPublic}`, import.meta.url));
  return createHash("sha1").update(bytes).digest("hex").slice(0, 10);
}

export const versaoConsent = hashDeAsset("assets/cookie-consent.js");
