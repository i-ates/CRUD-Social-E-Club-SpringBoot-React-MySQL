package com.hf.eclub.payload.response;

public class CandidateResponse {
    private Long userId;
    private String userName;
    private Long clubId;
    private String clubName;

    public CandidateResponse(Long userId, String userName, Long clubId, String clubName) {
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
