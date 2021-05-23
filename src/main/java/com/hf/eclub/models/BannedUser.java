package com.hf.eclub.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "banned_user")
public class BannedUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="userId")
    private Long userId;

    @Column(name="username")
    private String userName;

    @Column (name="clubId")
    private  Long clubId;

    @Column(name="clubname")
    private String clubName;

    @Column(name = "date")
    private Date date;

    @Column (name="how_many_times")
    private  int howManyTimes;

    public BannedUser() {
    }

    public BannedUser(Long userId, String userName, Long clubId, String clubName, Date date, int howManyTimes) {
        this.userId = userId;
        this.userName = userName;
        this.clubId = clubId;
        this.clubName = clubName;
        this.date = date;
        this.howManyTimes = howManyTimes;
    }
}
