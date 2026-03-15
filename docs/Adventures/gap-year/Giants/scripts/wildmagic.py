import json
import uuid
from pathlib import Path

# Input file — your existing JSON
src = Path("../docs/Setting/wild_magic_table_full.json")
dst = Path("../docs/Setting/wild_magic_foundry.json")

with src.open() as f:
    data = json.load(f)

foundry = {
    "name": "Wild Magic Table",
    "description": "PF2e Wild Magic effects (1–100)",
    "results": [],
    "formula": "1d100",
    "replacement": True,
    "displayRoll": True,
    "img": "icons/magic/control/energy-stream-link-teal.webp"
}

for entry in data:
    foundry["results"].append({
        "_id": str(uuid.uuid4()),
        "type": 0,
        "text": f"{entry['dice']}: {entry['effect']}",
        "range": [entry["dice"], entry["dice"]],
        "weight": 1,
        "drawn": False
    })

with dst.open("w") as f:
    json.dump(foundry, f, indent=2)

print(f"✅ Created Foundry RollTable JSON: {dst}")
