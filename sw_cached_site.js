const cacheName = 'siteV1'

// Install event
self.addEventListener('install', (e) => {
  console.log('SW: Installed')
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
    fetch(e.request)
      .then(res => {
        // Clone the response
        const resClone = res.clone()
        // Open cache
        caches.open(cacheName)
          .then(cache => { 
            cache.put(e.request, resClone)
          })
        return res
      })
    .catch(err => caches.match(e.request).then(res => res))
  )
})
