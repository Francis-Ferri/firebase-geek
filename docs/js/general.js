$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // Init Firebase nuevamente
  firebase.initializeApp(varConfig);
  
  // TODO: Registrar LLave publica de messaging
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey("BNUudqt6UFpisYrfc3F-U1aa2yHS1e1rCcjrHGxk2aJzO9m9udPmggXO9Z_c2NVFgG4Q5rX4ImCOFNvGwYySvyg")

  // TODO: Adicionar el service worker
  messaging.getToken({ vapidKey: 'BNUudqt6UFpisYrfc3F-U1aa2yHS1e1rCcjrHGxk2aJzO9m9udPmggXO9Z_c2NVFgG4Q5rX4ImCOFNvGwYySvyg' }).then((currentToken) => {
    if (currentToken) {
      console.log("Service worker registrado");
    } else {
      // Show permission request UI
      console.log('Se se obtuvo token por puede que sea falta de permisos.');
    }
  }).catch((err) => {
    console.error(`Error al registar el service worker => ${error}`);
  });
  
  // TODO: Solicitar permisos para las notificaciones
  Notification.requestPermission()
    .then(() => {
      console.log("permiso otorgado");
      return messaging.getToken();
    })
    .then(token => {
      console.log("Token: ",token);
      const db = firebase.firestore()
      db.collection('tokens').doc(token).set({token})
    })
    .catch( error => console.error(`Error al insertar el stoken en la BD => ${error}`));

  // TODO: Obtener el token cuando se refresca
  messaging.onTokenRefresh(() => {
    messaging.getToken()
      .then(token => {
        console.log("token se ha  renovado");
        const db = firebase.firestore()
        //db.settings({timestampsInSnapshots: true})
        db.collection('tokens').doc(token).set({token})
      })
      // catch?
      .catch( error => console.err(`Error al insertar el stoken en la BD => ${error}`))
  })

  // TODO: Recibir las notificaciones cuando el usuario esta foreground
  messaging.onMessage(payload => {
    Materialize.toast(`${payload.data.titulo}`, 6000);
  })

  // TODO: Listening real time
  const post = new Post();
  post.consultarTodosPost();

  // TODO: Firebase observador del cambio de estado
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      $('#btnInicioSesion').text('Salir');
      if(user.photoURL){
        $('#avatar').attr('src', user.photoURL);
      }else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png');
      }
    } else{
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png')
    }
  })

  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser
    if (user){
      $('#btnInicioSesion').text('Iniciar Sesión')
      return firebase.auth().signOut()
        .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png')
          Materialize.toast(`Signout correcto`, 4000)
        })
        .catch((error) => {
          Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
        })
    }   
    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    // Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
  })

  $('#avatar').click(() => {
    firebase.auth().signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png');
        Materialize.toast(`SignOut correcto`, 4000)
      })
      .catch( (error) => {
        Materialize.toast(`Error al realizar SignOut ${error}`, 4000);
      })
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    //Materialize.toast(`SignOut correcto`, 4000)
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')   
    post.consultarTodosPost();
  })

  $('#btnMisPost').click(() => {
    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
    const user = firebase.auth().currentUser;
    if (user){
      post.consultarPostxUsuario(user.email)
      $('#tituloPost').text('Mis Posts');
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000);
    }
  })
})
