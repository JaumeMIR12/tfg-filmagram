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

import com.tfg2024.filmagram.Entidad.Actor;
import com.tfg2024.filmagram.Entidad.Pelicula;
import com.tfg2024.filmagram.Servicio.ActorService;

@RestController
@RequestMapping("/api/actores")
public class ActorController {
	
	@Autowired
    private ActorService actorService;
	
	@GetMapping("/actores")
    public String getAllActores(Model model) {
		model.addAttribute("actores", actorService.getAllActores());
        return "actores";
    }

    @GetMapping("/{id}")
    public Optional<Actor> getActorById(@PathVariable Long id) {
        return actorService.getActorById(id);
    }
    
    @GetMapping("/seguidores/{actorId}")
    public Integer getSeguidoresActor(@PathVariable("actorId") Long id) {
        return actorService.getSeguidoresActor(id);
    }
    
    @GetMapping("/verificarSeguimiento/{actorId}/{usuarioId}")
    public Integer verificarSeguimiento(@PathVariable("actorId") Long actorId, @PathVariable("usuarioId") Long usuarioId) {
        // Lógica para verificar si el usuario sigue al actor
        return actorService.getVerificarSeguimiento(usuarioId, actorId);
    }
    
    @PostMapping("/dejarDeSeguir/{actorId}/{usuarioId}")
    public ResponseEntity<String> dejarDeSeguir(@PathVariable("actorId") Long actorId, @PathVariable("usuarioId") Long usuarioId) {
        // Lógica para dejar de seguir al actor
        if (actorService.dejarDeSeguir(actorId, usuarioId)) {
            return ResponseEntity.ok("Dejaste de seguir al actor con éxito.");
        } else {
            return ResponseEntity.badRequest().body("Error al dejar de seguir al actor.");
        }
    }
    
    @PostMapping("/seguir/{actorId}/{usuarioId}")
    public ResponseEntity<String> seguir(@PathVariable("actorId") Long actorId, @PathVariable("usuarioId") Long usuarioId) {
        if (actorService.seguir(actorId, usuarioId)) {
            return ResponseEntity.ok("Ahora sigues al actor.");
        } else {
            return ResponseEntity.badRequest().body("Error al intentar seguir al actor.");
        }
    }



}
