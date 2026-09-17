---
title: Uncle Alben — Inventory
updated: 2026-09-16
tags: ["solo", "uncle-alben", "pf2e", "inventory"]
---

# Uncle Alben — Inventory

> **Source:** reconciled against `assets/foundryvttjson/fvtt-Actor-uncle-alben-9MuIf1CmSuTUk4QX.json` (current export, level 12). Prior export: `unclealben11v1.json`.

> ### ⚙ This game uses Automatic Bonus Progression
>
> **ABP replaces every fundamental rune with an automatic, level-based bonus.** Potency, striking, and resilient runes do not exist in this campaign — the character gets their equivalents for free at fixed levels, and they can't be bought, etched, or lost. **Property runes (flaming, etc.) still work normally, and no longer need a potency rune to sit in.**
>
> This explains the export cleanly: the maul reads `potency: 0, striking: 0, property: ["flaming"]` because that is **exactly correct** under ABP. It was not a data glitch. (An earlier revision of this file flagged it as one — that note was wrong and has been removed.)
>
> **What Alben gets at level 12:**
>
> | ABP benefit | Value at 12 | Gained at | Next upgrade |
> |---|---|---|---|
> | Attack Potency | **+2** item bonus to weapon/unarmed attack rolls | L10 | +3 at L16 |
> | Devastating Attacks | **3 weapon damage dice** | **L12 — brand new this level** | 4 dice at L18 |
> | Defense Potency | **+2** item bonus to AC | L11 | +3 at L17 |
> | Save Potency | **+1** item bonus to all saves | L8 | +2 at L14 |
> | Perception Potency | **+1** item bonus to Perception | L7 | +2 at L13 |
> | Skill Potency | +1 to one skill, +1 to a second, **+2** to one of them | L3 / L6 / L9 | +1 to a third at L13 |
>
> **Devastating Attacks going from 2 dice to 3 is the single biggest thing that happened to Alben at this level** — a bigger swing than any of his three new feats. His maul went from 2d12+6 to 3d12+6.
>
> **Skill Potency is unassigned** — see the skills table in [character.md](character.md).

## Weapons & Attacks

| Weapon | Attack Bonus | Damage | Notes |
|--------|-------------|--------|-------|
| **Flaming Maul** | **+22** (expert martial +16, Str +4, **ABP Attack Potency +2**) | **3d12+6** bludgeoning plus **1d6 fire** (3 dice from ABP Devastating Attacks; two-handed, 1.5× Str; flaming property rune) | Two-handed, shove trait; martial hammer group; magical. **No potency or striking rune — correct under ABP.** The flaming rune is the only rune on it, and the only kind of rune worth buying for it. |
| **Tankard** (religious symbol) | **+22** (expert simple +16, Str +4, **ABP Attack Potency +2**) | **3d6+4** bludgeoning (club stats, one-handed) | A plain tankard, not a real weapon — no runes, no magic. Doubles as his **religious symbol**. See below. |

> **GM Note — ABP quietly rehabilitated the tankard.** Under standard runes, swapping the maul for the tankard cost him his potency bonus, his striking rune, *and* his weapon die — the old sheet put it at +19 for 1d6+4 against the maul's +20 for 2d12+6 plus fire, which made it a joke weapon. Under ABP, **attack potency and devastating attacks follow the character, not the weapon**: the tankard hits at the *same* +22 and rolls 3d6+4. It's now roughly half the maul's damage rather than a fifth of it, at no penalty to hit. Every "free hand" turn in [actionplans.md](plans/actionplans.md) got substantially cheaper, and combined with the new Holy Prayer Beads (below) the tankard loadout is now a real tactical option rather than a last resort.

**Flavor (unchanged):** the maul's head is cast/carved in the shape of a squat brandy cask — complete with banding and a bunghole detail — rather than a plain hammer block. A nod to Alben's barkeep past, and it's the cask-shaped ends that ignite when the flaming rune triggers.

> **GM Note — no rapier.** Alben still owns no rapier, which is Cayden Cailean's favored weapon. That leaves three separate abilities inert: **Restorative Strike's** +1 status bonus, **Third Doctrine's** favored-weapon critical specialization, and — new at 12th — **Replenishment of War's** temp HP. See [character.md](character.md).

---

### The Tankard

A plain tankard. Cayden Cailean's religious symbol is a tankard (see [spells.md](spells.md)), so Alben's is the one he drinks out of — the same cup he offers you when he says *"let's have a drink"* (see [liquor.md](rambui/liquor.md#the-ritual-lets-have-a-drink)), and the one he raises in the Big Debut signature moves (see [character.md](character.md#signature-moves--big-debut)).

Mundane. No runes, no magic, no bonuses of any kind. If he hits someone with it, use **club** stats — it isn't a real weapon and doesn't pretend to be. It does, however, benefit from ABP like anything else he swings: **+22 to hit, 3d6+4**.

**What it's actually for.** The maul is **two-handed**, so wielding it leaves Alben no hand for anything else — no scroll, no potion, no raised symbol, and not the Wooden Shield he already owns. Any turn needing a free hand costs an extra Interact to regrip the maul before he can Strike again. Holding the tankard instead costs him about half his damage — but nothing at all on the attack roll — and keeps a hand open:

| Loadout | Turn that becomes possible |
|---|---|
| Tankard + free hand | Activate a scroll (1) + **Restorative Strike** (2) = 3 actions, **no regrip** (see [actionplans.md](plans/actionplans.md)) |
| Tankard + Wooden Shield | Raise a Shield and still Strike — his shield is currently unusable alongside the maul |
| Tankard + **Holy Prayer Beads** ⭑ **new** | Every divine spell he casts heals him **1d4**, or heals one target of a healing spell instead. Also unlocks the beads' once-per-day 4th-rank *Bless*, *Divine Wrath*, *Heal*, or *Cleanse Affliction*. The beads are held-in-one-hand, so this is a tankard-only loadout. |

**Cost of the swap, level 12:** maul 3d12+6 plus 1d6 fire (avg ≈ 29) → tankard 3d6+4 (avg ≈ 14.5). Both at **+22**. Roughly half his damage for a free hand, a raised shield, or a 1d4 heal on every spell — a real decision now, where it used to be an obvious no.

> **GM Note.** It's a religious symbol, which is a mundane item and needs no ruling. It is **not** a holy weapon and gets **no** favored-weapon benefits — Cayden's favored weapon is a rapier, so **Restorative Strike's +1 status bonus** and Third Doctrine's favored-weapon critical specialization do not apply here.

---

## Armor & Shield

| Item | AC Bonus | Notes |
|------|----------|-------|
| **Full Plate** | **+6 item AC** (the armour's own bonus only) | Heavy armor, plate group; Str requirement 4, Dex cap +0, Check Penalty −3, Speed Penalty −10 ft; worn and invested. His **+2 to AC comes from ABP Defense Potency**, not from the armour. |
| **Wooden Shield** | +2 AC (raised) | Hardness 3, HP 12, BT 6; standard wooden shield, no reinforcing rune. Worn, not held — see the Tankard section on why he can't use it with the maul. |

> **GM Note — the plate's runes are dead weight under ABP.** The export still records `potency: 1, resilient: 1` on the Full Plate, left over from before ABP was adopted. Under ABP **both are suppressed and contribute nothing** — his AC bonus comes from **Defense Potency +2** (L11) and his save bonus from **Save Potency +1** (L8). Note that ABP is currently *better* than the runes on both counts, so nothing is being lost; the entries are just stale. Two loose ends for the table:
> - **Clean them off the Foundry item** so the sheet stops implying a bonus it isn't granting. The maul was already cleaned this way; the plate was missed.
> - **Is he owed anything for them?** He paid for a +1 Resilient Full Plate at some point under the old rules. Whether that converts to gold, to a property rune, or to nothing is a GM call — but it should be a decision, not an oversight.
>
> **Correction to an earlier revision of this file:** a prior pass described the resilient rune as applying only against targeted spells, then "fixed" that to say it applies to all saves. Under ABP the rune doesn't apply at all. The **+1 to every save is real** — it just comes from Save Potency. Same number, different source, and it scales to +2 at 14th whatever happens to the armour.

---

## Worn Magic Items

| Item | Level | Price | Notes |
|------|-------|-------|-------|
| **Collar of Empathy** | 9 | 600 gp | Worn/**invested**, companion + invested + primal traits. Paired with a matching bracelet (worn by the companion's owner) — when both are worn and invested, wearer and companion can always sense each other's emotional states and basic physical wants/needs. Activate (1 action, concentrate): perceive through the companion's senses instead of your own (sustainable); you're unaware of your own surroundings while active. |
| **Holy Prayer Beads (Greater)** ⭑ **new** | 11 | 1,400 gp | Held in one hand; divine, healing, vitality. Attunes to Cayden Cailean the first time he casts a divine spell while holding them, reshaping to carry the tankard iconography. **Whenever he casts a divine spell from his own slots while holding the beads, he recovers 1d4 HP** — and if the spell was a healing spell he can hand that 1d4 to one of its targets instead. **Activate (Cast a Spell):** 4th-rank *Bless*, *Divine Wrath*, *Heal*, or *Cleanse Affliction*, **each once per day**. |
| **Aeon Stone (Pearly White Spindle)** ⭑ **new** | 3 | 60 gp | Worn/**invested**; uncommon, magical. Restores **1 HP per minute**, continuously, out of combat — effectively free between-encounter healing. Resonant power (if slotted into a wayfinder): **resistance 1 to void damage**. |
| **Flask of Fellowship** | 2 | 25 gp | Activate: Make an Impression. Pours a drink perfectly suited to the target's tastes as part of the action; grants a +1 item bonus to the Diplomacy check. Purely social — doesn't intoxicate or quench serious thirst. GM may disallow if contextually inappropriate. |

**Invested items:** 3 of 10 — Full Plate, Collar of Empathy, Aeon Stone. The Holy Prayer Beads are *held*, not invested, so they cost him a hand rather than an investiture slot.

> **GM Note — the beads and the two-handed maul.** The Holy Prayer Beads are **held in one hand**, which collides head-on with the hand-economy problem documented under The Tankard below. Holding beads + maul is impossible; holding beads + tankard works and turns every divine spell he casts into a free 1d4. This makes the **tankard loadout meaningfully better than it was** — a utility turn now heals him passively — and it is the strongest argument yet for the tankard as his default grip outside of pure damage rounds. Worth revisiting [actionplans.md](plans/actionplans.md) with the player.

---

## Containers

| Item | Level | Price | Capacity | Contents |
|------|-------|-------|----------|----------|
| **Spacious Pouch (Type I)** #1 | 4 | 75 gp | 25 Bulk | **The bar.** Small Flask Liquor (Random) ×100 and Rambui ×150 — nothing else. |
| **Spacious Pouch (Type I)** #2 | 4 | 75 gp | 25 Bulk | **Everything else.** All scrolls, wands, potions, plus Emergency Rambui ×40 and Rambui — The Last Drop ×10. |
| **Spacious Pouch (Type III)** ⭑ **new** | 11 | 1,200 gp | **100 Bulk** | **Currently empty.** Extradimensional, magical; held in two hands to use. Four times the capacity of either Type I. |

All three are extradimensional and magical, functioning like a bag of holding — contents don't count toward carried Bulk. **Correction:** earlier revisions said the liquor was spread "across both Spacious Pouches"; the export has the bar cleanly separated into pouch #1, with the backup Rambui and the Last Drop filed with the scrolls in #2.

> **GM Note — what is the Type III for?** It's brand new, cost 1,200 gp, and holds nothing. 100 Bulk is far more than his scroll library needs, which points at a logistics purpose rather than an adventuring one — moving kegs, stock, or Church fittings (see [littlechurch.md](church/littlechurch.md) and [bigchurch.md](church/bigchurch.md), and the courier arrangement in [liquor.md](rambui/liquor.md#stocking-the-cabinet-without-a-hundred-kegs)). Ask the player what he bought it to carry; it's a large, deliberate purchase with an obvious in-fiction hook attached.

---

## Tools

| Item | Level | Price | Notes |
|------|-------|-------|-------|
| **Healer's Toolkit (Expanded)** ⭑ **new** | 3 | 50 gp | 1 Bulk, **worn**. Required for Medicine checks to Administer First Aid, Treat Disease, Treat Poison, or Treat Wounds, and grants a **+1 item bonus** to all of them — so Treat Wounds at **+19**. Because it's worn rather than stowed, he draws and replaces the tools as part of the action that uses them, costing no extra Interact. **ABP caveat:** Skill Potency is also an *item* bonus, so if Medicine ends up being one of his Skill Potency picks the two **do not stack** — take the higher. At a +2 Skill Potency the toolkit's bonus would be entirely redundant, though he'd still need to carry it, since Treat Wounds requires the kit regardless. |

---

## Consumables

### Alcohol

| Item | Quantity | Stored in | Price (each) | Notes |
|------|----------|-----------|---------------|-------|
| Small Flask Liquor (Random) | 100 | Pouch #1 | 1 sp | Standard alcohol item; DC 12 Fortitude, onset 10 minutes, escalating stages from minor bonus to unconsciousness to death on repeated failures. |
| Rambui (branded **Uncle Alben's Rambui**, "Guaranteed Harsh") | 150 | Pouch #1 | 1 sp | Alben's signature rambutan brandy — mechanically identical alcohol consumable, distinct in name/flavor per `background.md`/`concept.md`. See [rambui.md](rambui/rambui.md#the-brand-uncle-albens-rambui) for the full brand/label details. |
| Emergency Rambui (branded **Uncle Alben's Emergency Rambui**) | 40 | Pouch #2 | 1 sp | A dedicated backup stash, filed with the scrolls rather than with the bar — which is the point of calling it *emergency*. |
| Rambui - The Last Drop (branded **Uncle Alben's Rambui — The Last Drop**) | 10 | Pouch #2 | 1 sp | The good stuff — reserved, presumably, for special occasions or genuine emergencies. |

All four quantities are **unchanged from the prior export** — nothing was drunk, sold, or restocked on the books.

### Scrolls, Wands, and Potions (stored in Spacious Pouch #2 unless noted)

Every line below is **unchanged from the prior export** — no scroll was consumed or acquired between level 11 and 12.

| Item | Level | Price | Quantity |
|------|-------|-------|----------|
| Scroll of Air Bubble (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Cleanse Cuisine (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Create Water (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Putrefy Food and Drink (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Restyle (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Mending (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Heal (Rank 1) | 1 | 4 gp | 2 |
| Scroll of Bless (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Command (Rank 1) | 1 | 4 gp | 2 |
| Scroll of Lock (Rank 1) | 1 | 4 gp | 1 |
| Scroll of Water Breathing (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Resist Energy (Rank 2) | 3 | 12 gp | 2 |
| Scroll of Darkness (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Dispel Magic (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Restoration (Rank 2) | 3 | 12 gp | 2 |
| Scroll of Translate (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Water Walk (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Gentle Breeze (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Enhance Victuals (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Status (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Faerie Fire (Rank 2) | 3 | 12 gp | 1 |
| Scroll of Ring of Truth (Rank 3) | 5 | 30 gp | 1 |
| Scroll of Locate (Rank 3) | 5 | 30 gp | 1 |
| Scroll of Show the Way (Rank 3) | 5 | 30 gp | 1 |
| Scroll of Harm (Rank 3) | 5 | 30 gp | 4 |
| Scroll of Mind of Menace (Rank 3) | 5 | 30 gp | 1 |
| Scroll of Wall of Virtue (Rank 3) | 5 | 30 gp | 1 |
| Scroll of Speak with Plants (Rank 3) | 5 | 30 gp | 1 |
| Scroll of Unfettered Movement (Rank 4) | 7 | 70 gp | 1 |
| Scroll of Restoration (Rank 4) | 7 | 70 gp | 1 |
| Scroll of Fly (Rank 4) | 7 | 70 gp | 1 |
| Scroll of Discern Lies (Rank 4) | 7 | 70 gp | 1 |
| Scroll of Ghostly Tragedy (Rank 4) | 7 | 70 gp | 1 |
| Scroll of Implement of Destruction (Rank 4) | 7 | 70 gp | 1 |
| Wand of Heal (Rank 1) | 3 | 60 gp | 1 |
| Wand of Pampered Pet | 4 | 75 gp | 1 |
| Invisibility Potion | 4 | 20 gp | 1 |
| Potion of Disguise (Lesser) | 5 | 30 gp | 1 |
| Healing Potion (Moderate) | 6 | 50 gp | 1 (carried loose, not in a pouch) |

**Note:** The Spacious Pouches double as the storage system behind the Cabinet's hundred-keg stock — kegs are purchased from real regional suppliers and delivered by magical courier, not conjured. See [liquor.md](rambui/liquor.md#stocking-the-cabinet-without-a-hundred-kegs).

---

## Currency

| Denomination | Quantity | Prior export |
|---------------|----------|--------------|
| Platinum Pieces | 0 | 0 |
| **Gold Pieces** | **1,986** | 135 |
| **Silver Pieces** | **218** | 0 |
| **Copper Pieces** | **329** | 0 |

**Total on hand: ≈ 2,011 gp.**

> **GM Note — a large unexplained windfall.** Gold went from 135 gp to 1,986 gp *and* he bought 2,710 gp of new gear in the same interval (Holy Prayer Beads 1,400 + Spacious Pouch III 1,200 + Aeon Stone 60 + Healer's Toolkit 50). That implies roughly **4,560 gp of income** since the level-11 export, plus the odd silver and copper. The Qualifiers are the obvious source (see [qualifiers.md](qualifiers.md) — "Monte Hall type game," 7 feathers, prize challenges), but nothing in this folder records the actual award. Worth writing down while it's still fresh; it's the largest single change in his finances on record.

---

## GM Note — Changes from prior export

Diff of `fvtt-Actor-uncle-alben-9MuIf1CmSuTUk4QX.json` against `unclealben11v1.json`. Only these inventory lines moved:

**Acquired (4 items, 2,710 gp):**

| Item | Level | Price |
|------|-------|-------|
| Holy Prayer Beads (Greater) | 11 | 1,400 gp |
| Spacious Pouch (Type III) | 11 | 1,200 gp |
| Aeon Stone (Pearly White Spindle) | 3 | 60 gp |
| Healer's Toolkit (Expanded) | 3 | 50 gp |

**Changed:** currency (see above); the maul's potency and striking runes zeroed out — **correct under ABP**, and presumably a cleanup pass rather than a loss (see the ABP box at the top of this file). Its damage went **up** this level regardless, from 2 dice to 3, because Devastating Attacks hit at 12th.

**Unchanged:** everything else. All 44 consumables at identical quantities, both Type I pouches and their contents, the Full Plate and its (ABP-suppressed) runes, the Wooden Shield, the Collar of Empathy, and the Flask of Fellowship.

**Note on the purchase list:** none of the four new items were on [purchase.md](purchase.md), and nothing on that wishlist was bought. The wishlist is unaffected and still stands at ~4,680 gp — which he can now nearly afford outright.

---

## Cross-References

- [character.md](character.md) — Full mechanical character sheet
- [spells.md](spells.md) — Spellcasting stats, prepared combat loadout, and deity details
- [escapeplan.md](plans/escapeplan.md) — Staged escape procedure using the Invisibility Potion and Potion of Disguise (Lesser) listed here
- [concept.md](concept.md) — Character concept and voice
- [background.md](background.md) — Narrative background
