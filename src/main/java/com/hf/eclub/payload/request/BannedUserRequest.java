package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class BannedUserRequest {
    @NotBlank
    private Long userId;
    @NotBlank
    private String userName;
    @NotBlank
    private Long clubId;
    @NotBlank
    private String clubName;


    public BannedUserRequest() {
    }

    public BannedUserRequest(@NotBlank Long userId, @NotBlank Long clubId) {
        this.userId = userId;
        this.clubId = clubId;
    }

    public BannedUserRequest(@NotBlank Long userId, @NotBlank String userName, @NotBlank Long clubId, @NotBlank String clubName) {
        this.userId = userId;
        this.userName = userName;
        this.clubId = clubId;
        this.clubName = clubName;
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

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
}
