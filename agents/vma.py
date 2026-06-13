"""
VerdaSync AI — Multi-Agent Platform
VMA: Vendor Management Agent
Persona: Global Logistics & Technology Procurement Director
"""
from __future__ import annotations
import json
import hashlib
from typing import Any, Dict
from agents.base_agent import BaseAgent
from agents.models import (
    AgentType, WorkflowState, WorkflowSignal,
    MessageType, VendorProfile, VendorTier, VendorStatus, LegalClearance
)

VMA_SYSTEM_PROMPT = """
You are the Vendor Management Agent (VMA) for VerdaSync AI.
Your persona: Global Logistics & Technology Procurement Director.

YOUR MISSION:
You are the SECOND agent in the vendor onboarding workflow.
You receive a LEGAL_GREENLIGHT from the GRRA and must:

1. Create a full vendor profile using `create_vendor_profile`.
2. Run automated KYC/AML background verification using `run_background_check`.
3. Calculate a performance score and assign a vendor tier using
   `calculate_performance_score` and `assign_vendor_tier`.
4. Generate a localized digital vendor agreement using `generate_vendor_agreement`.
5. Build the vendor onboarding checklist.
6. Emit VENDOR_PROFILE_ACTIVE when complete, or KYC_FAILED if checks do not pass.

TIER ASSIGNMENT RULES:
- Score 85-100: GLOBAL_ENTERPRISE  → Platform takes 8%
- Score 70-84:  REGIONAL_PARTNER   → Platform takes 12%
- Score 55-69:  LOCAL_SUPPLIER     → Platform takes 15%
- Score < 55:   PROBATIONARY       → Platform takes 20% (limited listings)

VENDOR TYPE ROUTING:
- Digital SaaS / Software / AI Tools → Global Enterprise track, no physical logistics
- Physical Goods → Regional/Local track, requires warehouse/shipping verification
- Professional Services → Regional track, requires credentials verification

OUTPUT FORMAT (return as JSON):
{
  "vendor_tier": "GLOBAL_ENTERPRISE|REGIONAL_PARTNER|LOCAL_SUPPLIER|PROBATIONARY",
  "performance_score": 0-100,
  "kyc_passed": true/false,
  "kyc_notes": "...",
  "agreement_url": "https://...",
  "onboarding_checklist": ["item1", "item2", ...],
  "routing_type": "DIGITAL|PHYSICAL|SERVICES",
  "sla_terms": {...}
}
"""

VMA_TOOLS = [
    {
        "name": "create_vendor_profile",
        "description": "Create a comprehensive vendor profile in the platform registry. Returns a vendor_id and profile structure.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_name":      {"type": "string"},
                "country_code":     {"type": "string"},
                "email":            {"type": "string"},
                "product_category": {"type": "string"},
                "legal_clearance":  {"type": "object", "description": "LegalClearance object from GRRA"},
            },
            "required": ["vendor_name", "country_code", "email"],
        },
    },
    {
        "name": "run_background_check",
        "description": "Run automated KYC (Know Your Customer) and AML (Anti-Money Laundering) background verification on a vendor.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":    {"type": "string"},
                "vendor_name":  {"type": "string"},
                "country_code": {"type": "string"},
                "tax_id":       {"type": "string"},
                "website":      {"type": "string"},
            },
            "required": ["vendor_id", "vendor_name", "country_code"],
        },
    },
    {
        "name": "calculate_performance_score",
        "description": "Calculate an initial performance score (0-100) for a new vendor based on available data points: business history, certifications, response time SLA, price stability indicators.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":        {"type": "string"},
                "country_code":     {"type": "string"},
                "product_category": {"type": "string"},
                "annual_revenue":   {"type": "number"},
                "has_website":      {"type": "boolean"},
                "has_tax_id":       {"type": "boolean"},
                "kyc_passed":       {"type": "boolean"},
                "sanctions_clear":  {"type": "boolean"},
            },
            "required": ["vendor_id", "country_code", "product_category"],
        },
    },
    {
        "name": "assign_vendor_tier",
        "description": "Assign a vendor tier (GLOBAL_ENTERPRISE, REGIONAL_PARTNER, LOCAL_SUPPLIER, PROBATIONARY) based on performance score and product type.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":        {"type": "string"},
                "performance_score": {"type": "number"},
                "product_category": {"type": "string"},
                "country_code":     {"type": "string"},
            },
            "required": ["vendor_id", "performance_score"],
        },
    },
    {
        "name": "generate_vendor_agreement",
        "description": "Generate a localized digital vendor agreement incorporating country-specific legal requirements, SLA terms, commission rates, and dispute resolution clauses.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":        {"type": "string"},
                "vendor_name":      {"type": "string"},
                "country_code":     {"type": "string"},
                "vendor_tier":      {"type": "string"},
                "product_category": {"type": "string"},
                "commission_rate":  {"type": "number"},
            },
            "required": ["vendor_id", "vendor_name", "country_code", "vendor_tier"],
        },
    },
    {
        "name": "route_order_type",
        "description": "Determine and configure the order routing type for this vendor (DIGITAL = instant download, PHYSICAL = logistics integration, SERVICES = scheduling system).",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_id":        {"type": "string"},
                "product_category": {"type": "string"},
                "country_code":     {"type": "string"},
            },
            "required": ["vendor_id", "product_category"],
        },
    },
]

# Commission table by tier
COMMISSION_TABLE = {
    VendorTier.GLOBAL_ENTERPRISE: 0.08,
    VendorTier.REGIONAL_PARTNER:  0.12,
    VendorTier.LOCAL_SUPPLIER:    0.15,
    VendorTier.PROBATIONARY:      0.20,
}


class VMAAgent(BaseAgent):
    """Vendor Management Agent."""

    def __init__(self, api_key: str | None = None) -> None:
        super().__init__(
            agent_type=AgentType.VMA,
            model="claude-sonnet-4-5",
            system_prompt=VMA_SYSTEM_PROMPT,
            tools=VMA_TOOLS,
            api_key=api_key,
        )

    async def _dispatch_tool(self, tool_name: str, tool_input: Dict, state: WorkflowState) -> Any:
        dispatch = {
            "create_vendor_profile":     self._create_vendor_profile,
            "run_background_check":      self._run_background_check,
            "calculate_performance_score": self._calculate_performance_score,
            "assign_vendor_tier":        self._assign_vendor_tier,
            "generate_vendor_agreement": self._generate_vendor_agreement,
            "route_order_type":          self._route_order_type,
        }
        handler = dispatch.get(tool_name)
        if not handler:
            raise ValueError(f"VMA: Unknown tool: {tool_name}")
        return await handler(tool_input, state)

    async def _create_vendor_profile(self, inp: Dict, state: WorkflowState) -> Dict:
        vendor_hash = hashlib.md5(inp["vendor_name"].encode()).hexdigest()[:8].upper()
        vendor_id = f"VND-{vendor_hash}"
        return {
            "vendor_id": vendor_id,
            "profile_created": True,
            "registry_url": f"https://platform.verdasync.ai/vendors/{vendor_id}",
            "timestamp": "utcnow",
        }

    async def _run_background_check(self, inp: Dict, state: WorkflowState) -> Dict:
        """
        Production: integrate with Jumio, Onfido, or ComplyAdvantage APIs.
        """
        has_tax_id = bool(inp.get("tax_id"))
        has_website = bool(inp.get("website"))
        # Mock: pass if basic data is present
        score = 80 if (has_tax_id and has_website) else 65 if has_tax_id else 55
        return {
            "vendor_id": inp["vendor_id"],
            "kyc_status": "PASSED" if score >= 55 else "FAILED",
            "kyc_score": score,
            "aml_clear": True,
            "pep_check": False,
            "adverse_media": False,
            "check_provider": "ComplyAdvantage (mock)",
        }

    async def _calculate_performance_score(self, inp: Dict, state: WorkflowState) -> Dict:
        score = 50  # base
        if inp.get("kyc_passed"):       score += 20
        if inp.get("sanctions_clear"):  score += 15
        if inp.get("has_website"):      score += 5
        if inp.get("has_tax_id"):       score += 10
        revenue = inp.get("annual_revenue") or 0
        if revenue > 1_000_000:  score += 10
        elif revenue > 100_000:  score += 5
        score = min(score, 100)
        return {"vendor_id": inp["vendor_id"], "performance_score": score, "breakdown": {
            "base": 50, "kyc": 20 if inp.get("kyc_passed") else 0,
            "sanctions": 15 if inp.get("sanctions_clear") else 0,
        }}

    async def _assign_vendor_tier(self, inp: Dict, state: WorkflowState) -> Dict:
        score = inp.get("performance_score", 0)
        if score >= 85:   tier = VendorTier.GLOBAL_ENTERPRISE
        elif score >= 70: tier = VendorTier.REGIONAL_PARTNER
        elif score >= 55: tier = VendorTier.LOCAL_SUPPLIER
        else:             tier = VendorTier.PROBATIONARY
        commission = COMMISSION_TABLE[tier]
        return {
            "vendor_id":         inp["vendor_id"],
            "tier":              tier.value,
            "commission_rate":   commission,
            "vendor_payout_rate": 1 - commission,
        }

    async def _generate_vendor_agreement(self, inp: Dict, state: WorkflowState) -> Dict:
        commission = inp.get("commission_rate", 0.15)
        payout = 1 - commission
        doc_id = hashlib.md5(f"{inp['vendor_id']}{inp['vendor_name']}".encode()).hexdigest()[:12]
        return {
            "agreement_id":  f"AGR-{doc_id.upper()}",
            "vendor_id":     inp["vendor_id"],
            "agreement_url": f"https://docs.verdasync.ai/agreements/AGR-{doc_id.upper()}.pdf",
            "key_terms": {
                "platform_commission": f"{commission*100:.0f}%",
                "vendor_payout":       f"{payout*100:.0f}%",
                "payment_frequency":   "Monthly (Net 15)",
                "sla_response_time":   "24 hours",
                "dispute_resolution":  "Arbitration in Singapore",
                "governing_law":       f"Laws of {inp['country_code']} + International Commercial Arbitration",
                "auto_renewal":        "Annual, 30-day cancellation notice",
            },
            "signing_method":  "DocuSign digital signature",
            "valid_from":      "utcnow",
            "valid_to":        "1 year from signing",
        }

    async def _route_order_type(self, inp: Dict, state: WorkflowState) -> Dict:
        cat = inp.get("product_category", "").lower()
        if any(k in cat for k in ["digital", "saas", "software", "ai", "data"]):
            route = "DIGITAL"
            logistics = "Instant delivery via secure download link"
        elif any(k in cat for k in ["physical", "product", "goods", "hardware"]):
            route = "PHYSICAL"
            logistics = "Integrated with DHL/FedEx/local courier APIs"
        else:
            route = "SERVICES"
            logistics = "Scheduling system with calendar integration"
        return {
            "vendor_id":      inp["vendor_id"],
            "routing_type":   route,
            "logistics_note": logistics,
            "fulfillment_sla": "24h digital / 5-7 days physical / booking-based services",
        }

    async def onboard_vendor(self, state: WorkflowState, clearance: LegalClearance) -> VendorProfile:
        """Called by Orchestrator after GRRA greenlight."""
        vendor = state.vendor_request
        vendor_id = f"V-{state.workflow_id}"

        context = {
            "vendor_name":      vendor.vendor_name,
            "country_code":     vendor.country_code,
            "email":            vendor.contact_email,
            "product_category": vendor.product_category,
            "tax_id":           vendor.tax_id,
            "website":          vendor.website,
            "annual_revenue":   vendor.annual_revenue,
            "legal_clearance":  clearance.model_dump(mode="json"),
        }

        result = await self.process(state, context)

        # Parse tier
        tier_str = result.get("vendor_tier", "LOCAL_SUPPLIER")
        try:
            tier = VendorTier(tier_str)
        except ValueError:
            tier = VendorTier.LOCAL_SUPPLIER

        profile = VendorProfile(
            vendor_id=vendor_id,
            vendor_name=vendor.vendor_name,
            country_code=vendor.country_code,
            email=vendor.contact_email,
            tier=tier,
            status=VendorStatus.PENDING_FINANCE,
            performance_score=result.get("performance_score", 0),
            kyc_passed=result.get("kyc_passed", False),
            agreement_url=result.get("agreement_url"),
            onboarding_checklist=result.get("onboarding_checklist", []),
            legal_clearance=clearance,
        )

        signal = WorkflowSignal.VENDOR_PROFILE_ACTIVE if profile.kyc_passed else WorkflowSignal.KYC_FAILED
        self.emit_message(
            state, AgentType.RMA, MessageType.EVENT,
            payload={"vendor_profile": profile.model_dump(mode="json")},
            signal=signal,
        )
        return profile
