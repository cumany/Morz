# Contributing

This repository is for **public docs** and the **plugin/theme registry**. Source code is private.

## Publishing a plugin or theme

Community plugins and themes **self-publish** — no PR needed:

1. Put `manifest.json` + the entry file at your repository root.
2. Tag a release (`v1.0.0`, matching `manifest.version`).
3. Add the topic `morz-plugin` (or `morz-theme`) to your repository.

The official scanner lists your repository in the community index within a day, and
install-time checksums (sha256) are generated automatically. The full spec — manifest
fields, review rules, permission vocabulary — is in **[docs/PUBLISHING.md](docs/PUBLISHING.md)**.

## Adding an entry to the official (featured) index

Exceptional plugins may be hand-picked into the official registry:

1. Fork this repository.
2. Add one entry to `registry/index.json` (`plugins` or `themes` array); `trust` must be
   `community` in PRs — `official`/`verified` are set by maintainers after code review.
3. Run `node registry/validate.mjs` locally (no dependencies).
4. Open a PR. CI runs the same validator; a maintainer reviews the code before merge.

Rules:

- `id` must be unique across plugins and themes; `repo` must be `owner/repo`.
- `version` must be semver. Include a `tag` (recommended) or `commit` so installs are pinned.
- Keep the JSON sorted by `id` to reduce merge conflicts.
- Do not add binaries or source trees; the registry points at your GitHub repository.

Example:

```json
{
  "id": "my-plugin",
  "name": "My plugin",
  "description": "What it does in one sentence.",
  "author": "your-name",
  "repo": "your-name/my-plugin",
  "version": "1.0.0",
  "tag": "v1.0.0",
  "trust": "community"
}
```

## Licensing of contributions

This repository is MIT licensed. By opening a pull request you agree that your
contribution is licensed under the same terms (inbound = outbound); no CLA is required.
Entries in `registry/index.json` only *point at* your repository — the plugin or theme
itself stays under your own license, and you keep its copyright.

## Reporting problems

- Plugin or theme misbehaving? Report it from **Settings → Third-party plugins** (entry row)
  or open an issue at <https://github.com/cumany/Morz/issues> with the plugin id and version.
- General support: <support@morz.app>.
- Security concerns about a community plugin: email <security@morz.app> instead of a
  public issue, so it can be denylisted before public discussion.

## Docs changes

- Public docs live in `docs/`; internal docs are not in this repository.
- Keep screenshots under `docs/screenshots/` and use relative links.
- For API changes, update `docs/PLUGIN-SDK.md` and `docs/PLUGIN-DEVELOPMENT.md` together.
