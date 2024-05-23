package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class CalificacionId {
	
	@Column(name = "usuario_id")
    private Long usuarioId;

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

	@Column(name = "pelicula_id")
    private Long peliculaId;

}
