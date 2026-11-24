# Morz 插件 SDK（能力集 v1.2）

写一个 Morz 插件只需要两个文件：`manifest.json` + `main.js`。
不需要构建工具，不需要打包，不需要 Node。

v1.2 新增**编辑器直控**（`ctx.editor.view / registerExtension / runCommand / cm`）：
插件可以直接拿到 CodeMirror 6 视图、注册 CM6 扩展、复用内置格式命令——见
[「`ctx.editor` — 编辑器直控」](#ctxeditor--编辑器直控)。manifest 的 `"sdk": 1` 不变，旧插件不受影响。

本文是 **API 参考**。想从零写一个能装、能调试、能发布的插件，先看
[`PLUGIN-DEVELOPMENT.md`](./PLUGIN-DEVELOPMENT.md)（含完整示例与安装/打包步骤）。

---

## 5 分钟上手

**manifest.json**

```json
{
  "id": "my-plugin",
  "name": "我的插件",
  "version": "1.0.0",
  "description": "一句话说明",
  "sdk": 1,
  "permissions": ["vault:read", "editor:insert"]
}
```

> `"sdk": 1` 是关键：它声明这是 Native SDK 插件（走窄接口通道）。
> 不写这个字段的会被当作 Obsidian 兼容插件处理。

**main.js**

```js
module.exports = {
  async activate(ctx) {
    // 一个命令：在光标处插入日期
    ctx.ui.command({
      id: "insert-date",
      name: "插入今天日期",
      hotkey: "Mod-Shift-d",
      run: () => ctx.active.insert(new Date().toISOString().slice(0, 10)),
    });

    // 状态栏：实时字数（函数形式会在文档变化时自动重算）
    ctx.ui.statusBar({ text: (api) => `${api.active.text().length} 字符` });

    // 右侧栏面板
    ctx.ui.panel({
      id: "hello",
      name: "我的面板",
      icon: '<path d="M4 6h16M4 12h10"/>',
      render: async () => {
        const el = document.createElement("div");
        el.textContent = "你好，" + (ctx.active.path() ?? "未打开文档");
        return el;
      },
    });
  },
};
```

放进 `.obsidian/plugins/` 或任意目录，用 **设置 → 第三方插件 → 从本地文件夹安装** 选中即可
（桌面端会复制到插件目录）。

---

## API 全表

### `ctx.vault` — 文档仓库

| 方法 | 说明 |
|---|---|
| `list()` | 列出所有 Markdown 文档 `FileInfo[]` |
| `read(path)` / `write(path, text)` | 读 / 写全文 |
| `create(path, text?)` | 不存在则创建 |
| `exists(path)` / `rename(from,to)` / `remove(path)` | 存在性 / 重命名 / 删除 |
| `readBlob(path)` / `writeBlob(path, blob)` | 图片等二进制 |
| `setFrontmatter(path, key, value)` | 改 frontmatter 顶层标量（`undefined` 删除）；打开中的文档会同步编辑器缓冲。数组/嵌套/块标量不支持，会抛错 |
| `on("create" \| "modify" \| "delete" \| "rename", cb)` | 文件事件，返回取消函数 |
| `search(query, { limit?, caseSensitive?, folder? })` | 全文搜索，返回命中与片段 |
| `renameWithLinks(from, to)` | 重命名并同步更新所有文档里的引用 |
| `snapshot()` | 全库文本快照 `Promise<Map<path, text>>`；3 秒 TTL + 文件事件自动失效，多个面板/代码块共享一次读盘 |
| `invalidateSnapshot()` | 主动作废快照（下次 `snapshot()` 重新读盘） |

### `ctx.active` — 当前编辑器（安全的文本操作）

| 方法 | 说明 |
|---|---|
| `path()` | 当前文档路径，未打开为 `null` |
| `text()` / `setText(t)` | 全文读写 |
| `cursor()` | `{ line, ch, pos }` |
| `selection()` | `{ from, to, text, empty }` |
| `insert(text)` | 在光标处插入（有选区则替换） |
| `replaceSelection(text)` | 替换选区 |
| `replaceRange(from, to, insert)` | 替换指定偏移区间（大纲重排一类"整块移动"）。越界自动夹紧；单次 dispatch，Ctrl+Z 一步回退 |
| `headings()` | 当前文档的标题列表 `{ level, text, pos }[]`，大纲类插件用 |
| `scrollTo(pos)` | 跳转并滚动（不进导航历史） |
| `jumpTo(pos)` | 同 `scrollTo`，但进入页内导航历史；标题栏「后退」可回到跳转前的光标 |
| `scrollPos()` | 滚动视口顶部对应的文档位置 |
| `scrollProgress()` | 滚动进度 `0–1`；整篇一屏放下时为 `1` |
| `onScroll(cb)` | 滚动回调 `(topPos, progress)`，按帧合并 |
| `onChange(cb)` | 文档变化回调，返回取消函数 |
| `onPathChange(cb)` | **当前文档切换**回调（参数为路径，无文档时 null）。跟随文档刷新的面板用它，别轮询 |

需要 CodeMirror 视图本体（装饰、keymap、lint）时，见下面的 `ctx.editor` 直控。

### `ctx.editor` — 编辑器直控

三个层次，按需取用：**受控高亮**（最简单）→ **内置命令**（复用格式工具栏的行为）→ **CM6 直控**（完整能力，需 `editor:direct` 权限）。

#### `highlight(spec)` — 受控文本高亮

只读的 `Decoration.mark`，不替换文本、不改变行高：

```js
const off = ctx.editor.highlight({
  pattern: "TODO",
  matchCase: false,
  className: "my-keyword-highlight",
  maxMatches: 500,
});
ctx.active.onChange(() => off.refresh());
off(); // 移除
```

- `pattern` 默认按字面量匹配；`regex: true` 时按正则；
- `wholeWord` / `matchCase` / `maxMatches` 可选；
- 需要 `editor:highlight` 权限；
- 样式由插件自己注入 CSS，宿主只设置 class / 受限文本样式；
- 只扫描当前视口，长文档不会全量扫描。

#### `runCommand(name, ...args)` — 复用内置格式命令

与格式工具栏/快捷键走同一条路，单次 dispatch、一步撤销。需要 `editor:insert` 权限。

```js
ctx.editor.runCommand("toggleFormat", "strong");   // 加粗当前选区
ctx.editor.runCommand("setHeading", 2);            // 当前行为二级标题
ctx.editor.runCommand("insertTable", 3, 4);        // 3 行 4 列表格
```

可用命令名（参数宽松校验，传错回退默认值 / 返回 `false`）：

| 命令 | 参数 | 说明 |
|---|---|---|
| `setHeading` | `level: 1–6` | 标题级别 |
| `shiftHeading` | `-1 \| 1` | 降/升一级 |
| `toggleFormat` | `"strong" \| "emphasis" \| "underline" \| "code" \| "strike" \| "highlight" \| "superscript" \| "subscript" \| "inlineMath" \| "comment" \| "kbd"` | 切换行内格式 |
| `applyHighlight` / `removeHighlight` | emoji? | 荧光笔 |
| `clearFormat` | — | 清除行内格式 |
| `insertLink` | — | 插入链接 |
| `toggleQuote` / `toggleTask` | — | 引用 / 任务列表 |
| `toggleList` | `"bullet" \| "ordered" \| "task"` | 列表类型 |
| `indentList` | `-1 \| 1` | 列表缩进 |
| `setTaskStatus` | `boolean` | 勾选状态 |
| `insertCodeFence` / `insertMathBlock` / `insertHorizontalRule` / `insertToc` / `insertFrontMatter` / `insertFootnote` / `insertLinkReference` | — | 插入块 |
| `insertTable` | `rows?, columns?` | 表格 |
| `insertCallout` | `kind` | Callout 块 |
| `combineGallery` | — | 合并画廊块 |

#### `view()` / `cm` / `registerExtension()` — CodeMirror 6 直控

需要 `editor:direct` 权限（manifest 不声明 `permissions` 时视为允许全部）。

```js
const { ViewPlugin, Decoration, RangeSetBuilder } = ctx.editor.cm;

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
const off = ctx.editor.registerExtension(ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = build(view); }
  update(u) { if (u.docChanged) this.decorations = build(u.view); }
}, { decorations: p => p.decorations }));

// 直控视图实例（不要缓存：关文档后视图销毁）
const view = ctx.editor.view();      // EditorView | null
view.dispatch({ /* … */ });          // CodeMirror 6 官方 API
```

- `ctx.editor.cm`：CodeMirror 6 运行时构造器（`ViewPlugin` / `Decoration` / `WidgetType` / `keymap` / `MatchDecorator` / `EditorSelection` / `EditorState` / `StateField` / `StateEffect` / `Compartment` / `RangeSetBuilder`）。插件环境没有 `require`，从这里取；写 TS 时 `npm i -D @codemirror/view @codemirror/state` 只为拿类型。
- `registerExtension(ext)`：扩展在独立 compartment 中运行，停用插件或调用返回的取消函数时**整组移除**。装载/重配置失败会被捕获，但扩展**运行期**回调抛错无法隔离（见下方「失败隔离」）——请自行 try/catch。文档未打开时自动暂存，打开后生效。
- **稳定性承诺**：`view()` 与 `cm` 里的对象遵循 CodeMirror 6 官方 API 稳定性（[codemirror.net/docs/ref](https://codemirror.net/docs/ref/)）；Morz 内部对象（编辑器外壳实例、私有 state field、内部类名细节）**不承诺**。
- **自负区**：用 `view.dispatch` 直接改渲染结构（块替换/隐藏行）能力上可行，但会破坏所见即所得映射与撤销语义，宿主不做兼容保证——发布前用真实文档自查导出/双链/撤销。文本修改优先 `ctx.active`，只读高亮优先 `highlight()`。
- 大文档的装饰请按 `view.visibleRanges` 计算，不要整篇扫描。

### `ctx.meta` — 元数据

| 方法 | 说明 |
|---|---|
| `headings(path)` | `{ level, text, pos }[]` |
| `outgoing(path)` | 本文档引用了谁 `{ path, resolved, count }[]` |
| `backlinks(path)` | 谁引用了本文档 |
| `graph({ from?, depth? })` | 链接图 `{ nodes, edges }`。不传 `from` 返回全库；传了从该文档做**无向** BFS（出链和反链都算一跳），`depth` 默认 1 |
| `index({ tag?, folder?, frontmatter? })` | 按条件筛选文档，返回 `FileInfo[]`；多条件是「且」 |
| `pages({ folder? })` | 整库页面元数据：`frontmatter`、`heading`、`tags`、`inlineFields`、`tasks`。走宿主的增量索引，**不读正文** |

**做关系图 / 按标签列文档**，不必自己遍历整个仓库：

```js
// 局部图谱：当前文档 ±1 跳
const { nodes, edges } = await ctx.meta.graph({ from: ctx.active.path(), depth: 1 });

// 带某个标签的所有草稿
const drafts = await ctx.meta.index({
  tag: "项目",
  folder: "notes/2026",
  frontmatter: { status: "draft" },
});
```

`graph` 的 `edges` 里 `count` 是同一对文档之间的引用次数；`index` 返回的
`FileInfo` 与 `ctx.vault.list()` 同形，可直接复用同一套渲染。

**做 Dataview 类聚合**用 `pages()`，不要遍历 `vault.snapshot()` 自己解析：

```js
const pages = await ctx.meta.pages();
const doing = pages.filter(p => p.frontmatter.status === "doing");
const overdue = pages.flatMap(p => p.tasks
  .filter(t => t.state !== "done" && t.deadline)
  .map(t => ({ path: p.path, ...t })));
```

只要任务时用轻量的 `tasks()`（Dataview TASK 语义）：不构造 frontmatter/标签等
完整页面元数据，大库上聚合任务的开销最小——内置任务面板就用它：

```js
const tasks = await ctx.meta.tasks({ folder: "notes" });
const open = tasks.filter(t => t.state !== "done");
```

文件改动后宿主只重解析变化的那篇，下一次 `pages()` / `tasks()` 直接返回新值。

插件激活通常早于首次全量索引，聚合视图如果只在激活时取一次数，会一直停在空结果。
用 `onChange()` 订阅索引更新（冷启动全量解析也走这里），重取并重绘：

```js
// 状态栏/面板：索引每次增量更新后重扫并重绘
ctx.lifecycle.add(ctx.meta.onChange(() => {
  store.invalidate();
  statusHandle.refresh();
}));
```

### `ctx.services` — 获取其他插件的能力

SDK 不把每个内置插件都硬编码成 `ctx.xxx`，而是用服务注册表：提供方启用时注册，
停用/卸载自动移除；消费方按 id 获取。

内置 Dataview 发布 `morz.dataview`（`DataviewService`）：

```js
const dv = ctx.services.get("morz.dataview");
if (!dv) throw new Error("请先启用 Dataview");
const result = await dv.api.query(`
  TABLE date, count
  FROM "notes/diary"
`);
for (const row of result.rows) {
  row.file.path;   // 文件
  row.page.date;   // frontmatter / 行内字段 / file.*
}
```

- 服务 id 规则：等于提供方插件 id，或以 `<pluginId>:` 开头；不能冒名提供 `morz.*`。
- `ctx.services.list()` 列出当前可用服务；`onChange(id, available)` 跟随内置插件启停。
- 插件也可以 `ctx.services.provide("my.plugin:search", api)` 暴露自己的服务（生命周期自动回收）。
- `row.page` 与 Dataview 代码块页面上下文一致。

### `ctx.images` — 图床

核心负责"图片存到本地"（assets 目录 / data URI，设置里可选）。
插件可以注册**上传器**接管：插入图片时宿主先问上传器，返回 URL 就用 URL，
返回 `null`（或抛错）就回退本地保存。

| 方法 | 说明 |
|---|---|
| `registerUploader({ id, name, upload })` | 返回取消函数；后注册的优先 |
| `listUploaders()` | 当前注册的上传器 |

```js
ctx.images.registerUploader({
  id: "my-cdn",
  name: "我的图床",
  async upload(file, { name, docPath }) {
    const form = new FormData();
    form.append("file", file, name);
    const res = await fetch("https://cdn.example.com/upload", { method: "POST", body: form });
    if (!res.ok) return null;          // 失败必须返回 null，别抛
    return (await res.json()).url;     // 返回 URL 就写进 Markdown
  },
});
```

**约定**：上传失败一定要返回 `null`，不要抛异常——宿主会回退本地保存，
否则用户会以为图片没插进去。

### `ctx.daily` — 每日笔记

配置（目录 / 文件名格式 / 模板）跟随宿主设置，插件不用自己拼路径，
也就不会和用户的日记设置对不上。

| 方法 | 说明 |
|---|---|
| `open(date?, { confirmCreate? })` | 打开该日期的笔记（不存在则按模板创建），返回路径。默认今天 |
| `path(date?)` | 只算路径，不创建文件 |
| `calendarOptions()` | 日历插件的显示偏好 `{ weekStart, showWeekNumbers, showLunar? }`——做日历类 UI 时跟随用户设置 |

```js
// 日历插件里点一个格子
await ctx.daily.open(new Date(2026, 10, 20));
```

### `ctx.ui` — 界面

| 方法 | 说明 |
|---|---|
| `command({ id, name, hotkey?, run })` | 注册命令 |
| `panel({ id, name, icon, render })` | 右侧栏面板。**默认不显示**（UI 克制）：用户在右栏空白处右键勾选后才挂载，勾选状态随布局持久化。自动附带一个打开命令 |
| `openPanel(id)` | 打开本插件注册的面板（状态栏条目点击、命令跳转） |
| `statusBar({ id?, text, title?, onClick? })` | 状态栏条目，返回可刷新句柄。**默认显示**，用户可在状态栏右键「插件状态项」逐个隐藏；同一插件注册多个状态项时务必声明稳定的 `id`，显隐按它记忆 |
| `ribbon({ title, icon, onClick })` | 图标按钮（v1 渲染在状态栏；与状态项同规则：默认显示，可在状态栏右键隐藏） |
| `notice(msg, { kind, timeout })` | 右上角提示 |
| `menu({ label, icon?, when?, enabled?, run })` | 编辑器右键菜单项。**一律收进「插件」二级子菜单**（所有插件同规则，主菜单不随插件数量膨胀）；`when: "editor-selection"` 只在有选区时出现；`enabled(pos)` 按右键位置决定是否显示；`run(pos)` 收到右键文档偏移；`icon` 用内置图标名或 Lucide 名，缺省用通用命令图标 |
| `floating(spec)` | 编辑区浮动卡（宿主管拖动/位置/折叠）：`render()` 给内容，返回 `{ show/hide/toggle/collapse/refresh/destroy }` 句柄，停用时自动销毁 |
| `floatingHost` | 编辑面板容器元素：贴边 UI 挂这里，随编辑器显隐 |
| `copy(text)` | 写剪贴板 |

除 `notice`/`copy` 外的注册方法都返回 **取消函数**，停用时宿主自动调用。
`statusBar()` 额外返回 `element`、`refresh()`、`update()`；滚动/定时变化需要主动刷新时用它：

```js
const bar = ctx.ui.statusBar({
  text: () => `${Math.round(ctx.active.scrollProgress() * 100)}%`,
  title: () => "阅读进度",
});
ctx.active.onScroll(() => bar.refresh());
```

### `ctx.settings` — 用户配置

```js
const s = await ctx.settings.get();      // 插件私有，按 id 隔离
await ctx.settings.set({ ...s, foo: 1 }); // 浅合并
```

**声明设置结构 → 宿主自动生成表单**（AI 生成插件时不用写任何 UI）：

```js
ctx.settings.defineSchema([
  { key: "endpoint", label: "API 地址", type: "text", placeholder: "https://…" },
  { key: "apiKey",   label: "API Key", type: "password", secret: true, placeholder: "sk-..." },
  { key: "limit",    label: "条数上限", type: "number", min: 1, max: 100 },
  { key: "theme",    label: "配色", type: "select", options: [["light","浅色"],["dark","深色"]] },
  { key: "mode",     label: "模式", type: "radio", options: [["fast","快速"],["full","完整"]] },
  { key: "sources",  label: "数据来源", type: "multiselect", options: [["notes","笔记"],["tasks","任务"],["tags","标签"]] },
  { key: "prompt",   label: "系统提示词", type: "textarea", rows: 4, placeholder: "You are…" },
  { key: "enabled",  label: "启用", type: "boolean" },
]);
```

`boolean` 勾选/开关、`text` 填空、`password` 掩码输入、`number` 数字、`select` 下拉单选、
`radio` 分段单选、`multiselect` 多选 chip、`textarea` 多行文本。
表单控件与核心设置页共用同一套组件，样式统一（`.pref-row / .pref-label / .pref-control`）。

**密钥字段（`type: "password"` + `secret: true`）**：值经宿主密钥后端存取，**不进设置 JSON**
（桌面 = OS 钥匙串；Web / 移动壳 = IndexedDB 独立命名空间）。对插件透明：
`settings.get()` 照常拿到值，`settings.set({ apiKey: "…" })` 照常写入；
**空串 = 删除**。宿主的「密钥」设置页列出保存过密钥的插件字段，可逐个清除。

声明后，宿主会在「设置 → 插件」右侧（或「第三方插件 → 已安装」该插件的设置区）
**直接内联渲染表单**，修改即保存，不需要插件自己再弹设置对话框。

设置被修改后（宿主内联表单或插件自己调用 `set()`）会触发 `onChange`，用来即时刷新状态栏/面板：

```js
ctx.settings.onChange(async () => {
  settings = { ...settings, ...(await ctx.settings.get()) };
  bar.refresh();
});
```

### `ctx.storage` — 插件私有存储

`ctx.settings` 存用户可改的**配置**；运行状态、缓存、每篇文档的阅读位置用 `ctx.storage`。
存储按插件 id 隔离，卸载插件时一并删除。

```js
const s = ctx.storage;
await s.set("lastVersion", "1.2.0");
await s.get("lastVersion");

const cache = s.scope("cache");          // 子命名空间
await cache.set("toc", data);
await cache.keys();                      // ["toc"]

const doc = s.document("notes/a.md");    // 按文档分组
await doc.set("scroll", 12345);
await doc.get("scroll");

await s.clear();                         // 只清当前作用域
```

| 方法 | 说明 |
|---|---|
| `get(key)` / `set(key, value)` / `remove(key)` | 读写删；value 走结构化克隆 |
| `keys(prefix?)` | 当前作用域下的键（相对名） |
| `clear()` | 清空当前作用域 |
| `scope(name)` | 子作用域，键空间隔离 |
| `document(path)` | 按文档分组；`null` 归到未命名文档 |

### `ctx.events` — 插件内事件总线

对标 Obsidian `Events`，用于插件各模块之间解耦：

```js
const off = ctx.events.on("refresh", () => redraw());
ctx.events.once("ready", () => {});
ctx.events.trigger("refresh");
off();
```

停用插件时所有监听自动清理。

### `ctx.lifecycle` — 生命周期与取消

对标 Obsidian `Component.registerEvent/registerDomEvent/registerInterval`：

```js
ctx.lifecycle.onUnload(() => style.remove());
const controller = new AbortController();
fetch(url, { signal: ctx.lifecycle.signal });  // 停用时自动 abort
```

`ctx.onDispose(fn)` 仍然可用，是 `lifecycle.add/onUnload` 的旧别名。

### `ctx.theme` — 融入主题

```js
ctx.theme.variable("--text-color");  // 读 CSS 变量
ctx.theme.isDark();                  // 当前是否暗色
ctx.theme.onChange(() => redraw());  // 主题切换时重绘
```

### `ctx.markdown` — 自定义代码块渲染

```js
const off = ctx.markdown.codeBlock("chart", async (source, el) => {
  const pre = document.createElement("pre");
  pre.textContent = source;          // 自己负责转义，宿主不会替你清洗
  el.append(pre);
});
```

- `tag` 不区分大小写；同一个 tag 后注册的优先。
- 渲染函数抛错时，该块显示错误信息，文档本身不受影响。
- 适合 ` ```chart `、` ```dataview ` 这类"代码块即视图"的插件。
- 想输出 HTML（而不是纯文本）时，记得自己转义来自文档的内容。
- 这是 SDK 支持的"文档内 widget"形态；编辑器内的行级装饰走 `ctx.editor` 直控。

### `ctx.timers` — 会被自动清理的定时器

| 方法 | 说明 |
|---|---|
| `setInterval(cb, ms)` / `setTimeout(cb, ms)` | 停用插件时自动清理 |
| `clear(id)` | 手动取消 |
| `nextTick()` | 让出一次主线程（把长任务分片） |
| `debounce(cb, ms)` | 防抖，返回带 `cancel()` 的函数 |
| `throttle(cb, ms)` | 节流，返回带 `cancel()` 的函数 |

插件里不要用 `window.setInterval`——插件被禁用后它会继续跑。

### `ctx.http` — 访问网络

插件访问第三方 API 请用 `ctx.http`，**不要直接 `fetch`**：浏览器的同源策略会拦住
绝大多数没有 CORS 头的 API（Obsidian 插件用 `requestUrl` 绕过的正是这个）。

```json
// manifest.json：两道声明缺一不可
{
  "permissions": ["http"],
  "network": ["https://api.example.com/*", "https://*.workers.dev/*"]
}
```

```js
const items = await ctx.http.json("https://api.example.com/v1/items");

const res = await ctx.http.request("https://api.example.com/v1/items", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "x" }),
});
// res = { status, headers, body }
```

| 规则 | 说明 |
|---|---|
| 权限 | `permissions` 必须含 `"http"`；`network` 用通配 URL（`*` 匹配任意字符，整串锚定） |
| 用户授权 | 每个域名**首次**访问弹一次确认；拒绝后本次调用抛错，之后可再次触发。可在「设置 → 插件 → 第三方插件」里撤销 |
| 公网只读 | **任意公网域名的 GET/HEAD 且无 body 免授权**（拉数据、查 API 不再打扰） |
| 私网 / 本机 | `localhost`、`.local`、`.internal`、`127/10/192.168/172.16-31`、`169.254`、IPv6 本机/ULA 等——**只读也要授权**（SSRF 防护），弹窗会标明是本地服务 |
| 云元数据 | `169.254.169.254`、`fd00:ec2::254`：**直接拒绝**（凭证窃取目标，不给授权机会） |
| 完全信任 | `pkmer.cn` / `pkmer.net` 及其**任意子域**：任何方法都免授权（PKMer 自家基础设施：论坛 / 兰台图床 / Thino 等）。仍需 manifest 声明 |
| 写方法 | `POST`/`PUT`/`PATCH`/`DELETE` 或带 body 的请求**一律需要授权**——域名无害不代表行为无害（对任意域名的 POST 都可以外发用户数据） |
| 桌面 | 宿主代理（Rust 发请求），**不受 CORS 限制**，任意公网 API 可用 |
| Web/PWA | 浏览器原生 fetch，**受 CORS**；目标不开 CORS 时只有桌面可用 |
| 限额 | 超时 30s、响应 ≤10MB、重定向 ≤5；只允许 http/https |
| 覆盖范围 | REST/JSON（GET/POST/PUT/PATCH/DELETE）。流式 SSE 与 multipart 上传暂不支持 |

### `ctx.onDispose` — 清理自己的资源

**停用插件 = 卸载**：`ctx` 内建的注册面（命令/面板/状态栏/浮动卡/事件订阅/定时器/设置 schema/CM6 扩展）
停用时都会自动回收；插件自己创建的 DOM、全局监听等，用 `onDispose` 登记：

```js
const style = document.createElement("style");
style.textContent = css;
document.head.append(style);
ctx.onDispose(() => style.remove());
```

### `ctx.openFile` — 打开文档

```js
ctx.openFile("notes/today.md");              // 当前标签
ctx.openFile("notes/today.md", { newTab: true });  // 新标签（Ctrl/Cmd+点击语义）
ctx.openFile("notes/today.md#待办");         // 跳到标题
ctx.openFile("notes/today.md", { line: 41 }); // 跳到第 42 行（0 起）；当前文档内直接滚动
```

`path` 可以省略 `.md`。没有打开文件夹时，只能打开内置书架里的文档。

### `ctx.views` — 主区域自定义视图

插件可以在标签栏里打开自己的视图 tab（看板、预览、图谱、向导等）。插件视图**不是编辑器视图**：
打开时编辑器工具栏/状态栏入口会自动收起；切到文档 tab 只**隐藏**视图，
DOM、Worker、布局都保留，点回视图 tab 直接复用，不会重新调用 `render`。关闭视图 tab 或停用插件时
才调用清理函数；关闭后回到打开前的文档，没有文档则回到空白引导页。

```js
ctx.views.register({
  id: "board",
  name: "看板",
  icon: "layout-grid",          // 内置图标名或 Lucide 名
  render(container, view) {
    container.textContent = "我的看板";
    // 返回清理函数：关闭视图 tab / 停用插件 / 宿主销毁时调用
    return () => { /* 清定时器、监听 */ };
  },
});
ctx.ui.command({ id: "open-board", name: "打开看板", run: () => ctx.views.open("board") });
```

- `active()` → `{ id, kind, title? }`；`kind` 为 `"editor" | "blank" | "attachment" | "plugin"`，
  插件视图 id 带 `插件id:` 前缀。
- `open(id)` / `close()`；`render` 里的 `view.close()` 等价于 `close()`。
- `onChange(cb)` 监听主区域视图切换（文档 / 空白页 / 附件 / 插件视图）。
- 视图被文档 tab 隐藏时不做清理；需要暂停动画/轮询的插件可判断 `container.offsetParent === null`，
  并监听 `window` 的 `morz:plugin-view-visible` 事件恢复。
- `register()` 返回取消函数；停用插件时宿主会自动撤销，并关闭正在显示的该插件视图。
- 视图 tab 不写入会话，刷新后不会自动恢复；需要"重启后还在"的入口，用命令 / ribbon 重新打开。
- 需要 `views` 权限（manifest 不写 `permissions` 时视为允许全部）。

### `ctx.manifest` — 只读清单

宿主解析后的 manifest（`id`、`name`、`version`、`permissions` 等）。只读，改它不会影响已注册的插件。
`beta: true` 会在插件管理器显示 Beta 徽章；`defaultEnabled` 只对内置/官方插件生效（用户手动开关后以用户设置为准）。

---

## 内置插件 vs 第三方插件

应用自带的插件（日历、图谱、Dataview、任务、AI 助手等）也用本文这套 `ctx`，区别只有分发方式和默认状态：

| | 内置 | 第三方 |
|---|---|---|
| 位置 | 打包进应用 | 磁盘 `main.js` |
| 默认 | 启用 | 关闭 |
| 可卸载 | 否（可禁用） | 是 |

## 契约（务必遵守）

### ✅ 可以

- 命令、面板、状态栏、Ribbon、Notice
- 状态栏/面板/浮动卡的主动刷新（`refresh()`）与设置变更订阅（`settings.onChange`）
- 受控关键词/正则高亮（`ctx.editor.highlight`）：只读 mark，不替换文本
- 编辑器直控（`ctx.editor.view / registerExtension / runCommand / cm`，v1.2）：
  CodeMirror 6 官方 API；高层需求优先用 `ctx.active` / `highlight()`
- 插件服务（`ctx.services`）：按 id 获取内置插件能力，提供方停用自动失效
- 插件私有存储（`ctx.storage`）与按文档分组
- 生命周期清理（`ctx.lifecycle`）、插件内事件（`ctx.events`）、防抖/节流
- vault 读写、元数据查询、编辑器文本插入/替换、滚动进度
- 用 `ctx.theme.variable()` 取色，自动适配亮/暗与第三方主题

### ❌ 不可以 / ⚠️ 自负区

| 限制 | 原因 |
|---|---|
| 依赖 Morz 内部实现：`window.app`、编辑器外壳实例、私有 state field、内部类名细节 | 不在契约内，随时可能变；直控请走 `ctx.editor` |
| 创建全屏或覆盖性 DOM | 会让整个界面点不动 |
| 同步阻塞超过一帧（>16ms） | 卡死主线程，浏览器可能直接崩溃 |
| ⚠️ 用 `view()` 直接改编辑器渲染结构（块替换/隐藏行/重排 DOM） | **自负区**：能力上可行，但破坏所见即所得映射与撤销语义，宿主不做兼容保证；文本修改用 `ctx.active`，只读高亮用 `ctx.editor.highlight` |

### 失败隔离

`activate()` 抛错 → 宿主**回滚该插件注册的一切**（命令/面板/状态栏/监听/CM6 扩展），
其他插件与编辑器不受影响；该插件在管理界面标记为未启用，可修正后重试。
**关于扩展内部异常（重要）**：宿主能兜住的是"装载失败"——重配置出错会被捕获。但扩展**运行期**回调（`ViewPlugin.update`、`StateField.update`、装饰构建）在 CodeMirror 事务内部执行，**宿主无法隔离**：抛错会中断当次编辑器更新。请在每个回调里自行 `try/catch` 并静默降级。

### UI 克制（产品规则）

流畅、体验、界面美观是一等公民——插件的 UI 足迹由宿主约束，而不是靠插件自觉：

| 规则 | 行为 |
|---|---|
| 面板默认隐藏 | `ctx.ui.panel` 注册的右栏 tab 默认不出现；用户在右栏空白处右键勾选后才挂载，勾选状态随布局持久化 |
| 状态项默认显示 | `ctx.ui.statusBar` 注册的条目默认出现；用户可在状态栏右键「插件状态项」逐个隐藏。多状态项插件请声明稳定的 `spec.id` |
| 右键二级化 | `ctx.ui.menu` 贡献的菜单项一律收进「插件」二级子菜单，主菜单不随插件数量膨胀 |

这些规则由宿主强制（声明 `defaultVisible: true` 的第三方面板同样默认隐藏）。
插件设计上应该假设"注册即显示"不存在——把入口做成命令 + 面板/状态项，让用户按需开启。

### 性能守护（watchdog）

插件持续占用主线程会被自动归因与处置，监控本身只在插件回调里计时
（应用自身的索引/渲染路径不归因到插件），开销可忽略：

| 阈值 | 值 |
|---|---|
| 单次回调 | > 400ms 记 1 次违规 |
| 累计 | 任一插件 10s 窗口内同步耗时 > 600ms 记 1 次违规 |

- **首次违规**：每会话一次 toast 提醒（带「停用插件」按钮）。
- **第三方插件**：5 分钟内 3 个独立窗口违规 → **自动停用** + toast 说明；
  管理器卡片显示「已自动停用（性能）」徽章，手动重开即恢复。
- **防误伤闸门**：索引进度指示可见时不升级；启动后 15s 冷静期；升级需要跨窗口复现。
- 升级动作全部进入**诊断日志**（本地保存，无远程上报）。

### 遇到卡顿：取证两条路

- **保存现场**：命令面板「Diagnostics: Save Snapshot」（帮助菜单也有）——立即导出
  完整报告（操作轨迹、错误、守护明细、当前主题/插件快照）。
- **记录 60 秒**：命令面板「Diagnostics: Record 60s」——武装低阈值采样（长任务 +
  掉帧 + 内存）抓复现现场，结束自动提示导出。状态栏诊断角标（有记录时亮起）
  点击即这两个入口。只记本机，无远程上报。

---

## 给 AI 的生成模板

把下面这段作为 prompt 前缀，AI 就能一次生成可运行的插件：

```
为 Morz 写一个插件，产出两个文件：

1) manifest.json，字段：id / name / version / description / sdk:1 / permissions
   permissions 只能取 "vault:read" | "vault:write" | "workspace" | "editor:insert" | "editor:highlight" | "editor:direct" | "views" | "settings" | "http"

2) main.js，格式严格为：
   module.exports = { async activate(ctx) { ... } }
   只能使用 ctx.vault / ctx.active / ctx.meta / ctx.ui / ctx.settings / ctx.theme / ctx.editor
   禁止：window.app、DOM 覆盖层、同步长循环；不要用 view.dispatch 改渲染结构（自负区）
   ctx.ui.* 的每个注册要能被宿主自动回收（不用手动清理）

需求：<在这里描述功能>
```

---

## 调试

| 现象 | 排查 |
|---|---|
| 插件列表里有但没反应 | 打开控制台看 `[plugin-manager] load …` 的错误 |
| 命令找不到 | 命令 id 是 `<插件id>:<命令id>`，在命令面板搜插件名 |
| 面板空白 | `render()` 返回了 `undefined`；要 `return` 一个元素 |
| 启动被跳过 | 插件系统是**默认关闭**的；设置 → 第三方插件 → 打开开关 |

---

## 与 Obsidian 兼容层的关系

宿主内部有两套通道，但方向不同：

| | Native SDK（本文档） | Compat 层 |
|---|---|---|
| manifest 标记 | `"sdk": 1` | 无（或 `sdk` 缺失） |
| 拿到的 API | `ctx`（窄接口） | `Plugin` 基类 + `window.app` |
| 定位 | 长期维护的插件 | 迁移期的对照工具 |
| 稳定性 | 契约保证 | 冻结的 best-effort，不承诺免改造运行 |
| 适用 | **新插件、准备维护的移植插件** | 临时跑旧代码、对照行为 |

Compat 层只覆盖一部分常用 API（L1/L2 的一部分），**L3/L4 不保证**：编辑器装饰、
`.view-content` DOM、CM5 的 `registerCodeMirror`、`registerEditorSuggest`、复杂
workspace 布局都不能依赖。迁移的最终产物必须是用 `ctx` 重写的 Native SDK 插件；
兼容层只是帮你把旧代码先跑起来、对照行为。具体流程见
[`PLUGIN-DEVELOPMENT.md`](./PLUGIN-DEVELOPMENT.md#从-obsidian-插件迁移)。
