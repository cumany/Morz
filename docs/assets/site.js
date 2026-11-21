(function () {
  var html = document.documentElement;
  var btn = document.querySelector(".site-rail-toggle");
  var scrim = document.querySelector(".site-rail-scrim");
  var mq = window.matchMedia("(max-width: 1199px)");
  function closed() { return html.classList.contains("rail-closed"); }
  function setClosed(value, persist) {
    html.classList.toggle("rail-closed", value);
    if (persist) { try { localStorage.setItem("morz.site-rail", value ? "closed" : "open"); } catch (e) { /* 隐私模式 */ } }
    if (btn) btn.setAttribute("aria-expanded", String(!value));
  }
  function sync() { if (btn) btn.setAttribute("aria-expanded", String(!closed())); }
  sync();
  // 表格首列：只有它确实窄、且表格需要横向滚动时才吸附。
  // 宽列吸附会占掉小屏四分之一宽度，比不吸附更难受。
  function syncTablePins() {
    document.querySelectorAll(".site-table-wrap").forEach(function (wrap) {
      var table = wrap.querySelector("table");
      var cell = wrap.querySelector("tbody td:first-child") || wrap.querySelector("th:first-child");
      if (!table || !cell) return;
      var needsScroll = wrap.scrollWidth > wrap.clientWidth + 1;
      var narrow = cell.getBoundingClientRect().width <= wrap.clientWidth * 0.4;
      wrap.classList.toggle("pin-first", needsScroll && narrow);
    });
  }
  syncTablePins();
  window.addEventListener("resize", syncTablePins);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncTablePins);

  // 移动端顶栏随滚动方向滑出／滑入（Edge 那种）：往下滚让出视野，往上滚立刻回来。
  var headerEl = document.querySelector(".site-header");
  var narrowMq = window.matchMedia("(max-width: 820px)");
  var lastScrollY = window.scrollY;
  var headerTicking = false;
  function syncHeaderOnScroll() {
    if (headerTicking) return;
    headerTicking = true;
    requestAnimationFrame(function () {
      headerTicking = false;
      var y = window.scrollY;
      if (!narrowMq.matches || html.classList.contains("nav-open")) {
        headerEl.classList.remove("is-hidden");
        lastScrollY = y;
        return;
      }
      var delta = y - lastScrollY;
      if (Math.abs(delta) < 4) return;
      if (y < 80) headerEl.classList.remove("is-hidden");
      else if (delta > 0) headerEl.classList.add("is-hidden");
      else headerEl.classList.remove("is-hidden");
      lastScrollY = y;
    });
  }
  window.addEventListener("scroll", syncHeaderOnScroll, { passive: true });

  // 图片放大：点正文里的图片开灯箱，点遮罩或 Esc 关闭
  var lightbox = document.createElement("div");
  lightbox.className = "site-lightbox";
  lightbox.innerHTML = '<button class="site-lightbox-close" type="button" aria-label="关闭">×</button>';
  document.body.appendChild(lightbox);
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
  }
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("site-lightbox-close")) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
  document.querySelectorAll(".site-main #write img").forEach(function (img) {
    if (img.closest("a")) return;
    img.style.cursor = "zoom-in";
    img.addEventListener("click", function () {
      var big = document.createElement("img");
      big.src = img.currentSrc || img.src;
      big.alt = img.alt || "";
      var old = lightbox.querySelector("img");
      if (old) old.remove();
      lightbox.appendChild(big);
      lightbox.classList.add("is-open");
      document.body.classList.add("lightbox-open");
    });
  });

  // 小屏的文档目录：左侧抽屉，点按钮开合，点遮罩或链接关闭
  var navBtn = document.querySelector(".site-nav-toggle");
  var navScrim = document.querySelector(".site-nav-scrim");
  function setNavOpen(open) {
    html.classList.toggle("nav-open", open);
    if (navBtn) navBtn.setAttribute("aria-expanded", String(open));
  }
  if (navBtn) navBtn.addEventListener("click", function () {
    setNavOpen(!html.classList.contains("nav-open"));
  });
  if (navScrim) navScrim.addEventListener("click", function () { setNavOpen(false); });
  document.querySelectorAll("#site-nav-links a").forEach(function (link) {
    link.addEventListener("click", function () { setNavOpen(false); });
  });
  if (btn) btn.addEventListener("click", function () { setClosed(!closed(), !mq.matches); });
  if (scrim) scrim.addEventListener("click", function () { setClosed(true, false); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mq.matches && !closed()) setClosed(true, false);
  });
  function onViewportChange() {
    if (mq.matches) setClosed(true, false);
    else { var saved = null; try { saved = localStorage.getItem("morz.site-rail"); } catch (e) { /* ignore */ } setClosed(saved === "closed", false); }
  }
  if (mq.addEventListener) mq.addEventListener("change", onViewportChange);
  else if (mq.addListener) mq.addListener(onViewportChange);

  // 大纲：滚动时高亮当前小节
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-outline a[href^='#'], .site-tick[href^='#']"));
  if (links.length) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var currentHref = null;
      for (var i = 0; i < links.length; i++) {
        var id = links[i].getAttribute("href").slice(1);
        var el = document.getElementById(decodeURIComponent(id));
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) currentHref = links[i].getAttribute("href");
      }
      // 右侧大纲和左侧刻度是同一个锚点的两份表示，要一起高亮
      for (var j = 0; j < links.length; j++) {
        links[j].classList.toggle("is-current", links[j].getAttribute("href") === currentHref);
      }
    };
    var onScroll = function () { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  // 明暗切换：两份样式表只启用一份，选择记在本地
  var themeBtn = document.querySelector(".site-theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var dark = !html.classList.contains("site-dark");
    var light = document.getElementById("site-theme-light");
    var darkSheet = document.getElementById("site-theme-dark");
    html.classList.toggle("site-dark", dark);
    if (light) light.media = dark ? "not all" : "all";
    if (darkSheet) darkSheet.media = dark ? "all" : "not all";
    try { localStorage.setItem("morz.site-theme", dark ? "dark" : "light"); } catch (e) { /* 隐私模式 */ }
  });

  // 代码块：语言 + 复制按钮
  Array.prototype.forEach.call(document.querySelectorAll("pre.md-fences"), function (pre) {
    var wrap = document.createElement("div");
    wrap.className = "site-code";
    var bar = document.createElement("div");
    bar.className = "site-code-bar";
    var lang = document.createElement("span");
    lang.className = "site-code-lang";
    lang.textContent = pre.getAttribute("lang") || "";
    var copy = document.createElement("button");
    copy.type = "button";
    copy.className = "site-code-copy";
    copy.textContent = "复制";
    copy.addEventListener("click", function () {
      var text = pre.textContent || "";
      var done = function () {
        copy.textContent = "已复制";
        copy.classList.add("is-done");
        window.setTimeout(function () { copy.textContent = "复制"; copy.classList.remove("is-done"); }, 1200);
      };
      var fallback = function () {
        var area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* 不支持就算了 */ }
        area.remove();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
    bar.appendChild(lang);
    bar.appendChild(copy);
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(bar);
    wrap.appendChild(pre);
  });

  // 左侧刻度：悬停/聚焦显示标题；fixed 定位，避免被刻度列的滚动容器裁掉
  var ticks = Array.prototype.slice.call(document.querySelectorAll(".site-tick"));
  var tickTip = document.querySelector(".site-tick-tip");
  if (ticks.length && tickTip) {
    var showTickTip = function (tick) {
      var rect = tick.getBoundingClientRect();
      tickTip.textContent = tick.getAttribute("aria-label") || "";
      tickTip.hidden = false;
      tickTip.style.left = Math.round(rect.left - 8) + "px";
      tickTip.style.top = Math.round(rect.top + rect.height / 2) + "px";
      tickTip.style.transform = "translate(-100%, -50%)";
    };
    var hideTickTip = function () { tickTip.hidden = true; };
    ticks.forEach(function (tick) {
      tick.addEventListener("mouseenter", function () { showTickTip(tick); });
      tick.addEventListener("focus", function () { showTickTip(tick); });
      tick.addEventListener("mouseleave", hideTickTip);
      tick.addEventListener("blur", hideTickTip);
    });
    window.addEventListener("scroll", hideTickTip, { passive: true });
  }

  // 局部图谱：1 跳邻域，径向初始 + 轻量排斥/收缩，稳定后停止
  var host = document.querySelector(".site-graph-canvas");
  var dataEl = document.querySelector(".site-graph-data");
  if (!host || !dataEl) return;
  var data;
  try { data = JSON.parse(dataEl.textContent || "{}"); } catch (e) { return; }
  var nodes = (data.nodes || []).slice(0, 16);
  if (nodes.length < 2) {
    var empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "还没有关联文档";
    host.appendChild(empty);
    return;
  }
  // 1 跳邻域用固定径向布局：中心 + 均匀分布的外环，稳定、不抖动，
  // 文档站单页通常 3–8 个邻居，不需要力导向。
  var W = 236, H = 186, CX = W / 2, CY = H / 2;
  var byId = {};
  var ring = Math.max(1, nodes.length - 1);
  nodes.forEach(function (node, i) {
    byId[node.id] = node;
    if (i === 0) { node.x = CX; node.y = CY; return; }
    var angle = ring === 1 ? -Math.PI / 2 : ((i - 1) / ring) * Math.PI * 2 - Math.PI / 2;
    node.x = CX + Math.cos(angle) * 74;
    node.y = CY + Math.sin(angle) * 62;
  });
  var edges = (data.edges || []).filter(function (e) { return byId[e[0]] && byId[e[1]]; });
  var NS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "局部图谱");
  var lineMap = {};
  edges.forEach(function (e) {
    var line = document.createElementNS(NS, "line");
    line.setAttribute("class", "edge");
    line.setAttribute("x1", byId[e[0]].x); line.setAttribute("y1", byId[e[0]].y);
    line.setAttribute("x2", byId[e[1]].x); line.setAttribute("y2", byId[e[1]].y);
    line.dataset.from = e[0]; line.dataset.to = e[1];
    lineMap[e[0] + "|" + e[1]] = line;
    svg.appendChild(line);
  });
  // 邻居多时只显示中心标签，悬停再展开邻域名称，避免右栏变成一团字
  var dense = nodes.length > 8;
  var labelOf = function (node) { return String(node.title || "").slice(0, 6); };
  nodes.forEach(function (node, i) {
    var g = document.createElementNS(NS, "g");
    g.setAttribute("class", "node" + (i === 0 ? " center" : ""));
    g.dataset.id = node.id;
    var circle = document.createElementNS(NS, "circle");
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y);
    circle.setAttribute("r", i === 0 ? 6.5 : 4.5);
    var text = document.createElementNS(NS, "text");
    text.setAttribute("x", node.x); text.setAttribute("y", node.y + (i === 0 ? 17 : 14));
    text.setAttribute("text-anchor", "middle");
    text.textContent = dense && i !== 0 ? "" : labelOf(node);
    var tip = document.createElementNS(NS, "title");
    tip.textContent = String(node.title || "");
    g.appendChild(circle); g.appendChild(text); g.appendChild(tip);
    g.addEventListener("pointerenter", function () {
      var hot = {};
      hot[node.id] = true;
      edges.forEach(function (e) {
        if (e[0] === node.id) hot[e[1]] = true;
        if (e[1] === node.id) hot[e[0]] = true;
      });
      nodes.forEach(function (other) {
        var el = svg.querySelector('.node[data-id="' + other.id.replace(/"/g, "") + '"]');
        if (!el) return;
        el.classList.toggle("hot", !!hot[other.id]);
        el.classList.toggle("dim", !hot[other.id]);
        if (dense) {
          var t = el.querySelector("text");
          if (t) t.textContent = hot[other.id] ? labelOf(other) : "";
        }
      });
      Object.keys(lineMap).forEach(function (key) {
        var line = lineMap[key];
        var on = key.indexOf(node.id + "|") === 0 || key.indexOf("|" + node.id) === key.length - node.id.length - 1;
        line.style.opacity = on || hot[line.dataset.from] && hot[line.dataset.to] ? "1" : "0.18";
      });
    });
    g.addEventListener("pointerleave", function () {
      nodes.forEach(function (other) {
        var el = svg.querySelector('.node[data-id="' + other.id.replace(/"/g, "") + '"]');
        if (!el) return;
        el.classList.remove("hot");
        el.classList.remove("dim");
        if (dense) {
          var t = el.querySelector("text");
          if (t) t.textContent = other.id === data.center ? labelOf(other) : "";
        }
      });
      Object.keys(lineMap).forEach(function (key) { lineMap[key].style.opacity = ""; });
    });
    g.addEventListener("click", function () { if (node.href) location.href = node.href; });
    svg.appendChild(g);
  });
  host.appendChild(svg);
})();
