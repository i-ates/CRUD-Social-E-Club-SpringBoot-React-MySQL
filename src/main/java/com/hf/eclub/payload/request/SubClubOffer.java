package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class SubClubOffer {
    @NotBlank
    private Long userId;
    @NotBlank
    private String userName;
    @NotBlank
    private String offer;

    public SubClubOffer() {
    }

    public SubClubOffer(@NotBlank Long userId, @NotBlank String userName, @NotBlank String offer) {
        this.userId = userId;
        this.userName = userName;
        this.offer = offer;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getOffer() {
        return offer;
    }

    public void setOffer(String offer) {
        this.offer = offer;
    }

}
