package com.hf.eclub.models;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "subclub_request")

public class SubClubRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="userId")
    private Long userId;

    @Column(name="username")
    private String userName;

    @Column(name="offer")
    private String offer;

    public SubClubRequest() {
    }

    public SubClubRequest(Long userId, String userName, String offer) {
        this.userId = userId;
        this.userName = userName;
        this.offer = offer;
    }
}
