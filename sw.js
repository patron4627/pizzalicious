self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/images/logo.png',  // Wichtige Bilder vorher cachen
                '/videos/intro.mp4'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
