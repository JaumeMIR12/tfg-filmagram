package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Actor;
import com.tfg2024.filmagram.Repositorio.ActorRepository;

@Service
public class ActorService {
	
	@Autowired
    private ActorRepository actorRepository;

    public List<Actor> getAllActores() {
        return actorRepository.findAll();
    }

    public Optional<Actor> getActorById(Long id) {
        return actorRepository.findById(id);
    }

}
