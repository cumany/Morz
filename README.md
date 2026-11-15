<p align="center"><img src="assets/icon.svg" width="88" height="88" alt=""></p>

# Morz · 墨与纸

**Morz**（墨与纸）— ink and paper, the only two things a writing tool needs.

Morz is a WYSIWYG Markdown editor with a local-first knowledge layer: documents are ordinary
`.md` files, links and backlinks are first-class, and plugins/themes extend the editor without
locking your notes in.

Built with CodeMirror 6, markdown-it and MathJax. The desktop app runs on Tauri 2 — no Electron,
and no server is required for core features. Documents stay on your device: write, edit and export
offline, in plain `.md` files you can open anywhere. Diagrams are written in Mermaid syntax and
render as themed SVG.

Morz is an independent project by Cuman, not affiliated with Typora or Obsidian.

This repository is the **public home** for Morz:

- **Docs** for users, plugin authors and theme authors.
- **Registry** (`registry/index.json`) of plugins and themes.
- **Releases** with the desktop installer and the signed updater manifest.
- **Landing page** at <https://morz.app/> and the web app (PWA) for the browser.

Source code is maintained in a private repository. The public repository intentionally contains no
source tree, tests or build scripts.

## Read the manual

- **[Help center](docs/manual/README.md)** — setup, writing, tables, export, settings, FAQ, one page per task.
- **[Compare with Obsidian, Typora and Mubu](docs/manual/compare.md)** — honest capability comparison, trade-offs, and when not to choose Morz.
- **[The story](docs/manual/story.md)** — why Morz exists, in the author's own words.
- **[Getting started](docs/manual/index.md)** — from the first launch to a finished document, with real screenshots.
- **[Feature guide](docs/manual/features.md)** — every menu item, what problem it solves, and when to use it.

## Install

Morz is in **closed beta** — installers are not published here yet. Ask for a link at
<https://morz.app/> (the web app is open to everyone).

- **Desktop**: Windows, macOS (Apple Silicon / Intel) and Linux builds go out to beta testers.
  Installed builds update from **Help → Check for Updates** (mirror-first, GitHub fallback).
- **Web / iPad**: the PWA is served from the app subdomain; install it from the browser menu
  (iPad: Share → Add to Home Screen) to keep an offline copy.

## Plugins and themes

- Browse **Settings → Third-party plugins** for the plugin store, and
  **Settings → Appearance → Theme market** for themes.
- Plugin authors: see [PLUGIN-DEVELOPMENT.md](docs/PLUGIN-DEVELOPMENT.md),
  [PLUGIN-SDK.md](docs/PLUGIN-SDK.md) and the publishing spec
  [PUBLISHING.md](docs/PUBLISHING.md) — self-publishing needs no PR.
- Theme authors: see [THEME-DEVELOPMENT.md](docs/THEME-DEVELOPMENT.md) and
  [BLUE-TOPAZ.md](docs/BLUE-TOPAZ.md).

## Downloads and auto-updates

- Public releases will carry the NSIS installer, its minisign signature (`.exe.sig`) and `latest.json`.
- The updater checks a China-friendly mirror first and falls back to GitHub. Installer signatures
  are verified with minisign; a mirror cannot inject code.
- The portable `.exe` cannot auto-update; use the installer for in-app updates.

## Links

- [Plugin development](docs/PLUGIN-DEVELOPMENT.md)
- [Plugin SDK](docs/PLUGIN-SDK.md)
- [Theme development](docs/THEME-DEVELOPMENT.md)
- [User manual](docs/manual/index.md)
- [Feature guide](docs/manual/features.md)
- [Desktop guide](docs/DESKTOP.md)
- [Third-party notices](THIRD-PARTY-NOTICES.md)
- [Registry](registry/README.md)

## License

- **This repository** — docs, registry and example plugins — is **MIT licensed** ([LICENSE](LICENSE)).
  Code examples in the docs are MIT too; copy them freely.
- **The Morz application** is free to install and use, including for commercial work. It is not
  open source; please don't redistribute it or publish it under another name.
- **The name and logo** are not covered by MIT — they identify the official project.
- **Provided as is**, without warranty. Keep backups of your notes.
- **Third-party components** keep their own licenses ([THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)).

Morz is an independent project by Cuman, not affiliated with Typora or Obsidian.
