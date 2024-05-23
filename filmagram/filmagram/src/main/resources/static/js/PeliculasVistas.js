const PeliculasVistas = {
    // Estado inicial del componente
    peliculas: [],

    // Función para cargar los datos del director
    loadPeliculasVistas: function(usuarioId) {

        if (localStorage.getItem('usuarioId') == null) {
            var usuarioId = localStorage.getItem('userVisited');
        } else {
            if (localStorage.getItem('userVisited') == localStorage.getItem('usuarioId')){
                var usuarioId = localStorage.getItem('usuarioId');
            } else {
                var usuarioId = localStorage.getItem('userVisited');
            }
        }
        
        m.request({
            method: "GET",
            url: `/api/peliculas/vistas/${usuarioId}`
        }).then(function(response) {
            PeliculasVistas.peliculas = response;
            console.log(response);
            m.redraw(); // Forzar un nuevo renderizado después de recibir datos
        }).catch(function(error) {
            console.error("Error al cargar películas fav de usuario:", error);
        });
    },

    // Vista del componente
    view: () => {

        if (PeliculasVistas.peliculas.length === 0) {
            return m('div', 'Aún no has visto ninguna película. A QUE ESPERAS!?');
        }

        if (!PeliculasVistas.peliculas) {
            PeliculasVistas.loadPeliculasVistas();
            return m('div', 'Cargando...');
        }
        
        return m('section', { id: 'seccion1', class: 'section col-pelis col-main' }, [
        m("div", { class: "poster-grid" }, [
            m("ul", { class: "grid -grid -p125 -constrained clear" }, PeliculasVistas.peliculas.map(function(pelicula) {
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

const usuarioId = localStorage.getItem('usuarioId');

// Cargar los datos del actor al inicio
PeliculasVistas.loadPeliculasVistas(usuarioId);

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
            // Monta el componente en el elemento con el ID "app"
            m.mount(document.getElementById('app'), PeliculasVistas);
        });