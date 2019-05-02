if (!('serviceWorker' in navigator) && !('PushManager' in window)) {
    console.warn('Service worker not supported.');
    // return;
} else {

    function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
    
        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);
    
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }    
    
    function registerServiceWorker() {
        return navigator.serviceWorker.register('service-worker.js')    
        .then(function(registration) {
            console.log('Service worker successfully registered.');
            return registration;
        })
            .catch(function(err) {
            console.error('Unable to register service worker.', err);
        });
    }

    registerServiceWorker();

    function askPermission() {
        return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });
        
        if (permissionResult) {
            permissionResult.then(resolve, reject);
            }
        })
        .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
            }
        });
    }
    
    askPermission();

    function getSWRegistration() {
        return navigator.serviceWorker.register('service-worker.js');
    }    

    function subscribeUserToPush() {
        return getSWRegistration().then(function(registration) {

        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                'BMbTo7EaB33TZUwnrqX5LrUvt6mZSVhZJrzy9LnViEIYvcUjyp00aVLoIHDEGlKWG0bfBJUIDJFisbn6uTbTDOo'
            )
        };

            return registration.pushManager.subscribe(subscribeOptions);

        }).then(function(pushSubscription) {

            console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
            return pushSubscription;
        });
    }

    subscribeUserToPush();

    function sendSubscriptionToBackEnd(subscription) {
        return fetch('save_subscription.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
                body: JSON.stringify(subscription)
            })
        .then(function(response) {
            console.log(response);

            if (!response.ok) {
                throw new Error('Bad status code from server.');
            }

            return response.json();
        })
        .then(function(responseData) {
            console.log(responseData.data);;
        if (!(responseData.data && responseData.data.success)) {
            throw new Error('Bad response from server.');
            }
        });
    }
    
    sendSubscriptionToBackEnd();
}


