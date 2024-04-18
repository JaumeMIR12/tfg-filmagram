document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('api/usuarios/usuarios'); // Endpoint API para obtener usuarios
        const usuarios = await response.json();

        const usuariosList = document.getElementById('app');

        // Limpiar lista de usuarios existente
        usuariosList.innerHTML = '';

        // Iterar sobre cada usuario y agregarlo a la lista
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `${usuario.nombre} - ${usuario.email}`;
            usuariosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        // Mostrar mensaje de error en la lista de usuarios
        const usuariosList = document.getElementById('usuarios-list');
        usuariosList.innerHTML = '<li>Error al cargar usuarios. Inténtalo de nuevo más tarde.</li>';
    }
});
