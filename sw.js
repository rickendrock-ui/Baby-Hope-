const CACHE_NAME = 'app-cache-v3';

// 1. Install & langsung aktifkan Service Worker baru
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. Bersihkan cache lama saat versi diperbarui
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Strategi Network-First untuk navigasi (Mencegah Layar Blank / 404 pada Hash Vite)
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Untuk aset statis lainnya
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// 4. Menerima sinyal skipWaiting dari PWA Update Banner
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});