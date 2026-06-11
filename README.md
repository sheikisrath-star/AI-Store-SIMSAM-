# AtlasAI Store 🤖

> AI-generated digital products. Built, priced, and marketed by 5 autonomous AI agents.

## What's inside

- **Next.js 14** App Router, TypeScript, Tailwind CSS
- **5 AI Agents** — CEO, Product, Marketing, Support, Analytics (Groq free tier)
- **6 Digital Products** — static catalog, no CMS needed
- **Full shopping flow** — product pages → cart → checkout
- **AI Command Center** — run any agent live from the dashboard
- **Supabase** (optional) — orders + agent log persistence
- **Stripe** (optional) — real payments
- **Vercel + GitHub Actions** — zero-config CI/CD

## Quick start

```bash
git clone https://github.com/YOUR_USERNAME/atlas-ai-store
cd atlas-ai-store
npm install
cp .env.example .env.local
# Fill in at least GROQ_API_KEY (free at console.groq.com)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Where to get it |
|---|---|---|
| `GROQ_API_KEY` | ✅ For live agents | [console.groq.com](https://console.groq.com) — free |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | [supabase.com](https://supabase.com) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase dashboard |
| `SUPABASE_SERVICE_KEY` | Optional | Supabase dashboard → API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | [stripe.com](https://stripe.com) |
| `STRIPE_SECRET_KEY` | Optional | Stripe dashboard |

> **Without any env vars**: the store works fully. Agents return smart demo responses. Orders aren't persisted.

## Pages

| Route | Description |
|---|---|
| `/` | Hero, featured products, how it works |
| `/products` | All products with category filter |
| `/product/[id]` | Full product detail with add-to-cart |
| `/cart` | Cart management |
| `/checkout` | Checkout form (Stripe-ready) |
| `/dashboard` | 5-agent AI Command Center |

## AI Agents

| Agent | Role |
|---|---|
| 🧠 CEO | Market analysis, product strategy, revenue direction |
| 🛒 Product | Listings, descriptions, pricing optimisation |
| 📣 Marketing | TikTok scripts, emails, SEO content |
| 🛡️ Support | FAQs, refund responses, onboarding emails |
| 📊 Analytics | Conversion analysis, forecasting, A/B tests |

All agents use **Groq** (free, 14,400 req/day) with **Anthropic** as fallback.

## Deploy to Vercel (free)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Add environment variables in Vercel dashboard
4. Click Deploy

For CI/CD with GitHub Actions, add these secrets to your repo:
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- All API keys above

## Supabase setup (optional)

Run `infra/schema.sql` in your Supabase SQL editor to create the orders and agent_logs tables.

## Adding products

Edit `lib/data.ts` — the `PRODUCTS` array. No database needed.

## License

MIT
