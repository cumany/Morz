<p align="center"><img src="assets/hero.jpg" width="880" alt="Morz 界面：所见即所得编辑、双向链接与知识管理"></p>

# Morz · 墨与纸

[English](README.md) · **简体中文**

所见即所得的 Markdown 编辑器：**桌面端用 Rust + Tauri 2 构建，不是 Electron**——安装包约 9 MB，冷启动实测 2.93 秒（万篇工作区）。

写作手感对标 Typora：写的时候就是最终排版，光标落下去仍然是 Markdown 源码，不用在源码和预览之间来回切。

知识管理对标 Obsidian：`[[双向链接]]`、反向链接、标签、属性（frontmatter）、大纲与图谱；兼容 Obsidian 的 Markdown 语法（callout、嵌入、属性），并提供插件兼容层。

笔记就是普通 `.md` 文件，放在你自己的文件夹里：

- 不注册、不登录，断网可用
- 不锁定格式，随时用别的工具打开
- 本地功能免费，无账号也能用全部核心能力

## 功能

| | |
|---|---|
| 写作 | 所见即所得、表格（可计算 / 排序）、代码块、数学公式、Mermaid、脚注、标注 |
| 整理 | 双向链接与反链、标签、属性卡、大纲、局部 / 全局图谱、收藏与最近文件 |
| 导出 | PDF（页码、目录、可点击书签）、Word、HTML；表格可复制为图片 |
| 扩展 | 插件市场与主题市场（阅读进度、智能筛选、Blue Topaz） |
| 多端 | Windows / macOS / Linux / Android，浏览器可直接使用 |
| 数据 | 普通 `.md`、回收站与文件历史、离线优先 |

## 安装

内测阶段，安装包不从这里分发：

- 网页版直接可用：<https://app.morz.app>
- 桌面端（Windows / macOS / Linux）与 Android 通过内测链接获取：<https://morz.app>
- 已安装版本从 **帮助 → 检查更新** 升级（国内镜像优先，GitHub 兜底）

## 文档

- [帮助中心](docs/manual/README.md) — 开始使用、写作、整理、导出、设置与常见问题
- [与 Obsidian / Typora / 幕布的对比](docs/manual/compare.md) — 能力、取舍，以及什么情况下不该选 Morz
- [插件开发](docs/PLUGIN-DEVELOPMENT.md) 与 [插件 SDK](docs/PLUGIN-SDK.md)
- [主题开发](docs/THEME-DEVELOPMENT.md)、[Blue Topaz](docs/BLUE-TOPAZ.md)
- [发布规范](docs/PUBLISHING.md) — 插件 / 主题自助发布，不需要 PR

## 插件与主题

- 插件市场：**设置 → 第三方插件**
- 主题市场：**设置 → 外观 → 主题市场**
- 索引与校验值在本仓库的 `registry/`，客户端安装时逐文件校验 sha256

## 关于这个仓库

Morz 是 Cuman 的独立项目，与 Typora、Obsidian 没有隶属关系。

这里是 Morz 的**公开主页**：文档、插件 / 主题注册表，以及（出内测后）发行包。源码在私有仓库维护，本仓库不含源码树与构建脚本。

## 许可

本仓库的文档与注册表采用 MIT 许可；Morz 应用本体为专有软件，详见 [LICENSE](LICENSE) 与 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。
