#!/usr/bin/env bash
set -euo pipefail

# Align all professor NPC files to the canonical template structure.
# - Skips files that already declare type: npc/professor
# - Derives name, dragon variant, and course from existing frontmatter/filename
# - Preserves any existing course bullets under "## Courses Taught"

shopt -s nullglob

updated_date="$(date -u +"%Y-%m-%d")"

count_total=0
count_updated=0

for file in docs/University/Faculty/professor-*.md; do
  ((count_total++)) || true

  if grep -q '^type: *npc/professor' "$file"; then
    echo "SKIP (already templated): $file"
    continue
  fi

  base=$(basename "$file" .md)
  # Guess name from filename
  guess_name=$(echo "${base#professor-}" | sed -E 's/-/ /g' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}}1')

  # Extract name from frontmatter if present
  fm_name=$(grep -m1 '^name:' "$file" | sed -E 's/^name: *"?//; s/"?$//' || true)
  fm_name=${fm_name#Professor }
  name=${fm_name:-$guess_name}

  # Extract species and derive dragon variant (drop trailing "Dragon")
  species=$(grep -m1 '^species:' "$file" | sed -E 's/^species: *"?//; s/"?$//' || true)
  variant=$(echo "$species" | sed -E 's/[[:space:]]*[Dd]ragon$//' )
  variant_lc=$(echo "$variant" | tr '[:upper:]' '[:lower:]')

  # Extract course from title: "Professor of X"
  fm_title=$(grep -m1 '^title:' "$file" | sed -E 's/^title: *"?//; s/"?$//' || true)
  course_name=""
  if echo "$fm_title" | grep -qi '^Professor of '; then
    course_name=$(echo "$fm_title" | sed -E 's/^[Pp]rofessor of *//')
  fi

  # Capture existing course bullets under "## Courses Taught"
  classes=$(awk '
    BEGIN{cap=0}
    /^## Courses Taught/{cap=1; next}
    /^## /{if(cap==1){cap=0}} 
    cap && /^- /{print}
  ' "$file" || true)
  if [ -z "$classes" ]; then
    classes="- ..."
  fi

  tmp="$(mktemp)"
  {
    printf -- "---\n"
    printf "title: \"Professor %s\"\n" "$name"
    printf "type: npc/professor\n"
    printf "college: \"\"\n"
    printf "major: \"\"\n"
    if [ -n "$variant_lc" ]; then
      printf "tags: [\"professor\", \"college:\", \"major:\",\"variant:%s\"]\n" "$variant_lc"
    else
      printf "tags: [\"professor\", \"college:\", \"major:\",\"variant:\"]\n"
    fi
    printf "updated: %s\n" "$updated_date"
    printf -- "---\n"
    printf "### %s\n\n" "$name"
    if [ -n "$variant" ]; then
      printf "Ancient %s Dragon\n\n" "$variant"
    else
      printf "Ancient Dragon\n\n"
    fi
    printf "### Role\n\n"
    if [ -n "$course_name" ]; then
      printf "Professor of **%s**\n\n" "$course_name"
    else
      printf "Professor of **...**\n\n"
    fi
    printf "**College**: \n\n"
    if [ -n "$course_name" ]; then
      printf "**Major**: %s\n\n" "$course_name"
    else
      printf "**Major**: \n\n"
    fi
    cat <<'BODY'
### Personality

...

### Description

...

### Background

...

### Classes Taught

BODY
    printf "%s\n\n" "$classes"
    cat <<'TAIL'
### Academic Approach

- **Course Focus**: ...
- **Teaching Style**: ...
- **Philosophy**: ...

### Faith and Combat Prowess

- **Faith Alignment**: ...
- **Combat Style**: ...
- **Signature Move**: ...

### Classroom & Teaching Environment

...

### Quotes

...

### Encounter Ideas

...
TAIL
  } > "$tmp"

  mv "$tmp" "$file"
  echo "UPDATED: $file"
  ((count_updated++)) || true
done

echo "Processed: $count_total | Updated: $count_updated"

