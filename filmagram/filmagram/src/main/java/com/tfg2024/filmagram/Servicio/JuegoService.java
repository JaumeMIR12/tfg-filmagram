package com.tfg2024.filmagram.Servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Juego;
import com.tfg2024.filmagram.Repositorio.JuegoRepository;


@Service
public class JuegoService {
	
	@Autowired
    private JuegoRepository juegoRepository;
	
	public Juego findPartidaDeUsuario(Long usuarioId) {
		
        return juegoRepository.findPartidaDeUsuario(usuarioId);
    }
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public Integer updatePartidaUsuario(Long partidaId, Long usuarioId) {
		
		// SQL para obtener el conteo de registros en la tabla Juegos
	    String countSql = "SELECT COUNT(*) FROM Juegos";
	    
	    // Obtener el conteo
	    Integer count = jdbcTemplate.queryForObject(countSql, Integer.class);
	    
	    // Comprobar si partidaId es igual al conteo
	    if (partidaId.equals(count.longValue())) {
	        // Si son iguales, no hacer nada
	        return 555;
	    } else {
	        // Si no son iguales, realizar el UPDATE
	        String sql = "UPDATE Partidas SET juego_id = ? WHERE usuario_id = ?";
	        Long nuevoId = partidaId + 1;
	        System.out.println("Nuevo id es: " + nuevoId);
	        jdbcTemplate.update(sql, nuevoId, usuarioId);
	        return 2;
	    }
	}

}
