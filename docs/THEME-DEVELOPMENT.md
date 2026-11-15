# 主题开发

Morz 的主题是一个 **CSS 文件**：用 `:root` 里的变量定色板，
用 `#write` 下的元素选择器定排版。内置主题、外置主题和导入主题走同一套机制，
现有的大多数平铺 CSS 主题（含 Obsidian/Typora 风格的平铺 CSS）改几行就能用。

本文面向**第三方主题作者**：写 CSS、放进主题文件夹、发布到市场。

## 1. 一个最小可用的主题

```css
/* My Theme — one line about the look. */
:root {
  --bg-color: #fbf9f4;
  --text-color: #1a1a1a;
  --side-bar-bg-color: #f4f0e6;
  --control-text-color: #55504a;
  --item-hover-bg-color: rgba(60, 45, 25, 0.06);
  --active-file-bg-color: rgba(165, 63, 43, 0.1);
  --primary-color: #a53f2b;
  --select-text-bg-color: #e8d9c8;
  --window-border: 1px solid #e4ddd0;
  --text-font: "Source Han Serif SC", Georgia, "Songti SC", serif;
  --monospace: "JetBrains Mono", Consolas, monospace;
}

#write {
  font-family: var(--text-font);
  font-size: 16px;
  line-height: 1.75;
  max-width: 720px;
  padding: 48px 56px;
}

#write h1 { font-size: 1.9em; font-weight: 600; margin: 1.6em 0 0.6em; }
#write h2 { font-size: 1.45em; font-weight: 600; margin: 1.4em 0 0.5em; }
#write p { margin: 0 0 1em; }
#write a { color: var(--primary-color); text-decoration: none; border-bottom: 1px solid color-mix(in srgb, var(--primary-color) 35%, transparent); }
#write blockquote { margin: 1em 0; padding: 0.2em 0 0.2em 1em; border-left: 3px solid var(--primary-color); color: color-mix(in srgb, var(--text-color) 78%, transparent); }
#write code { font-family: var(--monospace); font-size: 0.9em; background: color-mix(in srgb, var(--text-color) 7%, transparent); border-radius: 4px; padding: 0.1em 0.35em; }
```

## 2. 放到哪里：主题文件夹

桌面版默认使用 `<appDataDir>/themes`，不需要先选目录；设置 → 外观里可以直接
"打开""刷新""恢复默认"。网页版没有稳定的 appData 路径，通过 File System Access
目录授权，或继续使用导入（命令 `theme.import`；桌面版会复制到主题文件夹，
没有可写目录时回退到浏览器 IndexedDB）。文件不复制进数据库，改完点"刷新"即生效。

推荐的新格式：

```text
themes/
  Blue Topaz/
    manifest.json
    theme.css          # 亮色/基础
    theme-dark.css     # 暗色变体，可选
    export.css         # 只用于导出/打印，可选
    assets/...
```

```json
{
  "id": "blue-topaz",
  "name": "Blue Topaz",
  "version": "1.0.0",
  "author": "…",
  "modes": ["light", "dark"],
  "dark": "theme-dark.css",
  "export": "export.css"
}
```

manifest 可选字段：`id` / `name` / `nameEn` / `version` / `author` / `description` /
`repo` / `homepage` / `preview` / `changelog` 是通用字段；
**Morz 扩展字段**：`modes`（支持的模式）、`dark` / `light`（互补变体文件）、
`export`（导出专用 CSS）、`base`（从哪个内置主题复制而来，用于"已修改/恢复默认"）。
不识别这些字段的其他编辑器会忽略它们。

### 主题 id 机制（重要）

- 有 `manifest.id` 时主题 id 是 `theme:<id>`；没有时按路径生成 `folder:<slug>-<hash>`。
- **id 是用户偏好的锚点**：应用偏好里存的是主题 id。文件夹改名会改变 `folder:` id，
  用户的主题偏好就会失联（静默回退默认主题）——发布主题**务必写 `manifest.id`**。
- 市场安装/更新按固定文件夹名覆盖写入，就是为了保持 id 稳定。

### 兼容平铺 CSS 的目录格式

| 目录结构 | 识别方式 |
|---|---|
| `我的主题.css` | 每个 `.css` 一个主题 |
| `github.css` + `github-dark.css` | 自动配成同一主题的亮/暗变体，不再单独显示 `-dark` |
| `paper.css` + `paper.dark.css` | 同上，也认 `.dark.css` |
| `Blue-Topaz/theme.css` + `theme-dark.css` | 文件夹主题 |
| `Blue-Topaz/obsidian.css` | 旧版文件夹主题（没有 `theme.css` 时使用） |
| `themes/主题名/theme.css` | 指向 `.obsidian` 时自动多读一层 `themes/` |

扫描规则：

- 根目录有 `theme.css` / `obsidian.css` 时整个根目录是一个主题；否则根目录的 CSS 按
  文件名分组，`-dark` / `.dark` 自动配对。
- 子目录优先找 `theme.css`、`obsidian.css`、`<目录名>.css`；没有就跳过，
  `Snippets/`、`img/` 不会误报。
- 单文件主题如果 CSS 里有 `.theme-dark` / `.theme-light`，按双模式处理。
- 相对 `@import` 递归展开（深度 ≤4），相对 `url(...)` 的字体/图片内联成 data URL；单个资源上限 12 MB。

外观页按真实 CSS 级联读取 `--bg-color` / `--text-color` / `--primary-color`
（也认 `--background-primary` / `--text-normal` / `--interactive-accent`）画主题卡的色点；
有 `preview` 预览图时市场优先显示图片。

## 3. 变量参考

### 核心变量（写这些就能换肤全应用）

| 变量 | 用在哪 | 没写时 |
|---|---|---|
| `--bg-color` | 编辑区、弹窗背景 | 白 |
| `--text-color` | 正文、按钮文字 | `#333` |
| `--side-bar-bg-color` | 侧栏、面板、输入框底 | 白 |
| `--control-text-color` | 次要文字、侧栏条目 | `#666` |
| `--item-hover-bg-color` | 悬停底色 | 5% 黑 |
| `--active-file-bg-color` | 选中条目 | 8% 黑 |
| `--primary-color` | 强调色：链接、选中、开关 | `#4183c4` |
| `--select-text-bg-color` | 文本选区 | 浏览器默认 |
| `--window-border` | 分栏细线、输入框描边 | 1px 浅灰 |
| `--text-font` | 正文/导出字体 | 系统 UI 字体 |
| `--write-font` | 实时编辑正文；未设置时继承 body | `--text-font` |
| `--monospace` | 代码、YAML、行内代码 | 系统等宽 |
| `--ui-font` | 侧栏、标题栏、设置等应用界面 | 系统 UI 字体 |
| `--write-font-size` | 正文/导出的字号 | 16px |
| `--write-line-height` | 正文行高；设置里选 0 时跟随主题 | 1.6 |

**工作原理**：应用界面（标题栏/侧栏/菜单/弹窗）不直接读上面这些名字，而是读一组
派生变量 `--ui-bg / --ui-text / --ui-strong / --ui-panel / --ui-hover / --ui-active /
--ui-accent / --ui-border`——它们全部回落到核心变量（`var(--bg-color, #fff)` 等）。
所以**改核心变量 = 整个应用换肤**；派生变量只在你想单独控制界面层时才需要覆盖。

### 正文层扩展变量（都带默认值，按需覆盖）

| 变量 | 影响 |
|---|---|
| `--link-color` | 链接色（区别于强调色） |
| `--inline-code-bg` / `--inline-code-color` | 行内代码 |
| `--code-block-bg` / `--code-block-border` | 代码块背景/描边 |
| `--blockquote-border` / `--blockquote-color` | 引用条与文字 |
| `--table-border-color` / `--table-header-bg` / `--table-stripe-bg` | 表格线/表头/斑马纹 |
| `--hr-color` | 分隔线 |
| `--mark-bg-color` | `==高亮==` |
| `--kbd-bg` / `--kbd-border` | 按键样式 |
| `--meta-content-color` / `--meta-block-bg` | YAML 属性区 |
| `--footnote-color` | 脚注 |
| `--task-done-color` / `--caret-color` | 已勾任务 / 光标 |
| `--tag-color` | 正文 `#标签` 药丸 |
| `--image-radius` / `--gallery-columns` / `--gallery-gap` | 图片圆角 / 画廊 |
| `--print-bg` | 打印背景 |
| `--write-max-width` | 正文最大宽度（设置里未覆盖时） |

设置 → 外观 → 字体可以让用户分别覆盖正文、代码和界面字体；覆盖值以 `<html>` 的内联变量生效，
选「跟随主题」时移除覆盖。行高设为 0 时不再写内联变量，主题的 `--write-line-height` 才会生效。
主题应始终为这些变量提供合理的 fallback。

## 4. 亮色 / 暗色变体

- 浅色主题补 `theme-dark.css`（或 manifest `dark` 字段），暗色主题补亮色变体；
  变体 CSS 直接覆盖变量和少量硬编码颜色。同一主题身份在两种模式下保持字体、排版和强调色，只换色板。
- 只有单一模式的第三方主题，切换到缺失模式时会静默回退到该模式的默认主题
  （亮色 墨与纸 / 暗色 夜色），不弹提示。
- 应用会给 `<html>` 和 `<body>` 加 `theme-dark` / `theme-light` class，并设置
  `data-appearance="dark|light"`；兼容文件夹主题里常见的 `body.theme-dark` 写法。
- 导出 HTML / PDF 会带上当前模式的变体 CSS。

## 5. 实时预览：编辑区是怎么被主题化的

编辑区不是渲染后的 HTML，而是 CodeMirror 的行。为了让平铺 CSS 主题直接可用，
主题 CSS 会经过一次**选择器映射**再注入：

| 主题里写的 | 实际命中的 |
|---|---|
| `#write h1` … `#write h6` | `.md-live .md-h1` … `.md-h6` |
| `#write p` | `.md-live .md-p` |
| `#write blockquote` | `.md-live .md-quote` |
| `#write pre` / `.CodeMirror` | `.md-live .md-fences` |
| `#write code` | `.md-live .md-code` |
| `#write a` | `.md-live .md-link` |
| `#write strong/em/del/mark/u/sup/sub/kbd` | 对应的 `.md-strong` / `.md-em` / `.md-del` / `.md-mark` / `.md-u` / `.md-sup` / `.md-sub` / `.md-kbd` |
| `#write li` | `.md-live .md-li` |
| `#write table` | `.md-live .md-table` |
| `#write hr` | `.md-hr-widget` |
| `#typora-sidebar` | `#sidebar` |

Callout（`> [!note]` 等 15 种）：行 class 是 `.md-alert`，
变体 `.md-alert-note` … `.md-alert-caution`（note/abstract/info/todo/tip/success/question/
warning/failure/danger/bug/example/quote/important/caution），标题文字 `.md-alert-text`。

会被丢弃的属性：`display`、`position`、`float`、`width`/`max-width`/`min-width`、
`height`/`max-height`、`overflow*`、`white-space`、`break-*`。这些交给编辑器自己控制，
主题不该决定布局。行距、颜色、字号、边框、背景、字体都会保留。

标题和段落的 `margin` 会被换成行内 `padding`——CodeMirror 的每一行是独立元素，
外边距会把行高算错。

如果主题要单独控制**实时预览的段落间距**，直接写实时行选择器：

```css
/* 实时预览：上下留白。写了这一侧，适配器就不再从 #write p 的 margin 生成同名规则 */
.md-live #write .cm-line.md-p { padding-top: 0.5em; padding-bottom: 0.5em; }

/* 导出/打印仍然用真实 <p> */
#write p { margin: 0 0 1em; }
```

只给 `.cm-line.md-p` 设颜色、字体等属性不受影响：适配器按方向检查
`padding-top` / `padding-bottom`，没显式设置的那一侧照常映射 `margin`。

**特异性**：从主题文件夹读取的**外部**主题，行级选择器（`.md-h1…`、`.md-p`、`.md-quote`、
`.md-fences`、`.md-li`、`.md-alert*`）会自动补上 `.cm-line`（变成 `.md-live .cm-line.md-h1`），
以匹配内置编辑器规则的特异性；手动导入主题保持原来的低特异性映射。

**代码语法高亮**：编辑器内的代码着色用 CodeMirror 的 token class
（`.cm-keyword` / `.cm-string` / `.cm-comment` / `.cm-number` / `.cm-def` / `.cm-variable` /
`.cm-property` / `.cm-operator` / `.cm-meta` / `.cm-tag` / `.cm-attribute` / `.cm-heading` /
`.cm-link` / `.cm-url`…）。想给代码块上色就针对这些类写规则，或直接引用一个
CodeMirror 官方主题的对应段落。

## 6. Obsidian 主题兼容桥接

主题文件夹里的文件夹主题会额外经过一层桥接，不会"加载成功但完全没有样式"：

- **变量**：在主题之前注入一组合成变量，例如 `--bg-color: var(--background-primary)`、
  `--text-color: var(--text-normal)`、`--primary-color: var(--interactive-accent)`、
  `--text-font` / `--monospace` / `--write-line-height` 对应
  `--font-text` / `--font-monospace` / `--line-height-normal`。主题自己定义的 Morz
  变量仍然优先。
- **选择器**：去掉 `.markdown-preview-view`、`.markdown-rendered`、`.cm-s-obsidian`、
  `.cm-content`、`.is-live-preview` 等预览容器，映射 `.HyperMD-header-1` /
  `.cm-header-1`、`.HyperMD-quote`、`.HyperMD-codeblock`、`.cm-inline-code`、
  `.internal-link`、`.cm-tag`、`.callout[data-callout]` 等类。
- **明暗**：`.theme-dark` / `.theme-light` 变量按当前模式取值。
- 原主题专属的工作区布局、Dataview、插件 UI 不会被模拟。主题的文字、颜色、标题、
  引用、代码、表格和 callout 会尽量保留。

## 7. Style Settings（主题可选配置面板）

主题可以在 CSS 里写 `/* @settings */` 注释声明可调项；用户在主题卡片的 ⚙ 下钻页里
调整，实时生效、可搜索、可重置。支持的类型：

| 类型 | 行为 |
|---|---|
| `heading` | 分组标题 |
| `info-box` | 说明文字块 |
| `variable-color` | 颜色选择器，写 body 内联变量 |
| `variable-themed-color` | 带 `format: "light-dark"` 的明暗双色 |
| `variable-number` / `variable-number-slider` | 数字 / 滑杆，写 body 内联变量 |
| `variable-text` | 文本，写 body 内联变量 |
| `class-select` | 下拉单选，把选中 `value` 作为 **body class** |
| `class-toggle` | 开关；item 的 id 就是 class 名，开 = 加 class |

class 型写 body class、变量型写 body 内联 CSS 变量，主题 CSS 里直接消费即可。
完整示例见 [`BLUE-TOPAZ.md`](./BLUE-TOPAZ.md)（Style Settings 兼容层的真实用例）。

## 8. 导出态与编辑态的差异

导出 HTML / PDF 用的是**未经映射的原始主题 CSS**——`#write p` 里的
`margin` 在导出里原样生效。所以：

- `#write` 规则同时服务导出排版；实时预览的间距细节单独写在 `.cm-line.md-*` 上。
- `export.css`（manifest `export` 字段）只在导出/打印时追加。
- 已知差异：正文 `#标签` 的描边/底色规则在导出 HTML 中可能挂不上
  （标签需要包 `.md-tag`）——发布前用导出预览自查一遍标签样式。

## 9. 发布到市场

主题市场与插件市场共用本仓库的 `registry/index.json`（`themes` 数组）。发布流程：

1. 把主题（`theme.css` + `manifest.json` + 预览图）推到一个公开 GitHub 仓库，打 release tag。
2. 提 PR，在 `registry/index.json` 的 `themes` 数组加一条。
3. PR 会经过 `registry/validate.mjs` 按 `registry/schema.json` 校验（字段、URL、sha256 格式）。
4. 合并后客户端自动从索引发现主题；更新时对比 `version`，下载到固定文件夹名覆盖安装。

索引条目字段：

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` / `name` / `description` / `author` / `repo` / `version` | ✅ | `repo` 是 `owner/repo`；`id` 会成为主题 id 的 `theme:<id>` |
| `nameEn` / `homepage` / `changelog` / `screenshots` | | 展示信息 |
| `tag` / `commit` | | 版本固定（推荐 tag，与插件同规则） |
| `theme` / `manifest` | | 文件路径，默认 `theme.css` / `manifest.json` |
| `preview` | | 预览图，**512×288（16:9）**，仓库相对路径或 HTTPS；不要只给三个色值 |
| `modes` | | `["light", "dark"]` |
| `sha256` | | `{ "theme": "…", "manifest": "…" }`，校验下载完整性 |
| `minAppVersion` | | 最低应用版本 |
| `trust` | | PR 里必须是 `community`；`official` / `verified` 由维护者设置 |

## 10. 验收清单

- 正文、标题、列表、任务、引用、表格、代码块、行内代码、链接、脚注、公式、Mermaid 图
- YAML 属性卡（键名、值块、标签药丸）
- 正文 `#标签`、搜索高亮、选区、光标
- Callout 15 种（至少查 note / warning / tip）
- 侧栏、右栏、标题栏、状态栏、弹窗（设置、命令面板、确认框）
- 亮/暗两套外观（设置里的「深色模式」）
- 导出 HTML / PDF（排版间距、标签样式）
- 窄屏（≤700px）与触屏（格式栏）
- 对比度：正文 ≥ 4.5:1，标签 ≥ 3:1，链接在正文背景上可读

## 11. 命名

主题用「风格名」，不用编辑器名或作者名：`paper`（墨与纸）、`cards`（索引卡）、
`terminal`（终端）。导入主题保留用户文件里的名字，冲突时以 id 区分。
