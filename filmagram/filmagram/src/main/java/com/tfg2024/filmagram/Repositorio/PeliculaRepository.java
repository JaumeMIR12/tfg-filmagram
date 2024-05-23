package com.tfg2024.filmagram.Repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tfg2024.filmagram.Entidad.Calificacion;
import com.tfg2024.filmagram.Entidad.CalificacionId;
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
			+ "         fecha_comentario >= NOW() - INTERVAL 30 DAY\r\n"
			+ "     GROUP BY \r\n"
			+ "         pelicula_id\r\n"
			+ "     ORDER BY \r\n"
			+ "         cantidad_comentarios DESC\r\n"
			+ "     LIMIT 6) AS top_peliculas\r\n"
			+ "ON \r\n"
			+ "    p.id = top_peliculas.pelicula_id;\r\n"
			+ "", nativeQuery = true)
	List<Pelicula> findPeliculasMasComentarios();
	
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
			+ "         fecha_comentario >= NOW() - INTERVAL 30 DAY\r\n"
			+ "     GROUP BY \r\n"
			+ "         pelicula_id\r\n"
			+ "     ORDER BY \r\n"
			+ "         cantidad_comentarios DESC) AS top_peliculas\r\n"
			+ "ON \r\n"
			+ "    p.id = top_peliculas.pelicula_id;\r\n"
			+ "", nativeQuery = true)
	List<Pelicula> findPeliculasMasPopularesFilmagram();
	
	@Query(value = "SELECT *\r\n"
			+ "FROM Peliculas\r\n"
			+ "ORDER BY estreno DESC\r\n"
			+ "LIMIT 6;", nativeQuery = true)
	List<Pelicula> findPeliculasRecientes();
	
	@Query(value =  "SELECT p.*, AVG(c.calificacion) AS media_calificaciones, COUNT(DISTINCT c.usuario_id) AS usuarios_diferentes, d.nombre, d.pais FROM Peliculas p " +
	           "LEFT JOIN Calificaciones c ON p.id = c.pelicula_id "
	           + "LEFT JOIN Directores d ON d.id = p.director_id " +
	           "WHERE (:titulo IS NULL OR p.titulo LIKE CONCAT('%', :titulo, '%')) " +
	           "AND (:estreno IS NULL OR p.estreno = :estreno) " +
	           "AND (:genero IS NULL OR p.genero = :genero)"
	           + "GROUP BY p.id, p.titulo, p.estreno, p.genero " +
	           "ORDER BY CASE\r\n"
	           + "    WHEN :calificacion = 'high' THEN -COALESCE(media_calificaciones, -1) \r\n"
	           + "    WHEN :calificacion = 'low' THEN COALESCE(media_calificaciones, 101)  \r\n"
	           + "    ELSE NULL  \r\n"
	           + "  END ASC,\r\n"
	           + "  p.titulo ASC;", nativeQuery = true)
	    List<Object> findByFiltros(@Param("titulo") String titulo,
	                                 @Param("estreno") Integer estreno,
	                                 @Param("genero") String genero,
	                                 @Param("calificacion") String calificacion);
	
	@Query(value = "SELECT p.*, COALESCE(c.calificacion, 0) AS calificacion\r\n"
			+ "FROM Peliculas p\r\n"
			+ "LEFT JOIN Calificaciones c ON p.id = c.pelicula_id\r\n"
			+ "WHERE p.director_id = :directorId\r\n"
			+ "ORDER BY COALESCE(c.calificacion, 0) DESC;\r\n"
			+ "", nativeQuery = true)
	List<Pelicula> findPeliculasPorDirector(@Param("directorId") Long id);
	
	@Query(value = "SELECT \r\n"
			+ "    P.portada AS Portada,\r\n"
			+ "    COUNT(DISTINCT PV.usuario_id) AS Usuarios_Vistos,\r\n"
			+ "    COUNT(DISTINCT PF.usuario_id) AS Usuarios_Favoritos\r\n"
			+ "FROM \r\n"
			+ "    Peliculas AS P\r\n"
			+ "LEFT JOIN \r\n"
			+ "    PeliculasVistas AS PV ON P.id = PV.pelicula_id\r\n"
			+ "LEFT JOIN \r\n"
			+ "    PeliculasFavoritas AS PF ON P.id = PF.pelicula_id\r\n"
			+ "WHERE \r\n"
			+ "    P.id = :peliculaId\r\n"
			+ "", nativeQuery = true)
	Optional<List<Object>> findPortadaConMasDatos(@Param("peliculaId") Long id);
	
	@Query(value = "SELECT p.id,\r\n"
			+ "       COALESCE(AVG(c.calificacion), 0) AS media_calificaciones,\r\n"
			+ "       COUNT(c.usuario_id) AS cantidad_calificaciones\r\n"
			+ "FROM Peliculas p\r\n"
			+ "LEFT JOIN Calificaciones c ON p.id = c.pelicula_id\r\n"
			+ "WHERE p.id = :peliculaId\r\n"
			+ "GROUP BY p.id", nativeQuery = true)
	Optional<Object> findCalificacionyUsuariosPorPelicula(@Param("peliculaId") Long id);
	
	@Query(value = "SELECT p.*\r\n"
			+ "FROM Peliculas p\r\n"
			+ "INNER JOIN PeliculasVistas pv ON p.id = pv.pelicula_id\r\n"
			+ "WHERE pv.usuario_id = :usuarioId\r\n"
			+ "", nativeQuery = true)
	Optional<List<Pelicula>> findPeliculasVistasPorUsuario(@Param("usuarioId") Long usuarioId);
	
	@Query(value = "SELECT p.*\r\n"
			+ "FROM Peliculas p\r\n"
			+ "INNER JOIN peliculasfavoritas pv ON p.id = pv.pelicula_id\r\n"
			+ "WHERE pv.usuario_id = :usuarioId\r\n"
			+ "", nativeQuery = true)
	Optional<List<Pelicula>> findPeliculasFavoritasPorUsuario(@Param("usuarioId") Long usuarioId);
	
	@Query(value = "SELECT p.*\r\n"
			+ "FROM Peliculas p\r\n"
			+ "INNER JOIN peliculasporver pv ON p.id = pv.pelicula_id\r\n"
			+ "WHERE pv.usuario_id = :usuarioId\r\n"
			+ "", nativeQuery = true)
	Optional<List<Pelicula>> findPeliculasPorVerPorUsuario(@Param("usuarioId") Long usuarioId);
	
	
    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM PeliculasVistas WHERE usuario_id = :usuarioId AND pelicula_id = :peliculaId", nativeQuery = true)
    Integer existsByUsuarioIdAndPeliculaId(@Param("usuarioId") Long usuarioId, @Param("peliculaId") Long peliculaId);
    
    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM PeliculasFavoritas WHERE usuario_id = :usuarioId AND pelicula_id = :peliculaId", nativeQuery = true)
    Integer existsFavoritaByUsuarioIdAndPeliculaId(@Param("usuarioId") Long usuarioId, @Param("peliculaId") Long peliculaId);
    
    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM peliculasporver WHERE usuario_id = :usuarioId AND pelicula_id = :peliculaId", nativeQuery = true)
    Integer existsWatchlistByUsuarioIdAndPeliculaId(@Param("usuarioId") Long usuarioId, @Param("peliculaId") Long peliculaId);
    
    @Query(value = "SELECT * FROM calificaciones where usuario_id = :usuarioId and pelicula_id = :peliculaId", nativeQuery = true)
    Object calificacionDePeliculaPorUnUsuario(@Param("usuarioId") Long usuarioId, @Param("peliculaId") Long peliculaId);
}
