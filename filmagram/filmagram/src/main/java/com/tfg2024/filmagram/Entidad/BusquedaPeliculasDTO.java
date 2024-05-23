package com.tfg2024.filmagram.Entidad;

public class BusquedaPeliculasDTO {
	
	private String titulo;
    private Integer estreno;
    private String genero;
    private String calificacion;

    // Getters y setters (pueden ser generados automáticamente)
    
    public String getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(String calificacion) {
		this.calificacion = calificacion;
	}

	public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getEstreno() {
        return estreno;
    }

    public void setEstreno(Integer estreno) {
        this.estreno = estreno;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

}
