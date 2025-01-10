const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/', // Root
    '/index.html', // Main HTML
    '/style.css', // CSS
    '/script.js', // JS
    '/icon-192x192.png', // Icon
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Pre-caching resources...');
                return cache.addAll(urlsToCache)
                    .catch(err => {
                        console.error('[Service Worker] Cache add failed:', err);
                        // You can log each failed URL here for debugging.
                    });
            })
    );
});
