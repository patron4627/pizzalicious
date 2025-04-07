self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/images/logo.png',
        '/videos/intro.mp4'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  // Wenn die Anfrage content.json betrifft, hole sie immer vom Server
  if (url.includes('content.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }) // Kein Cache für diese Anfrage
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
