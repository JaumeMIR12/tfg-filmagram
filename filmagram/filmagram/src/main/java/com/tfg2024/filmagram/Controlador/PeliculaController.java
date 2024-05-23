package com.tfg2024.filmagram.Controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.BusquedaPeliculasDTO;
import com.tfg2024.filmagram.Entidad.Calificacion;
import com.tfg2024.filmagram.Entidad.CalificacionId;
import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.Insignia;
import com.tfg2024.filmagram.Entidad.Pelicula;
import com.tfg2024.filmagram.Entidad.PeliculaRequest;
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
	
	@GetMapping("/populares/todas")
    public List<Pelicula> getPeliculasMasPopularesFilmagram() {
        return peliculaService.getPeliculasMasPopularesFilamgram();
    }
	
	@GetMapping("/recientes")
    public List<Pelicula> getPeliculasRecientes() {
        return peliculaService.getPeliculasRecientes();
    }
	
	@GetMapping("/vista")
    public ResponseEntity<Boolean> getPeliculaVista(
        @RequestParam Long usuarioId,
        @RequestParam Long peliculaId) {
        
        Integer numVista = peliculaService.isPeliculaVista(usuarioId, peliculaId);
        
        boolean vista = (numVista != null && numVista == 1);

        return ResponseEntity.ok(vista);
    }
	
	@GetMapping("/favorita")
    public ResponseEntity<Boolean> getPeliculaFav(
        @RequestParam Long usuarioId,
        @RequestParam Long peliculaId) {
        
        Integer numVista = peliculaService.isPeliculaFav(usuarioId, peliculaId);
        
        boolean vista = (numVista != null && numVista == 1);

        return ResponseEntity.ok(vista);
    }
	
	@GetMapping("/watchlist")
    public ResponseEntity<Boolean> getPeliculaWatchlist(
        @RequestParam Long usuarioId,
        @RequestParam Long peliculaId) {
        
        Integer numVista = peliculaService.isPeliculaPorVer(usuarioId, peliculaId);
        
        boolean vista = (numVista != null && numVista == 1);

        return ResponseEntity.ok(vista);
    }
	
	@GetMapping("/yacalificada")
    public Object getCalificacionPelicula(
        @RequestParam Long usuarioId,
        @RequestParam Long peliculaId) {
        
		Object calificacion = peliculaService.getCalificacionPeliculaUsuario(usuarioId, peliculaId);
        

        return calificacion;
    }
	
	@GetMapping("/vistas/{usuarioId}")
	public Optional<List<Pelicula>> getPeliculasVistasPorUsuario(@PathVariable("usuarioId") Long id) {
		return peliculaService.getPeliculasVistasPorUsuario(id);
	}
	
	@GetMapping("/favoritas/{usuarioId}")
	public Optional<List<Pelicula>> getPeliculasFavoritasPorUsuario(@PathVariable("usuarioId") Long id) {
		return peliculaService.getPeliculasFavoritasPorUsuario(id);
	}
	
	@GetMapping("/quierover/{usuarioId}")
	public Optional<List<Pelicula>> getPeliculasPorVerPorUsuario(@PathVariable("usuarioId") Long id) {
		return peliculaService.getPeliculasPorVerPorUsuario(id);
	}
	
	
	@PostMapping("/buscar")
    public List<Object> buscarPeliculasPorFiltro(@RequestBody BusquedaPeliculasDTO filtro) {
        System.out.println("Filtro: " + filtro.getTitulo() + ", " + filtro.getEstreno() + ", " + filtro.getGenero()+ ", " + filtro.getCalificacion());
        return peliculaService.getPeliculasByFiltro(filtro.getTitulo(), filtro.getEstreno(), filtro.getGenero(), filtro.getCalificacion());
    }
	
	@GetMapping("/director/{directorId}")
	public List<Pelicula> getPeliculasPorDirector(@PathVariable("directorId") Long id) {
        return peliculaService.getPeliculasPorDirector(id);
    }
	
	@GetMapping("/portada/{peliculaId}")
	public Optional<List<Object>> getPortadaConMasInfo(@PathVariable("peliculaId") Long id) {
        return peliculaService.getPortadaConMasInfo(id);
    }
	
	@GetMapping("/calificacion/{peliculaId}")
	public Optional<Object> getCalificacionyusuariosPorPelicula(@PathVariable("peliculaId") Long id) {
		return peliculaService.getCalificacionyUsuariosPorPelicula(id);
	}
	
	
	@PostMapping("/vista")
    public void marcarComoVista(@RequestBody PeliculaRequest request) {
		System.out.println("Usuario: " + request.getUsuarioId());
        peliculaService.agregarPeliculaVista(request.getUsuarioId(), request.getPeliculaId());
    }

    @DeleteMapping("/vista")
    public void desmarcarComoVista(@RequestBody PeliculaRequest request) {
        peliculaService.eliminarPeliculaVista(request.getUsuarioId(), request.getPeliculaId());
    }

    @PostMapping("/favorita")
    public void marcarComoFavorita(@RequestBody PeliculaRequest request) {
        peliculaService.agregarPeliculaFavorita(request.getUsuarioId(), request.getPeliculaId());
    }

    @DeleteMapping("/favorita")
    public void desmarcarComoFavorita(@RequestBody PeliculaRequest request) {
        peliculaService.eliminarPeliculaFavorita(request.getUsuarioId(), request.getPeliculaId());
    }

    @PostMapping("/por-ver")
    public void marcarComoPorVer(@RequestBody PeliculaRequest request) {
        peliculaService.agregarPeliculaPorVer(request.getUsuarioId(), request.getPeliculaId());
    }

    @DeleteMapping("/por-ver")
    public void desmarcarComoPorVer(@RequestBody PeliculaRequest request) {
        peliculaService.eliminarPeliculaPorVer(request.getUsuarioId(), request.getPeliculaId());
    }
    
    

}
