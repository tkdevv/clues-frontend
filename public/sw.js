const mainCache = "v0.123";

const self = this;
const toCacheReq = (req) => {
  const isTalkingToCardsServer =
    req.indexOf("cluesapp") >= 0 || req.indexOf("analytics") >= 0;
  return !isTalkingToCardsServer;
};

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const fetcher = () =>
    caches.match(e.request).then((cacheRes) => {
      const fetchResp = fetch(e.request).then((fetchRes) => {
        if (toCacheReq(e.request.url)) {
          caches
            .open(mainCache)
            .then((cache) => cache.put(e.request.url, fetchRes.clone()));
        }
        return fetchRes.clone();
      });
      return cacheRes || fetchResp;
    });
  e.respondWith(fetcher());
});
