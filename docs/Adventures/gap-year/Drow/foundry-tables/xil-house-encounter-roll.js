// ============================================================
// XIL HOUSE ENCOUNTER ROLL — FoundryVTT Script Macro
// ============================================================
// Rolls House → Drow or Aux → Unit Type (three chained d100s).
// Outputs a formatted result to chat with FoundryVTT dice integration.
//
// SETUP: Create a new Macro, set Type = "Script", paste this file.
// ============================================================

(async () => {

// ── DATA ──────────────────────────────────────────────────────────────────────

const HOUSE_TABLE = [
  { min: 1,   max: 22,  key: "xilrath",  label: "Xilrath — The Black Blades"        },
  { min: 23,  max: 40,  key: "veythrae", label: "Veythrae — The Shadowfire Cadres"   },
  { min: 41,  max: 64,  key: "dravun",   label: "Dravun — The Fang Legion"           },
  { min: 65,  max: 77,  key: "thalmyr",  label: "Thalmyr — The Silent Blades"        },
  { min: 78,  max: 87,  key: "velouryn", label: "Velouryn — The Venom Syndicate"     },
  { min: 88,  max: 94,  key: "zhaelor",  label: "Zhaelor — The Lash of Lolth"        },
  { min: 95,  max: 97,  key: "vorryn",   label: "Vorryn — The Grey Ledger"           },
  { min: 98,  max: 100, key: "draethi",  label: "Draethi — The Black Warrant"        },
];

// Roll ≤ threshold = Drow; roll > threshold = Auxiliary
const DROW_THRESHOLD = {
  xilrath:  42,
  veythrae: 43,
  dravun:   25,
  thalmyr:  41,
  velouryn: 43,
  zhaelor:  56,
  vorryn:   50,
  draethi:  52,
};

// Unit tables: [min, max, description]
// Patrol counts reflect a subset encountered, not the full unit strength.
const UNITS = {

  xilrath: {
    drow: [
      [1,   1,   "Command — 1 senior officer (First Sword Veynar Lvl 12 or Logistics Mistress Shynrae Lvl 10) with 1d4 Blade Cohort escorts; Matron Vel'dryn does not patrol"],
      [2,   6,   "Temple/War-Priest Cadre — 1d3 war-priests of Lolth, Lvl 4–8; on ritual errand or blessing a forward position"],
      [7,   52,  "Blade Cohorts — heavy infantry patrol, 1d6+3 soldiers, spears/shields/glaives, Lvl 2–5; standard checkpoint detail"],
      [53,  70,  "Void-Archers — 1d4+1 archers with poisoned hand crossbows, Lvl 3–5; covering a chokepoint or following a Blade patrol"],
      [71,  82,  "Skirmishers/Scouts — 1d4 outriders, Lvl 4–6; ranging ahead of main force or returning with a report"],
      [83,  88,  "Engineers/Sappers — 1d3+1 sappers assessing tunnel integrity or emplacing a firepot cache"],
      [89,  100, "Logistics/Quartermasters — 1d4 supply staff (armorers, medics, scribes) moving between positions; lightly armed"],
    ],
    aux: [
      [1,   27,  "Merc Goblins — 2d6 shield-pushers with javelins; disorganized but numerous, screening a Blade patrol"],
      [28,  37,  "Kobold Sappers — 1d4+1 kobolds laying traps or disarming old ones; 1 drow overseer present"],
      [38,  61,  "Thrall Porters/Laborers — 1d6+2 mixed-race laborers moving supplies; 1 drow quartermaster escort"],
      [62,  77,  "Pack Lizards & Mules — 1d3 animals with 1d3 handlers; supply run between caches"],
      [78,  86,  "Quaggoth Shock — 1d4+1 quaggoths with 1 drow handler; advance screen or punishment detail"],
      [87,  90,  "Giant Spiders — 1d3 spiders (leased from Dravun) with 1 handler; passage patrol"],
      [91,  94,  "Siege Crew — 1d4+1 ogre teamsters repositioning equipment; 1 drow engineer directing"],
      [95,  100, "Handlers — 1d4 non-drow hirelings tending beasts between deployments"],
    ],
  },

  veythrae: {
    drow: [
      [1,   1,   "Command — 1 Arcane Council mage (Lvl 11–13) with 1d4 Shadowguard escorts conducting a field survey; Matron Thalara does not leave the estate unannounced"],
      [2,   3,   "Arcane Council — 1 high mage (Lvl 11–13) moving between research sites with 1d3 Shadowguard; never travels alone"],
      [4,   32,  "Shadowfire Cadres — 1d4+1 battle-wizards, Lvl 7–10; a detached element running area-denial tests or escorting a supply line"],
      [33,  63,  "Shadowguard — 1d4+2 arcane-enhanced fighters, Lvl 5–7; escorting a mage, guarding a ley-line node, or patrolling a dark field perimeter"],
      [64,  78,  "Apprentices & Adepts — 1d6 novice mages, Lvl 1–4; on a supervised field exercise or courier run with scroll cases"],
      [79,  88,  "Scouts & Couriers — 1d3 scouts on observation detail; carrying sealed intelligence back to the estate"],
      [89,  100, "Logistics & Alchemists — 1d3 alchemists transporting reagents or potion stock; fragile cargo, 1d4 Shadowguard escort"],
    ],
    aux: [
      [1,   29,  "Thrall Laborers — 1d6+2 mixed-race thralls moving lab equipment or porterage; 1 drow overseer"],
      [30,  52,  "Goblin Skirmishers — 2d6 goblins being herded forward as a screen; 1 drow handler with a whip"],
      [53,  61,  "Kobold Trapwrights — 1d4 kobolds setting tunnel traps; 1 Shadowguard supervising the kill-zone layout"],
      [62,  73,  "Giant Spiders — 1d3 spiders on passage patrol; loose-leashed, will act on their own if handler is taken down"],
      [74,  85,  "Pack Lizards — 1d3 animals with 1d3 handlers moving reagent crates; no combat capacity"],
      [86,  98,  "Magically Bound Servitors — 1d4 dominated creatures or altered thralls on a directed task; 1 mage controller nearby"],
      [99,  100, "Bound Demon — 1 greater fiend under escort by 1d3 Shadowfire mages; extremely dangerous, likely Elvrae's work"],
    ],
  },

  dravun: {
    drow: [
      [1,   1,   "Command — Beastlord Krael (Lvl 9 Ranger) or Mistress of Fangs Nelyth (Lvl 8 Rogue) in the field with 1d3 Nightfangs; Matron Yvra stays with the pens"],
      [2,   4,   "Elite Nightfangs — 1d3 Nightfang rangers (Lvl 7–9), each with 2 shadow weasels; silent recon or pursuit; they are already aware of the party"],
      [5,   10,  "Priesthood & Venomaries — 1d3 poisoners or acolytes moving between beast pens or delivering a venom shipment"],
      [11,  35,  "Beast-Handlers — 1d4+1 handlers escorting or relocating a beast unit; lightly armed, will call for backup"],
      [36,  65,  "Spear Cohort — 1d6+2 line infantry acting as beast-line wardens, Lvl 2–5; keeping a creature corridor clear"],
      [66,  80,  "Web-Archers — 1d4+1 web-harpoon specialists, Lvl 3–5; covering a passage mouth or suppressing a flanking approach"],
      [81,  92,  "Scouts/Pathfinders — 1d4 outriders reading spoor; may have already scouted the party's route"],
      [93,  100, "Quartermasters/Logistics — 1d4 fodder drivers with a small rothé or lizard; supply run between the pens and a forward camp"],
    ],
    aux: [
      [1,   17,  "Quaggoths — 1d4+1 quaggoths with 1 pack leader; handler is 1d6×10 feet behind; dangerous if the handler is killed"],
      [18,  24,  "Giant Spiders — 1d3 spiders on a web-patrol; may be on loan to Xilrath and operating outside their usual range"],
      [25,  41,  "Rothé Herds — 1d6+2 rothé being moved by 1d3 goblin drivers; a choke point hazard if spooked"],
      [42,  43,  "Shadow Weasels — 1d4 weasels scouting independently ahead of a Nightfang team; party is already being observed"],
      [44,  69,  "Goblin Thralls/Handlers — 2d6 goblins on pen maintenance or goad-running duty; flee rather than fight"],
      [70,  90,  "Slave Laborers/Porters — 1d6+2 mixed-race laborers on roadwork; 1 drow overseer, minimal escort"],
      [91,  98,  "Pack/Giant Lizards — 1d3 lizards with a handler; cargo haul between pens and a staging area"],
      [99,  100, "Kobold Sappers — 1d4 sappers rigging a pit or pressure trap; have not heard the party yet"],
    ],
  },

  thalmyr: {
    drow: [
      [1,   1,   "Command — Shadow Captain Drevan (Lvl 9 Rogue/Assassin) alone or with 1 analyst; he is here because someone important is nearby"],
      [2,   30,  "Assassin Cell — 1d3 operatives from a single cell, Rogue Lvl 3–5; working in pairs, using poison & ambush; they chose this ground"],
      [31,  44,  "Ambush Team — 1d3 drow (pairs or a trio) already in position; the party walked into their setup"],
      [45,  67,  "Intelligence Analysts — 1d3 handlers or cipher-keepers on a dead-drop run or tailing a target; not combatants, but not helpless"],
      [68,  84,  "Scouts & Shadows — 1d3 outriders tailing a person or mapping a route; they will disengage and report if spotted"],
      [85,  100, "Logistics & Safe Houses — 1d4 support staff moving between safehouses; carrying sealed courier pouches they will destroy if cornered"],
    ],
    aux: [
      [1,   30,  "Thrall Scouts — 1d4 kobolds or goblins acting as market eyes; they do not know who runs them"],
      [31,  54,  "Goblin Informants — 1d3 embedded goblins passing information; appear to be servants of another house"],
      [55,  70,  "Safe House Servants — 1d4 mixed-race staff moving between a safehouse and a contact point; carrying nothing obvious"],
      [71,  88,  "Kobold Runners — 1d3 couriers moving sealed messages; they do not know the contents and will flee on sight"],
      [89,  100, "Pack Lizards — 1d3 lizards being quietly led on an extraction run; 1 Thalmyr operative is nearby and watching"],
    ],
  },

  velouryn: {
    drow: [
      [1,   1,   "Command — Poisonmistress Thivra (Lvl 7 Alchemist) in the field overseeing a delivery or testing a new formula; Ulvrae does not travel; Malryk is at the Shard Warrens"],
      [2,   21,  "Enforcers — 1d4+1 Fighter/Rogue Lvl 4–5; escorting a caravan segment or collecting a debt; armed and professional"],
      [22,  34,  "Alchemical Corps — 1d3 alchemists (Lvl 3–6) transporting sealed vials or reagents; 1d3 enforcer escorts"],
      [35,  61,  "Trade Agents — 1d4+1 brokers or smugglers moving goods or meeting a contact; carrying ledgers they will burn if stopped"],
      [62,  81,  "Scouts & Couriers — 1d3 route-runners checking passage conditions or delivering a sealed manifest"],
      [82,  100, "Logistics & Quartermasters — 1d4 warehouse staff on a stock transfer; lightly armed, will not risk the cargo"],
    ],
    aux: [
      [1,   20,  "Duergar Artisans — 1d4 contracted smiths or crafters traveling between a workshop and a Velouryn depot; irritable and armed"],
      [21,  50,  "Goblin Porters — 2d6 goblins hauling sealed crates; 1d3 enforcer escorts; the cargo is the priority"],
      [51,  75,  "Mercenary Retainers — 1d4+1 duergar or goblin hired guards; escorting a trade shipment; loyalty is to the contract, not Velouryn specifically"],
      [76,  90,  "Slave Laborers — 1d6+2 transit laborers moving stock; 1 drow overseer with a sap"],
      [91,  100, "Pack Lizards — 1d3 animals with 1d3 handlers on a cargo run; no combat value"],
    ],
  },

  zhaelor: {
    drow: [
      [1,   1,   "Command — Zealot Commander Rhazek (Lvl 9 Champion/Cleric) leading a small sermon-patrol of 1d4 Temple Guard; Zarila leads only when she wants to be seen"],
      [2,   13,  "Clerical Core — 1d3 war-priests, Lvl 5–9; on a blessing circuit, heresy inspection, or delivering a divine sanction"],
      [14,  73,  "Zealot Warband — 1d6+2 Fighter/Cleric fanatics, Lvl 3–6; advance patrol or enforcement sweep; loud, aggressive, and looking for a fight"],
      [74,  89,  "Temple Guard — 1d4+1 elite guards, Lvl 5–7; escorting a cleric or securing a position the Matron has marked as holy ground"],
      [90,  100, "Inquisitors — 1d3 heresy-hunters operating autonomously; they have a target in mind and will question anyone they meet"],
    ],
    aux: [
      [1,   75,  "Indoctrinated Fanatics — 2d6 berserk-conditioned humans, goblins, or quaggoths; 1 cleric handler directing the mob; will charge on command"],
      [76,  100, "Thrall Devotees — 1d6+2 armed temple servants; willing to die; used as a shock screen ahead of the Warband"],
    ],
  },

  vorryn: {
    drow: [
      [1,   3,   "Command — Registry Warden Thressil (Lvl 4 Investigator/Rogue) in the field at a registry booth or dock with 1d3 garrison soldiers; Archive Mistress Vaeryn and Matron Syrn do not leave the estate"],
      [4,   18,  "Senior Archivists — 1d3 vault-keepers or legal specialists on an official errand; carrying sealed documents and a garrison escort of 1d3"],
      [19,  48,  "Field Scribes & Ledger-Keepers — 1d3 scribes staffing a registry booth or harbor post; unarmed, protected by Vorryn's political neutrality"],
      [49,  68,  "Garrison Soldiers — 1d4+1 Lvl 3 Fighters on estate-adjacent patrol; they do not pursue beyond their perimeter"],
      [69,  76,  "Divine Caster Support — 1d3 Lvl 4 Clerics traveling to authenticate a document or detect a forgery on commission"],
      [77,  100, "Logistics & Administration — 1d4 messengers or seal-keepers on an official errand; carrying house correspondence"],
    ],
    aux: [
      [1,   60,  "Thrall Servants & Porters — 1d6 servants moving document chests or archive materials; 1 scribe escort"],
      [61,  90,  "Slave Couriers — 1d3 couriers delivering sealed messages across the city; they do not know what they carry"],
      [91,  100, "Pack Lizards — 1d3 animals transporting archive boxes; 1 handler, no guards"],
    ],
  },

  draethi: {
    drow: [
      [1,   3,   "Command — Chief Executioner Vorath (Lvl 6 Fighter/Champion) delivering a warrant in person with 1d4 Enforcers; this subject is considered dangerous"],
      [4,   39,  "Enforcers — 1d4+1 Enforcers with war flails & nets; serving a warrant, escorting a prisoner, or standing a public execution perimeter"],
      [40,  57,  "Torturers — 1d3 subdual specialists transporting a prisoner or conducting a field interrogation; carrying saps and contact poison (Fort DC 18 or Clumsy 2)"],
      [58,  71,  "Pit Wardens — 1d4 wardens moving between the Pit Cells and the Arena floor; coordinating a beast-fight rotation with a Dravun contact"],
      [72,  89,  "Warrant Clerks — 1d3 clerks delivering or collecting paperwork; they carry writs that technically give them authority to detain"],
      [90,  100, "Execution Guards — 1d4+1 ceremonial guards escorting a condemned prisoner to the execution ground; the prisoner is present"],
    ],
    aux: [
      [1,   30,  "Quaggoth Wardens — 1d4 quaggoths (leased from Dravun) under 1 Pit Warden; moving a violent prisoner or clearing a cell block"],
      [31,  70,  "Goblin Pen Workers — 1d6 goblins on cleaning or feeding duty in the Pit Cells; they will scream for help"],
      [71,  100, "Thrall Servants — 1d4 estate thralls on an errand; some bear signs of recent calibration work"],
    ],
  },

};

// ── ROLL ENGINE ───────────────────────────────────────────────────────────────

function lookup(table, roll) {
  return table.find(e => roll >= e[0] && roll <= e[1]);
}

function lookupHouse(roll) {
  return HOUSE_TABLE.find(e => roll >= e.min && roll <= e.max);
}

// Roll three d100s using FoundryVTT's dice engine (triggers dice sounds & log)
const [r1Roll, r2Roll, r3Roll] = await Promise.all([
  new Roll("1d100").evaluate(),
  new Roll("1d100").evaluate(),
  new Roll("1d100").evaluate(),
]);

const r1 = r1Roll.total;
const r2 = r2Roll.total;
const r3 = r3Roll.total;

// ── RESOLVE ───────────────────────────────────────────────────────────────────

const house    = lookupHouse(r1);
const isDrow   = r2 <= DROW_THRESHOLD[house.key];
const unitType = isDrow ? "drow" : "aux";
const typeLabel = isDrow ? "Drow" : "Auxiliary";
const unitRow  = lookup(UNITS[house.key][unitType], r3);

const threshold = DROW_THRESHOLD[house.key];
const typeNote  = isDrow
  ? `roll ${r2} ≤ ${threshold}`
  : `roll ${r2} > ${threshold}`;

// ── OUTPUT ────────────────────────────────────────────────────────────────────

const content = `
<div style="
  border: 1px solid #5a1a1a;
  border-radius: 5px;
  padding: 10px 12px;
  background: #1c0a0a;
  color: #c8a0a0;
  font-family: serif;
  line-height: 1.6;
">
  <div style="font-size: 1.15em; font-weight: bold; color: #e05050; margin-bottom: 6px; letter-spacing: 0.05em;">
    ⚔ Xil House Encounter
  </div>
  <table style="width:100%; border-collapse: collapse; font-size: 0.95em;">
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">House</td>
      <td><strong style="color:#e8c8c8;">${house.label}</strong>
        <span style="color:#555; font-size:0.85em;"> (d100: ${r1})</span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Type</td>
      <td><strong style="color:#e8c8c8;">${typeLabel}</strong>
        <span style="color:#555; font-size:0.85em;"> (${typeNote})</span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Unit</td>
      <td style="color:#f0d8d8;">${unitRow[2]}
        <span style="color:#555; font-size:0.85em;"> (d100: ${r3})</span>
      </td>
    </tr>
  </table>
</div>`.trim();

await ChatMessage.create({
  content,
  speaker: ChatMessage.getSpeaker(),
  rolls: [r1Roll, r2Roll, r3Roll],
});

})();
