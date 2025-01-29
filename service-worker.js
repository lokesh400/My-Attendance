self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('my-pwa-cache').then((cache) => {
        return cache.addAll([
          '/', // Add the necessary files for your website to be cached
          '/index.html',
          '/styles.css',
          '/app.js', // or whatever JS files you are using
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        return cachedResponse || fetch(e.request);
      })
    );
  });
  