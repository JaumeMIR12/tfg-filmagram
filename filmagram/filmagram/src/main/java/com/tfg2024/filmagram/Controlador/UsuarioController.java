package com.tfg2024.filmagram.Controlador;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.tfg2024.filmagram.Entidad.Insignia;
import com.tfg2024.filmagram.Entidad.Usuario;
import com.tfg2024.filmagram.Entidad.UsuarioCredenciales;
import com.tfg2024.filmagram.Entidad.UsuarioDeRegistro;
import com.tfg2024.filmagram.Servicio.UsuarioService;

@RestController
@Validated
@RequestMapping("/api/usuarios")
public class UsuarioController<PasswordEncoder> {
	
	@Autowired
    private UsuarioService usuarioService;
	
	@GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable Long id, Model model) {
        Optional<Usuario> usuarioOptional = usuarioService.getUsuarioById(id);
        System.out.println(usuarioOptional);
        usuarioOptional.ifPresent(usuario -> model.addAttribute("usuario", usuario));
        return usuarioOptional;
    }
    
    @GetMapping("info/{id}")
    public Object getUsuarioInfo(@PathVariable("id") Long usuarioid) {
    	return usuarioService.getUsuarioInfo(usuarioid);
    }
    
    @PostMapping("/actualizar")
    public ResponseEntity<Usuario> actualizarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioActualizado = usuarioService.actualizarUsuario(usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }
    
    /*@Autowired
    private PasswordEncoder passwordEncoder;*/
    
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody UsuarioDeRegistro usuarioDTO) {
        // Comprobaciones necesarias antes de registrar el usuario
    	
        if (usuarioService.existeUsuarioPorEmail(usuarioDTO.getEmail())) {
            throw new RuntimeException("El correo electrónico ya está registrado");
        }
        
        System.out.println(usuarioDTO.getContraseña());

        // Codificar la contraseña antes de guardarla en la base de datos
        /*String contraseñaCodificada = ((org.springframework.security.crypto.password.PasswordEncoder) passwordEncoder).encode(usuarioDTO.getPassword());
        usuarioDTO.setPassword(contraseñaCodificada);*/

        // Crear el usuario a partir de los datos recibidos
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setContraseña(usuarioDTO.getContraseña());

        // Guardar el usuario en la base de datos
        usuarioService.guardarUsuario(usuario);
        
        Usuario respuestaUsuarioDTO = new Usuario();
        respuestaUsuarioDTO.setNombre(usuario.getNombre());
        respuestaUsuarioDTO.setId(usuario.getId());
        respuestaUsuarioDTO.setInsignia(usuario.getInsignia());

        // Devolver la respuesta con el nombre de usuario y el ID del usuario
        return ResponseEntity.ok(respuestaUsuarioDTO);
    }
    
    @PostMapping("/login")
    public Usuario login(@Validated @RequestBody UsuarioCredenciales usuarioCred) {
        String username = usuarioCred.getUsername();
        String password = usuarioCred.getPassword();

        // Lógica para verificar el usuario y la contraseña en tu base de datos
        Usuario usuario = usuarioService.authenticateUser(username, password);

        if (usuario != null) {
            return usuario;
        } else {
            return null;
        }
    }
    
    @GetMapping("/buscador/{cadena}")
    public List<Object[]> buscar(@PathVariable("cadena") String cadena) {
        return usuarioService.resultadoBuscador(cadena);
    }

    @GetMapping("/seguidos/{usuarioId}")
    public List<Object[]> seguidosDeUsuario(@PathVariable("usuarioId") Long usuarioId) {
        return usuarioService.resultadoSeguidos(usuarioId);
    }
}
