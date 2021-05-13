package com.hf.eclub.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "title")
    private String title;

    @Column(name = "date")
    private Date date;

    @Column(name = "parent_club_id")
    private Long clubId;

    @NotBlank
    @Size(max = 1000)
    @Column(name = "content")
    private String content;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "is_private")
    private Boolean isPrivate;

    public Message (){

    }

    public Message(String title, Long clubId, String content, Long userId, Boolean isPrivate) {
        this.title = title;
        this.clubId = clubId;
        this.content = content;
        this.userId = userId;
        this.isPrivate = isPrivate;
        this.date = new Date();
    }

}
