package com.tfg2024.filmagram.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.Pelicula;
import com.tfg2024.filmagram.Servicio.ComentarioService;
import com.tfg2024.filmagram.Servicio.PeliculaService;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {
	
	@Autowired
    private ComentarioService comentarioService;

    
    @GetMapping("/ahora")
    public List<Comentario> getTop6PeliculasWithLatestComment() {
        return comentarioService.getPeliculasUltimosComentarios();
    }
    
    

}
