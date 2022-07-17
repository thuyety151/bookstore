/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCZbclkRcIIIS9oAsKP-V25X4a2_Seiu5o",
    authDomain: "internship-august-2021-b1566.firebaseapp.com",
    databaseURL:
        "https://internship-august-2021-b1566-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "internship-august-2021-b1566",
    storageBucket: "internship-august-2021-b1566.appspot.com",
    messagingSenderId: "648438980588",
    appId: "1:648438980588:web:fe49df0e71a421489a2ac9",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('setBackgroundMessageHandler background message ', payload);

    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return window.self.registration.showNotification("my notification title");
        });
    return promiseChain;
});