# 插件开发

Morz 有两种插件：**原生 SDK 插件**（推荐）和通过 Obsidian 兼容层加载的旧插件（仅供迁移对照）。本文只讲前者。

先说清边界：**Obsidian 兼容层不是“免改造运行 Obsidian 插件”的兼容承诺**，也不是
Morz 的插件方向。它的用途是**迁移**——把已有 Obsidian 插件的功能拆出来，对照 SDK
重写成 Morz 插件；兼容层只提供一部分 `obsidian` API 的形状，方便旧代码先跑起来、
对照行为，并且已经冻结。新插件和准备长期维护的移植插件，都应该直接落在 Native SDK 上。

当前状态（如实）：兼容层覆盖命令、Ribbon、状态栏、设置、数据读写、代码块和
简单面板/视图等一部分常用 API；编辑器装饰、复杂工作区布局、Node/Electron 能力
不在保证范围内。内部回归基线是真实插件 9/11、移植样例 26/68——这不是兼容率承诺，只是
“哪些地方还能用来对照”的参考。迁移验收以用户可见功能为准，不以 `onload` 不报错为准。

完整的 API 表在 [`PLUGIN-SDK.md`](./PLUGIN-SDK.md)，这里讲怎么从零做一个能装、能调、
能发出去的插件。

## 插件长什么样

一个文件夹，两个文件：

```
my-plugin/
├── manifest.json
└── main.js
```

`manifest.json`：

```json
{
  "id": "reading-progress",
  "name": "阅读进度",
  "version": "1.0.0",
  "description": "在状态栏显示当前文档的字数与预计阅读时间",
  "author": "你的名字",
  "sdk": 1,
  "permissions": ["workspace", "settings"]
}
```

| 字段 | 说明 |
|---|---|
| `id` | 唯一 id，小写字母、数字、短横线。同一个 id 视为同一个插件 |
| `sdk` | 必须是 `1`，否则会被当成 Obsidian 兼容插件加载 |
| `main` | 入口文件名，默认 `main.js` |
| `permissions` | 需要的能力：`vault:read`、`vault:write`、`workspace`、`editor:insert`、`editor:highlight`、`editor:direct`、`views`、`settings`、`http`。不写等于全部放行，建议显式写 |

`main.js` 是 **CommonJS/IIFE** 脚本（不是 ES module，不能写 `import`），导出 `activate(ctx)`，
可选导出 `deactivate()`：

```js
module.exports = {
  async activate(ctx) {
    // 注册命令、面板、状态栏……
  },
  deactivate() {
    // 释放自己申请的定时器、事件、DOM
  },
};
```

## 从零写一个：阅读进度

`main.js`：

```js
module.exports = {
  async activate(ctx) {
    // 1) 设置：每个插件有独立的持久化空间
    const settings = { speed: 300, ...(await ctx.settings.get()) };

    // 2) 命令 + 快捷键
    ctx.ui.command({
      id: "reset-speed",
      name: "重置阅读速度",
      run: async () => {
        settings.speed = 300;
        await ctx.settings.set({ speed: 300 });
        ctx.ui.notice("阅读速度已重置为 300 字/分钟");
      },
    });

    // 3) 状态栏：text 是函数时，文档变化会自动重算
    ctx.ui.statusBar({
      text: () => {
        const text = ctx.active.text();
        if (!text.trim()) return "";
        const words = (text.match(/[\u4e00-\u9fa5]|[A-Za-z0-9]+/g) ?? []).length;
        const minutes = Math.max(1, Math.round(words / settings.speed));
        return `${words} 字 · 约 ${minutes} 分钟`;
      },
      title: "由「阅读进度」统计",
      onClick: () => ctx.ui.notice(`当前速度：${settings.speed} 字/分钟`),
    });

    // 4) 面板：按标签列出文档（meta.index 是现成的查询原语）
    ctx.ui.panel({
      id: "by-tag",
      name: "按标签浏览",
      icon: '<path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>',
      render: async () => {
        const wrap = document.createElement("div");
        wrap.style.padding = "8px";
        const files = await ctx.meta.index({ tag: "project" });
        if (!files.length) { wrap.textContent = "没有带 #project 标签的文档"; return wrap; }
        for (const file of files) {
          const button = document.createElement("button");
          button.textContent = file.basename;
          button.style.cssText = "display:block;width:100%;text-align:left;border:0;background:none;padding:6px;border-radius:4px;cursor:pointer;font:inherit;";
          button.addEventListener("click", () => ctx.openFile(file.path, { newTab: true }));
          wrap.append(button);
        }
        return wrap;
      },
    });
  },

  deactivate() {
    // ctx.ui.* 注册的东西由宿主统一回收；这里只处理自己额外申请的
  },
};
```

要点：

- `ctx.ui.statusBar({ text })` 传函数时，宿主在文档变化时重算；传字符串就只显示一次。
- `ctx.ui.panel.render()` 每次打开面板都会重新调用，不要在闭包里缓存上一次的 DOM。
- `ctx.openFile(path, { newTab })`：`newTab` 对应界面上的 Ctrl/Cmd+点击语义。
- `ctx.settings.get()/set()` 返回的是纯 JSON，按插件 id 隔离。
- 绝大多数插件用 `ctx.` 上的窄接口就够了；需要 CodeMirror 视图本体时走
  [`ctx.editor` 直控](#编辑器直控cm6)（v1.2，需 `editor:direct` 权限），但 `window.app`
  和宿主内部对象仍然拿不到、也不应该用。

## 安装与调试

- **桌面插件目录（客户端为主）**：`<appDataDir>/plugins/<插件>/`（manifest.json + main.js）。
  应用启动时自动扫描：新插件登记进列表（默认停用），改过的插件重启后读磁盘最新内容。
  设置 → 第三方插件 → **打开插件目录** / **重新扫描**。跟主题文件夹是同一套工作流。
- **安装（网页/通用）**：设置 → 第三方插件 → **从本地文件夹安装…**，选中插件文件夹；如果选的是
  `.obsidian/plugins` 这类父目录，会批量识别。
- **保持同步**：设置 → 第三方插件 → **链接插件目录（保持同步）…**，开发时改完 `main.js`
  重新启用插件即可看到效果（不需要重装）。
- **调试**：F12 打开开发者工具，插件里的 `console.log` 与宿主共用同一个控制台。
  激活失败会抛出带插件名的错误并回滚该插件注册的全部内容，不会拖垮其他插件。
- **打包**：把 `manifest.json` 和 `main.js` 放在压缩包根目录，或者直接分发文件夹。
- **发布**：把 `manifest.json` + `main.js` 推到 GitHub 仓库 → 打 `v*` tag 发 Release →
  给仓库加 topic `morz-plugin`。社区索引扫描器每天会扫 topic，客户端新版本默认读取；市场统一展示，不显示来源徽章；旧版本客户端仍只读官方索引，要进官方精选仍走
  `cumany/Morz` 的 `registry/index.json` PR。完整规范（manifest 字段、扫描规则、
  sha256 机制、更新流程）见 **[PUBLISHING.md](PUBLISHING.md)**。
- **直接安装**（进阶）：用户可以在插件管理里输入 `owner/repo`，直接从 GitHub 仓库安装，
  不经过索引。
### 更新与版本

- **`version` 是更新的唯一依据**：索引里的 `version` 必须大于已装 `manifest.version`，客户端才会
  显示“可更新”。没有 `version` 的条目只能安装，不能更新。
- **固定到一个 release tag**（推荐 `tag`，或 `commit`）：客户端按 `tag` 取文件，不会因为作者
  后来改了默认分支而装到不一致的版本。没有 `tag`/`commit` 时才回退默认分支。
- 发布新版本：改 `manifest.json` 的 `version` → 打新的 tag。社区索引每天扫描自动收录；
  官方索引条目需要同步更新 `index.json` 里的 `version`/`tag`。
  插件数据（`data.json`）和设置不会因为更新被清掉；更新失败会自动回滚旧版本。
- 索引可选字段：`minAppVersion`、`permissions`、`sha256`（`{ "manifest": "...", "main": "...", "styles": "..." }`）、
  `homepage`、`changelog`、`icon`（一张图，128×128 推荐，市场显示 24px）。PR 里的 `trust`
  必须是 `community`；`official`/`verified` 由维护者设置。插件不支持截图轮播。
- 国内下载会自动走 jsDelivr / 公共 GitHub 加速线路（自动选延迟最低的）；作者不需要自己处理加速地址。

### 官方索引与社区索引

市场有两份索引：**官方索引**（本仓库的 `registry/index.json`，随应用分发并后台刷新，
条目为官方策展）与**社区索引**（`cumany/morz-registry` 扫描 `morz-plugin` / `morz-theme`
topic 自动生成，先做确定性校验，配置 LLM key 时再做 AI 审核）。客户端新版本默认读取两份，
同 id / 同仓库以官方为准；市场统一展示，不显示来源徽章，按 stars / 最近更新时间排序。主题使用同一套 `themes` 数组字段
（`id/name/author/repo/version/tag/theme/preview/changelog`）。
发布流程与审核规则见 **[PUBLISHING.md](PUBLISHING.md)**。


## 工作区与标签页

`ctx.workspace` 与 `ctx.tabs` 覆盖"多工作区 + 多标签"的操作：

```js
// 工作区：列出、当前、切换（可能需要授权）、打开磁盘文件夹（桌面）
const all = ctx.workspace.list();            // [{ id, name, kind }]
const now = ctx.workspace.current();
await ctx.workspace.switch(all[1].id);        // 失败返回 false
ctx.workspace.onChange(ws => refresh(ws));

// 标签页：读取、激活、新建、关闭、监听
const tabs = ctx.tabs.list();                 // [{ id, name, path, active, dirty }]
ctx.tabs.activate(tabs[0].id);
const id = ctx.tabs.create("# 新文档");        // 新建并激活，返回 id
await ctx.tabs.close(id);                     // 走"未保存"确认流程
ctx.tabs.onChange(() => rerender());
```

## 脚本查询（dataviewjs）

内置 Dataview 插件支持 ```dataviewjs 代码块：脚本里用 `dv` 对象查询全库，
适合 DQL 表达不了的条件。`dv.el/table/list` 会自动插入输出区，页面名自动变成可点链接：

```js
const pages = await dv.pages("notes");          // front matter 已展开
const open = dv.where(pages, p => p.status === "doing");
const sorted = dv.sortBy(open, p => p.priority, "desc");
dv.table(["文件", "状态", "优先级"], sorted.map(p => [p.basename, p.status, p.priority]));
```

可用的 `dv` 方法：`pages(source?)`、`el(tag, class?, text?)`、`table(headers, rows)`、
`list(items)`、`open(path)`、`format(value)`、`where(rows, fn)`、`sortBy(rows, key, dir?)`。
脚本异常会显示在该代码块内，不影响其他块。

`dv.pages()` 和 DQL 都只读宿主的 **MetadataCache 增量索引**（`ctx.meta.pages()`），
不读正文、不自己全量解析：文件改动后索引只重解析变化的那篇，下一次查询直接拿到新值。
自己写聚合类插件时也用这个 API：

```js
const pages = await ctx.meta.pages();            // 全库；可选 { folder: "notes" }
pages[0].frontmatter;   // YAML front matter
pages[0].heading;       // 第一个一级标题（无则文件 basename）
pages[0].tags;          // 正文 + frontmatter 标签（不带 #）
pages[0].inlineFields;  // `key:: value` / `[key:: value]`
pages[0].tasks;         // [{ line, text, state, checked, scheduled, deadline, priority }]
```

DQL 的默认范围与 Dataview 一致：**不写 FROM 查询当前文档**，`FROM ""` 查询整个库。
所有 ```dataview / ```dataviewjs 块 hover 时右上角出现 `</>`，点击回到源码编辑
（点击块内空白处也一样；块内的链接/按钮保留自己的点击行为）。

## 数据视图（```dv，小白路径）

不想写 DQL 时用 ` ```dv ` 代码块：配置是 YAML，块本身是交互界面（排序/编辑/新建/展开）。
生成入口是 `/dv` 斜杠指令或命令面板「插入数据视图」的**可视化构建器**，
它会把配置写回 fence——所以视图是可以进 git、可以复制、AI 可以改的一段文本。

```yaml
title: 项目任务
source: 笔记/项目          # "" = 全库；"#标签" = 按标签
conditions:
  - { field: 状态, op: is, value: 进行中 }
columns: [状态, 截止]
sort: 截止
dir: asc
pageSize: 20
view: table                # table | list
```

设计要点：视图定义与属性值都留在 markdown 里（fence + frontmatter），不依赖插件私有
数据库——换设备、进 git、卸载重装都不丢"怎么看的"。更复杂的计算再升级到 DQL，
构建器的「对应查询」会显示等价写法。

## 网络与 AI 类插件

`fetch` 直接可用（CSP 放行 https/http）。**AI 类插件**的惯例：

- 走 OpenAI 兼容 `/chat/completions`（官方 API、各类中转、本地 Ollama 都是同一协议），
  端点/Key/模型放 **settings schema**（存 kv，不要写进文档）。
- 流式输出：`stream: true` + ReadableStream 按 `data:` 行分帧解析 `delta.content`；
  编辑器内用 `ctx.active.insert` 逐段追加，面板里逐字改气泡。
- 选区改写（润色/翻译）先取 `ctx.active.selection()` + `text()`，结果完整后
  `replaceSelection`，避免流式碎片直接进正文。

内置的 AI 助手就是按这套方式实现的：端点与 Key 存在插件设置里，流式结果写进当前文档。

## 编辑器直控（CM6）

v1.2 起插件可以直接操作 CodeMirror 6：装饰、keymap、lint、自定义行内部件都能做了。
三步走：

**1. 声明权限**

```json
{ "permissions": ["editor:direct"] }
```

**2. 从 `ctx.editor.cm` 取构造器**

插件环境没有 `require`，CodeMirror 的类从这里拿（与编辑器同一份模块实例）：

```js
const { ViewPlugin, Decoration, RangeSetBuilder } = ctx.editor.cm;
```

**3. `registerExtension` 装进编辑器**

```js
// 以 !! 开头的行整行高亮
const marker = Decoration.line({ class: "my-marker" });
const build = (view) => {
  const builder = new RangeSetBuilder();
  for (let i = 1; i <= view.state.doc.lines; i++) {
    const line = view.state.doc.line(i);
    if (line.text.startsWith("!!")) builder.add(line.from, line.from, marker);
  }
  return builder.finish();
};
ctx.editor.registerExtension(ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = build(view); }
  update(u) { if (u.docChanged) this.decorations = build(u.view); }
}, { decorations: p => p.decorations }));
```

扩展跑在独立 compartment 里：**插件停用或卸载时整组自动移除**。`registerExtension`
返回取消函数，想提前撤销就调它。

注意：宿主只能兜住"装载/重配置失败"；扩展**运行期**回调（update、装饰构建）抛错
会中断当次编辑器更新，宿主无法隔离——每个回调里自己 `try/catch` 并静默降级。

`ctx.editor.view()` 返回当前 `EditorView` 实例（未打开文档时 `null`，每次实时取、不要缓存），
拿到后就是标准 CodeMirror 6 API：`view.state`、`view.dispatch`、`view.visibleRanges`…
另外 `ctx.editor.runCommand("toggleFormat", "strong")` 可以复用内置格式命令
（加粗、标题、表格等，一步撤销），可用命令名见 [PLUGIN-SDK.md](./PLUGIN-SDK.md) 的命令表。

写 TypeScript 时 `npm i -D @codemirror/view @codemirror/state` 拿类型即可，
打包时把代码编译进 `main.js`（运行时对象由宿主提供）。

三条纪律：

- 改**文本**用 `ctx.active`（一步撤销、与索引联动），不要拿 `view.dispatch` 手搓；
- 只读**高亮**优先 `ctx.editor.highlight`（自带视口扫描与上限）；
- 用 `view.dispatch` 改渲染结构（块替换/隐藏行）属**自负区**——能力上有，但会破坏
  所见即所得映射与撤销语义，宿主不做兼容保证，发布前用真实文档自查。

## 权限

| 权限 | 允许做什么 |
|---|---|
| `vault:read` | `ctx.vault.list/read/readBlob`、`ctx.meta.*` |
| `vault:write` | `ctx.vault.write/create/rename/remove/writeBlob/setFrontmatter` |
| `workspace` | `ctx.ui.statusBar/ribbon/panel`、`ctx.active` |
| `editor:insert` | 在光标处插入/替换文本、`ctx.editor.runCommand` |
| `editor:highlight` | `ctx.editor.highlight` 受控高亮 |
| `editor:direct` | `ctx.editor.view / registerExtension / cm`（CM6 直控） |
| `views` | `ctx.views` 主区域自定义视图 |
| `settings` | 读写自己的设置 |
| `http` | `ctx.http` 访问网络（还需 `manifest.network` 声明 + 每域名用户授权） |

声明得越少，安装时用户越容易放心。没有声明 `permissions` 的插件会被视为要求全部能力，
在插件列表里会显示完整的权限说明。

## 常见坑

- **`main.js` 不能写 `import`**。需要多文件就先打包成一个 IIFE/CommonJS 文件。
- **别长期持有 DOM**。面板每次打开都会重新 `render()`，旧的节点已经不在文档里。
- **面板默认隐藏、状态项默认显示**。`ctx.ui.panel` 注册的面板默认不挂载——用户在
  右栏空白处右键勾选后才出现；`ctx.ui.statusBar` 注册的条目默认显示，用户可在状态栏
  右键逐个隐藏。面板类功能请同时注册一个打开面板的命令，别指望用户自己发现。
- **右键菜单项会进二级**。`ctx.ui.menu` 的贡献一律收进「插件」子菜单；
  菜单项的 `enabled(pos)` 用来避免在无关位置出现空项。
- **同步耗时会被守护盯上**。单次回调 >400ms 或 10s 内累计 >600ms 会触发提醒，
  反复出现会被自动停用（第三方）——重活放 `ctx.timers.debounce` / 分片
  （`ctx.timers.nextTick`），大计算用异步任务。见 [PLUGIN-SDK.md](./PLUGIN-SDK.md) 的「性能守护」。
- **异步错误要自己处理**。命令和面板里的 `await` 失败不会自动弹给用户，用
  `ctx.ui.notice(..., { kind: "error" })` 告诉用户。
- **不要在 `activate` 顶层做重活**。插件启动会拖慢编辑器首屏；把耗时的索引/网络放到
  第一次打开面板时再做。
- **桌面端的 CSP 不允许远程脚本**：依赖请打包进 `main.js`，不要在运行时
  `createElement("script")` 指向 CDN；`fetch` 不受影响。
- **不能直接打开库外文件/程序**：桌面端没有授予 `open_path`，`file://` 也不在白名单。
  外链用 `window.open` 或 opener 的 `openUrl`（http/https/mailto/tel 与
  obsidian/zotero 等常用软件 scheme 已放行）。
- **主题相关样式**：插件可以插入 `<style>`，但请用主题变量（`--text-color`、`--primary-color`、
  `--ui-bg` 等）而不是写死颜色，否则换主题会花。

## 从 Obsidian 插件迁移

**结论：目标是“转换”，不是“直接运行”。** 兼容层只用来对照旧行为；最终产物必须是
`manifest.json` + `main.js` 的 Native SDK 插件。推荐流程：

1. **列功能**：命令、Ribbon、状态栏、面板/视图、设置、代码块、编辑器行为、数据、网络。
2. **逐项找 `ctx` 对应**：[`PLUGIN-SDK.md`](./PLUGIN-SDK.md) 里没有对应能力的，先标
   “不可迁移”，不要用兼容层硬绕。
3. **重写入口**：`manifest.json` 写 `"sdk": 1` 和最小 `permissions`；`main.js` 用
   `module.exports = { async activate(ctx) { … }, deactivate() { … } }`。
4. **编辑器行为**：只读高亮用 `ctx.editor.highlight`；装饰/keymap 用
   `ctx.editor.registerExtension`（CM6 官方 API）。不要依赖 `.view-content`、
   `registerCodeMirror`、`registerEditorSuggest`。
5. **设置/面板**：设置用 `ctx.settings.defineSchema`；面板用 `ctx.ui.panel` 或
   `ctx.ui.floating`。不要移植 Obsidian 的 `Modal` / `Setting` / `PluginSettingTab` DOM。
6. **数据与网络**：文件走 `ctx.vault`，元数据走 `ctx.meta`，配置走 `ctx.settings`，
   运行状态走 `ctx.storage`，请求走 `ctx.http`。不要用 Node/Electron。
7. **验收**：按用户可见流程验收（命令、面板、设置保存、数据读回、渲染/导出），
   不是只看插件能加载。

当前明确不迁移：CM5 的 `registerCodeMirror`、复杂 workspace 布局、
`registerMarkdownPostProcessor` 的全局改写、`registerEditorSuggest`、
`electron`/Node 模块、二进制/流式上传下载、依赖 `.view-content` 的 DOM 补丁。
这些需要重写功能，或判断该插件不适合迁移。

给 AI 批量迁移时，把原插件的 `manifest.json`、入口源码和功能清单一起给出，并要求
输出遵守 [`PLUGIN-SDK.md`](./PLUGIN-SDK.md) 末尾的生成模板。

## 参考

- API 全表与类型：[`PLUGIN-SDK.md`](./PLUGIN-SDK.md)
- 给 AI 的速查：[llm.md](https://morz.app/docs/llm)（边界、输出契约、API 映射）
- 官方插件示例：[morz-reading-progress](https://github.com/cumany/morz-reading-progress)（状态栏刷新 + 滚动进度 + 设置实时生效）
- 图床上传器实例：[morz-image-host](https://github.com/cumany/morz-image-host)
- 发布到插件市场：[插件 / 主题发布教程](https://morz.app/docs/publishing)
