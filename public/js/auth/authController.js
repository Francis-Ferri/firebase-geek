$(() => {    

    const objAuth = new Autenticacion();

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        // LLamar crear cuenta con email
        const auth = new Autenticacion();
        auth.crearCuentaEmailPass(email, password, nombres);
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        //LLamar auth cuenta con email
        const auth = new Autenticacion();
        auth.autEmailPass(email, password);
    });

    //$("#authGoogle").click(() => //AUTH con GOOGLE);
    $("#authGoogle").click(() => objAuth.authCuentaGoogle());

    //$("#authFB").click(() => );
    $("#authFB").click(() => objAuth.authCuentaFacebook());
    
    //$("#authTwitter").click(() => //AUTH con Twitter);
    $("#authTwitter").click(() => objAuth.authCuentaTwitter());


    $("#change-password").click(() => { 
        const email = $('#emailSesion').val();
        objAuth.changePassword(email);
    });


    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

});