package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Actuaciones")
public class Actuacion {
	
	@EmbeddedId
    private ActuacionId id;

    public ActuacionId getId() {
        return id;
    }

    public void setId(ActuacionId id) {
        this.id = id;
    }

}
