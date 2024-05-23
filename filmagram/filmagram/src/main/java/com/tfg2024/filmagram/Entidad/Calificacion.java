package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Calificaciones")
public class Calificacion {
	
	@EmbeddedId
    private CalificacionId id;

    private Integer calificacion;

	public CalificacionId getId() {
		return id;
	}

	public void setId(CalificacionId id) {
		this.id = id;
	}

	public Integer getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(Integer calificacion) {
		this.calificacion = calificacion;
	}
    
    
}
