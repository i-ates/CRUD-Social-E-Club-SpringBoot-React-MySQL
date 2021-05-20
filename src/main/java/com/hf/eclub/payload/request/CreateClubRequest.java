package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class CreateClubRequest {
    @NotBlank
    private String clubName;

    @NotBlank
    private String parentName;

    public CreateClubRequest() {
    }

    public CreateClubRequest(@NotBlank String clubName, @NotBlank String parentName) {
        this.clubName = clubName;
        this.parentName = parentName;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
}
