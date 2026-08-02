// ============================================================
// UNCLE ALBEN — WHAT'S HE POURING? — FoundryVTT Script Macro
// ============================================================
// Rolls Alben's drink of the moment.
//   d100 roll 1–50  → Rambui (his signature rambutan brandy)
//   d100 roll 51–100 → a second d100 roll against his 100-bottle
//                       Tian Xia liquor cabinet (see liquor.md)
// Outputs a formatted result to chat with FoundryVTT dice integration.
//
// SETUP: Create a new Macro, set Type = "Script", paste this file.
// ============================================================

(async () => {

// ── DATA ──────────────────────────────────────────────────────────────────────

// Region → 100-entry cabinet, in the same order as liquor.md.
// Index in this array = d100 result (index 0 = roll of 1).
const CABINET = [
  // Minkai (1–9)
  { name: "Silver Crane Whiskey",      type: "Whiskey", region: "Minkai",   notes: "Rice-malt, cedar-cask aged, faint cherry blossom on the finish" },
  { name: "Oni's Ember Whiskey",       type: "Whiskey", region: "Minkai",   notes: "Peated barley, aggressively smoky, a fiery kick like a demon's temper" },
  { name: "Plum Blossom Brandy",       type: "Brandy",  region: "Minkai",   notes: "Tart umeshu-style plum brandy, sweet and bracing" },
  { name: "Kami's Breath Gin",         type: "Gin",     region: "Minkai",   notes: "Botanicals of yuzu peel, shiso leaf, and sansho pepper" },
  { name: "Tengu Wing Whiskey",        type: "Whiskey", region: "Minkai",   notes: "High-proof mountain whiskey, sharp as a windstorm" },
  { name: "Moonviewing Brandy",        type: "Brandy",  region: "Minkai",   notes: "Rice brandy aged in casks left open to the night sky" },
  { name: "Shogun's Reserve Whiskey",  type: "Whiskey", region: "Minkai",   notes: "Imperial-grade, oak and dried persimmon, commands respect" },
  { name: "Sakura Ember Gin",          type: "Gin",     region: "Minkai",   notes: "Cherry blossom botanicals over a quiet juniper backbone" },
  { name: "Nine-Tailed Whiskey",       type: "Whiskey", region: "Minkai",   notes: "Named for kitsune legend — the finish seems to change with every sip" },

  // Jinin (10–18)
  { name: "Iron Dragon Whiskey",       type: "Whiskey", region: "Jinin",    notes: "Sorghum-mash whiskey, five-spice heat that lingers like a coal" },
  { name: "Jade Empress Brandy",       type: "Brandy",  region: "Jinin",    notes: "Lychee and osmanthus, an imperial reserve poured for honored guests" },
  { name: "Celestial Ember Gin",       type: "Gin",     region: "Jinin",    notes: "Juniper cut with star anise and dried goji berry" },
  { name: "Dragon Scale Whiskey",      type: "Whiskey", region: "Jinin",    notes: "Smoky sorghum whiskey with a Sichuan peppercorn tingle" },
  { name: "Longan Blossom Brandy",     type: "Brandy",  region: "Jinin",    notes: "Dried longan and honey, mellow and rounded" },
  { name: "Vermilion Court Whiskey",   type: "Whiskey", region: "Jinin",    notes: "Ceremonial toasting whiskey, bold red-pepper bite" },
  { name: "Silk Road Gin",             type: "Gin",     region: "Jinin",    notes: "Botanicals gathered from a dozen trade routes, complex and shifting" },
  { name: "Nine Phoenix Whiskey",      type: "Whiskey", region: "Jinin",    notes: "Layered and smoky, said to taste different with every pour" },
  { name: "Golden Pagoda Brandy",      type: "Brandy",  region: "Jinin",    notes: "Aged in clay urns, dried fruit and deep caramel" },

  // Tianjing (19–22)
  { name: "Celestial Throne Whiskey",  type: "Whiskey", region: "Tianjing", notes: "Imperial reserve, exceptionally smooth, aged beneath palace eaves" },
  { name: "Palace Gate Gin",           type: "Gin",     region: "Tianjing", notes: "Refined botanicals of jasmine and green tea leaf" },
  { name: "Court Astrologer's Brandy", type: "Brandy",  region: "Tianjing", notes: "Said to taste subtly different depending on the phase of the moon" },
  { name: "Emperor's Seal Whiskey",    type: "Whiskey", region: "Tianjing", notes: "Bottled with a dragon-motif seal, rare, potent, and expensive" },

  // Hongal (23–30)
  { name: "Steppe Rider Vodka",        type: "Vodka",   region: "Hongal",   notes: "Clear grain spirit, sharp and utterly unadorned" },
  { name: "Milk of the Steppe",        type: "Vodka",   region: "Hongal",   notes: "Distilled from fermented mare's milk — tangy, strange, and strong" },
  { name: "Golden Horde Whiskey",      type: "Whiskey", region: "Hongal",   notes: "Bold and unforgiving, named for the old conquerors" },
  { name: "Eternal Sky Gin",           type: "Gin",     region: "Hongal",   notes: "Wild steppe herbs and juniper, tastes of open horizon" },
  { name: "Nomad's Ember Whiskey",     type: "Whiskey", region: "Hongal",   notes: "Portable trail batch, harsh but dependable" },
  { name: "Thundering Hooves Brandy",  type: "Brandy",  region: "Hongal",   notes: "Fruit brandy from hardy steppe berries, quick and sharp" },
  { name: "Khan's Reserve Whiskey",    type: "Whiskey", region: "Hongal",   notes: "Aged in leather-lined casks, smoky and commanding" },
  { name: "Frost Wolf Vodka",          type: "Vodka",   region: "Hongal",   notes: "Ice-filtered, bracingly clean, numbing on the way down" },

  // Quain (31–34)
  { name: "Hidden Peak Whiskey",       type: "Whiskey", region: "Quain",    notes: "Reclusive mountain distillery, smoky and mysterious" },
  { name: "Secret Valley Gin",         type: "Gin",     region: "Quain",    notes: "Foraged alpine botanicals from a recipe no outsider knows" },
  { name: "Veiled Mountain Brandy",    type: "Brandy",  region: "Quain",    notes: "Rare export, said to sharpen the mind before it dulls it" },
  { name: "Quain Reserve Whiskey",     type: "Whiskey", region: "Quain",    notes: "Almost never leaves the valley; prized wherever it does" },

  // Shokuro (35–38)
  { name: "Harbor Lantern Whiskey",    type: "Whiskey", region: "Shokuro",  notes: "Cheap, smoky, the standard pour in every dockside tavern" },
  { name: "City-State Gin",            type: "Gin",     region: "Shokuro",  notes: "Eclectic botanicals gathered from a dozen market stalls" },
  { name: "Shokuro Ember Brandy",      type: "Brandy",  region: "Shokuro",  notes: "Bold trade-town brandy, favored by merchants closing a deal" },
  { name: "Market Square Whiskey",     type: "Whiskey", region: "Shokuro",  notes: "Blended from surplus grain, rough, honest, and cheap" },

  // Xa Hoi (39–44)
  { name: "Ancestor's Ember Whiskey",  type: "Whiskey", region: "Xa Hoi",   notes: "Funerary rice whiskey, traditionally poured for the dead first" },
  { name: "Mourning Bell Brandy",      type: "Brandy",  region: "Xa Hoi",   notes: "Somber and bittersweet, aged in stone tomb chambers" },
  { name: "Jungle Orchid Gin",         type: "Gin",     region: "Xa Hoi",   notes: "Floral botanicals laid over a raw, insistent heat" },
  { name: "Undying Court Whiskey",     type: "Whiskey", region: "Xa Hoi",   notes: "Eerily clear, and — unsettlingly — never seems to spoil" },
  { name: "Lotus Tomb Brandy",         type: "Brandy",  region: "Xa Hoi",   notes: "Lotus-root sweetness, a traditional funerary offering spirit" },
  { name: "Silent Procession Whiskey", type: "Whiskey", region: "Xa Hoi",   notes: "Smooth going down, with an aftertaste that lingers far too long" },

  // Nagajor (45–50)
  { name: "Serpent Coil Whiskey",      type: "Whiskey", region: "Nagajor",  notes: "Steeped with exotic root, fiery, favored by swamp hunters" },
  { name: "Venom Ember Gin",           type: "Gin",     region: "Nagajor",  notes: "Sharp botanicals drawn from marsh herbs, a biting finish" },
  { name: "Naga Pearl Brandy",         type: "Brandy",  region: "Nagajor",  notes: "Smooth swamp-fruit brandy with an iridescent pearl sheen" },
  { name: "River Delta Whiskey",       type: "Whiskey", region: "Nagajor",  notes: "Murky in color, surprisingly clean on the palate" },
  { name: "Coiled Jade Gin",           type: "Gin",     region: "Nagajor",  notes: "Jade-green botanical gin, thick with jungle juniper" },
  { name: "Marsh Light Brandy",        type: "Brandy",  region: "Nagajor",  notes: "Swamp berry brandy that seems to glow faintly under moonlight" },

  // Lingshen (51–55)
  { name: "Coastal Ember Whiskey",     type: "Whiskey", region: "Lingshen", notes: "Sea-salt finished, faintly briny on the tongue" },
  { name: "Peninsula Gin",             type: "Gin",     region: "Lingshen", notes: "Coastal botanicals of sea fennel and bitter citrus peel" },
  { name: "Tide Pool Brandy",          type: "Brandy",  region: "Lingshen", notes: "Briny-sweet, aged in casks stored near the shoreline" },
  { name: "Pearl Bay Whiskey",         type: "Whiskey", region: "Lingshen", notes: "Smooth, oak-aged within sight of the harbor" },
  { name: "Storm Coast Gin",           type: "Gin",     region: "Lingshen", notes: "Sharp juniper cut through with sea brine" },

  // Kaoling (56–60)
  { name: "Highland Ember Whiskey",    type: "Whiskey", region: "Kaoling",  notes: "Mountain-grown grain, rustic and full-bodied" },
  { name: "Kaoling Peak Gin",          type: "Gin",     region: "Kaoling",  notes: "Alpine botanicals of pine needle and wild juniper" },
  { name: "Cloud Summit Brandy",       type: "Brandy",  region: "Kaoling",  notes: "Thin-air distillate, unusually clean and sharp" },
  { name: "Stonepath Whiskey",         type: "Whiskey", region: "Kaoling",  notes: "Austere, almost metallic — an acquired mountain taste" },
  { name: "Frostpine Gin",             type: "Gin",     region: "Kaoling",  notes: "Crisp cold-climate botanicals, resinous and bracing" },

  // Wanshou (61–65)
  { name: "Elder's Ginseng Whiskey",   type: "Whiskey", region: "Wanshou",  notes: "Root-infused, warming, faintly medicinal" },
  { name: "Longevity Brandy",          type: "Brandy",  region: "Wanshou",  notes: "Aged decades, handed down and treated like a family heirloom" },
  { name: "Sage's Reserve Gin",        type: "Gin",     region: "Wanshou",  notes: "Herbal botanicals favored by scholars and physicians alike" },
  { name: "Thousand-Year Whiskey",     type: "Whiskey", region: "Wanshou",  notes: "Slow-aged and said to grant wisdom (it does not, but it tries)" },
  { name: "Wanshou Ember Brandy",      type: "Brandy",  region: "Wanshou",  notes: "Deep caramel and dried fruit, poured at ceremonial occasions" },

  // Yamasa (66–69)
  { name: "Forest Canopy Whiskey",     type: "Whiskey", region: "Yamasa",   notes: "Woodland grain spirit, resinous and gently smoky" },
  { name: "Green Grove Gin",           type: "Gin",     region: "Yamasa",   notes: "Fresh forest botanicals, bright and herbal" },
  { name: "Deep Wood Brandy",          type: "Brandy",  region: "Yamasa",   notes: "Dark fruit brandy, aged for years under heavy tree cover" },
  { name: "Silent Grove Whiskey",      type: "Whiskey", region: "Yamasa",   notes: "Quiet, mellow, with a faint natural sweetness" },

  // Yanmass (70–74)
  { name: "Trade Wind Whiskey",        type: "Whiskey", region: "Yanmass",  notes: "An eclectic blend drawn from a dozen import routes" },
  { name: "Harbor Market Gin",         type: "Gin",     region: "Yanmass",  notes: "A little of everything from the docks — somehow balanced" },
  { name: "Caravan's Ember Brandy",    type: "Brandy",  region: "Yanmass",  notes: "Well-traveled, smoky, and warm after a long road" },
  { name: "Foreign Quarter Whiskey",   type: "Whiskey", region: "Yanmass",  notes: "Blended styles from visiting merchants, cosmopolitan flavor" },
  { name: "Yanmass Reserve Gin",       type: "Gin",     region: "Yanmass",  notes: "The city-state's own refined botanical blend" },

  // Yodeya (75–79)
  { name: "Fox Fire Whiskey",          type: "Whiskey", region: "Yodeya",   notes: "Tricky and warm — regulars swear it tastes different every time" },
  { name: "Nine-Tailed Gin",           type: "Gin",     region: "Yodeya",   notes: "Layered botanicals, playful on the nose, sly in the finish" },
  { name: "Trickster's Ember Brandy",  type: "Brandy",  region: "Yodeya",   notes: "Sweet at first sip, surprising heat right after" },
  { name: "Kitsune's Veil Whiskey",    type: "Whiskey", region: "Yodeya",   notes: "Smooth and beguiling, easy to underestimate" },
  { name: "Moonlit Den Gin",           type: "Gin",     region: "Yodeya",   notes: "Delicate juniper with a faint floral sleight of hand" },

  // Zi Ha (80–83)
  { name: "Far Horizon Whiskey",       type: "Whiskey", region: "Zi Ha",    notes: "Remote-distilled, rarely seen outside its home valley" },
  { name: "Zi Ha Ember Gin",           type: "Gin",     region: "Zi Ha",    notes: "Foraged remote botanicals, sparse and strange" },
  { name: "Lonely Peak Brandy",        type: "Brandy",  region: "Zi Ha",    notes: "Austere and solitary in flavor, matches its origin" },
  { name: "Distant Reach Whiskey",     type: "Whiskey", region: "Zi Ha",    notes: "Simple, honest, and hard to find anywhere else" },

  // Po Li Archipelago (84–91)
  { name: "Island Ember Rum",          type: "Rum",     region: "Po Li Archipelago", notes: "Dark tropical cane spirit, rich and full-bodied" },
  { name: "Reef Gold Rum",             type: "Rum",     region: "Po Li Archipelago", notes: "Lighter style, citrus peel and salt air" },
  { name: "Archipelago Gin",           type: "Gin",     region: "Po Li Archipelago", notes: "Tropical botanicals of coconut husk and citrus peel" },
  { name: "Volcanic Isle Whiskey",     type: "Whiskey", region: "Po Li Archipelago", notes: "Mineral-rich water source lends it a smoky edge" },
  { name: "Pearl Tide Rum",            type: "Rum",     region: "Po Li Archipelago", notes: "Aged near the coast, briny-sweet finish" },
  { name: "Typhoon Ember Rum",         type: "Rum",     region: "Po Li Archipelago", notes: "Bold, stormy, and dangerously high-proof" },
  { name: "Sampan Gin",                type: "Gin",     region: "Po Li Archipelago", notes: "Light and floral, favored on small fishing boats" },
  { name: "Coral Ember Brandy",        type: "Brandy",  region: "Po Li Archipelago", notes: "Tropical fruit brandy with a distinctive coral-pink hue" },

  // Bachuan (92–95)
  { name: "Refuge Ember Whiskey",      type: "Whiskey", region: "Bachuan",  notes: "Humble and simple, meant to steady the nerves" },
  { name: "Sanctuary Gin",             type: "Gin",     region: "Bachuan",  notes: "Mild botanicals with a reputation for calming" },
  { name: "Bachuan Reserve Brandy",    type: "Brandy",  region: "Bachuan",  notes: "Modest but carefully crafted, better than its reputation" },
  { name: "Quiet Valley Whiskey",      type: "Whiskey", region: "Bachuan",  notes: "Unassuming and honest, a settler's evening drink" },

  // Dtang Ma (96–100)
  { name: "Jungle Canopy Whiskey",     type: "Whiskey", region: "Dtang Ma", notes: "Exotic grain spirit with a humid, heavy warmth" },
  { name: "Wild Orchid Gin",           type: "Gin",     region: "Dtang Ma", notes: "Floral jungle botanicals over a green, herbal base" },
  { name: "Dtang Ma Ember Brandy",     type: "Brandy",  region: "Dtang Ma", notes: "Tropical fruit brandy with bold, lingering heat" },
  { name: "Serpent Vine Whiskey",      type: "Whiskey", region: "Dtang Ma", notes: "Steeped with jungle root, fiery and intense" },
  { name: "Canopy Mist Gin",           type: "Gin",     region: "Dtang Ma", notes: "Light, herbal, high-altitude jungle botanicals" },
];

const RAMBUI = {
  name: "Rambui",
  type: "Brandy",
  region: "Alben's own stock",
  notes: "His signature rambutan brandy — the one he pours for family, first-timers, and himself.",
};

// ── ROLL ENGINE ───────────────────────────────────────────────────────────────

const gateRoll = await new Roll("1d100").evaluate();
const isRambui = gateRoll.total <= 50;

let drink = RAMBUI;
let cabinetRoll = null;

if (!isRambui) {
  cabinetRoll = await new Roll("1d100").evaluate();
  drink = CABINET[cabinetRoll.total - 1];
}

const rolls = isRambui ? [gateRoll] : [gateRoll, cabinetRoll];

// ── OUTPUT ────────────────────────────────────────────────────────────────────

const gateNote = isRambui
  ? `roll ${gateRoll.total} ≤ 50 → Rambui`
  : `roll ${gateRoll.total} > 50 → cabinet`;

const cabinetLine = isRambui
  ? ""
  : `
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Cabinet Roll</td>
      <td><strong style="color:#e8d8b8;">${drink.name}</strong>
        <span style="color:#555; font-size:0.85em;"> (d100: ${cabinetRoll.total})</span>
      </td>
    </tr>`;

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
    🍶 What's Alben Pouring?
  </div>
  <table style="width:100%; border-collapse: collapse; font-size: 0.95em;">
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Gate Roll</td>
      <td><strong style="color:#e8c8a8;">${isRambui ? "Rambui" : "The Cabinet"}</strong>
        <span style="color:#555; font-size:0.85em;"> (${gateNote})</span>
      </td>
    </tr>${cabinetLine}
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Drink</td>
      <td><strong style="color:#f0d8b8;">${drink.name}</strong>
        <span style="color:#888; font-size:0.85em;"> — ${drink.type}${drink.region ? ` (${drink.region})` : ""}</span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">Notes</td>
      <td style="color:#e0d0c0; font-style:italic;">${drink.notes}</td>
    </tr>
  </table>
</div>`.trim();

await ChatMessage.create({
  content,
  speaker: ChatMessage.getSpeaker(),
  rolls,
});

})();
