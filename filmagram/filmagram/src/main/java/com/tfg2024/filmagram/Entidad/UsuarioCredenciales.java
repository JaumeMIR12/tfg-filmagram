package com.tfg2024.filmagram.Entidad;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UsuarioCredenciales {
	
	@NotBlank(message = "El nombre de usuario es obligatorio")
    @Email(message = "Debe ser un correo electrónico válido")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    @Pattern(regexp = "^(?=.*\\d).{6,}$", message = "La contraseña debe tener al menos 6 caracteres y al menos un número")
    private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    

}
