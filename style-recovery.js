// 旧版 Service Worker 可能还留着上一次部署的 HTML，其中带哈希的 CSS 已被新部署
// 删除；浏览器会拿到 Pages 的 HTML 回退（MIME 错误），页面整块无样式。
// 只在线时自动注销一次 SW 并刷新；sessionStorage 防止循环，离线时不动作。
// 独立文件而不是内联：生产 CSP 的 script-src 只允许 'self'。
(function () {
  addEventListener("error", function (event) {
    var link = event.target;
    if (!link || link.tagName !== "LINK" || link.rel !== "stylesheet") return;
    if (!navigator.onLine || sessionStorage.getItem("morz.style-reload")) return;
    sessionStorage.setItem("morz.style-reload", "1");
    var registrations = navigator.serviceWorker && navigator.serviceWorker.getRegistrations
      ? navigator.serviceWorker.getRegistrations()
      : Promise.resolve([]);
    registrations
      .then(function (list) { return Promise.all(list.map(function (registration) { return registration.unregister(); })); })
      .finally(function () { location.reload(); });
  }, true);
})();
