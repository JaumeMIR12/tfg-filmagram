package com.tfg2024.filmagram.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.CalificacionDTO;
import com.tfg2024.filmagram.Servicio.CalificacionService;

@RestController
@RequestMapping("/api/calificaciones")
public class CalificacionController {

	@Autowired
    private CalificacionService calificacionService;

    // Endpoint para insertar una nueva calificación
    @PostMapping("/addCalificacion")
    public void insertarCalificacion(@RequestBody CalificacionDTO calDTO) {
    	calificacionService.insertCalificacion(calDTO.getUsuarioId(), calDTO.getPeliculaId(), calDTO.getCalificacion());
    }

    // Endpoint para eliminar una calificación
    @DeleteMapping("/delCalificacion")
    public void eliminarCalificacion(@RequestBody CalificacionDTO calDTO) {
        calificacionService.deleteCalificacion(calDTO.getUsuarioId(), calDTO.getPeliculaId());
    }
}
