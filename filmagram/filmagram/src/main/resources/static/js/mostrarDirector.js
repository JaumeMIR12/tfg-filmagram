// Define el componente de Mithril.js
const DirectorInfo = {
    // Estado inicial del componente
    director: null,
    error: null,

    // Función para cargar los datos del director
    loadDirector: async () => {
        const directorId = localStorage.getItem('directorId');

        if (!directorId) {
            DirectorInfo.error = 'No se ha seleccionado ningún director.';
            return;
        }

        try {
            const response = await m.request({
                method: 'GET',
                url: `/api/directores/${directorId}`,
            });

            DirectorInfo.director = response;
        } catch (error) {
            DirectorInfo.error = 'Error al obtener la información del director.';
        }
    },

    // Vista del componente
    view: () => {
        if (DirectorInfo.error) {
            return m('div', DirectorInfo.error);
        }

        if (!DirectorInfo.director) {
            DirectorInfo.loadDirector(); // Cargar director si no está cargado
            return m('div', 'Cargando...');
        }

        const director = DirectorInfo.director;

        return m('section', { id: 'seccion1', class: 'section col-17 col-main' }, [
            m('header', { class: 'page-header' }, [
                m('div', { class: 'contextual-title' }, [
                    m('h1', { class: 'title-1 prettify' }, [
                        m('span', { class: 'context' }, 'Películas dirigidas por '),
                        ` ${director.nombre}`
                    ]),
                    m('p', ` ${director.pais}`),
                        m('p', ` ${director.biografia}`)
                ])
            ])
        ]);
    }
};


var SeguidoresView = {
    seguimiento: false,
    seguidores: 0,
    Id_DIRECTOR: localStorage.getItem('directorId'),
    Id_USUARIO: localStorage.getItem('usuarioId'),

    oninit: function(directorId) {

        // Hacer la llamada al controlador para obtener el número de seguidores
        m.request({
            method: "GET",
            url: "api/directores/seguidores/" + SeguidoresView.Id_DIRECTOR,
        }).then(function(response) {
            SeguidoresView.seguidores = response;
            m.redraw();
        });

        // Verificar si el usuario sigue al actor
        
        if (SeguidoresView.Id_USUARIO) {
            // Hacer una llamada para verificar si el usuario sigue al actor
            m.request({
                method: "GET",
                url: "api/directores/verificarSeguimiento/" + SeguidoresView.Id_DIRECTOR + "/" + SeguidoresView.Id_USUARIO,
            }).then(function(response) {
                SeguidoresView.seguimiento = response;
                m.redraw();
            });
        }
    },

    view: function() {
        return m("div", [
            m("p", "Seguidores: " + SeguidoresView.seguidores),
            m("p", "Estado de seguimiento: " + (SeguidoresView.seguimiento ? "Siguiendo" : "No siguiendo")),
            m("button", {
                onclick: function() {
                    // Lógica para seguir o dejar de seguir al actor
                    
                    var username = localStorage.getItem("username");
                    if (username) {
                        if (SeguidoresView.seguimiento) {
                            // Si está siguiendo, hacer una llamada para dejar de seguir al actor
                            m.request({
                                method: "POST",
                                url: "api/directores/dejarDeSeguir/" + SeguidoresView.Id_DIRECTOR + "/" + SeguidoresView.Id_USUARIO,
                            }).then(function(response) {
                                SeguidoresView.seguimiento = false;
                                m.redraw();
                            });
                        } else {
                            // Si no está siguiendo, hacer una llamada para seguir al actor
                            m.request({
                                method: "POST",
                                url: "api/directores/seguir/" + SeguidoresView.Id_DIRECTOR + "/" + SeguidoresView.Id_USUARIO,
                            }).then(function(response) {
                                SeguidoresView.seguimiento = true;
                                m.redraw();
                            });
                        }
                    } else {
                        m("p", "Por favor, inicia sesión para seguir a este actor.")
                    }
                }
            }, SeguidoresView.seguimiento ? "Dejar de seguir" : "Seguir")
        ]);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Monta el componente en el elemento con el ID "app"
    m.mount(document.getElementById('segs'), SeguidoresView);
});


// Cargar los datos del director al inicio
DirectorInfo.loadDirector();

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
            // Monta el componente en el elemento con el ID "app"
            m.mount(document.getElementById('app'), DirectorInfo);
        });

        
const directorId = localStorage.getItem('directorId');
        const PeliculasDirector = {
            // Estado inicial del componente
            peliculas: [],
        
            // Función para cargar los datos del director
            loadPeliculasPorDirector: function(directorId) {
                
                m.request({
                    method: "GET",
                    url: `/api/peliculas/director/${directorId}`
                }).then(function(response) {
                    PeliculasDirector.peliculas = response;
                    m.redraw(); // Forzar un nuevo renderizado después de recibir datos
                }).catch(function(error) {
                    console.error("Error al cargar películas por director:", error);
                });
            },
        
            // Vista del componente
            view: () => {
        
                if (!PeliculasDirector.peliculas) {
                    PeliculasDirector.loadPeliculasPorDirector(); // Cargar director si no está cargado
                    return m('div', 'Cargando...');
                }
                
                return m('section', { id: 'seccion1', class: 'section col-17 col-main' }, [
                m("div", { class: "poster-grid" }, [
                    m("ul", { class: "grid -grid -p125 -constrained clear" }, PeliculasDirector.peliculas.map(function(pelicula) {
                        return m("li", { class: "tooltip griditem poster-container", "data-original-title": pelicula.titulo }, [
                            m("div", { class: "react-component poster film-poster film-poster-371378 dune-eye linked-film-poster", "data-component-class": "globals.comps.FilmPosterComponent", "data-film-id": pelicula.id, "data-film-name": pelicula.titulo, "data-poster-url": pelicula.portada, "data-film-release-year": pelicula.estreno }, [
                                m("div", [ // Aquí puedes colocar la lógica para mostrar la imagen de la película
                                    m("img", { src: pelicula.portada, width: 150, height: 225, alt: pelicula.titulo }),
                                    m("a", { href: "#", onclick: (e) => {
                                        e.preventDefault();
                                        localStorage.setItem('peliculaId', pelicula.id);
                                        window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
                                    }, 
                                    class: "frame" }, [
                                        m("span", { class: "frame-title" }, pelicula.titulo + " (" + pelicula.estreno + ")"),
                                        m("span", { class: "overlay" })
                                    ])
                                ])
                            ])
                        ]);
                    }))

                ])
                
            ])
            }
        };
        
        // Cargar los datos del director al inicio
        PeliculasDirector.loadPeliculasPorDirector(directorId);
        
        // Montar el componente en el elemento con id "app"
        document.addEventListener('DOMContentLoaded', () => {
                    // Monta el componente en el elemento con el ID "app"
                    m.mount(document.getElementById('peliculas-sec'), PeliculasDirector);
                });
