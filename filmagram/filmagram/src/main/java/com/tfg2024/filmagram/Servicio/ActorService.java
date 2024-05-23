package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Actor;
import com.tfg2024.filmagram.Repositorio.ActorRepository;

@Service
public class ActorService {
	
	@Autowired
    private ActorRepository actorRepository;

    public List<Actor> getAllActores() {
        return actorRepository.findAll();
    }

    public Optional<Actor> getActorById(Long id) {
        return actorRepository.findById(id);
    }
    
    public Integer getSeguidoresActor(Long id) {
    	return actorRepository.findSeguidoresActor(id);
    }
    
    public Integer getVerificarSeguimiento(Long userId, Long actorId) {
    	return actorRepository.findVerificarSeguimiento(userId, actorId);
    }
    
    /*public boolean dejarDeSeguir(Long actorId, Long usuarioId) {
        // Eliminar la entrada de seguimiento correspondiente al usuario y al actor
        try {
        	actorRepository.deleteByActorIdAndUsuarioId(actorId, usuarioId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }*/
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public boolean dejarDeSeguir(Long actorId, Long usuarioId) {
        String sql = "DELETE FROM SeguimientosActores WHERE actor_id = ? AND usuario_id = ?";
        try {
            jdbcTemplate.update(sql, actorId, usuarioId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean seguir(Long actorId, Long usuarioId) {
        String sql = "INSERT INTO SeguimientosActores (actor_id, usuario_id) VALUES (?, ?)";
        try {
            jdbcTemplate.update(sql, actorId, usuarioId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
