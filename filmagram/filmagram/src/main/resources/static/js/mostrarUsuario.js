const UsuarioInfo = {
    // Estado inicial del componente
    usuario: [],
    error: null,
    poderEditar: false,

    // Función para cargar los datos del usuario
    loadUsuario: async () => {

        if (localStorage.getItem('usuarioId') == null) {
            var usuarioId = localStorage.getItem('userVisited');
        } else {
            if (localStorage.getItem('userVisited') == localStorage.getItem('usuarioId')){
                var usuarioId = localStorage.getItem('usuarioId');
                UsuarioInfo.poderEditar = true;
            } else {
                var usuarioId = localStorage.getItem('userVisited');
            }
        }
        
        

        if (!usuarioId) {
            UsuarioInfo.error = 'No se ha seleccionado ningún usuario.';
            return UsuarioInfo.error;
            
        }

        try {
            const response = await m.request({
                method: 'GET',
                url: `/api/usuarios/info/${usuarioId}`,
            });

            UsuarioInfo.usuario = response;
            console.log(response);
        } catch (error) {
            UsuarioInfo.error = 'Error al obtener la información del usuario.';
        }
    },

    // Vista del componente
    view: () => {

        return m('section.profile-header.js-profile-header.-is-not-mini-nav.-outdent', [
            m('.profile-summary.js-profile-summary', [
                m('.profile-name-and-actions.js-profile-name-and-actions', [
                    m('h1.person-display-name', [
                        m('span.displayname.tooltip', UsuarioInfo.usuario[1])
                    ]),
                    m('.badge-info', [ // Contenedor para la información de la insignia
                        m('img.badge-icon', { src: "../pictures/insignias/" +UsuarioInfo.usuario[5], alt: UsuarioInfo.usuario[3], style: 'width: 40px; height: 40px;' }), // Ajusta el tamaño del icono según sea necesario
                        m('span.badge-name', "   " + UsuarioInfo.usuario[3]) // Nombre de la insignia
                    ]), 
                    UsuarioInfo.poderEditar ?
                    m('.profile-actions.js-profile-actions', [
                        m('.follow-button-wrapper.js-follow-button-wrapper', [
                            m('a.button.-small', { href: '/editarUsuario.html', rel: 'nofollow' }, 'Editar perfil')
                        ])
                    ]):null

                ]),
                m('.profile-info.-has-no-bio.-has-no-meta.-is-not-hq.js-profile-info', [
                    m('.profile-stats.js-profile-stats', { style: 'margin-top: -18.3px;' }, [
                        m('h4.profile-statistic.statistic', [
                            m('a', { href: '/todasPeliculasV.html' }, [
                                m('span.value', UsuarioInfo.usuario[6]),
                                m('span.definition', 'Peliculas')
                            ])
                        ]),
                        m('h4.profile-statistic.statistic', [
                            m('a', { href: '/todasPeliculasF.html' }, [
                                m('span.value', UsuarioInfo.usuario[7]),
                                m('span.definition', 'Favoritas')
                            ])
                        ]),
                        m('h4.profile-statistic.statistic', [
                            m('a', { href: '/seguidosUsuario.html' }, [
                                m('span.value', UsuarioInfo.usuario[9]),
                                m('span.definition', 'Siguiendo')
                            ])
                        ]),
                        m('h4.profile-statistic.statistic', [
                            m('a', { href: '/todasPeliculasW.html' }, [
                                m('span.value', UsuarioInfo.usuario[8]),
                                m('span.definition', 'Por ver')
                            ])
                        ])
                    ])
                ])
            ])
        ]);
    }
};

// Cargar los datos del usuario al inicio
UsuarioInfo.loadUsuario();

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
    // Monta el componente en el elemento con el ID "app"
    m.mount(document.getElementById('section1'), UsuarioInfo);
});


const PeliculasVistas = {
    // Estado inicial del componente
    peliculas: [],
    error: null,

    loadPeliculas: async () => {
        if (localStorage.getItem('usuarioId') == null) {
            var usuarioId = localStorage.getItem('userVisited');
        } else {
            if (localStorage.getItem('userVisited') == localStorage.getItem('usuarioId')){
                var usuarioId = localStorage.getItem('usuarioId');
            } else {
                var usuarioId = localStorage.getItem('userVisited');
            }
        }

        if (!usuarioId) {
            PeliculasVistas.error = 'No se ha seleccionado ningún usuario.';
            return;
        }

        try {
            const response = await m.request({
                method: 'GET',
                url: `/api/peliculas/vistas/${usuarioId}`,
            });

            PeliculasVistas.peliculas = response;
            console.log(response);
        } catch (error) {
            PeliculasVistas.error = 'Error al obtener la información del usuario.';
        }
    },

    // Vista del componente
    view: () => {

        return m('section#favourites.section', [
            m('h2.section-heading', 'Películas vistas'),
            m('a.has-icon.icon-16.icon-like.all-link', { href: '/todasPeliculasV.html' }, [
                m('span.icon'),
                'Todas'
            ]),
            m('ul.poster-list.-p150.-horizontal', PeliculasVistas.peliculas.slice(0, 4).map(function(pelicula) {
                return m('li.poster-container.favourite-film-poster-container.film-watched', [
                    m('.react-component.poster.film-poster.film-poster-51896.linked-film-poster', [
                        m('div', [
                            m('img.image', {
                                src: pelicula.portada,
                                width: 150,
                                height: 225,
                                alt: pelicula.titulo
                            },),
                            m('a.frame', { href: '#',
                            onclick: (e) => {
                                e.preventDefault();
                                localStorage.setItem('peliculaId', pelicula.id);
                                window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
                            } }, [
                                m('span.frame-title', pelicula.titulo),
                                m('span.overlay')
                            ])
                        ])
                    ])
                ]);
            }))
        ]);

        
    }
};

// Cargar los datos del usuario al inicio
PeliculasVistas.loadPeliculas();

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
    m.mount(document.getElementById('section-peliculas-vistas'), PeliculasVistas);
});

const PeliculasFavoritas = {
    // Estado inicial del componente
    peliculas: [],
    error: null,

    loadPeliculas: async () => {
        if (localStorage.getItem('usuarioId') == null) {
            var usuarioId = localStorage.getItem('userVisited');
        } else {
            if (localStorage.getItem('userVisited') == localStorage.getItem('usuarioId')){
                var usuarioId = localStorage.getItem('usuarioId');
            } else {
                var usuarioId = localStorage.getItem('userVisited');
            }
        }

        if (!usuarioId) {
            PeliculasFavoritas.error = 'No se ha seleccionado ningún usuario.';
            return;
        }

        try {
            const response = await m.request({
                method: 'GET',
                url: `/api/peliculas/favoritas/${usuarioId}`,
            });

            PeliculasFavoritas.peliculas = response;
            console.log(response);
        } catch (error) {
            PeliculasFavoritas.error = 'Error al obtener la información de las peliculas favoritas.';
        }
    },

    // Vista del componente
    view: () => {

        return m('section#favourites.section', [
            m('h2.section-heading', 'Películas favoritas'),
            m('a.has-icon.icon-16.icon-like.all-link', { href: '/todasPeliculasF.html' }, [
                m('span.icon'),
                'Todas'
            ]),
            m('ul.poster-list.-p150.-horizontal', PeliculasFavoritas.peliculas.slice(0, 4).map(function(pelicula) {
                return m('li.poster-container.favourite-film-poster-container.film-watched', [
                    m('.react-component.poster.film-poster.film-poster-51896.linked-film-poster', [
                        m('div', [
                            m('img.image', {
                                src: pelicula.portada,
                                width: 150,
                                height: 225,
                                alt: pelicula.titulo
                            }),
                            m('a.frame', { href: '#',
                            onclick: (e) => {
                                e.preventDefault();
                                localStorage.setItem('peliculaId', pelicula.id);
                                window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
                            } }, [
                                m('span.frame-title', pelicula.titulo),
                                m('span.overlay')
                            ])
                        ])
                    ])
                ]);
            }))
        ]);

        
    }
};

// Cargar los datos del usuario al inicio
PeliculasFavoritas.loadPeliculas();

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
    m.mount(document.getElementById('section-peliculas-favoritas'), PeliculasFavoritas);
});


const PeliculasPorVer = {
    // Estado inicial del componente
    peliculas: [],
    error: null,

    loadPeliculas: async () => {
        
        if (localStorage.getItem('usuarioId') == null) {
            var usuarioId = localStorage.getItem('userVisited');
        } else {
            if (localStorage.getItem('userVisited') == localStorage.getItem('usuarioId')){
                var usuarioId = localStorage.getItem('usuarioId');
            } else {
                var usuarioId = localStorage.getItem('userVisited');
            }
        }

        if (!usuarioId) {
            PeliculasPorVer.error = 'No se ha seleccionado ningún usuario.';
            return;
        }

        try {
            const response = await m.request({
                method: 'GET',
                url: `/api/peliculas/quierover/${usuarioId}`,
            });

            PeliculasPorVer.peliculas = response;
            console.log(response);
        } catch (error) {
            PeliculasPorVer.error = 'Error al obtener la información de las peliculas favoritas.';
        }
    },

    // Vista del componente
    view: () => {

        return m('section#favourites.section', [
            m('h2.section-heading', 'Películas que quieres ver'),
            m('a.has-icon.icon-16.icon-like.all-link', { href: '/todasPeliculasW.html' }, [
                m('span.icon'),
                'Todas'
            ]),
            m('ul.poster-list.-p150.-horizontal', PeliculasPorVer.peliculas.slice(0, 4).map(function(pelicula) {
                return m('li.poster-container.favourite-film-poster-container.film-watched', [
                    m('.react-component.poster.film-poster.film-poster-51896.linked-film-poster', [
                        m('div', [
                            m('img.image', {
                                src: pelicula.portada,
                                width: 150,
                                height: 225,
                                alt: pelicula.titulo
                            }),
                            m('a.frame', { href: '#',
                            onclick: (e) => {
                                e.preventDefault();
                                localStorage.setItem('peliculaId', pelicula.id);
                                window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
                            } }, [
                                m('span.frame-title', pelicula.titulo),
                                m('span.overlay')
                            ])
                        ])
                    ])
                ]);
            }))
        ]);

        
    }
};

// Cargar los datos del usuario al inicio
PeliculasPorVer.loadPeliculas();

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
    m.mount(document.getElementById('section-peliculas-quierover'), PeliculasPorVer);
});