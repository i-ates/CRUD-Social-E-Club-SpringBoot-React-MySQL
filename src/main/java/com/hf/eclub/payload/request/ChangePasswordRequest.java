package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class ChangePasswordRequest {
    @NotBlank
    private Long id;

    @NotBlank
    private String newPassword;

    public ChangePasswordRequest(Long id, String newPassword) {
        this.id = id;
        this.newPassword = newPassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
