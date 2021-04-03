package com.hf.eclub.modal;

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

    @Column(name="activeuser")

    private int activeUser;

    @Column(name="registereduser")

    private int registeredUser;
}
