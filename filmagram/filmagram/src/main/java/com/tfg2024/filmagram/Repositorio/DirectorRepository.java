package com.tfg2024.filmagram.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Director;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {
	
	@Query(value = "SELECT COUNT(DISTINCT usuario_id) AS num_usuarios\r\n"
			+ "FROM seguimientodirectores\r\n"
			+ "WHERE director_id = :directorId\r\n"
			+ "", nativeQuery = true)
	Integer findSeguidoresDirector(@Param("directorId") Long id);
	
	@Query( value = "SELECT EXISTS (\r\n"
			+ "    SELECT 1\r\n"
			+ "    FROM seguimientodirectores\r\n"
			+ "    WHERE usuario_id = :usuarioId AND director_id = :directorId\r\n"
			+ ") AS sigue_usuario;", nativeQuery = true)
	Integer findVerificarSeguimiento(@Param("usuarioId") Long userId, @Param("directorId") Long directorId);

}
