self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    // Redirect to the timer page when the notification is clicked
    if (event.notification.data && event.notification.data.url) {
        clients.openWindow(event.notification.data.url);
    } else {
        clients.openWindow('/'); // Fallback to the home page if URL is not available
    }
});

self.addEventListener('notificationclose', function(event) {
    // You can add custom behavior here when the user closes the notification
});

// New function to handle messages from the client
self.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'redirectToTimer') {
        clients.openWindow(event.data.url);
    }
});
