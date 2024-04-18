package com.tfg2024.filmagram.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tfg2024.filmagram.Entidad.Director;
import com.tfg2024.filmagram.Servicio.DirectorService;

@Controller
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

    @GetMapping("/{id}")
    public String getDirectorById(@PathVariable Long id, Model model) {
    	Optional<Director> directorOptional = directorService.getDirectorById(id);
    	directorOptional.ifPresent(director -> model.addAttribute("director", director));
    	return "director";
    }

}
