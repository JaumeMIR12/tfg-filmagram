package com.tfg2024.filmagram.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    // Aquí puedes agregar métodos personalizados para consultas específicas si es necesario
	
	@Query(value = "SELECT *\r\n"
			+ "FROM (\r\n"
			+ "    SELECT *, \r\n"
			+ "           ROW_NUMBER() OVER (PARTITION BY pelicula_id ORDER BY fecha_comentario DESC) AS rn\r\n"
			+ "    FROM Comentarios\r\n"
			+ ") AS ranked_comments\r\n"
			+ "WHERE rn <= 6;", nativeQuery = true)
	    List<Comentario> findPeliculasUltimosComentarios();
	
	
}
