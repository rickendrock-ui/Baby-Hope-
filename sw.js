// Ganti versi cache ini (misal: 'v2', 'v3') setiap kali Anda memperbarui aplikasi
const CACHE_NAME = 'app-cache-v2'; // Naikkan versi dari v1 ke v2

// Daftar file yang disimpan agar bisa dibuka offline
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
  // Tambahkan file .css atau .js lain jika ada
];

// 1. Install Service Worker & Simpan Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Hapus Cache Lama Saat Ada Versi Baru
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

// 3. Ambil Data dari Cache Saat Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// 4. Menerima Sinyal dari Halaman Utama untuk Segera Memperbarui
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});