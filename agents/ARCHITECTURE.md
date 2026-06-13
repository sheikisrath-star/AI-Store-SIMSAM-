# VerdaSync AI — Multi-Agent Enterprise Platform
## System Architecture v1.0

---

## 1. EXECUTIVE OVERVIEW

```
┌──────────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATION LAYER                              │
│              MultiAgentOrchestrator (Event-Driven Bus)               │
│         [Workflow Engine · Message Router · State Manager]           │
└────────────────┬──────────────────┬───────────────────┬─────────────┘
                 │                  │                   │
      ┌──────────▼──────┐  ┌────────▼────────┐  ┌──────▼──────────┐
      │  GRRA           │  │   VMA           │  │   RMA           │
      │  Government     │  │   Vendor        │  │   Revenue       │
      │  Relations &    │  │   Management    │  │   Management    │
      │  Registration   │  │   Agent         │  │   Agent         │
      │  Agent          │  │                 │  │                 │
      │─────────────────│  │─────────────────│  │─────────────────│
      │ · Country Law DB│  │ · Vendor KYC    │  │ · FX Engine     │
      │ · Doc Generator │  │ · SLA Monitor   │  │ · Tax Logic     │
      │ · Compliance Cal│  │ · Contract Gen  │  │ · Split Payments│
      │ · License Audit │  │ · Scoring Engine│  │ · Payout Router │
      └────────┬────────┘  └────────┬────────┘  └──────┬──────────┘
               │                   │                   │
      ┌────────▼───────────────────▼───────────────────▼──────────┐
      │                    SHARED DATA LAYER                       │
      │   VendorRegistry · ComplianceDB · FinancialLedger          │
      │   MessageBus · WorkflowStateStore · AuditLog               │
      └────────────────────────────────────────────────────────────┘
```

---

## 2. AGENT SPECIFICATIONS

### 2.1 GRRA — Government Relations & Registration Agent
| Field            | Value                                                       |
|------------------|-------------------------------------------------------------|
| Persona          | International Corporate Attorney & Cross-Border Expert      |
| Model            | claude-opus-4                                               |
| Priority         | FIRST in vendor-onboarding workflow                         |
| Timeout          | 120s per country lookup                                     |
| Escalation       | Human review if law DB confidence < 80%                     |

**Tools:**
- `lookup_country_requirements(country, business_type)` — queries law database
- `generate_incorporation_docs(vendor_profile, country_data)` — drafts legal docs
- `build_compliance_calendar(country, entity_type)` — annual filing schedule
- `validate_tax_id(tax_id, country)` — verifies government-issued IDs
- `check_sanctions_list(vendor_name, country)` — OFAC / EU sanctions screen

**Country Coverage Matrix:**
```
Region          | Registration | Tax Filing | GDPR/Privacy | Sanctions
----------------|-------------|------------|--------------|----------
EU (27 states)  |     ✓       |     ✓      |      ✓       |    ✓
USA (50 states) |     ✓       |     ✓      |      ✓       |    ✓
APAC (12 mkts)  |     ✓       |     ✓      |      ✓       |    ✓
MENA (8 mkts)   |     ✓       |     ✓      |      ✗       |    ✓
LAC (6 mkts)    |     ✓       |     ✓      |      ✗       |    ✓
Sri Lanka       |     ✓       |     ✓      |      ✓       |    ✓
```

---

### 2.2 VMA — Vendor Management Agent
| Field            | Value                                                       |
|------------------|-------------------------------------------------------------|
| Persona          | Global Logistics & Technology Procurement Director          |
| Model            | claude-sonnet-4                                             |
| Priority         | SECOND — awaits GRRA legal greenlight                       |
| Timeout          | 60s per vendor profile creation                             |
| Escalation       | Manual review if KPI score < 60 / 100                       |

**Tools:**
- `create_vendor_profile(vendor_data, legal_clearance)` — full profile setup
- `generate_vendor_agreement(vendor_profile, country_rules)` — contract drafting
- `run_background_check(vendor_id)` — automated KYC/AML verification
- `calculate_performance_score(delivery, responsiveness, price)` — scoring
- `assign_vendor_tier(score)` — Global Enterprise | Regional | Local Supplier
- `route_order_type(vendor_type, order)` — digital vs physical routing logic

**Vendor Classification:**
```
Tier 1 — Global Enterprise  (score 85–100): International SaaS/Tech vendors
Tier 2 — Regional Partner   (score 70–84):  Cross-border logistics & services
Tier 3 — Local Supplier     (score 55–69):  Country-specific on-ground vendors
Tier 4 — Probationary       (score < 55):   New/unverified, limited access
```

---

### 2.3 RMA — Revenue Management Agent
| Field            | Value                                                       |
|------------------|-------------------------------------------------------------|
| Persona          | International CFO & FinTech Smart-Contract Auditor          |
| Model            | claude-sonnet-4                                             |
| Priority         | THIRD — finalises after VMA profile is active               |
| Timeout          | 30s per payout configuration                                |
| Escalation       | Compliance officer alert if tax withholding > $10,000/month |

**Tools:**
- `configure_payout_routing(vendor_id, country, banking_rails)` — payment setup
- `compute_platform_split(sale_amount, vendor_tier)` — commission calculation
- `calculate_fx_conversion(amount, from_currency, to_currency)` — live FX
- `apply_tax_withholding(vendor_country, buyer_country, amount)` — tax logic
- `generate_tax_invoice(transaction, tax_breakdown)` — compliant invoice
- `audit_monthly_revenue(vendor_id, period)` — P&L reconciliation

**Commission Structure:**
```
Tier 1 Global Enterprise:  Platform 8%  | Vendor 92%
Tier 2 Regional Partner:   Platform 12% | Vendor 88%
Tier 3 Local Supplier:     Platform 15% | Vendor 85%
Tier 4 Probationary:       Platform 20% | Vendor 80%
```

**Tax Logic Matrix:**
```
Scenario                    | Tax Rule Applied
---------------------------|------------------------------------------
Buyer & Vendor same country | Local VAT/GST standard rate
B2B cross-border EU         | Reverse charge mechanism (VAT exempt)
B2C cross-border EU         | Destination country VAT rate
US interstate               | Nexus-based sales tax (state-specific)
US international            | No US sales tax, possible withholding
Sri Lanka domestic          | 18% VAT (NBT 2%)
Sri Lanka → Global          | Export exemption + WHT treaty lookup
```

---

## 3. COLLABORATIVE WORKFLOW — VENDOR ONBOARDING

```
TRIGGER: New vendor submits registration form
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 1: GRRA — Legal & Compliance Audit  (T+0 to T+2m)│
├─────────────────────────────────────────────────────────┤
│  1.1 Lookup country registration requirements            │
│  1.2 Screen vendor against sanctions lists               │
│  1.3 Validate tax identification numbers                 │
│  1.4 Generate compliance calendar & required documents   │
│  1.5 Issue LEGAL_GREENLIGHT or LEGAL_BLOCK signal        │
└──────────────────────────┬──────────────────────────────┘
                           │ LEGAL_GREENLIGHT
                           ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 2: VMA — Vendor Profile & Agreement (T+2m to T+5m)│
├─────────────────────────────────────────────────────────┤
│  2.1 Create vendor profile with legal clearance attached │
│  2.2 Run automated KYC/AML background check              │
│  2.3 Assign vendor tier based on score                   │
│  2.4 Generate localized digital vendor agreement         │
│  2.5 Emit VENDOR_PROFILE_ACTIVE signal to RMA            │
└──────────────────────────┬──────────────────────────────┘
                           │ VENDOR_PROFILE_ACTIVE
                           ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 3: RMA — Financial Config & Payout Setup(T+5m-T+8m│
├─────────────────────────────────────────────────────────┤
│  3.1 Configure regional banking rails (PayHere/Stripe)   │
│  3.2 Apply commission split based on vendor tier         │
│  3.3 Configure tax withholding rules by country pair     │
│  3.4 Set up FX conversion for non-LKR currencies         │
│  3.5 Emit VENDOR_FULLY_ONBOARDED → Platform Notified     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
              ✅ VENDOR ACTIVE ON PLATFORM
```

---

## 4. MESSAGE PROTOCOL

All inter-agent messages follow this schema:
```json
{
  "id": "uuid-v4",
  "workflow_id": "WF-2025-001234",
  "sender": "GRRA | VMA | RMA | ORCHESTRATOR",
  "recipient": "GRRA | VMA | RMA | ORCHESTRATOR | BROADCAST",
  "type": "REQUEST | RESPONSE | EVENT | ESCALATION | ERROR",
  "priority": "CRITICAL | HIGH | NORMAL | LOW",
  "payload": { ... },
  "requires_ack": true,
  "timeout_seconds": 120,
  "timestamp": "ISO-8601"
}
```

### Signal Reference:
| Signal                  | Sender | Receiver | Meaning                         |
|-------------------------|--------|----------|---------------------------------|
| `LEGAL_GREENLIGHT`      | GRRA   | VMA      | Country compliant, proceed      |
| `LEGAL_BLOCK`           | GRRA   | ORCH     | Vendor blocked, escalate human  |
| `DOCS_REQUIRED`         | GRRA   | VMA      | Extra docs needed from vendor   |
| `VENDOR_PROFILE_ACTIVE` | VMA    | RMA      | Profile ready, configure payout |
| `KYC_FAILED`            | VMA    | ORCH     | Background check failed         |
| `PAYOUT_CONFIGURED`     | RMA    | ORCH     | Banking rails live              |
| `TAX_ESCALATION`        | RMA    | ORCH     | High-value withholding alert    |
| `VENDOR_FULLY_ONBOARDED`| ORCH   | PLATFORM | End-to-end onboarding complete  |

---

## 5. DEPLOYMENT ARCHITECTURE

```
                    ┌──────────────────────┐
                    │   API Gateway        │
                    │  /api/agents/*       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  Orchestrator Service │
                    │  (FastAPI + asyncio) │
                    └──────────┬───────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
  ┌────────▼────────┐ ┌────────▼────────┐ ┌────────▼────────┐
  │  GRRA Worker    │ │  VMA Worker     │ │  RMA Worker     │
  │  (Async Task)   │ │  (Async Task)   │ │  (Async Task)   │
  └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
           │                   │                   │
  ┌────────▼───────────────────▼───────────────────▼────────┐
  │                   Anthropic Claude API                   │
  │              (claude-opus-4 / claude-sonnet-4)           │
  └──────────────────────────────────────────────────────────┘
           │                   │                   │
  ┌────────▼────────┐ ┌────────▼────────┐ ┌────────▼────────┐
  │  Law DB / APIs  │ │  KYC/AML APIs   │ │  FX/Banking APIs│
  │  (PostgreSQL)   │ │  (Jumio/Stripe) │ │  (PayHere/FX)   │
  └─────────────────┘ └─────────────────┘ └─────────────────┘
```
