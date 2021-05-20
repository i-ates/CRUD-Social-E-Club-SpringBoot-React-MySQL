package com.hf.eclub.models;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "question")

public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name = "survey_id")
    private Long surveyId;

    @Column(name="question")

    private String ques;

    @Column(name="clubname")

    private String clubName;

    @Column(name="parentname")

    private String parentName;

    @Column (name="answer")
    private  String  answer;

    @Column (name="clubId")
    private  Long clubId;

    public Question() {
    }

    public Question(String ques, String answer, String clubName, String parentName) {
        this.ques = ques;
        this.clubName = clubName;
        this.answer = answer;
        this.parentName = parentName;
    }
}