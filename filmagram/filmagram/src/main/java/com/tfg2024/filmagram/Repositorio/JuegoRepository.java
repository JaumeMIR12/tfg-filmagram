package com.tfg2024.filmagram.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Juego;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long>  {
	
	@Query(value = "select j.* from Partidas p join Juegos j on j.id = p.juego_id "
			+ "where p.usuario_id = :usuarioId", nativeQuery = true)
	Juego findPartidaDeUsuario(@Param("usuarioId") Long id);

}
