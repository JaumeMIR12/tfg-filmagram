package com.tfg2024.filmagram.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Actor;
import com.tfg2024.filmagram.Entidad.Pelicula;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {
    // Puedes agregar métodos personalizados de consulta aquí si es necesario
	
	@Query(value = "SELECT COUNT(DISTINCT usuario_id) AS num_usuarios\r\n"
			+ "FROM SeguimientosActores\r\n"
			+ "WHERE actor_id = :actorId\r\n"
			+ "", nativeQuery = true)
	Integer findSeguidoresActor(@Param("actorId") Long id);
	
	@Query( value = "SELECT EXISTS (\r\n"
			+ "    SELECT 1\r\n"
			+ "    FROM SeguimientosActores\r\n"
			+ "    WHERE usuario_id = :usuarioId AND actor_id = :actorId\r\n"
			+ ") AS sigue_usuario;", nativeQuery = true)
	Integer findVerificarSeguimiento(@Param("usuarioId") Long userId, @Param("actorId") Long actorId);

	//@Query( value = "DELETE FROM SeguimientosActores s WHERE s.actor_id = :actorId AND s.usuario_id = :usuarioId", nativeQuery = true)
	//Boolean deleteByActorAndUsuario(@Param("usuarioId") Long userId, @Param("actorId") Long actorId);
	
	

}
