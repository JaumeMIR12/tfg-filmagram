function formatDate(dateString) {

    var date = new Date(dateString);
    var day = date.getDate().toString().padStart(2, '0'); // Obtiene el día y lo rellena con ceros a la izquierda si es necesario
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes (los meses en JavaScript comienzan desde 0)
    var year = date.getFullYear(); // Obtiene el año
    var hours = date.getHours().toString().padStart(2, '0'); // Obtiene las horas y las rellena con ceros a la izquierda si es necesario
    var minutes = date.getMinutes().toString().padStart(2, '0'); // Obtiene los minutos y los rellena con ceros a la izquierda si es necesario

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

var ComViews = {
    comentarios: [],
    usuarioLogueado: localStorage.getItem('username') !== null,
    insignia: localStorage.getItem('insignia') !== null,
    
    // Método para cargar los comentarios de la película desde el backend
    loadComentarios: function(peliculaId) {
        return m.request({
            method: "GET",
            url: `api/comentarios/pelicula/${peliculaId}`, // La ruta de la API con el ID de la película
        }).then(function(response) {
            ComViews.comentarios = response;
            console.log(ComViews.comentarios); // Almacenar los comentarios de la película
        });
    },
    
    // Vista para mostrar los comentarios de la película
    view: function() {
        return m("h1.headline-2.prettify", [
            m("span.context", "Reviews of"),
            m("a", { href: "/film/prisoners/" }, "Prisoners"),
            m("small.metadata", [
                m("a", { href: "/films/year/2013/" }, "2013")
            ])
        ]),
        m("section.film-recent-reviews.-clear", [
            m("section#popular-reviews.film-reviews.section", [
                m("h2.section-heading", [
                    m("a[href='/comentarios.html']", "Comentarios")
                ]),
                m("ul.film-popular-review", ComViews.comentarios.map(function(comentario) {
                    return m("li.film-detail", {
                        "data-viewing-id": comentario.id
                    }, [
                        m("div.film-detail-content", [
                            m("div.attribution-block.-large", [
                                m("p.attribution", [
                                    "Comentario de ",
                                    m("strong.name", comentario.usuario.nombre)
                                ])
                            ]),
                            m("div.body-text.-prose.collapsible-text", [
                                m("div", [
                                    m("p", comentario.comentario), // Contenido del comentario
                                    m("p", "Fecha: " + formatDate(comentario.fechaComentario)) // Fecha formateada
                                ])
                            ])
                        ])
                    ]);
                })),
            ])
        ]);
    }
};

const peliculaId = localStorage.getItem('peliculaId');
// Cargar los comentarios de la película
ComViews.loadComentarios(peliculaId)
    .then(function() {
        // Renderizar el componente de comentarios
        m.mount(document.getElementById("app"), ComViews);
    })
    .catch(function(error) {
        console.error("Error al cargar los comentarios de la película:", error);
    });