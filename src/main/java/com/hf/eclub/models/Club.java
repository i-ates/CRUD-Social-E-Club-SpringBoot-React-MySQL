package com.hf.eclub.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "club")

public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name="clubname")

    private String clubName;

    @Column(name="parentname")

    private String parentName;

    public Club() {
    }

    public Club(String clubName, String parentName) {
        this.clubName = clubName;
        this.parentName = parentName;
    }
}
