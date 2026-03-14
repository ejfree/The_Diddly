/**
 * Journey Tracker: G1 to G2 Connector
 * The Steading of the Hill Giant Chief → The Glacial Rift (Room 1, G2 Upper)
 * 100 miles overland, 10 days normal pace
 *
 * GM-only macro. Stores progress as a world-scoped setting.
 * Dialog is client-side — never visible to players.
 *
 * To install: paste into a new Foundry macro (type: Script) and save.
 * Run as GM only.
 */

// ── Settings registration ──────────────────────────────────────────────────

const NS = "g1-to-g2-tracker";
const KEY = "currentDay";

try {
  game.settings.register(NS, KEY, {
    name: "G1 to G2 Journey — Current Day",
    scope: "world",
    config: false,
    type: Number,
    default: 0,
  });
} catch (_) { /* already registered */ }

// ── Journey data ───────────────────────────────────────────────────────────

const TOTAL_DAYS = 10;
const TOTAL_MILES = 100;

// Environmental hazard label per zone (replaces Forage in this overland connector)
const ZONES = [
  {
    name: "Zone 1 — Highland Approach",
    days: [1, 3],
    flavor: "Scrub pine, broken shale, giant campsites. Still habitable. Wildlife present.",
    encounterChance: "1-in-6 (roll d6; 1 = encounter)",
    navDC: 14,
    hazardLabel: "—",
    hazardDC: null,
    forageDC: 18,
    ambushDC: 16,
    exhaustionThreshold: 4,
    color: "#3a4a28",
  },
  {
    name: "Zone 2 — The High Pass",
    days: [4, 7],
    flavor: "Above the treeline. No shelter. Cold. Giant cairn-road. Traffic thins.",
    encounterChance: "1-in-8 (roll d8; 1 = encounter)",
    navDC: 18,
    hazardLabel: "Cold Hazard",
    hazardDC: 16,
    forageDC: 24,
    ambushDC: 18,
    exhaustionThreshold: 3,
    color: "#2a3a5a",
  },
  {
    name: "Zone 3 — The Glacial Approach",
    days: [8, 10],
    flavor: "Glacier, crevasse fields, permanent ice. G2 territory. The Rift is visible.",
    encounterChance: "1-in-3 (roll d6; 1–2 = encounter)",
    navDC: 20,
    hazardLabel: "Cold Hazard",
    hazardDC: 20,
    forageDC: 28,
    ambushDC: 14,
    exhaustionThreshold: 2,
    color: "#1a2a4a",
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
            <td style="padding:2px 4px;">❄️ ${zone.hazardLabel} DC</td>
            <td style="padding:2px 4px;color:#f0c070;">${zone.hazardDC ?? "—"}</td>
          </tr>
          <tr>
            <td style="padding:2px 4px;">🌿 Forage DC</td>
            <td style="padding:2px 4px;color:#f0c070;">${zone.forageDC}</td>
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
      : `<div style="text-align:center;color:#8fbc8f;margin-top:12px;font-weight:bold;">
          The party has arrived at the Rift Entrance (Room 1, G2 Upper).<br>Journey complete.
        </div>`;

  return `
    <style>
      .jt-root { font-family: "Palatino Linotype", serif; color: #c9a96e; padding: 4px 2px; }
      .jt-dayline { font-size: 1.9em; text-align: center; color: #f0e0a0; font-weight: bold; margin: 6px 0 4px; letter-spacing: 0.04em; }
      .jt-subline { text-align: center; font-size: 0.85em; color: #a08060; margin-bottom: 8px; }
      .jt-bar-bg  { background: #2a2010; height: 10px; border-radius: 5px; overflow: hidden; }
      .jt-bar-fg  { background: linear-gradient(90deg, #3a6b3f, #a0c070, #e0f0c0);
                    height: 100%; border-radius: 5px; transition: width 0.3s; }
      .jt-zones   { display: flex; gap: 2px; margin-top: 4px; font-size: 0.7em; color: #888; }
      .jt-zones span { flex: 1; text-align: center; }
    </style>
    <div class="jt-root">
      <div class="jt-dayline">${formatDay(day)}</div>
      <div class="jt-subline">${milesCompleted} / ${TOTAL_MILES} miles  &nbsp;·&nbsp;  ${pct}% complete</div>
      <div class="jt-bar-bg"><div class="jt-bar-fg" style="width:${pct}%"></div></div>
      <div class="jt-zones">
        <span>Highland<br>1–3</span>
        <span>High Pass<br>4–7</span>
        <span>Glacial<br>8–10</span>
      </div>
      ${zoneBlock}
    </div>
  `;
}

// ── Main dialog ────────────────────────────────────────────────────────────

async function showTracker() {
  const day = game.settings.get(NS, KEY);

  new Dialog(
    {
      title: "G1 → G2 Journey Tracker  [GM]",
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
