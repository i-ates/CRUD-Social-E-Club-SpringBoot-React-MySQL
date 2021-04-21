package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class SetUserInfoRequest {
    @NotBlank
    long id;

    @NotBlank
    String area;

    @NotBlank
    String type;

    public SetUserInfoRequest(long id, String area, String type) {
        this.id = id;
        this.area = area;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String fullname) {
        this.area = fullname;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

