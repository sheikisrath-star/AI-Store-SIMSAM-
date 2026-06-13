// ═══════════════════════════════════════════════════════════════════════════
// VerdaSync AI — Product Catalog
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
    id: 'verdaprompt-enterprise-core',
    name: 'VerdaPrompt: Enterprise Sustainability Core',
    tagline: 'Deploy 500+ AI prompt frameworks engineered for ESG reporting, carbon disclosure, and net-zero strategy execution.',
    description: 'VerdaPrompt is the definitive AI prompt intelligence suite for sustainability executives and ESG analysts. Built on analysis of 10,000+ corporate sustainability reports, it delivers pre-engineered prompt chains for TCFD disclosures, GRI standards, CDP submissions, and Scope 1-2-3 carbon narratives. Trusted by enterprise sustainability teams across 40+ countries to accelerate reporting cycles by 70%.',
    price: 297,
    originalPrice: 597,
    category: 'Green AI Core',
    tags: ['ai', 'esg', 'sustainability', 'prompts', 'carbon'],
    emoji: '🌿',
    gradient: 'from-emerald-400 to-green-600',
    features: [
      '500+ ESG-calibrated AI prompt frameworks (TCFD, GRI, CDP, SASB)',
      'Scope 1, 2 & 3 carbon narrative generation system',
      'Net-zero strategy roadmap builder with AI assistance',
      'Quarterly updates aligned with global sustainability standards',
    ],
    includes: ['Enterprise Prompt Library', 'ESG Reporting Templates', 'TCFD Disclosure Pack', 'Priority Support Access'],
    badge: 'Best Seller',
  },
  {
    id: 'verdacapital-green-blueprint',
    name: 'VerdaCapital: Sustainable Revenue Blueprint',
    tagline: 'A proven B2B framework for monetizing green technology assets and building climate-positive recurring revenue streams.',
    description: 'VerdaCapital provides corporate strategists and impact investors with the complete playbook for generating sustainable passive income through green technology ventures. Covers carbon credit monetization, ESG-linked SaaS models, renewable energy licensing, and green bond structuring. Includes real case studies from firms generating $500k+ annually through climate-aligned revenue models.',
    price: 497,
    originalPrice: 997,
    category: 'Sustainable Capital',
    tags: ['investment', 'carbon-credits', 'green-bonds', 'saas', 'revenue'],
    emoji: '💹',
    gradient: 'from-teal-400 to-cyan-600',
    features: [
      'Carbon credit monetization framework with market analysis',
      'ESG-linked SaaS pricing models for enterprise clients',
      'Green bond structuring guide with compliance checklist',
      'Renewable energy licensing revenue playbook',
    ],
    includes: ['Blueprint PDF (220 pages)', 'Revenue Projection Model', 'Carbon Credit Calculator', '60-day Advisory Access'],
    badge: 'Premium',
  },
  {
    id: 'verdadesign-eco-brand-suite',
    name: 'VerdaDesign: Eco-Brand Digital Asset Suite',
    tagline: 'Enterprise-grade sustainability branding toolkit with 1,200+ green-certified design assets for global B2B communications.',
    description: 'VerdaDesign delivers a comprehensive library of professional design assets purpose-built for green technology companies and sustainability-driven enterprises. Includes corporate identity templates, ESG report layouts, sustainability campaign graphics, green certification badge systems, and investor presentation decks. All assets comply with global accessibility standards and sustainable design principles.',
    price: 247,
    originalPrice: 497,
    category: 'Eco-Design',
    tags: ['design', 'branding', 'esg', 'templates', 'sustainability'],
    emoji: '🎨',
    gradient: 'from-lime-400 to-emerald-600',
    features: [
      '1,200+ professionally designed sustainability brand assets',
      'ESG annual report templates (TCFD & GRI aligned)',
      'Investor presentation decks for green-tech fundraising',
      'Sustainability campaign social media graphics suite',
    ],
    includes: ['Design Asset Library', 'ESG Report Templates', 'Brand Identity Pack', 'Investor Deck Templates'],
    badge: 'New',
  },
  {
    id: 'verdachain-carbon-intelligence',
    name: 'VerdaChain: Supply Chain Carbon Intelligence Platform',
    tagline: 'Map, measure, and reduce Scope 3 supply chain emissions with enterprise-grade carbon tracking frameworks.',
    description: 'VerdaChain is the definitive operational framework for enterprises seeking full supply chain carbon transparency. Provides structured methodologies for Scope 3 emission mapping, supplier carbon auditing, logistics decarbonization modeling, and circular economy transition planning. Includes industry-specific carbon calculation templates for manufacturing, retail, logistics, and technology sectors.',
    price: 597,
    originalPrice: 1197,
    category: 'Supply Chain',
    tags: ['supply-chain', 'scope3', 'carbon', 'logistics', 'audit'],
    emoji: '🔗',
    gradient: 'from-blue-400 to-indigo-600',
    features: [
      'Scope 3 supplier emission mapping methodology',
      'Carbon audit framework for 15+ industry sectors',
      'Logistics decarbonization modeling toolkit',
      'Circular economy transition planning templates',
    ],
    includes: ['Carbon Intelligence Framework', 'Supplier Audit Templates', 'Emission Calculators', 'Sector Benchmarking Data'],
    badge: 'Enterprise',
  },
  {
    id: 'verdareport-esg-automation',
    name: 'VerdaReport: ESG Compliance Automation System',
    tagline: 'Automate enterprise ESG disclosures, sustainability narratives, and regulatory compliance reports using AI.',
    description: 'VerdaReport eliminates the manual burden of ESG reporting by providing AI-powered automation frameworks for all major disclosure standards. Generate CSRD-compliant reports, CDP submissions, GRI indexes, and TCFD disclosures at fraction of the traditional cost and time. Trusted by compliance teams managing multi-jurisdiction sustainability obligations across Fortune 1000 portfolios.',
    price: 447,
    originalPrice: 897,
    category: 'ESG Reporting',
    tags: ['esg', 'compliance', 'reporting', 'csrd', 'automation'],
    emoji: '📊',
    gradient: 'from-violet-400 to-purple-600',
    features: [
      'CSRD, GRI, TCFD & CDP automated report generation',
      'AI narrative engine for sustainability storytelling',
      'Multi-jurisdiction compliance checklist system',
      'Stakeholder-specific ESG communication templates',
    ],
    includes: ['Automation Framework PDF', 'Report Templates Suite', 'Compliance Checklists', 'AI Prompt System'],
    badge: 'Hot',
  },
  {
    id: 'verdamedia-green-content-engine',
    name: 'VerdaMedia: Green Content Automation Engine',
    tagline: 'Produce high-impact sustainability video and media campaigns at enterprise scale using AI-powered content systems.',
    description: 'VerdaMedia provides B2B sustainability teams with a complete AI-driven content production system for green campaigns, ESG investor communications, and corporate sustainability storytelling. Includes faceless video production workflows, AI voiceover scripts for sustainability webinars, animated data visualization templates, and multi-platform content distribution strategies optimized for ESG audiences.',
    price: 347,
    originalPrice: 697,
    category: 'Green Media',
    tags: ['video', 'content', 'media', 'sustainability', 'marketing'],
    emoji: '🎬',
    gradient: 'from-rose-400 to-pink-600',
    features: [
      'AI sustainability video production workflow (no camera needed)',
      'ESG investor communication script frameworks',
      'Animated carbon data visualization templates',
      'Multi-platform green content distribution strategy',
    ],
    includes: ['Media Production Guide', 'Script Templates', 'Data Viz Templates', 'Distribution Strategy PDF'],
  },
  {
    id: 'verdacommerce-green-saas',
    name: 'VerdaCommerce: Eco-Commerce Enterprise Masterclass',
    tagline: 'Launch and scale a carbon-neutral digital commerce operation generating $50k+ monthly recurring revenue.',
    description: 'VerdaCommerce is the comprehensive enterprise playbook for building and scaling a profitable eco-commerce SaaS business. Covers green product strategy, sustainable supply chain integration, carbon-neutral shipping frameworks, ESG-compliant payment processing, and global green market entry strategies. Includes case studies from eco-commerce companies scaling from zero to $1M ARR within 18 months.',
    price: 597,
    originalPrice: 1197,
    category: 'Eco-Commerce',
    tags: ['ecommerce', 'saas', 'sustainability', 'green', 'revenue'],
    emoji: '🌍',
    gradient: 'from-green-400 to-teal-600',
    features: [
      'Carbon-neutral commerce infrastructure framework',
      'Sustainable supplier vetting and onboarding system',
      'Green market entry strategy for 12 global regions',
      'ESG-compliant payment and logistics integration guide',
    ],
    includes: ['Masterclass PDF (250 pages)', 'Market Entry Templates', 'Supplier Database', 'Revenue Model Calculator'],
    badge: 'Best Seller',
  },
  {
    id: 'verdaos-operations-intelligence',
    name: 'VerdaOS: Enterprise Green Operations Intelligence System',
    tagline: 'The all-in-one operational command system for managing sustainability KPIs, projects, and team performance.',
    description: 'VerdaOS is a comprehensive Notion-based operations management system engineered for sustainability-driven enterprises. Manage ESG project portfolios, track carbon reduction KPIs, coordinate cross-functional sustainability teams, monitor regulatory deadlines, and produce executive board reports — all from a single unified intelligence dashboard. Used by sustainability directors managing $50M+ green transformation programs.',
    price: 197,
    originalPrice: 397,
    category: 'Operations',
    tags: ['operations', 'notion', 'management', 'kpi', 'sustainability'],
    emoji: '⚙️',
    gradient: 'from-slate-400 to-slate-700',
    features: [
      'ESG project portfolio management dashboard',
      'Carbon KPI tracking with automated progress reporting',
      'Sustainability team coordination and task management',
      'Board-ready ESG performance report generator',
    ],
    includes: ['Notion OS Template', 'KPI Dashboard', 'Setup Video Guide', 'Board Report Templates'],
  },
  {
    id: 'verdarreach-green-marketing',
    name: 'VerdaReach: Green Digital Marketing Intelligence Suite',
    tagline: 'Drive enterprise-scale demand for sustainability solutions with data-driven green marketing frameworks.',
    description: 'VerdaReach delivers the complete B2B digital marketing system for green technology companies seeking to acquire enterprise clients globally. Covers sustainability SEO strategy, LinkedIn thought leadership systems, green content marketing frameworks, ESG conference positioning, and Account-Based Marketing (ABM) playbooks for targeting Fortune 500 sustainability buyers.',
    price: 347,
    originalPrice: 697,
    category: 'Green Marketing',
    tags: ['marketing', 'seo', 'linkedin', 'abm', 'b2b'],
    emoji: '📡',
    gradient: 'from-sky-400 to-blue-600',
    features: [
      'Sustainability SEO framework targeting 500+ green keywords',
      'LinkedIn ABM system for enterprise sustainability buyers',
      'ESG thought leadership content calendar (12 months)',
      'Green conference and partnership positioning guide',
    ],
    includes: ['Marketing Intelligence Suite', 'SEO Keyword Database', 'LinkedIn Templates', 'ABM Playbook'],
    badge: 'New',
  },
  {
    id: 'verdachain-web3-audit',
    name: 'VerdaChain Web3: Green Smart Contract Audit Framework',
    tagline: 'Audit, validate, and deploy energy-efficient smart contracts and tokenized carbon credit instruments.',
    description: 'VerdaChain Web3 provides enterprise legal, compliance, and technology teams with the definitive framework for auditing and deploying green blockchain solutions. Covers energy-efficient consensus mechanism evaluation, carbon credit tokenization (REC tokens, carbon NFTs), DeFi green yield protocols, and regulatory compliance for Web3 sustainability instruments across EU, US, and APAC jurisdictions.',
    price: 447,
    originalPrice: 897,
    category: 'Green Web3',
    tags: ['web3', 'blockchain', 'carbon-tokens', 'audit', 'defi'],
    emoji: '🔐',
    gradient: 'from-amber-400 to-orange-600',
    features: [
      'Smart contract energy efficiency audit methodology',
      'Carbon credit tokenization (REC & carbon NFT) frameworks',
      'Green DeFi protocol evaluation and risk assessment',
      'Multi-jurisdiction Web3 sustainability compliance guide',
    ],
    includes: ['Audit Framework PDF', 'Smart Contract Templates', 'Compliance Checklist', 'Token Design Guide'],
  },
  {
    id: 'verdatalent-greentech-hr',
    name: 'VerdaTalent: Green-Tech Professional HR Asset Pack',
    tagline: 'Attract, assess, and retain world-class sustainability talent with enterprise-grade green-tech HR frameworks.',
    description: 'VerdaTalent equips HR directors and talent acquisition teams with specialized tools for building high-performance sustainability and green technology teams. Includes ATS-optimized CV templates for 20+ green-tech roles, competency-based interview frameworks for ESG specialists, sustainability leadership assessment tools, and DEI-inclusive hiring guides aligned with international green workforce standards.',
    price: 147,
    originalPrice: 297,
    category: 'Green HR',
    tags: ['hr', 'talent', 'recruitment', 'sustainability', 'career'],
    emoji: '🌱',
    gradient: 'from-emerald-300 to-green-500',
    features: [
      '20+ ATS-optimized CV templates for green-tech roles',
      'Competency interview frameworks for ESG specialists',
      'Sustainability leadership assessment toolkit',
      'DEI-inclusive hiring guide for green workforce',
    ],
    includes: ['CV Template Pack', 'Interview Frameworks', 'Assessment Tools', 'DEI Hiring Guide'],
    badge: 'New',
  },
  {
    id: 'verdalaunch-microsaas-accelerator',
    name: 'VerdaLaunch: Sustainable Micro-SaaS Accelerator',
    tagline: 'Build and scale a profitable climate-tech Micro-SaaS to $10k MRR in 90 days with proven go-to-market frameworks.',
    description: 'VerdaLaunch is the definitive accelerator program for entrepreneurs and intrapreneurs building sustainable technology micro-businesses. Covers climate-tech product ideation, MVP development frameworks, enterprise sales strategies for sustainability buyers, green startup funding pathways, and impact measurement systems. Includes access to a network of 200+ climate-tech investors and enterprise pilot program partners.',
    price: 397,
    originalPrice: 797,
    category: 'CleanTech Startup',
    tags: ['startup', 'saas', 'climate-tech', 'funding', 'accelerator'],
    emoji: '🚀',
    gradient: 'from-purple-400 to-violet-600',
    features: [
      'Climate-tech product ideation and validation framework',
      'Enterprise sales playbook for sustainability decision-makers',
      'Green startup funding pathways (grants, VCs, impact investors)',
      'Impact measurement and reporting system for investors',
    ],
    includes: ['Accelerator Playbook', 'Investor Pitch Templates', 'Funding Database', 'Impact Metrics Framework'],
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
