---
title: Uncle Alben — Character Sheet
updated: 2026-09-16
tags: ["solo", "uncle-alben", "pf2e", "character-sheet"]
---

# Uncle Alben

> **Source:** reconciled against `assets/foundryvttjson/fvtt-Actor-uncle-alben-9MuIf1CmSuTUk4QX.json` (current export, level 12). Prior export: `unclealben11v1.json` (level 11). See "GM Note — Changes from prior export" at the bottom of this file.
>
> **⚙ This campaign uses Automatic Bonus Progression.** Fundamental runes (potency, striking, resilient) don't exist; their equivalents are granted automatically by level. Property runes still work normally. Every derived number on this sheet already includes his ABP bonuses — see [Automatic Bonus Progression](#automatic-bonus-progression) below for the table and what's still unassigned.

**Ancestry/Heritage:** Orc / Rainfall Orc
**Background:** Barkeep
**Class:** Cleric (Warpriest Doctrine) with Gladiator archetype
**Deity:** Cayden Cailean ("The Accidental God")
**Level:** 12 — *promoted during the Qualifiers, Day 2 (see [qualifiers.md](qualifiers.md))*
**Gender:** He/Him
**Age:** 36
**Height:** 6 ft 9 in (2.06 m)
**Weight:** 430 lb (195 kg)
**Size:** Medium
**Alignment/Key Ability:** Wisdom (key ability)

## Ability Scores

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 19 (+4) | 10 (+0) | 18 (+4) | 10 (+0) | 18 (+4) | 16 (+3) |

**Boost history (from export):**
- **Ancestry (Orc):** Strength, Wisdom
- **Background (Barkeep):** Constitution (forced choice of Con/Cha), Strength (free)
- **Level 1 (4 free boosts):** Strength, Constitution, Wisdom, Charisma
- **Level 5 (4 free boosts):** Strength, Constitution, Wisdom, Charisma
- **Level 10 (4 free boosts):** Constitution, Wisdom, Strength, Charisma

Dexterity and Intelligence have never been boosted. **Unchanged at level 12** — the next boost round is at 15th.

---

## Defenses

**AC** 32 (10 + 0 Dex + 14 trained heavy armor proficiency + 6 Full Plate + **2 ABP Defense Potency**)
**Hero Points** 0 / 3
**HP** 166 / 166 (Ancestry 10 + Class 8/level × 12 + Con 4/level × 12 + Toughness +1/level × 12)
**Resolve/Recovery:** Toughness reduces recovery check DC by 1 (from Toughness general feat)
**Class DC** 28 (10 + 14 trained + Wis +4) — but Third Doctrine lets him substitute his **Spell DC 30**, which is always higher, so use 30 for anything that says "class DC or spell DC, whichever is higher."

| Save | Proficiency | Total |
|------|-------------|-------|
| Fortitude | Expert | **+21** (Con +4, expert bonus +16, ABP Save Potency +1) |
| Reflex | Expert (via Reflex Expertise feat) | **+17** (Dex +0, expert bonus +16, ABP Save Potency +1) |
| Will | Master (via Resolute Faith feat) | **+23** (Wis +4, master bonus +18, ABP Save Potency +1) |

> **GM Note — where the save bonus comes from.** His **+1 to every save is from ABP Save Potency** (gained at 8th, upgrades to +2 at 14th), *not* from the resilient rune still recorded on his Full Plate — ABP suppresses that rune entirely. These totals hold whether or not he's wearing the plate, and they go up at 14th regardless of what he's wearing. (Two earlier revisions of this sheet got this wrong in two different directions; this is the correct reading.)

- **Resolute Faith:** Will proficiency is master; a success on a Will save becomes a critical success.
- **Reflex Expertise:** Reflex proficiency raised to expert.
- **Sanguine Tenacity:** Enfeebled and Drained (and their HP loss) affect Alben as if the condition value were 1 lower; resistance 5 to persistent bleed damage; recovery DC from persistent bleed reduced to 11 (6 with effective aid).
- **Orc Ferocity** (once per day): if reduced to 0 HP but not killed outright, Alben remains at 1 HP instead, and his Wounded condition increases by 1.
- **Undying Ferocity:** whenever Orc Ferocity triggers, Alben also gains temporary HP equal to his level (**12**).
- **Living for the Applause** (Gladiator archetype, once per day): if reduced to 0 HP during a combat encounter with spectators, remains at 1 HP instead (Wounded condition increases by 1), and can attempt a Performance check for a +1 circumstance bonus to AC until the end of his next turn (critical success doesn't expend the daily use).

---

## Perception & Senses

**Perception** Expert, total **+21** (Wis +4, expert bonus +16, **ABP Perception Potency +1**) — proficiency improved via the **Perception Expertise** class feature; the item bonus is automatic from 7th level and rises to +2 at 13th.
**Senses:** Darkvision

---

## Skills

| Skill | Rank | Total | Notes |
|-------|------|-------|-------|
| Acrobatics | Untrained | +0 | — |
| Arcana | Untrained | +0 | — |
| Athletics | Expert | +20 | +2 circumstance on Climb/Swim (Rainfall Orc) |
| Crafting | Untrained | +0 | — |
| Deception | Untrained | +3 | — |
| Diplomacy | Expert | +19 | Trained from Barkeep background |
| Intimidation | Trained | +17 | — |
| Medicine | Trained | +18 | +1 item bonus with the Healer's Toolkit (Expanded) — see [inventory.md](inventory.md) |
| Nature | Trained | +18 | Trained via Beast Trainer feat |
| Occultism | Untrained | +0 | — |
| Performance | Trained | +17 | Trained via Skill Training (Performance), supporting the Gladiator archetype |
| Religion | Master | +22 | Also the check used for **Trick Magic Item** on divine items |
| Society | Untrained | +0 | — |
| Stealth | Untrained | +0 | — |
| Survival | Untrained | +4 | — |
| Thievery | Untrained | +0 | — |
| **Lore: Alcohol** | Trained | +14 | Trained from Barkeep background |

> **GM Note — no rank changes at level 12.** Every skill rank is identical to the level-11 export; the +1 across the board is purely the level increase. No skill increase appears to have been spent for 12th (skill increases come at odd levels in PF2e, so this is expected — the next is at 13th).
>
> **⚠ The totals above do NOT include ABP Skill Potency.** Alben is owed **+1 to one skill, +1 to a second skill, and an upgrade of one of those to +2** (from 3rd, 6th, and 9th level). Nothing in the export records which skills were picked, and Foundry doesn't track the choice. **Add the bonuses by hand to whichever two skills the player named** — and if he never named them, this needs deciding before the next session. See [Automatic Bonus Progression](#automatic-bonus-progression) below for candidates.

**Notable skill feats:**
- **Hobnobber** — Gather Information takes half the normal time (typically 1 hour instead of 2).
- **Skill Training (Performance)** — Grants training in Performance (replaces the previous export's Group Impression at this same feat slot).
- **Glad-Hand** — Can attempt to Make an Impression immediately on meeting someone casually, without the usual 1-minute conversation requirement (with a retry option on failure).
- **Train Animal** — Can teach an animal new Command-able actions over time.
- **Eyes of the City** — Can use Diplomacy or Society to Track creatures through settlements by talking to locals.
- **Titan Wrestler** — Can Disarm, Grapple, Reposition, Shove, or Trip creatures up to two sizes larger than himself.
- **Thorough Search** — Can Search more thoroughly at up to 1/4 Speed for a Perception bonus (and upgrade success to critical success) when Seeking.
- **Trick Magic Item** (**new at 12th**) — Can attempt to activate a magic item he couldn't normally use, provided he knows what activating it does. Roll the skill matching the item's tradition: **Religion +22** for divine, Arcana/Nature/Occultism at +0 for the others (so in practice this is a *divine-items-only* feat for him, plus anything merely `magical` with no tradition trait, which he can also attempt with Religion). Success lets him activate the item for the rest of the turn; critical failure locks him out of that item until his next daily preparations. Because he's only *master* in Religion rather than legendary, items keyed to a spell DC/attack he lacks use the **trained** proficiency bonus.

---

## Class Features & Feats (by category)

### Ancestry (Orc / Rainfall Orc)
- **Rainfall Orc heritage:** +2 circumstance bonus to Athletics checks to Climb or Swim; +1 circumstance bonus to saving throws against disease.
- **Beast Trainer** (ancestry feat, 1st): Trained in Nature; grants the choice of the Pet general feat or Train Animal skill feat (Alben took both — see below and Skills).
- **Orc Ferocity** (ancestry feat, 5th): see Defenses above.
- **Undying Ferocity** (ancestry feat, 9th): see Defenses above.

### Background (Barkeep)
- Trained in Diplomacy and Lore: Alcohol.
- Grants the Hobnobber skill feat.

### Class (Cleric — Warpriest Doctrine)
- **Deity (Cleric):** Trained in one skill (Diplomacy, via background) and with the deity's favored weapon (rapier); sanctified holy (Cayden Cailean allows holy sanctification).
- **Cleric Spellcasting:** Prepared divine spellcaster; key ability Wisdom.
- **Doctrine — Warpriest:**
  - *First Doctrine:* Trained in light and medium armor; expert Fortitude saves; gains the **Shield Block** general feat; gains **Deadly Simplicity** (if favored weapon is simple/unarmed — see GM Note below).
  - *Second Doctrine (3rd):* Trained in martial weapons.
  - *Third Doctrine (7th):* Expert proficiency with deity's favored weapon, martial weapons, simple weapons, and unarmed attacks; critical hits with the favored weapon apply its critical specialization effect; can use spell DC in place of class DC.
  - *Fourth Doctrine (11th):* Spell attack modifier and spell DC proficiency increase to expert.
  - *(Fifth Doctrine at 15th and Final Doctrine at 19th not yet reached. No new doctrine at 12th.)*
- **Divine Font (Healing):** Prepares additional *Heal* spells each day in dedicated "font" slots (see [spells.md](spells.md)).
- **Warpriest's Armor** (class feat, 2nd): Trained in heavy armor; whenever a class feature grants expert or greater proficiency in medium armor, he also gains that proficiency in heavy armor; treats armor of 2 Bulk or higher as 1 Bulk lighter. This is what makes his **Full Plate** (see [inventory.md](inventory.md)) usable at full proficiency, and with ABP Defense Potency +2 it produces his **AC 32**. **Updated from prior export** (`unclealben11v1.json`): this feat now occupies the 2nd-level class feat slot, having replaced **Domain Initiate (Might)** — see GM Note below.
- **Restorative Strike** (class feat, 4th): Cast a 1-action *harm* or *heal* spell (losing its manipulate trait) to heal himself, then make a melee Strike; +1 status bonus to the attack roll if using the deity's favored weapon; on a hit, a second willing creature adjacent to the target can be healed the same amount.
- **Channel Smite** (class feat, 6th; two-action activity): Expend a prepared *harm* or *heal* spell. Make a melee Strike; on a hit, the expended spell's 1-action version is cast on the target as additional damage (losing the manipulate trait), and the target automatically takes a failure (or critical failure, if the Strike crit) on its save. If the Strike misses, or the target isn't damaged by that energy type, the spell is expended with no effect. **New in this export**, replacing **Divine Rebuttal** at this feat slot.
- **Cast Down** (class feat, 8th; requires harmful or healing font): If the next action is casting *harm* or *heal* to damage a creature, that target is knocked prone if it takes any damage from the spell; on a critical failure against the spell, it also takes a −10-foot status penalty to Speed for 1 minute. **New in this export**, replacing **Advanced Domain** at this feat slot.
- **Zealous Rush** (**10th-level class feat slot**): Reaction — after casting a 1+ action divine spell affecting only himself/his equipment, Stride up to 10 feet (or full Speed if the spell took 2+ actions). *(Corrected: prior revisions of this sheet listed this in the 8th-level slot. The export has always had it at `class-10`; Cast Down holds `class-8`.)*
- **Replenishment of War** (**new — 12th-level class feat slot**): Whenever he damages a creature with a Strike using his deity's favored weapon, he gains temporary HP equal to **half his level (6)**, or **equal to his level (12)** if the Strike was a critical hit. The temporary HP lasts until the start of his next turn.
  > **GM Note — Replenishment of War does nothing with the maul.** Cayden Cailean's favored weapon is the **rapier**, and Alben owns no rapier (see [inventory.md](inventory.md)). As written, this feat is inert for his entire current loadout — the maul, the tankard, and his fists all fail the trigger. This is the same trap that already disables **Restorative Strike's** +1 status bonus and Third Doctrine's favored-weapon critical specialization for him. Three options to raise with the player: (a) buy and use a rapier for the turns where the temp HP matters, (b) ask the GM for the common house ruling that a Caydenite's drinking vessel/maul counts as his favored weapon, or (c) treat the feat as a known dead pick and swap it. Do **not** silently grant the temp HP off a maul Strike.

### Archetype (Gladiator)

- **Gladiator Dedication** (archetype feat, 2nd): Grants the Additional Lore general feat for Gladiatorial Lore. At the start of a combat encounter with spectators, gain temporary HP equal to his character level (**12**) for 1 minute, and he can roll Performance for initiative instead of Perception.
  > **GM Note.** The export carries only one Lore item — **Lore: Alcohol**. **Gladiatorial Lore** from this dedication is not present on the sheet. Treat it as trained (+14, Int +0) unless the player intended to drop it.
- **Play to the Crowd** (archetype feat, 4th): Trigger — reduce an enemy to 0 HP during a non-trivial encounter with spectators. Attempt a Performance check (DC set by GM, typically standard level DC or Make an Impression DC, whichever is higher); success grants one benefit, critical success grants two: temporary HP equal to character level (**12**, 1 minute), +1 circumstance bonus to AC until end of next turn, or +1 circumstance bonus to next attack roll before end of next turn.
- **Performative Weapons Training** (archetype feat, 6th): Treats the Bo Staff, Dueling Cape, Spiked Chain, Sword Cane, Trident, War Flail, and Whip as simple weapons for proficiency; critical hits with these weapons apply their critical specialization effect.
- **Living for the Applause** (archetype feat, 8th): See Defenses above.
- **Gladiator's Roar** (**new — archetype feat, 12th**; **2 actions**, once per day; archetype, emotion, fear, auditory): Alben projects his voice into a screech audible at twice the normal distance. Creatures in a **15-foot cone** take **6d10 sonic damage** and must attempt a Fortitude save against his **class DC or spell DC, whichever is higher** — for him that's **DC 30**. If the Roar triggers **Play to the Crowd**, he gains a **+2 status bonus** to that Performance check.
  - **Critical Success** — unaffected.
  - **Success** — half damage, **Frightened 1**.
  - **Failure** — full damage, **Frightened 2**.
  - **Critical Failure** — double damage, **Frightened 3**, and **Stunned 1**.
  > **GM Note — prerequisite not met.** Gladiator's Roar requires **Gladiator Dedication** (✓) and **master in Intimidation**. Alben is only **trained** in Intimidation (+17), and no skill increase was taken at 12th. The feat is on the sheet anyway. Either the table waived the prerequisite, or an Intimidation increase needs to be retroactively assigned at 13th. Flag this with the player before the Roar is used in play.
- **Big Debut** (archetype feat, 10th): Once per day, trigger before rolling initiative — Alben voluntarily goes last in the initiative order instead of rolling. Enemies who can see him must succeed at a Will save against his class DC or spell DC (whichever is higher) or become Stunned 1 (Stunned 2 on a critical failure). As his first action on his first turn, he can Interact to draw/stow a light-Bulk item as a free action; if it's a small garment or accessory (fan, gloves, wine glass, etc.), he gains a +1 circumstance bonus to Charisma-based skill checks until the end of his turn.

#### Signature Moves — Big Debut

Alben has three of these and rotates between them; which one he opens with is a read on the room, not a fixed routine. All three use the same numbers — **Will DC 30** (his spell DC, usable in place of class DC via Third Doctrine) — and all three lean on the same piece of the feat: **he goes last on purpose.** A barkeep's authority isn't exercised when the night starts. It's exercised when he decides the night is over.

Each move also names the **light-Bulk accessory** he draws as his free Interact, which is what earns the +1 circumstance bonus to Charisma-based checks for that turn.

**1. "Last Call"** — *barkeep's authority as a weapon.*
He lets the entire round happen without him. Then he sets one boot on something solid — a table, a rail, a body — and calls last call the way he'd end any ordinary night: cheerfully, unhurried, and with absolute finality. The save isn't against fear. It's the involuntary flinch of every person in the room who has ever been told the night is over by a man that size.
- **Accessory:** his keg holy symbol rung once against the cask head of his maul.
- **Use it when:** the fight is already loud and going badly, and he needs the room to stop and look at him. This is his default when he's arriving *into* trouble rather than starting it.

**2. "The Toast"** — *Cayden's own move.*
Cup raised first to the god, then tilted to the enemy — a real toast, warmly meant, without a trace of irony in it. He wishes them well. He means it. They save against the dawning understanding that he is not remotely afraid of them and does not need to be. A direct descendant of the way he blesses a batch and toasts his god with the same cup in the Sanctum (see [distillerysanctum.md](church/distillerysanctum.md)).
- **Accessory:** the cup itself, or the keg holy symbol raised in his off hand.
- **Use it when:** the enemy is someone he'd genuinely rather not fight, or someone whose dignity he's about to take apart. This is the most Caydenite of the three and the one to reach for when the fight has a moral shape to it.

**3. "Guaranteed Harsh"** — *the brand, as a delivery system.*
He takes a long pull of his own Rambui. Holds it. Swallows. Exhales. The exhale is the threat. Anyone in the front rank saves against the fumes and everything the fumes imply about the man willing to drink that on purpose (see [rambui.md](rambui/rambui.md#the-brand-uncle-albens-rambui)).
- **Accessory:** the bottle or flask he just drank from.
- **Use it when:** the table needs a laugh, or the opposition has been taking themselves too seriously. Mechanically identical to the others; tonally the cheapest shot he owns, and he knows it.

> **GM Note.** These are flavor variants on a single feat, not three separate abilities — Big Debut remains **once per day**, DC 30, Stunned 1 (Stunned 2 on a critical failure), and the accessory bonus is **+1 circumstance to Charisma-based skill checks until the end of that turn** regardless of which move is used. Pick the move at the table for tone; the numbers never change. Note also that the Gladiator Dedication temp HP (equal to level — **12** — with spectators) is already active before he acts, which is what lets him spend his opening beat on a performance instead of a defense.
>
> **New at 12th:** **Gladiator's Roar** is a second, louder answer to the same problem, and it stacks tonally with all three moves — Big Debut opens the room, the Roar clears it. Both key off DC 30, and the Roar is the one that can feed **Play to the Crowd** at +2. They are separate daily uses, so a single encounter can use both.

### General Feats
*(General feat slots come at 3rd, 7th, and 11th; all three are spent.)*
- **Toughness** (**3rd-level general feat slot**): Max HP increases by his level; recovery check DC reduced by 1. *(Corrected: prior revisions listed this at 1st, which was the feat's own level requirement, not his slot. The export has it at `general-3`.)*
- **Thorough Search** (7th-level general feat slot): see Skills above.
- **Sanguine Tenacity** (11th-level general feat slot): see Defenses above.

### Other Feats
- **Pet** (general feat, granted via Beast Trainer): Grants a Tiny animal companion with the minion trait (this is the crunch behind Alben's duck, Solomon — see `concept.md`/`background.md` for his identity and role; his stat math follows the Pet feat's rules: level equals Alben's, 5 HP/level, uses Alben's saves/AC before circumstance or status bonuses, Speed 25 ft., low-light vision, plus 2 chosen pet abilities). **The Collar of Empathy** (see [inventory.md](inventory.md)) mechanically reinforces this bond — see its entry for details.
- **Shield Block** (granted via First Doctrine): Reaction to reduce incoming physical damage by the shield's Hardness when a shield is raised.
- **Deadly Simplicity** (granted via First Doctrine): Increases the favored weapon's damage die by one step when wielding it.

---

## Languages

As recorded in the export: **none selected** (no additional language details given).

---

## Automatic Bonus Progression

This campaign runs the **Automatic Bonus Progression** variant. Fundamental runes — **potency, striking, and resilient** — do not exist here. Nobody buys them, etches them, or loses them; the character receives their equivalents automatically at fixed levels. **Property runes (flaming, corrosive, ghost touch, etc.) are unaffected and still work normally, and under ABP they no longer require a potency rune to be etched onto.**

### What Alben has at level 12

| ABP benefit | Value at 12 | Gained at | Next upgrade | Where it shows up |
|---|---|---|---|---|
| **Attack Potency** | +2 item bonus to weapon and unarmed attack rolls | L10 | +3 at **L16** | Maul **+22**, tankard **+22** |
| **Devastating Attacks** | **3 weapon damage dice** | **L12 — new this level** | 4 dice at **L18** | Maul **3d12+6**, tankard **3d6+4** |
| **Defense Potency** | +2 item bonus to AC | L11 | +3 at **L17** | **AC 32** |
| **Save Potency** | +1 item bonus to all saves | L8 | +2 at **L14** | Fort +21 / Ref +17 / Will +23 |
| **Perception Potency** | +1 item bonus to Perception | L7 | +2 at **L13** | **Perception +21** |
| **Skill Potency** | +1 to one skill, +1 to a second, +2 to one of them | L3 / L6 / L9 | +1 to a third at **L13** | **⚠ unassigned — see below** |

**Devastating Attacks is the headline change at 12th.** Going from 2 weapon dice to 3 is a larger increase to Alben's output than any of his three new feats, and it applies to *everything* he swings — maul, tankard, fists. Damage per maul hit goes from roughly 19 to roughly 29.

### Not covered by ABP

ABP grants **nothing to spellcasting**. His **Spell DC 30** and **spell attack +20** come purely from Fourth Doctrine's expert proficiency, and they don't get an item bonus at any level. Same for his **Class DC 28**. This is a known property of the variant, not an oversight — it's worth knowing when comparing his Gladiator's Roar DC against a martial party member's attack bonus, because the gap widens as levels go up.

### ⚠ Open item — three unassigned Skill Potency picks

ABP grants Skill Potency at 3rd, 6th, and 9th level: **+1 to one skill**, then **+1 to a second skill**, then **+2 to one of them**. These are player choices. Nothing in either export records them, Foundry doesn't track them, and the skill totals in this file don't include them. **Resolve before the next session.** Candidates, in rough order of fit:

| Skill | Case for it |
|---|---|
| **Athletics** (+20) | His defining physical stat. Feeds **Titan Wrestler**, the maul's shove trait, every Shove/Grapple/Trip in [actionplans.md](plans/actionplans.md), and the sumo *dohyo* in [bigchurch.md](church/bigchurch.md). Cayden's cleric skill, too. |
| **Religion** (+22) | Already master. Drives **Trick Magic Item** and every Recall Knowledge check about his own faith. The highest number on his sheet gets higher. |
| **Diplomacy** (+19) | The barkeep skill. Stacks with **Hobnobber**, **Glad-Hand**, and the Flask of Fellowship's +1 item bonus — *except it doesn't*, see the warning below. |
| **Medicine** (+18) | Party healing outside of slots. Same non-stacking problem with the Healer's Toolkit. |

> **⚠ Skill Potency is an *item* bonus and does not stack with other item bonuses to the same skill.** This matters for two things he already owns: the **Flask of Fellowship** (+1 item to its Diplomacy check) and the **Healer's Toolkit (Expanded)** (+1 item to Medicine). Putting a +1 Skill Potency into Diplomacy or Medicine buys him **nothing** on those specific checks — only the higher bonus applies. A **+2** in either would gain just +1 over the item he's already carrying. Athletics and Religion have no competing item bonus and are the cleaner picks.

> **GM Note — one thing Skill Potency can't fix.** **Gladiator's Roar** requires *master in Intimidation*. Skill Potency grants an **item bonus**, not a proficiency rank, so no amount of it satisfies that prerequisite. That still needs either a skill increase at 13th or a GM waiver.

---

## Feat Timeline (by character level)

Rebuilt directly from the `location` field of every feat in the current export, so each row is the slot the feat actually occupies rather than the feat's own level requirement. Note that Alben takes both a **class feat** and an **archetype feat** at every even level — he's built on the **Free Archetype** variant rule.

| Level | Class feature | Class feat | Archetype feat | Skill feat | General feat | Ancestry feat |
|-------|---------------|-----------|----------------|-----------|--------------|---------------|
| 1 | Deity (Cleric), Cleric Spellcasting, Doctrine, Warpriest, First Doctrine, First Doctrine (Warpriest), Divine Font (Healing), Shield Block, Deadly Simplicity | — | — | Hobnobber *(background)* | Pet *(via Beast Trainer)* | Beast Trainer |
| 2 | — | Warpriest's Armor | Gladiator Dedication | Skill Training (Performance) | — | — |
| 3 | Second Doctrine, Second Doctrine (Warpriest), Perception Expertise, Reflex Expertise | — | — | — | Toughness | — |
| 4 | — | Restorative Strike | Play to the Crowd | Glad-Hand | — | — |
| 5 | — | — | — | — | — | Orc Ferocity |
| 6 | — | Channel Smite | Performative Weapons Training | Train Animal | — | — |
| 7 | Third Doctrine, Third Doctrine (Warpriest) | — | — | — | Thorough Search | — |
| 8 | — | Cast Down | Living for the Applause | Eyes of the City | — | — |
| 9 | Resolute Faith | — | — | — | — | Undying Ferocity |
| 10 | — | Zealous Rush | Big Debut | Titan Wrestler | — | — |
| 11 | Fourth Doctrine, Fourth Doctrine (Warpriest) | — | — | — | Sanguine Tenacity | — |
| **12** | — | **Replenishment of War** | **Gladiator's Roar** | **Trick Magic Item** | — | — |

---

## GM Note — Changes from prior export

Diff of `fvtt-Actor-uncle-alben-9MuIf1CmSuTUk4QX.json` (current) against `unclealben11v1.json` (prior), ignoring Foundry's own schema/migration bookkeeping. Nothing of mechanical consequence is omitted below.

**Level 11 → 12.** Every derived number moves by +1 proficiency, and ABP Devastating Attacks adds a weapon damage die:

| Statistic | Was (L11) | Now (L12) | Driver |
|-----------|-----------|-----------|--------|
| HP | 153 | **166** | level |
| AC | 31 | **32** | level (Defense Potency was already +2 at 11) |
| Perception | +20 | **+21** | level |
| Fortitude / Reflex / Will | +20 / +16 / +22 | **+21 / +17 / +23** | level |
| Spell DC | 29 | **30** | level — ABP grants casters nothing |
| Spell attack | +19 | **+20** | level |
| Class DC | 27 | **28** | level |
| Maul attack | +21 | **+22** | level |
| **Maul damage** | **2d12+6** plus 1d6 fire | **3d12+6** plus 1d6 fire | **ABP Devastating Attacks — 3rd die at 12th** |
| Tankard | +21 for 2d6+4 | **+22 for 3d6+4** | same |
| Level-scaled temp HP (Gladiator Dedication, Play to the Crowd, Undying Ferocity) | 11 | **12** | level |

**The extra weapon damage die is the biggest single gain at this level** — bigger than any of the three new feats.

**Three new feats** — Replenishment of War (`class-12`), Gladiator's Roar (`archetype-12`), Trick Magic Item (`skill-12`). All documented above, two with prerequisite/usability caveats.

**Nothing else on the character side changed.** Identical between exports: all six ability scores, the boost history, every skill rank, every save proficiency, armor/weapon proficiency ranks, the full known-spell list, and every prepared spell slot.

**Hero Points** dropped 1 → 0. Cosmetic; they reset each session.

**Inventory and money changed substantially** — four new magic items and a large currency windfall. See [inventory.md](inventory.md).

**The maul's potency and striking runes were zeroed out, which is correct** — they don't exist under ABP. The Full Plate still carries stale `potency`/`resilient` entries that ABP suppresses; those should be cleaned off the Foundry item for consistency. See the armour note in [inventory.md](inventory.md).

---

## Cross-References

- [spells.md](spells.md) — Spellcasting stats, prepared combat loadout, and deity details
- [inventory.md](inventory.md) — Weapons, armor, and full inventory/currency
- [concept.md](concept.md) — Character concept and voice
- [background.md](background.md) — Narrative background
- [rambui.md](rambui/rambui.md) — The Rambui brand and brewing process behind the "Guaranteed Harsh" signature move
- [distillerysanctum.md](church/distillerysanctum.md) — The shrine-and-still habit of toasting his god with the brewing cup, behind "The Toast"
- [actionplans.md](plans/actionplans.md) — Combat playbooks; Big Debut's opening beat feeds the first-round sequence there
- [qualifiers.md](qualifiers.md) — Session notes recording the level-12 promotion
