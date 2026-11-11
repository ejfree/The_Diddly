#!/usr/bin/env python3
"""Basic checks for docs/**/*.md: YAML frontmatter and relative links.

Usage: check_docs.py [file ...]   (no args = every file under docs/)
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LINK = re.compile(r"(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
FENCE = re.compile(r"^```.*?^```", re.S | re.M)

errors = []
if len(sys.argv) > 1:
    files = [(ROOT / a).resolve() for a in sys.argv[1:]]
    files = [f for f in files if f.exists() and f.suffix == ".md" and "docs" in f.relative_to(ROOT).parts[:1]]
else:
    files = sorted((ROOT / "docs").rglob("*.md"))

for path in files:
    rel = path.relative_to(ROOT)
    text = path.read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        errors.append(f"{rel}: missing YAML frontmatter")
    else:
        keys = set(re.findall(r"^([A-Za-z_]+):", m.group(1), re.M))
        for k in ("title", "updated"):
            if k not in keys:
                errors.append(f"{rel}: frontmatter missing '{k}'")
    for target in LINK.findall(FENCE.sub("", text)):
        if re.match(r"[a-z]+:|#|/", target):
            continue
        if not (path.parent / target.split("#")[0]).resolve().exists():
            errors.append(f"{rel}: broken link -> {target}")

print("\n".join(errors) or "docs OK")
sys.exit(1 if errors else 0)
