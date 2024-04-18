package com.tfg2024.filmagram.Controlador;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg2024.filmagram.Entidad.Usuario;
import com.tfg2024.filmagram.Servicio.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
	
	@Autowired
    private UsuarioService usuarioService;
	
	@GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public String getUsuarioById(@PathVariable Long id, Model model) {
        Optional<Usuario> usuarioOptional = usuarioService.getUsuarioById(id);
        System.out.println(usuarioOptional);
        usuarioOptional.ifPresent(usuario -> model.addAttribute("usuario", usuario));
        return "usuario";
    }

}
