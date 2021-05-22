package com.hf.eclub.models;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "subclub_admin_canditates")
public class SubClubAdminCandidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "user_id")
    private Long userId;

    @Column (name = "subclub_id")
    private Long subClubId;

    public SubClubAdminCandidate(Long userId, Long subClubId) {
        this.userId = userId;
        this.subClubId = subClubId;
    }

    public SubClubAdminCandidate(){}

}
