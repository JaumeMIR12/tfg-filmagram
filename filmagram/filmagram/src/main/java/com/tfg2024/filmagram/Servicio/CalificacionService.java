package com.tfg2024.filmagram.Servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Calificacion;
import com.tfg2024.filmagram.Entidad.CalificacionId;
import com.tfg2024.filmagram.Repositorio.CalificacionRepository;

@Service
public class CalificacionService {
	
	@Autowired
	private CalificacionRepository calificacionRepository;


    // Método para insertar una nueva calificación
    public void insertCalificacion(Long userId, Long filmId, int calificacion) {
    	CalificacionId calId = new CalificacionId();
    	calId.setUsuarioId(userId);
    	calId.setPeliculaId(filmId);
        Calificacion nuevaCalificacion = new Calificacion();
        nuevaCalificacion.setId(calId);
        nuevaCalificacion.setCalificacion(calificacion);
        calificacionRepository.save(nuevaCalificacion);
    }

    // Método para eliminar una calificación
    /*public void deleteCalificacion(Long userId, Long filmId) {
        calificacionRepository.deleteByUsuarioIdAndPeliculaId(userId, filmId);
    }*/
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void deleteCalificacion(Long userId, Long filmId) {
        String sql = "DELETE FROM Calificaciones WHERE usuario_id = ? AND pelicula_id = ?";
        jdbcTemplate.update(sql, userId, filmId);
    }

}
