/**
 * BoodschappenBuddy - Service Worker
 * Zorgt voor offline functionaliteit — alle bestanden worden lokaal gecached.
 * Geen netwerkverzoeken nodig na de eerste installatie.
 */

const CACHE_NAAM = 'boodschappenbuddy-v2';

const TE_CACHEN_BESTANDEN = [
  './',
  './index.html',
  './css/style.css',
  './js/data.js',
  './js/storage.js',
  './js/app.js',
  './manifest.json',
];

// Installeer de service worker en cache alle bestanden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAAM).then((cache) => {
      return cache.addAll(TE_CACHEN_BESTANDEN);
    })
  );
  self.skipWaiting();
});

// Activeer en verwijder oude caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNamen) => {
      return Promise.all(
        cacheNamen
          .filter((naam) => naam !== CACHE_NAAM)
          .map((naam) => caches.delete(naam))
      );
    })
  );
  self.clients.claim();
});

// Intercepteer netwerkaanvragen en serveer vanuit cache (offline-first)
self.addEventListener('fetch', (event) => {
  // Alleen GET-verzoeken cachen
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      // Als het niet in de cache staat, probeer het netwerk
      return fetch(event.request).then((networkResponse) => {
        // Cache het antwoord voor toekomstig gebruik
        if (networkResponse && networkResponse.status === 200) {
          const responseKloon = networkResponse.clone();
          caches.open(CACHE_NAAM).then((cache) => {
            cache.put(event.request, responseKloon);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Geen netwerk en niet in cache — geef een lege 503 terug
        return new Response('Offline — geen verbinding beschikbaar.', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      });
    })
  );
});
