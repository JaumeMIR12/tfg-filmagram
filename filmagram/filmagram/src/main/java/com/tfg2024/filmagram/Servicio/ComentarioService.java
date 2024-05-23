package com.tfg2024.filmagram.Servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.ComentarioNuevoRequest;
import com.tfg2024.filmagram.Repositorio.ComentarioRepository;

@Service
public class ComentarioService {
	
	@Autowired
    private ComentarioRepository comentarioRepository;
	
	public List<Comentario> getPeliculasUltimosComentarios() {
        return comentarioRepository.findPeliculasUltimosComentarios();
    }
	
	public List<Comentario> getComentariosPelicula(Long id) {
		return comentarioRepository.findComentariosPelicula(id);
	}
	
	public List<Comentario> getTodosComentariosPelicula(Long id) {
		return comentarioRepository.findTodosComentariosPelicula(id);
	}
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public void agregarComentario(Long usuarioId, Long peliculaId, String comentario) {
        String sql = "INSERT INTO Comentarios (usuario_id, pelicula_id, comentario) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, usuarioId, peliculaId, comentario);
    }
}
