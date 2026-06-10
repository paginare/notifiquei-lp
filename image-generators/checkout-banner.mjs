import { writeFileSync, readFileSync } from 'fs';
import puppeteer from '/Users/antonioduarte/Lançar/carrossel-generator/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const LP = process.cwd();
const FONTS = `${LP}/public/assets/fonts`;
const ASSETS = `${LP}/public/assets`;
const OUT = '/tmp/checkout-banner.png';

const T = {
  paper: '#FAF6EF', paper2: '#EDE6D9', ink: '#14100E', inkSoft: '#5F564D',
  inkFaint: '#8A8072', brand: '#FF1F6D', brandInk: '#C90C54',
};

const f = (file) => readFileSync(`${FONTS}/${file}`).toString('base64');
const fontCss = `
  @font-face{font-family:'Bricolage';font-weight:800;font-display:block;src:url(data:font/woff2;base64,${f('bricolage-800.woff2')}) format('woff2')}
  @font-face{font-family:'Bricolage';font-weight:700;font-display:block;src:url(data:font/woff2;base64,${f('bricolage-700.woff2')}) format('woff2')}
  @font-face{font-family:'Jakarta';font-weight:700;font-display:block;src:url(data:font/woff2;base64,${f('jakarta-700.woff2')}) format('woff2')}
  @font-face{font-family:'Jakarta';font-weight:600;font-display:block;src:url(data:font/woff2;base64,${f('jakarta-600.woff2')}) format('woff2')}
  @font-face{font-family:'Jakarta';font-weight:400;font-display:block;src:url(data:font/woff2;base64,${f('jakarta-400.woff2')}) format('woff2')}
`;

const person = `data:image/png;base64,${readFileSync('image-generators/assets/og-person2.png').toString('base64')}`;
const metaBadge = `data:image/png;base64,${readFileSync('image-generators/assets/meta-cropped.png').toString('base64')}`;
const tiktokBadge = `data:image/svg+xml;base64,${readFileSync(`${ASSETS}/tiktok-marketing-partner.svg`).toString('base64')}`;

const WORDMARK = `<svg viewBox="0 0 290 50" height="30" fill="${T.ink}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Notifiquei">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M202.702 12.718C206.429 12.718 209.261 15.3694 210.627 19.5692C210.56 16.2042 210.486 13.521 210.486 13.509H219.893C219.892 13.5309 219.646 22.4572 219.646 28.1806C219.646 33.911 219.893 42.8523 219.893 42.8523H210.486C210.486 42.8523 210.648 36.967 210.709 31.6858C209.345 36.1292 206.392 38.7788 202.702 38.7788C197.373 38.7788 193.874 33.3616 193.874 25.7483C193.874 17.8247 197.579 12.718 202.702 12.718ZM206.919 19.5847C204.55 19.5847 202.838 21.9631 202.838 25.6535C202.838 29.1992 204.456 31.7223 206.919 31.7223C210.245 31.7223 210.743 28.1997 210.719 25.668C210.696 23.1346 210.283 19.5847 206.919 19.5847Z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M115.037 12.718C122.993 12.718 128.218 18.1746 128.218 25.8433C128.218 33.8246 122.687 38.9685 115.037 38.9685C107.081 38.9685 101.856 33.512 101.856 25.8433C101.856 17.862 107.387 12.718 115.037 12.718ZM115.037 19.6216C112.823 19.6216 111.221 22.0599 111.221 25.8432C111.221 29.4784 112.734 32.065 115.037 32.065C117.251 32.065 118.852 29.6266 118.852 25.8432C118.852 22.2081 117.34 19.6216 115.037 19.6216Z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M263.963 12.718C271.241 12.718 276.337 16.7304 276.631 24.5213L268.63 25.2754C268.629 25.2647 268.628 25.254 268.628 25.2433L260.294 25.999C260.294 26.0024 260.294 26.0058 260.294 26.0092C260.294 29.7705 261.951 32.4468 264.473 32.4468C266.534 32.4468 268.109 30.6257 268.536 27.6772L276.637 27.5164C276.232 34.8412 270.789 38.7788 263.963 38.7788C256.312 38.7788 251.288 33.3616 251.288 25.7483C251.288 17.8247 256.607 12.718 263.963 12.718ZM264.473 19.5716C262.439 19.5716 260.878 21.3463 260.427 24.2281L268.229 22.9717C267.585 20.888 266.242 19.5716 264.473 19.5716Z"/>
  <path d="M236.69 31.7222C240.148 31.7222 239.967 28.3511 239.967 25.8761C239.967 21.0519 239.721 13.529 239.72 13.5089H249.128C249.127 13.529 248.881 21.0519 248.881 25.8761C248.881 30.7067 249.128 38.2433 249.128 38.2433H239.72C239.72 38.2433 239.791 36.0731 239.857 33.3156C238.321 36.77 235.674 38.7787 232.473 38.7787C227.145 38.7787 223.646 33.3221 223.646 25.6534C223.646 25.6346 223.646 25.6159 223.646 25.5972H223.646V13.5089H232.609C232.609 16.4353 232.609 19.3617 232.609 22.288C232.609 25.4441 232.126 31.7222 236.69 31.7222Z"/>
  <path d="M141.728 12.9945L146.804 12.718V19.6216L141.728 19.6215C141.728 19.6215 141.323 30.3161 142.174 31.1387C143.025 31.9614 146.804 31.3397 146.804 31.3397V38.2433C146.804 38.2433 138.453 39.9961 135.247 36.7863C134.182 35.7209 133.537 34.6452 133.146 33.5315C131.697 29.4018 132.278 23.9378 132.321 19.6215H129.641V13.5964L132.321 13.4592V9.47689L141.728 9.14808V12.9945Z"/>
  <path d="M84.6709 9.45401V9.47873L84.6795 9.47648C86.0204 13.4638 87.3955 18.0216 88.7004 22.8916C89.3516 25.3216 89.9487 27.6931 90.487 29.9717V9.47689H99.0664V38.2433L85.4938 38.2433L85.4534 38.2541C84.1124 34.2668 82.7374 29.709 81.4325 24.8391C80.7397 22.2537 80.1081 19.7347 79.5435 17.3233H78.627V38.2433H70.0477V9.47689H75.6165V9.45393L84.6709 9.45401Z"/>
  <path d="M159.645 15.1685C159.645 15.1685 159.513 22.2003 159.481 26.7059C159.449 31.2114 159.481 38.2433 159.481 38.2433H150.074C150.074 38.2433 150.32 31.2125 150.32 26.7059C150.32 22.1992 150.074 15.1685 150.074 15.1685C150.074 15.1685 152.938 15.4151 154.777 15.4151C156.617 15.4151 159.645 15.1685 159.645 15.1685Z"/>
  <path d="M179.081 15.1678H176.18C176.18 15.1682 176.18 15.1686 176.18 15.169C173.892 15.1892 172.262 16.4588 172.225 18.3911L179.081 18.0178V24.9213L173.762 24.9213L173.966 38.2433H164.558L164.762 24.9213H161.917V18.8962L165.474 18.7141C164.192 17.6527 163.476 16.2185 163.476 14.5713C163.476 10.9001 166.962 8.48923 171.862 8.48918V8.48886H179.081V15.1678Z"/>
  <path d="M191.088 15.1685C191.088 15.1685 190.956 22.2003 190.924 26.7059C190.891 31.2114 190.924 38.2433 190.924 38.2433H181.516C181.516 38.2433 181.763 31.2125 181.763 26.7059C181.763 22.1992 181.516 15.1685 181.516 15.1685C181.516 15.1685 184.38 15.4151 186.22 15.4151C188.059 15.4151 191.088 15.1685 191.088 15.1685Z"/>
  <path d="M289.478 15.1685C289.478 15.1685 289.345 22.2003 289.313 26.7059C289.281 31.2114 289.313 38.2433 289.313 38.2433H279.906C279.906 38.2433 280.153 31.2125 280.153 26.7059C280.153 22.1992 279.906 15.1685 279.906 15.1685C279.906 15.1685 282.77 15.4151 284.61 15.4151C286.449 15.4151 289.478 15.1685 289.478 15.1685Z"/>
  <path d="M154.777 7.14786C158.05 7.14786 160.16 8.48253 160.16 10.3284C160.16 12.2483 157.922 13.5089 154.777 13.5089C151.505 13.5089 149.395 12.1743 149.395 10.3284C149.395 8.40862 151.633 7.14786 154.777 7.14786Z"/>
  <path d="M186.22 7.14786C189.493 7.14786 191.602 8.48253 191.602 10.3284C191.602 12.2483 189.365 13.5089 186.22 13.5089C182.947 13.5089 180.838 12.1743 180.838 10.3284C180.838 8.40862 183.075 7.14786 186.22 7.14786Z"/>
  <path d="M284.61 7.14786C287.883 7.14786 289.992 8.48253 289.992 10.3284C289.992 12.2483 287.754 13.5089 284.61 13.5089C281.337 13.5089 279.228 12.1743 279.227 10.3284C279.227 8.40862 281.465 7.14786 284.61 7.14786Z"/>
  <path d="M24.1312 21.3366C31.0739 7.66897 40.9416 -1.75991 46.1712 0.276579C50.9236 2.12724 50.2104 12.8091 44.8306 25H55.763C55.2286 26.2088 54.6484 27.4324 54.0231 28.6634C47.0804 42.331 37.2127 51.7599 31.983 49.7234C27.4413 47.9548 27.8915 38.1204 32.6361 26.6112C32.3155 27.2921 31.9807 27.9766 31.6318 28.6634C24.6892 42.331 14.8215 51.7599 9.5918 49.7234C4.83943 47.8728 5.55268 37.1909 10.9324 25H0C0.534451 23.7913 1.11459 22.5676 1.73994 21.3366C8.68264 7.66897 18.5503 -1.75991 23.78 0.276579C28.3217 2.04523 27.8714 11.8795 23.1268 23.3886C23.4474 22.7078 23.7823 22.0234 24.1312 21.3366Z"/>
</svg>`;

const SWASH = `<svg class="swash" viewBox="0 0 300 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14 C 70 6, 150 5, 296 11" stroke="${T.brand}" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.92"/></svg>`;

const W = 1280, H = 320;
const PHOTO_W = 360;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fontCss}
  *{margin:0;padding:0;box-sizing:border-box}
  .bn{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${T.paper};font-family:'Jakarta',sans-serif}
  .glow{position:absolute;top:-180px;left:-140px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle, rgba(255,31,109,.14), rgba(255,31,109,0) 64%)}
  .photo{position:absolute;top:0;right:0;width:${PHOTO_W}px;height:${H}px;object-fit:cover;object-position:50% 20%}
  .photo-fade{position:absolute;top:0;right:${PHOTO_W - 1}px;width:130px;height:${H}px;background:linear-gradient(90deg, ${T.paper} 6%, rgba(250,246,239,0) 100%);z-index:2}
  .pill{position:absolute;z-index:3;right:${PHOTO_W - 24}px;top:32px;display:inline-flex;align-items:center;gap:8px;
    background:${T.brand};color:#fff;font-weight:700;font-size:17px;padding:9px 16px;border-radius:999px;
    box-shadow:0 16px 34px -12px rgba(255,31,109,.6)}
  .pill b{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#fff;color:${T.brand};font-size:11px}
  .pad{position:absolute;inset:0;right:${PHOTO_W - 30}px;padding:40px 0 38px 64px;display:flex;flex-direction:column;z-index:4}
  .logo{display:flex;align-items:center;margin-bottom:14px}
  .head{font-family:'Bricolage';font-weight:800;font-size:45px;line-height:1.02;letter-spacing:-0.035em;color:${T.ink}}
  .hl{position:relative;white-space:nowrap;color:${T.brand}}
  .swash{position:absolute;left:0;right:-4px;bottom:-9px;width:104%;height:15px}
  .sub{font-family:'Jakarta';font-weight:500;font-size:20px;line-height:1.34;color:${T.inkSoft};margin-top:16px;max-width:600px}
  .sub b{color:${T.ink};font-weight:700}
  .trust{display:flex;align-items:center;gap:14px;margin-top:auto}
  .seal-chip{display:inline-flex;align-items:center;justify-content:center;height:52px;padding:0 18px;background:#fff;
    border:1px solid rgba(20,16,14,.09);border-radius:13px;box-shadow:0 8px 20px -10px rgba(20,16,14,.18)}
  .seal-chip img{width:auto;display:block}
  .seal-chip .meta{height:32px}
  .seal-chip .tt{height:27px}
  .trust-txt{font-size:15px;font-weight:600;color:${T.inkSoft};line-height:1.25;max-width:340px}
  .trust-txt b{color:${T.ink};font-weight:800}
</style></head>
<body>
  <div class="bn">
    <div class="glow"></div>
    <img class="photo" src="${person}" alt="" />
    <div class="photo-fade"></div>
    <div class="pill"><b>✓</b> 7 dias grátis</div>

    <div class="pad">
      <div class="logo">${WORDMARK}</div>
      <h1 class="head">Comece <span class="hl">grátis${SWASH}</span>.<br>7 dias por nossa conta.</h1>
      <p class="sub">Você só paga no <b>8º dia</b> — cancele quando quiser, em 1 clique.</p>
      <div class="trust">
        <span class="seal-chip"><img class="meta" src="${metaBadge}" alt="Meta Business Partner" /></span>
        <span class="seal-chip"><img class="tt" src="${tiktokBadge}" alt="TikTok Marketing Partner" /></span>
        <span class="trust-txt"><b>+2.000 criadores</b> · API oficial da Meta</span>
      </div>
    </div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--font-render-hinting=none'],
});
const pg = await browser.newPage();
await pg.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
await pg.setContent(html, { waitUntil: 'networkidle0' });
await pg.evaluate(async () => { await document.fonts.load("800 52px Bricolage"); await document.fonts.ready; });
const buf = await pg.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
await browser.close();
writeFileSync(OUT, buf);
console.log(`✅ Banner salvo em ${OUT} (${(buf.length/1024).toFixed(0)} KB, ${W}x${H} @2x)`);
