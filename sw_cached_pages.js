const cacheName = 'v1'

const cacheAssets = [
  'index.html',
  'about.html',
  'style.css',
  'main.js'
]

// Install event
self.addEventListener('install', (e) => {
  console.log('SW: Installed')
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log("SW: Caching files")
      cache.addAll(cacheAssets)
    })
    .then(() => self.skipWaiting())
  )
})

// Activate
self.addEventListener('activate', (e) => {
  console.log('SW: Activated')
  // Clean up caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache != cacheName) {
            console.log(`Clearing cache: ${cache}`)
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// Handle fetch events
self.addEventListener('fetch', e => {
  console.log("SW: Fetching")
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})
