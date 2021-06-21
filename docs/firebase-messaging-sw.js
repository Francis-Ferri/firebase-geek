importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");

firebase.initializeApp({
	apiKey: "AIzaSyBXcRz9FhtwAisVnbTE7PLbq93DMNKlzBs",
	authDomain: "francis-projects.firebaseapp.com",
	projectId: "francis-projects",
	storageBucket: "francis-projects.appspot.com",
	messagingSenderId: "1000396606347",
	appId: "1:1000396606347:web:2fd6d7b95246c3790c7d8e",
	measurementId: "G-Q184QXZ4Y4"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
	const tituloNotificaion = "Ya tenemos un nuevo post";
	const opcionesNotificacion = {
		body: payload.data.titulo,
		icon: "./icons/icon_new_post.png",
		click_action: "https://francis-projects.web.app/"
	};
	self.registration.showNotification(tituloNotificaion, opcionesNotificacion);
});

// https://francis-projects.web.app/
