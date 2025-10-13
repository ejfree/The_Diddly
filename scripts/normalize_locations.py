#!/usr/bin/env python3
"""
Normalize frontmatter and key bullets for Io'lokar Locations.

Actions per file:
- Deduplicate frontmatter keys `level` and `owner` (keep single entry, prefer last non-empty value).
- If frontmatter `owner` is empty, attempt to extract owner name from body line starting with
  `- Owner/Manager:` or `- Owner:` and set it.
- Sync body bullet `- Level:` (under "### Location Details") to match frontmatter `level` when present.

Scope: docs/Io'lokar/Locations/*.md
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
LOC_DIR = ROOT / "docs" / "Io'lokar" / "Locations"

fm_re = re.compile(r"^(?P<indent>\s*)(?P<key>\w+):\s*(?P<val>.*)$")


def strip_inline_comment(line: str) -> str:
    s = line.rstrip("\n")
    if s.lstrip().startswith('#'):
        return ""
    in_single = False
    in_double = False
    for i, ch in enumerate(s):
        if ch == '"' and not in_single:
            in_double = not in_double
        elif ch == "'" and not in_double:
            in_single = not in_single
        elif ch == '#' and not in_single and not in_double:
            return s[:i].rstrip()
    return s


def split_frontmatter(text: str):
    lines = text.splitlines()
    if not lines or lines[0].strip() != '---':
        return None, None, None
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            end = i
            break
    if end is None:
        return None, None, None
    return lines, 1, end


def dedupe_keys(fm_lines, keys):
    changed = False
    # collect occurrences
    occ = {k: [] for k in keys}
    parsed = []
    for idx, ln in enumerate(fm_lines):
        m = fm_re.match(ln)
        if m:
            k = m.group('key')
            parsed.append((idx, k, m))
            if k in keys:
                occ[k].append((idx, m.group('indent'), m.group('val')))
        else:
            parsed.append((idx, None, None))

    for k, lst in occ.items():
        if len(lst) <= 1:
            continue
        # choose last non-empty value
        def nonempty(v):
            s = v.strip()
            return s not in ('', "''", '""')
        chosen_val = None
        for (i, indent, val) in lst:
            if nonempty(val):
                chosen_val = val
        if chosen_val is None:
            chosen_val = lst[0][2]
        first_i, first_indent, _ = lst[0]
        new_line = f"{first_indent}{k}: {chosen_val}"
        if fm_lines[first_i] != new_line:
            fm_lines[first_i] = new_line
            changed = True
        # blank subsequent occurrences
        for (i, _indent, _val) in lst[1:]:
            if fm_lines[i] != '':
                fm_lines[i] = ''
                changed = True
    # compact blanks (but preserve order)
    if changed:
        new_fm = [ln for ln in fm_lines if ln != '']
        return new_fm, True
    return fm_lines, False


owner_line_re = re.compile(r"^-\s*(Owner/Manager|Owner):\s*(?P<rest>.+)$", re.IGNORECASE)
md_link_re = re.compile(r"\[(?P<text>[^\]]+)\]\([^)]*\)")


def extract_owner_from_body(body_lines):
    for ln in body_lines:
        s = ln.strip()
        m = owner_line_re.match(s)
        if not m:
            # Try bold label formats like '**Owner**: Name'
            if 'owner' in s.lower():
                # Remove markdown bold markers
                s_plain = s.replace('**', '')
                m2 = re.search(r"(?i)owner\s*:\s*(?P<rest>.+)$", s_plain)
                if not m2:
                    continue
                rest = m2.group('rest')
            else:
                continue
        else:
            rest = m.group('rest')
        # Prefer markdown link text if present
        m2 = md_link_re.search(rest)
        if m2:
            return m2.group('text').strip()
        # Else take up to first '(' or ','
        cut_pos = len(rest)
        for ch in ('(', ','):
            p = rest.find(ch)
            if p != -1:
                cut_pos = min(cut_pos, p)
        name = rest[:cut_pos].strip()
        # Remove any leading descriptors
        return name
    return None


def sync_level_bullet(body_lines, level_val):
    if not level_val:
        return False
    changed = False
    # Locate "### Location Details" section
    try:
        start = next(i for i, ln in enumerate(body_lines) if ln.strip().lower().startswith('### location details'))
    except StopIteration:
        return False
    for j in range(start + 1, min(len(body_lines), start + 40)):
        ln = body_lines[j]
        if ln.strip().startswith('- Level:'):
            prefix = ln.split(':', 1)[0]
            new_line = f"{prefix}: {level_val}"
            if ln != new_line:
                body_lines[j] = new_line
                changed = True
            break
    return changed


def process_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    split = split_frontmatter(text)
    if split[0] is None:
        return False
    lines, fm_start, fm_end = split
    fm = lines[fm_start:fm_end]
    # Strip comments within frontmatter
    new_fm = [strip_inline_comment(ln) for ln in fm]
    if new_fm != fm:
        fm = new_fm
        changed = True
    body = lines[fm_end + 1:]

    changed = 'changed' in locals() and changed or False

    # Deduplicate frontmatter keys
    fm, ch = dedupe_keys(fm, {'level', 'owner'})
    changed = changed or ch

    # Parse fm values
    fm_vals = {}
    for ln in fm:
        m = fm_re.match(ln)
        if m:
            fm_vals[m.group('key')] = m.group('val').strip().strip('"\'')

    # Align frontmatter owner to match body owner when present; else ensure not empty
    body_owner = extract_owner_from_body(body)
    if body_owner:
        # Upsert owner to match body value
        updated = False
        for i, ln in enumerate(fm):
            m = fm_re.match(ln)
            if m and m.group('key') == 'owner':
                desired = f"owner: \"{body_owner}\""
                if fm[i] != desired:
                    fm[i] = desired
                    changed = True
                updated = True
                break
        if not updated:
            fm.insert(0, f"owner: \"{body_owner}\"")
            changed = True
        fm_vals['owner'] = body_owner
    else:
        # No body owner line; ensure owner exists (set Unknown if empty)
        if not fm_vals.get('owner'):
            updated = False
            for i, ln in enumerate(fm):
                m = fm_re.match(ln)
                if m and m.group('key') == 'owner':
                    fm[i] = f"owner: \"Unknown\""
                    updated = True
                    changed = True
                    break
            if not updated:
                fm.insert(0, f"owner: \"Unknown\"")
                changed = True
            fm_vals['owner'] = 'Unknown'

    # Sync '- Level:' bullet
    if fm_vals.get('level'):
        if sync_level_bullet(body, fm_vals['level']):
            changed = True

    # Normalize tags to include iolokar, category, subcategory, level
    # Find tags line in fm
    tag_idx = None
    tags_line = None
    for i, ln in enumerate(fm):
        m = fm_re.match(ln)
        if m and m.group('key') == 'tags':
            tag_idx = i
            tags_line = ln
            break
    cat = fm_vals.get('category', '')
    subcat = fm_vals.get('subcategory', '')
    lvl = fm_vals.get('level', '')
    # Parse existing tags (simple one-line list)
    existing = []
    if tags_line and '[' in tags_line and ']' in tags_line:
        inside = tags_line.split('[',1)[1].rsplit(']',1)[0]
        parts = [p.strip() for p in inside.split(',') if p.strip()]
        for p in parts:
            if p.startswith('"') and p.endswith('"'):
                existing.append(p[1:-1])
            elif p.startswith("'") and p.endswith("'"):
                existing.append(p[1:-1])
            else:
                existing.append(p)
    # Build required set
    required = []
    if 'iolokar' not in existing:
        required.append('iolokar')
    # Remove any old category/subcategory/level tags; we will re-add from fm
    others = [t for t in existing if not (t == 'iolokar' or t.startswith('category:') or t.startswith('subcategory:') or t.startswith('level:'))]
    if cat:
        required.append(f'category:{cat}')
    if subcat:
        required.append(f'subcategory:{subcat}')
    if lvl:
        required.append(f'level:{lvl}')
    new_tags = []
    # Maintain 'iolokar' first
    if 'iolokar' in existing or 'iolokar' in required:
        new_tags.append('iolokar')
    new_tags.extend([t for t in required if t != 'iolokar'])
    new_tags.extend(others)
    new_line = f"tags: [" + ",".join(f'"{t}"' for t in new_tags) + "]"
    if tag_idx is not None:
        if fm[tag_idx] != new_line:
            fm[tag_idx] = new_line
            changed = True
    else:
        # Insert tags after title if missing
        fm.insert(1, new_line)
        changed = True

    if not changed:
        return False
    out = "\n".join(['---'] + fm + ['---'] + body)
    if text.endswith('\n') and not out.endswith('\n'):
        out += '\n'
    path.write_text(out, encoding='utf-8')
    return True


def main() -> int:
    if not LOC_DIR.exists():
        print(f"Missing: {LOC_DIR}")
        return 1
    changed = 0
    files = list(LOC_DIR.glob('*.md'))
    for f in files:
        if process_file(f):
            changed += 1
    print(f"Processed {len(files)}; updated {changed}.")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
