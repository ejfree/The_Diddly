// ============================================================
// UNCLE ALBEN — TODAY'S ARENA — FoundryVTT Script Macro
// ============================================================
// The daily opening ceremony of the First Church. Rolls a d20 to pick which of
// the forty Planar Palace arenas (two lists of twenty) Alben imagines when he casts the wand, and
// posts the result to chat. See planarpalace.md in the church/plans folder.
//
// The casting itself is a formal ceremony that officially opens the church. The
// portal appears in the center of the public room's north wall, flanked on the
// left and right by the fight card boards.
//
// SETUP: Create a new Macro, set Type = "Script", paste this file.
//        Roll it once per day, at the opening ceremony.
//        To test a specific arena, set FORCE below to a number from 1 to 20.
// ============================================================

(async () => {

// ── DATA ──────────────────────────────────────────────────────────────────────

// Two lists, each indexed by d20 result - 1, in the same order as planarpalace.md.
// PLANES is List 1 and REALMS is List 2.
// bonus: what the circumstance bonus applies to. hazard: the trigger, save, and effect.
const PLANES = [
  { name: "The Starstone Cathedral",      source: "Absalom, the Starstone",     twist: "Climb three rings to the starstone. First to the stone wins, not a knockout." , bonus: "Athletics checks to Climb or Leap up to the next ring", hazard: "At the end of each round the starstone pulses. A fighter in the center ring makes a Will save or takes hazard force damage and is dazzled until the end of its next turn." },
  { name: "The Drowned Colosseum",        source: "Azlant, Plane of Water",     twist: "A flooded glass arena. Fighters choose air or water before the bout." , bonus: "Athletics checks to Swim", hazard: "At the start of each round an undertow sweeps the flooded half. A fighter in the water makes a Reflex save or is dragged 10 feet and takes hazard bludgeoning damage from the glass wall." },
  { name: "The Brass Furnace",            source: "Plane of Fire",              twist: "A molten river crossed by narrow bridges. Heat wears everyone down." , bonus: "Fortitude saves against heat", hazard: "At the end of each round slag sprays from the river. A fighter on a bridge or beside the river makes a Reflex save or takes hazard fire damage." },
  { name: "The Cloud Arena",              source: "Plane of Air",               twist: "Floating platforms in open sky. A fall is the knockout, and a net catches the loser." , bonus: "Acrobatics checks to Balance", hazard: "At the start of each round a gust sweeps the platforms. A fighter makes a Reflex save or is pushed 10 feet and takes hazard bludgeoning damage. A fighter pushed off the edge falls to the net." },
  { name: "The Shadow Court",             source: "Shadow Plane",               twist: "A dim ballroom where shadows act as decoys." , bonus: "Perception checks to tell a fighter from its shadow", hazard: "At the end of each round the shadows grasp. Each fighter makes a Will save or takes hazard void damage and is off-guard until the end of its next turn." },
  { name: "The Glade of the First World", source: "First World",                twist: "Both fighters swear an oath, and the glade enforces it. Cold iron is unwelcome." , bonus: "Will saves against fey effects and curses", hazard: "At the end of each round the briars around the mossy ring lash out. A fighter at the edge of the ring makes a Reflex save or takes hazard piercing damage and is immobilized until the end of its next turn." },
  { name: "The Infernal Ledger",          source: "Hell",                       twist: "Every term is signed in a ledger and binding. Debt fighters can fight for freedom." , bonus: "Will saves against coercion and mental effects", hazard: "At the end of each round hellfire gutters up through the floor grates. A fighter makes a Reflex save or takes hazard fire damage." },
  { name: "The Writhing Maw",             source: "Abyss",                      twist: "The floor shifts every round (GM rolls a d6 for what changes)." , bonus: "Athletics checks to Climb out of a gap or Escape", hazard: "At the start of each round, after the d6 shift, a fighter standing in a newly opened gap makes a Reflex save or falls in and takes hazard acid damage." },
  { name: "The Boneyard Court",           source: "Boneyard",                   twist: "The dead watch and cheer for the fighter who takes a hit well." , bonus: "Will saves against fear", hazard: "At the end of each round a grave-chill rolls through the hall. A fighter makes a Fortitude save or takes hazard void damage and is enfeebled 1 until the end of its next turn." },
  { name: "The Glowcap Caverns",          source: "Darklands",                  twist: "Glowing fungus and spore clouds hang over cold pools." , bonus: "Stealth checks", hazard: "At the end of each round the spores burst. A fighter makes a Fortitude save or takes hazard poison damage and is sickened 1." },
  { name: "The Axis Tribunal",            source: "Axis",                       twist: "A mechanical referee rules on every strike. No luck, and arguing costs a round." , bonus: "Perception and Recall Knowledge checks", hazard: "At the end of each round a measured pulse of force rolls across the floor from the walls. A fighter makes a Fortitude save or takes hazard force damage and is slowed 1 until the end of its next turn." },
  { name: "The Winter Court",             source: "Irrisen",                    twist: "An ice floor. Footing is everything, and a good shove sends a fighter across the room." , bonus: "Athletics checks to Shove or Reposition", hazard: "At the end of each round the floor ices over and the frost bites. A fighter makes a Reflex save or falls prone on the slick ice and takes hazard cold damage." },
  { name: "The Alkenstar Gunworks",       source: "Alkenstar",                  twist: "Blasts on a three-round cycle." , bonus: "ranged attack rolls", hazard: "On the blast round of the three-round cycle, a fighter in the blast zone makes a Reflex save or takes hazard damage (fire or sonic, the GM's choice) and is deafened until the end of its next turn." },
  { name: "The Monsoon Hold",             source: "Minata and Atas Pulu",       twist: "Slick wet timber under warm rain. Alben gets his Rainfall +2 to Climb and Swim." , bonus: "Acrobatics checks to Balance and Nature checks (Alben's own +2 Rainfall heritage bonus to Climb and Swim is the same type and doesn't stack)", hazard: "A fighter who falls or is pushed off the walkways into the flooded clearing is set upon by piranha-like fish. At the start of each of its turns in the water it makes a Reflex save or takes hazard piercing damage." },
  { name: "The Dreaming Hall",            source: "Dimension of Dreams",        twist: "A safe arena. All damage is nonlethal and fades when a fighter wakes." , bonus: "Reflex saves", hazard: "At the end of each round a nightmare passes through. A fighter makes a Will save or takes hazard mental damage (nonlethal, like all damage here) and is frightened 1." },
  { name: "The Verdant Heartwood",        source: "Plane of Wood",              twist: "Living vines grab anyone who stands still. Fire is unwelcome." , bonus: "Fortitude saves", hazard: "At the start of each round the vines lash out. A fighter that ended its last turn standing still makes a Reflex save or takes hazard piercing damage and is immobilized until the end of its next turn." },
  { name: "The Maelstrom Roulette",       source: "Maelstrom",                  twist: "The room and the rules change every round (GM rolls on the random-effects table)." , bonus: "Acrobatics checks", hazard: "At the end of each round a chaos burst crackles. A fighter makes a Reflex save or takes hazard damage of a random type (d4: fire, cold, electricity, sonic)." },
  { name: "The Silver Mount Hangar",       source: "Numeria",                    twist: "Low-gravity plates lighten the floor in patches, so fighters leap far and fall slowly." , bonus: "Athletics checks to High Jump and Long Jump", hazard: "At the end of each round a laser grid sweeps the hangar. A fighter makes a Reflex save or takes hazard fire damage." },
  { name: "The Forge of the Metal Plane", source: "Plane of Metal",             twist: "Magnetic floor plates drag at metal armor." , bonus: "Strikes made with a metal weapon", hazard: "At the end of each round the plates surge. A fighter in metal armor or holding a metal weapon makes a Reflex save or takes hazard bludgeoning damage and is pulled prone." },
  { name: "The Accidental Hall",          source: "Elysium",                    twist: "A joyful tavern brawl. The Promise is automatic and nobody leaves hurt." , bonus: "Diplomacy checks", hazard: "At the end of each round the crowd surges. A fighter makes a Fortitude save or takes hazard bludgeoning damage (nonlethal) and is pushed 5 feet." },
];

const REALMS = [
  { name: "Undermountain", source: "Waterdeep", twist: "A few flagstones drop away as the bout goes on, leaving shallow pits, and the GM marks which ones.", bonus: "Perception checks to find traps and hidden pits", hazard: "At the start of each round a flagstone drops. A fighter standing on it makes a Reflex save or falls into a pit and takes hazard bludgeoning damage." },
  { name: "The Yawning Portal", source: "Waterdeep", twist: "A shove can send a fighter over the lip of the well to a ledge ten feet down, and something lives below.", bonus: "Athletics checks to Shove", hazard: "At the end of each round something lunges up out of the well. A fighter within 10 feet of the well makes a Reflex save or takes hazard slashing damage." },
  { name: "The Elfsong Tavern", source: "Baldur's Gate", twist: "The ghostly song swells and fades, and its mood sways the fight.", bonus: "Performance checks", hazard: "At the end of each round the song swells to a wail. A fighter makes a Will save or takes hazard mental damage and is frightened 1." },
  { name: "Menzoberranzan", source: "The Underdark", twist: "Faerie fire outlines every fighter, so nothing can hide.", bonus: "Perception checks", hazard: "At the start of each round webs drop from the stalactites. A fighter makes a Reflex save or takes hazard poison damage from the venom and is immobilized until the end of its next turn." },
  { name: "Candlekeep", source: "The Sword Coast", twist: "The stacks line the floor, and a fight in a library is a quiet, furious thing.", bonus: "Recall Knowledge checks", hazard: "At the end of each round a heavy shelf topples. A fighter next to the stacks makes a Reflex save or takes hazard bludgeoning damage and is knocked prone." },
  { name: "The Field of Triumph", source: "Waterdeep", twist: "Heralds announce each hit and the crowd's cheering carries the fight.", bonus: "Performance checks", hazard: "At the end of each round a runaway warhorse thunders across the sand. A fighter in its path makes a Reflex save or takes hazard bludgeoning damage and is knocked prone." },
  { name: "The Steaming River", source: "Neverwinter", twist: "The mist hangs in patches, so a fighter can vanish in it for a moment.", bonus: "Stealth checks", hazard: "At the end of each round a vent of scalding steam bursts. A fighter makes a Reflex save or takes hazard fire damage." },
  { name: "Port Nyanzaru", source: "Chult", twist: "Dinosaur handlers keep a few beasts in the pen, and they watch the fight with interest.", bonus: "Nature checks", hazard: "At the start of each round a dinosaur lunges against its pen chain. A fighter within 10 feet of the pen makes a Reflex save or takes hazard piercing damage and is knocked prone." },
  { name: "Skullport", source: "The Underdark", twist: "Everyone in the room is selling something, and the lanterns burn with strange flames.", bonus: "Thievery checks", hazard: "At the end of each round a skull lantern gutters out a gout of foul gas. A fighter makes a Fortitude save or takes hazard poison damage and is sickened 1." },
  { name: "The Sands of Anauroch", source: "The North", twist: "The dunes slide, burying the edges of the arena.", bonus: "Survival checks", hazard: "At the end of each round a sand-slide surges across the floor. A fighter makes a Reflex save or takes hazard bludgeoning damage and has its Speed reduced by 10 feet until the end of its next turn." },
  { name: "The Pirate Docks of Luskan", source: "Luskan", twist: "Swells tilt the deck, and the ships groan together.", bonus: "Acrobatics checks to Balance", hazard: "At the end of each round a heavy swell rolls the deck. A fighter makes a Reflex save or falls prone and slides 10 feet, taking hazard bludgeoning damage if it hits the rail." },
  { name: "Myth Drannor", source: "Cormanthor", twist: "The old magic hums in the air and answers a fighter's temper.", bonus: "Reflex saves", hazard: "At the end of each round the mythal flares. A fighter makes a Will save or takes hazard spirit damage and is dazzled until the end of its next turn." },
  { name: "Mithral Hall", source: "The North", twist: "Mine carts rattle along the rails and echo down the hall.", bonus: "Fortitude saves", hazard: "At the end of each round a runaway mine cart thunders down the rails across the floor. A fighter in its path makes a Reflex save or takes hazard bludgeoning damage and is knocked prone." },
  { name: "The Red Wizard Enclave", source: "Thay", twist: "The dead serve and the dead watch, and the lanterns burn with a cold light.", bonus: "Will saves", hazard: "At the end of each round skeletal hands claw up from the floor. A fighter makes a Fortitude save or takes hazard void damage and is enfeebled 1 until the end of its next turn." },
  { name: "The Berserker Lodge", source: "Rashemen", twist: "Bear-skin cloaks and wild songs make every bout feel older than it is.", bonus: "Athletics checks to Grapple", hazard: "At the end of each round a spirit bear's claws rake the floor. A fighter makes a Reflex save or takes hazard slashing damage." },
  { name: "The Standing Stones", source: "Moonshae Isles", twist: "The weather changes with the fight, and the stones hum before every strike of lightning.", bonus: "Nature checks", hazard: "At the end of each round a bolt of lightning strikes a standing stone. A fighter within 10 feet of the stones makes a Reflex save or takes hazard electricity damage." },
  { name: "Dragonspear Castle", source: "The Sword Coast", twist: "The old walls are ready to fall, and everyone knows it.", bonus: "Athletics checks to Climb", hazard: "At the end of each round a stretch of battlement crumbles. A fighter near the walls makes a Reflex save or takes hazard bludgeoning damage and is knocked prone." },
  { name: "The Royal Court of Suzail", source: "Cormyr", twist: "The Purple Dragons stand watch and the War Wizards ward the room.", bonus: "Diplomacy checks", hazard: "At the end of each round a War Wizard's ward discharges. A fighter makes a Will save or takes hazard force damage." },
  { name: "Blackstaff Tower", source: "Waterdeep", twist: "The wards crackle at anyone who stands still.", bonus: "Recall Knowledge checks", hazard: "At the end of each round the tower's wards crackle. A fighter makes a Reflex save or takes hazard force damage." },
  { name: "The Pasha's Pavilion", source: "Calimshan", twist: "Wishes are hinted at and never quite granted.", bonus: "Deception checks", hazard: "At the end of each round a genie's wish-fire flares from a lamp. A fighter makes a Reflex save or takes hazard fire damage." },
];

// ── ARENA LEVEL ───────────────────────────────────────────────────────────────

// Alben sets this each morning. One of 1, 3, 5, 7, 9. It scales the circumstance
// bonus, the hazard DC, and the hazard damage (see "Tuning the Arenas" in planarpalace.md).
const LEVEL = 1;

const TUNING = {
  1: { bonus: 1, dc: 13, damage: "1d6" },
  3: { bonus: 1, dc: 16, damage: "2d6" },
  5: { bonus: 2, dc: 18, damage: "3d6" },
  7: { bonus: 2, dc: 21, damage: "4d6" },
  9: { bonus: 3, dc: 24, damage: "5d6" },
};

// Which list to roll on: "planes", "realms", or "random" (rolls a d2 first: 1 = planes, 2 = realms).
const CATEGORY = "planes";

// Set to a number from 1 to 20 to skip the roll (for testing). Leave null for a normal day.
const FORCE = null;

// ── ROLL ──────────────────────────────────────────────────────────────────────

let category = CATEGORY;
let listRoll = null;
if (category === "random") {
  listRoll = await new Roll("1d2").evaluate();
  category = listRoll.total === 1 ? "planes" : "realms";
}
const LISTS = { planes: PLANES, realms: REALMS };
const LIST_LABELS = { planes: "The Planes", realms: "The Realms" };
if (!LISTS[category]) return ui.notifications.warn(`Arena roll: CATEGORY must be "planes", "realms", or "random" (got ${CATEGORY}).`);

const roll = await new Roll("1d20").evaluate();
const result = FORCE ?? roll.total;
const arena = LISTS[category][result - 1];
const tuning = TUNING[LEVEL];

if (!tuning) return ui.notifications.warn(`Arena roll: LEVEL must be 1, 3, 5, 7, or 9 (got ${LEVEL}).`);
if (!arena) return ui.notifications.warn(`Arena roll: ${result} is not a valid d20 result.`);

// ── OUTPUT ────────────────────────────────────────────────────────────────────

const content = `
<div style="
  border: 1px solid #5a3a1a;
  border-radius: 5px;
  padding: 10px 12px;
  background: #1c130a;
  color: #c8b0a0;
  font-family: serif;
  line-height: 1.6;
">
  <div style="font-size: 1.15em; font-weight: bold; color: #e0a050; margin-bottom: 6px; letter-spacing: 0.05em;">
    ⛩ The Church Opens
  </div>
  <div style="color:#888; font-size:0.9em; margin-bottom:6px; font-style:italic;">
    The portal rises in the center of the north wall. The fight cards go up on either side.
  </div>
  <table style="width:100%; border-collapse: collapse; font-size: 0.95em;">
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">List</td>
      <td><strong style="color:#e8c8a8;">${LIST_LABELS[category]}</strong>
        <span style="color:#555; font-size:0.85em;">${listRoll ? ` (d2: ${listRoll.total})` : ""}</span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Roll</td>
      <td><strong style="color:#e8c8a8;">${result}</strong>
        <span style="color:#555; font-size:0.85em;"> (d20${FORCE ? ", forced" : ""})</span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Today's Arena</td>
      <td><strong style="color:#f0d8b8;">${arena.name}</strong>
        <span style="color:#888; font-size:0.85em;"> — ${arena.source}</span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">The Twist</td>
      <td style="color:#e0d0c0; font-style:italic;">${arena.twist}</td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Arena Level</td>
      <td><strong style="color:#e8c8a8;">L${LEVEL}</strong>
        <span style="color:#555; font-size:0.85em;"> (bonus +${tuning.bonus}, hazard DC ${tuning.dc}, ${tuning.damage})</span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Bonus</td>
      <td style="color:#e0d0c0;">+${tuning.bonus} circumstance bonus to ${arena.bonus}.</td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Hazard</td>
      <td style="color:#e0d0c0;">${arena.hazard.replace(/hazard damage/g, `<strong>${tuning.damage}</strong>`).replace(/Hazard DC/g,"DC")} <span style="color:#888;">(DC ${tuning.dc}, basic save)</span></td>
    </tr>
  </table>
</div>`.trim();

await ChatMessage.create({
  content,
  speaker: ChatMessage.getSpeaker(),
  rolls: FORCE ? [] : (listRoll ? [listRoll, roll] : [roll]),
});

})();
