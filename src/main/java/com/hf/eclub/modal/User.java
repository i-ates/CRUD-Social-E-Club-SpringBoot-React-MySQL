package com.hf.eclub.modal;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user", uniqueConstraints ={
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
//bla bla
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;
    @Column(name="city")
    private String city;
    @Column(name="bio")
    private String bio;
    @Column(name="email")
    private String email;

}
