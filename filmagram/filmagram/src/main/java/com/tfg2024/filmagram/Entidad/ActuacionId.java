package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class ActuacionId {
	
	@ManyToOne
    @JoinColumn(name = "actor_id", referencedColumnName = "id")
    private Actor actorId;
    
    @ManyToOne
    @JoinColumn(name = "pelicula_id", referencedColumnName = "id")
    private Pelicula peliculaId;

	public Actor getActorId() {
		return actorId;
	}

	public void setActorId(Actor actorId) {
		this.actorId = actorId;
	}

	public Pelicula getPeliculaId() {
		return peliculaId;
	}

	public void setPeliculaId(Pelicula peliculaId) {
		this.peliculaId = peliculaId;
	}
    
    

}
