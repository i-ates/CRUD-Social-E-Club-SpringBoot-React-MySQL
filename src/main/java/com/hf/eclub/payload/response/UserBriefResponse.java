package com.hf.eclub.payload.response;

public class UserBriefResponse {
    private Long userId;
    private String Username;

    public UserBriefResponse(Long userId, String username) {
        this.userId = userId;
        Username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }
}
