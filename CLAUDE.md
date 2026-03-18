# The Diddly — Campaign Knowledge Base

## What This Is

**The Diddly** is a Pathfinder 2e (PF2e) campaign set in a heavily customized Eberron, centered on a dragon university. This repo is the authoritative, versioned GM reference for the entire campaign. All content lives in `/docs/` as markdown.

**System**: Pathfinder 2e
**Setting**: Eberron (custom)
**Active arc**: Arc 3 (Gap Year)

---

## Directory Structure

```
docs/
  university/     — Campus, faculty (60+ professors), students, clubs, academics
  adventures/     — Modules and arcs (gap-year is the active one)
  iolokar/        — Secondary city setting, ground-level NPCs and shops
  party/          — Active PC profiles and companion stat blocks
  setting/        — World lore, ages, doctrines, plagues, factions
  memory/         — Campaign canon rules and key facts

assets/
  images/         — Character art, illustrations
  maps/           — Campaign and location maps

templates/        — Markdown templates for professors, students, rooms, shops
```

---

## Campaign Structure

### Arc 2.5 — Seven Dooms of Sandpoint (Active)
Bottom 3 layers of the Pit. Concludes with trail-of-giants discovery.

### Arc 3 — Gap Year (development)
Giant chain → Drow War City. Each zone is a separate module:

| Zone | Encounter |
|------|-----------|
| G1 | Hill Giants |
| G2 | Frost Giants |
| G3 | Fire Giants |
| D1 | Troglodytes / Underdark entry |
| D2 | Kuo-toa Warrens |
| D3 | Xil — Drow War City (climax) |

The giant chain is Lolth's design; PCs completing it confirms the Black Coil prophecy.

---

## Key Lore

### The Metaplot
- **Lolth** is running a 250-year plan (currently year ~217) to destabilize Eberron
- Strategy: spread the **Pale Choir** (Xoriat-engineered insanity plague) through dragon hoards
- End goal: free Tiamat, fracture the Draconic Council
- Drow uprising + giant chain are components of a larger proxy war

### The Pale Choir (Insanity Plague)
- Bioweapon that only affects dragons
- Spreads via hoard contamination and breath adjacency
- 3 stages: obsessive behaviors → paranoia → psychosis
- PF2e mechanics: Fortitude saves, stage progressions, treatment rules
- **GM secret**: Faculty are unknowingly infected — driving excessive eggie (1st-year) deaths

### Drow City of Xil (D3 Climax)
- Rebuilt Vault of the Drow, converted to PF2e
- 6 major houses + 2 minor on the Council
- ~2,700 drow + 4,000–5,000 auxiliaries
- Houses: Xilrath (military), Veythrae (arcane), Dravun (beasts), Thalmyr (espionage), Velouryn (wealth), Zhaelor (fanaticism), Vorryn (records), Draethi (execution)

### Fourth Age / Prophecy
- Current age = "Redemption" (draconic view) or "Reckoning" (mortal view)
- PCs are the "Young Wings" in prophecy
- Draconic Council factions: Redeemers vs. Preservationists vs. Purifiers
- Extinction Branch if Xoriat resonance goes unchecked

---

## Active Party

| PC | Heritage | Major |
|----|----------|-------|
| Aura | Half-dragon (blue/white) | Elemental Binding |
| Celedyr | Vortex dragon | History |
| Iyri | — | Elemental Binding |
| Nara | Kobold | Prophecy |
| Julian | — | — |
| Gullinbursti (Gullin) | — | — |

**Sausage** — Shadow weasel companion with complex personality and full stat block.

Retired PCs: Atrius, Iouna, Pixie

---

## File Conventions

- **Format**: All files are markdown with YAML frontmatter
- **Naming**: `kebab-case`, lowercase
- **Dates**: `updated: YYYY-MM-DD` in frontmatter
- **Archives**: Prefix `z-archive/` or `z-retired/` for deprecated material
- **Location codes**: Letter + number (A1, B3, G-City) for grid-based zones
- **Professor files**: `professor-[name].md`

### Frontmatter template
```yaml
---
title: Page Title
updated: YYYY-MM-DD
tags: ["tag1", "tag2"]
---
```

### Tags to know
- `arc3`, `draconic`, `prophecy` — campaign phase
- `drow`, `xil`, `drow-house-overview` — faction/location
- `pf2e` — system-specific rules
- `professor`, `student`, `npc` — character types

---

## Mechanical Style

- Class combos: "X with Y dedication" (e.g., "Cleric with Rogue dedication")
- Stat blocks: level, abilities, saves, damage inline in character files
- Knowledge DCs: Common / Uncommon / Rare / Esoteric tiers
- Encounter balance: XP awards and difficulty scaling per PF2e rules
- House TOEs (Table of Organization & Equipment) with precise troop counts

---

## Critical Files

| File | Purpose |
|------|---------|
| `docs/setting/background/fourth-age.md` | Age doctrine and Doom Clock |
| `docs/setting/background/insanity-plague.md` | Pale Choir mechanics |
| `docs/adventures/gap-year/drow/council-of-houses.md` | Canonical drow politics |
| `docs/adventures/gap-year/drow/houses/` | Individual house files (matrons, troop counts) |
| `docs/party/` | Active PC profiles |
| `templates/` | File templates for new content |

---

## Working in This Repo

- One concept per file (modular design)
- Use templates for new professors, students, rooms, shops
- Internal links use relative paths
- Images ref `assets/images/`, maps ref `assets/maps/`
- Update `updated:` date when modifying a file
- Commit with descriptive messages (see recent history for style)
