package com.tfg2024.filmagram.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.Insignia;
import com.tfg2024.filmagram.Entidad.Pelicula;
import com.tfg2024.filmagram.Servicio.PeliculaService;

@RestController
@RequestMapping("/api/peliculas")
public class PeliculaController {
	
	@Autowired
    private PeliculaService peliculaService;

	@CrossOrigin("http://localhost:8080/")
    @GetMapping("/peliculas")
    public List<Pelicula> getAllPeliculas() {
        return peliculaService.getAllPeliculas();
    }
    
	@CrossOrigin("http://localhost:8080/")
    @GetMapping("/{peliculaId}")
    public Optional<Pelicula> getPeliculaById(@PathVariable("peliculaId") Long id) {
        return peliculaService.getPeliculaById(id);
    }
	
	@GetMapping("/populares")
    public List<Pelicula> getPeliculasMasComentarios() {
        return peliculaService.getPeliculasMasComentarios();
    }
	
	@GetMapping("/recientes")
    public List<Pelicula> getPeliculasRecientes() {
        return peliculaService.getPeliculasRecientes();
    }
    
    

}
