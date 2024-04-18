package com.tfg2024.filmagram.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.Pelicula;

public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
	
	@Query(value = "SELECT \r\n"
			+ "    p.*\r\n"
			+ "FROM \r\n"
			+ "    Peliculas p\r\n"
			+ "JOIN \r\n"
			+ "    (SELECT \r\n"
			+ "         pelicula_id,\r\n"
			+ "         COUNT(id) AS cantidad_comentarios\r\n"
			+ "     FROM \r\n"
			+ "         Comentarios\r\n"
			+ "     WHERE \r\n"
			+ "         fecha_comentario >= NOW() - INTERVAL 7 DAY\r\n"
			+ "     GROUP BY \r\n"
			+ "         pelicula_id\r\n"
			+ "     ORDER BY \r\n"
			+ "         cantidad_comentarios DESC\r\n"
			+ "     LIMIT 6) AS top_peliculas\r\n"
			+ "ON \r\n"
			+ "    p.id = top_peliculas.pelicula_id;\r\n"
			+ "", nativeQuery = true)
	List<Pelicula> findPeliculasMasComentarios();
	
	@Query(value = "SELECT *\r\n"
			+ "FROM Peliculas\r\n"
			+ "ORDER BY estreno DESC\r\n"
			+ "LIMIT 6;", nativeQuery = true)
	List<Pelicula> findPeliculasRecientes();
}
