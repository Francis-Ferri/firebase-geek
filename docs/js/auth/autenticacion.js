class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        if(result.user.emailVerified){
          $('#avatar').attr('src', 'imagenes/usuario_auth.png')
          Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
        } else {
          firebase.auth().signOut()
          Materialize.toast(`Por favor realiza la verificacion de la cuenta ${result.user.displayName}`, 5000)
        }
        $('.modal').modal('close')
      })
      .catch(console.log)
    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    //$('.modal').modal('close')
   
  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayName: nombres
        })

        const configuracion = {
          url: 'http://localhost:5500/public/index.html'
        }

        result.user.sendEmailVerification(configuracion)
        .catch(error => {
            console.log(error);
            Materialize.toast(error.message, 4000);
          }
        )

        firebase.auth().signOut();
        
        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
        )
        $('.modal').modal('close')
      })
      .catch(error => {
        console.log(error);
        Materialize.toast(error.message, 4000);
      })

    /*Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )

    $('.modal').modal('close')*/
    
  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        $('#avatar').attr('src', result.user.photoURL);
        $('.modal').modal('close');
        Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
      })
      .catch(error => {
        console.eror(error);
        Materialize.toast(`error al autenticarse con Google: ${error}!! `, 4000);
      })
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        $('#avatar').attr('src', result.user.photoURL);
        $('.modal').modal('close');
        Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
      })
      .catch(error => {
        console.error(error);
        Materialize.toast(`Error al autenticarse con facebook: ${error}!! `, 4000);
      })
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaTwitter () {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        $('#avatar').attr('src', result.user.photoURL);
        $('.modal').modal('close');
        Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
      }).catch((error) => {
        console.error(error);
        Materialize.toast(`Error al autenticarse con twitter: ${error}!! `, 4000);
      });
  }

  changePassword(email){
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(() => {
      Materialize.toast(`Correo de recuperación enviado`, 4000);
    }).catch((error) => {
      console.error(error);
      Materialize.toast(`No se pudo en viar el correo electronico de recuperación al email: ${email}`, 4000);
    });
  }


  
}
