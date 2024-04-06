self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('v1').then(cache => {
			return cache.addAll([
				'/index.html',
				'/main.css',
				'/main.js',
				// Add other assets you want to cache
			]);
		})
	);
});
  
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});


/*
window.addEventListener('load', () => {
	navigator.serviceWorker.register('/sw.js')
	.then(registration => console.log('Service worker registered: ', registration))
	.catch(registrationError => console.error('Service worker registration failed: ', registrationError));
});
*/