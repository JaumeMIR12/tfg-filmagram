package com.tfg2024.filmagram.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.Actuacion;
import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Servicio.ActuacionService;


@RestController
@RequestMapping("/api/actuaciones")
public class ActuacionController {
	
	@Autowired
    private ActuacionService actuacionService;
	
	@GetMapping("/pelicula/{peliculaId}")
    public Optional<List<Actuacion>> getActuacionesPeliculaPorId(@PathVariable("peliculaId") Long id) {
        return actuacionService.getActuacionesPeliculasPorId(id);
    }
	
	@GetMapping("/actor/{actorId}")
	public List<Actuacion> getActuacionesPorActor(@PathVariable("actorId") Long id){
		return actuacionService.getActuacionesPorActor(id);
	}

}
