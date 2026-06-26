# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Notifiquei landing page. PostHog is initialized on every page via `src/components/posthog.astro` (loaded from `src/layouts/Base.astro`), using environment variables for the project token and host. Nineteen distinct event call sites now cover the main landing page, the navigation, the mobile sticky CTA, the vs-ManyChat comparison page, the creators page, the affiliates page, and all four free tool pages.

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `hero_cta_clicked` | Hero, mid-page, and final inline CTA section clicks | `src/pages/index.astro` |
| `plan_cta_clicked` | Paid plan CTA clicks with plan_name and billing_cycle properties | `src/pages/index.astro` |
| `signup_cta_clicked` | Free signup CTA clicks (hero, mid, plans, affiliate, tools hub, and all per-page CTAs) | `src/pages/index.astro`, `src/pages/ferramentas/index.astro`, `src/pages/vs-manychat.astro`, `src/pages/criadores.astro`, `src/components/FinalCta.astro`, tool pages |
| `nav_login_clicked` | User clicks 'Entrar' in the nav to log into the app | `src/components/Nav.astro` |
| `sticky_cta_clicked` | Mobile sticky bottom CTA bar click | `src/components/StickyCta.astro` |
| `tool_card_clicked` | Tool hub card clicked, with tool_name and tool_href | `src/pages/ferramentas/index.astro` |
| `raffle_run` | Sorteador raffle run with participants, winners, keyword filter, dedup | `src/pages/ferramentas/sorteador.astro` |
| `roi_calculator_calculated` | ROI DM calculator submitted with all input and output values | `src/pages/ferramentas/calculadora-roi-dm.astro` |
| `engagement_calculator_used` | Engagement calculator submitted with followers, rate, and tier | `src/pages/ferramentas/calculadora-engajamento.astro` |
| `direct_link_created` | Instagram direct link generated | `src/pages/ferramentas/gerador-link-direct.astro` |
| `affiliate_wpp_clicked` | WhatsApp CTA clicked on the affiliates page | `src/pages/afiliados.astro` |
| `affiliate_calculator_used` | Affiliate earnings calculator interacted with (clients/month + plan) | `src/pages/afiliados.astro` |

## Files created or modified

- **Modified** `src/components/posthog.astro` — fixed `api_host` fallback to `https://us.i.posthog.com`
- **Modified** `src/components/FinalCta.astro` — added `signup_cta_clicked` tracking with pathname
- **Modified** `src/components/StickyCta.astro` — `sticky_cta_clicked` (pre-existing)
- **Modified** `src/components/Nav.astro` — `nav_login_clicked` (pre-existing)
- **Modified** `src/pages/index.astro` — hero/plan/signup/affiliate CTA tracking (pre-existing)
- **Modified** `src/pages/vs-manychat.astro` — added `signup_cta_clicked` for hero CTA
- **Modified** `src/pages/criadores.astro` — added `signup_cta_clicked` for hero CTA
- **Modified** `src/pages/afiliados.astro` — added `affiliate_wpp_clicked` and `affiliate_calculator_used`
- **Modified** `src/pages/ferramentas/index.astro` — `tool_card_clicked` + signup CTA (pre-existing)
- **Modified** `src/pages/ferramentas/sorteador.astro` — added bottom signup CTA tracking
- **Modified** `src/pages/ferramentas/calculadora-roi-dm.astro` — added bottom signup CTA tracking
- **Modified** `src/pages/ferramentas/calculadora-engajamento.astro` — added bottom signup CTA tracking
- **Modified** `src/pages/ferramentas/gerador-link-direct.astro` — added bottom signup CTA tracking
- **Updated** `.env` — `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` written with correct values

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/487659/dashboard/1766651)
- [Signup CTAs over time](https://us.posthog.com/project/487659/insights/LOuLYC99)
- [Plan CTA clicks by plan](https://us.posthog.com/project/487659/insights/ceYgRjtc)
- [Tool completions over time](https://us.posthog.com/project/487659/insights/fkBFcHwD)
- [Top signup CTA sources](https://us.posthog.com/project/487659/insights/jI0VtQ1y)
- [Nav login + sticky CTA clicks](https://us.posthog.com/project/487659/insights/8Io9jPED)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Create a `.env.example` file and add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-astro-static/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
