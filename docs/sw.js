self.addEventListener("install", e => {
  e.waitUntil(caches.open("pm-cache-v1").then(cache => cache.addAll(["./"])));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});