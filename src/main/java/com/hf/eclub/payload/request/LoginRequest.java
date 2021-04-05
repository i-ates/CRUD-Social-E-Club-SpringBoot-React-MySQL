package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
	@NotBlank
	private String username;

	@NotBlank
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

	public LoginRequest(@NotBlank String username, @NotBlank String password) {
		this.username = username;
		this.password = password;
	}
}
