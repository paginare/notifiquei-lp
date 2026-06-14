import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// LP estática do Notifiquei.
// build.format 'file' emite /index.html, /criadores.html, /afiliados.html na raiz do dist,
// servidos como /, /criadores, /afiliados pela Vercel (cleanUrls). Páginas legais em public/
// passam intactas. Sem adapter SSR — saída 100% estática.
export default defineConfig({
  site: 'https://notifiquei.com.br',
  trailingSlash: 'never',
  // inlineStylesheets: 'always' embute o CSS no HTML (sem <link> render-blocking).
  // Testado em 4G throttled: bate 'auto' (link de CSS adiciona RTT e piora o LCP).
  build: { format: 'file', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  // variantes A/B (/v2, /v3) ficam fora do sitemap — são páginas de teste, não indexáveis.
  integrations: [sitemap({ filter: (page) => !/\/v[23]$/.test(page.replace(/\/$/, "")) })],
});
