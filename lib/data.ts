// ═══════════════════════════════════════════════════════════════════════════
// Product catalog — edit this file to add/change products
// ═══════════════════════════════════════════════════════════════════════════

export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice?: number
  category: string
  tags: string[]
  emoji: string
  gradient: string
  features: string[]
  includes: string[]
  badge?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'ai-productivity-toolkit',
    name: 'AI Productivity Toolkit',
    tagline: '10x your output with 50+ ready-to-use AI systems',
    description: 'A curated bundle of 50+ AI prompt templates, workflow automation scripts, and productivity systems. Instantly multiply your output with pre-built frameworks for writing, research, content creation, and business operations. Used by 2,000+ creators and entrepreneurs worldwide.',
    price: 29,
    originalPrice: 59,
    category: 'Productivity',
    tags: ['ai', 'productivity', 'prompts', 'automation', 'templates'],
    emoji: '⚡',
    gradient: 'from-sky-400 to-blue-600',
    features: [
      '50+ battle-tested AI prompt templates',
      'Workflow automation scripts for Notion, Zapier & Make',
      'Content creation systems for blogs, social & email',
      'Weekly updates with new prompts',
    ],
    includes: ['PDF Guide', 'Prompt Library', 'Video Walkthrough', 'Private Community Access'],
    badge: 'Best Seller',
  },
  {
    id: 'autonomous-business-blueprint',
    name: 'Autonomous Business Blueprint',
    tagline: 'Build a self-running online business with AI agents',
    description: 'The complete step-by-step system for building an autonomous AI-powered business. Includes agent prompts, workflow diagrams, tool stack recommendations, and real-world deployment guides. Learn to build CEO, Marketing, Sales, and Support agents that run your business 24/7.',
    price: 49,
    originalPrice: 99,
    category: 'Business',
    tags: ['business', 'automation', 'ai-agents', 'blueprint', 'passive-income'],
    emoji: '🚀',
    gradient: 'from-purple-400 to-purple-700',
    features: [
      'Master Orchestrator Agent setup guide',
      'All 7 specialized agent prompts (CEO, Marketing, Sales…)',
      'Deployment to Vercel + Supabase walkthrough',
      'Revenue optimization frameworks',
    ],
    includes: ['Blueprint PDF', 'Agent Prompt Pack', 'Video Course', '30-day Email Support'],
    badge: 'New',
  },
  {
    id: 'ecommerce-starter-pack',
    name: 'Global E-Commerce Starter Pack',
    tagline: 'Launch a profitable online store in 7 days',
    description: 'Everything you need to launch and scale a profitable online store. Covers product research, regional pricing strategies, SEO optimization, and viral marketing scripts for TikTok and Instagram. Includes the exact system that generated $10k in the first 90 days.',
    price: 19,
    originalPrice: 39,
    category: 'E-Commerce',
    tags: ['ecommerce', 'startup', 'seo', 'marketing', 'tiktok'],
    emoji: '🌍',
    gradient: 'from-emerald-400 to-teal-600',
    features: [
      'Product research templates + winner criteria',
      'Regional pricing formula (USD, EUR, GBP, INR)',
      'TikTok + Instagram viral script frameworks',
      'SEO checklist with 100-point audit',
    ],
    includes: ['Starter Pack PDF', 'Marketing Script Templates', 'SEO Checklist', 'Pricing Calculator'],
  },
  {
    id: 'ai-copywriting-mastery',
    name: 'AI Copywriting Mastery Kit',
    tagline: 'Write ads, emails & sales pages that actually convert',
    description: 'Master the art of AI-powered copywriting with 30 proven frameworks. From Facebook ads to sales pages, email sequences to TikTok hooks — this kit covers every format. Backed by analysis of 10,000+ high-converting copy examples to extract what actually works.',
    price: 37,
    originalPrice: 74,
    category: 'Copywriting',
    tags: ['copywriting', 'marketing', 'ads', 'email', 'sales'],
    emoji: '✍️',
    gradient: 'from-orange-400 to-rose-600',
    features: [
      '30 copy frameworks (AIDA, PAS, FAB, PASTOR…)',
      'AI prompt system for any copy format',
      'Swipe file of 200+ winning headlines',
      'Email sequence templates (welcome, sales, upsell)',
    ],
    includes: ['Mastery Kit PDF', 'Swipe File', 'Copy Prompt Pack', 'Bonus: Landing Page Templates'],
    badge: 'Hot',
  },
  {
    id: 'social-media-ai-system',
    name: 'Social Media AI System',
    tagline: 'Automate your entire social presence with AI',
    description: 'A complete system for automating social media content across TikTok, Instagram, X, and LinkedIn using AI. Includes content calendars, caption generators, hook formulas, and engagement automation strategies. Create 30 days of content in under 2 hours.',
    price: 24,
    originalPrice: 48,
    category: 'Social Media',
    tags: ['social-media', 'tiktok', 'instagram', 'content', 'automation'],
    emoji: '📱',
    gradient: 'from-pink-400 to-fuchsia-600',
    features: [
      '30-day content calendar templates',
      'Platform-specific hook formulas (TikTok, IG, LinkedIn)',
      'Caption generator prompt system',
      'Hashtag research & strategy guide',
    ],
    includes: ['System PDF', 'Content Calendar', 'Caption Prompts', 'Hashtag Database'],
  },
  {
    id: 'passive-income-accelerator',
    name: 'Passive Income Accelerator',
    tagline: 'Build multiple income streams using AI — in 30 days',
    description: 'The ultimate guide to building passive income streams using AI tools. Covers digital products, affiliate marketing, AI content sites, and automated service businesses. Includes real case studies, revenue breakdowns, and the exact tech stack used to generate $5k+/month passively.',
    price: 44,
    originalPrice: 88,
    category: 'Income',
    tags: ['passive-income', 'affiliate', 'digital-products', 'freedom', 'ai'],
    emoji: '💰',
    gradient: 'from-yellow-400 to-amber-600',
    features: [
      '6 passive income models with AI automation',
      'Affiliate marketing setup + top programs list',
      'Digital product creation system',
      'Automated content site blueprint',
    ],
    includes: ['Accelerator Guide', 'Income Tracker Spreadsheet', 'Affiliate Resource List', 'Monthly Strategy Call'],
    badge: 'Premium',
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category)
}

export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))]
