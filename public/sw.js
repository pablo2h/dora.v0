const CACHE_NAME = 'dora-festival-cache-v2';
const urlsToCache = [
  '/',
  '/assets/images/logo-dora.png',
  '/assets/images/logo-small.png',
  '/assets/images/main-circle.png',
  '/assets/images/circle-1.png',
  '/assets/images/circle-2.png',
  '/assets/images/circle-3.png',
  '/assets/images/Flyer-Dora-Groove.jpg',
  '/styles/globals.css',
  '/prensa',
  '/downloads/dora-logos.zip',
  '/downloads/dora-press-kit.zip',
  '/downloads/dora-dossier.pdf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});