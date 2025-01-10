if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log('[Service Worker] Registered successfully:', registration);
        })
        .catch(error => {
            console.error('[Service Worker] Registration failed:', error);
        });
}
