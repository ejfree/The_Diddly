// ============================================================
// UNCLE ALBEN — DAILIES — FoundryVTT (PF2e) Script Macro
// ============================================================
// Casts Alben's standing daily spells in order and posts a summary to chat.
// This is a morning/start-of-day script for long-duration casts. It is NOT a
// pre-combat buff script; short buffs (Bless, Fly, Haste, etc.) don't belong here.
//
//   source "wand-trick"  → Trick Magic Item: rolls the matching skill against
//                          the item's level DC. On success the wand is activated
//                          (its use is consumed and the spell card posts). On a
//                          critical failure he is locked out of that item until
//                          his next daily preparations.
//   source "slot"        → casts a prepared spell from a Cleric slot (finds the
//                          slot holding it and casts from that slot).
//
// SETUP: Create a new Macro, set Type = "Script", paste this file.
//        Select Alben's token first (or assign him as your character).
//        Edit DAILIES below to change the set.
// ============================================================

(async () => {

// ── DATA ──────────────────────────────────────────────────────────────────────

// Level-based DCs (PF2e, Table 10-5), index = level. Trick Magic Item uses the
// level of the item being activated.
const LEVEL_DC = [14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 38, 39, 40, 42, 44, 46, 48, 50];

// Alben's daily set, in the order they are cast.
//   wand-trick: { item, skill }   skill is the PF2e skill slug used for Trick Magic Item
//   slot:       { spell, rank }   rank is the slot rank the spell is prepared in
const DAILIES = [
  // Tailwind is arcane + primal, so Alben (divine) has to Trick it. Nature is his
  // trained matching skill; Arcana is untrained.
  { label: "Tailwind", source: "wand-trick", item: "Wand of Tailwind (Rank 2)", skill: "nature" },

  // Examples — uncomment and edit to add more:
  // { label: "Regenerate", source: "slot", spell: "Regenerate", rank: 7 },
];

// ── ACTOR ─────────────────────────────────────────────────────────────────────

const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) return ui.notifications.warn("Dailies: select Alben's token (or assign him as your character).");

const results = [];

// ── CASTERS ───────────────────────────────────────────────────────────────────

async function castWandWithTrick(d) {
  const wand = actor.items.find(i => i.name === d.item);
  if (!wand) return { ok: false, note: `${d.item} not found on ${actor.name}` };

  const uses = wand.system.uses;
  if (uses && uses.max > 0 && uses.value <= 0) {
    return { ok: false, note: `${d.item} has no uses left today` };
  }

  const skill = actor.skills?.[d.skill];
  if (!skill) return { ok: false, note: `Skill "${d.skill}" not found` };

  const dc = LEVEL_DC[Math.min(Math.max(wand.system.level.value, 0), LEVEL_DC.length - 1)];
  const roll = await skill.roll({ dc: { value: dc }, label: `Trick Magic Item: ${wand.name}` });
  const degree = roll?.degreeOfSuccess;

  if (degree === 3 || degree === 2) {
    await wand.consume();
    return { ok: true, note: `${roll.total} vs DC ${dc}: activated`, roll };
  }
  if (degree === 0) {
    return { ok: false, note: `${roll.total} vs DC ${dc}: critical failure. Locked out of ${wand.name} until daily preparations`, roll };
  }
  return { ok: false, note: `${roll.total} vs DC ${dc}: failed, not activated`, roll };
}

async function castFromSlot(d) {
  const entry = actor.spellcasting.find(e => e.name === "Cleric");
  if (!entry) return { ok: false, note: "Cleric spellcasting entry not found" };

  const spell = entry.spells.find(s => s.name === d.spell);
  if (!spell) return { ok: false, note: `${d.spell} not found` };

  const slotKey = `slot${d.rank}`;
  const prepared = entry.system.slots?.[slotKey]?.prepared ?? {};
  const slotId = Object.keys(prepared).find(k => prepared[k]?.id === spell.id && !prepared[k]?.expended);
  if (slotId === undefined) {
    return { ok: false, note: `${d.spell} isn't prepared (and unspent) in a rank ${d.rank} slot` };
  }

  await entry.cast(spell, { slotId: Number(slotId), rank: d.rank });
  return { ok: true, note: `cast from rank ${d.rank} slot` };
}

const CASTERS = { "wand-trick": castWandWithTrick, "slot": castFromSlot };

// ── RUN ───────────────────────────────────────────────────────────────────────

for (const d of DAILIES) {
  const run = CASTERS[d.source];
  if (!run) { results.push({ label: d.label, ok: false, note: `Unknown source "${d.source}"` }); continue; }
  try {
    const r = await run(d);
    results.push({ label: d.label, ok: r.ok, note: r.note });
  } catch (err) {
    console.error("Dailies:", d.label, err);
    results.push({ label: d.label, ok: false, note: `Error: ${err.message}` });
  }
}

// ── OUTPUT ────────────────────────────────────────────────────────────────────

const rows = results.map(r => `
    <tr>
      <td style="color:#888; padding-right:8px; white-space:nowrap; vertical-align:top;">${r.ok ? "✔" : "✘"} ${r.label}</td>
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
  <div style="color:#c8a060; font-weight:bold; margin-bottom:6px;">${actor.name} — Dailies</div>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em;">${rows}
  </table>
</div>`,
});

})();
