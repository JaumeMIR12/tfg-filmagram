package com.tfg2024.filmagram.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Calificacion;

@Repository
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {
	
	// Método para insertar una nueva calificación
    Calificacion save(Calificacion calificacion);

    @Modifying
    @Query(value = "DELETE FROM Calificaciones c WHERE c.usuario_id = :usuarioId AND c.pelicula_Id = :peliculaId", nativeQuery = true)
    void deleteByUsuarioIdAndPeliculaId(@Param("usuarioId") Long usuarioId, @Param("peliculaId") Long peliculaId);

}
