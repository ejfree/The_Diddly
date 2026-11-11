// ============================================================
// UNCLE ALBEN — PRE-COMBAT BUFFS — FoundryVTT (PF2e) Script Macro
// ============================================================
// Casts Alben's short-duration buffs right before a fight and posts a summary
// to chat. This is NOT the daily script: long-duration morning casts live in
// dailies.js. Everything here lasts minutes, so run it when the fight starts
// (or one round before).
//
//   source "slot"        → casts a prepared spell from a Cleric slot (finds the
//                          slot holding it and casts from that slot).
//   source "wand-trick"  → Trick Magic Item: rolls the matching skill against
//                          the item's level DC. On success the wand is activated
//                          (its use is consumed and the spell card posts). On a
//                          critical failure he is locked out of that item until
//                          his next daily preparations.
//
// Each entry has an action cost. The summary adds them up and says how many
// rounds the sequence takes, since a round is only 3 actions. Entries run in
// order, so list the most important buff first.
//
// SETUP: Create a new Macro, set Type = "Script", paste this file.
//        Select Alben's token first (or assign him as your character).
//        Edit BUFFS below to change the set.
// ============================================================

(async () => {

// ── DATA ──────────────────────────────────────────────────────────────────────

// Level-based DCs (PF2e, Table 10-5), index = level. Trick Magic Item uses the
// level of the item being activated.
const LEVEL_DC = [14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 38, 39, 40, 42, 44, 46, 48, 50];

// Alben's pre-combat set, in the order they are cast.
//   slot:       { spell, rank, actions }
//   wand-trick: { item, skill, actions }   skill is the PF2e skill slug used for Trick Magic Item
//   effect (optional): slug of the effect the spell leaves on Alben. If he already
//                      has it, the entry is skipped so a buff isn't cast twice.
//                      Foundry's effect slugs are usually "spell-effect-<spell-name>".
const BUFFS = [
  { label: "Bless", source: "slot", spell: "Bless", rank: 1, actions: 2, effect: "spell-effect-bless" },

  // Haste is arcane + primal, so Alben (divine) has to Trick it. Nature is his
  // trained matching skill; Arcana is untrained.
  { label: "Haste", source: "wand-trick", item: "Wand of Haste (Rank 3)", skill: "nature", actions: 2 },

  // Examples — uncomment and edit to add more:
  // { label: "Whirling Scarves", source: "slot", spell: "Whirling Scarves", rank: 3, actions: 2 },
];

// Actions available per round. Raise it if Alben is hasted/quickened.
const ACTIONS_PER_ROUND = 3;

// ── ACTOR ─────────────────────────────────────────────────────────────────────

const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) return ui.notifications.warn("Pre-combat: select Alben's token (or assign him as your character).");

// ── CASTERS ───────────────────────────────────────────────────────────────────

async function castWandWithTrick(b) {
  const wand = actor.items.find(i => i.name === b.item);
  if (!wand) return { ok: false, note: `${b.item} not found on ${actor.name}` };

  const uses = wand.system.uses;
  if (uses && uses.max > 0 && uses.value <= 0) {
    return { ok: false, note: `${b.item} has no uses left today` };
  }

  const skill = actor.skills?.[b.skill];
  if (!skill) return { ok: false, note: `Skill "${b.skill}" not found` };

  const dc = LEVEL_DC[Math.min(Math.max(wand.system.level.value, 0), LEVEL_DC.length - 1)];
  const roll = await skill.roll({ dc: { value: dc }, label: `Trick Magic Item: ${wand.name}` });
  const degree = roll?.degreeOfSuccess;

  if (degree === 3 || degree === 2) {
    await wand.consume();
    return { ok: true, note: `${roll.total} vs DC ${dc}: activated` };
  }
  if (degree === 0) {
    return { ok: false, note: `${roll.total} vs DC ${dc}: critical failure. Locked out of ${wand.name} until daily preparations` };
  }
  return { ok: false, note: `${roll.total} vs DC ${dc}: failed, not activated` };
}

async function castFromSlot(b) {
  const entry = actor.spellcasting.find(e => e.name === "Cleric");
  if (!entry) return { ok: false, note: "Cleric spellcasting entry not found" };

  const spell = entry.spells.find(s => s.name === b.spell);
  if (!spell) return { ok: false, note: `${b.spell} not found` };

  const slotKey = `slot${b.rank}`;
  const prepared = entry.system.slots?.[slotKey]?.prepared ?? {};
  const slotId = Object.keys(prepared).find(k => prepared[k]?.id === spell.id && !prepared[k]?.expended);
  if (slotId === undefined) {
    return { ok: false, note: `${b.spell} isn't prepared (and unspent) in a rank ${b.rank} slot` };
  }

  await entry.cast(spell, { slotId: Number(slotId), rank: b.rank });
  return { ok: true, note: `cast from rank ${b.rank} slot` };
}

const CASTERS = { "wand-trick": castWandWithTrick, "slot": castFromSlot };

// ── RUN ───────────────────────────────────────────────────────────────────────

const results = [];
let actionsSpent = 0;

for (const b of BUFFS) {
  if (b.effect && actor.itemTypes.effect.some(e => e.slug === b.effect)) {
    results.push({ label: b.label, ok: true, skipped: true, note: "already active, skipped" });
    continue;
  }

  const run = CASTERS[b.source];
  if (!run) { results.push({ label: b.label, ok: false, note: `Unknown source "${b.source}"` }); continue; }

  try {
    const r = await run(b);
    // An attempt costs its actions whether or not it worked (a failed Trick Magic Item still spends them).
    actionsSpent += b.actions ?? 0;
    results.push({ label: b.label, ok: r.ok, note: r.note, actions: b.actions ?? 0 });
  } catch (err) {
    console.error("Pre-combat:", b.label, err);
    results.push({ label: b.label, ok: false, note: `Error: ${err.message}` });
  }
}

// ── OUTPUT ────────────────────────────────────────────────────────────────────

const rounds = Math.ceil(actionsSpent / ACTIONS_PER_ROUND);
const roundLine = actionsSpent === 0
  ? ""
  : `<div style="color:#888; margin-top:6px; font-size:0.85em;">${actionsSpent} actions spent: ${rounds} round${rounds === 1 ? "" : "s"} at ${ACTIONS_PER_ROUND} actions per round${rounds > 1 ? ". Not all of this fits before initiative." : "."}</div>`;

const rows = results.map(r => `
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">${r.skipped ? "–" : r.ok ? "✔" : "✘"} ${r.label}${r.actions ? ` <span style="color:#555;">(${r.actions})</span>` : ""}</td>
      <td style="color:${r.ok ? "#e8d8b8" : "#c47a6a"};">${r.note}</td>
    </tr>`).join("");

ChatMessage.create({
  speaker: ChatMessage.getSpeaker({ actor }),
  content: `
<div style="
  border: 1px solid #5a3a1a;
  border-radius: 5px;
  padding: 10px 12px;
  background: #1c130a;
">
  <div style="color:#c8a060; font-weight:bold; margin-bottom:6px;">${actor.name} — Pre-Combat</div>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em;">${rows}
  </table>${roundLine}
</div>`,
});

})();
