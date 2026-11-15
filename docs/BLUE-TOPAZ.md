# Blue Topaz for Morz

Morz's **蓝托帕石 / Blue Topaz** theme is a curated adaptation of
[Blue Topaz](https://github.com/PKM-er/Blue-Topaz_Obsidian-css), the upstream theme by
whyt-byte and the PKMer community. The upstream theme is MIT-licensed; attribution and the
license text are in [THIRD-PARTY-NOTICES.md](../THIRD-PARTY-NOTICES.md).

This is not the full 1.3 MB upstream stylesheet. It keeps Blue Topaz's visual signature —
topaz blue, the blue heading ladder (green → cyan → blue → violet in dark mode), tinted
quotes, rounded code/table cards — and leaves app-specific UI (workspace panes, Style
Settings, callout variants) out.

## Use

蓝托帕石以**市场主题**发布（仓库 [cumany/morz-bluetopaz](https://github.com/cumany/morz-bluetopaz)）：
**Settings → 外观 → 主题市场** → 选择 **蓝托帕石** → 安装。浅色/深色变体随 Dark mode 偏好自动切换，
导出精修样式（HTML/PDF 页码排版）随安装一并就位，无需额外插件。

In the dark variant the writing surface uses `--bt-bg: rgba(21, 21, 21, 0.85)` over the `#151515`
base, which matches the sidebar and leaves room for transparency; code blocks step down to
`#101010` to keep their edge.

You can also point Settings → 外观 → **主题文件夹** at a Blue Topaz checkout (the folder with
`theme.css` + `manifest.json`). It is then loaded as an external folder theme through the
compatibility bridge. The marketplace version is the curated one: it also styles Morz's own
chrome, callouts and checkboxes; the raw upstream stylesheet is the full Obsidian variant.

## Customise

Settings → **自定义 CSS** accepts normal CSS. The theme exposes a stable set of `--bt-*`
variables; overriding them at `:root` updates the editor, chrome and exported documents.

Settings → **外观** → the **⚙** badge on the Blue Topaz card opens a Style Settings-compatible
page (see [Theme settings](#theme-settings)): it ships with the community **color palettes** —
Default · 蓝宝, Simplicity 极简 (@Cuman), Avocado 牛油果, Honey milk 蜂蜜牛奶,
榛子巧克力 Hazelnut chocolate, Autumn 秋 (from Topaz Community contributors) — applied as
`--bt-*` overrides in both modes. Each palette has a dark variant derived from its accent
(surface, sidebar, borders, text and the heading ladder), so switching palettes is visible
under dark mode too; Default keeps Blue Topaz's original dark palette.

| Variable | What it controls |
|---|---|
| `--bt-accent` | main topaz accent (links, quote edge, lists, tags) |
| `--bt-accent-strong` | link/text accent |
| `--bt-accent-soft` / `--bt-accent-softer` | selected/hover washes |
| `--bt-bg` / `--bt-bg-soft` | page and soft surface |
| `--bt-sidebar` | title bar / sidebar / status bar |
| `--bt-text` / `--bt-muted` / `--bt-border` | text and hairlines |
| `--bt-h1` … `--bt-h6` | heading ladder |
| `--bt-code-bg` / `--bt-code-border` / `--bt-code-text` | fenced code |
| `--bt-inline-bg` / `--bt-inline-color` | inline code |
| `--bt-quote-bg` / `--bt-quote-text` | blockquotes |
| `--bt-table-head` / `--bt-table-stripe` | tables |
| `--bt-mark` / `--bt-selection` | mark and text selection |
| `--bt-radius` / `--bt-shadow` | card radius / code-block shadow |
| `--bt-font` / `--bt-ui-font` / `--bt-mono` | body / interface / code font stacks |
| `--bt-line-height` / `--bt-heading-line-height` | body and heading line height |
| `--bt-page-bg` / `--bt-page-bg-image` / `--bt-page-overlay` | writing-surface colour, background image and readability veil |
| `--bt-sidebar-image` | optional sidebar background image |
| `--bt-alert-<type>` | callout accent (note, tip, warning, danger, …) |
| `--bt-alert-tint` | callout body tint strength (default `7%`) |
| `--bt-checkbox-radius` | task checkbox corner radius |

The theme follows Blue Topaz's own stacks: Bookerly → Inter → Segoe UI → 霞鹜文楷 /
LXGW WenKai → PingFang SC / Microsoft YaHei. If the first font isn't installed the next one
is used, so no font files are bundled. Settings → 外观 → 字体 can override any of them; the
line-height setting **0 = follow the theme**.

## Fonts and rhythm

The light variant sets an airy 1.82 body line height with tighter headings (1.32) and
1.5-line code. The interface uses Inter/Segoe UI while code uses JetBrains Mono/Consolas.

## Background

The writing surface has two independent layers: a solid colour and an image/gradient with
a readability veil. The default is a very light topaz radial wash. To use a photo:

```css
:root {
  --bt-page-bg-image: url("https://example.com/paper.jpg"); /* or a data: URL */
  --bt-page-overlay: rgba(255, 255, 255, 0.86);
}
[data-appearance="dark"] {
  --bt-page-overlay: rgba(24, 27, 33, 0.9);
}
```

The same layers are emitted in exported HTML/PDF. If the image lives on disk, inline it as a
`data:` URL (or use a URL reachable from the app); relative `url()` paths resolve against the
app, not the document.

## Theme settings

Morz understands the Obsidian **Style Settings** declaration format (`/* @settings … */`
comment blocks). Themes that declare them get a **⚙** badge on their card in Settings → 外观;
the badge number is the count of settings you have changed (the tooltip shows the total).
Clicking it switches to that theme (if needed) and opens a dedicated settings page. A live
preview at the top mirrors the current file-list row, callout and tag styles while you change
them, so the settings dialog does not need to be closed to judge the result. It renders
colour palettes (`class-select`), toggles (`class-toggle`), colors (`variable-color` /
`variable-themed-color`, light and dark), number fields and sliders (`variable-number(-slider)`
with units), text / multi-line / file-path fields — grouped by their `heading` entries, with
search for long themes. Values persist per theme, apply live to the editor and chrome, and
"恢复主题默认" clears them.

The built-in curated theme exposes only settings that map to Morz's own DOM:

- **Background** — a CSS-only effect on the writing surface: default topaz wash, soft paper
  texture (repeating radial blotches inspired by the Index Card theme), dots, grid, accent
  gradient, plain colour, or **Waves** (one smooth, seamlessly tiled SVG silhouette filled with a
  faint blue→teal gradient that fades toward the crest and drifts slowly). Waves are global to the
  app body—the left sidebar, right panel, writing area and status bar become transparent to reveal
  the same bottom wave—rather than a note-only decoration; the light variant is paler, the dark
  variant slightly deeper. A **Wave animation** toggle, shown only while Waves is selected,
  disables the slow mask drift; its help text and a note at the top of the theme page explain when
  the system's Reduce Motion preference keeps the wave static. In dark
  mode the pattern's cell surface is fixed to the sidebar colour and the grid/dot ink is a darker
  black, so the inside of each cell matches the sidebar and the lines stay subtle. Pattern ink
  stays faint (8% text colour in light mode, 30% black in dark mode), and the effect is layered
  above the readability veil; no image uploads, no glass panes, and it does not affect export.
- **File list** — current-file style (tinted fill / bold only / left rule), row corners
  (square / rounded / pill), card-style rows, and file-type icons. The icon setting adds a
  kind-specific glyph (note / image / PDF / audio / video / code / data / archive / file) in
  the fixed 15px slot; with it off, only images and PDFs keep their icons as before. `data-file-kind`
  drives the icon colour. The tree still lists Markdown, images and PDFs only; other types
  remain hidden by the workspace filter.
- **Folders** — colorful folders with a stable per-name tone, border (left tone bar) or
  tab-liked (tinted block) colouring, folder icon style (folder / collapse chevron / none),
  optional collapse chevron and a right-aligned coloured folder dot. Tab-liked blocks are
  inset 2px top/bottom inside the fixed 27px row, so adjacent folder blocks keep a visible
  gap without changing the virtual list geometry.
- **Lists** — colorful unordered bullets and ordered numbers, tinted by nesting depth.
- **Headings** — optional H1/H2 badges before headings and an underline on H1/H2.
- **Chinese typography** — first-line indent for body paragraphs (lists, quotes and callouts
  stay flush).
- **Divider** — solid, dashed, dotted, thick or gradient rules.
- **Callouts** — default tinted card, traditional flat body, or border style; background tint
  and corner radius apply to all three. All 15 callout types keep their own accent.
- **Quotes** — soft tint (default), hairline frame, gradient left rule, top/bottom
  bracket, or a large quotation mark. Callouts are excluded, so their own card style is untouched.
- **Checkbox** — square (Topaz default) or round.
- **Tags** — filled, outlined, or clear (no background).

When **Use the current theme for HTML and PDF** is enabled, exports carry the same theme
settings: paragraph first-line indent, H1/H2 badges and underline, divider style, round
checkboxes, colorful list markers, quote style, callout style/tint/radius, and the selected colour palette.
These rules live in `blue-topaz-export.css` and target the exported HTML (`#write > p`,
`h1/h2`, `hr`, `blockquote.md-alert`) instead of editor line DOM, so print output can differ
where the structure differs. Folder colours are editor-only (the file tree is not exported),
and tags currently export as plain text rather than pills. If the export option is off, HTML/PDF
use the default Paper theme and none of these settings apply.

Deliberately **not** ported: workspace/leaf/canvas backgrounds, sticky folder scroll,
full-width callouts, stacked tabs, command-palette images and styles for other Obsidian
plugins. They depend on DOM that Morz does not have (or conflict with Morz's own layout
settings). Interface-wide background images and glass panes are a separate layout feature
(they affect export and readability), not part of this visual batch. The **Background** setting
above is a CSS texture on the writing surface, not a workspace image. Importing the full
upstream stylesheet still renders a settings panel, but those selectors will not affect Morz
chrome; the curated theme is the one that does.

Any imported Obsidian theme gets this automatically: the full upstream Blue Topaz `theme.css`
(588 declared items) renders as a usable panel, with its community palettes, background images
and code themes reachable without the Style Settings plugin. Theme CSS declares them like:

```css
/* @settings
name: My theme
id: my-theme
settings:
  -
    id: my-palette
    title: Color palette
    type: class-select
    default: my-palette-default
    options:
      -
        label: Default
        value: my-palette-default
      -
        label: Sea
        value: my-palette-sea
*/
body.my-palette-sea { --my-accent: #2a7f9e; }
```

`class-select`/`class-toggle` values become classes on `document.body`; `variable-*` values
become `--<id>` inline variables on the body, so plain CSS rules consume them.

## Coloured callouts

All 15 callout types have their own accent and the matching Lucide outline icon. The icon uses
`currentColor`, so it follows the type accent automatically. Types share one tinted card rule, so
changing a single token retints that type:

```css
:root {
  --bt-alert-note: #e91e63;
  --bt-alert-tip: #00897b;
  --bt-alert-tint: 9%;
}
```

To retint a type without touching the shared token:

```css
#write .cm-line.md-alert-note {
  --bt-alert-color: #e91e63;
}
```

The title label reads `--md-alert-color`; the theme maps each `--bt-alert-*` onto it.

Example — a rose Topaz with rounder cards:

```css
:root {
  --bt-accent: #e91e63;
  --bt-accent-strong: #c2185b;
  --bt-accent-soft: rgba(233, 30, 99, 0.12);
  --bt-accent-softer: rgba(233, 30, 99, 0.06);
  --bt-h1: #6d28d9;
  --bt-radius: 12px;
}

[data-appearance="dark"] {
  --bt-accent: #f06292;
  --bt-accent-strong: #f48fb1;
  --bt-accent-soft: rgba(240, 98, 146, 0.16);
  --bt-accent-softer: rgba(240, 98, 146, 0.08);
  --bt-h1: #c4b5fd;
}
```

The live editor rules use `var(--bt-*)` at a specificity that survives the theme adapter,
so the overrides apply without reloading. Exported HTML/PDF includes the same overrides.

If you want a completely different theme instead of a variation, import a CSS file from the
command palette (**导入主题… / Import Theme…**, command `theme.import`). The theme format is
documented in [THEME-DEVELOPMENT.md](THEME-DEVELOPMENT.md).

## Attribution

Partial style(s) is(are) sourced or adapted from Blue Topaz
(https://github.com/PKM-er/Blue-Topaz_Obsidian-css), and I would like to express my
appreciation to WhyI (https://github.com/whyt-byte) and pkmer.cn (https://pkmer.cn).
