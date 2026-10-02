#!/usr/bin/env bash
set -euo pipefail

# Populate known college and majors for professor files using course mappings.

college_for_major() {
  case "$1" in
    # College of Lore
    "History"|"Prophecy"|"Ancient Relics and Artifacts"|"Ancient Relics & Artifacts")
      echo "College of Lore" ;;
    # Academy of Archano-Elemental and Techno Mechanics
    "Arcanomechanics"|"Elemental Binding"|"Eldritch Engineering")
      echo "Academy of Archano-Elemental and Techno Mechanics" ;;
    # Quintessence Institute
    "Magical Theory"|"Planar Studies"|"Political Intrigue and Diplomacy")
      echo "Quintessence Institute" ;;
    # School of Yield Surging
    "Economic Dominance and Resource Management"|"Mineral Extraction & Refinement"|"Arcane Artifice and Enchantment Studies")
      echo "School of Yield Surging" ;;
    *) echo "" ;;
  esac
}

normalize_major() {
  local m="$1"
  # collapse multiple spaces and canonicalize & variations
  m=$(echo "$m" | sed -E 's/  +/ /g; s/ ?& ?/ \& /g')
  # Unify certain names
  case "$m" in
    "Ancient Relics and Artifacts") echo "Ancient Relics and Artifacts" ;;
    "Ancient Relics & Artifacts") echo "Ancient Relics and Artifacts" ;;
    "Mineral Extraction & Refinement") echo "Mineral Extraction & Refinement" ;;
    *) echo "$m" ;;
  esac
}

update_body_field() {
  local file="$1" key="$2" value="$3"
  # Replace the body line like: **College**: ... / **Major**: ...
  if grep -q "^\\*\\*${key}\\*\\*: *$" "$file"; then
    sed -i '' -E "s/^\\*\\*${key}\\*\\*: *$/**${key}**: ${value}/" "$file"
  elif grep -q "^\\*\\*${key}\\*\\*: " "$file"; then
    sed -i '' -E "s/^\\*\\*${key}\\*\\*: .*/**${key}**: ${value}/" "$file"
  else
    :
  fi
}

shopt -s nullglob
for file in docs/University/Faculty/professor-*.md; do
  # Extract major preference: body Major, Role, or frontmatter title
  major=$(grep -m1 '^\*\*Major\*\*:' "$file" | sed -E 's/^\*\*Major\*\*: *//') || major=""
  if [ -z "$major" ] || [ "$major" = "..." ]; then
    major=$(grep -m1 '^Professor of \*\*' -n "$file" | sed -E 's/.*Professor of \*\*([^*]+)\*\*.*/\1/') || major=""
  fi
  if [ -z "$major" ]; then
    title=$(grep -m1 '^title:' "$file" | sed -E 's/^title: *"?//; s/"?$//')
    if echo "$title" | grep -qi '^Professor of '; then
      major=$(echo "$title" | sed -E 's/^[Pp]rofessor of *//')
    fi
  fi

  major=$(normalize_major "$major")

  college=""
  if [ -n "$major" ]; then
    college="$(college_for_major "$major")"
  fi

  # Update frontmatter: college and major
  if [ -n "$major" ]; then
    # frontmatter major line
    if grep -q '^major:' "$file"; then
      sed -i '' -E "s/^major: *\"[^\"]*\"/major: \"${major}\"/" "$file"
    else
      # Insert after type or title line
      awk -v M="$major" '
        BEGIN{done=0}
        {print}
        /^type:/{if(!done){print "major: \"" M "\""; done=1}}
      ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
  fi

  if [ -n "$college" ]; then
    if grep -q '^college:' "$file"; then
      sed -i '' -E "s/^college: *\"[^\"]*\"/college: \"${college}\"/" "$file"
    else
      awk -v C="$college" '
        BEGIN{done=0}
        {print}
        /^type:/{if(!done){print "college: \"" C "\""; done=1}}
      ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
  fi

  # Update body fields
  [ -n "$major" ] && update_body_field "$file" "Major" "$major"
  [ -n "$college" ] && update_body_field "$file" "College" "$college"

  if [ -n "$college" ]; then
    echo "SET: $file -> college=[$college], major=[$major]"
  else
    echo "NO MAP: $file (major=[$major])"
  fi
done

echo "Done populating college/major."
