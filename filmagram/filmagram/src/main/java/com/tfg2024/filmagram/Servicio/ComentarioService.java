package com.tfg2024.filmagram.Servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Repositorio.ComentarioRepository;

@Service
public class ComentarioService {
	
	@Autowired
    private ComentarioRepository comentarioRepository;
	
	public List<Comentario> getPeliculasUltimosComentarios() {
        return comentarioRepository.findPeliculasUltimosComentarios();
    }
}
