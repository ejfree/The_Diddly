# The Diddly — Knowledge Base

This repository is the canonical, versioned source of truth for The Diddly (Dragon University) setting.

- Authoritative notes live in **/docs** as Markdown.
- Large art/maps live in **/assets**.
- Reusable content skeletons live in **/templates**.
- Import & maintenance helpers live in **/scripts**.

## Getting Started
1. Add your existing notes as Markdown under `docs/` (one concept per file).
2. Put images under `assets/images/` and maps under `assets/maps/`.
3. Run the normalizer task (see below) to add frontmatter & clean filenames.

## VS Code
Open the folder in VS Code and accept the recommended extensions. A task named **Normalize Diddly** runs `scripts/tools/normalize.sh`.
