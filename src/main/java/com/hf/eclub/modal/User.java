package com.hf.eclub.modal;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "user")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;


    @Column(name="username",unique = true)
    @NotNull
    private String username;

    @Column(name="password")
    @NotNull
    private String password;

    @Column(name="city")
    private String city;

    @Column(name="bio")
    private String bio;


    @Column(name="email",unique = true)
    @NotNull
    private String email;

}
