package com.tfg2024.filmagram.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Insignia;

@Repository
public interface InsigniaRepository extends JpaRepository<Insignia, Long> {
    // Puedes agregar consultas personalizadas si es necesario
	
	@Query(value = "SELECT * FROM Insignias WHERE puntuacion_minima > :minPuntuacion", nativeQuery = true)
    List<Insignia> findByPuntuacionMinimaGreaterThan(int minPuntuacion);
	
	@Query(value ="SELECT i.* FROM Insignias i JOIN Usuarios u ON i.id = u.insignia_id WHERE u.id = :usuarioId", nativeQuery = true)
	Insignia findInsigniaUsuario(@Param("usuarioId") Long usuarioId);
}