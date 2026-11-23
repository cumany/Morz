# Third-party notices

The Morz application is licensed, not sold: free to use, including commercially, but not open
source and not for redistribution. The contents of this repository — docs, registry and example
plugins — are [MIT licensed](LICENSE).
The components below remain under their own licenses; nothing in the Morz licence restricts
the rights those licences grant you.

The built application bundles the packages below. Each entry lists the license declared by the
package itself; the full license text ships with the package in `node_modules/<name>/LICENSE`.

## Runtime dependencies

| Package | Version | License |
|---|---|---|
| @codemirror/autocomplete, commands, lang-markdown, lang-yaml, language, language-data, search, state, view | 6.x | MIT |
| @lezer/common, highlight, markdown | 1.x | MIT |
| @mathjax/src | 4.1.3 | Apache-2.0 |
| @mathjax/mathjax-newcm-font | 4.1.3 | Apache-2.0 (font data: SIL OFL 1.1, see below) |
| @tauri-apps/api, @tauri-apps/plugin-opener | 2.x | MIT OR Apache-2.0 |
| docx | 9.15.1 | MIT |
| dompurify | 3.4.17 | MPL-2.0 OR Apache-2.0 (used under Apache-2.0) |
| html-to-image | 1.11.13 | MIT |
| jszip | 3.10.2 | MIT OR GPL-3.0-or-later (used under MIT) |
| lucide | 1.64.0 | ISC |
| markdown-it, markdown-it-emoji, -footnote, -mark, -sub, -sup | 15.x / 3.x / 4.x / 2.x | MIT |
| markdown-it-task-lists | 2.1.1 | ISC |
| mermaid | 12.2.0 | MIT |
| moment | 2.31.0 | MIT |
| pele | 1.13.0 | MIT |
| turndown, turndown-plugin-gfm | 7.2.4 / 1.0.2 | MIT |
| yaml | 2.9.1 | ISC |

Mermaid bundles its own dependencies (d3, dagre, cytoscape and others), all MIT-licensed; CodeMirror
bundles its Lezer parser runtime under MIT.

## MathJax fonts — SIL Open Font License 1.1

The `@mathjax/mathjax-newcm-font` package contains the New Computer Modern fonts. The font files are
licensed under the **SIL Open Font License, Version 1.1**, while the surrounding JavaScript is
Apache-2.0. The OFL permits bundling and redistribution with a document or application, provided the
font is not sold on its own and modified versions keep the reserved font names. The full OFL text is
included with the font package and at <https://openfontlicense.org>.

## ISC-licensed components

Lucide (icon paths), `yaml`, and `markdown-it-task-lists` are distributed under the ISC license:

> Permission to use, copy, modify, and/or distribute this software for any purpose with or without
> fee is hereby granted, provided that the above copyright notice and this permission notice appear
> in all copies.
>
> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
> SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
> AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
> WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
> NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
> OF THIS SOFTWARE.

## Themes and icons

The built-in themes (Fjord, Paper & Ink, Index, Broadsheet, Night, Graphite, Terminal) are original
designs created for Morz. They follow the CSS variable convention popularised by Typora
(`--bg-color`, `--text-color`, `--primary-color`, …) so that existing themes can be imported, but no
Typora theme files are included. The chrome icons are drawn for Morz; a few panel icons follow
Lucide's ISC-licensed geometry.

The Blue Topaz theme is distributed separately as an official market theme
([cumany/morz-bluetopaz](https://github.com/cumany/morz-bluetopaz)); its repository carries
the full MIT license and upstream attribution (Blue Topaz by whyt-byte, PKMer community).

## Trademarks

Morz is an independent project. Typora and Obsidian are trademarks of their respective owners;
references to them describe file-format or theme-format compatibility only and do not imply
affiliation or endorsement.
