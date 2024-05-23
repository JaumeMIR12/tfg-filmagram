package com.tfg2024.filmagram.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.Juego;
import com.tfg2024.filmagram.Entidad.PeliculaRequest;
import com.tfg2024.filmagram.Repositorio.JuegoRepository;
import com.tfg2024.filmagram.Servicio.JuegoService;

@RestController
@RequestMapping("/api/juegos")
public class JuegoController {
	
	@Autowired
    private JuegoRepository juegoRepository;
	
	@Autowired
	private JuegoService juegoService;
	
	@GetMapping("/usuario/{usuarioId}")
	public Juego getJuegoDeUsuario(@PathVariable("usuarioId") Long usuarioId) {
		
		return juegoRepository.findPartidaDeUsuario(usuarioId);
		
		
	}
	
	@PostMapping("/update/partida")
    public Integer marcarComoFavorita(@RequestParam Long partidaId, Long usuarioId) {
		Integer numRespuesta = juegoService.updatePartidaUsuario(partidaId, usuarioId);
		return numRespuesta;
		
    }
	

}
