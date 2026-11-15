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
const ARENAS = [
  { name: "The Starstone Cathedral",      source: "Absalom, the Starstone",     twist: "Climb three rings to the starstone. First to the stone wins, not a knockout." },
  { name: "The Drowned Colosseum",        source: "Azlant, Plane of Water",     twist: "A flooded glass arena. Fighters choose air or water before the bout." },
  { name: "The Brass Furnace",            source: "Plane of Fire",              twist: "A molten river crossed by narrow bridges. Heat wears everyone down." },
  { name: "The Cloud Arena",              source: "Plane of Air",               twist: "Floating platforms in open sky. A fall is the knockout, and a net catches the loser." },
  { name: "The Shadow Court",             source: "Shadow Plane",               twist: "A dim ballroom where shadows act as decoys." },
  { name: "The Glade of the First World", source: "First World",                twist: "Both fighters swear an oath, and the glade enforces it. Cold iron is unwelcome." },
  { name: "The Infernal Ledger",          source: "Hell",                       twist: "Every term is signed in a ledger and binding. Debt fighters can fight for freedom." },
  { name: "The Writhing Maw",             source: "Abyss",                      twist: "The floor shifts every round. Roll a d6 for what changes." },
  { name: "The Boneyard Court",           source: "Boneyard",                   twist: "The dead watch and cheer. A fighter who refuses to yield gets +1 on the next check." },
  { name: "The Glowcap Caverns",          source: "Darklands",                  twist: "Glowing fungus and spore clouds. A winded fighter makes a Fortitude save." },
  { name: "The Axis Tribunal",            source: "Axis",                       twist: "A mechanical referee rules on every strike. No luck, and arguing costs a round." },
  { name: "The Winter Court",             source: "Irrisen",                    twist: "An ice floor. Footing is everything, and a good shove sends a fighter across the room." },
  { name: "The Alkenstar Gunworks",       source: "Alkenstar",                  twist: "Blasts on a three-round cycle. Reflex save for anyone in the blast zone." },
  { name: "The Monsoon Hold",             source: "Minata and Atas Pulu",       twist: "Slick wet timber under warm rain. Alben gets +2 to Climb and Swim." },
  { name: "The Dreaming Hall",            source: "Dimension of Dreams",        twist: "A safe arena. All damage is nonlethal and fades when a fighter wakes." },
  { name: "The Verdant Heartwood",        source: "Plane of Wood",              twist: "Living vines grab anyone who stands still. Fire is unwelcome." },
  { name: "The Maelstrom Roulette",       source: "Maelstrom",                  twist: "The room and the rules change every round. Roll on the random-effects table." },
  { name: "The Seven Terraces",           source: "Heaven",                     twist: "A fighter climbs a terrace per win. Cheating moves them down." },
  { name: "The Forge of the Metal Plane", source: "Plane of Metal",             twist: "Magnetic floor plates drag at metal armor." },
  { name: "The Accidental Hall",          source: "Elysium",                    twist: "A joyful tavern brawl. The Promise is automatic and nobody leaves hurt." },
];

// Set to a number from 1 to 20 to skip the roll (for testing). Leave null for a normal day.
const FORCE = null;

// ── ROLL ──────────────────────────────────────────────────────────────────────

const roll = await new Roll("1d20").evaluate();
const result = FORCE ?? roll.total;
const arena = ARENAS[result - 1];

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
  </table>
</div>`.trim();

await ChatMessage.create({
  content,
  speaker: ChatMessage.getSpeaker(),
  rolls: FORCE ? [] : [roll],
});

})();
