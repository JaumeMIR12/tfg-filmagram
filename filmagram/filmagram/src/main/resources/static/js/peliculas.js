window.onload = function(){
    listarPeliculas();
    listarPeliculasUltComments();
    listarPeliculasMasComentarios();
    listarPeliculasRecientes();

    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

// Cuando se haga clic en el botón, abrir la ventana modal

    modal.style.display = "block";


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

let listarPeliculas = async () => {
    const rawResponse = await fetch('api/peliculas/peliculas', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const peliculas = await rawResponse.json();

     let contenidoTable = `
        <table class="movie-table">
            <tr>
                <th class="tg-0lax" colspan="4">PELÍCULAS</th>
            </tr>`;

    let rowCount = 0; // Contador para las columnas en cada fila

    for (let pelicula of peliculas) {
        if (rowCount === 0) {
            // Inicia una nueva fila cada 4 películas (cada 4 columnas)
            contenidoTable += `<tr>`;
        }

        // Crea una celda con el título y nombre del director
        contenidoTable += `
            <td>${pelicula.titulo} - ${pelicula.director.nombre}</td>
        `;

        rowCount++;

        if (rowCount === 4) {
            // Cierra la fila después de haber agregado 4 columnas
            contenidoTable += `</tr>`;
            rowCount = 0; // Reinicia el contador para comenzar una nueva fila
        }
    }

    // Cierra la tabla
    contenidoTable += `</table>`;

    const peliculasContainer = document.getElementById('app');
    peliculasContainer.innerHTML = contenidoTable;
  };

let listarPeliculasUltComments = async () => {
    const rawResponse = await fetch('api/comentarios/ahora', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const peliculas = await rawResponse.json();
        
     let contenidoComun= ""

         for (let pelicula of peliculas) { 
            let fechaComentario = new Date(pelicula.fechaComentario);

    // Obtener el nombre del mes y el día
    const nombreMes = fechaComentario.toLocaleString('default', { month: 'long' });
    const dia = fechaComentario.getDate();
            contenidoComun += `<li class="poster-container viewing-poster-container "> 
            <div class="react-component poster film-poster ">
                <div>
                <a id="link-pelicula"  data-id="${pelicula.pelicula.id}" class="frame has-menu">
                <img src="${pelicula.pelicula.portada}" width="150" height="225" alt="${pelicula.pelicula.titulo}" class="image">
                </a>
                 <div class="attribution-block js-poster-attribution"> 
                     <p class="attribution"> 
                     <strong class="name"><a href="/screamother/">${pelicula.usuario.nombre}</a></strong>
                     </p> 
                 </div>
                     <a href="/axl_r/film/500-days-of-summer/" class="frame has-menu" data-original-title="(500) Days of Summer (2009)">
                     </a>
                 </div>
                     </div>  
                     <p class="poster-viewingdata"> 
                     <span class="rating rated-6"> ${pelicula.comentario} </span> 
                     <a href="/axl_r/film/500-days-of-summer/" class="has-icon icon-review icon-16 tooltip" data-original-title="Review">
                     <span class="icon"></span></a> <time >${nombreMes} - ${dia}</time> 
                     </p> 
                </li>`

         }


    const peliculasContainer = document.getElementById('lista1');
    peliculasContainer.innerHTML = contenidoComun;

    
    document.querySelectorAll('#link-pelicula').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Evitar que se siga el enlace por defecto

            const peliculaId = link.getAttribute('data-id');
            localStorage.setItem('peliculaId', peliculaId);
            window.location.href = '/perfilPelicula.html';
        });
    });
  };

let listarPeliculasMasComentarios = async () => {
    const rawResponse = await fetch('api/peliculas/populares', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const peliculas = await rawResponse.json();
  
    console.log(peliculas);
    
     let contenidoComun= ""

         for (let pelicula of peliculas) {
            console.log(pelicula.director.nombre);
            contenidoComun += `
            <li class="react-component poster film-poster ">
            <div>
            <a id="link-pelicula"  data-id="${pelicula.id}" class="frame has-menu" >
            <img src="${pelicula.portada}" width="150" height="225" alt="${pelicula.titulo}" class="image">
            </a>
            </div>
            </li>
            `

         }


    const peliculasContainer = document.getElementById('lista2');
    peliculasContainer.innerHTML = contenidoComun;

    
    document.querySelectorAll('#link-pelicula').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Evitar que se siga el enlace por defecto

            const peliculaId = link.getAttribute('data-id');
            localStorage.setItem('peliculaId', peliculaId);
            window.location.href = '/perfilPelicula.html';
        });
    });
  };


  let listarPeliculasRecientes = async () => {
    const rawResponse = await fetch('api/peliculas/recientes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const peliculas = await rawResponse.json();
  
    console.log(peliculas);
    
     let contenidoComun= ""

         for (let pelicula of peliculas) {
            console.log(pelicula.director.nombre);
            contenidoComun += `
            <li class="react-component poster film-poster ">
            <div>
            <a id="link-pelicula"  data-id="${pelicula.id}" class="frame has-menu" >
            <img src="${pelicula.portada}" width="150" height="225" alt="${pelicula.titulo}" class="image">
            </a>
            </div>
            </li>
            `

         }


    const peliculasContainer = document.getElementById('lista3');
    peliculasContainer.innerHTML = contenidoComun;

    
    document.querySelectorAll('#link-pelicula').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Evitar que se siga el enlace por defecto

            const peliculaId = link.getAttribute('data-id');
            localStorage.setItem('peliculaId', peliculaId);
            window.location.href = '/perfilPelicula.html';
        });
    });
  };