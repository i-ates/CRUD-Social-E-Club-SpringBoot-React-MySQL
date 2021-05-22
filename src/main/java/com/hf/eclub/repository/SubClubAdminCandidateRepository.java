package com.hf.eclub.repository;

import com.hf.eclub.models.SubClubAdminCandidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SubClubAdminCandidateRepository extends JpaRepository<SubClubAdminCandidate, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM SubClubAdminCandidate as scac WHERE scac.subClubId = :clubId AND scac.userId = :userId")
    void deleteCandidateByUserIdAndClubId(@Param("clubId") long clubId, @Param("userId") long userId);

    SubClubAdminCandidate findByUserIdAndSubClubId(long userId, long subClubId);

    List<SubClubAdminCandidate> findBySubClubId(long subClubId);

}
