const CACHE_NAME = "listening-test-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/1.mp3",
  "/2.mp3",
  "/3.mp3",
  "/4.mp3",
  "/5.mp3",
  "/6.mp3",
  "/7.mp3",
  "/8.mp3",
  "/9.mp3",
  "/10.mp3",
  "/11.mp3",
  "/12.mp3",
  "/13.mp3",
  "/14.mp3",
  "/15.mp3",
  "/16.mp3",
  "/17.mp3",
  "/18.mp3",
  "/19.mp3",
  "/20.mp3",
  "/21.mp3",
  "/22.mp3",
  "/23.mp3",
  "/24.mp3",
  "/25.mp3",
  "/26.mp3",
  "/27.mp3",
  "/28.mp3",
  "/29.mp3",
  "/30.mp3",
  "/31.mp3",
  "/32.mp3",
  "/33.mp3",
];

// Cài đặt Service Worker và cache các tài nguyên cần thiết
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Lấy tài nguyên từ cache nếu có, nếu không thì fetch từ mạng
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Xóa cache cũ khi cập nhật Service Worker mới
self.addEventListener("activate", function (event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
