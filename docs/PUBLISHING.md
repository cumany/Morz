# 插件 / 主题发布规范

Morz 插件市场采用 **DSH 自发布**模式：作者给仓库打上 topic 标签即可上架，
**无需 PR、无需排队等待审核**。市场索引由官方扫描器每天自动生成并发布。

## 发布三步

1. **准备仓库**：根目录放 `manifest.json` + 入口文件（插件 `main.js`，主题 `theme.css`）
2. **打版本 tag**：`v1.0.0` 格式，与 `manifest.json` 的 `version` 一致，并发 GitHub Release
3. **加 topic**：插件仓库加 `morz-plugin`，主题仓库加 `morz-theme`

完成——官方扫描器每天 03:00 UTC 扫描一遍，通过校验的仓库自动进入社区索引，
用户在 **设置 → 插件 / 主题市场** 即可搜到并一键安装。

## manifest.json 字段

### 插件

```json
{
  "id": "my-plugin",
  "name": "我的插件",
  "version": "1.0.0",
  "sdk": 1,
  "author": "你的名字",
  "description": "一句话说明插件做什么",
  "permissions": ["vault:read", "workspace"],
  "minAppVersion": "0.2.0",
  "icon": "icon.svg"
}
```

### 主题

```json
{
  "id": "my-theme",
  "name": "我的主题",
  "version": "1.0.0",
  "author": "你的名字",
  "description": "一句话说明",
  "modes": ["light", "dark"],
  "preview": "preview.jpg"
}
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✅ | 全市场唯一；小写字母/数字/`.`/`_`/`-` |
| `name` | ✅ | 市场显示名 |
| `version` | ✅ | semver；更新检测以此为准 |
| `sdk` | 插件 ✅ | 固定 `1` |
| `permissions` | 插件建议 | 见下方权限词表 |
| `main` | 插件可选 | 入口文件路径，默认 `main.js` |
| `theme` | 主题可选 | CSS 路径，默认 `theme.css` |
| `modes` | 主题建议 | `["light"]` / `["dark"]` / `["light","dark"]` |
| `icon` | 插件可选 | 市场卡片图标；128×128 推荐（列表显示 24px） |
| `preview` | 主题建议 | 16:9 截图，512×288 推荐 |
| `minAppVersion` | 可选 | 低于此版本的 Morz 会提示先升级 |

图标/截图放在仓库根目录（或 manifest 声明的路径），**不要**上传到索引仓库。

## 自动审核规则

扫描器做**确定性校验**——以下情况会被拒绝进入索引：

| 级别 | 规则 |
|---|---|
| 拒绝 | `manifest.json` 不是合法 JSON、缺 id/name/version、version 非 semver |
| 拒绝 | 插件缺 `sdk: 1` |
| 拒绝 | 入口文件缺失、超过 5MB、插件未导出 `activate` |
| 拒绝 | **声明了 `vault:read` 但代码使用了 `vault.write/delete/create` 写操作**（权限对账） |
| 拒绝 | 命中确定性危险模式：`eval(`、`new Function(` |
| 标记 | 未知权限名、外部域名清单（写入扫描报告，供人工复核） |

通过的条目自动携带 `sha256` 校验和——**安装时客户端逐字节校验**，
扫描时审到的内容就是用户下载到的内容，之后任何改动都需要通过新的扫描。

## 更新版本

1. 改 `manifest.json` 的 `version` → 打新的 `v*` tag → 发 Release
2. 完事——下一次扫描自动收录新版本，索引同步更新，**同样无需 PR**

用户端「检查更新」对比索引版本后提示升级；安装永远钉在索引声明的 tag/commit 上。

## 权限词表

| 权限 | 能力 |
|---|---|
| `vault:read` | 读取库内文档 |
| `vault:write` | 创建/修改/删除库内文档 |
| `workspace` | 工作区（文件夹）信息 |
| `views` | 注册侧栏/全页面板 |
| `editor:insert` | 向编辑器插入内容 |
| `settings` | 读写自身设置 |

声明与实际调用不符会被自动审核拒绝；超额权限会降低用户信任。

## 信任与官方精选

| 层级 | 来源 | 说明 |
|---|---|---|
| `community` | 自动扫描 | 全部社区条目；通过确定性校验即上架 |
| `official` | 官方索引 | Morz 团队出品（如阅读进度、智能筛选、蓝托帕石） |
| `verified` | 官方人工授予 | 通过人工代码审核的社区插件 |

官方精选索引（`cumany/Morz` 的 registry）人工策展，与社区索引并存展示。
发现恶意或低质量插件？在插件市场卡片查看仓库来源并举报至 [CONTRIBUTING](../CONTRIBUTING.md) 中的联系方式；
确认后进入 denylist，所有客户端立即下架。举报渠道见 [CONTRIBUTING](../CONTRIBUTING.md#reporting-problems)。

## 中国网络说明

客户端按测速排序的镜像链拉取索引与安装包（GitHub 直连、jsDelivr、社区镜像、官方加速源），
作者无需为国内用户做任何额外配置。

## 完全体：自定义索引源（计划中）

市场机制支持用户添加任意第三方索引 URL（类似 npm 的 scope registry）。
当前版本默认仅官方+社区双索引；自定义索引源的界面在后续版本开放。
