# Uncle Alben — Solo Folder Knowledge Base

## Isolation Rule (Read First)

This folder (`docs/solo/uncle-alben/`) is a **self-contained, isolated dataset** for the solo character **Uncle Alben** only, per the main repository's `docs/solo/` isolation convention.

- **Only use material found within this folder** when working here. Do not pull in lore, stats, NPCs, or continuity from the main campaign (party, adventures, setting, university, iolokar) or from any other `docs/solo/<name>/` folder, unless the user explicitly asks for a crossover.
- Nothing in this folder should be referenced or assumed when working on the main campaign or any other solo folder, unless explicitly instructed.
- Treat this folder as its own sandbox with no implicit shared continuity with anything outside it.

---

## What This Is

**Uncle Alben** is a level 11 Orc (Rainfall Orc heritage) Cleric (Warpriest Doctrine) with a Gladiator archetype, worshiping Cayden Cailean. He's a barkeep-turned-cleric: loud, warm, generous, perpetually a little drunk, and devoted to his signature rambutan brandy ("Rambui") and his mandarin duck companion, Solomon. This folder is his full character reference — concept, background, mechanical sheets, inventory, spells, action plans, and supporting lore (his liquor cabinet, his brewing process).

**System:** Pathfinder 2e
**Character type:** Solo/side character (not part of the main campaign party)

---

## Directory Structure

```
docs/solo/uncle-alben/
  CLAUDE.md              — this file
  concept.md             — original freeform character concept (source of truth for voice/flavor)
  background.md          — narrative background (faith, Solomon, portraits, FoundryVTT token prompts, voice)
  character.md           — mechanical sheet (abilities, defenses, skills, feats, languages, feat timeline)
  inventory.md           — weapons, armor, worn items, containers, consumables, currency
  spells.md              — spellcasting stats, Prepared Combat/Social Loadouts, Divine Font, deity block
  purchase.md            — upcoming items Alben intends to buy (not yet in inventory.md)

  church/
    distillerysanctum.md — Alben's first fixed distillery, his inner sanctum
    littlechurch.md       — the Little Church / Sippin' Club, his first public venue
    bigchurch.md          — the multistory Big Church the Little Church grows into
    megachurch.md         — stub for a future 24/7 mega-venue expansion (not yet developed)
    first-aspirant.md     — Juna, the first Aspirant to join the Little Church

  rambui/
    rambui.md             — Alben's personal Rambui brewing process, crafting mechanics, mishap table, HFCS legend
    liquor.md             — 100-entry Tian Xia-themed hard liquor cabinet, drink-offering ritual, signature bottles

  plans/
    actionplans.md        — combat playbooks (melee, spell attacks, reactions, counters, battle tactics)
    campactivities.md     — downtime/camp activity notes
    escapeplan.md         — staged combat escape procedure
    planar.md             — known planes, tuning forks/planar keys, Interplanar Teleport notes

  assets/
    foundryvttjson/       — FoundryVTT character export JSON(s) — source data for sheet updates
    images/               — finished/rendered character art and tokens
    raw/                  — in-progress or reference images awaiting processing
    scripts/              — FoundryVTT macro scripts (e.g. liquor-roll.js, the drink-offering ritual roller)
```

---

## Key Facts

- **Name:** Uncle Alben (confirmed spelling — do not use "Albin").
- **Class/Ancestry:** Cleric (Warpriest Doctrine) + Gladiator archetype dedication; Orc, Rainfall Orc heritage; Barkeep background.
- **Deity:** Cayden Cailean ("The Accidental God") — edicts: drink, aid the oppressed, seek glory and adventure.
- **AC 30**, achieved via **Warpriest's Armor** (class feat) granting heavy armor training, worn with a **+1 Resilient Full Plate**.
- **Signature weapon:** +1 Striking Flaming Maul, its head cast/carved to resemble a squat brandy cask (barrel banding, bunghole detail) rather than a plain hammer block.
- **Rambui:** Alben's own rambutan brandy — a deliberate, proud exaggeration of every rough edge in a refined foreign spirit called "Drambuie." The best Rambui is judged purely on harshness (harsh → harsher is good; smooth/balanced is a failure). Brewed via a strip-mining-style harvest (deliberately mixing the most over-ripe and most under-ripe fruit, avoiding the "reasonable middle"), fermented with wild yeast, roughly distilled, and finished with a "Ruining" step. Every batch is QA-tested by Solomon before bottling. See `rambui.md` for full mechanics (Lore: Alcohol substitutes for Crafting) and the d20 Brewing Mishap & Flourish Table.
- **HFCS:** An in-world legend/rumor Alben has chased for years — an impossibly sweet, mythical brewing ingredient he's never seen or sourced. Presented as an open GM hook, not a defined item (see `rambui.md`).
- **Solomon:** Alben's mandarin duck companion (Pet general feat, minion trait). Wears a **Collar of Empathy** linking his emotional state to Alben's. Rides in a small ornate palanquin mounted on Alben's shoulder. Backstory: Solomon came from a dying regular at Alben's old bar (see `background.md`).
- **Solomon's Road:** A duck-scale private route Alben builds into every venue he owns, so Solomon can leave the building and move between floors without crossing open floor. Appears in all three church files at escalating scale — the mundane **Duck Run** in `distillerysanctum.md`, Juna's named and lit twelve-inch road in `littlechurch.md`, and the six-floor **Warded Galleries** in `bigchurch.md` (Arbiter-renewed *Alarm*/*Illusory Object*/*Lock*, consecrated landings). Governed by three unwritten rules Alben set at the first hole he ever cut: every door opens from the inside with a bill, never fewer than two ways out, and **no ward may ever stop Solomon leaving** — all protections face inward-only. The Collar of Empathy, not any installed ward, is the actual alarm system.
- **The Ritual — "Let's Have a Drink":** Alben's standing habit of offering a drink, with three possible outcomes — "the usual" (Rambui, no roll), "Omakase" (roll against the Liquor Cabinet), or a **called drink** (poured via the Flask of Fellowship, which conjures whatever the target most wants). See `liquor.md`.
- **Key items:** Collar of Empathy, Flask of Fellowship, two Spacious Pouches (Type I) used to store his liquor collection and scrolls.

---

## File Conventions (This Folder Only)

- Each `.md` file has YAML frontmatter: `title`, `updated` (YYYY-MM-DD), `tags`.
- Every file ends with a **Cross-References** section linking to sibling files in this folder only.
- **GM Note —** callouts are used throughout to flag house rulings, mechanical oddities, or reconciliation notes when updating from a new FoundryVTT export (e.g., feat swaps, spell changes, consumable diffs). When a stat/list changes between export versions, prefer an explicit "Updated from prior export" or "GM Note — Changes from prior export" line over silently overwriting old material.
- **FoundryVTT exports** land in `assets/foundryvttjson/` (most recent: `unclealben11v1.json`). When a new export is provided, reconcile it against `character.md`, `spells.md`, and `inventory.md`, calling out every change via GM Notes rather than assuming.
- **Portrait/token Midjourney prompts** live in `background.md` under "Portraits" and "FoundryVTT Tokens." Solomon's token prompt intentionally excludes the palanquin.
- Inventory, spellcasting, and purchase-list data are deliberately split into separate files (`inventory.md`, `spells.md`, `purchase.md`) rather than kept in `character.md`, to keep the core sheet readable.

---

## Working in This Folder

- When asked to update the sheet from a new FoundryVTT JSON export, use `jq` (via terminal) to diff the new export against the currently-documented state before editing — don't guess at changes.
- Preserve existing narrative material; extend rather than overwrite unless asked to replace something specific.
- Keep all lore (Rambui, the Liquor Cabinet, Solomon, HFCS, etc.) internally consistent with what's already established in this folder — check `background.md`, `liquor.md`, and `rambui.md` before introducing new flavor details.
- Do not introduce material from the main campaign's setting, party, or other solo folders into this folder's files, and do not reference this folder's content when working outside it.
