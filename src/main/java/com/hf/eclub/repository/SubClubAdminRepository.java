package com.hf.eclub.repository;

import com.hf.eclub.models.SubClubAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubClubAdminRepository extends JpaRepository<SubClubAdmin, Long> {


    @Query("SELECT * FROM SubClubAdmin as sca WHERE sca.userId =: userId AND sca.subClubId =: subClubId")
    List<SubClubAdmin> findUserSubClubAdminByIdAndClubId(@Param("userId") long userId, @Param("subClubId") long subClubId);
     //SELECT COUNT(*) FROM `sub_club_admin` WHERE `sub_club_admin`.`user_id` = 5 AND `sub_club_admin`.`subclub_id` = 1


}
