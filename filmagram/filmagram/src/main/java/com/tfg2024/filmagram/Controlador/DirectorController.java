package com.tfg2024.filmagram.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.Director;
import com.tfg2024.filmagram.Entidad.Pelicula;
import com.tfg2024.filmagram.Servicio.DirectorService;

@RestController
@RequestMapping("/api/directores")
public class DirectorController {
	
	@Autowired
    private DirectorService directorService;

	@GetMapping("/directores")
    public String getAllDirectores(Model model) {
		System.out.println("Número de directores: " + directorService.getAllDirectores().size());
        model.addAttribute("directores", directorService.getAllDirectores());
        return "directores"; // Nombre del archivo HTML sin extensión
    }
	
	@GetMapping("/seguidores/{directorId}")
    public Integer getSeguidoresActor(@PathVariable("directorId") Long id) {
        return directorService.getSeguidoresDirector(id);
    }

    @GetMapping("/{directorId}")
    public Optional<Director> getDirectorById(@PathVariable("directorId") Long id, Model model) {
    	return directorService.getDirectorById(id);
    }
    
    @GetMapping("/verificarSeguimiento/{directorId}/{usuarioId}")
    public Integer verificarSeguimiento(@PathVariable("directorId") Long directorId, @PathVariable("usuarioId") Long usuarioId) {
        // Lógica para verificar si el usuario sigue al director
        return directorService.getVerificarSeguimiento(usuarioId, directorId);
    }
    
    @PostMapping("/dejarDeSeguir/{directorId}/{usuarioId}")
    public ResponseEntity<String> dejarDeSeguir(@PathVariable("directorId") Long directorId, @PathVariable("usuarioId") Long usuarioId) {
        // Lógica para dejar de seguir al director
        if (directorService.dejarDeSeguir(directorId, usuarioId)) {
            return ResponseEntity.ok("Dejaste de seguir al director con éxito.");
        } else {
            return ResponseEntity.badRequest().body("Error al dejar de seguir al director.");
        }
    }
    
    @PostMapping("/seguir/{directorId}/{usuarioId}")
    public ResponseEntity<String> seguir(@PathVariable("directorId") Long directorId, @PathVariable("usuarioId") Long usuarioId) {
        if (directorService.seguir(directorId, usuarioId)) {
            return ResponseEntity.ok("Ahora sigues al director.");
        } else {
            return ResponseEntity.badRequest().body("Error al intentar seguir al director.");
        }
    }

}
