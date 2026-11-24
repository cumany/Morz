(function () {
  var openBtn = document.querySelector(".site-search-open");
  var modal = document.querySelector(".site-search-modal");
  var input = document.querySelector(".site-search-input");
  var box = document.querySelector(".site-search-results");
  if (!openBtn || !modal || !input || !box) return;
  // 索引在站点根目录：子目录页面（demo/start.html）用相对 "assets/…" 会 404，
  // 必须按脚本自己的绝对地址拼出站点根。
  var base = document.currentScript ? document.currentScript.src.replace(/assets\/search\.js.*$/, "") : "";
  var index = [];
  var mini = null;
  var active = -1;
  try {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) {
      var kbd = openBtn.querySelector("kbd");
      if (kbd) kbd.textContent = "⌘K";
    }
  } catch (e) { /* 老浏览器没有 platform */ }

  // 中文没有空格：用 Intl.Segmenter 分词，再补 CJK bigram，保证“发布”能命中“发布为静态站”；
  // 常见虚词不参与索引，避免“怎么/如何”把长句查询的权重带偏。
  var STOP = { "的": 1, "了": 1, "吗": 1, "呢": 1, "是": 1, "我": 1, "你": 1, "在": 1, "和": 1, "与": 1, "或": 1,
    "怎么": 1, "如何": 1, "怎样": 1, "什么": 1, "为什么": 1, "可以": 1, "能不能": 1, "是否": 1, "哪里": 1 };
  function tokenize(value) {
    var text = (value || "").toLowerCase();
    var out = [];
    var seg = null;
    try { seg = window.Intl && Intl.Segmenter ? new Intl.Segmenter("zh", { granularity: "word" }) : null; } catch (e) { seg = null; }
    var push = function (token) { if (token && !STOP[token]) out.push(token); };
    text.split(/[\s\p{P}\p{S}]+/u).forEach(function (part) {
      if (!part) return;
      if (seg) {
        var it = seg.segment(part);
        if (it && it.forEach) it.forEach(function (s) { if (s.isWordLike) push(s.segment); });
      } else {
        push(part);
      }
      var runs = part.match(/[\u4e00-\u9fff]+/g) || [];
      runs.forEach(function (run) {
        if (run.length === 1) { push(run); return; }
        for (var i = 0; i < run.length - 1; i++) push(run.slice(i, i + 2));
      });
    });
    return out;
  }

  function setup() {
    if (!window.MiniSearch) return;
    mini = new window.MiniSearch({
      fields: ["title", "heading", "text"],
      storeFields: ["page", "title", "heading", "anchor", "text"],
      tokenize: tokenize,
      // OR 而不是 AND：自然语言提问（“怎么导出pdf”）里总有不命中的词，
      // AND 会直接把结果清零；排序再靠字段权重和整句命中加分。
      searchOptions: { boost: { title: 3, heading: 2 }, prefix: true, fuzzy: 0.15, combineWith: "OR" },
    });
    mini.addAll(index);
  }

  fetch(base + "assets/search-index.json").then(function (r) { return r.json(); }).then(function (data) {
    index = data || [];
    setup();
    if (input.value.trim()) run();
  });

  function fallbackSearch(q) {
    var lower = q.toLowerCase();
    return index.filter(function (item) {
      return ((item.title || "") + " " + (item.heading || "") + " " + (item.text || "")).toLowerCase().indexOf(lower) !== -1;
    });
  }

  function snippetOf(item, q) {
    var text = item.text || "";
    var at = text.toLowerCase().indexOf(q.toLowerCase());
    if (at < 0) return text.slice(0, 90);
    var start = Math.max(0, at - 36);
    // 英文从词边界开始，别把 "registry" 截成 "istry"
    if (start > 0) {
      var space = text.lastIndexOf(" ", start);
      if (space > at - 80) start = space + 1;
    }
    var end = Math.min(text.length, at + 90);
    if (end < text.length) {
      var next = text.indexOf(" ", end);
      if (next !== -1 && next < end + 24) end = next;
    }
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  function highlight(parent, text, q) {
    parent.textContent = "";
    if (!q) { parent.textContent = text; return; }
    var lower = text.toLowerCase(), needle = q.toLowerCase();
    var at = lower.indexOf(needle), start = 0;
    while (at !== -1 && start < text.length) {
      if (at > start) parent.appendChild(document.createTextNode(text.slice(start, at)));
      var mark = document.createElement("mark");
      mark.textContent = text.slice(at, at + needle.length);
      parent.appendChild(mark);
      start = at + needle.length;
      at = lower.indexOf(needle, start);
    }
    if (start < text.length) parent.appendChild(document.createTextNode(text.slice(start)));
  }

  function setActive(i, scroll) {
    var links = box.querySelectorAll(".site-search-hit");
    if (!links.length) return;
    active = Math.max(0, Math.min(i, links.length - 1));
    for (var j = 0; j < links.length; j++) links[j].classList.toggle("is-active", j === active);
    if (scroll) links[active].scrollIntoView({ block: "nearest" });
  }

  function run() {
    var q = input.value.trim();
    active = -1;
    box.textContent = "";
    if (!q) { box.classList.remove("is-open"); return; }
    var hits = mini ? mini.search(q) : fallbackSearch(q);
    if (!hits.length) hits = fallbackSearch(q);
    // 整句命中额外加分：搜“导出pdf”时“导出 PDF”要排在小节标题含“导出”的前面
    var compact = q.toLowerCase().replace(/\s+/g, "");
    if (compact) {
      hits = hits.map(function (hit) {
        var hay = ((hit.title || "") + " " + (hit.heading || "") + " " + (hit.text || ""))
          .toLowerCase().replace(/\s+/g, "");
        return { hit: hit, score: (hit.score || 0) + (hay.indexOf(compact) === -1 ? 0 : 100) };
      }).sort(function (a, b) { return b.score - a.score; }).map(function (entry) { return entry.hit; });
    }
    hits = hits.slice(0, 20);
    box.classList.add("is-open");
    if (!hits.length) {
      var empty = document.createElement("div");
      empty.className = "site-search-empty";
      empty.textContent = "没有匹配的文档";
      box.appendChild(empty);
      return;
    }
    hits.forEach(function (hit, i) {
      var a = document.createElement("a");
      a.className = "site-search-hit";
      a.href = base + hit.page + (hit.anchor ? "#" + encodeURIComponent(hit.anchor) : "");
      var head = document.createElement("strong");
      head.textContent = hit.heading ? hit.title + " · " + hit.heading : hit.title;
      var span = document.createElement("span");
      highlight(span, snippetOf(hit, q), q);
      a.appendChild(head);
      a.appendChild(span);
      a.addEventListener("mouseenter", function () { setActive(i, false); });
      box.appendChild(a);
    });
    setActive(0, true);
  }

  function open() {
    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.classList.add("search-open");
    window.setTimeout(function () { input.focus(); input.select(); }, 0);
  }
  function close() {
    modal.classList.remove("is-open");
    modal.hidden = true;
    document.body.classList.remove("search-open");
  }

  openBtn.addEventListener("click", open);
  modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
  input.addEventListener("input", run);
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1, true); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1, true); }
    else if (e.key === "Enter") {
      var links = box.querySelectorAll(".site-search-hit");
      if (links[active]) { e.preventDefault(); links[active].click(); }
    } else if (e.key === "Escape") { e.preventDefault(); close(); }
  });
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (modal.hidden) open(); else close();
    } else if (e.key === "Escape" && !modal.hidden) {
      close();
    }
  });
})();
