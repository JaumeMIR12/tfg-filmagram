package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Actuacion;
import com.tfg2024.filmagram.Repositorio.ActuacionRepository;

@Service
public class ActuacionService {
	
	@Autowired
    private ActuacionRepository actuacionRepository;
	
	public Optional<List<Actuacion>> getActuacionesPeliculasPorId(Long id) {
		// TODO Auto-generated method stub
		return actuacionRepository.findActuacionesPeliculasPorId(id);
	}
	
	public List<Actuacion> getActuacionesPorActor(Long actorId) {
		return actuacionRepository.findActuacionesPorActor(actorId);
		
	}

}
