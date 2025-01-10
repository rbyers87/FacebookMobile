if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')  // Use the root-relative path
        .then(registration => {
            console.log('[Service Worker] Registered successfully:', registration);
        })
        .catch(error => {
            console.error('[Service Worker] Registration failed:', error);
        });
}
