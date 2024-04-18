package com.tfg2024.filmagram.Entidad;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Peliculas")
public class Pelicula {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column
    private String titulo;

	@Column
    private String sinopsis;

	@Column
    private String genero;

	@Column
    private Integer estreno;
	
	@Column
    private String portada;
	
	public String getPortada() {
		return portada;
	}

	public void setPortada(String portada) {
		this.portada = portada;
	}

	@ManyToOne
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    private Director director;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getSinopsis() {
		return sinopsis;
	}

	public void setSinopsis(String sinopsis) {
		this.sinopsis = sinopsis;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public Integer getEstreno() {
		return estreno;
	}

	public void setEstreno(Integer estreno) {
		this.estreno = estreno;
	}

	public Director getDirector() {
		return director;
	}

	public void setDirector(Director director) {
		this.director = director;
	}
	
	

}
