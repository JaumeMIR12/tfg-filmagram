package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Comentario;
import com.tfg2024.filmagram.Entidad.Pelicula;
import com.tfg2024.filmagram.Repositorio.PeliculaRepository;

@Service
public class PeliculaService {
	
	@Autowired
    private PeliculaRepository peliculaRepository;

    public List<Pelicula> getAllPeliculas() {
        return peliculaRepository.findAll();
    }

	public Optional<Pelicula> getPeliculaById(Long id) {
		// TODO Auto-generated method stub
		return peliculaRepository.findById(id);
	}
	
	public List<Pelicula> getPeliculasMasComentarios(){
		return peliculaRepository.findPeliculasMasComentarios();
	}
	
	public List<Pelicula> getPeliculasRecientes(){
		return peliculaRepository.findPeliculasRecientes();
	}

}
