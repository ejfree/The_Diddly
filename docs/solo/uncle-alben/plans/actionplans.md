---
title: Uncle Alben — Action Plans
updated: 2026-08-01
tags: ["solo", "uncle-alben", "pf2e", "action-plans", "combat"]
---

# Uncle Alben — Action Plans

> Quick-reference combat playbooks built from his **Prepared Combat Loadout** ([spells.md](../spells.md)) and class features/feats ([character.md](../character.md)). Use this page mid-combat instead of re-deriving tactics from the full sheets every round.
>
> **Baseline numbers:** Melee Strike (maul) +20, 2d12+6 bludgeoning plus 1d6 fire; Spell Attack +19; Spell DC 29; AC 30; Focus Points 2/2.

---

## Melee Attacks

### Shove Options

The **+1 Striking Flaming Maul** has the **shove** trait, and Alben's **Titan Wrestler** skill feat lets him Shove (or Disarm, Grapple, Reposition, Trip) creatures up to **two sizes larger than himself** — meaning he can shove Huge creatures without penalty.

| Option | Action Cost | Notes |
|--------|-------------|-------|
| **Strike-and-Shove** | 1 action (Strike) | The maul's shove trait lets a hit shove the target 5 feet instead of dealing damage, or the Strike can be used as the attack roll for a Shove action on a critical hit at no extra cost, per weapon-trait rules — confirm with GM table variant in use. |
| **Shove (Athletics)** | 1 action | Athletics +19 vs. Fortitude DC. Works on creatures up to two sizes larger (Titan Wrestler). Use to create space, push a foe off a ledge/into hazards, or peel a target off a downed ally. |
| **Shove into Blade Barrier / hazard** | 1 action + prior setup | If **Blade Barrier** (see Battle Tactics) is already up, shoving an enemy into or through it adds free damage. |

**When to use:** Positioning fights, protecting a downed ally, or setting foes up against terrain/hazards/other party AoE.

### Smite / Cast Down Attack

Alben's two signature melee-spell hybrids both consume a prepared **Harm** (or **Heal**) spell to turn a weapon Strike into a spell attack as well.

| Feat | Action Cost | Effect |
|------|-------------|--------|
| **Channel Smite** | 2 actions | Expend a prepared *Harm* or *Heal*. Make a melee Strike; on a hit, the 1-action version of the expended spell is cast on the target as extra damage (no manipulate trait), and the target automatically takes a failure (or critical failure on a critical hit) against the spell — no separate save roll needed. If the Strike misses, the spell fizzles with no effect. |
| **Cast Down** | Sets up the *next* action | If the very next action is casting *Harm* or *Heal* to damage a creature, that target is knocked **prone** if it takes any damage; on a critical failure against the spell, it also takes a −10-foot status penalty to Speed for 1 minute. |

**Recommended combo (3–4 actions across a turn/reaction window):**
1. Cast **Harm** (1–2 actions) to damage a target — triggers **Cast Down**, likely dropping them prone.
2. Follow with a **Channel Smite** next turn (or same turn if actions remain) to convert a Strike into a second burst of spell damage while they're still prone (off-guard).

**When to use:** Focus-fire on a single dangerous melee target, or opening a fight against a target you want grounded before your martial allies close in (prone gives off-guard to all attackers).

---

## Spell Attacks

### Harm

**Harm** is Alben's primary offensive spell — void trait, deals negative energy damage to living creatures (heals undead instead — see Counters below). It's prepared in the **1st-, 2nd-, and 5th-rank slots** of the Combat Loadout, giving him three uses per day, at three different power levels, before touching his Divine Font slots.

| Use | Rank | Notes |
|-----|------|-------|
| Standard cast | 1 action | Melee-range touch spell, spell attack +19 or target's Fortitude save vs. DC 29 (check the spell's exact targeting mode — 1-action Harm is a melee touch spell attack). |
| Paired with **Channel Smite** | Free (spell is expended as part of the Strike) | See Melee Attacks above. |
| Paired with **Cast Down** | Triggers automatically | See Melee Attacks above. |
| Higher-rank casting (5th-rank slot) | 1–2 actions | Larger damage die at heightened rank — use the 5th-rank prepared Harm when facing a single high-HP target and no undead are present. |

### Other Spell Attacks

| Spell | Rank | Type | Notes |
|-------|------|------|-------|
| **Flame Strike** | 5th | Attack (Reflex save), fire | Vertical column of fire — best against clustered enemies or when Alben has line to drop it from above/behind. |
| **Blade Barrier** | 6th | Attack (Reflex save), force, wall/zone | See Battle Tactics — doubles as an attack and a control effect. |
| **Whirling Scarves** | 3rd | Attack, force | Multiple-target force spell; efficient action economy against 2+ adjacent foes. |
| **Dragon Form** | 6th | Polymorph, self-buff | Not a direct attack, but grants natural attacks and other combat benefits — use as a full-fight investment when a battle is expected to run long, not a quick burst option. |

**Priority order in a straightforward fight:** Cast Down + Harm opener → Channel Smite follow-up → Flame Strike or Whirling Scarves if multiple targets appear → Blade Barrier/Dragon Form if the fight is dragging and he needs a bigger action-economy swing.

---

## All Reaction Options & Triggers

| Reaction/Trigger | Source | Trigger Condition | Effect |
|------------------|--------|--------------------|--------|
| **Shield Block** | First Doctrine (general feat) | Hit by physical damage while shield is raised | Reduce damage by shield's Hardness (3). |
| **Zealous Rush** | Class feat (8th) | Just cast a 1+ action divine spell affecting only himself/his equipment | Stride up to 10 feet (or full Speed if the spell took 2+ actions). Use after self-buff spells (e.g., a self-target *Heal*, *Fly*, *Unfettered Movement*) to reposition for free. |
| **Living for the Applause** | Gladiator archetype (8th, once/day) | Reduced to 0 HP during an encounter with spectators | Remain at 1 HP instead (Wounded +1); Performance check for +1 circumstance AC until end of next turn (crit success doesn't expend the daily use). |
| **Orc Ferocity** | Ancestry feat (5th, once/day) | Reduced to 0 HP but not killed outright | Remain at 1 HP instead (Wounded +1). |
| **Undying Ferocity** | Ancestry feat (9th) | Triggers whenever Orc Ferocity triggers | Gain temporary HP equal to level (11). |

**Priority when dropped to 0 HP:** Orc Ferocity/Undying Ferocity and Living for the Applause can't normally both apply to the same triggering event — if there are spectators in a non-trivial encounter, Living for the Applause is generally the stronger pick (grants an AC bonus on top of survival), otherwise default to Orc Ferocity. Confirm with GM which takes precedence if both are eligible simultaneously.

---

## Counters for Enemy Types

### Counter Energy

- **Scroll of Resist Energy (Rank 2) ×2** (see [inventory.md](../inventory.md)) — cast for resistance against a specific energy type before or during a fight against known elemental threats.
- **Scroll/prepared Dispel Magic** (2nd- and 4th-rank Combat Loadout slots) — counteract ongoing magical effects, including persistent energy-based spells or auras.
- **+1 Resilient Full Plate** — bonus to saves vs. targeted spells while worn, softening energy spell attacks specifically aimed at Alben.

### Counter Undead

**Harm** and **Heal** reverse their normal effects against undead — this is Alben's key tactical lever against undead-heavy encounters:

- **Heal** (Divine Font, 5 rank-6 slots normally reserved for healing the living) instead **damages undead** when targeted at them — Alben can turn his entire Divine Font healing reserve into an undead-slaying resource if a fight calls for it.
- **Harm**, his usual offensive spell, instead **heals undead** — avoid casting Harm at undead targets; switch to Heal (font slots) or fall back on the maul and Channel Smite (which still works using Heal as the expended spell against undead, converting it to bonus damage on a hit).
- **Channel Smite with Heal vs. undead:** expend a *Heal* spell instead of *Harm* when the target is undead — the Strike + spell-damage combo functions the same way, just with the correct spell for the enemy type.
- Scrolls of **Restoration** (2nd and 4th rank) also carry the standard removal-of-conditions utility that's often relevant when undead inflict drain/negative conditions on the party.

**Quick rule of thumb:** *Living targets → Harm. Undead targets → Heal.* Channel Smite and Cast Down both work with either, so the combo isn't lost against undead — just swap which spell gets expended.

---

## Battle Tactics

### Defend Party

- **Shield Block** (reaction) — protect himself when tanking hits; Wooden Shield gives +2 AC raised plus Hardness 3 damage reduction.
- **Dancing Shield** (2nd-rank Combat Loadout) — an animated shield that can defend an ally at range without Alben needing to be adjacent.
- **Wall of Virtue** (Scroll, Rank 3, in [inventory.md](../inventory.md)) — battlefield-spanning defensive line; use to block a chokepoint or shield squishier allies from incoming melee.
- **Blade Barrier** (6th-rank Combat Loadout) — doubles as a defensive wall (blocks/damages anything crossing it) and an offensive area denial tool.
- Positioning: Alben's AC 30 and high HP pool (153) make him the natural target-soak — stand between enemies and squishier allies whenever possible.

### Crowd Control

- **Command** (1st-rank Combat Loadout) — single-action forced movement/action denial on a failed Will save.
- **Cast Down** (feat) — knock a damaged target prone, giving off-guard to all attackers and reducing their mobility.
- **Blade Barrier** — area denial; enemies must cross through it or go around, effectively zoning a battlefield.
- **Dragon Form** — depending on the specific dragon chosen, may grant additional control options (frightful presence, reach, etc. — check the specific heightened/dragon-type effects when cast).
- **Whirling Scarves** — hits multiple adjacent targets at once, useful for softening a cluster before allies engage.

### Targeted Healing

- **Heal** (1-action or 2-action touch/ranged version, Divine Font rank-6 slots ×5) — his primary single-target in-combat heal; use the Divine Font slots liberally since that's their only purpose.
- **Restorative Strike** (class feat, 4th) — cast a 1-action *Harm* or *Heal* (loses manipulate) to heal himself, then Strike; on a hit, a second willing adjacent creature is healed the same amount. Excellent action-economy option: heal + attack + heal an ally in one sequence.
- **Breath of Life** — emergency single-target heal/revive (check current prepared status; historically available as an option — confirm it's still in the active Combat Loadout before relying on it, see [spells.md](../spells.md)).

### Mass Healing

- **Heal**, cast at higher action cost (3 actions), becomes an area burst affecting all creatures in the burst — Alben's best mass-healing option using a Divine Font slot when multiple allies are hurt in the same area.
- Divine Font gives him **5 dedicated rank-6 Heal slots per day** separate from his standard prepared list — treat these as his "panic button" reserve for exactly this kind of multi-ally healing burst, not to be spent on single-target top-offs if it can be helped.

### Other Support

- **Bless** (1st-rank Combat Loadout) — party-wide +1 status bonus to attack rolls; cast turn 1 of most fights.
- **Heroism** (3rd-rank Combat Loadout) — status bonus to attack rolls, Perception, saves; stronger sustained buff for a longer fight.
- **Roaring Applause** (3rd-rank Combat Loadout, emotion/mental) — likely a morale/fear-based support or debuff effect tied to his Gladiator/Performance theme; pairs thematically with Living for the Applause.
- **Marvelous Mount** (2nd- and 5th-rank Combat Loadout) — conjures a mount for faster repositioning or a mobile ally.
- **Fly** / **Unfettered Movement** (4th-rank Combat Loadout) — mobility support for himself or an ally stuck on bad terrain or restrained.

---

## Cross-References

- [spells.md](../spells.md) — Full Prepared Combat Loadout, Spell Notes, and Divine Font details
- [character.md](../character.md) — Full mechanical character sheet, feats, and class features referenced above
- [inventory.md](../inventory.md) — Weapons, armor, and consumable scrolls/wands referenced above
- [background.md](../background.md) — Narrative background
- [concept.md](../concept.md) — Character concept and voice
