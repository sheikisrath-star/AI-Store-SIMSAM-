"""
VerdaSync AI — Multi-Agent Platform
Data Models (Pydantic v2)
NOTE: No 'from __future__ import annotations' — required for Pydantic v2 field resolution
"""
from enum import Enum
from typing import Any, Dict, List, Optional
from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, Field


# ── ENUMS ─────────────────────────────────────────────────────────────────────

class AgentType(str, Enum):
    ORCHESTRATOR = "ORCHESTRATOR"
    GRRA = "GRRA"
    VMA  = "VMA"
    RMA  = "RMA"

class MessageType(str, Enum):
    REQUEST    = "REQUEST"
    RESPONSE   = "RESPONSE"
    EVENT      = "EVENT"
    ESCALATION = "ESCALATION"
    ERROR      = "ERROR"

class MessagePriority(str, Enum):
    CRITICAL = "CRITICAL"
    HIGH     = "HIGH"
    NORMAL   = "NORMAL"
    LOW      = "LOW"

class WorkflowSignal(str, Enum):
    LEGAL_GREENLIGHT       = "LEGAL_GREENLIGHT"
    LEGAL_BLOCK            = "LEGAL_BLOCK"
    DOCS_REQUIRED          = "DOCS_REQUIRED"
    VENDOR_PROFILE_ACTIVE  = "VENDOR_PROFILE_ACTIVE"
    KYC_FAILED             = "KYC_FAILED"
    PAYOUT_CONFIGURED      = "PAYOUT_CONFIGURED"
    TAX_ESCALATION         = "TAX_ESCALATION"
    VENDOR_FULLY_ONBOARDED = "VENDOR_FULLY_ONBOARDED"

class VendorTier(str, Enum):
    GLOBAL_ENTERPRISE = "GLOBAL_ENTERPRISE"
    REGIONAL_PARTNER  = "REGIONAL_PARTNER"
    LOCAL_SUPPLIER    = "LOCAL_SUPPLIER"
    PROBATIONARY      = "PROBATIONARY"

class VendorStatus(str, Enum):
    PENDING_LEGAL   = "PENDING_LEGAL"
    PENDING_KYC     = "PENDING_KYC"
    PENDING_FINANCE = "PENDING_FINANCE"
    ACTIVE          = "ACTIVE"
    SUSPENDED       = "SUSPENDED"
    BLOCKED         = "BLOCKED"

class WorkflowPhase(str, Enum):
    INITIATED         = "INITIATED"
    LEGAL_REVIEW      = "LEGAL_REVIEW"
    GRRA_AUDIT        = "GRRA_AUDIT"
    VENDOR_ONBOARD    = "VENDOR_ONBOARD"
    VMA_ONBOARDING    = "VMA_ONBOARDING"
    FINANCE_CONFIG    = "FINANCE_CONFIG"
    RMA_CONFIGURATION = "RMA_CONFIGURATION"
    COMPLETE          = "COMPLETE"
    COMPLETED         = "COMPLETED"
    FAILED            = "FAILED"


# ── CORE MESSAGE BUS ───────────────────────────────────────────────────────────

class AgentMessage(BaseModel):
    id:              UUID           = Field(default_factory=uuid4)
    workflow_id:     str
    sender:          AgentType
    recipient:       str            # AgentType value or "BROADCAST"
    type:            MessageType
    priority:        MessagePriority = MessagePriority.NORMAL
    signal:          Optional[WorkflowSignal] = None
    payload:         Dict[str, Any] = Field(default_factory=dict)
    requires_ack:    bool           = True
    timeout_seconds: int            = 120
    timestamp:       datetime       = Field(default_factory=datetime.utcnow)

    class Config:
        use_enum_values = True


# ── VENDOR MODELS ──────────────────────────────────────────────────────────────

class VendorRegistrationRequest(BaseModel):
    vendor_name:      str
    contact_email:    str
    country_code:     str
    business_type:    str
    product_category: str
    annual_revenue:   Optional[float] = None
    tax_id:           Optional[str]   = None
    website:          Optional[str]   = None
    banking_country:  Optional[str]   = None
    currency:         str             = "USD"


class LegalClearance(BaseModel):
    vendor_id:              str
    country_code:           str
    is_cleared:             bool
    block_reason:           Optional[str]      = None
    required_registrations: List[str]          = Field(default_factory=list)
    compliance_notes:       List[str]          = Field(default_factory=list)
    tax_regime:             str                = ""
    incorporation_docs:     List[str]          = Field(default_factory=list)
    compliance_calendar:    Dict[str, str]     = Field(default_factory=dict)
    sanctions_clear:        bool               = True
    confidence_score:       float              = 0.0
    reviewed_at:            datetime           = Field(default_factory=datetime.utcnow)


class VendorProfile(BaseModel):
    vendor_id:            str
    vendor_name:          str
    country_code:         str
    email:                str
    tier:                 VendorTier
    status:               VendorStatus        = VendorStatus.PENDING_FINANCE
    performance_score:    float               = 0.0
    kyc_passed:           bool                = False
    agreement_signed:     bool                = False
    agreement_url:        Optional[str]       = None
    onboarding_checklist: List[str]           = Field(default_factory=list)
    legal_clearance:      Optional[LegalClearance] = None
    created_at:           datetime            = Field(default_factory=datetime.utcnow)


class PayoutConfiguration(BaseModel):
    vendor_id:             str
    payment_gateway:       str   = "PayHere"
    collection_currency:   str   = "LKR"
    platform_commission:   float = 0.15
    vendor_payout_rate:    float = 0.85
    payout_currency:       str   = "USD"
    payout_rail:           str   = "Wise (USD)"
    banking_rail:          str   = "Wise"
    withholding_tax_rate:  float = 0.05
    tax_withholding_rate:  float = 0.05
    net_vendor_payout_rate: float = 0.80
    tax_invoice_id:        Optional[str] = None
    vat_applicable:        bool  = True
    vat_rate:              float = 0.18
    fx_spread:             float = 0.005
    payment_frequency:     str   = "Monthly Net 15"
    payout_frequency:      str   = "MONTHLY"
    configured_at:         datetime = Field(default_factory=datetime.utcnow)


class WorkflowState(BaseModel):
    workflow_id:     str                          = Field(default_factory=lambda: f"WF-{uuid4().hex[:8].upper()}")
    vendor_request:  VendorRegistrationRequest
    phase:           WorkflowPhase                = WorkflowPhase.INITIATED
    legal_clearance: Optional[LegalClearance]     = None
    vendor_profile:  Optional[VendorProfile]      = None
    payout_config:   Optional[PayoutConfiguration] = None
    message_log:     List[AgentMessage]           = Field(default_factory=list)
    errors:          List[str]                    = Field(default_factory=list)
    started_at:      datetime                     = Field(default_factory=datetime.utcnow)
    completed_at:    Optional[datetime]           = None

    def add_message(self, msg: AgentMessage) -> None:
        self.message_log.append(msg)

    def add_error(self, error: str) -> None:
        self.errors.append(f"[{datetime.utcnow().isoformat()}] {error}")

    def last_message_from(self, sender: AgentType) -> Optional[AgentMessage]:
        sender_val = sender.value if hasattr(sender, 'value') else str(sender)
        for msg in reversed(self.message_log):
            if msg.sender == sender_val or msg.sender == sender:                return msg
        return None

