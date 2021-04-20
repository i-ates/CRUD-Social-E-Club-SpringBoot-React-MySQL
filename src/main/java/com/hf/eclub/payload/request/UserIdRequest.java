package com.hf.eclub.payload.request;



import javax.validation.constraints.NotBlank;

public class UserIdRequest {
    @NotBlank
    long id;


    public UserIdRequest() {
    };

    public UserIdRequest(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
