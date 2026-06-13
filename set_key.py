"""Run this once to securely write your API key to .env"""
import getpass
from pathlib import Path

key = getpass.getpass("Paste your Anthropic API key (input is hidden): ").strip()

if not key.startswith("sk-ant-"):
    print("ERROR: Key should start with sk-ant-")
else:
    Path(".env").write_text(f"ANTHROPIC_API_KEY={key}\n")
    print(f"Saved! Key ends with: ...{key[-6:]}")
    print("Now run: python -m agents.main --scenario lk_saas")
