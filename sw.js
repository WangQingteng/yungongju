// 引入Workbox（需先通过npm安装：npm install workbox-cli）
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// 缓存静态资源（HTML/CSS/JS/图标）
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'document' || 
                  request.destination === 'script' || 
                  request.destination === 'style' || 
                  request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'minimal-tools-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({ maxAgeSeconds: 7 * 24 * 60 * 60 }) // 缓存7天
    ]
  })
);

// 缓存依赖库（CDN资源）
workbox.routing.registerRoute(
  new RegExp('^https://cdn\\.(tailwindcss|jsdelivr)\\.net/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'cdn-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({ maxAgeSeconds: 30 * 24 * 60 * 60 }) // 缓存30天
    ]
  })
);
