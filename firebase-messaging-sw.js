importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyBJ1DbqvnlbXOHYP5NyWICWB25iG4k8crU",
    authDomain: "blogeekfrancis.firebaseapp.com",
    projectId: "blogeekfrancis",
    storageBucket: "blogeekfrancis.appspot.com",
    messagingSenderId: "1045941202853",
    appId: "1:1045941202853:web:03ece8f32098294945024c",
    measurementId: "G-J3M9YEYVP8"
});

// TODO: Recibir las notificaciones cuando el usuario esta background
const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
    const tituloNotificaion = 'Ya tenemos un nuevo post';
    const opcionesNotificacion = {
        body: payload.data.titulo,
        icon: './icons/icon_new_post.png',
        click_action: "https://blogeekfrancis.web.app"
    };
    self.registration.showNotification(tituloNotificaion, opcionesNotificacion);
});
