package com.hf.eclub.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;


@Data
@Entity
@Table(name = "replies")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "title")
    private String title;

    @Column(name = "parent_club_id")
    private Long parentMessageId;

    @Column(name = "date")
    private Date date;

    @NotBlank
    @Size(max = 1000)
    @Column(name = "content")
    private String content;

    @Column(name = "user_id")
    private Long userId;


    public Reply(String title, Long parentMessageId, String content, Long userId) {
        this.title = title;
        this.date = new Date();
        this.parentMessageId = parentMessageId;
        this.content = content;
        this.userId = userId;
    }

}
