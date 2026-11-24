# Morz 插件开发 / Obsidian 迁移：给 AI 的速查

> 先读这一页，再动手。完整文档：
> - 插件开发：https://morz.app/docs/plugin-development
> - API 全表：https://morz.app/docs/plugin-sdk
> - 主题开发：https://morz.app/docs/theme-development
- 插件 / 主题发布：https://morz.app/docs/publishing

## 0. 一句话

Morz 插件 = `manifest.json` + `main.js`。`main.js` 导出 `activate(ctx)` / `deactivate()`，
只通过 `ctx` 使用宿主能力；没有 `import`，没有 `require`，不需要构建步骤。

## 1. 先判断任务

- **写新插件**：直接用 Native SDK。
- **迁移 Obsidian 插件**：目标是**转换**，不是让原插件在 Morz 里原样运行。Obsidian
  兼容层已冻结，只用于对照旧行为；最终产物必须是用 `ctx` 重写的 Native SDK 插件。

## 2. 硬约束（违反即失败）

- 只能使用 `ctx`；禁止 `window.app`、编辑器实例、私有 state、内部类名。
- 禁止 `.view-content`、`.cm-editor` / `.cm-content` 的全局 DOM 补丁。
- 禁止 Node / Electron（`fs`、`path`、`child_process`、`electron.remote`）。
- 禁止全屏/覆盖性 DOM；禁止同步阻塞超过一帧（>16ms）。
- 所有注册由宿主自动回收；插件自建 DOM、外部监听、定时器用
  `ctx.lifecycle.add` / `ctx.onDispose` 清理。
- 异步错误自己 `catch`，用 `ctx.ui.notice(..., { kind: "error" })` 告诉用户。

## 3. 输出契约

### manifest.json

```json
{
  "id": "my-plugin",
  "name": "我的插件",
  "version": "1.0.0",
  "description": "一句话说明",
  "author": "作者",
  "sdk": 1,
  "permissions": ["vault:read", "workspace"],
  "network": ["https://api.example.com/*"]
}
```

权限按最小集取：

`vault:read` · `vault:write` · `workspace` · `editor:insert` · `editor:highlight` ·
`editor:direct` · `views` · `settings` · `http`

### main.js

```js
module.exports = {
  async activate(ctx) {
    // 注册命令 / 面板 / 设置 / 事件
  },
  deactivate() {
    // 只清理插件自己创建、ctx 不管的资源
  },
};
```

## 4. `ctx` 速查

| 要做什么 | 用 |
|---|---|
| 读写文件 / 监听文件变化 | `ctx.vault.read/write/create/rename/remove/on` |
| 当前文档文本 / 选区 / 光标 | `ctx.active` |
| 当前文档切换 / 滚动 | `ctx.active.onPathChange/onScroll` |
| 标题 / 反链 / 出链 / 全库元数据 | `ctx.meta.headings/backlinks/outgoing/pages/index` |
| 命令 / Ribbon / 状态栏 | `ctx.ui.command/ribbon/statusBar` |
| 右栏面板 / 浮动卡 | `ctx.ui.panel/floating` |
| 通知 / 剪贴板 | `ctx.ui.notice/copy` |
| 右键菜单 / 文件树菜单 | `ctx.ui.menu/fileTreeMenu` |
| 设置表单 | `ctx.settings.defineSchema/get/set/onChange` |
| 运行状态 / 缓存 | `ctx.storage` |
| 代码块渲染 | `ctx.markdown.codeBlock` |
| 只读高亮 | `ctx.editor.highlight` |
| 装饰 / keymap / CM6 扩展 | `ctx.editor.registerExtension`（`editor:direct`） |
| 复用内置格式命令 | `ctx.editor.runCommand` |
| 主区域自定义视图 | `ctx.views.register` |
| 打开文档 | `ctx.openFile` |
| 网络请求 | `ctx.http.request/json`（REST/JSON 文本） |
| 每日笔记 | `ctx.daily` |
| 图床上传器 | `ctx.images.registerUploader` |
| 定时器 / 防抖 / 节流 | `ctx.timers` |
| 主题变量 / 暗色判断 | `ctx.theme` |

## 5. Obsidian → Morz 映射

| Obsidian | Morz | 备注 |
|---|---|---|
| `Plugin.onload/onunload` | `activate(ctx)` / `deactivate()` | 清理用 `ctx.lifecycle` |
| `addCommand` | `ctx.ui.command` | `checkCallback` 在 `run` 里判断 |
| `addRibbonIcon` | `ctx.ui.ribbon` | — |
| `addStatusBarItem` | `ctx.ui.statusBar` | 用返回句柄 `refresh()` |
| `addSettingTab` / `Setting` | `ctx.settings.defineSchema` | 不移植 Obsidian 表单 DOM |
| `Modal` | `ctx.ui.floating` / `panel` / `settings.openForm` | 没有通用 Modal |
| `Notice` | `ctx.ui.notice` | — |
| `loadData/saveData` | `ctx.settings` + `ctx.storage` | 配置与状态分开 |
| `app.vault.*` | `ctx.vault.*` | 不用 `Vault.adapter` |
| `app.metadataCache.*` | `ctx.meta.*` | 不暴露原始 cache 形状 |
| `app.workspace.getActiveFile` | `ctx.active.path()` | — |
| `app.workspace.openLinkText` | `ctx.openFile` | — |
| `registerMarkdownCodeBlockProcessor` | `ctx.markdown.codeBlock` | 导出管线也会调用 |
| `registerEditorExtension`（CM6） | `ctx.editor.registerExtension` | 运行期异常自己 catch |
| `Editor` 文本操作 | `ctx.active` | 不改 DOM 选区 |
| `requestUrl` | `ctx.http` | 仅 REST/JSON 文本；Web 受 CORS |
| `moment` | 自带日期库 / 原生 `Date` | SDK 没有 `require` |
| `Platform` / `isDesktopOnly` | 无对应 | 不要保留平台分支 |
| `registerCodeMirror`（CM5） | 不支持 | 用 CM6 重写或放弃 |
| `registerEditorSuggest` | 不支持 | 用 CM6 autocomplete 重写或放弃 |
| `registerMarkdownPostProcessor` | 不支持 | 改成代码块/视图或放弃 |
| `electron` / Node 模块 | 不支持 | 重写或放弃 |

## 6. 转换流程

1. **列功能**：命令、Ribbon、状态栏、面板/视图、设置、代码块、编辑器行为、数据、网络。
2. **逐项映射**：按上表标“直译 / 部分 / 重写 / 不支持”；不支持的不要用兼容层硬绕。
3. **写 manifest**：`sdk: 1` + 最小权限。
4. **写 activate**：设置 → 命令/UI → 数据/网络 → 编辑器，按这个顺序装配。
5. **重写编辑器行为**：只读高亮用 `ctx.editor.highlight`；装饰/keymap 用 CM6 扩展；
   文本修改用 `ctx.active`。
6. **重写设置/面板**：`ctx.settings.defineSchema`、`ctx.ui.panel` / `floating`；
   不自建全屏 Modal。
7. **验收**：按用户可见流程跑，不看“能加载”。

## 7. 不要迁移的情况

- 核心依赖 CM5、`registerEditorSuggest`、`.view-content` / `.cm-*` DOM 结构；
- 核心依赖 `registerMarkdownPostProcessor` 的全局改写；
- 核心依赖任意 workspace leaf/split/拖拽布局；
- 核心依赖 Node/Electron、二进制/流式/多部分上传下载；
- `isDesktopOnly` 且没有 Web 替代路径；
- 迁移成本高于重写。

## 8. 验收清单

- [ ] 命令能搜到并执行；Ribbon/状态栏入口正常，卸载后消失；
- [ ] 面板/视图能开、刷新、关闭，不遮挡编辑器；
- [ ] 设置能保存、重载恢复；密钥不落明文；
- [ ] 文件读写、元数据、代码块渲染符合预期；
- [ ] 高亮/扩展生效，不破坏撤销与所见即所得；
- [ ] 断网/报错有用户可见提示，不白屏；
- [ ] 停用后无残留监听、定时器、DOM、编辑器扩展；
- [ ] 桌面与 Web（如目标包含）都跑过主要流程。

## 9. 参考

- 完整插件开发：https://morz.app/docs/plugin-development
- API 全表：https://morz.app/docs/plugin-sdk
- 主题开发：https://morz.app/docs/theme-development
- 插件 / 主题发布：https://morz.app/docs/publishing
- 公开插件示例：https://github.com/cumany/morz-reading-progress
- 图床插件示例：https://github.com/cumany/morz-image-host
