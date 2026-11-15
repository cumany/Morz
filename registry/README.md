# Morz registry

This file is the **official (featured) index** of plugins and themes, hand-curated by the
maintainers. The app reads it directly (with a bundled fallback and China-friendly mirrors)
and installs files from each entry's GitHub repository.

Community plugins and themes **self-publish** instead: add the topic `morz-plugin` /
`morz-theme` + a root `manifest.json`, and the scanner in
[cumany/morz-registry](https://github.com/cumany/morz-registry) lists the repository in the
auto-generated community index within a day — no PR, no queue. Author-facing spec:
**[../docs/PUBLISHING.md](../docs/PUBLISHING.md)**.

## Fields

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique across plugins and themes; lowercase letters/digits/`.`/`_`/`-` |
| `name` | yes | Display name |
| `repo` | yes | `owner/repo` on GitHub |
| `version` | yes | Semver; update is offered only when this is newer than the installed version |
| `tag` / `commit` | one of | Pin installs to a release tag or commit (recommended: `tag`) |
| `description` / `author` | no | Shown in the market |
| `permissions` | no | `vault:read`, `vault:write`, `workspace`, `editor:insert`, `settings` |
| `sha256` | no | Optional file checksums (`manifest`, `main`, `styles`, or file paths) |
| `trust` | no | PRs must use `community`; `official`/`verified` are assigned by maintainers |
| `minAppVersion` | no | Minimum Morz version |
| `icon` | no | Plugins only. One image: repo-relative path, `https:` or `data:`. 128×128 recommended (market shows 24px) |
| `changelog` | no | Short release note; shown transiently when updating, never persisted |
| `preview` | no | Themes only. One 16:9 image, 512×288 recommended; repo-relative path or `https:` |

`tag`/`commit` are enforced by CI; entries without either are rejected.
`probe.json` next to this file is a tiny connectivity probe the client uses to rank sources.
Images live in the author's repository; do not upload binaries to the registry.

Themes use the same fields plus `theme` (CSS path, default `theme.css`), `manifest`, `preview`,
and `modes`.

## Updating

1. Bump `version` in the plugin/theme manifest and create a matching release tag.
2. Update the entry's `version` and `tag` (or `commit`) in `index.json`.
3. Run `node registry/validate.mjs`.

The client pins installs to the tag/commit; it never silently follows the default branch when a
fixed ref is present.
