package com.tfg2024.filmagram.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Director;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {

}
