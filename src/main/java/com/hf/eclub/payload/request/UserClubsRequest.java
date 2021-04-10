package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class UserClubsRequest {
    @NotBlank
    private Long userId;

    @NotBlank
    private Long clubId;

    public UserClubsRequest(@NotBlank Long userId, @NotBlank Long clubId) {
        this.userId = userId;
        this.clubId = clubId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }
}
