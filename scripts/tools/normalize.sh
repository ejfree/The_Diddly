#!/usr/bin/env bash
set -euo pipefail

# kebab-case filenames, add YAML frontmatter if missing
shopt -s nullglob
for f in docs/**/*.md docs/*.md; do
  # 1) rename to kebab-case
  dir=$(dirname "$f")
  base=$(basename "$f" .md)
  kebab=$(echo "$base" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
  new="$dir/$kebab.md"
  [ "$f" != "$new" ] && git mv "$f" "$new" 2>/dev/null || mv "$f" "$new"

  # 2) add frontmatter if missing
  if ! head -n1 "$new" | grep -q '^---$'; then
    title=$(echo "$kebab" | sed -E 's/-/ /g' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}}1')
    printf -- "---\ntitle: %s\nupdated: %s\ntags: []\n---\n\n" "$title" "$(date -u +"%Y-%m-%d")" \
      | cat - "$new" > "$new.tmp" && mv "$new.tmp" "$new"
  fi
done
echo "Normalize complete."








# #!/usr/bin/env bash
# set -euo pipefail

# # Normalize all markdown files in docs: kebab-case filenames, add YAML frontmatter if missing
# find docs -type f -name "*.md" | while read -r f; do
#   dir=$(dirname "$f")
#   base=$(basename "$f" .md)
#   kebab=$(echo "$base" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
#   new="$dir/$kebab.md"
#   current="$f"
#   # Rename to kebab-case if needed
#   if [ "$f" != "$new" ]; then
#     if [ ! -f "$f" ]; then
#       echo "Source file does not exist: $f" >&2
#       continue
#     fi
#     mkdir -p "$dir"
#     echo "Renaming: $f -> $new"
#     if command -v git >/dev/null 2>&1; then
#       git mv -k "$f" "$new" 2>/dev/null || mv "$f" "$new" || { echo "Failed to rename $f to $new" >&2; continue; }
#     else
#       mv "$f" "$new" || { echo "Failed to rename $f to $new" >&2; continue; }
#     fi
#     current="$new"
#   fi
#   # Add frontmatter if missing
#   if [ -f "$current" ] && ! head -n1 "$current" | grep -q '^---$'; then
#     echo "Adding frontmatter: $current"
#     title=$(echo "$kebab" | sed -E 's/-/ /g' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}}1')
#     {
#       printf -- "---\n"
#       printf "title: %s\n" "$title"
#       printf "updated: %s\n" "$(date -u +"%Y-%m-%d")"
#       printf "tags: []\n"
#       printf -- "---\n\n"
#       cat "$current"
#     } > "$current.tmp" && mv "$current.tmp" "$current"
#   fi
# done
# echo "Normalize complete."
