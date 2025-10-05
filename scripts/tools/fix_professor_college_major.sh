#!/usr/bin/env bash
set -euo pipefail

normalize_major() {
  case "$1" in
    "Ancient Relics & Artifacts") echo "Ancient Relics and Artifacts" ;;
    "Elemental Bindings") echo "Elemental Binding" ;;
    "Magical Theory and Application") echo "Magical Theory" ;;
    *) echo "$1" ;;
  esac
}

college_for_major() {
  case "$1" in
    "History"|"Prophecy"|"Ancient Relics and Artifacts"|"Ancient Relics & Artifacts") echo "College of Lore" ;;
    "Arcanomechanics"|"Elemental Binding"|"Eldritch Engineering") echo "Academy of Archano-Elemental and Techno Mechanics" ;;
    "Magical Theory"|"Planar Studies"|"Political Intrigue and Diplomacy") echo "Quintessence Institute" ;;
    "Economic Dominance and Resource Management"|"Mineral Extraction & Refinement"|"Arcane Artifice and Enchantment Studies") echo "School of Yield Surging" ;;
    *) echo "" ;;
  esac
}

extract_major() {
  # Prefer role line: Professor of **X** (use perl for portability)
  perl -ne 'if (/Professor of \*\*(.+?)\*\*/) { print $1; exit }' "$1"
}

update_frontmatter() {
  local file="$1" major="$2" college="$3"
  awk -v M="$major" -v C="$college" '
    BEGIN{inFM=0; seenMajor=0; seenCollege=0}
    NR==1 && $0=="---" {inFM=1; print; next}
    inFM==1 && $0=="---" {
      if (seenCollege==0 && C!="") print "college: \"" C "\""
      if (seenMajor==0 && M!="") print "major: \"" M "\""
      inFM=0; print; next
    }
    inFM==1 {
      if ($0 ~ /^major:/) { if (M!=""){ print "major: \"" M "\"" } else { print } ; seenMajor=1; next }
      if ($0 ~ /^college:/) { if (C!=""){ print "college: \"" C "\"" } else { print } ; seenCollege=1; next }
      print; next
    }
    { print }
  ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
}

update_body() {
  local file="$1" major="$2" college="$3"
  # Update the body Major and College lines if present
  if [ -n "$major" ]; then
    perl -0777 -pe "s/\*\*Major\*\*: *.*/**Major**: ${major}/" -i '' "$file"
  fi
  if [ -n "$college" ]; then
    perl -0777 -pe "s/\*\*College\*\*: *.*/**College**: ${college}/" -i '' "$file"
  fi
}

shopt -s nullglob
for f in docs/University/Faculty/professor-*.md; do
  major=$(extract_major "$f" | sed 's/  \+/ /g')
  major=$(normalize_major "$major")
  college=""; [ -n "$major" ] && college=$(college_for_major "$major")
  update_frontmatter "$f" "$major" "$college"
  # Update body with sed (line-based)
  # Escape ampersands for sed replacement
  major_esc=$(printf '%s' "$major" | sed 's/&/\\\&/g')
  college_esc=$(printf '%s' "$college" | sed 's/&/\\\&/g')
  if [ -n "$major" ]; then
    sed -i '' -E "s/^\*\*Major\*\*: .*/**Major**: ${major_esc}/" "$f" || true
  fi
  if [ -n "$college" ]; then
    sed -i '' -E "s/^\*\*College\*\*: .*/**College**: ${college_esc}/" "$f" || true
  fi
  echo "FIXED: $f (major=$major; college=$college)"
done

echo "Cleanup complete."
