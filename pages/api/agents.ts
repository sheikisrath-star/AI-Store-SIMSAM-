import type { NextApiRequest, NextApiResponse } from 'next'

const AGENT_PROMPTS: Record<string, string> = {
  CEO: `You are the CEO Agent of AtlasAI Store. Your role is business intelligence and strategic direction.
You analyze markets, identify opportunities, set product direction, and optimize revenue.
Always respond with actionable insights in 2-3 concise paragraphs. Focus on profit and growth.`,
  PRODUCT: `You are the Product Agent of AtlasAI Store. Your role is building and optimizing the product catalog.
You write compelling product descriptions, set competitive prices, and create SEO-optimized listings.
Always respond with specific, implementable product content. Include titles, descriptions, and pricing.`,
  MARKETING: `You are the Marketing Agent of AtlasAI Store. Your role is driving traffic and conversions.
You create viral TikTok/Instagram scripts, write email campaigns, and develop SEO content strategies.
Always respond with ready-to-use content including hooks, CTAs, and platform-specific formatting.`,
  SUPPORT: `You are the Support Agent of AtlasAI Store. Your role is customer operations and satisfaction.
You draft FAQ content, respond to customer issues, and create onboarding sequences.
Always respond with customer-friendly, empathetic copy that resolves issues and builds loyalty.`,
  ANALYTICS: `You are the Analytics Agent of AtlasAI Store. Your role is data-driven optimization.
You identify conversion bottlenecks, forecast revenue, and recommend A/B tests.
Always respond with specific metrics, hypotheses, and measurable expected outcomes.`,
}

function getProvider(): 'groq' | 'anthropic' | null {
  if (process.env.GROQ_API_KEY) return 'groq'
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic'
  return null
}

async function callGroq(systemPrompt: string, userMessage: string): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
  })
  if (!res.ok) throw new Error(`Groq error: ${res.status}`)
  const data = await res.json()
  return data.choices[0].message.content
}

async function callAnthropic(systemPrompt: string, userMessage: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })
  if (!res.ok) throw new Error(`Anthropic error: ${res.status}`)
  const data = await res.json()
  return data.content[0].text
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { role, task } = req.body
  if (!role || !task) return res.status(400).json({ error: 'role and task are required' })

  const systemPrompt = AGENT_PROMPTS[role.toUpperCase()]
  if (!systemPrompt) return res.status(400).json({ error: `Unknown role: ${role}` })

  const provider = getProvider()

  if (!provider) {
    // Deterministic demo response when no API key available
    const demos: Record<string, string> = {
      CEO: `Market analysis complete. High-value opportunity detected in AI productivity tools — search volume up 340% YoY. Recommend launching 2 new products in this niche within 30 days. Current pricing at $19–$49 undercuts market average of $97. Consider premium $99 tier with coaching element to capture high-intent buyers.`,
      PRODUCT: `New product concept: "AI Workflow Automation Masterclass" — 47-page guide + 12 Notion templates + prompt library. Suggested price: $39. SEO title: "AI Automation Masterclass 2026 — Save 10 Hours/Week". Description written with urgency + social proof. Ready to publish.`,
      MARKETING: `TikTok script ready: "POV: I let AI run my side hustle for 30 days" — opens on laptop showing $4,200 earnings. Hook in first 0–2s. CTA: "Link in bio for the exact system." Estimated organic reach: 40K–200K based on niche benchmarks. Ready to record.`,
      SUPPORT: `FAQ created (12 questions). Topics: instant delivery, refund policy, format compatibility, lifetime updates, download issues. Estimated ticket deflection rate: 65%. Recommended placement: product page accordion and checkout page sidebar.`,
      ANALYTICS: `Top 3 conversion blockers identified: (1) Cart page load 2.1s — fix: lazy-load product images, expected +12% CVR; (2) Checkout has 4 unnecessary fields — remove phone, expected +8% CVR; (3) No urgency signals on product page — add "47 sold today" badge, expected +6% CVR. Total projected uplift: +26% CVR.`,
    }
    return res.status(200).json({ output: demos[role.toUpperCase()] || 'Agent response simulated (no API key configured).' })
  }

  try {
    let output: string
    if (provider === 'groq') {
      output = await callGroq(systemPrompt, task)
    } else {
      output = await callAnthropic(systemPrompt, task)
    }
    return res.status(200).json({ output })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return res.status(500).json({ error: message })
  }
}
