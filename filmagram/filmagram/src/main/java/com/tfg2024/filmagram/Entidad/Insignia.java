package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Insignias")
public class Insignia {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column
    private Integer puntuacionMinima;

    @Column(nullable = false)
    private String iconoUrl;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getPuntuacionMinima() {
        return puntuacionMinima;
    }

    public void setPuntuacionMinima(Integer puntuacionMinima) {
        this.puntuacionMinima = puntuacionMinima;
    }

    public String getIconoUrl() {
        return iconoUrl;
    }

    public void setIconoUrl(String iconoUrl) {
        this.iconoUrl = iconoUrl;
    }

}
