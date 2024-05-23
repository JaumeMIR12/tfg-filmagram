var Registro = {
    nombre: "",
    email: "",
    contraseña: "",
    errores: {
        email: "",
        contraseña: ""
    },

    validarEmail: function() {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEmail.test(Registro.email)) {
            this.errores.email = "Debe ser un correo electrónico válido de Gmail";
        } else {
            this.errores.email = "";
        }
    },
    validarContraseña: function() {
        const regexContraseña = /^(?=.*\d).{6,}$/;
        if (!regexContraseña.test(Registro.contraseña)) {
            this.errores.contraseña = "La contraseña debe tener al menos 6 caracteres y al menos un número";
        } else {
            this.errores.contraseña = "";
        }
    },

    registrarUsuario: function() {

        Registro.validarEmail();
        Registro.validarContraseña();

        if (this.errores.email === "" && this.errores.contraseña === "") {

            m.request({
                method: "POST",
                url: "/api/usuarios/registro",
                body: {
                    nombre: Registro.nombre,
                    email: Registro.email,
                    contraseña: Registro.contraseña
                }
            }).then(function(response) {
                console.log("Usuario registrado exitosamente");
                console.log(response);
                console.log(response.insignia);
                localStorage.setItem("DatosUsuario", response)
                localStorage.setItem('username', response.nombre);
                localStorage.setItem('usuarioId', response.id);
                localStorage.setItem('insigniaUser', response.insignia.puntuacionMinima);
                localStorage.setItem('insigniaInfo', response.insignia);
                window.location.href = 'index.html';
                
                
            }).catch(function(error) {
                console.error("Error al registrar usuario:", error);
            });
        } else {
            document.getElementById("error").textContent = 'Credenciales no cumplen las normas de seguridad. Por favor, inténtalo de nuevo.';
            console.log("Errores en el formulario");
        }
    }
};

m.mount(document.body, {
    view: function() {
        return m("div.container", [
            m("h2", "Registro"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    Registro.registrarUsuario();
                }
            }, [
                m("input[type=text]", {
                    placeholder: "Nombre de Usuario",
                    onchange: function(event) { Registro.nombre = event.target.value; },
                    required: true
                }),
                m("input[type=email]", {
                    placeholder: "Correo Electrónico",
                    onchange: function(event) { Registro.email = event.target.value; },
                    required: true
                }),
                m("div#error", { style: 'color: red;' }),
                m("input[type=password]", {
                    placeholder: "Contraseña",
                    onchange: function(event) { Registro.contraseña = event.target.value; },
                    required: true
                }),
                m("input[type=submit]", { value: "Registrarse" })
            ]),
            m("p", "¿Ya tienes una cuenta? ", [
                m("a", { href: "index.html" }, "Inicia sesión aquí")
            ])
        ]);
    }
});
