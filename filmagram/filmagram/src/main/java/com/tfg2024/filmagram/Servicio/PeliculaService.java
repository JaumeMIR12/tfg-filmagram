package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Calificacion;
import com.tfg2024.filmagram.Entidad.CalificacionId;
import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.Pelicula;
import com.tfg2024.filmagram.Entidad.Usuario;
import com.tfg2024.filmagram.Repositorio.PeliculaRepository;

@Service
public class PeliculaService {
	
	@Autowired
    private PeliculaRepository peliculaRepository;

    public List<Pelicula> getAllPeliculas() {
        return peliculaRepository.findAll();
    }

	public Optional<Pelicula> getPeliculaById(Long id) {
		// TODO Auto-generated method stub
		return peliculaRepository.findById(id);
	}
	
	public List<Pelicula> getPeliculasMasComentarios(){
		return peliculaRepository.findPeliculasMasComentarios();
	}
	
	public List<Pelicula> getPeliculasMasPopularesFilamgram(){
		return peliculaRepository.findPeliculasMasPopularesFilmagram();
	}
	
	public List<Pelicula> getPeliculasRecientes(){
		return peliculaRepository.findPeliculasRecientes();
	}
	
	public List<Object> getPeliculasByFiltro(String titulo, Integer estreno, String genero, String calificacion){
		return peliculaRepository.findByFiltros(titulo, estreno, genero, calificacion);
	}
	
	public List<Pelicula> getPeliculasPorDirector(Long id) {
		// TODO Auto-generated method stub
		return peliculaRepository.findPeliculasPorDirector(id);
	}
	
	public Optional<List<Object>> getPortadaConMasInfo(Long id) {
		return peliculaRepository.findPortadaConMasDatos(id);
	}
	
	public Optional<Object> getCalificacionyUsuariosPorPelicula(Long id) {
		return peliculaRepository.findCalificacionyUsuariosPorPelicula(id);
	}
	
	public Optional<List<Pelicula>> getPeliculasVistasPorUsuario(Long usuarioId) {
		return peliculaRepository.findPeliculasVistasPorUsuario(usuarioId);
	}
	
	public Optional<List<Pelicula>> getPeliculasFavoritasPorUsuario(Long usuarioId) {
		return peliculaRepository.findPeliculasFavoritasPorUsuario(usuarioId);
	}
	
	public Optional<List<Pelicula>> getPeliculasPorVerPorUsuario(Long usuarioId) {
		return peliculaRepository.findPeliculasPorVerPorUsuario(usuarioId);
	}
	
	
	
	@Autowired
    private JdbcTemplate jdbcTemplate;

    public void agregarPeliculaVista(Long usuario, Long pelicula) {
        String sql = "INSERT INTO PeliculasVistas (usuario_id, pelicula_id)\r\n"
        		+ "SELECT * FROM (SELECT ? AS usuario_id, ? AS pelicula_id) AS tmp\r\n"
        		+ "WHERE NOT EXISTS (\r\n"
        		+ "    SELECT 1 FROM PeliculasVistas WHERE usuario_id = ? AND pelicula_id = ?\r\n"
        		+ ") LIMIT 1;\r\n"
        		+ "";
        jdbcTemplate.update(sql, usuario, pelicula, usuario, pelicula);
    }

    public void eliminarPeliculaVista(Long usuario, Long pelicula) {
        String sql = "DELETE FROM PeliculasVistas WHERE usuario_id = ? AND pelicula_id = ?";
        jdbcTemplate.update(sql, usuario, pelicula);
    }

    public void agregarPeliculaFavorita(Long usuario, Long pelicula) {
    	String sql = "INSERT INTO PeliculasFavoritas (usuario_id, pelicula_id)\r\n"
        		+ "SELECT * FROM (SELECT ? AS usuario_id, ? AS pelicula_id) AS tmp\r\n"
        		+ "WHERE NOT EXISTS (\r\n"
        		+ "    SELECT 1 FROM PeliculasFavoritas WHERE usuario_id = ? AND pelicula_id = ?\r\n"
        		+ ") LIMIT 1;\r\n"
        		+ "";
    	jdbcTemplate.update(sql, usuario, pelicula, usuario, pelicula);
    }

    public void eliminarPeliculaFavorita(Long usuario, Long pelicula) {
        String sql = "DELETE FROM PeliculasFavoritas WHERE usuario_id = ? AND pelicula_id = ?";
        jdbcTemplate.update(sql, usuario, pelicula);
    }

    public void agregarPeliculaPorVer(Long usuario, Long pelicula) {
    	String sql = "INSERT INTO PeliculasPorVer (usuario_id, pelicula_id)\r\n"
        		+ "SELECT * FROM (SELECT ? AS usuario_id, ? AS pelicula_id) AS tmp\r\n"
        		+ "WHERE NOT EXISTS (\r\n"
        		+ "    SELECT 1 FROM PeliculasPorVer WHERE usuario_id = ? AND pelicula_id = ?\r\n"
        		+ ") LIMIT 1;\r\n"
        		+ "";
        jdbcTemplate.update(sql, usuario, pelicula, usuario, pelicula);
    }

    public void eliminarPeliculaPorVer(Long usuario, Long pelicula) {
        String sql = "DELETE FROM PeliculasPorVer WHERE usuario_id = ? AND pelicula_id = ?";
        jdbcTemplate.update(sql, usuario, pelicula);
    }
    
    
    public Integer isPeliculaVista(Long usuarioId, Long peliculaId) {
        // Implementa la lógica para comprobar si la película está marcada como vista
        // Por ejemplo, podrías usar una consulta en el repositorio
        return peliculaRepository.existsByUsuarioIdAndPeliculaId(usuarioId, peliculaId);
    }
    
    public Integer isPeliculaFav(Long usuarioId, Long peliculaId) {
        // Implementa la lógica para comprobar si la película está marcada como vista
        // Por ejemplo, podrías usar una consulta en el repositorio
        return peliculaRepository.existsFavoritaByUsuarioIdAndPeliculaId(usuarioId, peliculaId);
    }
    
    public Integer isPeliculaPorVer(Long usuarioId, Long peliculaId) {
        // Implementa la lógica para comprobar si la película está marcada como vista
        // Por ejemplo, podrías usar una consulta en el repositorio
        return peliculaRepository.existsWatchlistByUsuarioIdAndPeliculaId(usuarioId, peliculaId);
    }
    
    public Object getCalificacionPeliculaUsuario(Long usuarioId, Long peliculaId) {
        // Implementa la lógica para comprobar si la película está marcada como vista
        // Por ejemplo, podrías usar una consulta en el repositorio
        return peliculaRepository.calificacionDePeliculaPorUnUsuario(usuarioId, peliculaId);
    }

}
