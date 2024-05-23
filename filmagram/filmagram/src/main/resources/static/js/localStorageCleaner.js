// window.addEventListener('beforeunload', function() {
//     // Limpiar el localStorage al cerrar la ventana o pestaña
//     localStorage.clear();
// });
document.getElementById("sign-out").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    localStorage.clear(); // Borrar todo el contenido del localStorage
    
    window.location.href = "index.html";
});