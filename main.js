// Check support for ServiceWorkers

if('serviceWorker' in navigator) {
  console.log("ServiceWorkers supported")
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw_cached_site.js")
      .then(reg => console.log("Registered serviceworker"))
      .catch(err => console.error(`ServiceWorker error: ${err}`))
  })
}
