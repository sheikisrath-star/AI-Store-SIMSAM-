"""
VerdaSync AI — Multi-Agent Platform
GRRA: Government Relations & Registration Agent
Persona: International Corporate Attorney & Cross-Border Compliance Expert
"""
from __future__ import annotations
import json
from typing import Any, Dict
from agents.base_agent import BaseAgent
from agents.models import (
    AgentType, WorkflowState, WorkflowSignal,
    MessageType, LegalClearance
)

# ── SYSTEM PROMPT ─────────────────────────────────────────────────────────────

GRRA_SYSTEM_PROMPT = """
You are the Government Relations & Registration Agent (GRRA) for VerdaSync AI.
Your persona: International Corporate Attorney & Cross-Border Compliance Expert.

YOUR MISSION:
You are the FIRST agent in the vendor onboarding workflow. No vendor may proceed
to the platform without your legal clearance. You must:

1. Look up the exact statutory requirements for business registration in the
   vendor's country using `lookup_country_requirements`.
2. Validate their Tax ID / business registration number using `validate_tax_id`.
3. Screen the vendor and company against international sanctions lists using
   `check_sanctions_list`. Any match = IMMEDIATE BLOCK.
4. Generate all required incorporation or registration documents using
   `generate_incorporation_docs`.
5. Build a compliance calendar of ongoing legal obligations using
   `build_compliance_calendar`.
6. Issue a final verdict: LEGAL_GREENLIGHT (proceed) or LEGAL_BLOCK (reject).

RULES:
- If sanctions confidence > 0.3, issue LEGAL_BLOCK regardless of other checks.
- If required documents are missing, issue DOCS_REQUIRED before blocking.
- Always return a structured JSON result matching the LegalClearance schema.
- Be thorough. Enterprise clients depend on your accuracy.

OUTPUT FORMAT (return as JSON):
{
  "is_cleared": true/false,
  "block_reason": "...",  // only if blocked
  "required_registrations": ["...", "..."],
  "compliance_notes": ["...", "..."],
  "tax_regime": "...",
  "incorporation_docs": ["...", "..."],
  "compliance_calendar": {"Filing Name": "YYYY-MM-DD", ...},
  "sanctions_clear": true/false,
  "confidence_score": 0.0-1.0
}
"""

# ── TOOL DEFINITIONS ──────────────────────────────────────────────────────────

GRRA_TOOLS = [
    {
        "name": "lookup_country_requirements",
        "description": (
            "Look up the statutory business registration requirements, "
            "tax obligations, and corporate law for a given country and business type. "
            "Returns a detailed regulatory profile."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "country_code":  {"type": "string", "description": "ISO 3166-1 alpha-2 country code (e.g. 'LK', 'US', 'DE')"},
                "business_type": {"type": "string", "description": "Entity type (LLC, PLC, GmbH, Sole Trader, etc.)"},
                "product_category": {"type": "string", "description": "What the vendor sells (Digital, Physical, Services)"},
            },
            "required": ["country_code", "business_type"],
        },
    },
    {
        "name": "validate_tax_id",
        "description": "Validate a government-issued tax identification number for a given country.",
        "input_schema": {
            "type": "object",
            "properties": {
                "tax_id":      {"type": "string"},
                "country_code": {"type": "string"},
            },
            "required": ["tax_id", "country_code"],
        },
    },
    {
        "name": "check_sanctions_list",
        "description": (
            "Screen a vendor name and country against OFAC, EU, UN, and "
            "country-specific sanctions/PEP lists. Returns match confidence 0–1."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_name":  {"type": "string"},
                "country_code": {"type": "string"},
                "tax_id":       {"type": "string"},
            },
            "required": ["vendor_name", "country_code"],
        },
    },
    {
        "name": "generate_incorporation_docs",
        "description": "Draft localized legal documents (Articles of Incorporation, Business License Application, Tax Registration Form) based on vendor data and country requirements.",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_name":     {"type": "string"},
                "country_code":    {"type": "string"},
                "business_type":   {"type": "string"},
                "country_profile": {"type": "object", "description": "Output from lookup_country_requirements"},
            },
            "required": ["vendor_name", "country_code", "business_type"],
        },
    },
    {
        "name": "build_compliance_calendar",
        "description": "Generate a country-specific compliance calendar with annual filings, VAT/GST submissions, license renewals, and reporting deadlines.",
        "input_schema": {
            "type": "object",
            "properties": {
                "country_code": {"type": "string"},
                "entity_type":  {"type": "string"},
                "fiscal_year_start": {"type": "string", "description": "MM-DD format, default 01-01"},
            },
            "required": ["country_code", "entity_type"],
        },
    },
]

# ── COUNTRY LAW DATABASE (mock — replace with real DB or API) ─────────────────

COUNTRY_LAW_DB: Dict[str, Dict] = {
    "LK": {
        "country": "Sri Lanka",
        "registration_body": "Registrar of Companies (ROC)",
        "registration_types": ["Private Limited Company", "Sole Trader", "Partnership"],
        "required_docs": [
            "Form 1 - Articles of Association",
            "Form 18 - Registered Office Address",
            "NIC / Passport copies of Directors",
            "BOI Registration (if FDI)",
        ],
        "tax_regime": "Sri Lanka VAT 18% + NBT 2% (suspended 2023)",
        "vat_threshold_lkr": 3_000_000,
        "corporate_tax_rate": 0.30,
        "withholding_tax": 0.05,
        "gdpr_equivalent": "Personal Data Protection Act 2022",
        "compliance_calendar": {
            "Annual Return (ROC)": "Within 18 months of incorporation",
            "Income Tax Return":   "November 30 (year-end March 31)",
            "VAT Return":          "Monthly (15th of following month)",
            "Audited Accounts":    "6 months after fiscal year-end",
        },
    },
    "US": {
        "country": "United States",
        "registration_body": "State Secretary of State (varies by state)",
        "registration_types": ["LLC", "C-Corp", "S-Corp", "Sole Proprietorship"],
        "required_docs": [
            "Articles of Incorporation / Organization",
            "EIN Application (IRS Form SS-4)",
            "State Business License",
            "Registered Agent Designation",
        ],
        "tax_regime": "Federal Corporate Tax 21% + State Tax (varies)",
        "sales_tax": "Nexus-based (state-specific 0–10.25%)",
        "withholding_tax": 0.30,
        "gdpr_equivalent": "CCPA (California), State privacy laws",
        "compliance_calendar": {
            "Annual Report":       "Varies by state (typically Jan–Apr)",
            "Federal Tax Return":  "April 15 (or 15th day of 4th month)",
            "Quarterly Estimates": "April 15, June 15, Sept 15, Jan 15",
        },
    },
    "DE": {
        "country": "Germany",
        "registration_body": "Handelsregister (Commercial Register)",
        "registration_types": ["GmbH", "UG", "AG", "Einzelunternehmen"],
        "required_docs": [
            "Articles of Association (Gesellschaftsvertrag)",
            "Commercial Register Application (HR-A/B)",
            "Notarized Director ID Verification",
            "GDPR Data Processing Register (ROPA)",
            "VAT Registration (Finanzamt)",
        ],
        "tax_regime": "German VAT 19% (reduced 7%), Corporate Tax 15% + Solidarity 5.5% + Trade Tax",
        "vat_rate": 0.19,
        "corporate_tax_rate": 0.15,
        "withholding_tax": 0.26375,
        "gdpr_equivalent": "GDPR + BDSG (Bundesdatenschutzgesetz)",
        "compliance_calendar": {
            "Annual Financial Statements": "Within 6 months of fiscal year-end",
            "Corporate Tax Return":        "July 31",
            "VAT Annual Return":           "July 31",
            "VAT Monthly Advance Returns": "10th of each month",
            "CSRD Sustainability Report":  "2025 onwards (large companies)",
        },
    },
    "SG": {
        "country": "Singapore",
        "registration_body": "ACRA (Accounting & Corporate Regulatory Authority)",
        "registration_types": ["Private Limited (Pte Ltd)", "Sole Proprietorship", "Partnership"],
        "required_docs": [
            "ACRA BizFile Registration",
            "NRIC/Passport of Directors & Shareholders",
            "GST Registration (if turnover > SGD 1M)",
            "MAS License (if financial services)",
        ],
        "tax_regime": "GST 9%, Corporate Tax 17% (50% exemption for first SGD 10K)",
        "gst_rate": 0.09,
        "corporate_tax_rate": 0.17,
        "withholding_tax": 0.10,
        "gdpr_equivalent": "PDPA (Personal Data Protection Act 2012)",
        "compliance_calendar": {
            "Annual Return (ACRA)":        "Within 7 months of fiscal year-end",
            "Corporate Tax Return":        "November 30",
            "GST Return":                  "Quarterly (last day of month after quarter)",
            "Transfer Pricing Documentation": "By tax return filing date",
        },
    },
}


class GRRAAgent(BaseAgent):
    """Government Relations & Registration Agent."""

    def __init__(self, api_key: str | None = None) -> None:
        super().__init__(
            agent_type=AgentType.GRRA,
            model="claude-opus-4-5",
            system_prompt=GRRA_SYSTEM_PROMPT,
            tools=GRRA_TOOLS,
            api_key=api_key,
        )

    # ── TOOL DISPATCH ─────────────────────────────────────────────────────────

    async def _dispatch_tool(
        self, tool_name: str, tool_input: Dict, state: WorkflowState
    ) -> Any:
        dispatch = {
            "lookup_country_requirements": self._lookup_country_requirements,
            "validate_tax_id":             self._validate_tax_id,
            "check_sanctions_list":        self._check_sanctions_list,
            "generate_incorporation_docs": self._generate_incorporation_docs,
            "build_compliance_calendar":   self._build_compliance_calendar,
        }
        handler = dispatch.get(tool_name)
        if not handler:
            raise ValueError(f"Unknown tool: {tool_name}")
        return await handler(tool_input, state)

    # ── TOOL IMPLEMENTATIONS ──────────────────────────────────────────────────

    async def _lookup_country_requirements(self, inp: Dict, state: WorkflowState) -> Dict:
        code = inp["country_code"].upper()
        data = COUNTRY_LAW_DB.get(code)
        if not data:
            return {
                "found": False,
                "country_code": code,
                "message": f"Country {code} not in law database. Flag for manual review.",
                "manual_review_required": True,
            }
        return {"found": True, "country_code": code, **data}

    async def _validate_tax_id(self, inp: Dict, state: WorkflowState) -> Dict:
        """
        Real implementation would call:
        - EU VIES for European VAT numbers
        - IRS TIN matching for US EINs
        - SLRDA for Sri Lanka TINs
        For now returns mock validation.
        """
        tax_id = inp.get("tax_id", "")
        country = inp.get("country_code", "").upper()
        if not tax_id:
            return {"valid": False, "reason": "No tax ID provided"}
        # Basic format checks
        if country == "LK" and len(tax_id) in [9, 12]:
            return {"valid": True, "format": "Sri Lanka NIC/TIN", "verified": True}
        if country == "US" and len(tax_id) == 9 and tax_id.isdigit():
            return {"valid": True, "format": "US EIN", "verified": True}
        if country == "DE" and tax_id.startswith("DE") and len(tax_id) == 11:
            return {"valid": True, "format": "German VAT ID", "verified": True}
        return {"valid": True, "format": "Unknown format", "verified": False,
                "note": "Manual verification recommended"}

    async def _check_sanctions_list(self, inp: Dict, state: WorkflowState) -> Dict:
        """
        Real implementation would call:
        - OFAC SDN API: https://sanctionssearch.ofac.treas.gov/
        - EU Sanctions API: https://data.europa.eu/data/datasets/consolidated-list-of-persons
        - UN Sanctions: https://scsanctions.un.org/
        Returns mock with 0 match confidence for demonstration.
        """
        vendor_name = inp.get("vendor_name", "").lower()
        blocked_keywords = ["terrorist", "sanctioned", "blocked_entity"]
        match_confidence = 0.0
        for kw in blocked_keywords:
            if kw in vendor_name:
                match_confidence = 0.95

        return {
            "vendor_name":       inp.get("vendor_name"),
            "country_code":      inp.get("country_code"),
            "ofac_match":        match_confidence > 0.3,
            "eu_match":          False,
            "un_match":          False,
            "match_confidence":  match_confidence,
            "screened_at":       "utcnow",
            "clear":             match_confidence < 0.3,
        }

    async def _generate_incorporation_docs(self, inp: Dict, state: WorkflowState) -> Dict:
        code    = inp.get("country_code", "").upper()
        profile = COUNTRY_LAW_DB.get(code, {})
        docs    = profile.get("required_docs", ["Standard registration documents"])
        return {
            "documents_generated": docs,
            "vendor_name":         inp.get("vendor_name"),
            "country":             profile.get("country", code),
            "business_type":       inp.get("business_type"),
            "note": (
                "Documents drafted as templates. "
                "Vendor must complete with their specific details and have notarized where required."
            ),
            "storage_path": f"docs/{state.workflow_id}/incorporation/",
        }

    async def _build_compliance_calendar(self, inp: Dict, state: WorkflowState) -> Dict:
        code = inp.get("country_code", "").upper()
        data = COUNTRY_LAW_DB.get(code, {})
        calendar = data.get("compliance_calendar", {
            "Annual Return": "Within 12 months of incorporation",
            "Tax Return":    "Typically within 6 months of fiscal year-end",
        })
        return {
            "country_code":  code,
            "entity_type":   inp.get("entity_type"),
            "calendar":      calendar,
            "fiscal_year":   inp.get("fiscal_year_start", "01-01"),
            "reminder_setup": "Automated email reminders configured 30/7/1 days before each deadline",
        }

    # ── HIGH-LEVEL WORKFLOW METHOD ─────────────────────────────────────────────

    async def audit_vendor(self, state: WorkflowState) -> LegalClearance:
        """Called by Orchestrator. Runs full legal audit and returns LegalClearance."""
        from datetime import datetime
        vendor = state.vendor_request
        vendor_id = f"V-{state.workflow_id}"

        context = {
            "vendor_name":     vendor.vendor_name,
            "country_code":    vendor.country_code,
            "business_type":   vendor.business_type,
            "product_category": vendor.product_category,
            "tax_id":          vendor.tax_id,
        }

        result = await self.process(state, context)

        # Parse Claude's structured output into LegalClearance
        clearance = LegalClearance(
            vendor_id=vendor_id,
            country_code=vendor.country_code,
            is_cleared=result.get("is_cleared", False),
            block_reason=result.get("block_reason"),
            required_registrations=result.get("required_registrations", []),
            compliance_notes=result.get("compliance_notes", []),
            tax_regime=result.get("tax_regime", ""),
            incorporation_docs=result.get("incorporation_docs", []),
            compliance_calendar=result.get("compliance_calendar", {}),
            sanctions_clear=result.get("sanctions_clear", True),
            confidence_score=result.get("confidence_score", 0.8),
        )

        # Emit appropriate signal
        signal = WorkflowSignal.LEGAL_GREENLIGHT if clearance.is_cleared else WorkflowSignal.LEGAL_BLOCK
        self.emit_message(
            state, AgentType.VMA, MessageType.EVENT,
            payload={"legal_clearance": clearance.model_dump(mode="json")},
            signal=signal,
        )
        return clearance
