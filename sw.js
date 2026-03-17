const CACHE_NAME = 'redx-admin-v1';
const ASSETS = [
  'index.html',
  'admin_manifest.json',
  'logo.png'
];

// تثبيت ملف الـ Service Worker وحفظ الملفات الأساسية في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل الملف ومسح الكاش القديم إذا وجد
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// استجابة الطلبات (يجعل التطبيق يفتح بسرعة)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
