package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Director;
import com.tfg2024.filmagram.Repositorio.DirectorRepository;

@Service
public class DirectorService {

    @Autowired
    private DirectorRepository directorRepository;

    public List<Director> getAllDirectores() {
        return directorRepository.findAll();
    }

    public Optional<Director> getDirectorById(Long id) {
        return directorRepository.findById(id);
    }
    
    public Integer getSeguidoresDirector(Long id) {
    	return directorRepository.findSeguidoresDirector(id);
    }
    
    public Integer getVerificarSeguimiento(Long userId, Long directorId) {
    	return directorRepository.findVerificarSeguimiento(userId, directorId);
    }
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public boolean dejarDeSeguir(Long directorId, Long usuarioId) {
        String sql = "DELETE FROM seguimientodirectores WHERE director_id = ? AND usuario_id = ?";
        try {
            jdbcTemplate.update(sql, directorId, usuarioId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean seguir(Long directorId, Long usuarioId) {
        String sql = "INSERT INTO seguimientodirectores (director_id, usuario_id) VALUES (?, ?)";
        try {
            jdbcTemplate.update(sql, directorId, usuarioId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
