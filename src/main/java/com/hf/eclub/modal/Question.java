package com.hf.eclub.modal;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "question")

public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name="question")

    private String ques;

    @Column(name="clubname")

    private String clubName;

}