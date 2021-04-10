package com.hf.eclub.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="user_clubs")
public class UserClubs {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name="club_id")
    private Long clubId;

    @Column(name="userId")
    private Long userId;

    public UserClubs(Long clubId, Long userId) {
        this.clubId = clubId;
        this.userId = userId;
    }
}