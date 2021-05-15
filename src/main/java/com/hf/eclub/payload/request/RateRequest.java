package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class RateRequest {
    @NotBlank
    private Long userId;
    @NotBlank
    private String userName;
    @NotBlank
    private Long clubId;
    @NotBlank
    private String comment;
    @NotBlank
    private double rate;

    public RateRequest() {
    }

    public RateRequest(@NotBlank Long userId,@NotBlank String userName, @NotBlank Long clubId, @NotBlank String comment, @NotBlank double rate) {
        this.userId = userId;
        this.userName = userName;
        this.clubId = clubId;
        this.comment = comment;
        this.rate = rate;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getClubId() {
        return clubId;
    }

    public void setClubId(long clubId) {
        this.clubId = clubId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }
}
