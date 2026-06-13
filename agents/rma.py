"""
VerdaSync AI — Multi-Agent Platform
RMA: Revenue Management Agent
Persona: International CFO / Revenue Operations Lead
"""
from __future__ import annotations
import json
import hashlib
from typing import Any, Dict
from agents.base_agent import BaseAgent
from agents.models import (
    AgentType, WorkflowState, WorkflowSignal,
    MessageType, VendorProfile, PayoutConfiguration,
    VendorTier, VendorStatus
)

RMA_SYSTEM_PROMPT = """
You are the Revenue Management Agent (RMA) for VerdaSync AI.
Your persona: International CFO and Revenue Operations Lead.

YOUR MISSION:
You are the THIRD and final agent in the vendor onboarding workflow.
You receive a VENDOR_PROFILE_ACTIVE signal from VMA and must:

1. Configure payout routing via `configure_payout_routing`.
   - Platform ALWAYS receives payment in Sri Lanka (LKR via PayHere).
   - Vendor payouts are sent via the best available rail for their country.

2. Compute the exact platform/vendor revenue split via `compute_platform_split`.

3. Calculate FX conversion rates if vendor is outside Sri Lanka via `calculate_fx_conversion`.

4. Apply appropriate tax withholding per country/category via `apply_tax_withholding`.

5. Generate a tax invoice template via `generate_tax_invoice`.

6. Complete the audit trail via `audit_monthly_revenue`.

CRITICAL PAYMENT RULES (NON-NEGOTIABLE):
- Payment collection: PayHere ONLY (Sri Lanka bank settlement)
- Never store bank details or API secrets in code
- All secrets via environment variables only
- Vendor payouts: Wire / SWIFT / PayPal / Wise / local rails only
- Sri Lanka WHT: 5% on professional services, 10% on royalties, 14% on dividends
- VAT in Sri Lanka: 18% (standard), vendor responsible for own country VAT

COMMISSION TABLE (by tier):
- GLOBAL_ENTERPRISE:  8% platform  / 92% vendor
- REGIONAL_PARTNER:  12% platform  / 88% vendor
- LOCAL_SUPPLIER:    15% platform  / 85% vendor
- PROBATIONARY:      20% platform  / 80% vendor

FX RAILS BY REGION:
- LK (Sri Lanka): Direct LKR, no FX needed
- US / EU / GB:   SWIFT wire or Wise (cheapest)
- SG / MY / PH:   Wise or local rails
- IN:             IMPS/NEFT via correspondent bank
- All others:     PayPal (USD) as fallback

OUTPUT FORMAT (return as JSON):
{
  "payment_gateway": "PayHere",
  "collection_currency": "LKR",
  "vendor_payout_currency": "USD|EUR|LKR|...",
  "fx_rate": 1.0,
  "platform_commission_pct": 0.08,
  "vendor_payout_pct": 0.92,
  "withholding_tax_pct": 0.0,
  "net_vendor_payout_pct": 0.92,
  "payout_rail": "Wise|SWIFT|PayPal|Direct LKR",
  "tax_invoice_id": "INV-...",
  "payment_frequency": "Monthly Net 15",
  "monthly_audit_scheduled": true
}
"""

RMA_TOOLS = [
    {
        "name": "configure_payout_routing",
        "description": "Configure the payment gateway (always PayHere/LKR for collection) and determine the correct vendor payout rail based on their country.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":     {"type": "string"},
                "country_code":  {"type": "string"},
                "vendor_tier":   {"type": "string"},
                "routing_type":  {"type": "string", "description": "DIGITAL|PHYSICAL|SERVICES"},
            },
            "required": ["vendor_id", "country_code", "vendor_tier"],
        },
    },
    {
        "name": "compute_platform_split",
        "description": "Compute exact platform commission and vendor payout percentages based on tier. Returns gross revenue split.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":           {"type": "string"},
                "vendor_tier":         {"type": "string"},
                "gross_transaction_usd": {"type": "number", "description": "Hypothetical $100 transaction for illustration"},
            },
            "required": ["vendor_id", "vendor_tier"],
        },
    },
    {
        "name": "calculate_fx_conversion",
        "description": "Calculate foreign exchange conversion from LKR (collection) to vendor's payout currency. Returns indicative FX rate and conversion fee.",
        "input_schema": {
            "type": "object",
            "properties": {
                "from_currency": {"type": "string", "description": "LKR (always)"},
                "to_currency":   {"type": "string"},
                "amount_lkr":    {"type": "number"},
                "country_code":  {"type": "string"},
            },
            "required": ["from_currency", "to_currency"],
        },
    },
    {
        "name": "apply_tax_withholding",
        "description": "Calculate and apply Sri Lanka withholding tax (WHT) and determine if vendor's country requires additional tax compliance.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":        {"type": "string"},
                "country_code":     {"type": "string"},
                "product_category": {"type": "string"},
                "payout_amount":    {"type": "number"},
                "routing_type":     {"type": "string"},
            },
            "required": ["vendor_id", "country_code", "product_category"],
        },
    },
    {
        "name": "generate_tax_invoice",
        "description": "Generate a compliant tax invoice template for the platform-vendor revenue share transaction, including LK VAT reference.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":          {"type": "string"},
                "vendor_name":        {"type": "string"},
                "country_code":       {"type": "string"},
                "commission_rate":    {"type": "number"},
                "withholding_rate":   {"type": "number"},
                "period":             {"type": "string"},
            },
            "required": ["vendor_id", "vendor_name", "country_code"],
        },
    },
    {
        "name": "audit_monthly_revenue",
        "description": "Schedule the monthly revenue audit cadence for this vendor — reconciliation, remittance, and tax filing schedule.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":    {"type": "string"},
                "vendor_tier":  {"type": "string"},
                "country_code": {"type": "string"},
                "payout_rail":  {"type": "string"},
            },
            "required": ["vendor_id", "vendor_tier"],
        },
    },
]

# WHT rates by routing type (Sri Lanka IRD schedule)
WHT_RATES = {
    "DIGITAL":   0.05,   # professional services / tech licensing
    "PHYSICAL":  0.00,   # goods: no WHT (GST/VAT applies separately)
    "SERVICES":  0.10,   # consulting/royalties
}

# Payout rail by country
PAYOUT_RAILS = {
    "LK": "Direct LKR bank transfer",
    "US": "Wise (USD)",
    "GB": "Wise (GBP)",
    "EU": "SEPA via Wise (EUR)",
    "DE": "SEPA via Wise (EUR)",
    "FR": "SEPA via Wise (EUR)",
    "SG": "Wise (SGD)",
    "AU": "Wise (AUD)",
    "IN": "Wise (INR)",
    "JP": "SWIFT (JPY)",
    "CN": "SWIFT (CNY)",
    "DEFAULT": "PayPal (USD)",
}

# Indicative FX rates to USD (LKR base — production: use real FX API)
INDICATIVE_FX_LKR_TO_USD = 0.00327    # ~305 LKR = 1 USD (placeholder)


class RMAAgent(BaseAgent):
    """Revenue Management Agent."""

    def __init__(self, api_key: str | None = None) -> None:
        super().__init__(
            agent_type=AgentType.RMA,
            model="claude-sonnet-4-5",
            system_prompt=RMA_SYSTEM_PROMPT,
            tools=RMA_TOOLS,
            api_key=api_key,
        )

    async def _dispatch_tool(self, tool_name: str, tool_input: Dict, state: WorkflowState) -> Any:
        dispatch = {
            "configure_payout_routing": self._configure_payout_routing,
            "compute_platform_split":   self._compute_platform_split,
            "calculate_fx_conversion":  self._calculate_fx_conversion,
            "apply_tax_withholding":    self._apply_tax_withholding,
            "generate_tax_invoice":     self._generate_tax_invoice,
            "audit_monthly_revenue":    self._audit_monthly_revenue,
        }
        handler = dispatch.get(tool_name)
        if not handler:
            raise ValueError(f"RMA: Unknown tool: {tool_name}")
        return await handler(tool_input, state)

    async def _configure_payout_routing(self, inp: Dict, state: WorkflowState) -> Dict:
        country = inp.get("country_code", "LK").upper()
        rail = PAYOUT_RAILS.get(country, PAYOUT_RAILS["DEFAULT"])
        # Collection is ALWAYS PayHere (Sri Lanka)
        return {
            "vendor_id":          inp["vendor_id"],
            "collection_gateway": "PayHere",
            "collection_currency": "LKR",
            "collection_country":  "LK",
            "payout_rail":        rail,
            "payout_country":     country,
            "note": "Merchant ID and secrets must be set via environment variables — never in source code.",
        }

    async def _compute_platform_split(self, inp: Dict, state: WorkflowState) -> Dict:
        tier_commission = {
            "GLOBAL_ENTERPRISE": 0.08,
            "REGIONAL_PARTNER":  0.12,
            "LOCAL_SUPPLIER":    0.15,
            "PROBATIONARY":      0.20,
        }
        tier = inp.get("vendor_tier", "LOCAL_SUPPLIER")
        commission = tier_commission.get(tier, 0.15)
        payout = 1.0 - commission
        gross = inp.get("gross_transaction_usd", 100.0)
        return {
            "vendor_id":             inp["vendor_id"],
            "tier":                  tier,
            "gross_transaction":     gross,
            "platform_commission":   round(gross * commission, 2),
            "vendor_gross_payout":   round(gross * payout, 2),
            "platform_commission_pct": commission,
            "vendor_payout_pct":     payout,
            "payment_frequency":     "Monthly, Net 15 after month close",
        }

    async def _calculate_fx_conversion(self, inp: Dict, state: WorkflowState) -> Dict:
        to_currency = inp.get("to_currency", "USD").upper()
        amount_lkr = inp.get("amount_lkr", 0) or 0
        if to_currency == "LKR":
            return {"from": "LKR", "to": "LKR", "rate": 1.0, "converted": amount_lkr, "fee_pct": 0}
        # Production: call Open Exchange Rates / Wise API
        rate = INDICATIVE_FX_LKR_TO_USD
        fee_pct = 0.007  # ~0.7% Wise conversion fee
        converted = round(amount_lkr * rate * (1 - fee_pct), 2)
        return {
            "from_currency":  "LKR",
            "to_currency":    to_currency,
            "indicative_rate": rate,
            "conversion_fee_pct": fee_pct,
            "amount_lkr":     amount_lkr,
            "converted_amount": converted,
            "provider":       "Wise (indicative — production: use live FX API)",
        }

    async def _apply_tax_withholding(self, inp: Dict, state: WorkflowState) -> Dict:
        country = inp.get("country_code", "LK").upper()
        routing = inp.get("routing_type", "DIGITAL")
        wht_rate = WHT_RATES.get(routing, 0.05)
        payout = inp.get("payout_amount", 0) or 0
        wht_amount = round(payout * wht_rate, 2)
        net_payout = round(payout - wht_amount, 2)
        # Non-LK vendors: may also need to declare in their own country
        cross_border_note = (
            "No cross-border WHT (domestic vendor)" if country == "LK"
            else f"Sri Lanka WHT {wht_rate*100:.0f}% applied. Vendor may need to declare income in {country}."
        )
        return {
            "vendor_id":        inp.get("vendor_id"),
            "country_code":     country,
            "wht_rate":         wht_rate,
            "wht_amount":       wht_amount,
            "gross_payout":     payout,
            "net_payout":       net_payout,
            "cross_border_note": cross_border_note,
            "authority":        "Sri Lanka Inland Revenue Department (IRD)",
        }

    async def _generate_tax_invoice(self, inp: Dict, state: WorkflowState) -> Dict:
        inv_hash = hashlib.md5(f"{inp['vendor_id']}{inp.get('period','M1')}".encode()).hexdigest()[:10].upper()
        invoice_id = f"INV-{inv_hash}"
        commission = inp.get("commission_rate", 0.15)
        wht = inp.get("withholding_rate", 0.05)
        return {
            "invoice_id":    invoice_id,
            "vendor_id":     inp["vendor_id"],
            "vendor_name":   inp["vendor_name"],
            "issuer":        "VerdaSync AI (Pvt) Ltd — Sri Lanka",
            "period":        inp.get("period", "Current Month"),
            "platform_commission_pct": f"{commission*100:.0f}%",
            "withholding_tax_pct":     f"{wht*100:.0f}%",
            "vat_note":      "VAT at 18% applies to platform services (Sri Lanka VAT Act)",
            "invoice_url":   f"https://billing.verdasync.ai/invoices/{invoice_id}.pdf",
            "format":        "PDF (LKAS-compliant)",
        }

    async def _audit_monthly_revenue(self, inp: Dict, state: WorkflowState) -> Dict:
        tier = inp.get("vendor_tier", "LOCAL_SUPPLIER")
        audit_day = 15  # reconcile on 15th of each month
        remit_day  = 20  # remit on 20th
        return {
            "vendor_id":         inp["vendor_id"],
            "audit_cadence":     "Monthly",
            "reconciliation_day": f"{audit_day}th of each month",
            "remittance_day":    f"{remit_day}th of each month",
            "ird_filing":        "Quarterly WHT return to Sri Lanka IRD",
            "annual_review":     "Annual vendor KPI review (tier reassignment)",
            "escalation_threshold": "Flag transactions > LKR 500,000 for manual review",
            "audit_trail":       "All transactions logged in immutable ledger",
            "status":            "AUDIT_SCHEDULED",
        }

    async def configure_finances(self, state: WorkflowState, vendor_profile: VendorProfile) -> PayoutConfiguration:
        """Called by Orchestrator after VMA VENDOR_PROFILE_ACTIVE."""
        vendor = state.vendor_request

        context = {
            "vendor_id":        vendor_profile.vendor_id,
            "vendor_name":      vendor_profile.vendor_name,
            "country_code":     vendor_profile.country_code,
            "vendor_tier":      vendor_profile.tier.value,
            "routing_type":     "DIGITAL",   # default; override from VMA result if available
            "product_category": vendor.product_category,
        }

        result = await self.process(state, context)

        commission = result.get("platform_commission_pct", 0.15)
        payout_pct = result.get("vendor_payout_pct", 0.85)
        wht        = result.get("withholding_tax_pct", 0.05)

        config = PayoutConfiguration(
            vendor_id=vendor_profile.vendor_id,
            payment_gateway="PayHere",
            collection_currency="LKR",
            payout_currency=result.get("vendor_payout_currency", "USD"),
            payout_rail=result.get("payout_rail", "Wise (USD)"),
            platform_commission=commission,
            vendor_payout_rate=payout_pct,
            withholding_tax_rate=wht,
            net_vendor_payout_rate=round(payout_pct - wht, 4),
            tax_invoice_id=result.get("tax_invoice_id"),
            payment_frequency="Monthly Net 15",
        )

        # Update vendor status
        vendor_profile.status = VendorStatus.ACTIVE

        # Final signal
        self.emit_message(
            state, AgentType.ORCHESTRATOR, MessageType.EVENT,
            payload={
                "payout_config":   config.model_dump(mode="json"),
                "vendor_profile":  vendor_profile.model_dump(mode="json"),
            },
            signal=WorkflowSignal.VENDOR_FULLY_ONBOARDED,
        )
        return config
