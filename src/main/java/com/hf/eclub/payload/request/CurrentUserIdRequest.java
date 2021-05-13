package com.hf.eclub.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

// Request form for getting user id only from frontend

@Getter
@Setter
public class CurrentUserIdRequest {

    @NotBlank
    private Long userId;

}
