window.onload = function(){

    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    const username = localStorage.getItem("username");

    // Si el nombre de usuario no está guardado, mostrar la ventana modal
    if (!username) {
        modal.style.display = "block";
    } else {
        var mensajeRegistro = document.getElementById('mensaje-registro');
    mensajeRegistro.textContent = '¡Bienvenido ' + localStorage.getItem("username") + '!';
    }

    // Cuando se haga clic en <span> (x), cerrar la ventana modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Cuando el usuario haga clic fuera de la ventana modal, cerrarla
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const PeliculasComponent = {
    peliculas: [],
    cargarPeliculas: async () => {
        try {
            const rawResponse = await m.request({
                method: 'GET',
                url: 'api/peliculas/peliculas',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            PeliculasComponent.peliculas = rawResponse; // Asigna las películas obtenidas
        } catch (error) {
            console.error('Error al cargar las películas:', error);
        }
    },
    view: () => {
        if (PeliculasComponent.peliculas.length === 0) {
            return m('div', 'Cargando películas...'); // Mensaje mientras se cargan las películas
        }

        // Genera la tabla de películas
        return m('table.movie-table', [
            m('tr', [
                m('th.tg-0lax[colspan=4]', 'PELÍCULAS')
            ]),
            // Mapea cada película a una fila en la tabla
            PeliculasComponent.peliculas.map(pelicula => {
                return m('tr', [
                    m('td', `${pelicula.titulo} - ${pelicula.director.nombre}`)
                ]);
            })
        ]);
    }
};

// Ejecutar la función para cargar las películas cuando se carga la página
PeliculasComponent.cargarPeliculas();

// Montar el componente en el elemento con ID 'app'
//m.mount(document.getElementById('app'), PeliculasComponent);


// let listarPeliculas = async () => {
//     const rawResponse = await fetch('api/peliculas/peliculas', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     });
//     const peliculas = await rawResponse.json();

//      let contenidoTable = `
//         <table class="movie-table">
//             <tr>
//                 <th class="tg-0lax" colspan="4">PELÍCULAS</th>
//             </tr>`;

//     let rowCount = 0; // Contador para las columnas en cada fila

//     for (let pelicula of peliculas) {
//         if (rowCount === 0) {
//             // Inicia una nueva fila cada 4 películas (cada 4 columnas)
//             contenidoTable += `<tr>`;
//         }

//         // Crea una celda con el título y nombre del director
//         contenidoTable += `
//             <td>${pelicula.titulo} - ${pelicula.director.nombre}</td>
//         `;

//         rowCount++;

//         if (rowCount === 4) {
//             // Cierra la fila después de haber agregado 4 columnas
//             contenidoTable += `</tr>`;
//             rowCount = 0; // Reinicia el contador para comenzar una nueva fila
//         }
//     }

//     // Cierra la tabla
//     contenidoTable += `</table>`;

//     const peliculasContainer = document.getElementById('app');
//     peliculasContainer.innerHTML = contenidoTable;
//   };

  // Define el componente ComentariosPeliculas

  const ComentariosComponent = {
    comentarios: [],
    cargarPeliculas: async () => {
        try {
            const rawResponse = await m.request({
                method: 'GET',
                url: 'api/comentarios/ahora',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            ComentariosComponent.comentarios = rawResponse;
            console.log(rawResponse); // Almacenar películas en el componente

            m.redraw(); // Forzar redibujado después de cargar los datos
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
        }
    },

    view: () => {

        const contenidoComun = ComentariosComponent.comentarios.map(pelicula => {
            const fechaComentario = new Date(pelicula.fechaComentario);
            const nombreMes = fechaComentario.toLocaleString('default', { month: 'long' });
            const dia = fechaComentario.getDate();

            return m('li.poster-container.viewing-poster-container', [
                m('div.react-component.poster.film-poster', [
                    m('div', [
                        m('a.frame.has-menu', { 
                            'id': 'link-pelicula', 
                            'data-id': pelicula.pelicula.id,
                            'href': '#',
                            'onclick': (e) => {
                                e.preventDefault();
                                localStorage.setItem('peliculaId', pelicula.pelicula.id);
                                // m.route.set('/perfilPelicula.html');
                                window.location.href = '/perfilPelicula.html';
                            }
                        }, [
                            m('img.image', {
                                'src': pelicula.pelicula.portada,
                                'width': '150',
                                'height': '225',
                                'alt': pelicula.pelicula.titulo
                            })
                        ]),
                        m('div.attribution-block.js-poster-attribution', [
                            m('p.attribution', [
                                m('strong.name', [
                                    m('a', { 'href': '#',
                                    onclick: (e) => {
                                        e.preventDefault();
                                        localStorage.setItem('userVisited', pelicula.usuario.id);
                                        window.location.href = '/perfilUsuario.html'; // Redirigir a la página deseada
                                    } }, pelicula.usuario.nombre)
                                ])
                            ])
                        ])
                    ])
                ]),
                m('p.poster-viewingdata', [
                    m('span.rating.rated-6', pelicula.comentario),
                    m('a.has-icon.icon-review.icon-16.tooltip', { 'href': '#' }, [
                        m('span.icon')
                    ]),
                    m('time', `${nombreMes} - ${dia}`)
                ])
            ]);
        });

        return m('section#recent-from-friends.section', [
            m('h2.section-heading', [
                m('a', { 'href': 'peliculasBuscador.html' }, 'Ahora en Filmagram')
            ]),
            m('ul#lista1.poster-list.-p150.-horizontal', contenidoComun)
        ]);
        
    }
};

ComentariosComponent.cargarPeliculas();

// Montar el componente en el contenedor 'app'
m.mount(document.getElementById('content-wrap'), ComentariosComponent);


const PeliculasMasComentariosComponent = {
    peliculas: [],

    cargarPeliculas: async () => {
        try {
            const rawResponse = await m.request({
                method: 'GET',
                url: 'api/peliculas/populares',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            PeliculasMasComentariosComponent.peliculas = rawResponse;
            console.log(rawResponse);
            m.redraw();
        } catch (error) {
            console.error('Error al cargar películas:', error);
        }
    },

    view: () => {
        return m('section#popular-with-everyone.section', [
            m('h2.section-heading', [
                m('a', { href: 'peliculasPopulares.html' }, 'Popular en Filmagram')
            ]),
            m('ul#lista2.poster-list.-p150.film-list.-horizontal', 
                PeliculasMasComentariosComponent.peliculas.map(pelicula => {
                    return m('li.react-component.poster.film-poster', [
                        m('div', [
                            m('a.frame.has-menu', {
                                href: '#', // Enlace temporal para evitar que navegue
                                onclick: (e) => {
                                    e.preventDefault();
                                    localStorage.setItem('peliculaId', pelicula.id);
                                    window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
                                }
                            }, [
                                m('img.image', {
                                    src: pelicula.portada,
                                    width: '150',
                                    height: '225',
                                    alt: pelicula.titulo
                                })
                            ])
                        ])
                    ]);
                })
            )
        ]);
    }
};

// Cargar películas al iniciar el componente
PeliculasMasComentariosComponent.cargarPeliculas();

// Montar el componente en el elemento DOM
m.mount(document.getElementById('contenido2'), PeliculasMasComentariosComponent);


const PeliculasMasRecientesComponent = {
    peliculas: [],

    cargarPeliculas: async () => {
        try {
            const rawResponse = await m.request({
                method: 'GET',
                url: 'api/peliculas/recientes',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            PeliculasMasRecientesComponent.peliculas = rawResponse;
            m.redraw();
        } catch (error) {
            console.error('Error al cargar películas:', error);
        }
    },

    view: () => {
        return m('section#popular-with-everyone.section', [
            m('h2.section-heading', [
                m('a', { href: '#' }, 'Recientes en Filmagram')
            ]),
            m('ul#lista2.poster-list.-p150.film-list.-horizontal', 
            PeliculasMasRecientesComponent.peliculas.map(pelicula => {
                    return m('li.react-component.poster.film-poster', [
                        m('div', [
                            m('a.frame.has-menu', {
                                href: '#', // Enlace temporal para evitar que navegue
                                onclick: (e) => {
                                    e.preventDefault();
                                    localStorage.setItem('peliculaId', pelicula.id);
                                    window.location.href = '/perfilPelicula.html'; // Redirigir a la página deseada
                                }
                            }, [
                                m('img.image', {
                                    src: pelicula.portada,
                                    width: '150',
                                    height: '225',
                                    alt: pelicula.titulo
                                })
                            ])
                        ])
                    ]);
                })
            )
        ]);
    }
};

// Cargar películas al iniciar el componente
PeliculasMasRecientesComponent.cargarPeliculas();

// Montar el componente en el elemento DOM
m.mount(document.getElementById('contenido3'), PeliculasMasRecientesComponent);


// Función para manejar el envío del formulario
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario

    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

    // Realizar la llamada POST a tu backend Spring Boot
    m.request({
        method: "POST",
    url: "/api/usuarios/login",
        body: {
            username: userData["username"],
            password: userData["password"]
        }
    })
    .then(function(response){
        if (response === null){
            document.getElementById("error").textContent = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        } else {
            console.log(response)
            localStorage.setItem("DatosUsuario", response)
            localStorage.setItem("username", response.nombre)
            localStorage.setItem('usuarioId', response.id);
            localStorage.setItem('insigniaUser', response.insignia.puntuacionMinima);
            localStorage.setItem('insigniaInfo', response.insignia);
            
            window.location.href = "index.html";
        }
    }
    )
    .catch(error => {
        console.log('Error:', error);
    });
});

// Función para cerrar el modal
document.querySelector('.close').addEventListener('click', function () {
    closeModal();
});

function closeModal() {
    // Lógica para cerrar el modal
}
