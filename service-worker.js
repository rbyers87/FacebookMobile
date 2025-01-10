const CACHE_NAME = 'pwa-cache-v2'; // Increment version for updates
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all assets');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('[Service Worker] Cache add failed:', err))
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('[Service Worker] Returning cached asset:', event.request.url);
        return response;
      }
      console.log('[Service Worker] Fetching asset:', event.request.url);
      return fetch(event.request).catch(err => {
        console.error('[Service Worker] Fetch failed:', err);
        throw err;
      });
    })
  );
});
