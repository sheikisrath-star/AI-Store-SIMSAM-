"""
VerdaSync AI — Multi-Agent Platform
MultiAgentOrchestrator: sequences GRRA -> VMA -> RMA
"""
import asyncio
import uuid
import logging
from typing import Optional
from agents.models import (
    AgentType, WorkflowState, WorkflowPhase, WorkflowSignal,
    VendorRegistrationRequest, LegalClearance, VendorProfile, PayoutConfiguration,
)
from agents.grra import GRRAAgent
from agents.vma  import VMAAgent
from agents.rma  import RMAAgent

logger = logging.getLogger("verdasync.orchestrator")


class MultiAgentOrchestrator:
    def __init__(self, api_key=None):
        self.grra = GRRAAgent(api_key=api_key)
        self.vma  = VMAAgent(api_key=api_key)
        self.rma  = RMAAgent(api_key=api_key)

    async def run(self, request):
        workflow_id = str(uuid.uuid4())[:8].upper()
        state = WorkflowState(
            workflow_id=workflow_id,
            vendor_request=request,
            phase=WorkflowPhase.LEGAL_REVIEW,
        )
        logger.info(f"[{workflow_id}] Starting onboarding for {request.vendor_name} ({request.country_code})")

        # Phase 1: GRRA
        print(f"\n{'='*60}\n  PHASE 1 -- GRRA: Legal & Compliance Review\n{'='*60}")
        try:
            clearance = await self.grra.audit_vendor(state)
        except Exception as exc:
            return WorkflowResult(workflow_id=workflow_id, success=False,
                blocked_at="GRRA", reason=str(exc), state=state)

        last = state.last_message_from(AgentType.GRRA)
        if last and (last.signal == WorkflowSignal.LEGAL_BLOCK or
                     last.signal == WorkflowSignal.LEGAL_BLOCK.value):
            return WorkflowResult(workflow_id=workflow_id, success=False,
                blocked_at="GRRA", reason=clearance.block_reason or "Legal audit failed",
                state=state, clearance=clearance)

        print(f"\n  GRRA: Legal clearance granted for {request.vendor_name}")
        state.phase = WorkflowPhase.VENDOR_ONBOARD

        # Phase 2: VMA
        print(f"\n{'='*60}\n  PHASE 2 -- VMA: Vendor Onboarding & KYC\n{'='*60}")
        try:
            vendor_profile = await self.vma.onboard_vendor(state, clearance)
        except Exception as exc:
            return WorkflowResult(workflow_id=workflow_id, success=False,
                blocked_at="VMA", reason=str(exc),
                state=state, clearance=clearance)

        last = state.last_message_from(AgentType.VMA)
        if last and (last.signal == WorkflowSignal.KYC_FAILED or
                     last.signal == WorkflowSignal.KYC_FAILED.value):
            return WorkflowResult(workflow_id=workflow_id, success=False,
                blocked_at="VMA", reason="KYC verification failed",
                state=state, clearance=clearance, vendor_profile=vendor_profile)

        print(f"\n  VMA: Vendor profile created -- Tier: {vendor_profile.tier}, Score: {vendor_profile.performance_score}")
        state.phase = WorkflowPhase.FINANCE_CONFIG

        # Phase 3: RMA
        print(f"\n{'='*60}\n  PHASE 3 -- RMA: Revenue & Payout Configuration\n{'='*60}")
        try:
            payout_config = await self.rma.configure_finances(state, vendor_profile)
        except Exception as exc:
            return WorkflowResult(workflow_id=workflow_id, success=False,
                blocked_at="RMA", reason=str(exc),
                state=state, clearance=clearance, vendor_profile=vendor_profile)

        state.phase = WorkflowPhase.COMPLETE
        print(f"\n  RMA: Payout configured -- {payout_config.payout_rail}")
        logger.info(f"[{workflow_id}] COMPLETE -- {request.vendor_name} fully onboarded")

        return WorkflowResult(workflow_id=workflow_id, success=True,
            state=state, clearance=clearance,
            vendor_profile=vendor_profile, payout_config=payout_config)


class WorkflowResult:
    def __init__(self, workflow_id, success, state,
                 blocked_at=None, reason=None,
                 clearance=None, vendor_profile=None, payout_config=None):
        self.workflow_id    = workflow_id
        self.success        = success
        self.state          = state
        self.blocked_at     = blocked_at
        self.reason         = reason
        self.clearance      = clearance
        self.vendor_profile = vendor_profile
        self.payout_config  = payout_config

    @staticmethod
    def _v(val):
        """Extract string from enum or str."""
        return val.value if hasattr(val, 'value') else str(val)

    def summary(self):
        s = {
            "workflow_id": self.workflow_id,
            "success":     self.success,
            "phase":       self._v(self.state.phase),
            "messages":    len(self.state.message_log),
        }
        if not self.success:
            s["blocked_at"] = self.blocked_at
            s["reason"]     = self.reason
        if self.clearance:
            s["legal_clearance"] = {
                "is_cleared":    self.clearance.is_cleared,
                "registrations": self.clearance.required_registrations,
            }
        if self.vendor_profile:
            s["vendor"] = {
                "id":    self.vendor_profile.vendor_id,
                "tier":  self._v(self.vendor_profile.tier),
                "score": self.vendor_profile.performance_score,
                "kyc":   self.vendor_profile.kyc_passed,
            }
        if self.payout_config:
            s["payout"] = {
                "gateway":    self.payout_config.payment_gateway,
                "rail":       self.payout_config.payout_rail,
                "commission": f"{self.payout_config.platform_commission*100:.0f}%",
                "net_vendor": f"{self.payout_config.net_vendor_payout_rate*100:.1f}%",
            }
        return s
