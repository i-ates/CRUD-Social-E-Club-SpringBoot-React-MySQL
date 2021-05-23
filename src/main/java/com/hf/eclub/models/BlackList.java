package com.hf.eclub.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "black_list")
public class BlackList {
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

    public BlackList() {
    }

    public BlackList(Long userId, String userName, Long clubId, String clubName) {
        this.userId = userId;
        this.userName = userName;
        this.clubId = clubId;
        this.clubName = clubName;
    }
}
