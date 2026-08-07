# Local Foundry VTT Dev Instance

A self-contained Foundry VTT **v14** development server for The Diddly. Isolated from any live/hosted game by its own `--dataPath`, so nothing here can touch a running campaign.

```
foundry/
  dev.sh        # launcher (committed)
  stop-dev.sh   # graceful shutdown (committed)
  .gitignore    # ignores app/ and data/ (committed)
  app/          # unzipped Foundry "Node.js" release  — NOT committed
  data/         # worlds, systems, modules, Config, Logs — NOT committed
```

---

## Setup

**1. Install Node 24.** Homebrew's plain `node` is 26.x — too new. Use the pinned formula:

```bash
brew install node@24     # 24.19.0, clears Foundry's 24.13.1 floor
```

This formula is **keg-only**, so it deliberately does not put `node` on your PATH. `dev.sh` looks for it at `/opt/homebrew/opt/node@24/bin/node` directly, so there's nothing to add to your shell profile. To point at a different runtime:

```bash
FOUNDRY_NODE=/path/to/node ./dev.sh
```

> **Gotcha.** Editors bundle their own Node — Zed's lives at `~/Library/Application Support/Zed/node/…` and is injected into the PATH of processes it spawns. That's why `node` can resolve inside an editor task and be missing in Terminal, and why `dev.sh` pins a version range instead of trusting bare `node`. Zed's 24.11.0 is below Foundry's floor and is correctly rejected.

**2. Download the release.** From <https://foundryvtt.com/me/licenses>, set the OS dropdown to **Node.js** (not macOS) and download **14.365 — Version 14 Stable 7**. Take 14.365 specifically, not V14 Stable 1 (14.359): the PF2e system's floor is above it (see Version Pinning).

**3. Unzip into `app/`:**

```bash
unzip ~/Downloads/FoundryVTT-Node-14.365.zip -d foundry/app
```

The zip extracts **flat** — you should end up with `app/main.js` and `app/main.mjs`, not `app/resources/app/main.js`. `dev.sh` probes both layouts, so either works.

**4. Launch:**

```bash
cd foundry && ./dev.sh
```

Then open <http://localhost:30000> and enter your license key.

**5. Install the PF2e system.** In the setup screen: **Game Systems → Install System**, and paste:

```
https://github.com/foundryvtt/pf2e/releases/latest/download/system.json
```

---

## Version Pinning

| Component | Version | Constraint |
|---|---|---|
| Foundry VTT | **14.365** (V14 Stable 7, 2026-07-15) | First build fully signed with Apple — installs on macOS without Gatekeeper warnings. |
| Node.js | **>=24.13.1, <25** | Taken from the release's own `app/package.json` → `engines.node`. Major 24 alone is *not* enough — 24.11.x is below the floor. Foundry's guide states Node 24 for v14 and above; v13 and below cap at 22, and the two lines are **mutually exclusive**. `dev.sh` reads the floor from the unzipped build and rejects anything out of range, naming what it rejected. |
| PF2e system | **8.4.0** (2026-07-31) | `compatibility: { minimum: 14.361, verified: 14.365, maximum: 14 }`. Requires v14; will not load on 14.359. |

If you ever need a v13 instance alongside this one, manage Node per-instance with `fnm` or `nvm` — don't try to serve both from the same runtime.

---

## Usage

```bash
./dev.sh              # port 30000
./dev.sh 30001        # different port
FOUNDRY_UPNP=true ./dev.sh    # allow router port-forwarding (off by default)
```

- **`--dataPath` is the isolation boundary.** Everything Foundry writes lands in `data/`. A throwaway scratch instance is just a copy of `dev.sh` with a different data dir.
- **Logs:** `data/Logs/` — tail these rather than hunting the browser console.

**Stopping:**

```bash
./stop-dev.sh           # SIGTERM, escalating to SIGKILL after 10s
./stop-dev.sh --force   # straight to SIGKILL
```

Prefer the graceful path. Foundry closes its LevelDB handles on a clean shutdown; a SIGKILL mid-write can leave a world's database needing recovery on next start. The script is scoped by absolute path to *this* `app/`, so another Foundry install elsewhere on the machine is untouched, and it exits 0 when nothing is running (safe to call unconditionally).

### Port and UPnP are not CLI flags

v14.365 parses exactly five command-line flags — `--adminKey`, `--adminPassword`, `--dataPath`, `--background`, `--noupdate`. There is **no `--port` and no `--upnp`**, and Foundry ignores them silently if you pass them, which makes the mistake easy to miss. Both settings live in `data/Config/options.json`.

`dev.sh` therefore patches that file before launching:

- **`port`** ← the script's first argument.
- **`upnp`** ← forced to `false`. Foundry defaults UPnP **on** and will ask your router to expose the instance to the internet on startup — correct for a real game server, wrong for a dev box. Set `FOUNDRY_UPNP=true` to opt back in.
- **Module/system development:** symlink your working tree in rather than copying, so edits are live on reload:
  ```bash
  ln -s ~/code/my-module foundry/data/Data/modules/my-module
  ```

---

## Version-Controlling Campaign Content

Since Foundry v11, worlds and compendia are **LevelDB directories** — binary, unmergeable, and not greppable. That's why `data/` is gitignored wholesale. To get campaign content into this repo, unpack it first:

```bash
npm install -g @foundryvtt/foundryvtt-cli   # v3.0.4
fvtt package unpack <pack-name>             # LevelDB → per-document YAML/JSON
fvtt package pack   <pack-name>             # and back again
```

That's the round-trip path for turning `docs/` material into compendium content, or for pulling Foundry actors back out into reviewable text (compare `docs/solo/uncle-alben/assets/foundryvttjson/`).

---

## Known Issue — Missing macOS LevelDB Prebuild

**Symptom.** Foundry crashes on startup with:

```
Error: No native build was found for platform=darwin arch=arm64 runtime=node abi=137 …
    loaded from: .../app/node_modules/classic-level
```

**Cause.** The Node.js zip for 14.365 ships `classic-level` 3.0.0 with prebuilds for **win32, linux, and android only** — the `prebuilds/darwin-x64+arm64/` directory is absent. It *is* present in the package published on npm. Nothing to do with your Node version.

**Fix.** Restore the missing prebuild from the published tarball. It's a Mach-O universal binary (x86_64 + arm64) and **N-API**, so it's portable across Node majors — no compiler, no Xcode CLT, no `npm rebuild`:

```bash
cd /tmp && curl -sL https://registry.npmjs.org/classic-level/-/classic-level-3.0.0.tgz -o cl.tgz && tar xzf cl.tgz
mkdir -p "$OLDPWD/app/node_modules/classic-level/prebuilds/darwin-x64+arm64"
cp package/prebuilds/darwin-x64+arm64/classic-level.node \
   "$OLDPWD/app/node_modules/classic-level/prebuilds/darwin-x64+arm64/"
```

**Re-apply this after every Foundry upgrade** — replacing `app/` wipes it. Check the version in `app/node_modules/classic-level/package.json` and pull the matching tarball if it's no longer 3.0.0.

---

## v14 Migration Note

V14's headline changes are **Scene Levels**, **Active Effects V2**, and **Scene Regions V2 replacing measured templates**. If you later restore a v13 world into this instance, Scene Regions is the migration most likely to need hands-on repair — which is the argument for testing that restore here before doing it anywhere that matters.

---

## Cross-References

- [Foundry 14.365 release notes](https://foundryvtt.com/releases/14.365)
- [Foundry installation guide](https://foundryvtt.com/article/installation/)
- [PF2e system manifest](https://github.com/foundryvtt/pf2e/releases/latest/download/system.json)
