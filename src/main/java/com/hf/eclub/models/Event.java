/*
Object class to represents Events assigned to sub clubs
*/

package com.hf.eclub.models;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;


@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Event(String title, Long clubId, String content, Long userId) {
        this.title = title;
        this.date = new Date();
        this.clubId = clubId;
        this.content = content;
        this.userId = userId;
    }

    public Event(){

    }

}
