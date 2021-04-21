package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class CreateClubRequest {
    @NotBlank
    private String clubName;

    public CreateClubRequest() {
    }

    public CreateClubRequest(@NotBlank String clubName) {
        this.clubName = clubName;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
}
