import getpass, os, subprocess, sys

print("\nVerdaSync AI — API Key Setup")
print("=" * 40)
print("Go to: https://console.anthropic.com/settings/keys")
print("Create a NEW key, then paste it below.")
print("(The input is hidden — nothing will appear as you type/paste)\n")

key = getpass.getpass("Paste new API key: ").strip()

if not key.startswith("sk-ant-"):
    print(f"\nERROR: Expected 'sk-ant-...' but got: {key[:15]}...")
    sys.exit(1)

print(f"\nKey received: {key[:12]}...{key[-4:]} ({len(key)} chars) ✓")
os.environ["ANTHROPIC_API_KEY"] = key

print("\nStarting workflow...\n")
subprocess.run([sys.executable, "-m", "agents.main", "--scenario", "lk_saas"])
