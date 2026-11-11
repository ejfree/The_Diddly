# Architecture Snapshot

## Repository Map

125 modules, 12029 symbols, grouped by area. Every module is in `facts.jsonl`, or query_facts(kind="module").

| Area | Modules | Symbols | Languages |
|------|---------|---------|-----------|
| `foundry` | 119 | 11981 | typescript |
| `docs` | 5 | 48 | python, typescript |
| `scripts` | 1 | 0 | python |

Largest modules:
- `foundry/app/public/scripts/greensock/src` — 1163 symbols (typescript)
- `foundry/app/public/scripts/greensock/esm` — 1004 symbols (typescript)
- `foundry/app/client/documents` — 725 symbols (typescript)
- `foundry/app/client/canvas/placeables` — 620 symbols (typescript)
- `foundry/app/common/data` — 464 symbols (typescript)
- `foundry/app/client/applications/sidebar/tabs` — 323 symbols (typescript)
- `foundry/app/client/applications/sheets` — 296 symbols (typescript)
- `foundry/app/client` — 271 symbols (typescript)
- `foundry/app/common/documents` — 259 symbols (typescript)
- `foundry/app/client/canvas/layers` — 240 symbols (typescript)
- `foundry/app/client/data` — 225 symbols (typescript)
- `foundry/app/public/scripts/greensock/src/utils` — 216 symbols (typescript)
- `foundry/app/client/canvas/containers/elements` — 206 symbols (typescript)
- `foundry/app/client/dice/terms` — 201 symbols (typescript)
- `foundry/app/common/utils` — 199 symbols (typescript)
- `foundry/app/client/applications/elements` — 194 symbols (typescript)
- `foundry/app/common/abstract` — 183 symbols (typescript)
- `foundry/app/client/canvas/sources` — 169 symbols (typescript)
- `foundry/app/client/canvas` — 168 symbols (typescript)
- `foundry/app/client/applications/sheets/journal` — 167 symbols (typescript)

## Extraction Quality

- Files parsed: **1474** / 15692 seen (1 file(s) + 4 directory tree(s) skipped by ignore globs)
- Parse errors: 0

## Architecture Pattern

_No specific architecture pattern detected._

## Entry Points

- **handler**: `foundry/app/client/applications/api.HandlebarsApplicationMixin` (foundry/app/client/applications/api/handlebars-application.mjs)
- **main**: `docs/Adventures/gdq/Giants/scripts/fix_empty_rank_and_home.main` (docs/Adventures/gdq/Giants/scripts/fix_empty_rank_and_home.py)
- **main**: `docs/Adventures/gdq/Giants/scripts/normalize_frontmatter_keys.main` (docs/Adventures/gdq/Giants/scripts/normalize_frontmatter_keys.py)
- **main**: `docs/Adventures/gdq/Giants/scripts/normalize_locations.main` (docs/Adventures/gdq/Giants/scripts/normalize_locations.py)
- **main**: `docs/Adventures/gdq/Giants/scripts/strip_frontmatter_comments.main` (docs/Adventures/gdq/Giants/scripts/strip_frontmatter_comments.py)

## Dependency Rules

- `foundry/app/client/applications/elements` -> `foundry/app/client/applications/forms`
- `foundry/app/client/applications/settings` -> `foundry/app/client/utils`
- `foundry/app/client/applications/sheets` -> `foundry/app/client/applications/forms`
- `foundry/app/client/applications/sidebar` -> `foundry/app/client/applications/forms`
- `foundry/app/client/applications/sidebar` -> `foundry/app/client/applications`
- `foundry/app/client/applications/sidebar` -> `foundry/app/client/utils`
- `foundry/app/client/applications` -> `foundry/app/client/applications/forms`
- `foundry/app/client/applications` -> `foundry/app/client/applications`
- `foundry/app/client/applications` -> `foundry/app/client/utils`
- `foundry/app/client/applications` -> `foundry/app/common/utils`
- `foundry/app/client/canvas/containers` -> `foundry/app/client/canvas`
- `foundry/app/client/canvas/interaction` -> `foundry/app/client/applications`
- `foundry/app/client/canvas/layers` -> `foundry/app/client/utils`
- `foundry/app/client/canvas/placeables` -> `foundry/app/client/applications`
- `foundry/app/client/canvas/placeables` -> `foundry/app/client/canvas`
- `foundry/app/client/canvas/vfx` -> `foundry/app/client/canvas/vfx`
- `foundry/app/client/canvas/vfx` -> `foundry/app/common/utils`
- `foundry/app/client/canvas` -> `foundry/app/client/canvas`
- `foundry/app/client/canvas` -> `foundry/app/client/utils`
- `foundry/app/client/canvas` -> `foundry/app/common/utils`
- `foundry/app/client/data` -> `foundry/app/client/utils`
- `foundry/app/client/dice` -> `foundry/app/common/utils`
- `foundry/app/client/documents` -> `foundry/app/client/utils`
- `foundry/app/client` -> `foundry/app/client/utils`
- `foundry/app/client` -> `foundry/app/common/utils`
- `foundry/app/common/prosemirror` -> `foundry/app/common/prosemirror`
- `foundry/app/common/prosemirror` -> `foundry/app/common/utils`
- `foundry/app/common` -> `foundry/app/common/data`
- `foundry/app/common` -> `foundry/app/common/utils`
- `foundry/app/public/scripts/greensock` -> `foundry/app/public/scripts/greensock/src/utils`
- `foundry/app` -> `foundry/app/common/utils`

## Critical Modules

| Module | Fan-In | Fan-Out | Criticality |
|--------|--------|---------|-------------|
| `foundry/app/common/utils` | 16 | 0 | high |
| `foundry/app/client/utils` | 14 | 0 | high |
| `foundry/app/client/applications` | 4 | 9 | high |
| `foundry/app/client/canvas` | 4 | 5 | medium |
| `foundry/app/common` | 0 | 9 | medium |
| `foundry/app/client/applications/forms` | 6 | 0 | medium |
| `foundry/app/client/canvas/vfx` | 2 | 3 | medium |
| `foundry/app/client` | 0 | 4 | low |
| `foundry/app/client/applications/sidebar` | 0 | 3 | low |
| `foundry/app/common/data` | 3 | 0 | low |

## Risk Zones

- **Cyclic dependency detected (2 modules)** (confidence: 100%): The following modules form a dependency cycle: foundry/app/client/dice -> foundry/app/client/dice/terms -> foundry/app/client/dice. This can cause initialization issues, make refactoring harder, and indicates tight coupling.
- **Cyclic dependency detected (7 modules)** (confidence: 100%): The following modules form a dependency cycle: foundry/app/common -> foundry/app/common/abstract -> foundry/app/common/data -> foundry/app/common/documents -> foundry/app/common/grid -> foundry/app/common/packages -> foundry/app/common/utils -> foundry/app/common. This can cause initialization issues, make refactoring harder, and indicates tight coupling.
- **Cyclic dependency detected (2 modules)** (confidence: 100%): The following modules form a dependency cycle: foundry/app/common/prosemirror -> foundry/app/common/prosemirror/chat -> foundry/app/common/prosemirror. This can cause initialization issues, make refactoring harder, and indicates tight coupling.

---

*Generated at 2026-11-04T03:47:17Z in 3.918349084s. 25265 facts, 207 insights.*
