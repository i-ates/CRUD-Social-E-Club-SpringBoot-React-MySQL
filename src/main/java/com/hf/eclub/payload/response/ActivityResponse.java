package com.hf.eclub.payload.response;

public class ActivityResponse {
    private Long clubId;
    private String clubName;
    private String lastActivity;

    public ActivityResponse(Long clubId, String clubName, String lastActivity) {
        this.clubId = clubId;
        this.clubName = clubName;
        this.lastActivity = lastActivity;
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

    public String getLastActivity() {
        return lastActivity;
    }

    public void setLastActivity(String lastActivity) {
        this.lastActivity = lastActivity;
    }
}
