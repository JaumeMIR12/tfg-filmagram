package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Insignia;
import com.tfg2024.filmagram.Repositorio.InsigniaRepository;

@Service
public class InsigniaService {
	
	@Autowired
    private InsigniaRepository insigniaRepository;

    public List<Insignia> getAllInsignias() {
        return insigniaRepository.findAll();
    }
    
    public Optional<Insignia> getInsignia(Long id) {
        return insigniaRepository.findById(id);
    }
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public Insignia getUpdateInsignia(Long usuarioId, Integer puntuacionObtenida) {
    	String updateSql = "UPDATE Usuarios SET insignia_id = ( SELECT id " +
                "    FROM Insignias " +
                "    WHERE puntuacion_minima <= ? " +
                "    ORDER BY puntuacion_minima DESC " +
                "    LIMIT 1" +
                ") " +
                "WHERE id = ?";
    	
    	jdbcTemplate.update(updateSql, puntuacionObtenida, usuarioId);
    	
    	Insignia insignia = insigniaRepository.findInsigniaUsuario(usuarioId);
    	
    	return insignia;
    }

}
