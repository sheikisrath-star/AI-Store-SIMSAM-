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
    id: 'chatgpt-mega-prompt-pack',
    name: 'ChatGPT Mega Prompt Pack',
    tagline: '500+ expert prompts for every task imaginable',
    description: 'The most comprehensive ChatGPT prompt library available. 500+ expertly crafted prompts across business, marketing, coding, writing, education, and personal productivity. Stop wasting time writing prompts from scratch — copy, paste, and get professional results instantly. Used by 10,000+ professionals worldwide.',
    price: 19,
    originalPrice: 49,
    category: 'AI Tools',
    tags: ['chatgpt', 'prompts', 'ai', 'productivity', 'writing'],
    emoji: '🤖',
    gradient: 'from-sky-400 to-blue-600',
    features: [
      '500+ copy-paste ready prompts across 20 categories',
      'Business, marketing, coding, writing & education prompts',
      'Advanced chaining techniques for complex tasks',
      'Lifetime updates as AI models evolve',
    ],
    includes: ['Prompt Library PDF', 'Notion Template', 'Quick Reference Card', 'Bonus: Image Prompt Pack'],
    badge: 'Best Seller',
  },
  {
    id: 'passive-income-blueprint',
    name: 'Passive Income Blueprint 2025',
    tagline: 'Build $3,000/month in passive income with AI',
    description: 'The complete proven system for building multiple passive income streams using AI tools. Covers digital products, affiliate marketing, AI content sites, faceless YouTube, and print-on-demand. Includes real case studies with actual revenue screenshots and the exact step-by-step process to replicate results.',
    price: 47,
    originalPrice: 97,
    category: 'Business',
    tags: ['passive-income', 'business', 'ai', 'affiliate', 'freedom'],
    emoji: '💰',
    gradient: 'from-yellow-400 to-amber-600',
    features: [
      '7 proven passive income models for 2025',
      'Step-by-step setup guide for each income stream',
      'Real case studies with revenue proof',
      'AI automation tools to run everything on autopilot',
    ],
    includes: ['Blueprint PDF (180 pages)', 'Income Tracker Spreadsheet', 'Resource List', '30-day Email Support'],
    badge: 'Hot',
  },
  {
    id: 'canva-social-media-bundle',
    name: 'Canva Social Media Mega Bundle',
    tagline: '1,000+ professional templates for all platforms',
    description: 'Instantly create stunning social media content with 1,000+ fully customizable Canva templates. Covers Instagram posts, stories, reels covers, TikTok thumbnails, Facebook banners, LinkedIn posts, YouTube thumbnails, and Pinterest pins. All templates are editable, on-brand, and designed to maximize engagement.',
    price: 27,
    originalPrice: 67,
    category: 'Design',
    tags: ['canva', 'templates', 'social-media', 'design', 'instagram'],
    emoji: '🎨',
    gradient: 'from-pink-400 to-fuchsia-600',
    features: [
      '1,000+ Canva templates across all platforms',
      'Instagram, TikTok, YouTube, LinkedIn & Pinterest',
      'Fully editable colors, fonts, and images',
      'New templates added monthly',
    ],
    includes: ['Template Access Link', 'Brand Kit Guide', 'Content Strategy PDF', 'Hashtag Research Sheet'],
    badge: 'New',
  },
  {
    id: 'freelancer-client-kit',
    name: 'Freelancer Client Acquisition Kit',
    tagline: 'Land high-paying clients on autopilot',
    description: 'The complete system for freelancers to find, pitch, and close high-paying clients consistently. Includes proven cold email templates, LinkedIn outreach scripts, portfolio templates, proposal frameworks, and rate negotiation scripts. Land your first $1,000 client within 30 days or your money back.',
    price: 37,
    originalPrice: 77,
    category: 'Freelancing',
    tags: ['freelancing', 'clients', 'business', 'email', 'linkedin'],
    emoji: '💼',
    gradient: 'from-emerald-400 to-teal-600',
    features: [
      '50+ cold email templates with 40%+ open rates',
      'LinkedIn outreach scripts that get responses',
      'Proposal template that closes 3x more deals',
      'Rate negotiation scripts to charge what you\'re worth',
    ],
    includes: ['Client Kit PDF', 'Email Templates', 'Proposal Template', 'Contract Template'],
  },
  {
    id: 'ai-copywriting-system',
    name: 'AI Copywriting System',
    tagline: 'Write converting ads, emails & sales pages in minutes',
    description: 'Master AI-powered copywriting with 30 battle-tested frameworks used by top marketers. Write Facebook ads, Google ads, sales pages, email sequences, and TikTok scripts that convert. Includes a complete AI prompt system that generates professional copy in any format within seconds.',
    price: 34,
    originalPrice: 69,
    category: 'Marketing',
    tags: ['copywriting', 'marketing', 'ads', 'email', 'sales'],
    emoji: '✍️',
    gradient: 'from-orange-400 to-rose-600',
    features: [
      '30 proven copy frameworks (AIDA, PAS, PASTOR & more)',
      'AI prompt system for any copy format',
      '200+ winning headline swipe file',
      'Email sequence templates (welcome, nurture, sales)',
    ],
    includes: ['Copywriting Guide', 'Swipe File', 'AI Prompt Pack', 'Bonus: Landing Page Templates'],
    badge: 'Hot',
  },
  {
    id: 'youtube-automation-blueprint',
    name: 'Faceless YouTube Automation Blueprint',
    tagline: 'Build a $5k/month YouTube channel without showing your face',
    description: 'The complete A-Z guide to building a profitable faceless YouTube channel using AI tools. Learn how to find viral niches, create AI-generated videos, automate uploads, and monetize through AdSense, sponsorships, and affiliate marketing. Includes real channel examples earning $3k-$15k per month.',
    price: 49,
    originalPrice: 99,
    category: 'Business',
    tags: ['youtube', 'automation', 'passive-income', 'video', 'ai'],
    emoji: '🎬',
    gradient: 'from-red-400 to-rose-600',
    features: [
      'Niche research system to find $10k/month opportunities',
      'AI video creation workflow (no face, no voice needed)',
      'SEO optimization to rank in YouTube search',
      'Monetization strategies beyond AdSense',
    ],
    includes: ['Blueprint PDF', 'Niche Research Sheet', 'Script Templates', 'Thumbnail Templates'],
    badge: 'Premium',
  },
  {
    id: 'shopify-dropshipping-masterclass',
    name: 'Shopify Dropshipping Masterclass',
    tagline: 'Launch a $10k/month dropshipping store from scratch',
    description: 'The most up-to-date dropshipping course for 2025. Covers winning product research, Shopify store setup, Facebook and TikTok ads, supplier negotiation, and scaling to 6 figures. Includes access to a private supplier database and weekly live Q&A sessions.',
    price: 67,
    originalPrice: 147,
    category: 'E-Commerce',
    tags: ['shopify', 'dropshipping', 'ecommerce', 'ads', 'business'],
    emoji: '🛍️',
    gradient: 'from-green-400 to-emerald-600',
    features: [
      'Product research method to find winners before they go viral',
      'Complete Shopify store setup walkthrough',
      'Facebook & TikTok ads system for consistent ROAS',
      'Supplier database with 500+ verified suppliers',
    ],
    includes: ['Video Course', 'Supplier Database', 'Ad Templates', 'Weekly Q&A Access'],
    badge: 'Best Seller',
  },
  {
    id: 'notion-life-os',
    name: 'Ultimate Notion Life OS',
    tagline: 'The all-in-one life management system in Notion',
    description: 'A beautifully designed Notion template that manages your entire life — goals, habits, finances, projects, health, and personal CRM. Used by productivity enthusiasts in 50+ countries. Stop juggling multiple apps and run your entire personal and professional life from one dashboard.',
    price: 22,
    originalPrice: 47,
    category: 'Productivity',
    tags: ['notion', 'productivity', 'templates', 'organization', 'planning'],
    emoji: '📋',
    gradient: 'from-slate-400 to-slate-700',
    features: [
      'Goal tracking with progress visualization',
      'Habit tracker with streak system',
      'Personal finance dashboard with budget tracking',
      'Project management with Kanban boards',
    ],
    includes: ['Notion Template', 'Setup Video Guide', 'Quick Start PDF', 'Monthly Review Template'],
  },
  {
    id: 'digital-marketing-toolkit',
    name: 'Complete Digital Marketing Toolkit',
    tagline: 'Everything you need to market any business online',
    description: 'A comprehensive toolkit covering every aspect of digital marketing. Includes SEO checklists, Google Ads templates, Facebook ad frameworks, email marketing sequences, content marketing calendars, and analytics dashboards. Whether you\'re a freelancer or business owner, this toolkit covers everything.',
    price: 39,
    originalPrice: 79,
    category: 'Marketing',
    tags: ['marketing', 'seo', 'ads', 'email', 'social-media'],
    emoji: '📊',
    gradient: 'from-blue-400 to-indigo-600',
    features: [
      '100-point SEO audit checklist',
      'Google & Facebook ad copy templates',
      '12-month content marketing calendar',
      'Email marketing automation sequences',
    ],
    includes: ['Toolkit PDF', 'Ad Templates', 'SEO Checklist', 'Analytics Dashboard Template'],
  },
  {
    id: 'web3-crypto-starter-guide',
    name: 'Web3 & Crypto Starter Guide',
    tagline: 'Navigate crypto, NFTs and Web3 safely and profitably',
    description: 'The beginner-friendly guide to understanding and profiting from Web3, crypto, and blockchain technology. Covers wallet setup, DeFi basics, NFT trading, crypto tax strategies, and how to identify scams. Written in plain English with step-by-step instructions for complete beginners.',
    price: 29,
    originalPrice: 59,
    category: 'Finance',
    tags: ['crypto', 'web3', 'nft', 'blockchain', 'investing'],
    emoji: '₿',
    gradient: 'from-orange-400 to-yellow-500',
    features: [
      'Safe wallet setup and security best practices',
      'DeFi yield strategies for passive crypto income',
      'NFT evaluation framework to spot winners',
      'Crypto tax guide to stay compliant',
    ],
    includes: ['Starter Guide PDF', 'Security Checklist', 'DeFi Strategy Sheet', 'Tax Template'],
  },
  {
    id: 'resume-cv-pack',
    name: 'Professional Resume & CV Pack',
    tagline: 'Land interviews at top companies worldwide',
    description: 'A collection of 25 ATS-optimized resume and CV templates designed by hiring managers from Fortune 500 companies. Each template is crafted to pass automated screening systems and impress human recruiters. Includes cover letter templates, LinkedIn profile optimization guide, and interview preparation checklist.',
    price: 17,
    originalPrice: 37,
    category: 'Career',
    tags: ['resume', 'cv', 'career', 'jobs', 'templates'],
    emoji: '📄',
    gradient: 'from-teal-400 to-cyan-600',
    features: [
      '25 ATS-optimized resume templates',
      '10 cover letter templates for different industries',
      'LinkedIn profile optimization guide',
      'Interview preparation checklist with 100 questions',
    ],
    includes: ['Resume Templates (Word & PDF)', 'Cover Letter Templates', 'LinkedIn Guide', 'Interview Prep PDF'],
    badge: 'New',
  },
  {
    id: 'ai-side-hustle-masterplan',
    name: 'AI Side Hustle Masterplan',
    tagline: 'Make your first $1,000 online using AI tools',
    description: 'The fastest path to making money online using AI in 2025. Covers 10 proven AI side hustles that require zero experience: AI content writing, AI graphic design, AI video editing, AI chatbot building, and more. Includes step-by-step setup guides and real earnings proof from beginners.',
    price: 25,
    originalPrice: 55,
    category: 'AI Tools',
    tags: ['side-hustle', 'ai', 'money', 'freelancing', 'online-income'],
    emoji: '🚀',
    gradient: 'from-violet-400 to-purple-600',
    features: [
      '10 AI side hustles you can start today',
      'Beginner-friendly setup guides for each hustle',
      'Platform-by-platform client finding strategy',
      'Pricing guide to charge premium rates',
    ],
    includes: ['Masterplan PDF', 'Platform Directory', 'Pricing Calculator', 'Script Templates'],
    badge: 'Hot',
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category)
}

export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)))
