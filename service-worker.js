const CACHE_NAME = 'pwa-cache-v1';
    const urlsToCache = [
			'/',
			'https://m.facebook.com',
      '/index.html',
      '/style.css',
      '/script.js',
      '/manifest.json',
      '/icon-192x192.png',
      '/icon-512x512.png'
    ];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(event.request);
          })
      );
    });