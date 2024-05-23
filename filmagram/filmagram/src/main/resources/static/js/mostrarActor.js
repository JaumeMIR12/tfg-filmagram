const ActorInfo = {
    // Estado inicial del componente
    actor: null,
    error: null,

    // Función para cargar los datos del actor
    loadActor: async () => {
        const actorId = localStorage.getItem('actorId');

        if (!actorId) {
            ActorInfo.error = 'No se ha seleccionado ningún actor.';
            return;
        }

        try {
            const response = await m.request({
                method: 'GET',
                url: `/api/actores/${actorId}`,
            });

            ActorInfo.actor = response;
            console.log(response);
        } catch (error) {
            ActorInfo.error = 'Error al obtener la información del actor.';
        }
    },

    // Vista del componente
    view: () => {
        if (ActorInfo.error) {
            return m('div', ActorInfo.error);
        }

        if (!ActorInfo.actor) {
            ActorInfo.loadActor(); // Cargar actor si no está cargado
            return m('div', 'Cargando...');
        }

        const actor = ActorInfo.actor;

        return m('section', { id: 'seccion1', class: 'section col-17 col-main' }, [
            m('header', { class: 'page-header' }, [
                m('div', { class: 'contextual-title' }, [
                    m('h1', { class: 'title-1 prettify' }, [
                        m('span', { class: 'context' }, 'Filmografía de '),
                        ` ${actor.nombre}`
                    ]),
                    m('p', ` ${actor.pais}`),
                        m('p', ` ${actor.biografia}`)
                ])
            ]),
            m('div', { id: 'content-nav', class: 'hide-toggle-menu' }, [
                m('section', { class: 'smenu-wrapper smenu-wrapper-left' }, [
                    m('div', { class: 'smenu' }, [
                        m('label', 'actor'),
                        m('i', { class: 'ir s icon' })
                    ])
                ])
            
            ])
        ]);
    }
};

// Cargar los datos del actor al inicio
ActorInfo.loadActor();

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
            // Monta el componente en el elemento con el ID "app"
            m.mount(document.getElementById('app'), ActorInfo);
        });

        const actorId = localStorage.getItem('actorId');


        var SeguidoresView = {
            seguimiento: false,
            seguidores: 0,
            Id_ACTOR: localStorage.getItem('actorId'),
            Id_USUARIO: localStorage.getItem('usuarioId'),
            
        
            oninit: function(actorId) {

        
                // Hacer la llamada al controlador para obtener el número de seguidores
                m.request({
                    method: "GET",
                    url: "api/actores/seguidores/" + SeguidoresView.Id_ACTOR,
                }).then(function(response) {
                    SeguidoresView.seguidores = response;
                    m.redraw();
                });
        
                // Verificar si el usuario sigue al actor
                
                if (SeguidoresView.Id_USUARIO) {
                    // Hacer una llamada para verificar si el usuario sigue al actor
                    m.request({
                        method: "GET",
                        url: "api/actores/verificarSeguimiento/" + SeguidoresView.Id_ACTOR + "/" + SeguidoresView.Id_USUARIO,
                    }).then(function(response) {
                        SeguidoresView.seguimiento = response;
                        m.redraw();
                    });
                }
            },
        
            view: function() {
                return m("div", [
                    m("p#no-iniciado"),
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
                                        url: "api/actores/dejarDeSeguir/" + SeguidoresView.Id_ACTOR + "/" + SeguidoresView.Id_USUARIO,
                                    }).then(function(response) {
                                        SeguidoresView.seguimiento = false;
                                        m.redraw();
                                    });
                                } else {
                                    // Si no está siguiendo, hacer una llamada para seguir al actor
                                    m.request({
                                        method: "POST",
                                        url: "api/actores/seguir/" + SeguidoresView.Id_ACTOR + "/" + SeguidoresView.Id_USUARIO,
                                    }).then(function(response) {
                                        SeguidoresView.seguimiento = true;
                                        m.redraw();
                                    });
                                }
                            } else {
                                document.getElementById("no-iniciado").textContent = "No has iniciado sesión, no puedes seguir."
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
        





        const PeliculasActor = {
            // Estado inicial del componente
            peliculas: [],
        
            // Función para cargar los datos del director
            loadPeliculasActor: function(actorId) {
                
                m.request({
                    method: "GET",
                    url: `/api/actuaciones/actor/${actorId}`
                }).then(function(response) {
                    PeliculasActor.peliculas = response;
                    console.log(response);
                    m.redraw(); // Forzar un nuevo renderizado después de recibir datos
                }).catch(function(error) {
                    console.error("Error al cargar películas por actor:", error);
                });
            },
        
            // Vista del componente
            view: () => {
        
                if (!PeliculasActor.peliculas) {
                    PeliculasActor.loadPeliculasActor(); // Cargar actor si no está cargado
                    return m('div', 'Cargando...');
                }
                
                return m('section', { id: 'seccion1', class: 'section col-17 col-main' }, [
                m("div", { class: "poster-grid" }, [
                    m("ul", { class: "grid -grid -p125 -constrained clear" }, PeliculasActor.peliculas.map(function(pelicula) {
                        return m("li", { class: "tooltip griditem poster-container", "data-original-title": pelicula.id.peliculaId.titulo }, [
                            m("div", { class: "react-component poster film-poster film-poster-371378 dune-eye linked-film-poster", "data-component-class": "globals.comps.FilmPosterComponent", "data-film-id": pelicula.id, "data-film-name": pelicula.titulo, "data-poster-url": pelicula.portada, "data-film-release-year": pelicula.estreno }, [
                                m("div", [ // Aquí puedes colocar la lógica para mostrar la imagen de la película
                                    m("img", { src: pelicula.id.peliculaId.portada, width: 150, height: 225, alt: pelicula.id.peliculaId.titulo }),
                                    m("a", { href: "#", onclick: (e) => {
                                        e.preventDefault();
                                        localStorage.setItem('peliculaId', pelicula.id.peliculaId.id);
                                        window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
                                    }, 
                                    class: "frame" }, [
                                        m("span", { class: "frame-title" }, pelicula.id.peliculaId.titulo + " (" + pelicula.id.peliculaId.estreno + ")"),
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
        
        // Cargar los datos del actor al inicio
        PeliculasActor.loadPeliculasActor(actorId);
        
        // Montar el componente en el elemento con id "app"
        document.addEventListener('DOMContentLoaded', () => {
                    // Monta el componente en el elemento con el ID "app"
                    m.mount(document.getElementById('peliculas-sec'), PeliculasActor);
                });