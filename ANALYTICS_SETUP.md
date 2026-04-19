# Setup de Analytics · Notifiquei

As 3 landings vêm com Meta Pixel + Google Analytics 4 prontos pra configurar, e **tracking de conversão automático** nos principais CTAs.

## ⚙️ Como configurar (5 minutos)

### 1. Pegue seus IDs

**Meta Pixel ID:**
1. Vai em https://business.facebook.com → Gerenciador de Eventos
2. Cria um Pixel novo (ou seleciona o existente)
3. Copia o ID (formato: `1234567890123456`)

**Google Analytics 4 (GA4) Measurement ID:**
1. Vai em https://analytics.google.com → Admin → Data Streams → Web
2. Cria um stream pro `notifiquei.com.br`
3. Copia o Measurement ID (formato: `G-XXXXXXXXXX`)

### 2. Substitua nos 3 arquivos

Abre cada HTML (`index.html`, `criadores.html`, `afiliados.html`) e faz **find & replace** dos 3 valores:

| Procura por | Substitui por |
|---|---|
| `YOUR_PIXEL_ID` | Seu ID do Meta Pixel (aparece 2x em cada arquivo) |
| `G-XXXXXXXXXX` | Seu Measurement ID do GA4 (aparece 2x em cada arquivo) |

**Atalho via terminal (Mac/Linux):**
```bash
cd landing-pages/
sed -i '' 's/YOUR_PIXEL_ID/1234567890123456/g' *.html
sed -i '' 's/G-XXXXXXXXXX/G-ABC123DEF4/g' *.html
```

### 3. Pronto. Pode publicar.

---

## 📊 O que já está trackeando

### Eventos automáticos disparados:

| Quando o usuário | Meta Pixel | Google Analytics 4 |
|---|---|---|
| Abre a página | `PageView` | `page_view` |
| Clica em "Começar grátis", "Quero automatizar", "Quero me afiliar" | `Lead` | `generate_lead` |
| Clica num plano de pricing (Essencial, Pro, Business) | `InitiateCheckout` | `begin_checkout` |
| Clica no WhatsApp | `Contact` | `contact` |
| Envia o formulário de afiliação | `SubmitApplication` | `submit_affiliate_form` |

### Parâmetros ricos inclusos

Cada evento leva contexto útil pra otimização de campanha:
- **Lead**: nome do botão clicado + seção onde tava (hero, footer, CTA final...)
- **InitiateCheckout**: nome do plano + valor em BRL
- **Contact**: método (WhatsApp)

Isso permite no Ads Manager criar **audiências personalizadas** tipo "quem clicou no plano Pro mas não comprou" pra remarketing com oferta específica.

---

## 🔍 Como testar se tá funcionando

### Meta Pixel
1. Instala a extensão [**Meta Pixel Helper**](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) no Chrome
2. Abre sua landing
3. Clica no ícone da extensão — deve aparecer:
   - ✓ PageView (ao carregar)
   - ✓ Lead (se clicar num CTA)

### Google Analytics
1. No Google Analytics → Relatórios → Tempo Real
2. Abre sua landing em outra aba
3. Deve aparecer 1 usuário ativo + os eventos disparados

---

## 🚀 Próximos passos (opcional)

### TikTok Pixel
Se você roda anúncio no TikTok, adiciona depois do bloco do GA4:

```html
<!-- TikTok Pixel -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('SEU_TIKTOK_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>
```

E no bloco de Conversion Tracking, adiciona chamadas `ttq.track('ClickButton', {...})` junto das do fbq/gtag.

### Hotjar ou Clarity (gravação de sessão)
Pra entender comportamento do usuário (onde ele clica, até onde ele rola, por que desistiu):

**Clarity (Microsoft, grátis):**
```html
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "SEU_CLARITY_ID");
</script>
```

### Google Tag Manager (recomendado quando crescer)
Se você começar a adicionar muitas ferramentas, migre pra GTM — 1 único script no site e você gerencia todos os pixels numa interface só.

---

## ❓ Dúvidas comuns

**P: Os tipos de evento que escolhi estão certos?**  
R: Sim — `Lead`/`generate_lead` pra CTA principal é o padrão do mercado SaaS. A Meta otimiza bem pra esse evento.

**P: Preciso enviar conversões pela Conversions API (servidor-side) pra iOS 14+?**  
R: Pra landing de captura de lead (sem venda direta), o pixel client-side é suficiente. Se adicionar Conversions API depois, conversa com a gente.

**P: Meu gerenciador de ads vai me pedir "custom conversions".**  
R: Cria elas lá mesmo, usando o evento `Lead` + a URL específica (ex: `notifiquei.com.br/afiliados` → "Lead afiliado").

**P: GDPR/LGPD — preciso pedir consentimento?**  
R: Sim, tecnicamente. Pra não bloquear nada, considera adicionar um banner de cookies simples (ex: [Cookie Notice](https://www.cookieyes.com/) gratuito). É fora do escopo dessas landings.
