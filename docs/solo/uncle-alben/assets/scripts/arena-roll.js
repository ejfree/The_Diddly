// ============================================================
// UNCLE ALBEN — TODAY'S ARENA — FoundryVTT Script Macro
// ============================================================
// The daily opening ceremony of the First Church. Rolls a d20 to pick which of
// the twenty Planar Palace arenas Alben imagines when he casts the wand, and
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

// Index in this array = d20 result - 1, in the same order as planarpalace.md.
// bonus: what the circumstance bonus applies to. hazard: the trigger, save, and effect.
const ARENAS = [
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

// Set to a number from 1 to 20 to skip the roll (for testing). Leave null for a normal day.
const FORCE = null;

// ── ROLL ──────────────────────────────────────────────────────────────────────

const roll = await new Roll("1d20").evaluate();
const result = FORCE ?? roll.total;
const arena = ARENAS[result - 1];
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
  rolls: FORCE ? [] : [roll],
});

})();
