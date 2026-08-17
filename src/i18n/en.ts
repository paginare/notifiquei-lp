/**
 * Home em inglês. Mercado internacional por definição: nunca mostra real,
 * nunca mostra o plano grátis (que é só do Brasil) e aponta pros Payment Links
 * do Stripe.
 *
 * O preço em euro vs dólar continua sendo decidido pelo `data-currency` que a
 * Pages Function estampa — por isso os dois valores viajam juntos aqui.
 */
export const en = {
  lang: "en" as const,
  title: "Notifiquei — Instagram automation on Meta's official API",
  description:
    "Notifiquei answers your Instagram DMs, comments and story replies in seconds, in your own voice, on Meta's official API. You create. It converts.",

  nav: {
    links: [
      { href: "/en#how", label: "How it works" },
      { href: "/en#platform", label: "Platform" },
      { href: "/en#claude", label: "API + Claude" },
      { href: "/en#plans", label: "Pricing" },
    ],
    entrar: "Log in",
    comecar: "Get started",
  },

  hero: {
    badge: "7-day guarantee · cancel anytime",
    eyebrow: "Instagram + TikTok · official API",
    title: "Answer every Instagram comment and DM",
    titleHl: "automatically",
    lead:
      "For creators and shops selling on Instagram and TikTok. It replies to comments, DMs and story replies in <em>your</em> voice, on Meta's official API, and only pings you when the customer is ready to buy.",
    cta: "Get started",
    proof: "<strong>2,000+ creators</strong> already sell on autopilot · on Meta's official API",
  },

  proof: [
    { num: "3s", lbl: "average reply time" },
    { num: "24h", lbl: "selling, even while you sleep" },
    { num: "98%", lbl: "of comments answered" },
  ],

  affiliate: {
    eyebrow: "For affiliates",
    title: "Whoever comments on your post gets your affiliate link in their DMs,",
    titleHl: "instantly",
    lead:
      "Post the product, ask people to comment a keyword, and Notifiquei sends <strong>your affiliate link</strong> straight to each person's DMs — no copying and pasting links all day.",
    cta: "Get started",
    marks: "Works with affiliate links from",
  },

  creators: {
    eyebrow: "Who uses it",
    title: "Built for creators<br />like you.",
    lead:
      "From fitness to food, from digital products to local shops — Notifiquei already replies for more than <strong>2,000 creators</strong> while they create (or sleep).",
    nichos: {
      Nutrição: "Nutrition", Fitness: "Fitness", Pet: "Pets", Beleza: "Beauty",
      Confeitaria: "Baking", Estética: "Aesthetics", Infoproduto: "Digital products",
      Gastronomia: "Food", Decoração: "Home decor", Moda: "Fashion",
      Fotografia: "Photography", Artesanato: "Crafts",
    } as Record<string, string>,
  },

  how: {
    eyebrow: "How it works",
    title: "Up and running in",
    titleHl: "five minutes",
    lead:
      "No developer, no technical team, no two-hour tutorial. If we'd known it was this simple, we would have charged more.",
    steps: [
      { n: "01", title: "Connect your Instagram", body: "Official Meta login, a few clicks. No password shared, no risk, no hassle." },
      { n: "02", title: "Pick your triggers", body: "A word in a comment, an incoming DM, a story reply — you decide what fires each automation." },
      { n: "03", title: "Relax and sell", body: "It replies, qualifies, sends the link, and only calls you when the customer is ready to buy." },
    ],
  },

  inaction: {
    eyebrow: "See it in action",
    title: "A comment becomes a sale in seconds.",
    lead:
      "Same question, two possible endings. On Instagram, whoever replies first keeps the customer — and Notifiquei makes sure that's you.",
    lose: { tag: "Without Notifiquei", text: "🥲 Sale lost in 6 hours" },
    win: { tag: "With Notifiquei", text: "🎉 Sale closed in 1 minute" },
  },

  day: {
    eyebrow: "An ordinary day",
    title: "It replies and sells all day,<br /><span class='hl'>even when you're offline</span>.",
    beats: [
      { k: "8am", t: "You post the reel and go live your life." },
      { k: "2pm", t: "The “I want it” comments poured in. It already answered every one — on Instagram and TikTok." },
      { k: "10pm", t: "You open the app in bed: the sale happened without you." },
    ],
    alt: "Creator watching sales come in on her phone at night",
    badge: "12 sales today · on autopilot",
  },

  platform: {
    eyebrow: "Inside the platform",
    title: "A simple dashboard to build, track<br class='br-r' /> and <span class='hl'>tune your automations</span>.",
    lead: "No confusing panel with a thousand tabs. Everything you need, right where you expect it.",
  },

  capabilities: {
    eyebrow: "What you get",
    title: "Everything Notifiquei <br class='br-r' /><span class='hl'>does for you</span>.",
    lead: "No features you'll never touch. We kept only what helps you sell — and cut the rest.",
    caps: [
      { t: "Comment → DM → sale", d: "Someone comments “I want it”. It moves to DMs, sends the link, qualifies, and pings you when it's time to close." },
      { t: "Product showcase in DMs", d: "Paste your product links and it pulls each photo and name on its own. A real storefront in the DM — not just a bare link." },
      { t: "Ice breakers in your DMs", d: "Ready-made questions at the top of your inbox. A follower taps one and lands straight in your automation." },
      { t: "A funnel that qualifies itself", d: "Questions, buttons and quick replies inside the flow. You only talk to people who already want to buy." },
      { t: "Automatic moderation", d: "You set the words and it hides or deletes spam and abuse before any follower sees it." },
      { t: "Giveaways from comments", d: "Anyone who comments the keyword joins automatically. You click draw and it picks the winners — no scrolling through comments." },
      { t: "Teams and agencies", d: "Multiple accounts, organised team, separate access. Ideal for anyone managing several brands." },
      { t: "TikTok auto-DM", d: "Welcome messages, keywords and a default reply on TikTok Business — nobody goes unanswered." },
      { t: "Run it from your phone", d: "Native iPhone and Android apps: build, pause and track your automations from anywhere." },
    ],
  },

  claude: {
    eyebrow: "New · for AI users",
    title: "Don't even want to build the flow?",
    titleHl: "Ask Claude",
    lead:
      "Every plan includes an API key. Copy the ready-made kit from your dashboard, paste it into a <strong>Claude</strong> Project, and just talk: it picks the post, builds the automation and turns it on for you.",
    bullets: [
      "One button copies the kit with your key inside",
      "It always shows a summary and asks before creating",
      "List, enable and disable automations by chatting",
      "Included in every plan, at no extra cost",
    ],
    note: "Got your own system? The same key plugs straight into your app.",
    chat: {
      me1: "create an automation on my latest reel: anyone who comments WANT gets the promo link in their DMs",
      ai1: "Found yesterday's reel — “summer kit, 30% off”. Before I create it, confirm:",
      rec: [
        ["Account", "@your.shop"],
        ["Trigger word", "WANT"],
        ["Public reply", "“just sent you a DM 💛”"],
        ["In DMs", "link + “I want this” button"],
      ],
      ask: "Shall I create it?",
      me2: "go ahead",
      done: "Created and live. It's already running on new comments.",
    },
  },

  midcta: {
    eyebrow: "Ready when you are",
    title: "Whoever replies first wins the sale,<br class='br-r' /> and that can",
    titleHl: "be you",
    cta: "Get started",
    sub: "7-day guarantee · 100% refund",
  },

  risk: {
    eyebrow: "Why the official API matters",
    title: "Everything on Meta's official API,<br class='br-r' /> <span class='hl'>with no risk of penalties or bans</span>.",
    lead:
      "Less reach, ads up to 3× more expensive, account banned — that's the price of automation Meta forbids. Notifiquei is 100% official API: you sell without risking your profile.",
    bad: {
      title: "⚠ Unofficial tools",
      items: [
        "Silent penalties — less reach, fewer views",
        "Ads up to 3× more expensive after a penalty",
        "Real risk of a temporary or permanent ban",
        "Access revoked with no warning",
      ],
    },
    good: {
      title: "✓ With Notifiquei (official API)",
      items: [
        "Integration fully approved by Meta — within the rules",
        "No risk of penalties, bans or lost reach",
        "Your metrics and ads stay normal",
        "Updates itself when Meta changes the rules",
      ],
    },
    seal:
      "Notifiquei is a certified Meta partner. Every automation here is within the rules — and your profile stays protected while you sell.",
  },

  plans: {
    eyebrow: "Pricing",
    title: "Fixed price and",
    titleHl: "unlimited contacts",
    lead:
      "ManyChat charges per contact — your bill grows with your audience. Here the price is fixed, with unlimited contacts: you grow without the bill growing.",
    note: "<strong>2 in 1:</strong> every seat connects <strong>Instagram + TikTok</strong> on the same plan — automate both without paying twice.",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "2 months free",
    per: "/mo",
    billed: "billed {v}/year",
    guarantee: "7-day guarantee · 100% refund",
    blurbs: {
      solo: "Starting creator, small operation.",
      pro: "For those already scaling.",
      business: "Agencies and larger operations.",
    },
    cta: "Start with",
    features: {
      solo: ["1 seat — Instagram + TikTok", "Unlimited automations", "Full template library", "Chat support", "New features first"],
      pro: ["5 seats — Instagram + TikTok", "Teams and role separation", "Unlimited automations", "Full template library", "Chat support", "New features first"],
      business: ["10 seats — Instagram + TikTok", "Teams and role separation", "Unlimited automations", "Full template library", "Priority VIP support"],
    },
  },

  faqTitle: "Clear your doubts",
  faqTitleHl: "before you start",
  faqEyebrow: "Common questions",
  faqs: [
    { q: "Can this get my Instagram blocked?", a: "No. We are an official Meta provider and use only Instagram's official API. No disguised automation, no rule-breaking, no risk of a ban." },
    { q: "Do I need to know how to code?", a: "Not at all. Zero code. If you can send an Instagram message, you can use Notifiquei. The whole interface is visual." },
    { q: "Can I build automations by chatting with Claude?", a: "Yes. Every plan includes an API key, and the dashboard hands you a ready-made kit with your key inside. Paste it into a Claude Project and ask in plain English: it finds the post, builds the automation, shows you a summary to confirm, and turns it on. You can also list, enable and disable automations by chatting." },
    { q: "Does it work for e-commerce?", a: "Yes. We have customers selling fashion, cosmetics, supplements and physical products in general. The ideal flow changes a little, and there's a ready-made template for it." },
    { q: "How is it different from ManyChat?", a: "Fixed price with unlimited contacts, a simpler interface, and Instagram + TikTok on the same plan. If you already use ManyChat and you're happy, you don't need to switch. If you find it complicated or expensive, Notifiquei was built for you." },
    { q: "Does it work with a small following?", a: "It works with an account of any size. Whoever replies faster sells more — whether you have 500 or 500,000 followers. Smaller accounts usually feel the result first." },
    { q: "Do I need a business or professional account?", a: "Yes, a Professional or Creator account on Instagram — free to enable and it takes a minute. It's a requirement of Meta's own official API." },
    { q: "Does it work with TikTok?", a: "Yes. Notifiquei automates TikTok DMs (Business account) — and every plan connects 1 Instagram + 1 TikTok at the same price. You automate both channels without paying twice." },
    { q: "Can I cancel whenever I want?", a: "Yes, no lock-in — you cancel any time from the dashboard. And every paid plan has a 7-day guarantee: if it doesn't work out, we refund 100%." },
  ],

  finalcta: {
    eyebrow: "While you were reading this…",
    title: "Someone commented",
    titleHl: "“I want it”",
    titleEnd: "on your post.",
    lead:
      "Whoever replies first keeps the customer. Notifiquei makes sure that's always you. 7-day guarantee — if it doesn't work out, we refund 100%.",
    cta: "Get started",
    talk: "Talk to us",
  },

  sticky: { titulo: "7-day guarantee", sub: "plans from {p}/mo", cta: "Get started" },

  langBanner: { texto: "Ver esta página em português", href: "/" },

  footer: {
    pitch: "Instagram sales automation on Meta's official API. Built in Brazil, running worldwide.",
    cols: [
      { title: "Product", links: [
        { href: "/en#how", label: "How it works" },
        { href: "/en#platform", label: "Platform" },
        { href: "/en#claude", label: "API + Claude" },
        { href: "/en#plans", label: "Pricing" },
      ]},
      { title: "Company", links: [
        { href: "https://www.instagram.com/notifiquei.com.br/", label: "Instagram" },
        { href: "https://www.youtube.com/@notifiqueicombr", label: "YouTube" },
        { href: "https://br.linkedin.com/company/notifiquei", label: "LinkedIn" },
        { href: "mailto:contato@notifiquei.com.br", label: "contato@notifiquei.com.br" },
      ]},
      { title: "Legal", links: [
        { href: "/termos-de-uso", label: "Terms of use" },
        { href: "/politica-de-privacidade", label: "Privacy" },
        { href: "/dpa", label: "Data agreement (DPA)" },
      ]},
    ],
  },
};
