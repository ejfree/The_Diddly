/**
 * Journey Tracker: G2 to G3 Connector
 * The Glacial Rift of the Frost Giant Jarl → Hall of the Fire Giant King (Room 1, G3 Upper)
 * 75 miles through the Sundering Peaks interior, 8 days normal pace
 *
 * GM-only macro. Stores progress as a world-scoped setting.
 * Dialog is client-side — never visible to players.
 *
 * To install: paste into a new Foundry macro (type: Script) and save.
 * Run as GM only.
 */

// ── Settings registration ──────────────────────────────────────────────────

const NS = "g2-to-g3-tracker";
const KEY = "currentDay";

try {
  game.settings.register(NS, KEY, {
    name: "G2 to G3 Journey — Current Day",
    scope: "world",
    config: false,
    type: Number,
    default: 0,
  });
} catch (_) { /* already registered */ }

// ── Journey data ───────────────────────────────────────────────────────────

const TOTAL_DAYS = 8;
const TOTAL_MILES = 75;

// hazardType: "cold" | "heat" | null — controls emoji and label
const ZONES = [
  {
    name: "Zone 1 — Descent from the Rift",
    days: [1, 2],
    flavor: "Still cold. Frost giant patrols reach this far. Two watchtowers guard the southern pass.",
    encounterChance: "1-in-4 (roll d4; 1 = encounter)",
    navDC: 16,
    hazardLabel: "Cold Hazard",
    hazardEmoji: "❄️",
    hazardDC: 14,
    ambushDC: 18,
    exhaustionThreshold: 3,
    color: "#1a2a4a",
  },
  {
    name: "Zone 2 — The Dead Heart",
    days: [3, 4],
    flavor: "Interior passes. Nothing permanent lives here. Ancient dwarven roads cut through.",
    encounterChance: "1-in-8 (roll d8; 1 = encounter)",
    navDC: 20,
    hazardLabel: "Cold Hazard",
    hazardEmoji: "❄️",
    hazardDC: 18,
    ambushDC: 16,
    exhaustionThreshold: 3,
    color: "#2a2a3a",
  },
  {
    name: "Zone 3 — Volcanic Approach",
    days: [5, 6],
    flavor: "The mountain breathes. Heat replaces cold. Sulfur drifts. Fire giant patrols begin.",
    encounterChance: "1-in-4 (roll d4; 1 = encounter)",
    navDC: 18,
    hazardLabel: "Heat Hazard",
    hazardEmoji: "🔥",
    hazardDC: 14,
    ambushDC: 20,
    exhaustionThreshold: 3,
    color: "#4a2a0a",
  },
  {
    name: "Zone 4 — The Broken Blade Spur",
    days: [7, 8],
    flavor: "Inside fire giant territory. Heat is constant. Patrols are real. Stealth is survival.",
    encounterChance: "1-in-3 (roll d6; 1–2 = encounter)",
    navDC: 22,
    hazardLabel: "Heat Hazard",
    hazardEmoji: "🔥",
    hazardDC: 18,
    ambushDC: 24,
    exhaustionThreshold: 2,
    color: "#5a1a0a",
  },
];

function getZone(day) {
  if (day <= 0) return null;
  return ZONES.find(z => day >= z.days[0] && day <= z.days[1]) ?? null;
}

// ── Display helpers ────────────────────────────────────────────────────────

function formatDay(day) {
  if (day === 0) return "Not started";
  if (day > TOTAL_DAYS) return "Journey complete";
  const whole = Math.floor(day);
  const half = day % 1 === 0.5;
  return half ? `Day ${whole}½` : `Day ${whole}`;
}

// Progress bar color transitions from ice-blue to stone-grey to fire-orange
function barGradient(day) {
  if (day <= 2) return "linear-gradient(90deg, #1a4a8a, #4a70a0)";
  if (day <= 4) return "linear-gradient(90deg, #4a70a0, #5a5a6a)";
  if (day <= 6) return "linear-gradient(90deg, #5a5a6a, #c05a20)";
  return "linear-gradient(90deg, #c05a20, #f07020, #f0a020)";
}

function buildContent(day) {
  const zone = getZone(day);
  const milesCompleted = Math.round((day / TOTAL_DAYS) * TOTAL_MILES);
  const pct = Math.min(100, Math.round((day / TOTAL_DAYS) * 100));

  const zoneBlock = zone
    ? `<div style="
          background:${zone.color}44;
          border:1px solid ${zone.color};
          border-radius:4px;
          padding:8px 10px;
          margin-top:10px;
        ">
        <div style="font-size:1.05em;font-weight:bold;color:#f0c070;margin-bottom:4px;">${zone.name}</div>
        <div style="font-size:0.85em;color:#c9b090;font-style:italic;margin-bottom:6px;">${zone.flavor}</div>
        <table style="width:100%;font-size:0.88em;border-collapse:collapse;">
          <tr>
            <td style="padding:2px 4px;">⚔️ Encounter</td>
            <td style="padding:2px 4px;color:#f0c070;">${zone.encounterChance}</td>
          </tr>
          <tr>
            <td style="padding:2px 4px;">🧭 Navigation DC</td>
            <td style="padding:2px 4px;color:#f0c070;">${zone.navDC}</td>
          </tr>
          <tr>
            <td style="padding:2px 4px;">${zone.hazardEmoji} ${zone.hazardLabel} DC</td>
            <td style="padding:2px 4px;color:#f0c070;">${zone.hazardDC}</td>
          </tr>
          <tr>
            <td style="padding:2px 4px;">👁 Detect Ambush DC</td>
            <td style="padding:2px 4px;color:#f0c070;">${zone.ambushDC}</td>
          </tr>
          <tr>
            <td style="padding:2px 4px;">😓 Exhaustion after</td>
            <td style="padding:2px 4px;color:#f0c070;">${zone.exhaustionThreshold} failed days</td>
          </tr>
        </table>
      </div>`
    : day === 0
      ? `<div style="text-align:center;color:#888;margin-top:12px;font-style:italic;">Press <strong>+ Half Day</strong> to begin the journey.</div>`
      : `<div style="text-align:center;color:#f08040;margin-top:12px;font-weight:bold;">
          The party has arrived at the Main Gate (Room 1, G3 Upper).<br>Journey complete.
        </div>`;

  // A climate indicator shows whether you're in cold or hot territory
  const climateNote = zone
    ? zone.hazardEmoji === "❄️"
      ? `<div style="text-align:center;font-size:0.8em;color:#7090c0;margin-top:4px;">Cold territory — cold-weather gear required</div>`
      : `<div style="text-align:center;font-size:0.8em;color:#c07040;margin-top:4px;">Hot territory — heat protection required (DC 15 Fortitude/hr without it)</div>`
    : "";

  return `
    <style>
      .jt-root { font-family: "Palatino Linotype", serif; color: #c9a96e; padding: 4px 2px; }
      .jt-dayline { font-size: 1.9em; text-align: center; color: #f0e0a0; font-weight: bold; margin: 6px 0 4px; letter-spacing: 0.04em; }
      .jt-subline { text-align: center; font-size: 0.85em; color: #a08060; margin-bottom: 8px; }
      .jt-bar-bg  { background: #2a2010; height: 10px; border-radius: 5px; overflow: hidden; }
      .jt-bar-fg  { height: 100%; border-radius: 5px; transition: width 0.3s; }
      .jt-zones   { display: flex; gap: 2px; margin-top: 4px; font-size: 0.7em; color: #888; }
      .jt-zones span { flex: 1; text-align: center; }
    </style>
    <div class="jt-root">
      <div class="jt-dayline">${formatDay(day)}</div>
      <div class="jt-subline">${milesCompleted} / ${TOTAL_MILES} miles  &nbsp;·&nbsp;  ${pct}% complete</div>
      <div class="jt-bar-bg">
        <div class="jt-bar-fg" style="width:${pct}%;background:${barGradient(day)}"></div>
      </div>
      <div class="jt-zones">
        <span>Descent<br>1–2</span>
        <span>Dead Heart<br>3–4</span>
        <span>Volcanic<br>5–6</span>
        <span>Broken Blade<br>7–8</span>
      </div>
      ${climateNote}
      ${zoneBlock}
    </div>
  `;
}

// ── Main dialog ────────────────────────────────────────────────────────────

async function showTracker() {
  const day = game.settings.get(NS, KEY);

  new Dialog(
    {
      title: "G2 → G3 Journey Tracker  [GM]",
      content: buildContent(day),
      buttons: {
        minus: {
          label: "− Half Day",
          callback: async () => {
            const cur = game.settings.get(NS, KEY);
            await game.settings.set(NS, KEY, Math.max(0, cur - 0.5));
            showTracker();
          },
        },
        plus: {
          label: "+ Half Day",
          callback: async () => {
            const cur = game.settings.get(NS, KEY);
            await game.settings.set(NS, KEY, Math.min(TOTAL_DAYS, cur + 0.5));
            showTracker();
          },
        },
        reset: {
          icon: '<i class="fas fa-undo"></i>',
          label: "Reset",
          callback: async () => {
            const confirmed = await Dialog.confirm({
              title: "Reset journey?",
              content: "<p>Return progress to Day 0?</p>",
            });
            if (confirmed) await game.settings.set(NS, KEY, 0);
            showTracker();
          },
        },
        close: {
          label: "Close",
        },
      },
      default: "plus",
    },
    { width: 420, resizable: false }
  ).render(true);
}

// ── Entry point ────────────────────────────────────────────────────────────

if (!game.user.isGM) {
  ui.notifications.warn("Journey Tracker is GM-only.");
} else {
  showTracker();
}
