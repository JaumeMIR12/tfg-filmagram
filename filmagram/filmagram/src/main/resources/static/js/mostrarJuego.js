window.onload = function(){

    if (!localStorage.getItem('usuarioId')){
        window.location = "index.html";
    }

    if (localStorage.getItem('nivelLeyenda') === 'true') {
        alert("Estoy dentro")
        const modal = document.getElementById("modalLeyenda");
        const span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

}

const MostrarInfo = {
    // Estado inicial del componente
    juego: {},
    error: null,
    userAnswer: "",
    showCorrectAnswer: false,

    // Función para cargar los datos del director
    loadJuego: async () => {
        const usuarioId = localStorage.getItem('usuarioId');

        if (!usuarioId) {
            MostrarInfo.error = 'No se ha seleccionado ningún usuario.';
            return;
        }

        try {
            const response = await m.request({
                method: 'GET',
                url: `/api/juegos/usuario/${usuarioId}`,
            });
            for (let i = 0; i < localStorage.length; i++) {
                // Obtener la clave en el índice actual
                let key = localStorage.key(i);
                // Obtener el valor asociado a la clave
                let value = localStorage.getItem(key);
                // Mostrar la clave y el valor
                console.log(`Key: ${key}, Value: ${value}`);
            }
            MostrarInfo.juego = response;
        } catch (error) {
            MostrarInfo.error = 'Error al obtener la información del juego.';
        }
    },

    checkAnswer: async () => {
        const respuestaCorrecta = MostrarInfo.juego.respuesta.toLowerCase();
        const respuestaUsuario = MostrarInfo.userAnswer.toLowerCase();

        if (respuestaUsuario === respuestaCorrecta) {
            MostrarInfo.showCorrectAnswer = true;
            document.getElementById('respuesta-incorrecta').textContent = '';
            m.redraw();
            setTimeout(async () => {
                try {
                    const numeroRespuesta = await m.request({
                        method: 'POST',
                        url: `/api/juegos/update/partida?partidaId=${MostrarInfo.juego.id}&usuarioId=${localStorage.getItem('usuarioId')}`,
                        // body: {
                        //     usuarioId: localStorage.getItem('usuarioId'),
                        //     juegoId: MostrarInfo.juego.id,
                        //     respuesta: respuestaUsuario,
                        //     puntuacion: MostrarInfo.juego.puntuacionCorrecto,
                        // },
                    });
                    if (numeroRespuesta === 555) {
                        localStorage.setItem('nivelLeyenda', 'true');
                    }
                    let puntosActuales = parseInt(localStorage.getItem("insigniaUser")) || 0;
                    let puntuacionRespuesta = MostrarInfo.juego.puntuacionCorrecto;
                    let nuevaPuntuacion = puntosActuales + puntuacionRespuesta;
                    const respuesta = await m.request({
                        method: "POST",
                        url: "/api/insignias/update/"+nuevaPuntuacion+"/insignia/"+localStorage.getItem('usuarioId'),
                        // body: { usuarioId: Sidebar.pelRequest.userId, peliculaId: Sidebar.pelRequest.filmId }
                    });
                    console.log(respuesta);
                    //MostrarInfo.loadJuego();
                    localStorage.setItem("insigniaUser", nuevaPuntuacion);
                    location.reload();
                } catch (error) {
                    alert("Error al enviar la respuesta.");
                }
            }, 3000);
        } else {
            document.getElementById('respuesta-incorrecta').textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
        }
        
    },

    // Vista del componente
    view: () => {
        var dificultad = "";
                switch (MostrarInfo.juego.nivelDificultad) {
                    case 1:
                        dificultad = "Principiante";
                        break;
                    case 2:
                        dificultad = "Intermedio";
                        break;
                    case 3:
                        dificultad = "Difícil";
                        break;
                    case 4:
                        dificultad = "Experto";
                        break;
                    default:
                        dificultad = "Desconocido";
                }
        return m("div.game-container", [
            m("div.game-title", MostrarInfo.juego.nombre),
            m("div.game-description", `Nivel de Dificultad: ${dificultad}`),
            m("div.game-description", MostrarInfo.juego.descripcion),
            m("div.points", `Puntos: ${MostrarInfo.juego.puntuacionCorrecto}`),
            m("img.movie-image", {src: MostrarInfo.juego.imagenUrl, alt: "Imagen de la película"}),
            MostrarInfo.showCorrectAnswer && m("div.correct-answer", { style: 'display: block;' }, "¡Respuesta correcta!"),
            m("input.answer-input[type=text][placeholder=Escribe tu respuesta aquí]", {
                oninput: (e) => MostrarInfo.userAnswer = e.target.value,
                value: MostrarInfo.userAnswer,
            }),
            m("div#respuesta-incorrecta", { style: 'color: red;' }),
            m("button.submit-button", {onclick: MostrarInfo.checkAnswer}, "Adivinar")
        ]);
    }
};

// Cargar los datos del juego al inicio
MostrarInfo.loadJuego();

// Montar el componente en el elemento con id "app"
document.addEventListener('DOMContentLoaded', () => {
            // Monta el componente en el elemento con el ID "app"
            m.mount(document.getElementById('app'), MostrarInfo);
        });