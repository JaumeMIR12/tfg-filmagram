package com.tfg2024.filmagram.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tfg2024.filmagram.Entidad.Actor;
import com.tfg2024.filmagram.Servicio.ActorService;

@Controller
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

}
