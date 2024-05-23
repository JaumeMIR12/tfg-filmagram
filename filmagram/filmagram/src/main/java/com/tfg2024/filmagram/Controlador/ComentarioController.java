package com.tfg2024.filmagram.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.ComentarioNuevoRequest;
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
    
    @GetMapping("/pelicula/{peliculaId}")
    public List<Comentario> getComentariosPelicula(@PathVariable("peliculaId") Long id) {
        return comentarioService.getComentariosPelicula(id);
    }
    
    @GetMapping("/todos/pelicula/{peliculaId}")
    public List<Comentario> getTodosComentariosPelicula(@PathVariable("peliculaId") Long id) {
        return comentarioService.getTodosComentariosPelicula(id);
    }
    
    @PostMapping("/addComentarioNuevo")
    public void agregarComentario(@RequestBody ComentarioNuevoRequest comentarioRequest) {
    	System.out.println("Id del Usuario: " + comentarioRequest.getUsuarioId());
    	comentarioService.agregarComentario(comentarioRequest.getUsuarioId(), comentarioRequest.getPeliculaId(), comentarioRequest.getComentario());
    }
    
    

}
