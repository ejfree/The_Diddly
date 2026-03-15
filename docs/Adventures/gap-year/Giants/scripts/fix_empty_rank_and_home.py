#!/usr/bin/env python3
"""
Across docs/Io'lokar/People:
- If frontmatter `rank` is empty, set it to the `role` value (fallback "Staff" if role empty).
- In the "Residences and Haunts" section, set `- Home level:` to the frontmatter `level_home` when non-empty.

Leaves other fields unchanged.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PEOPLE_DIR = ROOT / "docs" / "Io'lokar" / "People"

fm_line_re = re.compile(r"^(?P<indent>\s*)(?P<key>\w+):\s*(?P<val>.*)$")


def parse_frontmatter(lines):
    data = {}
    indexes = {}
    for i, ln in enumerate(lines):
        m = fm_line_re.match(ln)
        if not m:
            continue
        key = m.group("key")
        val = m.group("val").strip()
        data[key] = val
        indexes[key] = i
    return data, indexes


def set_fm_value(lines, indexes, key, new_val):
    i = indexes.get(key)
    if i is None:
        return False
    m = fm_line_re.match(lines[i])
    if not m:
        return False
    indent = m.group("indent")
    if m.group("val") == new_val:
        return False
    lines[i] = f"{indent}{key}: {new_val}"
    return True


def update_home_level_bullet(body_lines, level_home):
    # Find Residences section header line index
    changed = False
    try:
        start = next(i for i, ln in enumerate(body_lines) if ln.strip().lower().startswith("### residences and haunts"))
    except StopIteration:
        return changed
    # Search forward a reasonable window (e.g., next 40 lines) for '- Home level:'
    for j in range(start + 1, min(len(body_lines), start + 50)):
        ln = body_lines[j]
        if ln.strip().startswith("- Home level:"):
            prefix = ln.split(":", 1)[0]
            new_line = f"{prefix}: {level_home if level_home else 'L?'}"
            if ln != new_line:
                body_lines[j] = new_line
                changed = True
            break
    return changed


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return False
    # locate end of frontmatter
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return False
    fm = lines[1:end]
    body = lines[end + 1 :]
    data, idx = parse_frontmatter(fm)

    changed = False

    # Fix rank if empty
    rank_val = data.get("rank", "")
    if rank_val in ("", "''", '""'):
        role_val = data.get("role", "").strip()
        new_rank = role_val if role_val else "Staff"
        if set_fm_value(fm, idx, "rank", new_rank):
            changed = True

    # Sync Home level bullet to level_home
    lvl = data.get("level_home", "").strip().strip('"\'')
    if update_home_level_bullet(body, lvl):
        changed = True

    if changed:
        out = "\n".join([lines[0]] + fm + [lines[end]] + body)
        if text.endswith("\n") and not out.endswith("\n"):
            out += "\n"
        path.write_text(out, encoding="utf-8")
    return changed


def main() -> int:
    if not PEOPLE_DIR.exists():
        print(f"Missing: {PEOPLE_DIR}")
        return 1
    changed = 0
    files = list(PEOPLE_DIR.glob("*.md"))
    for f in files:
        if process_file(f):
            changed += 1
    print(f"Processed {len(files)}; updated {changed}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

