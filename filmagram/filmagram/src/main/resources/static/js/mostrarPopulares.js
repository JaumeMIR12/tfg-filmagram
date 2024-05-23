const PelisMasPopulares = {
    peliculas: [],

    cargarPeliculas: async () => {
        try {
            const rawResponse = await m.request({
                method: 'GET',
                url: 'api/peliculas/populares/todas',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            PelisMasPopulares.peliculas = rawResponse;
            console.log(rawResponse);
            m.redraw();
        } catch (error) {
            console.error('Error al cargar películas:', error);
        }
    },

    view: () => {

        if (PelisMasPopulares.peliculas.length === 0) {
            return m('div', 'No hay películas populares');
        }

        if (!PelisMasPopulares.peliculas) {
            PelisMasPopulares.cargarPeliculas();
            return m('div', 'Cargando...');
        }


        return m('section', { id: 'seccion1', class: 'section col-pelis col-main' }, [
            m("div", { class: "poster-grid" }, [
                m("ul", { class: "grid -grid -p125 -constrained clear" }, PelisMasPopulares.peliculas.map(function(pelicula) {
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

// Cargar películas al iniciar el componente
PelisMasPopulares.cargarPeliculas();

// Montar el componente en el elemento DOM
m.mount(document.getElementById('app'), PelisMasPopulares);