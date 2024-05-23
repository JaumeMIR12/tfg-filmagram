package com.tfg2024.filmagram.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.tfg2024.filmagram.Entidad.Insignia;
import com.tfg2024.filmagram.Entidad.Usuario;
import com.tfg2024.filmagram.Repositorio.InsigniaRepository;
import com.tfg2024.filmagram.Repositorio.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
    private UsuarioRepository usuarioRepository;
	
	@Autowired
	private InsigniaRepository insigniaRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public Object getUsuarioInfo(Long usuarioId) {
    	return usuarioRepository.findUsuarioInfo(usuarioId);
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }
    
    public boolean existeUsuarioPorEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
    
    public void guardarUsuario(Usuario usuario) {
    	
    	Insignia insignia = insigniaRepository.findById(8L).orElseThrow(() -> new RuntimeException("Insignia no encontrada"));
        usuario.setInsignia(insignia);
        
        usuarioRepository.save(usuario);
        
        String sqlPartida = "INSERT INTO Partidas (usuario_id, juego_id) VALUES (?, ?);";
		jdbcTemplate.update(sqlPartida, usuario.getId(), 1);
    }
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Usuario authenticateUser(String username, String password) {
        // Buscar al usuario por su correo electrónico en la base de datos
        Usuario user = usuarioRepository.findByEmail(username);

        // Verificar si se encontró un usuario con el correo electrónico proporcionado
        if (user != null) {
            // Verificar si la contraseña coincide
        	if (password.equals(user.getContraseña())) {
                return user; // Las credenciales son válidas
            }
        }
        return null; // Las credenciales son inválidas
    }
    
    public List<Object[]> resultadoBuscador(String cadena) {
        return usuarioRepository.buscarPorNombre(cadena);
    }
    
    public List<Object[]> resultadoSeguidos(Long usuarioId) {
        return usuarioRepository.buscarSeguidos(usuarioId);
    }
    
    
    public Usuario actualizarUsuario(Usuario usuario) {
        String sql = "UPDATE usuarios SET nombre = ?, email = ?, contraseña = ? WHERE id = ?";
        jdbcTemplate.update(sql, usuario.getNombre(), usuario.getEmail(), usuario.getContraseña(), usuario.getId());
        return usuario; // Retorna el usuario actualizado
    }

}
