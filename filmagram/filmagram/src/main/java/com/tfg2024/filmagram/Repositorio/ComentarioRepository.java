package com.tfg2024.filmagram.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    // Aquí puedes agregar métodos personalizados para consultas específicas si es necesario
	
	@Query(value = "SELECT *\r\n"
			+ "FROM Comentarios\r\n"
			+ "ORDER BY fecha_comentario DESC\r\n"
			+ "LIMIT 6;", nativeQuery = true)
	    List<Comentario> findPeliculasUltimosComentarios();
	
	@Query(value = "SELECT *\r\n"
			+ "FROM Comentarios\r\n"
			+ "WHERE pelicula_id = :peliculaId LIMIT 2", nativeQuery = true)
	List<Comentario> findComentariosPelicula(@Param("peliculaId") Long id);
	
	@Query(value = "SELECT *\r\n"
			+ "FROM Comentarios\r\n"
			+ "WHERE pelicula_id = :peliculaId", nativeQuery = true)
	List<Comentario> findTodosComentariosPelicula(@Param("peliculaId") Long id);
	
}
