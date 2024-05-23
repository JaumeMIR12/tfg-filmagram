const Nav = {
    view: () => {
        const isLoggedIn = localStorage.getItem("username");
        var barraBuscador = false;

        const realizarBusqueda = () => {
            const searchText = document.getElementById("searchInput").value;
            localStorage.setItem("textoBuscar", searchText); // Obtener el texto de búsqueda
            // Redireccionar a la página de resultados de búsqueda y pasar el texto como parámetro de consulta
            //window.location.href = "/resultadosBusqueda.html?query=" + searchText;
            window.location.href = "/resultadosBusqueda.html";
        };

        return m('div', [
            m('nav', [
                m('ul', [
                    m('li', m('a', { href: '#', onclick: (e) => {
                        e.preventDefault();
                        if (Nav.barraBuscador){
                            Nav.barraBuscador = false;
                        } else {
                            Nav.barraBuscador = true;
                        }
                        
                    } }, 'Buscar')), // Toggle para mostrar/ocultar componente de búsqueda
                    m('li', m('a', { href: '/peliculasBuscador.html' }, 'Películas')),
                    m('li', [
                        isLoggedIn ?
                        m('a', { href: '/perfilUsuario.html', class: 'has-icon toggle-menu',onclick: (e) => {
                            localStorage.setItem('userVisited', localStorage.getItem("usuarioId"));
                        } }, 'Perfil') : m('a', { href: '/registro.html', class: 'has-icon toggle-menu' }, 'Inicia Sesión'),
                        isLoggedIn ?
                        m('ul.subnav', [
                            m('li.divider', m('a', { href: '/perfilUsuario.html', onclick: (e) => {
                                localStorage.setItem('userVisited', localStorage.getItem("usuarioId"));
                            } }, 'Perfil')),
                            m('li', m('a', { href: '/todasPeliculasV.html' }, 'Películas')),
                            m('li', m('a', { href: '/todasPeliculasW.html' }, 'Quero Ver')),
                            m('li', m('a', { href: '/todasPeliculasF.html' }, 'Favoritas')),
                            m('li', m('a', { href: '/mostrarComentariosUsuario.html' }, 'Comentarios')),
                            m('li', m('a', { href: '/settings/subscriptions/' }, 'Partidas')),
                            m('li', m('a', { href: '#', onclick: () => logout() }, 'Cerrar Sesión'))
                        ]) : null,
                    ]),
                    m('li', m('a', { href: '/peliculasPopulares.html' }, 'Popular')),
                    isLoggedIn ? m('li', m('a', { href: '/juego.html' }, 'Jugar')): m('li', m('a', { href: '/index.html' }, 'Jugar'))
                ])
            ]),
            // Componente de búsqueda, solo se muestra si barraBuscador es true
            Nav.barraBuscador && m('div', { class: 'search-container' }, [
                m('input', { id: 'searchInput', type: 'text', placeholder: 'Introduce tu búsqueda...' }),
                m('button', { onclick: () => realizarBusqueda() }, 'Buscar')
            ])
        ]);
    }
};

function logout() {
    // Lógica para cerrar sesión, como eliminar el usuario del localStorage, redireccionar, etc.
    localStorage.clear(); // Borrar todo el contenido del localStorage
    
    window.location.href = "index.html";
}

// Montar el componente en un elemento del DOM
m.mount(document.getElementById('nav'), Nav);
