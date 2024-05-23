package com.tfg2024.filmagram.Entidad;

public class ComentarioNuevoRequest {
	
	private Long usuarioId;
    private Long peliculaId;
    private String comentario;
    
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
	public String getComentario() {
		return comentario;
	}
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
    
    

}
