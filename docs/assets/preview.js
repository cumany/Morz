(function () {
  var DELAY = 300, HIDE_DELAY = 160;
  var card = null, anchor = null, timer = 0, hideTimer = 0, generation = 0;
  var hovered = null;
  var cache = {};
  function close() {
    window.clearTimeout(timer); window.clearTimeout(hideTimer); generation++;
    if (card) { card.remove(); card = null; }
    anchor = null;
  }
  function hideSoon() {
    if (!card) return;
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(close, HIDE_DELAY);
  }
  function internal(link) {
    var href = link.getAttribute("href") || "";
    if (!href || href.charAt(0) === "#") return false;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return false;
    return /\.html(?:#|$)/.test(href);
  }
  function place(el, link) {
    var rect = link.getBoundingClientRect();
    var box = el.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight;
    var left = Math.min(Math.max(8, rect.left), Math.max(8, vw - box.width - 8));
    var top = rect.bottom + 8;
    if (top + box.height > vh - 8) top = Math.max(8, rect.top - box.height - 8);
    el.style.left = Math.round(left) + "px";
    el.style.top = Math.round(top) + "px";
  }
  function build(link, html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var source = doc.querySelector("#write");
    if (!source) return;
    var href = link.getAttribute("href") || "";
    var url = href.split("#")[0];
    var hash = href.split("#")[1] || "";
    var el = document.createElement("div");
    el.className = "site-preview";
    el.setAttribute("role", "dialog");
    var head = document.createElement("div");
    head.className = "site-preview-head";
    var strong = document.createElement("strong");
    var heading = source.querySelector("h1,h2,h3");
    strong.textContent = heading ? heading.textContent : (link.textContent || url);
    var small = document.createElement("small");
    try { small.textContent = decodeURIComponent(url); } catch (e) { small.textContent = url; }
    var open = document.createElement("a");
    open.className = "site-preview-open";
    open.href = href;
    open.textContent = "打开";
    head.appendChild(strong); head.appendChild(small); head.appendChild(open);
    var body = document.createElement("div");
    body.className = "site-preview-body";
    var clone = source.cloneNode(true);
    // 目标页的 [TOC] 在预览卡里只是噪声，去掉
    var toc = clone.querySelector(".md-toc");
    if (toc) toc.remove();
    body.appendChild(clone);
    var foot = document.createElement("div");
    foot.className = "site-preview-foot";
    foot.textContent = "单击链接打开 · Ctrl/Cmd+单击新标签 · Esc 关闭";
    el.appendChild(head); el.appendChild(body); el.appendChild(foot);
    document.body.appendChild(el);
    card = el; anchor = link;
    place(el, link);
    if (hash) {
      var target = null;
      try { target = clone.querySelector("#" + CSS.escape(decodeURIComponent(hash))); } catch (e) { /* 旧浏览器 */ }
      if (target) body.scrollTop = target.offsetTop - 8;
    }
    el.addEventListener("pointerenter", function () { window.clearTimeout(hideTimer); });
    el.addEventListener("pointerleave", hideSoon);
  }
  function show(link) {
    var href = link.getAttribute("href") || "";
    var url = href.split("#")[0];
    var gen = ++generation;
    if (cache[url]) { build(link, cache[url]); return; }
    fetch(url).then(function (response) { return response.ok ? response.text() : ""; }).then(function (html) {
      if (!html || gen !== generation) return;
      cache[url] = html;
      build(link, html);
    }).catch(function () { /* 静默失败：不弹卡片即可 */ });
  }
  function schedule(link) {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () { timer = 0; show(link); }, DELAY);
  }
  document.addEventListener("pointerover", function (event) {
    if (event.pointerType && event.pointerType !== "mouse") return;
    var target = event.target;
    var link = target && target.closest ? target.closest("a[href]") : null;
    if (!link || (card && card.contains(link))) return;
    if (!internal(link)) { hovered = null; return; }
    hovered = link;
    if (link === anchor) { window.clearTimeout(hideTimer); return; }
    if (event.ctrlKey || event.metaKey) schedule(link);
  });
  document.addEventListener("pointerout", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest("a[href]") : null;
    if (!link || link !== hovered) return;
    if (link.contains(event.relatedTarget)) return;
    hovered = null;
    hideSoon();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { close(); return; }
    if ((event.key === "Control" || event.key === "Meta") && hovered && !card) schedule(hovered);
  });
  document.addEventListener("keyup", function (event) {
    if (event.key === "Control" || event.key === "Meta") { window.clearTimeout(timer); timer = 0; }
  });
  window.addEventListener("scroll", function (event) {
    if (!card) return;
    if (event.target && card.contains(event.target)) return;
    close();
  }, true);
})();
