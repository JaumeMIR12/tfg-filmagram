package com.tfg2024.filmagram.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tfg2024.filmagram.Entidad.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Puedes agregar métodos personalizados de consulta aquí si es necesario
}
