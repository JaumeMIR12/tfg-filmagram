package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Director;
import com.tfg2024.filmagram.Repositorio.DirectorRepository;

@Service
public class DirectorService {

    @Autowired
    private DirectorRepository directorRepository;

    public List<Director> getAllDirectores() {
        return directorRepository.findAll();
    }

    public Optional<Director> getDirectorById(Long id) {
        return directorRepository.findById(id);
    }

    // Puedes agregar más métodos de servicio según sea necesario
}
