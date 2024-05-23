package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


public class PeliculaRequest {
	
	private Long usuarioId;
    private Long peliculaId;
    
    
	public Long getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}
	public Long getPeliculaId() {
		return peliculaId;
	}
	public void setPeliculaId(Long peliculaId) {
		this.peliculaId = peliculaId;
	}
    
    

}
