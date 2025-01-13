// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('radios-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/js/app.js',
        'https://cdn.jsdelivr.net/npm/plyr@3.7.6/dist/plyr.css',
        'https://cdn.jsdelivr.net/npm/plyr@3.7.6/dist/plyr.js',
        'icon.png'
      ]);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['radios-cache']; // Mantener solo esta versión de caché
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Manejo de peticiones de red con caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
