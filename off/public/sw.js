self.skipWaiting();
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

const CACHE = "catalogue-v1";

self.addEventListener("fetch", event => {
  const { request } = event;

  // Images → Cache First
  if (request.destination === "image") {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(request).then(
          response =>
            response ||
            fetch(request).then(networkResponse => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
        )
      )
    );
    return;
  }

  // Pages & API → Network First
  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request))
  );
});