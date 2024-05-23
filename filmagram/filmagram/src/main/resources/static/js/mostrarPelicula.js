const ActuacionesPelicula = {
    actuaciones: [],

    loadActuacionesPeliculaPorId: function(peliculaId) {
        m.request({
            method: "GET",
            url: `/api/actuaciones/pelicula/${peliculaId}`
        }).then(function(response) {
            console.log("Actuaciones:", response);
            ActuacionesPelicula.actuaciones = response;
            m.redraw(); // Forzar un nuevo renderizado después de recibir datos
        }).catch(function(error) {
            console.error("Error al cargar actuaciones de la película:", error);
        });
    },

    view: function() {

            return m("#tab-genres.tabbed-content-block.column-block", [
                m("h3", "Reparto"),
                m(".text-sluglist.capitalize", [
                    m("ul", { class: "actuaciones-list" }, ActuacionesPelicula.actuaciones.map(function(actuacion) {
                        return m("li", { class: "actuacion" }, [
                            m("div", { class: "actuacion-details" }, [
                                m("p", [
                                    m("a", { href:"#", onclick: (e) => {
                                        e.preventDefault();
                                        localStorage.setItem('actorId', actuacion.id.actorId.id);
                                        window.location.href = '/perfilActor.html'; // Redirigir a la página deseada
                                    }}, actuacion.id.actorId.nombre)
                                ])
                            ])
                        ]);
                    }))
                ])
            ])
  
    }
};

// Obtener la películaId del localStorage
const peliculaId = localStorage.getItem('peliculaId');

// Llamar a loadActuacionesPeliculaPorId() para cargar las actuaciones de la película al iniciar
ActuacionesPelicula.loadActuacionesPeliculaPorId(peliculaId);

// Montar el componente ActuacionesPelicula en el elemento con id "app"
m.mount(document.getElementById("reparto"), ActuacionesPelicula);



var Pelicula = {
    // Modelo para almacenar los datos de la película
    data: {},
    
    // Método para cargar los datos de la película desde el backend
    loadPelicula: function(peliculaId) {
        return m.request({
            method: "GET",
            url: `/api/peliculas/${peliculaId}`, // La ruta de la API con el ID de la película
        }).then(function(response) {
            Pelicula.data = response;
            console.log(response); // Almacenar los datos de la película en el modelo
        });
    },
    
    // Vista para mostrar los detalles de la película
    view: function() {
        return m(".film-details", [
            m("section#featured-film-header.film-header-lockup.-default", [
                m("h1.headline-1.js-widont.prettify", `${Pelicula.data.titulo}` ),
                m("p", [
                    m("small.number", [
                        m("a[href='#']", `${Pelicula.data.estreno}`)
                    ]),
                    "Dirigida por ",
                    m("a",{
                        href: '#', // Enlace temporal para evitar que navegue
                        onclick: (e) => {
                            e.preventDefault();
                            localStorage.setItem('directorId', `${Pelicula.data.director.id}`);
                            window.location.href = '/perfilDirector.html'; // Redirigir a la página deseada
                        }
                    }, `${Pelicula.data.director.nombre}`)
                ])
            ]),
            m("section.section.col-10.col-main", [
                m("section", [
                    m("div.review.body-text.-prose.-hero.prettify", [
                        m("div.truncate[data-truncate='450']", [
                            m("p", `${Pelicula.data.sinopsis}`)
                        ])
                    ])
                ]),
                m("#tabbed-content", { "data-selected-tab": "" }, [
                    m("#tab-details.tabbed-content-block.column-block", [
                        m("h3", "Pais"),
                        m(".text-sluglist", [
                            m("p", [
                                m("a[href='#'].text-slug", `${Pelicula.data.director.pais}` )
                            ])
                        ])
                    ]),
                    m("#tab-genres.tabbed-content-block.column-block", [
                        m("h3", "Genero"),
                        m(".text-sluglist.capitalize", [
                            m("p", [
                                m("a[href='#'].text-slug", `${Pelicula.data.genero}`)
                            ])
                        ])
                    ])
                ])
            ])
        ]);
    }
};

// Cargar los datos de la película
Pelicula.loadPelicula(peliculaId)
    .then(function() {
        // Renderizar el componente de la película
        m.mount(document.getElementById("info-pelicula"), Pelicula);
    })
    .catch(function(error) {
        console.error("Error al cargar los detalles de la película:", error);
    });



    var Portada = {
    // Modelo para almacenar los datos de la película
    data: {},
    
    // Método para cargar los datos de la película desde el backend
    loadPortada: function(peliculaId) {
        return m.request({
            method: "GET",
            url: `/api/peliculas/portada/${peliculaId}`, // La ruta de la API con el ID de la película
        }).then(function(response) {
            Portada.data = response;
            console.log(response); // Almacenar los datos de la película en el modelo
        });
    },
    
    // Vista para mostrar los detalles de la película
    view: function() {

        return m("section.poster-list.-p230.-single.no-hover.el.col", [
            m("a", [
                m("div.react-component.poster.film-poster.film-poster-110740", [
                    m("div", [
                        m("img.image", {
                            src: Portada.data[0],
                            width: "230",
                            height: "345"
                        })
                    ])
                ])
            ]),
            m("ul.film-stats", [
                m("li.stat.filmstat-watches", [
                    m("a[href='/film/prisoners/members/'].has-icon.icon-watched.icon-16.tooltip", {
                    }, [
                        m("span.icon")
                    ], Portada.data[0][1] !== 0 && Portada.data[0][1] !== undefined ?Portada.data[0][1] +" usuarios la han visto." : "Aún no la ha visto ningún usuario")
                ]),
                m("li.stat.filmstat-likes", [
                    m("a[href='/film/prisoners/likes/'].has-icon.icon-like.icon-liked.icon-16.tooltip", {
                    }, [
                        m("span.icon")
                    ], Portada.data[0][2] !== 0 && Portada.data[0][2] !== undefined ? `${Portada.data[0][2]} me gustas` : "No tiene me gustas por el momento")
                ])
            ])
        ]);
        
    }
};

// Cargar los datos de la película
Portada.loadPortada(peliculaId)
    .then(function() {
        // Renderizar el componente de la película
        m.mount(document.getElementById("js-poster-col"), Portada);
    })
    .catch(function(error) {
        console.error("Error al cargar los detalles de la película:", error);
    });

    const Sidebar = {
        usuarios: 0,
        promedioCalificacion: localStorage.getItem("insigniaUser"),
        usuarioLogueado: localStorage.getItem("username"),

    peliculaVista: false, 
    peliculaFavorita: false, 
    peliculaQuieroVer: false,
    calificacion: null,
    pelRequest: {
        userId: localStorage.getItem("usuarioId"),
        filmId: localStorage.getItem("peliculaId")

    },
    
        loadSidebarData: function(peliculaId) {

            if(Sidebar.usuarioLogueado != undefined || Sidebar.usuarioLogueado != null) {
                m.request({
                method: "GET",
                url: `/api/peliculas/vista?usuarioId=${Sidebar.pelRequest.userId}&peliculaId=${peliculaId}`
            }).then(function(response) {
                console.log("Pelicula ya vista: "  +response)
                Sidebar.peliculaVista = response;
                m.redraw();
            }).catch(function(error) {
                console.error("Error al cargar el estado de vista:", error);
            });

            m.request({
                method: "GET",
                url: `/api/peliculas/favorita?usuarioId=${Sidebar.pelRequest.userId}&peliculaId=${peliculaId}`
            }).then(function(response) {
                console.log("Pelicula como favorita: "  +response)
                Sidebar.peliculaFavorita = response;
                m.redraw();
            }).catch(function(error) {
                console.error("Error al cargar el estado de vista:", error);
            });

            m.request({
                method: "GET",
                url: `/api/peliculas/watchlist?usuarioId=${Sidebar.pelRequest.userId}&peliculaId=${peliculaId}`
            }).then(function(response) {
                console.log("Pelicula como quiero ver: "  +response)
                Sidebar.peliculaQuieroVer = response;
                m.redraw();
            }).catch(function(error) {
                console.error("Error al cargar el estado de vista:", error);
            });

            m.request({
                method: "GET",
                url: `/api/peliculas/yacalificada?usuarioId=${Sidebar.pelRequest.userId}&peliculaId=${peliculaId}`
            }).then(function(response) {
                console.log("Calificación a esta película: " + response[2]);
                Sidebar.calificacion = response[2];
                m.redraw();
            }).catch(function(error) {
                console.error("Error al cargar el estado de vista:", error);
            });

            }

            


            m.request({
                method: "GET",
                url: `/api/peliculas/calificacion/${peliculaId}`
            }).then(function(response) {
                console.log(response);
                Sidebar.usuarios = response[2];
                Sidebar.promedioCalificacion = response[1];
                m.redraw(); // Forzar un nuevo renderizado después de recibir datos
            }).catch(function(error) {
                console.error("Error al cargar los datos de la barra lateral:", error);
            });
        },

        handleCheckboxChange: function(event) {
            const target = event.target;
            const value = target.checked;
            const name = target.name;
            
    
            // Verificar si se marca la película como vista
            if (name === "vista") {
                // Si se marca como vista, desmarcar "Quiero verla"

                if (value) {
                    // Agregar la película a PeliculasVistas
                    m.request({
                        method: "POST",
                        url: "/api/peliculas/vista",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });
                    Sidebar.peliculaVista = true;


                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/por-ver",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    Sidebar.peliculaQuieroVer = false;
                } else {
                    // Eliminar la película de PeliculasVistas
                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/vista",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    // Eliminar la película de PeliculasFavoritas
                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/favorita",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    Sidebar.peliculaVista = false;
                    Sidebar.peliculaFavorita = false;
                }

            }
    
            // Verificar si se marca la película como favorita
            if (name === "favorita") {
                // Si se marca como favorita, marcar automáticamente como vista

                if (value) {

                    // Agregar la película a PeliculasVistas
                    m.request({
                        method: "POST",
                        url: "/api/peliculas/vista",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    // Agregar la película a PeliculasFavoritas
                    m.request({
                        method: "POST",
                        url: "/api/peliculas/favorita",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });
        
                    // Marcar automáticamente como vista
                    Sidebar.peliculaVista = true;
                    Sidebar.peliculaFavorita = true;


                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/por-ver",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    Sidebar.peliculaQuieroVer = false;
                } else {
                    // Eliminar la película de PeliculasFavoritas
                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/favorita",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    Sidebar.peliculaFavorita = false;
                }
            }
    
            // Verificar si se marca la película como quiero ver
            if (name === "quieroVer") {
                // Si se marca como quiero ver, desmarcar "Vista"

                if (value) {
                    // Agregar la película a PeliculasPorVer
                    m.request({
                        method: "POST",
                        url: "/api/peliculas/por-ver",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    Sidebar.peliculaQuieroVer = true;

                    // Eliminar la película de PeliculasFavoritas
                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/vista",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    Sidebar.peliculaVista = false;

                    // Eliminar la película de PeliculasFavoritas
                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/favorita",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    //Eliminar la calificacion
                    return m.request({
                        method: 'DELETE',
                        url: '/api/calificaciones/delCalificacion',
                        body: {
                            usuarioId: Sidebar.pelRequest.userId,
                            peliculaId: Sidebar.pelRequest.filmId,
                        },
                    })
                    .then(function(response) {
                        console.log("Calificacion eliminada correctamente");
                        console.log(response);
                        
                        
                    })
                    .catch(error => {
                        console.error('Error al eliminar calificación:', error);
                        throw error; // Propagar el error para que el código que llama a esta función pueda manejarlo
                    });

                    Sidebar.peliculaFavorita = false;
                } else {
                    // Eliminar la película de PeliculasPorVer
                    m.request({
                        method: "DELETE",
                        url: "/api/peliculas/por-ver",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });

                    Sidebar.peliculaQuieroVer = false;
                }
                
            }

            Sidebar[name] = value;
        },
    
        view: function() {

            function insertCalificacion(userId, filmId, calificacion) {
                console.log(userId, filmId, calificacion);
                return m.request({
                    method: 'POST',
                    url: '/api/calificaciones/addCalificacion',
                    body: {
                        usuarioId: userId,
                        peliculaId: filmId,
                        calificacion: calificacion
                    },
                })
                .then(function(response) {
                    // Agregar la película a PeliculasVistas
                    m.request({
                        method: "POST",
                        url: "/api/peliculas/vista",
                        body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });
                    
                    console.log("Calificacion añadida correctamente");
                    console.log(response);
                    m.redraw();
                    
                    
                })
                .catch(error => {
                    console.error('Error al insertar calificación:', error);
                    throw error; // Propagar el error para que el código que llama a esta función pueda manejarlo
                });
            }
            
    
            function deleteCalificacion(userId, filmId) {
                return m.request({
                    method: 'DELETE',
                    url: '/api/calificaciones/delCalificacion',
                    body: {
                        usuarioId: userId,
                        peliculaId: filmId,
                    },
                })
                .then(function(response) {
                    console.log("Calificacion eliminada correctamente");
                    console.log(response);
                    
                    
                })
                .catch(error => {
                    console.error('Error al eliminar calificación:', error);
                    throw error; // Propagar el error para que el código que llama a esta función pueda manejarlo
                });
            }
            
            return m("aside.sidebar", [
                m("section#userpanel.actions-panel", [
                    m("ul.js-actions-panel", [
                        !Sidebar.usuarioLogueado ? 
                    m("li.panel-signin", [
                        m("a.signin-text-link", { href: "index.html" }, "Inicia sesión para opinar o calificar.")
                    ]) : null,
                        Sidebar.usuarioLogueado ? 
                        m("li.panel-calificar", [
                            m("form", [
                                m("label", [
                                    m("input[type='checkbox'][name='vista']", {
                                        checked: Sidebar.peliculaVista,
                                        onchange: Sidebar.handleCheckboxChange
                                    }),
                                    " Marcar como vista"
                                ]),
                                m("label", localStorage.getItem("insigniaUser") < 80 ?
                                m("a.signin-text-link", { href: "index.html" }, "Consigue Insignia Aprendiz"):
                                
                                [
                                    m("input[type='checkbox'][name='favorita']", {
                                        checked: Sidebar.peliculaFavorita,
                                        onchange: Sidebar.handleCheckboxChange
                                    }),
                                    " Marcar como favorita"
                                ]),
                                m("label", localStorage.getItem("insigniaUser") < 1000 ?
                                m("a.signin-text-link", { href: "index.html" }, "Consigue Insignia Virtuoso"):
                                [
                                    m("input[type='checkbox'][name='quieroVer']", {
                                        checked: Sidebar.peliculaQuieroVer,
                                        onchange: Sidebar.handleCheckboxChange
                                    }),
                                    " Marcar como quiero ver"
                                ])
                            ]),

                            m("div.calificacion-buttons", [
                                localStorage.getItem("insigniaUser") < 500 ?
                                m("a.signin-text-link", { href: "index.html" }, "Consigue Insignia Oro para calificar"):
                                //Sidebar.promedioCalificacion >= 500 ?
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(numero) {
                                    return m("label", [
                                        m("input[type='radio'][name='calificacion'][value='" + numero + "']", {
                                            checked: Sidebar.calificacion === numero,
                                            onclick: function(event) {
                                                // Si el mismo radio está marcado, desmarca
                                                if (Sidebar.calificacion === numero) {
                                                    // Realiza un delete en la base de datos
                                                    deleteCalificacion(Sidebar.pelRequest.userId, Sidebar.pelRequest.filmId);
                                                    Sidebar.calificacion = null;
                                                } else {
                                                    // Realiza una inserción en la base de datos
                                                    insertCalificacion(Sidebar.pelRequest.userId, Sidebar.pelRequest.filmId, numero);
                                                    Sidebar.calificacion = numero;
                                                }
                                            }
                                        }),
                                        m("span", {
                                            style: Sidebar.calificacion === numero ? "border-color: #007bff; color: #28a745;" : ""
                                        }, numero)
                                    ]);
                                }) //: null
                            ]),
                            
                        ]) : null
                    ])
                ]),
                m("section.section.ratings-histogram-chart", [
                    m("h2.section-heading", [
                        m("a", { href: "#" }, "Calificaciones")
                    ]),
                    m("a.all-link.more-link", { href: "#" }, Sidebar.usuarios + " usuarios"),
                    m("span.average-rating", [
                        m("a.tooltip.display-rating.-highlight", { href: "#" }, Sidebar.promedioCalificacion)
                    ])
                ])
            ]);
        }
    };
    
    // Llamar a loadSidebarData() para cargar los datos de la barra lateral al iniciar
    Sidebar.loadSidebarData(peliculaId);
    
    // Montar el componente Sidebar en el elemento con id "sidebar"
    m.mount(document.getElementById("aside"), Sidebar);





var Comentarios = {
    nohaycomentarios: false,
    comentarios: [],
    usuarioLogueado: localStorage.getItem('username') !== null,
    insignia: localStorage.getItem('insignia') !== null,
    
    // Método para cargar los comentarios de la película desde el backend
    loadComentarios: function(peliculaId) {
        return m.request({
            method: "GET",
            url: `api/comentarios/pelicula/${peliculaId}`, // La ruta de la API con el ID de la película
        }).then(function(response) {
            if (response.length === 0) { // Verificar si la respuesta no contiene comentarios
                Comentarios.nohaycomentarios = true; // Establecer nohaycomentarios a true
            } else {
                Comentarios.nohaycomentarios = false; // Establecer nohaycomentarios a false
                Comentarios.comentarios = response; // Almacenar los comentarios de la película
            }
        });
    },

    addComentario: function() {
        var comentarioTexto = document.getElementById("nuevoComentario").value;
        var usuarioId = localStorage.getItem("usuarioId");
        var peliculaId = localStorage.getItem("peliculaId");

        if (comentarioTexto.trim() !== "") {
            m.request({
                method: "POST",
                url: "api/comentarios/addComentarioNuevo",
                body: {
                    usuarioId: usuarioId,
                    peliculaId: peliculaId,
                    comentario: comentarioTexto
                }
            }).then(function(response) {
                // Recargar los comentarios después de agregar uno nuevo
                Comentarios.loadComentarios(peliculaId);
            });
        }
    },
    
    // Vista para mostrar los comentarios de la película
    view: function() {
        return m("section.film-recent-reviews.-clear", [
            m("section#popular-reviews.film-reviews.section", [
                m("h2.section-heading", [
                    m("a[href='#']", "Comentarios")
                ]),
                Comentarios.nohaycomentarios ? m("p", "No hay comentarios para esta película.") :
                m("ul.film-popular-review", Comentarios.comentarios.map(function(comentario) {
                    return m("li.film-detail", {
                        "data-viewing-id": comentario.id
                    }, [
                        m("div.film-detail-content", [
                            m("div.attribution-block.-large", [
                                m("p.attribution", [
                                    "Comentario de ",
                                    m("strong.name", [
                                        m('a', { 'href': '#',
                                        onclick: (e) => {
                                            e.preventDefault();
                                            localStorage.setItem('userVisited', comentario.usuario.id);
                                            window.location.href = '/perfilUsuario.html'; // Redirigir a la página deseada
                                        } })
                                    ],
                                    comentario.usuario.nombre)
                                ])
                            ]),
                            m("div.body-text.-prose.collapsible-text", [
                                m("p", comentario.comentario)
                            ])
                        ])
                    ]);
                })),
                !Comentarios.usuarioLogueado ?
                    m("p", [
                        "Inicia sesión o registrate para ver todos los comentarios. ",
                        m("a[href='index.html']", { oncreate: m.route.link }, "Iniciar sesión")
                    ]) :
                    // Si el usuario tiene una insignia de plata o superior
                    localStorage.getItem("insigniaUser") >= 300 ?
                    Comentarios.nohaycomentarios ? null:
                    m("p", [
                        "Haz click para ver todos los comentarios. ",
                        m("a[href='/todosComentarios.html']", { oncreate: m.route.link }, "Ver comentarios")
                    ]) : m("p", [
                        "Juega y consigue Insignia de Plata para ver todos los comentarios. ",
                        m("a[href='juego.html']", { oncreate: m.route.link }, "Jugar ahora")
                    ]),
                    // Si el usuario tiene una insignia pero no es suficiente
                    localStorage.getItem("insigniaUser") >= 1200 ?
                    m("div", [
                        m("textarea#nuevoComentario", {
                            placeholder: "Añade un comentario..."
                        }),
                        m("button", {
                            onclick: Comentarios.addComentario
                        }, "Añadir Comentario")
                    ]) :
                    m("p", [
                        "Juega y consigue Insignia de Platino para poder comentar. ",
                        m("a[href='juego.html']", { oncreate: m.route.link }, "Jugar ahora")
                    ])
            ])
        ]);
    }
};

// Cargar los comentarios de la película
Comentarios.loadComentarios(peliculaId)
    .then(function() {
        // Renderizar el componente de comentarios
        m.mount(document.getElementById("comentarios-zona"), Comentarios);
    })
    .catch(function(error) {
        console.error("Error al cargar los comentarios de la película:", error);
    });

    