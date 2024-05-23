package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Juegos")
public class Juego {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	@Column
    private String nombre;

	@Column
    private String descripcion;

	@Column
    private String imagenUrl;

	@Column
    private Integer nivelDificultad;

	@Column
    private String respuesta;

	@Column
    private Integer puntuacionCorrecto;

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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getImagenUrl() {
		return imagenUrl;
	}

	public void setImagenUrl(String imagenUrl) {
		this.imagenUrl = imagenUrl;
	}

	public Integer getNivelDificultad() {
		return nivelDificultad;
	}

	public void setNivelDificultad(Integer nivelDificultad) {
		this.nivelDificultad = nivelDificultad;
	}

	public String getRespuesta() {
		return respuesta;
	}

	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}

	public Integer getPuntuacionCorrecto() {
		return puntuacionCorrecto;
	}

	public void setPuntuacionCorrecto(Integer puntuacionCorrecto) {
		this.puntuacionCorrecto = puntuacionCorrecto;
	}
	

}
