const UserProfile = {

    usuarioId: localStorage.getItem("usuarioId"),
    // Inicializa el estado del componente
    usuario: {
        nombreusuario: '',
        emailAddress: '',
        password: ''
    },
    originalUser: {},

    // Método para cargar los datos del usuario
    loadUser: function() {
        m.request({
            method: 'GET',
            url: `/api/usuarios/${UserProfile.usuarioId}`, // La URL a tu API que devuelve los datos del usuario
        })
        .then(function(response) {
            // Guarda los datos del usuario en el estado del componente
            UserProfile.usuario = response;
            UserProfile.originalUser = { ...response };
            console.log(response);
            console.log(UserProfile.originalUser);
        })
        .catch(function(error) {
            console.error("Error al cargar los datos del usuario:", error);
        });
    },

    // Método para actualizar los datos del usuario
    updateUser: function(event) {
        

        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        var updatedUser = {
            id: UserProfile.usuarioId,
            nombre: UserProfile.usuario.nombreusuario && UserProfile.usuario.nombreusuario.length >= 2 ? UserProfile.usuario.nombreusuario : UserProfile.originalUser.nombre,
            email: UserProfile.usuario.emailAddress && UserProfile.usuario.emailAddress.length >= 2 ? UserProfile.usuario.emailAddress : UserProfile.originalUser.email,
            contraseña: UserProfile.usuario.password && UserProfile.usuario.password.length >= 2 ? UserProfile.usuario.password : UserProfile.originalUser.contraseña
        };

        m.request({
            method: 'POST',
            url: '/api/usuarios/actualizar', // La URL a tu API para actualizar los datos del usuario
            body: updatedUser
        })
        .then(function(response) {
            alert("Datos actualizados correctamente");
        })
        .catch(function(error) {
            console.error("Error al actualizar los datos del usuario:", error);
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.style.display = 'block';
            errorMessageElement.textContent = 'No se ha podido actualizar la información. Por favor, inténtelo de nuevo.';
        });
    },

    // Inicializa el componente cargando los datos del usuario
    oninit: function() {
        UserProfile.loadUser();
    },

    // Vista del componente
    view: function() {
        return m('form', { onsubmit: UserProfile.updateUser, style: { maxWidth: '600px', margin: 'auto', padding: '1em', border: '1px solid #ccc', borderRadius: '10px' } }, [
            m('h2.mob-hide', { style: { marginBottom: '1em' } }, 'Tu Perfil'),
            m('.col-10.overflow', [
                m('div#error-message', { style: { display: 'none', color: 'red', marginBottom: '1em', border: '1px solid red', padding: '0.5em', borderRadius: '5px', backgroundColor: '#ffe6e6' } }),
                m('section.update-details.section', [
                    m('fieldset', [
                        m('label.mob-subtitle.title-hero', 'Editar'),
                        m('div.app-available-settings.js-hide-in-app', [
                            m('input', { type: 'hidden', name: 'completeSettings', value: 'true' }),
                            m('.form-row', [
                                m('label', { for: 'frm-reg-username' }, 'Nombre de usuario'),
                                m('input', {
                                    type: 'text',
                                    name: 'username',
                                    id: 'frm-reg-username',
                                    class: 'frm-reg-username field ac_input',
                                    value: UserProfile.usuario.nombreusuario,
                                    placeholder: UserProfile.usuario.nombre,
                                    autocomplete: 'off',
                                    oninput: function(e) {
                                        UserProfile.usuario.nombreusuario = e.target.value;
                                    }
                                })
                            ]),
                            m('.form-row.js-email-address-field', [
                                m('label', 'Correo electrónico'),
                                m('input', {
                                    type: 'email',
                                    name: 'emailAddress',
                                    id: 'frm-email-address',
                                    class: 'field',
                                    inputmode: 'email',
                                    autocorrect: 'off',
                                    autocapitalize: 'off',
                                    value: UserProfile.usuario.emailAddress,
                                    placeholder: UserProfile.usuario.email,
                                    oninput: function(e) {
                                        UserProfile.usuario.emailAddress = e.target.value;
                                    }
                                })
                            ]),
                            m('.form-row.js-password-field', [
                                m('label', 'Contraseña'),
                                m('input', {
                                    type: 'password',
                                    name: 'password',
                                    id: 'frm-password',
                                    class: 'field',
                                    inputmode: 'password',
                                    autocorrect: 'off',
                                    autocapitalize: 'off',
                                    value: UserProfile.usuario.password,
                                    oninput: function(e) {
                                        UserProfile.usuario.password = e.target.value;
                                    }
                                })
                            ]),
                            m('.form-row', [
                                m('button', {
                                    type: 'submit',
                                    style: {
                                        backgroundColor: '#1E90FF',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        fontSize: '16px',
                                        margin: '4px 2px',
                                        cursor: 'pointer',
                                        borderRadius: '12px'
                                    }
                                }, 'Actualizar')
                            ])
                        ])
                    ])
                ])
            ])
        ]);
    }
};

// Monta el componente en el DOM
m.mount(document.getElementById("formulario-editar"), UserProfile);