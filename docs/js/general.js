$(() => {
	$(".tooltipped").tooltip({ delay: 50 });
	$(".modal").modal();

	// Init Firebase nuevamente
	firebase.initializeApp(varConfig);

	const messaging = firebase.messaging();
	messaging.usePublicVapidKey(
		"BF5WfoOpg_Amcj5o9a1X8-IPdDDFsrTNWz5U0Bh0Pwkd3RBvAJ4VufTCLkqlzv1L8prWQcuadsSABYJtp0KEWoY"
	);

	messaging
		.getToken({
			vapidKey:
				"BF5WfoOpg_Amcj5o9a1X8-IPdDDFsrTNWz5U0Bh0Pwkd3RBvAJ4VufTCLkqlzv1L8prWQcuadsSABYJtp0KEWoY"
		})
		.then((currentToken) => {
			if (currentToken) {
				console.log("Service worker registrado");
			} else {
				console.log("Se se obtuvo token por puede que sea falta de permisos.");
			}
		})
		.catch((error) => {
			console.error(`Error al registar el service worker => ${error}`);
		});

	Notification.requestPermission()
		.then(() => {
			console.log("permiso otorgado");
			return messaging.getToken();
		})
		.then((token) => {
			// console.log("Token: ", token);
			const db = firebase.firestore();
			db.collection("tokens").doc(token).set({ token });
		})
		.catch((error) =>
			console.error(`Error al insertar el stoken en la BD => ${error}`)
		);

	messaging.onTokenRefresh(() => {
		messaging
			.getToken()
			.then((token) => {
				console.log("token se ha  renovado");
				const db = firebase.firestore();
				db.collection("tokens").doc(token).set({ token });
			})
			.catch((error) =>
				console.err(`Error al insertar el stoken en la BD => ${error}`)
			);
	});

	messaging.onMessage((payload) => {
		Materialize.toast(`${payload.data.titulo}`, 6000);
	});

	const post = new Post();
	post.consultarTodosPost();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			$("#btnInicioSesion").text("Salir");
			if (user.photoURL) {
				$("#avatar").attr("src", user.photoURL);
			} else {
				$("#avatar").attr("src", "imagenes/usuario_auth.png");
			}
		} else {
			$("#btnInicioSesion").text("Iniciar Sesión");
			$("#avatar").attr("src", "imagenes/usuario.png");
		}
	});

	$("#btnInicioSesion").click(() => {
		const user = firebase.auth().currentUser;
		if (user) {
			$("#btnInicioSesion").text("Iniciar Sesión");
			return firebase
				.auth()
				.signOut()
				.then(() => {
					$("#avatar").attr("src", "imagenes/usuario.png");
					Materialize.toast(`Signout correcto`, 4000);
				})
				.catch((error) => {
					Materialize.toast(`Error al realizar SignOut => ${error}`, 4000);
				});
		}
		$("#emailSesion").val("");
		$("#passwordSesion").val("");
		$("#modalSesion").modal("open");
	});

	$("#avatar").click(() => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				$("#avatar").attr("src", "imagenes/usuario.png");
				Materialize.toast(`SignOut correcto`, 4000);
			})
			.catch((error) => {
				Materialize.toast(`Error al realizar SignOut ${error}`, 4000);
			});
	});

	$("#btnTodoPost").click(() => {
		$("#tituloPost").text("Posts de la Comunidad");
		post.consultarTodosPost();
	});

	$("#btnMisPost").click(() => {
		const user = firebase.auth().currentUser;
		if (user) {
			post.consultarPostxUsuario(user.email);
			$("#tituloPost").text("Mis Posts");
		} else {
			Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000);
		}
	});
});
