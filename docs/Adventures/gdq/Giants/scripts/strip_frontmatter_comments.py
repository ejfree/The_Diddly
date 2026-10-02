#!/usr/bin/env python3
"""
Strip YAML comments from the frontmatter of markdown files.

Scope: docs/Io'lokar/People
Behavior:
- For lines within the frontmatter (between the first two '---' lines),
  remove YAML comments that start with an unquoted '#'.
- Remove lines that are only comments in the frontmatter.
"""

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
PEOPLE_DIR = ROOT / "docs" / "Io'lokar" / "People"


def strip_inline_comment(line: str) -> str:
    s = line.rstrip("\n")
    # Remove comment-only lines (ignoring leading whitespace)
    if s.lstrip().startswith("#"):
        return ""
    in_single = False
    in_double = False
    for i, ch in enumerate(s):
        if ch == '"' and not in_single:
            in_double = not in_double
        elif ch == "'" and not in_double:
            in_single = not in_single
        elif ch == '#' and not in_single and not in_double:
            # Truncate at the comment start
            return s[:i].rstrip()
    return s


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return False  # no frontmatter
    # Find closing '---'
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        return False  # malformed frontmatter; skip

    changed = False
    fm = lines[1:end_idx]
    new_fm = []
    for ln in fm:
        new = strip_inline_comment(ln)
        if new != ln:
            changed = True
        new_fm.append(new)

    if changed:
        # Preserve structure: join with newlines, keep empty lines as-is
        new_lines = [lines[0]] + new_fm + [lines[end_idx]] + lines[end_idx + 1 :]
        out = "\n".join(new_lines)
        # Ensure trailing newline presence similar to input
        if text.endswith("\n") and not out.endswith("\n"):
            out += "\n"
        path.write_text(out, encoding="utf-8")
    return changed


def main() -> int:
    if not PEOPLE_DIR.exists():
        print(f"People directory not found: {PEOPLE_DIR}", file=sys.stderr)
        return 1
    md_files = list(PEOPLE_DIR.glob("*.md"))
    changed_count = 0
    for f in md_files:
        if process_file(f):
            changed_count += 1
    print(f"Processed {len(md_files)} files; changed {changed_count}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

