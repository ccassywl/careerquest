const CACHE_NAME = 'career-quest-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './logo.png',
    './image_5ecfea.jpg'
];

// Install the service worker and cache the files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Intercept network requests and serve from cache if available
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached version if found, otherwise fetch from network
                return response || fetch(event.request);
            })
    );
});

// Update the cache when a new version is released
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});