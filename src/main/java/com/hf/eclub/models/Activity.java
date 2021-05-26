package com.hf.eclub.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name="clubname")
    private String clubName;

    @Column (name="clubId")
    private  Long clubId;

    @Column(name = "last_activity")
    private Date lastActivity;

    public Activity() {
    }

    public Activity(String clubName, Long clubId, Date lastActivity) {
        this.clubName = clubName;
        this.clubId = clubId;
        this.lastActivity = lastActivity;
    }
}
