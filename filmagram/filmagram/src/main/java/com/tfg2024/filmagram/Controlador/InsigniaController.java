package com.tfg2024.filmagram.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.tfg2024.filmagram.Entidad.Insignia;
import com.tfg2024.filmagram.Servicio.InsigniaService;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/insignias")
public class InsigniaController {
	
	@Autowired
    private InsigniaService insigniaService;
	
	@GetMapping("/insignias")
    public String getAllInsignias(Model model) {
		System.out.println("Número de insignias: " + insigniaService.getAllInsignias().size());
        model.addAttribute("insignias", insigniaService.getAllInsignias());
        return "insignias";
    }

    //@GetMapping
    //public List<Insignia> getAllInsignias() {
     //   return insigniaService.getAllInsignias();
    //}
    
    @GetMapping("/{insigniaId}")
    public Optional<Insignia> getInsigniaById(@PathVariable("insigniaId") Long id) {
        return insigniaService.getInsignia(id);
    }

}
