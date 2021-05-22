package com.hf.eclub.repository;

import com.hf.eclub.models.SubClubAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SubClubAdminRepository extends JpaRepository<SubClubAdmin, Long> {


    @Query("SELECT sca FROM SubClubAdmin sca WHERE sca.userId= :userId and sca.subClubId= :subClubId")
    List<SubClubAdmin> findUserSubClubAdminByIdAndClubId(@Param("userId") Long userId, @Param("subClubId") Long subClubId);

    List<SubClubAdmin> findBySubClubId(Long clubId);

    @Transactional
    @Modifying
    @Query("DELETE FROM SubClubAdmin as sca WHERE sca.subClubId = :clubId")
    void deleteSubClubAdminByClubId(@Param("clubId") long clubId);

}
