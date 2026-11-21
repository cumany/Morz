import{r as e}from"./rolldown-runtime-BCiCTKAo.js";import{D as t,Zt as n,_ as r,on as i,p as a,un as o}from"./stats-BWwxfo1Y.js";function s(e){if(typeof e!=`string`)return`/`;let t=Array.from(e.trim());if(!t.length)return`/`;let n=t[0];return/[\s\p{L}\p{N}]/u.test(n)?`/`:n}function c(e,t=`/`){if(!Array.isArray(e))return[];let n=s(t),r=new Map;for(let t of e){if(!t||typeof t!=`object`)continue;let e=t,i=typeof e.trigger==`string`?e.trigger.trim():``;for(;i.startsWith(n);)i=i.slice(n.length).trim();if(!i||i.length>32||/\s/.test(i)||i.includes(n))continue;let a=typeof e.command==`string`?e.command.trim():``;if(!a||a.length>200)continue;let o=typeof e.name==`string`?e.name.trim().slice(0,60):``,s=i.toLowerCase(),c=r.get(s),l=o?{trigger:i,command:a,name:o}:{trigger:i,command:a};(c||r.size<50)&&r.set(s,l)}return[...r.values()]}var l=/[\s([{（【《「『〈“‘"'`]/u;function u(e,t){let n=s(t);if(!e)return null;let r=e.lastIndexOf(n);if(r<0)return null;let i=r===0?``:e[r-1];if(r>0&&!l.test(i))return null;let a=e.slice(r+n.length);return a.length>40||/\s/.test(a)||a.includes(n)?null:{from:r,query:a}}var ee=[`top`,`fixed`,`following`],te=e=>e===`top`?o(`顶部`,`Top`):e===`fixed`?o(`底部`,`Bottom`):o(`浮动`,`Floating`),ne=e=>e===`outline`?o(`大纲`,`Outline`):o(`默认`,`Default`),d=`morz.toolbarProfile`;function f(){try{return localStorage.getItem(d)===`outline`?`outline`:`default`}catch{return`default`}}function re(e){try{localStorage.setItem(d,e)}catch{}}function ie(e){return p(e.prefs,f())}function p(e,t=`default`){return t===`outline`?n?e.toolbarOutlineMobile:e.toolbarOutline:n?e.toolbarMobile:e.toolbar}var m=e=>({type:`command`,id:e}),h=()=>({type:`submenu-item`,submenu:{type:`submenu`,name:o(`标题`,`Heading`),icon:`heading`,items:[m(`para.h1`),m(`para.h2`),m(`para.h3`),m(`para.h4`),m(`para.h5`),m(`para.h6`),{type:`separator`},m(`para.paragraph`)]}});function g(){return[m(`edit.undo`),m(`edit.redo`),{type:`separator`},h(),m(`fmt.strong`),m(`fmt.emphasis`),m(`fmt.strike`),m(`fmt.highlight`),m(`fmt.code`),m(`fmt.link`),{type:`separator`},m(`para.bulletList`),m(`para.orderedList`),m(`para.taskList`),m(`para.outdent`),m(`para.indent`),m(`para.callout`),m(`para.quote`),m(`edit.softBreak`),{type:`separator`},m(`para.table`),m(`para.code`),m(`para.math`),m(`fmt.imageLocal`),{type:`submenu-item`,submenu:{type:`submenu`,name:`更多`,icon:`more`,items:[m(`fmt.underline`),m(`fmt.superscript`),m(`fmt.subscript`),m(`fmt.inlineMath`),m(`fmt.comment`),m(`fmt.clear`),{type:`separator`},m(`para.hr`),m(`para.footnote`),m(`para.toc`),m(`para.yaml`),{type:`separator`},m(`edit.emoji`),m(`edit.find`),m(`view.mode`),{type:`separator`},{type:`submenu-item`,submenu:{type:`submenu`,name:o(`整理`,`Tidy`),icon:`sparkles`,items:[m(`format.typography`),m(`format.trimLineEnds`),m(`format.collapseBlankLines`),m(`format.removeBlankLines`),m(`format.padTables`)]}},m(`view.focus`),m(`view.fullscreen`)]}}]}function _(){return[m(`edit.undo`),m(`edit.redo`),m(`fmt.clear`),m(`para.h2`),m(`para.h3`),{type:`submenu-item`,submenu:{type:`submenu`,name:o(`标题`,`Heading`),icon:`heading`,items:[m(`para.h1`),m(`para.h4`),m(`para.h5`),m(`para.h6`),{type:`separator`},m(`para.paragraph`)]}},m(`fmt.strong`),m(`fmt.emphasis`),m(`fmt.highlight`),m(`para.table`),m(`fmt.imageLocal`),m(`para.toc`),m(`para.bulletList`),m(`para.orderedList`),m(`para.taskList`),m(`para.callout`),m(`para.quote`),{type:`submenu-item`,submenu:{type:`submenu`,name:o(`格式`,`Format`),icon:`type`,items:[m(`fmt.strike`),m(`fmt.code`),m(`fmt.superscript`),m(`fmt.subscript`),m(`fmt.inlineMath`),m(`para.footnote`),m(`para.hr`),m(`para.math`),m(`fmt.underline`),m(`fmt.link`)]}},m(`fmt.comment`),m(`para.yaml`),m(`edit.emoji`),m(`para.code`),m(`view.focus`),m(`view.fullscreen`),{type:`command`,id:`view.readingMode`,pinnedRight:!0}]}function v(){return[{type:`command`,id:`edit.undo`,pinned:!0},{type:`command`,id:`edit.redo`,pinned:!0},m(`fmt.strong`),m(`para.bulletList`),m(`fmt.imageLocal`),h(),{type:`submenu-item`,submenu:{type:`submenu`,name:o(`格式`,`Format`),icon:`type`,items:[m(`fmt.emphasis`),m(`fmt.strike`),m(`fmt.highlight`),m(`fmt.code`),m(`fmt.link`),m(`para.callout`),m(`para.quote`),m(`edit.softBreak`),m(`para.taskList`),m(`fmt.clear`)]}},{type:`submenu-item`,submenu:{type:`submenu`,name:o(`插入`,`Insert`),icon:`plus`,items:[m(`para.table`),m(`para.code`),m(`para.math`),{type:`separator`},m(`para.hr`),m(`para.footnote`),m(`edit.emoji`),m(`view.commandPalette`)]}}]}function y(){return[m(`fmt.strong`),m(`fmt.emphasis`),m(`fmt.strike`),m(`fmt.highlight`),m(`fmt.code`),m(`fmt.link`),{type:`separator`},{type:`submenu-item`,submenu:{type:`submenu`,name:o(`格式`,`Format`),icon:`type`,items:[m(`fmt.underline`),m(`fmt.superscript`),m(`fmt.subscript`),m(`fmt.inlineMath`),m(`fmt.comment`),m(`fmt.clear`)]}},{type:`submenu-item`,submenu:{type:`submenu`,name:o(`插入`,`Insert`),icon:`plus`,items:[m(`para.table`),m(`para.code`),m(`para.math`),{type:`separator`},m(`para.hr`),m(`para.footnote`),m(`para.toc`),m(`edit.emoji`)]}}]}function b(){return[m(`fmt.strong`),m(`fmt.emphasis`),m(`fmt.highlight`),m(`fmt.link`),{type:`submenu-item`,submenu:{type:`submenu`,name:o(`格式`,`Format`),icon:`type`,items:[m(`fmt.strike`),m(`fmt.code`),m(`fmt.inlineMath`),m(`fmt.comment`),m(`fmt.clear`)]}}]}function x(e=!1){let t={type:`submenu-item`,submenu:{type:`submenu`,name:o(`文字`,`Text`),icon:`type`,items:[m(`fmt.strong`),m(`fmt.emphasis`),m(`fmt.strike`),m(`fmt.code`),m(`fmt.highlight`),m(`fmt.link`)]}};return[m(`edit.undo`),m(`edit.redo`),m(`para.indent`),m(`para.outdent`),m(`edit.softBreak`),m(`list.newSibling`),m(`list.newChild`),m(`fmt.imageLocal`),t,m(`list.fold`),m(`list.unfold`),m(`outline.zoomIn`)]}function S(e=!1){return{top:{enabled:!1,items:x(e)},fixed:{enabled:!0,items:x(e)},following:{enabled:!1,items:[]},iconSize:18,layout:`full`,fixedStyle:`formatbar`,background:``}}function C(e=!1){return{top:{enabled:!e,items:e?v():_()},fixed:{enabled:e,items:e?v():g()},following:{enabled:!1,items:e?b():y()},iconSize:18,layout:`full`,fixedStyle:`formatbar`,background:``}}function w(e){return JSON.parse(JSON.stringify(e))}function ae(e,t=!1,n=`default`){return w(n===`outline`?x(t):t?e===`following`?b():v():e===`top`?_():e===`following`?y():g())}function T(e,t=!1,n=`default`){let r=n===`outline`?S(t):C(t),i=e&&typeof e==`object`?e:{},a=e=>{let t=i[e],n=t&&typeof t==`object`?t:{};return{enabled:typeof n.enabled==`boolean`?n.enabled:r[e].enabled,items:E(n.items,r[e].items)}},o=i.centered,s=i.layout===`left`||i.layout===`center`||i.layout===`full`?i.layout:o===!0?`center`:`full`;return{top:a(`top`),fixed:a(`fixed`),following:a(`following`),iconSize:typeof i.iconSize==`number`&&Number.isFinite(i.iconSize)?Math.min(28,Math.max(14,i.iconSize)):r.iconSize,layout:s,fixedStyle:i.fixedStyle===`standard`?`standard`:`formatbar`,background:typeof i.background==`string`?i.background.trim():r.background}}function E(e,t){if(!Array.isArray(e))return w(t);let n=[];for(let t of e){if(!t||typeof t!=`object`)continue;let e=t,r=e.pinnedRight===!0?{pinnedRight:!0}:e.pinned===!0?{pinned:!0}:{};if(e.type===`separator`)n.push({type:`separator`});else if(e.type===`command`&&typeof e.id==`string`&&e.id){let t={type:`command`,id:e.id,...r};typeof e.icon==`string`&&e.icon&&(t.icon=e.icon),n.push(t)}else if(e.type===`custom`&&e.command&&typeof e.command==`object`){let t=e.command;typeof t.id==`string`&&typeof t.name==`string`&&n.push({type:`custom`,command:t,...r})}else if(e.type===`submenu-item`&&e.submenu&&typeof e.submenu==`object`){let t=e.submenu;if(typeof t.name!=`string`||!t.name)continue;n.push({type:`submenu-item`,...r,submenu:{type:t.type===`row`?`row`:`submenu`,name:t.name,...typeof t.icon==`string`&&t.icon?{icon:t.icon}:{},items:E(t.items,[])}})}}return n}var oe=8192;function D(e){return e===`1`||e===`true`||e===`yes`}function se(e){let t;try{t=new URL(e.trim())}catch{return{ok:!1,reason:`not-uri`}}if(t.protocol!==`morz:`)return{ok:!1,reason:`not-uri`};let n=(t.hostname||t.pathname.replace(/^\/+/,``)).toLowerCase(),r=t.searchParams,i=r.get(`body`)??``,a=D(r.get(`clipboard`));if(a&&i)return{ok:!1,reason:`conflict`};switch(n){case`open`:{let e=(r.get(`path`)??``).trim(),t=(r.get(`heading`)??``).trim(),n=(r.get(`block`)??``).trim();return{ok:!0,action:{kind:`open`,path:e||void 0,heading:t||void 0,block:n||void 0}}}case`new`:return i.length>8192?{ok:!1,reason:`too-long`}:{ok:!0,action:{kind:`new`,title:(r.get(`title`)??``).trim(),body:i,folder:(r.get(`folder`)??``).trim(),daily:D(r.get(`daily`)),clipboard:a}};case`append`:return i.length>8192?{ok:!1,reason:`too-long`}:{ok:!0,action:{kind:`append`,path:(r.get(`path`)??``).trim(),daily:D(r.get(`daily`)),body:i,clipboard:a,create:r.get(`create`)===null||D(r.get(`create`))}};default:return{ok:!1,reason:`unknown-action`}}}function O(e){let t=e.replace(/\\/g,`/`).split(`/`),n=[];for(let e of t)if(e&&e!==`.`){if(e===`..`||/^[A-Za-z]:$/.test(e))return``;n.push(e)}return n.join(`/`)}function ce(e){return/^[A-Za-z]:[\\/]/.test(e)||e.startsWith(`/`)||e.startsWith(`\\\\`)}var le=/^[ \t]{0,3}(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/,ue=/[ \t]\^([A-Za-z0-9-]+)[ \t]*$/,de=/^[ \t]{0,3}(`{3,}|~{3,})/;function*fe(e){let t=e.split(`
`),n=null;for(let e=0;e<t.length;e++){let r=t[e],i=de.exec(r);if(i){let e=i[1][0];n?n===e&&(n=null):n=e}else n||(yield{text:r,number:e+1})}}function pe(e,t){let n=t.trim();if(!n)return null;for(let{text:t,number:r}of fe(e)){let e=le.exec(t);if(e&&e[2].trim()===n)return r}return null}function me(e,t){let n=t.trim().replace(/^\^/,``);if(!n)return null;for(let{text:t,number:r}of fe(e)){let e=ue.exec(t);if(e&&e[1]===n)return r}return null}var k=`/* Morz base content styles (the equivalent of 参考编辑器's base.css). Applies to
   exported/printed documents, which use real HTML elements inside #write. */
:root { --monospace: ui-monospace, "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace; --text-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif; }
#write { max-width: var(--write-max-width, 860px); margin: 0 auto; padding: 30px; font-family: var(--text-font); font-size: var(--write-font-size, 16px); line-height: var(--write-line-height, 1.7); color: var(--text-color); word-wrap: break-word; }
#write > :first-child { margin-top: 0; }
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { position: relative; margin-top: 1rem; margin-bottom: 1rem; font-weight: bold; line-height: 1.4; break-after: avoid-page; }
#write h1 { font-size: 2.25em; } #write h2 { font-size: 1.75em; } #write h3 { font-size: 1.5em; }
#write h4 { font-size: 1.25em; } #write h5 { font-size: 1em; } #write h6 { font-size: 1em; color: #777; }
/* 列表项里的标题是“标题项”：保留字号，去掉文档标题的上下边距 */
#write li > :is(h1, h2, h3, h4, h5, h6) { margin-top: 0; margin-bottom: 0; }
#write p { margin: 0.9em 0; }
#write a { color: var(--link-color, var(--primary-color, #4183c4)); text-decoration: none; }
#write blockquote { margin: 0.8em 0; padding: 0 15px; border-left: 4px solid var(--blockquote-border, #dfe2e5); color: var(--blockquote-color, #777); }
#write ul, #write ol { padding-left: 30px; margin: 0.8em 0; }
#write li > p { margin: 0.2em 0; }
#write .task-list-item { list-style-type: none; }
#write .task-list-item-checkbox { margin: 0 0.4em 0 -1.4em; vertical-align: middle; }
#write code { font-family: var(--monospace); font-size: 0.9em; background: var(--inline-code-bg, #f3f4f4); color: var(--inline-code-color, var(--primary-color, #d14)); padding: 0.12em 0.35em; border-radius: 4px; }
#write pre.md-fences { font-family: var(--monospace); font-size: 0.9em; line-height: 1.5; background: var(--code-block-bg, #f8f8f8); border: 1px solid var(--code-block-border, #e7eaed); border-radius: 3px; padding: 8px 1em; overflow-x: auto; white-space: pre-wrap; break-inside: avoid; }
#write pre.md-fences code { background: transparent; padding: 0; font-size: 1em; color: inherit; }
/* 代码块配色：导出/发布站与编辑器共用同一组 CodeMirror 5 类名，
   变量由主题提供，暗色主题自动跟着换。 */
#write .cm-s-inner .cm-keyword { color: var(--cm-keyword, #a626a4); }
#write .cm-s-inner .cm-atom, #write .cm-s-inner .cm-number { color: var(--cm-number, #986801); }
#write .cm-s-inner .cm-def { color: var(--cm-def, #4078f2); }
#write .cm-s-inner .cm-variable-2, #write .cm-s-inner .cm-variable-3 { color: var(--cm-type, #c18401); }
#write .cm-s-inner .cm-property { color: var(--cm-property, #4078f2); }
#write .cm-s-inner .cm-operator { color: var(--cm-operator, #0184bc); }
#write .cm-s-inner .cm-comment { color: var(--cm-comment, #a0a1a7); font-style: italic; }
#write .cm-s-inner .cm-string { color: var(--cm-string, #50a14f); }
#write .cm-s-inner .cm-string-2 { color: var(--cm-string-2, #0184bc); }
#write .cm-s-inner .cm-meta { color: var(--cm-meta, #c18401); }
#write .cm-s-inner .cm-builtin { color: var(--cm-builtin, #4078f2); }
#write .cm-s-inner .cm-tag { color: var(--cm-tag, #e45649); }
#write .cm-s-inner .cm-attribute { color: var(--cm-attribute, #986801); }
#write .cm-s-inner .cm-header { color: var(--cm-header, #e45649); font-weight: bold; }
#write .cm-s-inner .cm-error { color: #f00; }
#write .cm-s-inner .cm-positive { color: #22863a; } #write .cm-s-inner .cm-negative { color: #b31d28; }
#write table { border-collapse: collapse; width: 100%; margin: 0.8em 0; break-inside: auto; }
#write table th, #write table td { border: 1px solid var(--table-border-color, #dfe2e5); padding: 6px 13px; }
#write table tr:nth-child(2n) { background: var(--table-stripe-bg, #f8f8f8); }
#write tr { break-inside: avoid; }
#write hr { height: 2px; padding: 0; margin: 16px 0; background: var(--hr-color, #e7e7e7); border: 0; }
#write img { max-width: 100%; height: auto; }
#write .md-image-figure { display: flex; flex-direction: column; width: fit-content; max-width: 100%; }
#write .md-image-figure.is-center { align-items: center; margin: 4px auto 10px; }
#write .md-image-figure.is-right { align-items: flex-end; margin: 4px 0 10px auto; }
#write .md-image-figure.is-left { align-items: flex-start; margin: 4px auto 10px 0; }
#write .md-image-figure img { max-width: 100%; height: auto; }
#write .md-image-caption { max-width: 100%; margin-top: 4px; color: var(--text-color, #666); opacity: .82; font-size: .85em; line-height: 1.45; text-align: left; }
#write .md-image-figure.is-center .md-image-caption { text-align: center; }
#write .md-image-figure.is-left .md-image-caption,
#write .md-image-figure.is-right .md-image-caption { width: 100%; text-align: center; }
/* 显式画廊（<!-- morz-gallery -->）在导出里保持并排布局（render/gallery-markers.ts 生成结构）。 */
#write .md-image-gallery { display: grid; grid-template-columns: repeat(var(--gallery-columns, 2), minmax(0, 1fr)); align-items: var(--gallery-align, start); gap: var(--gallery-gap, 8px); margin: 0.8em 0; }
#write .md-image-gallery-cell { display: flex; align-items: center; justify-content: center; overflow: hidden; min-width: 0; min-height: 90px; border-radius: var(--image-radius, 4px); background: color-mix(in srgb, var(--text-color, #333) 5%, transparent); }
#write .md-image-gallery-cell img { display: block; max-width: 100%; max-height: 240px; width: 100%; height: auto; object-fit: var(--gallery-fit, contain); }
/* 橱窗裁切：统一格高 + cover 铺满（导出/PDF 与编辑器同一套变量） */
#write .md-image-gallery.is-cover .md-image-gallery-cell { height: var(--gallery-height, 180px); min-height: 0; }
#write .md-image-gallery.is-cover .md-image-gallery-cell img { height: 100%; max-height: none; object-fit: cover; }
#write mark { background: var(--mark-bg-color, #ffef9e); color: inherit; }
#write kbd { font-family: var(--monospace); font-size: 0.85em; padding: 0.1em 0.4em; border: 1px solid var(--kbd-border, #ccc); border-bottom-width: 2px; border-radius: 4px; background: var(--kbd-bg, #f7f7f7); }
/* 纵向间距必须用 padding：CM6 只测量 widget 自身盒高，margin 不计入，
   否则块后面的所有行点击命中都会整体偏移。 */
#write .md-math-block { text-align: center; padding: 0.8em 0; margin: 0; overflow-x: auto; break-inside: avoid; }
#write .md-diagram { text-align: center; padding: 0.8em 0; margin: 0; break-inside: avoid; }
#write .md-diagram svg { max-width: 100%; height: auto; }
#write .md-toc { margin: 0; }
#write .md-toc-item { display: block; line-height: 1.7; }
#write .md-toc-h2 { margin-left: 2em; } #write .md-toc-h3 { margin-left: 4em; } #write .md-toc-h4 { margin-left: 6em; } #write .md-toc-h5 { margin-left: 8em; } #write .md-toc-h6 { margin-left: 10em; }
#write .footnotes { font-size: 0.9em; color: var(--footnote-color, inherit); }
#write .footnotes-sep { margin-top: 2em; }
/* Callout 的样式不在这里：base.css 也参与实时编辑器的主题注入（applyTheme），
   写在这里的 ID 级选择器会压过 editor.css 的类型色。导出/阅读的卡片视觉由
   exportCss 生成（同一张类型表 + 只作用于导出产物）。 */
#write .md-meta-block { font-family: var(--monospace); font-size: 0.85em; background: var(--meta-block-bg, #f5f5f5); padding: 8px 1em; }
@media print {
  html, body { background: var(--print-bg, #fff) !important; }
  #write { max-width: none; padding: 0; }
  #write h1, #write h2, #write h3 { break-after: avoid-page; }
  #write pre, #write blockquote, #write table, #write img, #write .md-math-block { break-inside: avoid; }
  #write .md-image-gallery, #write .md-image-gallery-cell { break-inside: avoid; }
}


/* macOS 12 等不支持 color-mix 的 WebKit：固定值兜底。支持 color-mix 时不会命中。 */
@supports not (color: color-mix(in srgb, red, blue)) {
  #write .md-image-gallery-cell {
    background: rgba(0,0,0,0.05);
  }
}
`,he=`/* Morz "Fjord" — 峡湾。
   冷调浅色：雾蓝灰的底、克制的蓝做强调，无衬线正文，层级只靠字号和留白。
   换掉了原来三个近似的浅色主题（Github / Whitey / Pixyll），留一套干净的默认外观。 */
:root {
  --bg-color: #f7f8fa;
  --text-color: #1f2933;
  --side-bar-bg-color: #eef1f5;
  --control-text-color: #5c6b7a;
  --item-hover-bg-color: rgba(31, 41, 51, 0.055);
  --active-file-bg-color: #e3e9f0;
  --active-file-border-color: #2f6f9f;
  --primary-color: #2f6f9f;
  --select-text-bg-color: #cfe1f0;
  --ui-border-color: #dbe2ea;

  --text-font: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  --write-font: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  --write-font-size: 16px;
  --write-line-height: 1.72;
  --write-max-width: 700px;
  --write-padding-x: 36px;
  --monospace: "JetBrains Mono", "Cascadia Code", "SF Mono", Consolas, monospace;

  --link-color: #25638f;
  --tag-color: #2f6f9f;
  --inline-code-bg: #eaeef3;
  --code-block-bg: #f0f3f7;
  --code-block-border: #dbe2ea;
  --blockquote-border: #b9c8d6;
  --blockquote-color: #4a5866;
  --hr-color: #dbe2ea;
  --table-border-color: #dbe2ea;
  --table-stripe-bg: #f2f5f9;
  --md-char-color: #94a3b1;
  --meta-content-color: #7b8896;
  --meta-block-bg: #eef1f5;
  --mark-bg-color: #f6e7a8;
  --kbd-bg: #eef1f5;
  --kbd-border: #dbe2ea;
}

#write h1 { font-size: 1.9em; font-weight: 650; line-height: 1.25; letter-spacing: -0.012em; margin: 1.3em 0 0.45em; color: #141a20; }
#write h2 { font-size: 1.32em; font-weight: 650; line-height: 1.4; margin: 1.6em 0 0.4em; color: #141a20; }
#write h3 { font-size: 1.08em; font-weight: 600; margin: 1.3em 0 0.3em; }
#write h4, #write h5, #write h6 { font-weight: 600; letter-spacing: 0.01em; }

#write p { margin: 0 0 0.95em; }
#write a { color: var(--link-color); text-decoration: none; }
#write a:hover { text-decoration: underline; text-underline-offset: 2px; }
#write blockquote { border-left: 3px solid var(--blockquote-border); color: var(--blockquote-color); padding-left: 14px; }
#write code { color: #2a3a48; }
#write pre.md-fences { border-radius: 6px; }
#write hr { border-top: 1px solid var(--hr-color); }
#write table th { background: var(--side-bar-bg-color); font-weight: 600; }

/* 界面：标题栏和正文同底色，状态栏收成一行小字，不抢戏 */
.titlebar { background: var(--bg-color); }
.statusbar { letter-spacing: 0.02em; color: var(--control-text-color); }
`,ge=`/* Fjord — dark variant. Same blue accent and Inter typography, deep fjord water. */
:root {
  --bg-color: #151a20;
  --text-color: #c9d3dd;
  --side-bar-bg-color: #11161b;
  --control-text-color: #94a4b3;
  --item-hover-bg-color: rgba(255, 255, 255, 0.055);
  --active-file-bg-color: #222b35;
  --active-file-border-color: #7fb3dc;
  --primary-color: #7fb3dc;
  --select-text-bg-color: #2f4f6b;
  --ui-border-color: #2a3541;

  --link-color: #8fc3ea;
  --tag-color: #7fb3dc;
  --inline-code-bg: #202833;
  --code-block-bg: #10151a;
  --code-block-border: #2a3541;
  --blockquote-border: #3b4a5a;
  --blockquote-color: #9ba9b7;
  --hr-color: #2a3541;
  --table-border-color: #2a3541;
  --table-stripe-bg: #1b222a;
  --md-char-color: #6f7f8e;
  --meta-content-color: #8b9aa9;
  --meta-block-bg: #1a2129;
  --mark-bg-color: #5a5128;
  --kbd-bg: #202833;
  --kbd-border: #36414d;

  --cm-keyword: #c792ea; --cm-number: #f78c6c; --cm-def: #82aaff; --cm-type: #ffcb6b;
  --cm-property: #82aaff; --cm-operator: #89ddff; --cm-comment: #7b858f; --cm-string: #c3e88d;
  --cm-string-2: #89ddff; --cm-meta: #ffcb6b; --cm-builtin: #82aaff; --cm-tag: #f07178;
  --cm-attribute: #ffcb6b; --cm-header: #f07178;
  color-scheme: dark;
}
#write h1, #write h2 { color: #e7eef6; }
#write code { color: #cfe3f5; }
.statusbar { color: #8b9aa9; }
`,_e=`/* Morz "Paper & Ink" — 墨与纸。
   暖白纸面、宋体正文、朱印红做强调。层级靠字号与细线，不靠色块。 */
:root {
  --bg-color: #fbf9f4;
  --text-color: #1a1a1a;
  --side-bar-bg-color: #f4f0e6;
  --control-text-color: #55504a;
  --item-hover-bg-color: rgba(60, 45, 25, 0.06);
  --active-file-bg-color: rgba(165, 63, 43, 0.1);
  --active-file-border-color: #a53f2b;
  --primary-color: #a53f2b;
  --select-text-bg-color: #efdcb2;
  --ui-border-color: #e3ded3;
  --ui-font-size: 12.5px;

  --text-font: "Songti SC", "SimSun", "Noto Serif CJK SC", "Source Han Serif SC", Georgia, serif;
  --write-font: "Songti SC", "SimSun", "Noto Serif CJK SC", "Source Han Serif SC", Georgia, serif;
  --write-font-size: 16.5px;
  --write-line-height: 1.85;
  --write-max-width: 660px;
  --write-padding-x: 28px;
  --monospace: "JetBrains Mono", "Cascadia Code", Consolas, monospace;

  --link-color: #2f5a8a;
  --tag-color: #a53f2b;
  --inline-code-bg: #f0ebe0;
  --code-block-bg: #f4f0e6;
  --code-block-border: #e3ded3;
  --blockquote-border: #1a1a1a;
  --blockquote-color: #55504a;
  --hr-color: #ded8ca;
  --table-border-color: #ddd7c9;
  --table-stripe-bg: #f6f2e9;
  --md-char-color: #a49d92;
  --meta-content-color: #8d8780;
  --meta-block-bg: #f4f0e6;
  --mark-bg-color: #f3e3b8;
  --kbd-bg: #f0ebe0;
  --kbd-border: #ded8ca;
}

#write p { text-align: justify; }
#write h1 { font-size: 2em; font-weight: 600; line-height: 1.3; letter-spacing: 0.01em; }
#write h2 { font-size: 1.18em; font-weight: 600; line-height: 1.5; letter-spacing: 0.01em; }
/* 章节号：排版上的“节”，不是正文内容（只在 CSS 里，不写进文档） */
#write h2::before { content: "§ "; color: var(--primary-color); font-weight: 400; }
/* 列表项里的标题是“标题项”（- ## 文本）：只借字号，不要文档章节号 */
#write li h2::before { content: none; }
#write h3 { font-size: 1.04em; font-weight: 600; letter-spacing: 0.01em; }
#write h4, #write h5, #write h6 { font-weight: 600; letter-spacing: 0.02em; }

#write blockquote, #write .md-quote { border-left-width: 2px; }
#write blockquote { font-style: normal; padding-left: 16px; }

#write a {
  color: var(--link-color); text-decoration: none;
  border-bottom: 1px solid rgba(47, 90, 138, 0.32);
}
#write a:hover { border-bottom-color: var(--link-color); }

#write pre.md-fences { border-radius: 0; }
#write code { color: #4a443c; }
#write hr { height: 0; border-top: 1px solid var(--hr-color); background: none; }
#write table th { background: #f4f0e6; font-weight: 600; }

/* 界面：标签用小字距，状态栏像页脚的印次行 */
.titlebar { background: var(--bg-color); }
.statusbar { letter-spacing: 0.12em; font-size: 10px; text-transform: uppercase; color: var(--control-text-color); }

/* Default theme polish: a quiet paper grain, a vermilion caret, and a softer
   quote card. The colour variables stay unchanged for theme tests and export. */
:root {
  --caret-color: #a53f2b;
  --task-done-color: #8d8780;
}
.editor-pane {
  background-image:
    radial-gradient(900px 420px at 50% -8%, rgba(165, 63, 43, 0.035), transparent 65%),
    repeating-linear-gradient(90deg, rgba(60, 45, 25, 0.012) 0 1px, transparent 1px 4px);
}
#write blockquote {
  background: rgba(165, 63, 43, 0.035);
  border-radius: 2px;
}
#write h1 { font-size: 2.05em; }
#write table th { letter-spacing: 0.02em; }
`,ve=`/* Paper & Ink — dark variant. Warm ink-black paper, same vermilion and Songti. */
:root {
  --bg-color: #1c1814;
  --text-color: #e6ddcf;
  --side-bar-bg-color: #17130f;
  --control-text-color: #b9ad9c;
  --item-hover-bg-color: rgba(255, 220, 180, 0.055);
  --active-file-bg-color: #2b221a;
  --active-file-border-color: #d0785f;
  --primary-color: #d0785f;
  --select-text-bg-color: #5a3b2d;
  --ui-border-color: #3a3127;

  --link-color: #9fc0e4;
  --tag-color: #d0785f;
  --inline-code-bg: #2b221a;
  --code-block-bg: #14100d;
  --code-block-border: #3a3127;
  --blockquote-border: #d0785f;
  --blockquote-color: #c0b3a2;
  --hr-color: #3a3127;
  --table-border-color: #3a3127;
  --table-stripe-bg: #221c16;
  --md-char-color: #7d7264;
  --meta-content-color: #a29686;
  --meta-block-bg: #241d17;
  --mark-bg-color: #5c4a22;
  --kbd-bg: #2b221a;
  --kbd-border: #3a3127;

  --cm-keyword: #c792ea; --cm-number: #f78c6c; --cm-def: #82aaff; --cm-type: #ffcb6b;
  --cm-property: #82aaff; --cm-operator: #89ddff; --cm-comment: #7b858f; --cm-string: #c3e88d;
  --cm-string-2: #89ddff; --cm-meta: #ffcb6b; --cm-builtin: #82aaff; --cm-tag: #f07178;
  --cm-attribute: #ffcb6b; --cm-header: #f07178;
  color-scheme: dark;
}
#write code { color: #f0e6d6; }
#write table th { background: #241d17; }
#write a { border-bottom-color: rgba(159, 192, 228, 0.4); }
.statusbar { color: #a29686; }

/* Dark paper: same grain, warmed for the ink-black surface. */
:root { --caret-color: #d0785f; --task-done-color: #a29686; }
.editor-pane {
  background-image:
    radial-gradient(900px 420px at 50% -8%, rgba(208, 120, 95, 0.045), transparent 65%),
    repeating-linear-gradient(90deg, rgba(255, 220, 180, 0.008) 0 1px, transparent 1px 4px);
}
#write blockquote { background: rgba(208, 120, 95, 0.055); }
`,ye=`/* Morz "Index" — 索引卡。
   桌面是暖灰的纸板，正文是一张带索引标签的卡片：卡片外有阴影，章节左侧有彩色标签。 */
:root {
  --bg-color: #ded5c3;
  --text-color: #23201b;
  --side-bar-bg-color: #e6ddca;
  --control-text-color: #5b5449;
  --item-hover-bg-color: rgba(60, 45, 25, 0.08);
  --active-file-bg-color: #f7f1e2;
  --active-file-border-color: #b8623f;
  --primary-color: #b8623f;
  --select-text-bg-color: #e8d7ae;
  --ui-border-color: rgba(90, 72, 45, 0.22);

  --text-font: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --write-font: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --write-font-size: 15.5px;
  --write-line-height: 1.75;
  --write-max-width: 700px;
  --write-padding-x: 46px;
  --monospace: "Cascadia Code", "JetBrains Mono", Consolas, monospace;

  --card-bg: #f4eee0;
  --card-2: #ece4d2;
  --card-border: #cfc4ae;
  --card-tab: #b8623f;

  --link-color: #3f5878;
  --tag-color: #b8623f;
  --inline-code-bg: #ece4d2;
  --code-block-bg: #20201c;
  --code-block-border: #20201c;
  --blockquote-border: #8a6a2f;
  --blockquote-color: #5b5449;
  --hr-color: #cfc4ae;
  --table-border-color: #cfc4ae;
  --table-stripe-bg: #ece4d2;
  --md-char-color: #8e8575;
  --meta-content-color: #8e8575;
  --meta-block-bg: #ece4d2;
  --mark-bg-color: #f2e0a8;
  --kbd-bg: #ece4d2;
  --kbd-border: #cfc4ae;
}

/* 卡片本身：编辑器里 #write 就是 .cm-content，导出时是一个 div，两种形态都成立 */
#write, #write.cm-content {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 2px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 12px 34px rgba(40, 32, 20, 0.12);
}
#write.cm-content { margin: 26px auto 40px; padding-bottom: 30vh; }
#write { margin: 26px auto 40px; }

/* 桌面：两层很淡的斑，别做成一整块均匀的米色 */
.editor-pane {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.22) 0 40%, transparent 41%),
    radial-gradient(circle at 78% 70%, rgba(0, 0, 0, 0.035) 0 35%, transparent 36%);
  background-size: 420px 420px, 380px 380px;
}

#write h1 { font-size: 1.95em; font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; }
/* 索引标签：每级标题左边一条色带 */
#write h2 {
  font-size: 1.05em; font-weight: 600;
  border-left: 3px solid var(--card-tab); padding-left: 10px;
}
#write h3 { font-size: 1em; font-weight: 600; border-left: 2px solid #4f6b4a; padding-left: 9px; }

/* 双链/链接做成一张小标签 */
#write a {
  color: var(--text-color); text-decoration: none;
  background: var(--card-2); border: 1px solid var(--card-border); border-radius: 2px;
  padding: 0 4px;
}
#write a:hover { background: #fffaf0; }

#write blockquote { font-style: normal; background: var(--card-2); border-left-width: 3px; padding-left: 14px; padding-right: 14px; }
#write pre.md-fences { color: #d8d2c4; border-radius: 0; }
#write code { color: #7a4a2f; }
/* 显式给浅色：这里的 code 规则会被适配成整行 .md-fences 的颜色 */
#write pre.md-fences code { color: #d8d2c4; }
#write table th { background: var(--card-2); font-weight: 600; }
#write hr { height: 0; border-top: 1px dashed var(--hr-color); background: none; }

/* 状态栏与正文卡片同底色，不再是一条深色标签 */
.statusbar { background: var(--card-bg); color: var(--control-text-color); border-top-color: var(--card-border); letter-spacing: 0.08em; }
.titlebar { background: var(--card-2); border-bottom-color: rgba(90, 72, 45, 0.18); }
`,be=`/* Index Card — dark variant. A warm charcoal card box, same terracotta tabs. */
:root {
  --bg-color: #171512;
  --text-color: #e6dfd2;
  --side-bar-bg-color: #201c17;
  --control-text-color: #b9ae9b;
  --item-hover-bg-color: rgba(255, 230, 190, 0.055);
  --active-file-bg-color: #2b251d;
  --active-file-border-color: #d08a6a;
  --primary-color: #d08a6a;
  --select-text-bg-color: #5a4030;
  --ui-border-color: rgba(230, 210, 175, 0.18);

  --card-bg: #24201a;
  --card-2: #2b261e;
  --card-border: #3d362b;
  --card-tab: #d08a6a;

  --link-color: #a9c3df;
  --tag-color: #d08a6a;
  --inline-code-bg: #2b261e;
  --code-block-bg: #0f0e0c;
  --code-block-border: #2f2a22;
  --blockquote-border: #b08a4e;
  --blockquote-color: #c9bfae;
  --hr-color: #3d362b;
  --table-border-color: #3d362b;
  --table-stripe-bg: #221e18;
  --md-char-color: #8a7f6e;
  --meta-content-color: #a89d8b;
  --meta-block-bg: #2b261e;
  --mark-bg-color: #5a4a24;
  --kbd-bg: #2b261e;
  --kbd-border: #3d362b;

  --cm-keyword: #c792ea; --cm-number: #f78c6c; --cm-def: #82aaff; --cm-type: #ffcb6b;
  --cm-property: #82aaff; --cm-operator: #89ddff; --cm-comment: #8a8072; --cm-string: #c3e88d;
  --cm-string-2: #89ddff; --cm-meta: #ffcb6b; --cm-builtin: #82aaff; --cm-tag: #f07178;
  --cm-attribute: #ffcb6b; --cm-header: #f07178;
  color-scheme: dark;
}
#write, #write.cm-content {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 12px 34px rgba(0, 0, 0, 0.4);
}
.editor-pane {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 240, 220, 0.035) 0 40%, transparent 41%),
    radial-gradient(circle at 78% 70%, rgba(0, 0, 0, 0.28) 0 35%, transparent 36%);
}
#write a:hover { background: #322b22; }
#write code { color: #e3b18f; }
#write h3 { border-left-color: #8fae86; }
/* 状态栏与正文卡片同底色 */
.statusbar { background: var(--card-bg); color: var(--control-text-color); border-top-color: var(--card-border); }
.titlebar { background: var(--card-2); border-bottom-color: rgba(230, 210, 175, 0.12); }
`,xe=`/* Morz "Broadsheet" — 报刊。
   报纸感：暖纸白、高对比衬线、两端对齐、细线分隔；版口骨架保留（h1 报头粗线、
   h2 版口细线）。质感吸收自 Clay 主题：陶土橙两级强调——文本级 #ae5630（链接、
   标签，达 WCAG AA），装饰级 #d97757（引用条、光标、列表记号、悬停底色）；
   引用块暖灰底、卡片化表格、图片浮起阴影、键帽立体感。 */
:root {
  --bg-color: #f8f8f6;
  --text-color: #1c1a17;
  --side-bar-bg-color: #efeeeb;
  --control-text-color: #6b6862;
  --item-hover-bg-color: rgba(217, 119, 87, 0.08);
  --active-file-bg-color: rgba(217, 119, 87, 0.12);
  --active-file-border-color: #d97757;
  --primary-color: #ae5630;
  --select-text-bg-color: #f0d8ce;
  --ui-border-color: #dededc;

  --text-font: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Songti SC", "Noto Serif CJK SC", serif;
  --write-font: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Songti SC", "Noto Serif CJK SC", serif;
  --write-font-size: 15.5px;
  --write-line-height: 1.8;
  --write-max-width: 680px;
  --write-padding-x: 40px;
  --monospace: "JetBrains Mono", "Cascadia Code", Consolas, monospace;

  /* 陶土橙两级：--primary-color 上文字（可读达标），--accent-decor 仅作装饰 */
  --accent-decor: #d97757;
  --caret-color: #d97757;
  --quote-bg: #efeeeb;
  --link-color: #ae5630;
  --tag-color: #ae5630;
  --inline-code-bg: #efeeeb;
  --inline-code-border: #e0e0dc;
  --inline-code-color: #a8433b;
  --code-block-bg: #fcfcfa;
  --code-block-border: #e6e6e2;
  --blockquote-border: #d97757;
  --blockquote-color: #373734;
  --hr-color: #dededc;
  --table-border-color: #cdcdc9;
  --table-row-line: rgba(28, 26, 23, 0.12);
  --table-hover-bg: rgba(217, 119, 87, 0.05);
  --table-stripe-bg: #f4f4f1;
  --md-char-color: #a49b8c;
  --meta-content-color: #7d7568;
  --meta-block-bg: #efeeeb;
  --mark-bg-color: #f0e2b6;
  --kbd-bg: #f4f4f1;
  --kbd-border: #dededc;
}

/* Clay 排版基线：字距 0.02em、表格数字、陶土光标。
   组合 #write p 让 live 适配映射存活（纯 #write 会被丢弃）；字距与数字变体可继承。 */
#write, #write p { letter-spacing: 0.02em; font-variant-numeric: tabular-nums; caret-color: var(--accent-decor); }
#write p { text-align: justify; hyphens: auto; margin: 0 0 0.9em; }
#write h1 {
  font-size: 2.25em; font-weight: 600; line-height: 1.15; letter-spacing: -0.015em;
  margin: 1.1em 0 0.45em; padding-bottom: 0.22em; border-bottom: 2px solid var(--text-color);
}
#write h2 {
  font-size: 1.28em; font-weight: 600; line-height: 1.4;
  margin: 1.5em 0 0.35em; padding-top: 0.5em; border-top: 1px solid var(--hr-color);
}
#write h3 { font-size: 1.06em; font-style: italic; font-weight: 600; margin: 1.2em 0 0.25em; }
#write h4, #write h5, #write h6 { font-weight: 600; letter-spacing: 0.02em; }

#write a { color: var(--link-color); text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s ease; }
#write a:hover { border-bottom-color: currentColor; }
#write ul li::marker { color: var(--accent-decor); }
#write ol li::marker { color: var(--primary-color); }

#write blockquote {
  border-left: 4px solid var(--accent-decor);
  background: var(--quote-bg);
  border-radius: 0 8px 8px 0;
  padding: 0.5em 1.2em;
  color: var(--blockquote-color);
}
#write blockquote p { margin: 0.45em 0; }

#write code {
  font-size: 0.88em; font-weight: 600; color: var(--inline-code-color);
  border: 1px solid var(--inline-code-border); border-radius: 4px; padding: 0.08em 0.3em;
}
#write pre.md-fences code { border: 0; padding: 0; font-weight: inherit; color: inherit; }
/* 实时编辑区里代码围栏是连续行，适配器会丢弃 border/padding/box-shadow
   （见 themes.ts 的 liveDeclarations），所以圆角与阴影只在导出/打印时出现。 */
#write pre.md-fences { border-radius: 10px; box-shadow: 0 1px 3px rgba(28, 26, 23, 0.04); }
#write kbd { border-color: var(--kbd-border); background: var(--kbd-bg); }

/* 表格：Clay 式圆角卡片，行线仍是报纸细线 */
#write table {
  font-size: 0.95em;
  border-collapse: separate; border-spacing: 0;
  border: 1px solid var(--table-border-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(28, 26, 23, 0.04);
}
#write table th, #write table td { border: 0; border-bottom: 1px solid var(--table-row-line); }
#write table th { background: var(--table-stripe-bg); border-bottom: 2px solid var(--table-border-color); font-weight: 600; }
#write table tr:last-child td { border-bottom: 0; }
#write table tbody tr:hover { background: var(--table-hover-bg); }
#write hr { height: 0; background: transparent; border: 0; border-top: 1px solid var(--hr-color); margin: 2.5em 0; }
#write img { border-radius: 8px; box-shadow: 0 4px 16px rgba(28, 26, 23, 0.08); }

/* 界面：像报纸的版口，标题栏与状态栏都用同一种编辑体 */
.titlebar { background: var(--bg-color); }
.statusbar { letter-spacing: 0.08em; font-size: 10.5px; color: var(--control-text-color); }
`,Se=`/* Broadsheet — dark variant. 夜版新闻纸：Clay 式暖黑底、陶土橙强调；
   版口骨架与质感规则与浅色逐条对称（Clay 的做法：两文件同构成对修改）。 */
:root {
  --bg-color: #1f1f1e;
  --text-color: #d5d4cb;
  --side-bar-bg-color: #181817;
  --control-text-color: #a5a299;
  --item-hover-bg-color: rgba(217, 119, 87, 0.10);
  --active-file-bg-color: rgba(217, 119, 87, 0.14);
  --active-file-border-color: #d97757;
  --primary-color: #d97757;
  --select-text-bg-color: rgba(217, 119, 87, 0.26);
  --ui-border-color: #37352f;

  --link-color: #d97757;
  --tag-color: #d97757;
  --inline-code-bg: #2a2825;
  --inline-code-border: #3a3833;
  --inline-code-color: #e08b6d;
  --code-block-bg: #171615;
  --code-block-border: #37352f;
  --blockquote-border: #d97757;
  --blockquote-color: #c2bfb4;
  --hr-color: #37352f;
  --table-border-color: #45423b;
  --table-row-line: rgba(213, 212, 203, 0.12);
  --table-hover-bg: rgba(217, 119, 87, 0.07);
  --table-stripe-bg: #242322;
  --md-char-color: #8f8577;
  --meta-content-color: #a79c8c;
  --meta-block-bg: #242322;
  --mark-bg-color: #5a4e2a;
  --kbd-bg: #2a2825;
  --kbd-border: #37352f;

  /* 深色下两级强调合并为陶土橙（暖黑底上 4.7:1） */
  --accent-decor: #d97757;
  --caret-color: #d97757;
  --quote-bg: #262524;

  --cm-keyword: #c792ea; --cm-number: #f78c6c; --cm-def: #82aaff; --cm-type: #ffcb6b;
  --cm-property: #82aaff; --cm-operator: #89ddff; --cm-comment: #7b858f; --cm-string: #c3e88d;
  --cm-string-2: #89ddff; --cm-meta: #ffcb6b; --cm-builtin: #82aaff; --cm-tag: #f07178;
  --cm-attribute: #ffcb6b; --cm-header: #f07178;
  color-scheme: dark;
}

/* 排版基线：与浅色逐条对称；组合 #write p 让 live 适配映射存活。 */
#write, #write p { letter-spacing: 0.02em; font-variant-numeric: tabular-nums; caret-color: var(--accent-decor); }
#write p { text-align: justify; hyphens: auto; margin: 0 0 0.9em; }
#write h1 {
  font-size: 2.25em; font-weight: 600; line-height: 1.15; letter-spacing: -0.015em;
  margin: 1.1em 0 0.45em; padding-bottom: 0.22em; border-bottom: 2px solid var(--text-color);
}
#write h2 {
  font-size: 1.28em; font-weight: 600; line-height: 1.4;
  margin: 1.5em 0 0.35em; padding-top: 0.5em; border-top: 1px solid var(--hr-color);
}
#write h3 { font-size: 1.06em; font-style: italic; font-weight: 600; margin: 1.2em 0 0.25em; }
#write h4, #write h5, #write h6 { font-weight: 600; letter-spacing: 0.02em; }

#write a { color: var(--link-color); text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s ease; }
#write a:hover { border-bottom-color: currentColor; }
#write ul li::marker { color: var(--accent-decor); }
#write ol li::marker { color: var(--primary-color); }

#write blockquote {
  border-left: 4px solid var(--accent-decor);
  background: var(--quote-bg);
  border-radius: 0 8px 8px 0;
  padding: 0.5em 1.2em;
  color: var(--blockquote-color);
}
#write blockquote p { margin: 0.45em 0; }

#write code {
  font-size: 0.88em; font-weight: 600; color: var(--inline-code-color);
  border: 1px solid var(--inline-code-border); border-radius: 4px; padding: 0.08em 0.3em;
}
#write pre.md-fences code { border: 0; padding: 0; font-weight: inherit; color: inherit; }
/* 同浅色：实时区是连续行，适配器丢弃 border/padding/box-shadow，圆角只在导出时生效。 */
#write pre.md-fences { border-radius: 10px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3); }
#write kbd { border-color: var(--kbd-border); background: var(--kbd-bg); }

/* 表格：圆角卡片 + 夜间细线 */
#write table {
  font-size: 0.95em;
  border-collapse: separate; border-spacing: 0;
  border: 1px solid var(--table-border-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
#write table th, #write table td { border: 0; border-bottom: 1px solid var(--table-row-line); }
#write table th { background: var(--table-stripe-bg); border-bottom: 2px solid var(--table-border-color); font-weight: 600; }
#write table tr:last-child td { border-bottom: 0; }
#write table tbody tr:hover { background: var(--table-hover-bg); }
#write hr { height: 0; background: transparent; border: 0; border-top: 1px solid var(--hr-color); margin: 2.5em 0; }
#write img { border-radius: 8px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4); }

.statusbar { color: #a79c8c; }
`,Ce=`/* Morz "Plain" — 素读。
   只服务阅读的中性主题：不暖、不冷、几乎无色。界面只有两种底色——
   侧栏、顶栏、状态栏、右栏、工作区同属界面层（#f4f4f4），笔记正文是一张白纸（#ffffff）。
   正文按长文阅读调：行高 1.8、段距 1.1em、正文色 #353535，加粗只到 600。
   标题层级靠字号、字重与留白区分，只有 H1 顶部一段短线；表格去掉外框只留发丝横线。
   版式色值全部写成显式色，不用 color-mix，macOS 12 的 WebKit 也能用。 */
:root {
  --bg-color: #ffffff;
  --text-color: #353535;
  --side-bar-bg-color: #f4f4f4;
  --control-text-color: #616161;
  --item-hover-bg-color: rgba(0, 0, 0, 0.045);
  --active-file-bg-color: #e9e9e9;
  --active-file-border-color: #2f6289;
  --primary-color: #2f6289;
  --select-text-bg-color: #dce6ee;
  --ui-border-color: #e3e3e3;
  --ui-font-size: 13px;

  --text-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  --write-font: var(--text-font);
  --write-font-size: 16.5px;
  --write-line-height: 1.8;
  --write-padding-x: 32px;
  --monospace: "JetBrains Mono", "Cascadia Code", "SF Mono", Consolas, monospace;

  /* 阅读版式的几个色：细线、引用底、代码底、纸面边框。 */
  --plain-card-border: rgba(0, 0, 0, 0.08);
  --plain-rule: #e8e8e8;
  --plain-quote-fill: #f6f7f8;
  --plain-quote-rule: #c6d0d8;
  --plain-code-fill: #f6f6f6;
  --plain-code-border: #e6e6e6;
  --plain-heading-mark: #b9c4cd;
  --plain-link-hover: rgba(47, 98, 137, 0.08);

  --link-color: #2f6289;
  --tag-color: #5c5c5c;
  --tag-background: #f0f0f0;
  --inline-code-bg: var(--plain-code-fill);
  --code-block-bg: var(--plain-code-fill);
  --code-block-border: var(--plain-code-border);
  --blockquote-border: var(--plain-quote-rule);
  --blockquote-color: #4f4f4f;
  --hr-color: var(--plain-rule);
  --table-border-color: var(--plain-rule);
  --table-stripe-bg: transparent;
  --md-char-color: #9a9a9a;
  --meta-content-color: #7a7a7a;
  --meta-block-bg: #f4f4f4;
  --mark-bg-color: #f0edda;
  --kbd-bg: #f4f4f4;
  --kbd-border: #dcdcdc;
  --task-done-color: #8f8f8f;
  --print-bg: #ffffff;
}

/* 两种底色：界面层（侧栏/顶栏/状态栏/右栏/工具栏/工作区）同色，
   笔记正文是一张浮在其中的纸（学索引卡的分层，但不带卡片标签与暖色）。
   顶栏与状态栏默认跟纸面同色（--ui-bg），侧栏默认是 4.5% 前景混色，
   这里统一并回界面层；编辑器工作区也刷成界面色，纸面只在 #write 上。 */
.titlebar,
.statusbar,
.right-panel,
.sidebar,
.editor-pane { background: var(--side-bar-bg-color); }
/* 工具栏背景：用户显式设置过 --toolbar-bg 时仍然听用户的。 */
.toolbar-bar { background: var(--toolbar-bg, var(--side-bar-bg-color)); }

/* 纸面：实时编辑的 #write 就是 .cm-content，导出时是普通 div。
   边框、圆角与阴影只给编辑器里的纸，导出/打印仍是一整页白纸。 */
#write { background: var(--bg-color); }
#write.cm-content {
  margin: 22px auto 40px;
  border: 1px solid var(--plain-card-border);
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 6px 24px rgba(0, 0, 0, 0.05);
}

/* 正文：与界面同字号起点，行距和段距按长文阅读放宽。 */
#write {
  color: var(--text-color);
  font-size: var(--write-font-size, 16.5px);
  line-height: var(--write-line-height, 1.8);
  letter-spacing: 0;
}
#write p { margin: 0 0 1.1em; line-height: var(--write-line-height, 1.8); letter-spacing: 0; }

/* 标题与正文同色，层级只靠字号、字重和留白。
   上下间距写成 padding 而不是 margin：实时编辑区只认 padding（margin 会被适配器
   转成 padding），这样阅读模式与编辑区的节奏一致。 */
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 {
  margin: 0;
  color: var(--text-color);
  letter-spacing: 0;
  overflow-wrap: anywhere;
}
/* H1：顶部一段低饱和短线；不用通栏底线，也不用左侧色条。 */
#write h1 {
  font-size: 1.62em;
  font-weight: 600;
  line-height: 1.35;
  padding: 1.15em 0 0.62em;
  background-image: linear-gradient(var(--plain-heading-mark), var(--plain-heading-mark));
  background-repeat: no-repeat;
  background-size: 1.3em 2px;
  background-position: left 0.6em;
}
/* H2：只靠字号、字重和上方留白分节，不画线。 */
#write h2 {
  font-size: 1.3em;
  font-weight: 600;
  line-height: 1.45;
  padding: 1.5em 0 0.45em;
}
/* H3-H5：只靠字号、字重和留白，不画折角、短线或竖线。 */
#write h3 {
  font-size: 1.14em;
  font-weight: 600;
  line-height: 1.45;
  padding: 1.35em 0 0.4em;
}
#write h4 {
  font-size: 1.02em;
  font-weight: 600;
  line-height: 1.5;
  padding: 1.25em 0 0.42em;
}
#write h5 {
  font-size: 1em;
  font-weight: 600;
  line-height: 1.5;
  padding: 1.15em 0 0.35em;
}
#write h6 {
  font-size: 0.96em;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.015em;
  padding: 1.05em 0 0.3em;
  color: var(--meta-content-color);
}
/* 加粗只强调到 600：中性风里 700 会显得整页在喊。 */
#write strong, #write b { font-weight: 600; }

/* 实时编辑：Markdown 的空行本身占一行高度，标题再套阅读版式的上留白会显空。
   这里只收紧实时区的上下留白，阅读模式与导出仍用上面的值；H1 短线的位置
   也跟着 padding 一起挪，否则会落进空白里。 */
#write .cm-line.md-h1 { padding-top: 0.7em; padding-bottom: 0.45em; background-position: left 0.25em; }
#write .cm-line.md-h2 { padding-top: 0.65em; padding-bottom: 0.3em; }
#write .cm-line.md-h3 { padding-top: 0.6em; padding-bottom: 0.25em; }
#write .cm-line.md-h4 { padding-top: 0.55em; padding-bottom: 0.25em; }
#write .cm-line.md-h5 { padding-top: 0.5em; padding-bottom: 0.2em; }
#write .cm-line.md-h6 { padding-top: 0.45em; padding-bottom: 0.15em; }

/* 列表：缩进比默认浅，项与项之间留一点气。 */
#write ul, #write ol { margin: 0.5em 0 1em; padding-left: 1.25em; }
#write li { line-height: 1.7; }
#write li + li { margin-top: 0.28em; }
#write li > p { margin: 0 0 0.3em; }

/* 引用：浅底 + 2px 细竖线，整块不斜体。 */
#write blockquote {
  margin: 1.1em 0;
  padding: 0.55em 1em;
  border-left: 2px solid var(--blockquote-border);
  border-radius: 4px;
  background: var(--plain-quote-fill);
  color: var(--blockquote-color);
  font-style: normal;
  font-weight: inherit;
}
#write blockquote p:last-child { margin-bottom: 0; }

/* 实时编辑：引用是逐行渲染的，每行都套一次上下间距会在引用内部拉出空隙。
   只在首行留上间距、末行留下间距，行与行贴着；圆角也只给首尾行。
   限定 :not(.md-alert)：Callout 自己的卡片圆角不能被改成 4px。 */
#write .cm-line.md-quote:not(.md-alert) { padding-top: 0; padding-bottom: 0; border-radius: 0; }
#write .cm-line.md-quote-first:not(.md-alert) { padding-top: 1.05em; border-radius: 4px 4px 0 0; }
#write .cm-line.md-quote-last:not(.md-alert) { padding-bottom: 1.05em; border-radius: 0 0 4px 4px; }

/* 链接：虚线仅在下方，悬停加粗一格并给一层极浅底。 */
#write a {
  color: var(--link-color);
  font-weight: inherit;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
#write a:hover { text-decoration-thickness: 1.5px; background: var(--plain-link-hover); }
#write a:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; border-radius: 2px; }

/* 表格：无外框、无斑马纹，只有行间发丝线；首尾单元格与正文齐头。 */
#write table {
  width: 100%;
  margin: 0.9em 0;
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1em;
  line-height: 1.62;
}
#write table th, #write table td {
  padding: 0.6em 0.65em;
  border: 0;
  border-bottom: 1px solid var(--plain-rule);
  background: transparent;
  color: var(--text-color);
  font-weight: 400;
  text-align: left;
  vertical-align: middle;
  overflow-wrap: break-word;
}
#write table th { font-weight: 600; background: transparent; }
#write table tr:nth-child(2n) { background: transparent; }
#write table tbody tr:last-child td { border-bottom: 0; }
#write table tr > :first-child { padding-left: 0; }
#write table tr > :last-child { padding-right: 0; }

/* 代码：行内与块都走同一种浅灰面，块加一条细边框和 8px 圆角。 */
#write code {
  padding: 0.12em 0.32em;
  border: 0;
  border-radius: 4px;
  background: var(--inline-code-bg);
  color: var(--text-color);
  font-size: 0.88em;
}
#write pre.md-fences {
  padding: 0.85em 1em;
  border: 1px solid var(--code-block-border);
  border-radius: 8px;
  background: var(--code-block-bg);
  line-height: 1.6;
}
#write pre.md-fences code { padding: 0; border: 0; border-radius: 0; background: transparent; font-size: 1em; }

/* 分隔线、标记、键帽、脚注：都只留一根发丝线或一层浅底。 */
#write hr { height: 0; margin: 2em 0; border: 0; border-top: 1px solid var(--hr-color); background: none; }
#write mark { background: var(--mark-bg-color); color: inherit; }
#write kbd { border-color: var(--kbd-border); background: var(--kbd-bg); }
#write .footnotes { border-top: 1px solid var(--plain-rule); margin-top: 1.6em; padding-top: 0.7em; }
`,we=`/* Plain — dark variant. 同一种中性，仍然是两种底色：
   界面层（侧栏/顶栏/状态栏/右栏/工作区）#1c1d21，笔记纸面 #26272b。
   纸面比界面亮一档，像灯下的一张纸；正文色 #e5e6e8，强调只到低饱和蓝。 */
:root {
  --bg-color: #26272b;
  --text-color: #e5e6e8;
  --side-bar-bg-color: #1c1d21;
  --control-text-color: #b0b3ba;
  --item-hover-bg-color: rgba(255, 255, 255, 0.055);
  --active-file-bg-color: #2b2d33;
  --active-file-border-color: #8fb6d4;
  --primary-color: #8fb6d4;
  --select-text-bg-color: #32485c;
  --ui-border-color: rgba(255, 255, 255, 0.10);

  --plain-card-border: rgba(255, 255, 255, 0.07);
  --plain-rule: #34363b;
  --plain-quote-fill: #2c2d32;
  --plain-quote-rule: #3d454e;
  --plain-code-fill: #2b2c31;
  --plain-code-border: #34363b;
  --plain-heading-mark: #4c545d;
  --plain-link-hover: rgba(157, 196, 224, 0.10);

  --link-color: #9dc4e0;
  --tag-color: #b9bcc2;
  --tag-background: #2f3035;
  --blockquote-color: #b9bcc2;
  --md-char-color: #6f737a;
  --meta-content-color: #9a9ea6;
  --meta-block-bg: #212226;
  --mark-bg-color: #46401f;
  --kbd-bg: #2b2c31;
  --kbd-border: #3a3d43;
  --task-done-color: #7d8188;
  --print-bg: #26272b;
  color-scheme: dark;
}
`,Te=`/* Morz "Night" — 夜色。蓝灰暗底、纸白正文，强调色是月光蓝。 */
:root {
  --bg-color: #363b40; --text-color: #b8bfc6; --side-bar-bg-color: #2e3033; --control-text-color: #b7b7b7;
  --item-hover-bg-color: #70717d; --active-file-bg-color: #4a4f55; --active-file-border-color: #b8bfc6;
  --primary-color: #a3d5fe; --window-border: 1px solid #555; --select-text-bg-color: #4a89dc; --caret-color: #ffffff;
  --text-font: "Helvetica Neue", Helvetica, Arial, -apple-system, "Segoe UI", "PingFang SC", sans-serif;
  --monospace: ui-monospace, Menlo, Consolas, monospace;
  --code-block-bg: #333639; --code-block-border: #4a4f55; --inline-code-bg: #4a4f55; --blockquote-border: #474d54; --blockquote-color: #9da5ad;
  --hr-color: #474d54; --table-border-color: #474d54; --table-stripe-bg: #3d4248; --md-char-color: #6c727a; --meta-content-color: #8b939b;
  --mark-bg-color: #5c5a3a; --link-color: #e0e0e0; --tag-color: #a3d5fe; --meta-block-bg: #303437; --kbd-bg: #44494f; --kbd-border: #5b6168;
  --search-hit-bg-color: rgba(255, 200, 0, 0.35); --h6-color: #9da5ad;
  --cm-keyword: #c792ea; --cm-number: #f78c6c; --cm-def: #82aaff; --cm-type: #ffcb6b; --cm-property: #82aaff; --cm-operator: #89ddff;
  --cm-comment: #7b858f; --cm-string: #c3e88d; --cm-string-2: #89ddff; --cm-meta: #ffcb6b; --cm-builtin: #82aaff; --cm-tag: #f07178; --cm-attribute: #ffcb6b; --cm-header: #f07178;
  color-scheme: dark;
}
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { color: #dedede; }
#write h1 { font-size: 2.2em; border-bottom: 1px solid #474d54; padding-bottom: 0.3em; }
#write h2 { font-size: 1.8em; border-bottom: 1px solid #474d54; padding-bottom: 0.3em; }
#write strong { color: #dedede; }
#write a { color: #e0e0e0; text-decoration: underline; }
#write table th { background: #3d4248; }
`,Ee=`/* Night — light variant. Same moonlight blue, now on a cool paper white. */
:root {
  --bg-color: #f4f6f8;
  --text-color: #2b3137;
  --side-bar-bg-color: #eceff2;
  --control-text-color: #5f6a73;
  --item-hover-bg-color: rgba(30, 40, 50, 0.05);
  --active-file-bg-color: #e1e6eb;
  --active-file-border-color: #3577a8;
  --primary-color: #3577a8;
  --window-border: 1px solid #d8dee4;
  --select-text-bg-color: #cfe1f0;
  --caret-color: #1f2933;

  --code-block-bg: #f0f3f5;
  --code-block-border: #d8dee4;
  --inline-code-bg: #e8ecef;
  --blockquote-border: #b8c2cb;
  --blockquote-color: #56616b;
  --hr-color: #d8dee4;
  --table-border-color: #d8dee4;
  --table-stripe-bg: #eef2f5;
  --md-char-color: #8a959e;
  --meta-content-color: #7a858e;
  --mark-bg-color: #f6e7a8;
  --link-color: #2f6f9f;
  --tag-color: #3577a8;
  --meta-block-bg: #eef1f4;
  --kbd-bg: #edf1f4;
  --kbd-border: #d8dee4;
  --search-hit-bg-color: rgba(255, 200, 0, 0.35);
  --h6-color: #56616b;

  --cm-keyword: #a626a4; --cm-number: #986801; --cm-def: #4078c0; --cm-type: #c18401;
  --cm-property: #4078c0; --cm-operator: #0184bc; --cm-comment: #a0a1a7; --cm-string: #50a14f;
  --cm-string-2: #0184bc; --cm-meta: #986801; --cm-builtin: #4078c0; --cm-tag: #e45649;
  --cm-attribute: #986801; --cm-header: #e45649;
  color-scheme: light;
}
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { color: #1f2933; }
#write h1, #write h2 { border-bottom-color: #d8dee4; }
#write strong { color: #1f2933; }
#write a { color: var(--link-color); }
#write table th { background: #eef2f5; }
`,De=`/* Morz "Graphite" — 石墨。中性深灰、低饱和蓝，长时间写作不刺眼。 */
:root {
  --bg-color: #1e1f22; --text-color: #d7d9dd; --side-bar-bg-color: #18191b; --control-text-color: #a4a8ae;
  --item-hover-bg-color: rgba(255, 255, 255, 0.06); --active-file-bg-color: #2c3038; --primary-color: #7aa7f7;
  --select-text-bg-color: #33496e; --window-border: 1px solid #2c2e33; --caret-color: #ffffff;
  --text-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "PingFang SC", sans-serif;
  --monospace: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --code-block-bg: #26282c; --code-block-border: #33363c; --inline-code-bg: #2b2e33; --blockquote-border: #3a3d44; --blockquote-color: #a4a8ae;
  --hr-color: #33363c; --table-border-color: #3a3d44; --table-stripe-bg: #232528; --md-char-color: #5b6069; --meta-content-color: #8d929a;
  --mark-bg-color: #5b4f1f; --link-color: #7aa7f7; --tag-color: #7aa7f7; --meta-block-bg: #232528; --kbd-bg: #2b2e33; --kbd-border: #44474e; --h6-color: #a4a8ae;
  --cm-keyword: #c792ea; --cm-number: #f78c6c; --cm-def: #82aaff; --cm-type: #ffcb6b; --cm-property: #82aaff; --cm-operator: #89ddff;
  --cm-comment: #6b7280; --cm-string: #c3e88d; --cm-string-2: #89ddff; --cm-meta: #ffcb6b; --cm-builtin: #82aaff; --cm-tag: #f07178; --cm-attribute: #ffcb6b; --cm-header: #f07178;
  color-scheme: dark;
}
#write h1, #write h2 { border-bottom: 1px solid #2c2e33; padding-bottom: 0.3em; }
#write h1, #write h2, #write h3, #write h4 { color: #eceef1; }
`,Oe=`/* Graphite — light variant. The same neutral low-saturation blue on paper. */
:root {
  --bg-color: #f5f6f8;
  --text-color: #2a2d31;
  --side-bar-bg-color: #eceef1;
  --control-text-color: #61666d;
  --item-hover-bg-color: rgba(20, 30, 40, 0.05);
  --active-file-bg-color: #e3e7ec;
  --primary-color: #3f6fb5;
  --select-text-bg-color: #cfe0f7;
  --window-border: 1px solid #d9dde3;
  --caret-color: #1f2328;

  --code-block-bg: #eff1f4;
  --code-block-border: #d9dde3;
  --inline-code-bg: #e9ecf0;
  --blockquote-border: #c3c8cf;
  --blockquote-color: #5e646b;
  --hr-color: #d9dde3;
  --table-border-color: #d9dde3;
  --table-stripe-bg: #f0f2f5;
  --md-char-color: #8b939c;
  --meta-content-color: #767d85;
  --mark-bg-color: #f3e2a0;
  --link-color: #3f6fb5;
  --tag-color: #3f6fb5;
  --meta-block-bg: #eff1f4;
  --kbd-bg: #edf0f3;
  --kbd-border: #d4d9df;
  --h6-color: #5e646b;

  --cm-keyword: #a626a4; --cm-number: #986801; --cm-def: #4078c0; --cm-type: #c18401;
  --cm-property: #4078c0; --cm-operator: #0184bc; --cm-comment: #a0a1a7; --cm-string: #50a14f;
  --cm-string-2: #0184bc; --cm-meta: #986801; --cm-builtin: #4078c0; --cm-tag: #e45649;
  --cm-attribute: #986801; --cm-header: #e45649;
  color-scheme: light;
}
#write h1, #write h2, #write h3, #write h4 { color: #23262a; }
#write h1, #write h2 { border-bottom-color: #d9dde3; }
`,ke=`/* Morz "Terminal" — 终端与文件。
   一切都是等宽字体，标题带 # 前缀，强调色是终端青；暗底、细线、无圆角。 */
:root {
  --bg-color: #0e1113;
  --text-color: #d6dde3;
  --side-bar-bg-color: #14181b;
  --control-text-color: #8b979f;
  --item-hover-bg-color: rgba(255, 255, 255, 0.045);
  --active-file-bg-color: rgba(94, 234, 212, 0.09);
  --active-file-border-color: #5eead4;
  --primary-color: #5eead4;
  --select-text-bg-color: rgba(94, 234, 212, 0.24);
  --ui-border-color: #232a2e;
  --ui-font: "JetBrains Mono", "Cascadia Code", "SF Mono", Consolas, monospace;
  --ui-font-size: 12px;

  --text-font: "JetBrains Mono", "Cascadia Code", "SF Mono", Consolas, monospace;
  --write-font: "JetBrains Mono", "Cascadia Code", "SF Mono", Consolas, monospace;
  --write-font-size: 13.5px;
  --write-line-height: 1.75;
  --write-max-width: 720px;
  --write-padding-x: 36px;
  --monospace: "JetBrains Mono", "Cascadia Code", "SF Mono", Consolas, monospace;

  --link-color: #5eead4;
  --tag-color: #5eead4;
  --inline-code-bg: rgba(255, 255, 255, 0.05);
  --code-block-bg: #14181b;
  --code-block-border: #232a2e;
  --blockquote-border: #e6c07b;
  --blockquote-color: #8b979f;
  --hr-color: #232a2e;
  --table-border-color: #232a2e;
  --table-stripe-bg: rgba(255, 255, 255, 0.03);
  --md-char-color: #5a666d;
  --meta-content-color: #5a666d;
  --meta-block-bg: #14181b;
  --mark-bg-color: rgba(230, 192, 123, 0.28);
  --kbd-bg: #1a1f22;
  --kbd-border: #2c353a;
  --h6-color: #8b979f;
}

#write h1, #write h2, #write h3, #write h4, #write h5 { color: #eef3f6; font-weight: 600; letter-spacing: -0.01em; }
#write h1 { font-size: 1.9em; line-height: 1.35; }
#write h2 { font-size: 1.12em; }
#write h3 { font-size: 1em; }
/* 终端里标题本身就带着 # ——补回来，和源码一致 */
#write h1::before { content: "# "; color: var(--md-char-color); font-weight: 400; }
#write h2::before { content: "## "; color: var(--md-char-color); font-weight: 400; }
#write h3::before { content: "### "; color: var(--md-char-color); font-weight: 400; }

#write a {
  color: var(--link-color); text-decoration: none;
  background: rgba(94, 234, 212, 0.08); border-bottom: 1px solid rgba(94, 234, 212, 0.35);
  padding: 0 2px;
}
#write a:hover { background: rgba(94, 234, 212, 0.16); }

#write blockquote { font-style: normal; border-left-width: 2px; padding-left: 14px; }
/* 只在引用第一行放一个提示符，像 shell 里的 > 。
   导出用 p:first-child 定位，自动适配后不会落到每一行上。 */
#write blockquote:not(.md-alert) > p:first-child::before { content: "> "; color: #e6c07b; }
#write .md-quote:not(.md-alert).md-quote-first::before { content: "> "; color: #e6c07b; }

#write code { color: #e6c07b; }
#write pre.md-fences { border-radius: 0; color: #d6dde3; }
#write pre.md-fences code { color: inherit; }
#write hr { height: 0; border-top: 1px solid var(--hr-color); background: none; }
#write table th { background: rgba(255, 255, 255, 0.04); font-weight: 600; }

/* 界面：文件和状态栏都用等宽字，状态栏像一行终端输出 */
.titlebar { background: var(--bg-color); border-bottom-color: var(--ui-border-color); }
.sidebar { border-right-color: var(--ui-border-color); }
.statusbar { background: #14181b; border-top-color: var(--ui-border-color); color: var(--control-text-color); letter-spacing: 0.05em; }
`,Ae=`/* Terminal — light variant. A daylight terminal: same mono type and teal prompt. */
:root {
  --bg-color: #f7f9fa;
  --text-color: #1d2a2e;
  --side-bar-bg-color: #eef2f4;
  --control-text-color: #52646a;
  --item-hover-bg-color: rgba(20, 50, 55, 0.045);
  --active-file-bg-color: rgba(15, 118, 110, 0.1);
  --active-file-border-color: #0f766e;
  --primary-color: #0f766e;
  --select-text-bg-color: rgba(15, 118, 110, 0.18);
  --ui-border-color: #cfd9dd;

  --link-color: #0f766e;
  --tag-color: #0f766e;
  --inline-code-bg: #e3eaec;
  --code-block-bg: #eef2f4;
  --code-block-border: #cfd9dd;
  --blockquote-border: #b08a4e;
  --blockquote-color: #4b5c62;
  --hr-color: #cfd9dd;
  --table-border-color: #cfd9dd;
  --table-stripe-bg: #f0f4f5;
  --md-char-color: #7a8a90;
  --meta-content-color: #6a7a80;
  --meta-block-bg: #eef2f4;
  --mark-bg-color: #f0e2a0;
  --kbd-bg: #eef2f4;
  --kbd-border: #cfd9dd;
  --h6-color: #4b5c62;

  --cm-keyword: #a626a4; --cm-number: #986801; --cm-def: #4078c0; --cm-type: #c18401;
  --cm-property: #4078c0; --cm-operator: #0184bc; --cm-comment: #a0a1a7; --cm-string: #50a14f;
  --cm-string-2: #0184bc; --cm-meta: #986801; --cm-builtin: #4078c0; --cm-tag: #e45649;
  --cm-attribute: #986801; --cm-header: #e45649;
  color-scheme: light;
}
#write h1, #write h2, #write h3, #write h4, #write h5 { color: #142024; }
#write a { background: rgba(15, 118, 110, 0.07); border-bottom-color: rgba(15, 118, 110, 0.3); }
#write a:hover { background: rgba(15, 118, 110, 0.14); }
#write blockquote:not(.md-alert) > p:first-child::before,
#write .md-quote:not(.md-alert).md-quote-first::before { color: #8a5a10; }
#write code { color: #8a5a10; }
#write pre.md-fences { color: #1d2a2e; }
#write table th { background: rgba(15, 118, 110, 0.05); }
.statusbar { background: #eef2f4; color: var(--control-text-color); }
`;function je(e){return i()===`zh`?e.name:e.nameEn??e.name}var Me={github:`fjord`,whitey:`fjord`,pixyll:`fjord`,newsprint:`broadsheet`,cards:`index`};function Ne(e){return Me[e]??e}var Pe=[{id:`paper`,name:`墨与纸`,nameEn:`Paper & Ink`,css:_e,darkCss:ve,modes:[`light`,`dark`],builtin:!0,default:!0},{id:`fjord`,name:`峡湾`,nameEn:`Fjord`,css:he,darkCss:ge,modes:[`light`,`dark`],builtin:!0},{id:`index`,name:`索引卡`,nameEn:`Index Card`,css:ye,darkCss:be,modes:[`light`,`dark`],builtin:!0},{id:`broadsheet`,name:`报刊`,nameEn:`Broadsheet`,css:xe,darkCss:Se,modes:[`light`,`dark`],builtin:!0},{id:`plain`,name:`素读`,nameEn:`Plain`,css:Ce,darkCss:we,modes:[`light`,`dark`],builtin:!0},{id:`night`,name:`夜色`,nameEn:`Night`,css:Te,lightCss:Ee,modes:[`light`,`dark`],builtin:!0},{id:`graphite`,name:`石墨`,nameEn:`Graphite`,css:De,lightCss:Oe,modes:[`light`,`dark`],builtin:!0},{id:`terminal`,name:`终端`,nameEn:`Terminal`,css:ke,lightCss:Ae,modes:[`light`,`dark`],builtin:!0}];function A(e,t){let n=t===`dark`?e.darkCss:e.lightCss;return n?`${e.css}\n${n}`:e.css}var j=new WeakMap;function Fe(e,t){let n=/(?:\.theme-dark|\[data-appearance\s*=\s*["']?dark)/i.test(e),r=/(?:\.theme-light|\[data-appearance\s*=\s*["']?light)/i.test(e);return!(n&&!r&&t!==`dark`||r&&!n&&t!==`light`)}function M(e,t,n){for(let r of Array.from(e))if(r instanceof CSSStyleRule){if(Fe(r.selectorText,t))for(let e=0;e<r.style.length;e++){let t=r.style[e];t.startsWith(`--`)&&n.set(t,r.style.getPropertyValue(t).trim())}let e=r.cssRules;e?.length&&M(e,t,n)}else if(r instanceof CSSMediaRule){if(/print/.test(r.conditionText)||/prefers-color-scheme\s*:\s*dark/i.test(r.conditionText)&&t!==`dark`||/prefers-color-scheme\s*:\s*light/i.test(r.conditionText)&&t!==`light`)continue;M(r.cssRules,t,n)}else typeof CSSSupportsRule<`u`&&r instanceof CSSSupportsRule&&M(r.cssRules,t,n)}function N(e,t,n=0){return n>8||!e.includes(`var(`)?e:N(e.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g,(e,n,r)=>t.get(n)??r?.trim()??e),t,n+1)}function P(e,t,n){for(let n of t){let t=e.get(n);if(!t)continue;let r=N(t,e).trim();if(r&&!r.includes(`var(`))return r}return n}function Ie(e,t){let n=j.get(e);n||(n=new Map,j.set(e,n));let r=n.get(t);if(r)return r;let i=t===`dark`?{background:`#202020`,text:`#c6c6c6`,accent:`#2d82cc`}:{background:`#ffffff`,text:`#1b2430`,accent:`#468eeb`};try{let r=new CSSStyleSheet;r.replaceSync(W(A(e,t)));let a=new Map;M(r.cssRules,t,a);let o={background:P(a,[`--bg-color`,`--background-primary`,`--bt-bg`],i.background),text:P(a,[`--text-color`,`--text-normal`,`--bt-text`],i.text),accent:P(a,[`--primary-color`,`--interactive-accent`,`--text-accent`,`--color-accent`,`--bt-accent`],i.accent)};return n.set(t,o),o}catch{return n.set(t,i),i}}function Le(e){let t=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e.trim());if(t){let e=t[1].length===3?t[1].split(``).map(e=>e+e).join(``):t[1],n=parseInt(e.slice(0,2),16),r=parseInt(e.slice(2,4),16),i=parseInt(e.slice(4,6),16);return(n*299+r*587+i*114)/1e3<128}let n=/^rgba?\(([^)]+)\)/i.exec(e);if(n){let[e,t,r]=n[1].split(`,`).map(Number);return(e*299+t*587+r*114)/1e3<128}return!1}function F(e){if(e.modes?.length)return e.modes;if(e.darkCss||e.lightCss)return[`light`,`dark`];let t=e.css.toLowerCase();return/data-appearance\s*=\s*["']?dark|\.theme-dark|prefers-color-scheme\s*:\s*dark/.test(t)||/data-appearance\s*=\s*["']?light|\.theme-light|prefers-color-scheme\s*:\s*light/.test(t)?[`light`,`dark`]:[Le(/--bg-color\s*:\s*([^;]+)/.exec(t)?.[1]?.trim()??`#fff`)?`dark`:`light`]}function Re(e,t){return F(e).includes(t)}var I=`
:root {
  --bg-color: var(--background-primary, var(--bt-bg, #ffffff));
  --text-color: var(--text-normal, var(--bt-text, #333333));
  --side-bar-bg-color: var(--background-secondary, var(--bt-sidebar, #fafafa));
  --control-text-color: var(--text-muted, var(--bt-muted, #666666));
  --item-hover-bg-color: var(--background-modifier-hover, var(--bt-accent-softer, rgba(128, 128, 128, 0.12)));
  --active-file-bg-color: var(--background-modifier-active-hover, var(--background-secondary-alt, var(--bt-accent-soft, rgba(128, 128, 128, 0.16))));
  --active-file-border-color: var(--interactive-accent, var(--text-accent, var(--bt-accent, #4183c4)));
  --primary-color: var(--interactive-accent, var(--text-accent, var(--bt-accent, #4183c4)));
  --select-text-bg-color: var(--text-selection, var(--bt-selection, rgba(65, 131, 196, 0.22)));
  --ui-border-color: var(--background-modifier-border, var(--bt-border, rgba(128, 128, 128, 0.22)));
  --text-font: var(--font-text, var(--font-text-theme, var(--bt-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)));
  --write-font: var(--font-text, var(--font-text-theme, var(--bt-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)));
  --ui-font: var(--font-interface, var(--font-default, var(--bt-ui-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)));
  --monospace: var(--font-monospace, var(--font-monospace-theme, var(--bt-mono, ui-monospace, Consolas, monospace)));
  --write-line-height: var(--line-height-normal, var(--bt-line-height, 1.6));
  --write-font-size: var(--font-text-size, 16px);
  --link-color: var(--text-accent, var(--bt-accent-strong, #2d82cc));
  --tag-color: var(--text-accent, var(--bt-accent, #468eeb));
  --inline-code-bg: var(--code-background, var(--bt-inline-bg, #f3f4f4));
  --inline-code-color: var(--code-normal, var(--text-normal, var(--bt-inline-color, #c05621)));
  --code-block-bg: var(--code-background, var(--bt-code-bg, #f8f8f8));
  --code-block-color: var(--code-normal, var(--text-normal, var(--bt-code-text, inherit)));
  --blockquote-border: var(--interactive-accent, var(--bt-accent, #468eeb));
  --blockquote-color: var(--text-muted, var(--bt-quote-text, #777777));
  --hr-color: var(--background-modifier-border, var(--bt-border, #e7e7e7));
  --table-border-color: var(--background-modifier-border, var(--bt-border, #dfe2e5));
  --table-header-bg: var(--table-header-background, var(--bt-table-head, transparent));
  --table-stripe-bg: var(--table-row-background-hover, var(--bt-table-stripe, #f8f8f8));
  --meta-content-color: var(--text-muted, var(--bt-muted, #777777));
  --meta-block-bg: var(--background-secondary, var(--bt-bg-soft, #f5f5f5));
  --mark-bg-color: var(--text-highlight-bg, var(--bt-mark, #ffef9e));
  --caret-color: var(--text-accent, var(--text-color));
  --task-done-color: var(--text-faint, var(--text-muted, inherit));
}
`,L=`
body {
  --bg-color: var(--background-primary, var(--bt-bg, #ffffff));
  --text-color: var(--text-normal, var(--bt-text, #333333));
  --side-bar-bg-color: var(--background-secondary, var(--bt-sidebar, #fafafa));
  --ui-bg: var(--background-primary, var(--bt-bg, #ffffff));
  --ui-strong: var(--text-normal, var(--bt-text, #333333));
  --ui-text: var(--text-muted, var(--bt-muted, #666666));
  --ui-panel: var(--background-secondary, var(--bt-sidebar, #fafafa));
  --ui-hover: var(--background-modifier-hover, var(--bt-accent-softer, rgba(128, 128, 128, 0.12)));
  --ui-active: var(--background-modifier-active-hover, var(--background-secondary-alt, var(--bt-accent-soft, rgba(128, 128, 128, 0.16))));
  --ui-border: var(--background-modifier-border, var(--bt-border, rgba(128, 128, 128, 0.22)));
  --primary-color: var(--interactive-accent, var(--text-accent, var(--bt-accent, #4183c4)));
  --text-font: var(--font-text, var(--font-text-theme, var(--bt-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)));
  --write-font: var(--font-text, var(--font-text-theme, var(--bt-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)));
  --ui-font: var(--font-interface, var(--font-default, var(--bt-ui-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)));
  --monospace: var(--font-monospace, var(--font-monospace-theme, var(--bt-mono, ui-monospace, Consolas, monospace)));
  --write-line-height: var(--line-height-normal, var(--line-height-main, var(--bt-line-height, 1.6)));
}
`,R={h1:`.md-h1`,h2:`.md-h2`,h3:`.md-h3`,h4:`.md-h4`,h5:`.md-h5`,h6:`.md-h6`,p:`.md-p`,blockquote:`.md-quote`,pre:`.md-fences`,code:`.md-code`,a:`.md-link`,strong:`.md-strong`,b:`.md-strong`,em:`.md-em`,i:`.md-em`,del:`.md-del`,s:`.md-del`,mark:`.md-mark`,hr:`.md-hr-widget`,li:`.md-li`,kbd:`.md-kbd`,u:`.md-u`,sup:`.md-sup`,sub:`.md-sub`,table:`.md-table`},ze=RegExp(`(^|[\\s>+~(,])(${Object.keys(R).join(`|`)})(?![\\w-])`,`g`),z=new Set([`.md-h1`,`.md-h2`,`.md-h3`,`.md-h4`,`.md-h5`,`.md-h6`,`.md-p`,`.md-quote`,`.md-fences`,`.md-li`,`.md-alert`]),Be=/^\.md-alert-(?:note|abstract|info|todo|tip|success|question|warning|failure|danger|bug|example|quote|important|caution)$/,B=(e,t)=>t&&(z.has(e)||Be.test(e))?`.cm-line${e}`:e,Ve=/(^|[\s>+~(,])(?:\.markdown-preview-view|\.markdown-preview-sizer|\.markdown-preview-section|\.markdown-preview-container|\.markdown-preview-pusher|\.markdown-rendered|\.markdown-reading-view|\.markdown-source-view|\.cm-s-obsidian|\.cm-scroller|\.cm-content|\.view-content|\.workspace-leaf-content|\.workspace-leaf|\.is-live-preview|\.is-readable-line-width|\.mod-cm6)(?![\w-])/g,He=[[/\.HyperMD-quote(?![\w-])/g,`.md-quote`],[/\.cm-quote(?![\w-])/g,`.md-quote`],[/\.HyperMD-codeblock(?![\w-])/g,`.md-fences`],[/\.cm-inline-code(?![\w-])/g,`.md-code`],[/\.HyperMD-list-line(?![\w-])/g,`.md-li`],[/\.cm-hmd-list-indent(?![\w-])/g,`.md-li`],[/\.cm-formatting-list(?![\w-])/g,`.md-li`],[/\.cm-link(?![\w-])/g,`.md-link`],[/\.cm-url(?![\w-])/g,`.md-link-url`],[/\.cm-hmd-internal-link(?![\w-])/g,`.md-link`],[/\.internal-link(?![\w-])/g,`.md-link`],[/\.external-link(?![\w-])/g,`.md-link`],[/\.cm-strong(?![\w-])/g,`.md-strong`],[/\.cm-em(?![\w-])/g,`.md-em`],[/\.cm-strikethrough(?![\w-])/g,`.md-del`],[/\.cm-highlight(?![\w-])/g,`.md-mark`],[/\.cm-tag(?![\w-])/g,`.md-tag`],[/\.tag(?![\w-])/g,`.md-tag`],[/\.cm-kbd(?![\w-])/g,`.md-kbd`],[/\.callout-title-inner(?![\w-])/g,`.md-alert-text`],[/\.callout-title(?![\w-])/g,`.md-alert-text`],[/\.callout(?![\w-])/g,`.md-alert`]];function Ue(e,t){let n=new Set,r=e.replace(/\.CodeMirror-lines|\.CodeMirror-code|\.CodeMirror\b/g,()=>(n.add(`.md-fences`),`.md-fences`));r=r.replace(/#typora-sidebar\b/g,`#sidebar`).replace(/(^|[\s>+~,])content(?![\w-])/g,`$1.editor-pane`),r=r.replace(/\.callout\[data-callout\s*=\s*["']?([\w-]+)["']?\]/g,(e,r)=>{let i=`.md-alert-${r.toLowerCase()}`;return n.add(i),B(i,t)}),r=r.replace(Ve,`$1`),r=r.replace(/\.(?:HyperMD-header|cm-header)-([1-6])(?![\w-])/g,(e,r)=>{let i=`.md-h${r}`;return n.add(i),B(i,t)});for(let[e,i]of He)r=r.replace(e,()=>(n.add(i),B(i,t)));if(r=r.replace(ze,(e,r,i)=>{let a=R[i];return n.add(a),r+B(a,t)}),!n.size)return null;r=r.replace(/\.md-fences\s+\.md-code/g,`.md-fences`);let i=/(^|[\s>+~,])(?:html|body|:root|\.theme-dark|\.theme-light)(?![\w-])/.test(r),a=r.split(`,`).map(e=>{let t=e.trim();if(!t)return``;if(i||t.includes(`#write`)||t.includes(`.md-live`))return t;if(!/\.md-alert(?![\w-])|\.md-alert-/.test(t))return`.md-live ${t}`;let n=`.md-live #write ${t}`,r=t.split(/[\s>+~]+/).pop()??``;return t.includes(`.cm-line`)&&r.includes(`.md-alert`)?`${n}, ${n}.md-quote-first`:n}).filter(Boolean).join(`, `);return a?{selector:a,targets:n}:null}var We=new Set([`display`,`position`,`float`,`width`,`max-width`,`min-width`,`height`,`max-height`,`page-break-before`,`page-break-after`,`page-break-inside`,`break-before`,`break-after`,`break-inside`,`overflow`,`overflow-x`,`overflow-y`,`white-space`]);function Ge(e,t,n={top:!1,bottom:!1}){let r=[...t].some(e=>z.has(e)||e.startsWith(`.md-alert-`)),i=t.has(`.md-fences`),a=t.has(`.md-quote`),o=[];for(let s=0;s<e.length;s++){let c=e[s],l=e.getPropertyValue(c);if(!l)continue;let u=e.getPropertyPriority(c)?` !important`:``;if(!(r&&We.has(c))){if(c.startsWith(`margin`)){if(!r){o.push(`${c}:${l}${u}`);continue}let e=t.has(`.md-p`);c===`margin-top`&&!i&&!(e&&n.top)&&o.push(`padding-top:${l}${u}`),c===`margin-bottom`&&!i&&!(e&&n.bottom)&&o.push(`padding-bottom:${l}${u}`)}else i&&(c.startsWith(`border`)||c.startsWith(`padding`)||c===`box-shadow`)||a&&(c.startsWith(`border-top`)||c.startsWith(`border-bottom`)||c===`padding-top`||c===`padding-bottom`)||(!t.has(`.md-li`)||!c.startsWith(`padding-left`)&&c!==`text-indent`&&c!==`list-style`&&c!==`list-style-type`)&&o.push(`${c}:${l}${u}`)}}return o.join(`;`)}function V(e){let t={top:!1,bottom:!1};for(let n of Array.from(e)){if(n instanceof CSSStyleRule){if(!/\.cm-line\.md-p(?![\w-])/.test(n.selectorText))continue;n.style.getPropertyValue(`padding-top`)&&(t.top=!0),n.style.getPropertyValue(`padding-bottom`)&&(t.bottom=!0)}else if(n instanceof CSSMediaRule){if(/print/.test(n.conditionText)&&!/screen/.test(n.conditionText))continue;H(t,V(n.cssRules))}else typeof CSSSupportsRule<`u`&&n instanceof CSSSupportsRule&&H(t,V(n.cssRules));if(t.top&&t.bottom)break}return t}function H(e,t){e.top=e.top||t.top,e.bottom=e.bottom||t.bottom}function U(e,t,n){let r=``;for(let i of Array.from(e))if(i instanceof CSSStyleRule){let e=Ue(i.selectorText,t);if(!e)continue;let a=Ge(i.style,e.targets,n);a&&(r+=`${e.selector}{${a}}\n`)}else if(i instanceof CSSMediaRule){if(/print/.test(i.conditionText)&&!/screen/.test(i.conditionText))continue;let e=U(i.cssRules,t,n);e&&(r+=`@media ${i.conditionText}{${e}}\n`)}else if(typeof CSSSupportsRule<`u`&&i instanceof CSSSupportsRule){let e=U(i.cssRules,t,n);e&&(r+=`@supports ${i.conditionText}{${e}}\n`)}return r}function W(e){return e.replace(/@include-when-export[^;]*;/g,``).replace(/@import\s+url\(\s*["']?(?!https:)[^)]*\)\s*;/g,``)}function Ke(e,t=!1,n=`light`){try{let r=W(e).replace(/@import[^;]+;/g,``),i=qe(r,n),a=new CSSStyleSheet;a.replaceSync(Je(r,i));let o=V(a.cssRules);return U(a.cssRules,t,o)}catch{return``}}function qe(e,t){let n=new Map;try{let r=new CSSStyleSheet;r.replaceSync(e),M(r.cssRules,t,n)}catch{}return n}function Je(e,t){let n=(e,r=0)=>r>5||!e.includes(`var(`)?e:n(e.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g,(e,n,r)=>t.get(n)??r?.trim()??e),r+1);return n(e)}async function G(){return await a.get(`themes`)??[]}async function K(e){let t=(await G()).filter(t=>t.id!==e.id);t.push({...e,builtin:!1}),await a.set(`themes`,t)}async function Ye(e){await a.set(`themes`,(await G()).filter(t=>t.id!==e))}async function q(e){let t=e.find(e=>e.name.toLowerCase().endsWith(`.css`));if(!t)throw Error(`Choose a theme .css file (and optionally its asset files).`);let n=await t.text(),r=new Map;for(let n of e)n!==t&&r.set(n.name.toLowerCase(),n);let i=[...n.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)];for(let e of i){let t=e[2];if(/^(data:|https?:|#)/.test(t))continue;let i=t.split(/[/\\]/).pop().split(/[?#]/)[0].toLowerCase(),a=r.get(i);if(!a)continue;let o=await new Promise(e=>{let t=new FileReader;t.onload=()=>e(String(t.result)),t.readAsDataURL(a)});n=n.split(e[0]).join(`url("${o}")`)}let a=t.name.replace(/\.css$/i,``),o=a.replace(/[-_]+/g,` `).replace(/\b\w/g,e=>e.toUpperCase());return{id:`custom-`+a.toLowerCase().replace(/[^a-z0-9]+/g,`-`),name:o,css:W(n),builtin:!1}}async function Xe(e){let t=await q(e);return await K(t),t}var J=null,Y=null;function Ze(e){let t=document.createElement(`div`);t.style.color=e,document.body.append(t);let n=getComputedStyle(t).color.match(/[\d.]+/g)?.map(Number)??[255,255,255];t.remove();let[r,i,a]=n.map(e=>{let t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4});return .2126*r+.7152*i+.0722*a}var X=new WeakMap;function Qe(e,t,n){let r=X.get(e);r||(r=new Map,X.set(e,r));let i=r.get(t);if(i!==void 0)return i;let a=Ke(n,e.external===!0,t);return r.set(t,a),a}function $e(e,n=``,r=`light`){J??=document.head.appendChild(Object.assign(document.createElement(`style`),{id:`morz-theme`})),Y??=document.head.appendChild(Object.assign(document.createElement(`style`),{id:`morz-user-css`}));let i=A(e,r),a=e.external?L:``;J.textContent=`${k}\n${I}\n${a}\n/* theme: ${e.name} (${r}) */\n${W(i)}\n/* live editor adaptation */\n${Qe(e,r,i)}`,Y.textContent=n?`${n}\n${Ke(n,!1,r)}`:``,document.documentElement.dataset.theme=e.id,document.documentElement.dataset.appearance=r;for(let e of[document.documentElement,document.body])e.classList.toggle(`theme-dark`,r===`dark`),e.classList.toggle(`theme-light`,r===`light`);let o=getComputedStyle(document.body).getPropertyValue(`--bg-color`).trim()||`#fff`,s=Ze(o)<.3;return s!==(r===`dark`)&&(document.documentElement.dataset.appearance=s?`dark`:`light`),document.documentElement.style.colorScheme=s?`dark`:`light`,document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,o),t(s?`dark`:`light`),s}function et(){return`#write .md-alert{--md-alert-color:#8a8f98;color:var(--text-color);background:color-mix(in srgb, var(--md-alert-color) var(--md-alert-tint,7%), transparent);border:1px solid color-mix(in srgb, var(--md-alert-color) 24%, transparent);border-left:0;border-radius:var(--md-alert-radius,8px);padding:2px 15px 2px 12px;margin:1.1em 0}
#write .md-alert>.md-alert-text-container{margin:0 -15px .5em -12px;padding:6px 15px 4px 12px;border-radius:var(--md-alert-radius,8px) var(--md-alert-radius,8px) 0 0;background:color-mix(in srgb, var(--md-alert-color) calc(var(--md-alert-tint,7%) + 6%), transparent)}
#write .md-alert-text{font-weight:600;color:var(--md-alert-color)}
#write .md-alert .md-alert-icon{width:1.05em;height:1.05em;vertical-align:-.16em;margin-right:.4em;color:var(--md-alert-color)}
${Object.values(r).map(e=>`#write .md-alert-${e.kind}{--md-alert-color:${e.color};}`).join(`
`)}`}function tt(e,t=``,n=`light`){let r=e.external?L:``;return`${k}\n${et()}\n${I}\n${r}\n#write{background-color:var(--bt-page-bg,transparent);background-image:linear-gradient(var(--bt-page-overlay,transparent),var(--bt-page-overlay,transparent)),var(--bt-page-bg-image,none);background-size:cover;background-position:center;}\n${W(A(e,n))}\n${e.exportExtra??``}\n${t}`}var nt=e({THEME_COLOR_VARS:()=>Z,defaultPreferences:()=>Q,loadPreferences:()=>st,savePreferences:()=>ct}),Z=[`--bg-color`,`--text-color`,`--primary-color`,`--side-bar-bg-color`,`--select-text-bg-color`],Q={theme:`paper`,themeFolder:``,appearance:`auto`,fontSize:16,bodyFont:``,codeFont:``,uiFont:``,lineWidth:`normal`,lineHeight:0,firstLineIndent:!1,linkPreviewMode:`ctrl`,autoSave:!0,historyLimit:50,historyDays:7,restoreSession:!0,spellcheck:i()===`en`,autoPairBrackets:!0,autoPairMarkdown:!0,headingEnterList:!1,pasteTidy:!0,slashTrigger:`/`,slashCommands:[],tabSize:2,focusMode:!1,readingMode:!1,readingHideImages:!1,typewriterMode:!1,showStatusBar:!0,statusbarPath:!1,statusbarUnresolved:!0,privacyStartupReport:!1,statusbarLayout:`editor`,propertiesCollapsed:!0,showFormatBar:`auto`,toolbar:C(),toolbarMobile:C(!0),toolbarOutline:S(),toolbarOutlineMobile:S(!0),sidebarVisible:!0,sidebarTab:`files`,sidebarRecentVisible:!0,showFileCounts:!1,fileSort:`name`,externalChange:`ask`,linkFormat:`markdown`,imageInsert:`assets`,imageFolder:`./assets`,imageOptimize:`auto`,imageQuality:82,imageMaxEdge:2560,imageRename:`keep`,imageRenameTemplate:`{date}-{name}`,imageCustomWidth:0,imageFrontMatterKey:``,readingSpeed:230,pdfPageSize:`A4`,pdfMargin:18,exportIncludeTheme:!0,exportHeadingNumbers:!1,imageExportWidth:920,imageExportWatermark:!0,docxLinkMode:`relative`,tableOverflow:`wrap`,customCss:``,themeSettings:{},themeColors:{},outlinePanel:!1,rightPanel:!1,rightPanelTab:`calendar`,rightPanelWidth:260,rightPanelLayout:null,plugins:!1,pluginStatusItems:{},perfWatchdog:!0,pluginIndexes:[],pluginFolder:``,downloadSource:`auto`,customMirror:``,autoCheckUpdates:!0,autoDownloadUpdates:!1,lastUpdateCheck:0,keymap:{},dailyFolder:`Daily`,dailyFormat:`YYYY-MM-DD`,dailyMode:`outline`,shareTarget:`daily`,dailyTemplate:``,inboxWorkspaceId:``,inboxWorkspaceRef:``,inboxWorkspaceName:``,inboxWorkspaceKind:``,inboxNoteMode:`daily`,inboxNotePath:`收集箱.md`,calendarWeekStart:`monday`,calendarShowWeekNumbers:!1,calendarShowLunar:!0,outlineCollapsed:`auto`,outlinePosition:`left`,outlineTickLength:`uniform`,mcpManifest:!1,uriWrite:!1,captureShortcut:``,captureTaskMode:!1,runInBackground:!1,diagramEngine:`pele`},$=`morz.preferences`,rt=`morz.layout.rightPanelCollapsed`,it=`morz.layout.lineHeightFollowTheme`,at=`morz.web-theme-default`,ot=`morz.mobile-following-off`;function st(){try{let e=JSON.parse(localStorage.getItem($)||`{}`),t={...Q,keymap:{...Q.keymap}};for(let n of Object.keys(Q))e[n]!==void 0&&typeof e[n]==typeof Q[n]&&(t[n]=e[n]);localStorage.getItem(rt)||(t.rightPanel=!1,localStorage.setItem(rt,`1`)),localStorage.getItem(it)||(t.lineHeight===1.6&&(t.lineHeight=0),localStorage.setItem(it,`1`)),t.readingMode=!1,localStorage.getItem(at)||(typeof window<`u`&&`__TAURI_INTERNALS__`in window||(t.theme=`fjord`),localStorage.setItem(at,`1`)),t.toolbar=T(t.toolbar),t.toolbarMobile=T(t.toolbarMobile,!0),localStorage.getItem(ot)||(t.toolbarMobile.following.enabled=!1,localStorage.setItem(ot,`1`)),t.toolbarOutline=T(t.toolbarOutline,!1,`outline`),t.toolbarOutlineMobile=T(t.toolbarOutlineMobile,!0,`outline`),t.slashTrigger=s(t.slashTrigger),t.slashCommands=c(t.slashCommands,t.slashTrigger),(!t.rightPanelTab||t.rightPanelTab===`backlinks`)&&(t.rightPanelTab=`calendar`),t.statusbarLayout!==`full`&&(t.statusbarLayout=`editor`),t.outlineCollapsed!==`rail`&&t.outlineCollapsed!==`icon`&&(t.outlineCollapsed=`auto`);let n=e.outlineStyle;try{if(n===`floating`&&!localStorage.getItem(`morz.outline.merged`)){t.outlineCollapsed=`icon`;let e={};try{e=JSON.parse(localStorage.getItem(`morz.outline.rail.state`)||`{}`)}catch{}localStorage.setItem(`morz.outline.rail.state`,JSON.stringify({...e,pinned:!0,closed:!1,hidden:!1})),delete t.outlineStyle,localStorage.setItem($,JSON.stringify(t))}n&&localStorage.setItem(`morz.outline.merged`,`1`)}catch{}e.inboxMode===`current`&&(t.inboxWorkspaceId=``,t.inboxWorkspaceRef=``,t.inboxWorkspaceName=``,t.inboxWorkspaceKind=``),t.inboxNoteMode=t.inboxNoteMode===`fixed`?`fixed`:`daily`,t.linkPreviewMode=t.linkPreviewMode===`off`?`off`:`ctrl`,t.inboxWorkspaceKind=[`library`,`desktop`,`saf`,`browser`].includes(t.inboxWorkspaceKind)?t.inboxWorkspaceKind:``,t.inboxWorkspaceName=String(t.inboxWorkspaceName||``).trim().slice(0,120);let r=O(String(t.inboxNotePath||``));return t.inboxNotePath=(r||`收集箱`)+(/\.md$/i.test(r||`收集箱`)?``:`.md`),t.tableOverflow===`scroll`&&!t.tableOverflowExplicit&&(t.tableOverflow=`wrap`),t.theme=Ne(t.theme),t}catch{return{...Q,keymap:{},slashCommands:[]}}}function ct(e){try{localStorage.setItem($,JSON.stringify(e))}catch{}}export{te as A,O as C,re as D,ae as E,u as F,ne as M,c as N,ie as O,s as P,ce as S,p as T,Re as _,ct as a,me as b,W as c,tt as d,Xe as f,je as g,F as h,nt as i,ee as j,f as k,G as l,q as m,Q as n,$e as o,K as p,st as r,Pe as s,Z as t,Ye as u,Ie as v,se as w,pe as x,oe as y};