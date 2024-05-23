const SeguidosUsuario = {

    resultado: [],
    // Función para hacer la llamada a la API y mostrar los resultados
    oninit: (vnode) => {
        // Obtener el texto de búsqueda de la URL
        if (localStorage.getItem('usuarioId') == null) {
            var usuarioId = localStorage.getItem('userVisited');
        } else {
            if (localStorage.getItem('userVisited') == localStorage.getItem('usuarioId')){
                var usuarioId = localStorage.getItem('usuarioId');
            } else {
                var usuarioId = localStorage.getItem('userVisited');
            }
        }

        // Hacer la llamada a la API
        m.request({
            method: "GET",
            url: "/api/usuarios/seguidos/" + usuarioId // Pasar el texto de búsqueda como parámetro de la consulta
        }).then((response) => {
            // Mostrar los resultados en la página
            SeguidosUsuario.resultado = response;
            vnode.state.resultados = response;
            console.log(response);
        }).catch((error) => {
            console.error("Error al buscar:", error);
        });
    },
    
    // Vista para mostrar los resultados
    view: (vnode) => {
        
        return m('div', [
            // Mostrar los resultados aquí
            SeguidosUsuario.resultado && SeguidosUsuario.resultado.map((resultado) => {
                return m('div', [
                    resultado[2] === "Director" ? [
                        m('span.nb', "Director: ", [
                            m('a.nombre', {
                                href: '#', // Enlace temporal para evitar que navegue
                                onclick: (e) => {
                                    e.preventDefault();
                                    localStorage.setItem('directorId', resultado[0]);
                                    window.location.href = '/perfilDirector.html'; // Redirigir a la página deseada
                                }
                            }, resultado[1])
                        ])
                    ] : null,
                    resultado[2] === "Actor" ? [
                        m('span.nb', "Actor: ", [
                            m('a.nombre', {
                                href: '#', // Enlace temporal para evitar que navegue
                                onclick: (e) => {
                                    e.preventDefault();
                                    localStorage.setItem('actorId', resultado[0]);
                                    window.location.href = '/perfilActor.html'; // Redirigir a la página deseada
                                }
                            }, resultado[1])
                        ])
                    ] : null,
                ]); // Por ejemplo, mostrar el nombre del resultado
            })
        ]);
    }
};

// Inicializar la aplicación de Mithril
m.route(document.getElementById("resultados"), "/resultados", {
    "/resultados": SeguidosUsuario
});