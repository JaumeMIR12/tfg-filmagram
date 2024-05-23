package com.tfg2024.filmagram.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Puedes agregar métodos personalizados de consulta aquí si es necesario
	
	boolean existsByEmail(String email);

	Usuario findByEmail(String username);
	
	@Query(value = "SELECT \r\n"
			+ "    u.id AS usuario_id,\r\n"
			+ "    u.nombre AS nombre_usuario,\r\n"
			+ "    u.email AS email_usuario,\r\n"
			+ "    i.nombre AS nombre_insignia,\r\n"
			+ "    i.puntuacion_minima AS puntuacion_minima_insignia,\r\n"
			+ "    i.icono_url AS icono_url_insignia,\r\n"
			+ "    COUNT(DISTINCT pv.pelicula_id) AS num_peliculas_vistas,\r\n"
			+ "    COUNT(DISTINCT pf.pelicula_id) AS num_peliculas_favoritas,\r\n"
			+ "    COUNT(DISTINCT ppv.pelicula_id) AS num_peliculas_por_ver,\r\n"
			+ "    (COUNT(DISTINCT sa.actor_id) + COUNT(DISTINCT sd.director_id)) AS num_actores_directores_seguidos\r\n"
			+ "FROM \r\n"
			+ "    Usuarios u\r\n"
			+ "LEFT JOIN \r\n"
			+ "    PeliculasVistas pv ON u.id = pv.usuario_id\r\n"
			+ "LEFT JOIN \r\n"
			+ "    PeliculasFavoritas pf ON u.id = pf.usuario_id\r\n"
			+ "LEFT JOIN \r\n"
			+ "    PeliculasPorVer ppv ON u.id = ppv.usuario_id\r\n"
			+ "LEFT JOIN \r\n"
			+ "    SeguimientosActores sa ON u.id = sa.usuario_id\r\n"
			+ "LEFT JOIN \r\n"
			+ "    SeguimientoDirectores sd ON u.id = sd.usuario_id\r\n"
			+ "LEFT JOIN \r\n"
			+ "    Insignias i ON u.insignia_id = i.id\r\n"
			+ "WHERE \r\n"
			+ "    u.id = :usuarioId\r\n"
			+ "", nativeQuery = true)
	Object findUsuarioInfo(@Param("usuarioId") Long usuarioId);
	
	
	
	
	@Query("SELECT u.id, u.nombre, 'Usuario' AS tipo FROM Usuario u WHERE u.nombre LIKE %:cadena% " +
	           "UNION " +
	           "SELECT d.id, d.nombre, 'Director' AS tipo FROM Director d WHERE d.nombre LIKE %:cadena% " +
	           "UNION " +
	           "SELECT a.id, a.nombre, 'Actor' AS tipo FROM Actor a WHERE a.nombre LIKE %:cadena% " +
	           "UNION " +
	           "SELECT p.id, p.titulo AS nombre, 'Pelicula' AS tipo FROM Pelicula p WHERE p.titulo LIKE %:cadena%")
	    List<Object[]> buscarPorNombre(String cadena);
	    
	    @Query(value = "SELECT a.id, a.nombre, 'Actor' AS tipo\r\n"
	    		+ "FROM Actores a\r\n"
	    		+ "JOIN SeguimientosActores sa ON a.id = sa.actor_id\r\n"
	    		+ "WHERE sa.usuario_id = :usuarioId\r\n"
	    		+ "\r\n"
	    		+ "UNION\r\n"
	    		+ "\r\n"
	    		+ "SELECT d.id, d.nombre, 'Director' AS tipo\r\n"
	    		+ "FROM Directores d\r\n"
	    		+ "JOIN SeguimientoDirectores sd ON d.id = sd.director_id\r\n"
	    		+ "WHERE sd.usuario_id = :usuarioId", nativeQuery = true)
		    List<Object[]> buscarSeguidos(Long usuarioId);
}
