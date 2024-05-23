const ResultadosBusqueda = {

    resultado: [],
    // Función para hacer la llamada a la API y mostrar los resultados
    oninit: (vnode) => {
        // Obtener el texto de búsqueda de la URL
        const query = m.route.param("query");

        // Hacer la llamada a la API
        m.request({
            method: "GET",
            url: "/api/usuarios/buscador/" + localStorage.getItem("textoBuscar") // Pasar el texto de búsqueda como parámetro de la consulta
        }).then((response) => {
            // Mostrar los resultados en la página
            ResultadosBusqueda.resultado = response;
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
            ResultadosBusqueda.resultado && ResultadosBusqueda.resultado.map((resultado) => {
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
                    resultado[2] === "Pelicula" ? [
                        m('span.nb', "Pelicula: ", [
                            m('a.nombre', {
                                href: '#', // Enlace temporal para evitar que navegue
                                onclick: (e) => {
                                    e.preventDefault();
                                    localStorage.setItem('peliculaId', resultado[0]);
                                    window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
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
                    resultado[2] === "Usuario" ? [
                        m('span.nb', "Usuario: ", [
                            m('a.nombre', {
                                href: '#', // Enlace temporal para evitar que navegue
                                onclick: (e) => {
                                    e.preventDefault();
                                    localStorage.setItem('userVisited', resultado[0]);
                                    window.location.href = '/perfilUsuario.html'; // Redirigir a la página deseada
                                }
                            }, resultado[1])
                        ])
                    ] : null
                ]); // Por ejemplo, mostrar el nombre del resultado
            })
        ]);
    }
};

// Inicializar la aplicación de Mithril
m.route(document.getElementById("resultados"), "/resultados", {
    "/resultados": ResultadosBusqueda
});