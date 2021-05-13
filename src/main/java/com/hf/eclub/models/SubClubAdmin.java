package com.hf.eclub.models;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "sub_club_admin")
public class SubClubAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "user_id")
    private Long userId;

    @Column (name = "subclub_id")
    private Long subClubId;

}
