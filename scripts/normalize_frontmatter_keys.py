#!/usr/bin/env python3
"""
Normalize duplicate YAML keys in frontmatter for People markdown files.

Specifically deduplicate `pronouns` and `level_home` keys:
- Keep exactly one occurrence per key in the frontmatter
- Prefer the last non-empty value if duplicates exist; otherwise keep the first
- Preserve the position of the first occurrence of each key

Scope: docs/Io'lokar/People/*.md
"""
from pathlib import Path
import sys
import re

ROOT = Path(__file__).resolve().parents[1]
PEOPLE_DIR = ROOT / "docs" / "Io'lokar" / "People"
KEYS = {"pronouns", "level_home", "rank"}

line_key_re = re.compile(r"^(?P<indent>\s*)(?P<key>\w+):\s*(?P<val>.*)$")


def parse_frontmatter(lines):
    # lines include only frontmatter body (excluding the --- delimiters)
    entries = []
    for idx, ln in enumerate(lines):
        m = line_key_re.match(ln)
        if not m:
            entries.append({"idx": idx, "raw": ln, "key": None})
            continue
        entries.append(
            {
                "idx": idx,
                "raw": ln,
                "key": m.group("key"),
                "indent": m.group("indent"),
                "val": m.group("val"),
            }
        )
    return entries


def normalize_entries(entries):
    changed = False
    # Collect occurrences
    occ = {k: [] for k in KEYS}
    for e in entries:
        k = e.get("key")
        if k in KEYS:
            occ[k].append(e)

    # For each key, if duplicates, compute chosen
    for k, lst in occ.items():
        if len(lst) <= 1:
            continue
        # Determine best value: last non-empty (not '', not '""') else first's value (may be empty)
        def is_non_empty(v: str) -> bool:
            s = v.strip()
            return s not in ("", "''", '""')

        chosen_entry = None
        for e in lst:
            if is_non_empty(e.get("val", "")):
                chosen_entry = e  # keep last seen non-empty
        if chosen_entry is None:
            chosen_entry = lst[0]

        # Keep the position of the first occurrence
        first = lst[0]
        # Build the canonical line using first's indent and key, chosen value as-is
        new_line = f"{first.get('indent','')}{k}: {chosen_entry.get('val','')}"
        if first["raw"] != new_line:
            first["raw"] = new_line
            changed = True

        # Remove all subsequent duplicates by blanking their raw lines
        for e in lst[1:]:
            if e["raw"] != "":
                e["raw"] = ""
                changed = True

    # Rebuild lines, skipping blanked ones
    new_lines = [e["raw"] for e in entries if e["raw"] != ""]
    return new_lines, changed


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return False
    # find end delimiter
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return False
    fm_body = lines[1:end]
    entries = parse_frontmatter(fm_body)
    new_fm, changed = normalize_entries(entries)
    if not changed:
        return False
    new_lines = [lines[0]] + new_fm + [lines[end]] + lines[end + 1 :]
    out = "\n".join(new_lines)
    if text.endswith("\n") and not out.endswith("\n"):
        out += "\n"
    path.write_text(out, encoding="utf-8")
    return True


def main() -> int:
    if not PEOPLE_DIR.exists():
        print(f"Missing directory: {PEOPLE_DIR}", file=sys.stderr)
        return 1
    changed = 0
    files = list(PEOPLE_DIR.glob("*.md"))
    for f in files:
        if process_file(f):
            changed += 1
    print(f"Processed {len(files)} files; normalized {changed}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
