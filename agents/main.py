"""
VerdaSync AI — Multi-Agent Platform
Entry Point & Demo Runner

Usage:
    export ANTHROPIC_API_KEY="your-key-here"
    python -m agents.main

    # or with custom scenario:
    python -m agents.main --country US --category "Digital SaaS"
"""
from __future__ import annotations
import asyncio
import argparse
import json
import os
import sys
import logging
from agents.models import VendorRegistrationRequest
from agents.orchestrator import MultiAgentOrchestrator

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("verdasync.main")

DEMO_SCENARIOS = {
    "lk_saas": VendorRegistrationRequest(
        vendor_name="TechCraft Solutions",
        contact_email="hello@techcraft.lk",
        country_code="LK",
        business_type="Private Limited Company",
        product_category="Digital SaaS",
        annual_revenue=250_000,
        tax_id="LK-VAT-987654321",
        website="https://techcraft.lk",
        currency="LKR",
    ),
    "us_enterprise": VendorRegistrationRequest(
        vendor_name="NexGen AI Corp",
        contact_email="partners@nexgenai.com",
        country_code="US",
        business_type="LLC",
        product_category="AI Tools & Software",
        annual_revenue=5_000_000,
        tax_id="US-EIN-12-3456789",
        website="https://nexgenai.com",
        currency="USD",
    ),
    "de_services": VendorRegistrationRequest(
        vendor_name="EuroSoft GmbH",
        contact_email="info@eurosoft.de",
        country_code="DE",
        business_type="GmbH",
        product_category="Professional Services",
        annual_revenue=1_200_000,
        tax_id="DE-VAT-DE123456789",
        website="https://eurosoft.de",
        currency="EUR",
    ),
    "sg_physical": VendorRegistrationRequest(
        vendor_name="AsiaTech Distributors",
        contact_email="ops@asiatech.sg",
        country_code="SG",
        business_type="Pte Ltd",
        product_category="Physical Goods",
        annual_revenue=800_000,
        tax_id="SG-GST-201234567A",
        website="https://asiatech.sg",
        currency="SGD",
    ),
}


def print_banner() -> None:
    print("""
╔══════════════════════════════════════════════════════════╗
║         VerdaSync AI — Multi-Agent Platform              ║
║  GRRA × VMA × RMA  |  Powered by Claude Agents          ║
╚══════════════════════════════════════════════════════════╝
""")


def print_result(result) -> None:
    summary = result.summary()
    print(f"\n{'═'*60}")
    print(f"  WORKFLOW RESULT")
    print(f"{'═'*60}")
    print(json.dumps(summary, indent=2, default=str))
    print(f"{'═'*60}")

    if result.success:
        print(f"""
  🟢 VENDOR FULLY ONBOARDED
  ─────────────────────────
  Vendor ID   : {result.vendor_profile.vendor_id}
  Tier        : {(result.vendor_profile.tier.value if hasattr(result.vendor_profile.tier, 'value') else result.vendor_profile.tier)}
  Score       : {result.vendor_profile.performance_score:.0f}/100
  KYC         : {'✔ Passed' if result.vendor_profile.kyc_passed else '✘ Failed'}
  Gateway     : {result.payout_config.payment_gateway} (LKR collection)
  Payout Rail : {result.payout_config.payout_rail}
  Commission  : {result.payout_config.platform_commission*100:.0f}%  →  Vendor nets {result.payout_config.net_vendor_payout_rate*100:.1f}%
  Messages    : {len(result.state.message_log)} inter-agent messages
""")
    else:
        print(f"""
  🔴 WORKFLOW BLOCKED
  ───────────────────
  Blocked at  : {result.blocked_at}
  Reason      : {result.reason}
  Messages    : {len(result.state.message_log)} inter-agent messages
""")


async def run_demo(scenario_key: str = "lk_saas", api_key: str | None = None) -> None:
    """Run a demo onboarding workflow."""
    request = DEMO_SCENARIOS.get(scenario_key)
    if not request:
        print(f"Unknown scenario '{scenario_key}'. Available: {list(DEMO_SCENARIOS.keys())}")
        sys.exit(1)

    print(f"\n  Scenario   : {scenario_key}")
    print(f"  Vendor     : {request.vendor_name}")
    print(f"  Country    : {request.country_code}")
    print(f"  Category   : {request.product_category}")
    print(f"  Revenue    : ${request.annual_revenue:,.0f}" if request.annual_revenue else "")

    orchestrator = MultiAgentOrchestrator(api_key=api_key)
    result = await orchestrator.run(request)
    print_result(result)
    return result


async def run_custom(
    vendor_name: str,
    email: str,
    country: str,
    business_type: str,
    category: str,
    api_key: str | None = None,
) -> None:
    request = VendorRegistrationRequest(
        vendor_name=vendor_name,
        contact_email=email,
        country_code=country,
        business_type=business_type,
        product_category=category,
    )
    orchestrator = MultiAgentOrchestrator(api_key=api_key)
    result = await orchestrator.run(request)
    print_result(result)


def main() -> None:
    print_banner()

    parser = argparse.ArgumentParser(description="VerdaSync AI Multi-Agent Platform")
    parser.add_argument("--scenario", default="lk_saas",
                        choices=list(DEMO_SCENARIOS.keys()),
                        help="Demo scenario to run")
    parser.add_argument("--vendor",   help="Custom vendor name")
    parser.add_argument("--email",    help="Custom contact email")
    parser.add_argument("--country",  help="ISO country code (LK, US, DE, SG, ...)")
    parser.add_argument("--category", help="Product category")
    parser.add_argument("--biz-type", default="LLC", help="Business type")
    parser.add_argument("--api-key",  help="Anthropic API key (or set ANTHROPIC_API_KEY env var)")
    args = parser.parse_args()

    api_key = args.api_key or os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("⚠  ANTHROPIC_API_KEY not set. Set it via --api-key or environment variable.")
        print("   export ANTHROPIC_API_KEY='sk-ant-...'")
        sys.exit(1)

    if args.vendor:
        asyncio.run(run_custom(
            vendor_name=args.vendor,
            email=args.email or f"contact@{args.vendor.lower().replace(' ','')}.com",
            country=args.country or "LK",
            business_type=args.biz_type,
            category=args.category or "Digital SaaS",
            api_key=api_key,
        ))
    else:
        asyncio.run(run_demo(scenario_key=args.scenario, api_key=api_key))


if __name__ == "__main__":
    main()
