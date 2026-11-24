# 插件与主题发布教程

本文面向第一次发布 Morz 插件/主题的作者。当前有两条收录路径：

1. **官方索引**：向 `cumany/Morz` 的 `registry/index.json` 提 PR；合并后发布到 gh-pages，
   客户端默认市场读取；市场统一展示，不显示来源徽章。适合希望进入官方精选的插件。
2. **社区索引**：给仓库加 topic `morz-plugin` / `morz-theme`，`cumany/morz-registry`
   的扫描器每天扫一次；先做确定性校验，配置 LLM key 时再做 AI 审核，通过后生成社区索引。
   客户端新版本默认读取社区索引；市场统一展示，按 stars / 最近更新时间排序。旧版本仍只读官方索引。

> 扫描器 cron 是每天 `03:00 UTC`（北京 11:00）；GitHub 的 scheduled workflow
> 可能排队延后几小时，最近实际在北京时间傍晚跑完。以扫描报告为准，不要按固定钟点等。

## 0. 先选类型

| | 插件 | 主题 |
|---|---|---|
| 入口 | `main.js`（导出 `activate`） | `theme.css` |
| 清单 | `manifest.json`（`sdk: 1`） | `manifest.json` |
| 能力 | 命令、面板、设置、读写文件、网络等 | CSS 变量与 `#write` 排版 |
| 适合 | 增加功能 | 换配色/排版 |

插件开发细节见 [插件开发](https://morz.app/docs/plugin-development) 与
[插件 SDK](https://morz.app/docs/plugin-sdk)；主题 CSS 见
[主题开发](https://morz.app/docs/theme-development)。

## 1. 插件：准备仓库

```
morz-my-plugin/
├── manifest.json
├── main.js
├── styles.css        # 可选
├── icon.svg          # 可选，128×128 推荐
└── README.md
```

`manifest.json`：

```json
{
  "id": "morz.my-plugin",
  "name": "我的插件",
  "version": "1.0.0",
  "description": "一句话说明插件做什么",
  "author": "你的名字",
  "sdk": 1,
  "main": "main.js",
  "permissions": ["vault:read", "workspace"],
  "network": ["https://api.example.com/*"],
  "minAppVersion": "0.3.0",
  "icon": "icon.svg"
}
```

- `permissions` 取最小集：`vault:read` / `vault:write` / `workspace` /
  `editor:insert` / `editor:highlight` / `editor:direct` / `views` / `settings` / `http`。
- 用 `http` 时必须写 `network` 允许的域名；首次访问还会让用户确认。
- `minAppVersion` 写你实际测试过的最低版本；低版本客户端会拒绝安装。

`main.js`：

```js
module.exports = {
  async activate(ctx) {
    ctx.ui.command({
      id: "hello",
      name: "打个招呼",
      run: () => ctx.ui.notice("Hello from my plugin"),
    });
  },
  deactivate() {},
};
```

**本地测试**：设置 → 第三方插件 → 安装（选含 `manifest.json` 的目录），
开启插件，确认命令能执行、设置能保存、面板/状态栏正常、停用后没有残留。
发布前至少跑一遍目标平台（桌面 / Web）的主要流程。

## 2. 主题：准备仓库

```
morz-my-theme/
├── manifest.json
├── theme.css
├── theme-dark.css    # 可选，manifest.dark 指向它
├── theme-light.css   # 可选，manifest.light 指向它
├── export.css        # 可选，导出/打印专用
└── preview.jpg       # 建议 16:9，512×288
```

`manifest.json`：

```json
{
  "id": "my-theme",
  "name": "我的主题",
  "version": "1.0.0",
  "author": "你的名字",
  "description": "一句话说明",
  "modes": ["light", "dark"],
  "dark": "theme-dark.css",
  "light": "theme-light.css",
  "export": "export.css",
  "preview": "preview.jpg",
  "minAppVersion": "0.3.0"
}
```

- `theme.css` 是主 CSS；明暗成对时用 `dark` / `light` 指向补充文件。
- `export` 可选，只影响导出/打印。
- `preview` 放仓库根目录，不要写绝对路径或 `..`。

**本地测试**：设置 → 外观 → 主题文件夹，把主题目录放进去并刷新；检查亮/暗、
窄窗口、正文/标题/列表/表格/Callout/代码块，以及导出 HTML/PDF 的排版。

## 3. 打 tag 与 Release

1. 确认 `manifest.json` 的 `version` 是 semver，例如 `1.0.0`。
2. 提交并推送，打 tag：`git tag v1.0.0 && git push origin v1.0.0`。
3. 在 GitHub 创建 Release（tag 选 `v1.0.0`）。插件/主题不需要上传构建产物，
   客户端会从仓库该 tag 拉 `manifest.json` + 入口文件。

不要复用或强推已发布的 tag；更新版本请打新 tag。

## 4. 计算 sha256

客户端会在提供 `sha256` 时逐字节校验下载内容。建议至少提供入口文件的哈希：

Linux / macOS：

```bash
sha256sum manifest.json main.js
# 主题：sha256sum manifest.json theme.css
```

Windows：

```powershell
certutil -hashfile manifest.json SHA256
certutil -hashfile main.js SHA256
```

## 5. 提交 registry PR

1. Fork [cumany/Morz](https://github.com/cumany/Morz)。
2. 编辑 `registry/index.json`，在 `plugins` 或 `themes` 数组末尾加一条。
3. 提交 PR；CI 会运行 `node registry/validate.mjs`，校验字段和格式。
4. 维护者会做基本审查（manifest、权限、入口）；合并后 `publish-registry.yml` 把索引发布到
   gh-pages，客户端在下一次刷新索引后可见（本地缓存 6 小时）。

### 插件条目示例

```json
{
  "id": "morz.my-plugin",
  "name": "我的插件",
  "description": "一句话说明插件做什么",
  "author": "你的名字",
  "repo": "you/morz-my-plugin",
  "version": "1.0.0",
  "tag": "v1.0.0",
  "minAppVersion": "0.3.0",
  "permissions": ["vault:read", "workspace"],
  "icon": "icon.svg",
  "changelog": "首个版本：……",
  "homepage": "https://github.com/you/morz-my-plugin",
  "sha256": {
    "manifest": "……",
    "main": "……"
  }
}
```

### 主题条目示例

```json
{
  "id": "my-theme",
  "name": "我的主题",
  "description": "一句话说明",
  "author": "你的名字",
  "repo": "you/morz-my-theme",
  "version": "1.0.0",
  "tag": "v1.0.0",
  "modes": ["light", "dark"],
  "preview": "preview.jpg",
  "changelog": "首个版本：……",
  "homepage": "https://github.com/you/morz-my-theme",
  "sha256": {
    "theme": "……"
  }
}
```

字段说明：

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✅ | 全市场唯一，小写字母/数字/`.`/`_`/`-` |
| `name` | ✅ | 市场显示名 |
| `repo` | ✅ | `owner/repo`，公开 GitHub 仓库 |
| `version` | ✅ | semver；更新检测以此为准 |
| `tag` / `commit` | ✅（二选一） | 安装固定到该版本；建议用 tag |
| `description` / `author` | 建议 | 市场卡片展示 |
| `permissions` | 插件建议 | 最小权限；与实际调用一致 |
| `minAppVersion` | 可选 | 低于此版本的客户端拒绝安装 |
| `icon` / `preview` | 可选/建议 | 仓库相对路径；不要 `/` 开头或含 `..` |
| `sha256` | 建议 | 插件用 `manifest` / `main`；主题用 `theme` |
| `changelog` | 可选 | 更新时展示的版本说明 |
| `trust` | 不要填 | PR 里只允许 `community`；信任级别由索引来源决定 |

## 6. 更新版本

1. 改 `manifest.json` 的 `version`；
2. 打新 tag、发新 Release；
3. 重新计算 `sha256`；
4. 向 registry 提 PR，更新该条目的 `version` / `tag` / `sha256` / `changelog`。

用户端的「检查更新」会对比索引版本并提示升级；安装固定在新 tag，不跟随默认分支。

## 7. 权限与安全

- 权限按实际使用取最小集；声明与实际调用不符会被拒绝。
- `http` 必须配 `network` 域名白名单；密钥用 `ctx.settings` 的 `secret` 字段，
  不要写进文档或仓库。
- 不要使用 `eval` / `new Function`、运行时加载远程脚本、Node/Electron 模块。
- **官方索引**：CI 校验 + 维护者人工审查；**社区索引**：确定性校验 + AI 审核
  （配置了 LLM key 时），`reject` 或审核失败不收录。AI 审核是辅助门禁，不是安全保证；
  市场统一展示，不显示来源徽章；安装前请自己确认权限。
- 发现问题可以在插件市场卡片查看仓库来源并举报；确认后进入 denylist。

## 8. 常见拒绝与排查

| 现象 | 原因 |
|---|---|
| CI 报 `id duplicates` | id 已被其它条目占用 |
| `repo duplicates` | 同一仓库在同一类目重复 |
| `version must be semver` | 版本写成 `1.0`（缺修订号）；`version` 用 `1.0.0`，tag 用 `v1.0.0` |
| `needs tag or commit` | 没钉版本，客户端无法稳定安装 |
| `icon` / `preview` 报路径 | 用了 `/` 开头、`..` 或非 https/data 的 URL |
| 安装后命令没出现 | `main.js` 没导出 `activate`，或权限/入口路径不对 |
| 主题不生效 | `theme` 路径不对，或 CSS 选择器没按主题约定写 |
| 用户看不到更新 | 索引缓存 6 小时；确认 registry 已合并并发布 |

## 9. 现状与后续

- **官方索引**：PR + CI 校验 + 维护者审查 + registry 发布；客户端默认读取，显示「官方」。
- **社区索引**：`cumany/morz-registry` 每天扫 topic，确定性校验 + AI 审核后生成；
  客户端新版本默认读取；市场统一展示，按 stars / 最近更新时间排序，同 id / 同仓库官方优先。
- **后续**：更多信任信号、社区索引托管优化；会另行公告。
