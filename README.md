# Automation Scripts

Make your life easy with automation scripts (currently available for Tampermonkey).

## Tampermonkey scripts

- Youtube Enhancements [🔽 Get](scripts/youtube-enhancements/)
- Imdb Obsidian Base Watchlist [🔽 Get](scripts/imdb-obsidian-base-watchlist/)
- Disney+ Hotstar Enhancements [🔽 Get](scripts/hotstar-enhancements/)
- Goodreads Obsidian Base Readlist [🔽 Get](scripts/goodreads-obsidian-base-readlist/)

---

## Develop

### Setup

- setup/install IDE extensions for svelte, eslint, prettier, editorconfig etc.
- Install relevant [pnpm](https://pnpm.io/) version.

### Install

1. install - `pnpm install`
2. build - `pnpm -r run build`

### Run a script

`pnpm --filter <SCRIPT_NAME> dev`

### Build a script

`pnpm --filter <SCRIPT_NAME> build`

### Version bump

We are using [changesets](https://github.com/changesets/changesets) to manage script versions and changelog.

1. Bump the version with `pnpm changeset`.
2. Commit changes `pnpm changeset version`.

### Test all scripts

`pnpm test`
