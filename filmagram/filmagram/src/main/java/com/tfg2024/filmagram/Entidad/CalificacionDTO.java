package com.tfg2024.filmagram.Entidad;

public class CalificacionDTO {
	
	private Long usuarioId;
    private Long peliculaId;
    private int calificacion;
    
    
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
	public int getCalificacion() {
		return calificacion;
	}
	public void setCalificacion(int calificacion) {
		this.calificacion = calificacion;
	}
    
    

}
