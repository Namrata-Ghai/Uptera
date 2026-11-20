const CACHE_NAME = 'uptera-cache-v1';
const urlsToCache = [
  './app.html',
  './style.css',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondAnswer(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});