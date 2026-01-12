# Automation Scripts

Make your life easy with automation scripts (currently available for Tampermonkey).

## Tampermonkey scripts

- Disney+ Hotstar Enhancements [🔽 Get](src/hotstar-enhancements-tm/)
- Youtube Enhancements [🔽 Get](scripts/youtube-enhancements/)
- IMDB Copy Markdown Link [🔽 Get](src/imdb-copy-link-tm/)
- Imdb Obsidian Base Watchlist [🔽 Get](src/imdb-obsidian-base-watchlist/)

---

## Develop

### Setup

* setup/install IDE extensions for svelte, eslint, prettier, editorconfig etc. 
* Install relevant [pnpm](https://pnpm.io/) version.

### Install

1. install - `pnpm install`
2. build - `pnpm -r run build`

### Run a script

`pnpm --filter <SCRIPT_NAME> dev`

### Version bump

We are using [changesets](https://github.com/changesets/changesets) to manage script versions and changelog.

1. Bump the version with `pnpm changeset`.
2. Commit changes `pnpm changeset version`.
