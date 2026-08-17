/**
 * /en/creators e /en/vs-manychat.
 *
 * ⚠️ A comparação com o ManyChat NÃO é tradução da página brasileira. Seis dos
 * 16 argumentos de lá só valem no Brasil (real sem câmbio, PIX, plataforma em
 * português, LGPD, "feito pra criador BR") e, traduzidos, argumentariam CONTRA
 * o produto: o americano paga em dólar, não tem PIX e quer GDPR.
 * Aqui a comparação é a que se sustenta fora: preço fixo vs por contato,
 * Instagram+TikTok no mesmo plano, sorteios, apps nativos e a API com o Claude.
 */
export const creatorsEn = {
  title: "Notifiquei for creators — your post goes viral, we answer",
  description:
    "For the creator drowning in DMs: Notifiquei answers every “I want it” on your post in seconds, in your voice, on Meta's official API.",
  eyebrow: "Creators from 10k to 1M followers",
  h1a: "Your post goes viral.",
  h1b: "We",
  h1hl: "answer",
  lead: "You posted the reel that blew up. Now there are 800 “I want it” comments waiting. Notifiquei sends the link to each one in seconds — you just wake up and see the result.",
  cta: "Automate my Instagram",
  cta2: "See how it works",
  trust: ["Meta official API", "Doesn't sound like a bot", "Replies in 3 seconds"],
  demo: {
    pill: "Automation live", metric: "847 replies today",
    who: "@mariana.fit commented on your reel",
    comment: "“how much is the course? 😍”",
    flow: "automatic reply in DMs",
    answer: "Hey! 😊 It's <strong>$97</strong> upfront. Want the link?",
    done: "Mariana opened the link ·", secs: "3s",
  },
  how: { eyebrow: "How it works", t1: "You're a creator,", t2: "not a developer.",
    lead: "That's why we kept it simple: no endless setup, no two-hour tutorial, no calling the nephew who's good with computers.",
    steps: [
      { n: "01", t: "Connect in 3 clicks", d: "Official Meta login. We never ask for your password (and couldn't). No block risk, account safe." },
      { n: "02", t: "Pick the word", d: "“Want”, “price”, “link”… you decide. Anyone who comments or DMs it gets the reply instantly." },
      { n: "03", t: "Back to creating", d: "DMs answer themselves, leads arrive qualified, and you step in only when the customer already wants to buy." },
    ] },
  contrast: { eyebrow: "See the difference", t1: "Whoever replies first", t2: "keeps the customer.",
    lose: { tag: "Without Notifiquei", m1: "Hi! How much is the course? 😍", gap: "⋯ 6 hours later", m2: "Never mind, I bought from someone else.", foot: "Customer gone in 6 hours." },
    win: { tag: "With Notifiquei", m1: "Hi! How much is the course? 😍", m2: "Hey! 😊 $97 upfront. Want the link?", meta: "2:32 PM · automatic", m3: "Send it! I want to buy now 🔥", foot: "Answered in 1 minute." } },
  perks: [
    { t: "Handles a viral hit", d: "800 “I want it” comments on a reel that exploded? Each one becomes a DM conversation, in seconds — without you freezing." },
    { t: "Draws winners without scrolling", d: "Whoever comments the word joins automatically. You click draw and it shows the winners — no spreadsheet, no screenshots." },
    { t: "You sleep, it sells", d: "Automatic replies 24/7, even at 3am. Whoever replies first keeps the customer." },
    { t: "No risk to your profile", d: "Meta's official API, certified partner. Your reach and your ads stay normal." },
    { t: "Only calls you when it matters", d: "It filters and qualifies. When a lead heats up, it flags you to close — no digging through DMs." },
    { t: "Set up without a developer", d: "You're a creator, not a programmer. Pick the trigger, answer three questions, turn it on." },
  ],
  finalcta: { eyebrow: "Your next post", title: "Don't let another", titleHl: "“I want it”", lead: "Every unanswered comment is a sale walking out the door. Turn it on before the next post.", cta: "Get started", talk: "Talk to us" },
};

export const vsEn = {
  title: "Notifiquei vs ManyChat — fixed price, unlimited contacts",
  description:
    "Compare Notifiquei and ManyChat: fixed monthly price with unlimited contacts, Instagram + TikTok on one plan, native apps and an API you can drive from Claude.",
  eyebrow: "Notifiquei × ManyChat",
  headline: "Everything ManyChat does — at a price that doesn't grow with your audience.",
  subhead: "Instagram DM, comment and story automation on Meta's official API. Fixed monthly price, unlimited contacts, and both channels on the same plan.",
  honestidade:
    "ManyChat is a solid tool and also runs on Meta's official API — there is no “ban risk” from using it, and neither of us asks for your password. Our real differences are the pricing model, having Instagram and TikTok on one plan, native mobile apps, and an API you can drive from an AI assistant. The table below marks only where we genuinely differ.",
  tabelaTitulo: "Side by side,",
  tabelaTitulo2: "no marketing spin.",
  th: { criterio: "Criterion", nq: "★ Notifiquei", mc: "ManyChat" },
  rows: [
    { c: "Pricing model", n: "Fixed monthly price", m: "Per contact — grows with your audience", hl: true },
    { c: "Contacts", n: "Unlimited on every plan", m: "Tiered by contact count", hl: true },
    { c: "Instagram + TikTok", n: "Both on the same plan", m: "Instagram only", hl: true },
    { c: "Meta official API", n: "Yes", m: "Yes", hl: false },
    { c: "DM automation", n: "Yes", m: "Yes", hl: false },
    { c: "Comment trigger", n: "Yes", m: "Yes", hl: false },
    { c: "Story reply trigger", n: "Yes", m: "Yes", hl: false },
    { c: "Build a flow in plain language", n: "Yes — describe it and AI builds it", m: "No — manual visual editor", hl: true },
    { c: "Drive it from an AI assistant", n: "Yes — API key + ready-made Claude kit", m: "No", hl: true },
    { c: "Native giveaways", n: "Yes — draw in one click", m: "No", hl: true },
    { c: "Mobile app", n: "Yes — iOS and Android", m: "Limited app", hl: true },
    { c: "Asks for your Instagram password?", n: "Never — official token", m: "Never — official token", hl: false },
  ],
  reasonsTitulo: "Why creators switch",
  reasons: [
    { t: "Your bill stops chasing your audience", d: "ManyChat charges per contact: the better you do, the more you pay. Here the price is fixed — 500 followers or 500,000, same invoice." },
    { t: "Two channels, one plan", d: "Every seat connects 1 Instagram + 1 TikTok. You automate both without paying twice." },
    { t: "An API you can just talk to", d: "Copy the ready-made kit into a Claude Project and build automations by chatting. No other tool in this category does that." },
    { t: "Giveaways built in", d: "Comment-based giveaways are native: it collects entrants and draws winners in a click, no third-party tool." },
  ],
  finalcta: { eyebrow: "Same automation, different bill", title: "Stop paying more", titleHl: "for growing", lead: "Fixed price, unlimited contacts, 7-day guarantee. If it doesn't work out, we refund 100%.", cta: "Get started", talk: "Talk to us" },
};
