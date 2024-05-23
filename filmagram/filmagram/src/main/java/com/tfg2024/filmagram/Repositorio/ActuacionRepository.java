package com.tfg2024.filmagram.Repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Actuacion;
import com.tfg2024.filmagram.Entidad.Pelicula;

@Repository
public interface ActuacionRepository extends JpaRepository<Actuacion, Long> {
	
	@Query(value = "select *\r\n"
			+ "from Actuaciones\r\n"
			+ "where Actuaciones.pelicula_id = :peliculaId", nativeQuery = true)
	Optional<List<Actuacion>> findActuacionesPeliculasPorId(
			@Param("peliculaId") Long peliculaId);
	
	@Query(value = "select * "
			+ "from Actuaciones "
			+ "where Actuaciones.actor_id = :actorId", nativeQuery = true)
	List<Actuacion> findActuacionesPorActor(
			@Param("actorId") Long actorId);

}
