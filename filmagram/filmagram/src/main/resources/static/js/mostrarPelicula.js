document.addEventListener('DOMContentLoaded', async () => {
    const peliculaId = localStorage.getItem('peliculaId');

    if (!peliculaId) {
        document.getElementById('resultado').innerText = 'No se ha seleccionado ninguna película.';
        return;
    }

    const response = await fetch(`/api/peliculas/${peliculaId}`);
    if (!response.ok) {
        document.getElementById('resultado').innerText = 'Error al obtener la película.';
        return;
    }

    const pelicula = await response.json();
    document.getElementById('resultado').innerHTML = `
        <h2>${pelicula.titulo}</h2>
        <p><strong>Director:</strong> ${pelicula.director.nombre}</p>
        <p><strong>Género:</strong> ${pelicula.genero}</p>
        <p><strong>Estreno:</strong> ${pelicula.estreno}</p>
        <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
    `;
});
