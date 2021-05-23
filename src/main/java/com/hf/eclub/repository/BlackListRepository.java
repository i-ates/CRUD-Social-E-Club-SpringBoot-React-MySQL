package com.hf.eclub.repository;

import com.hf.eclub.models.BannedUser;
import com.hf.eclub.models.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackListRepository extends JpaRepository<BlackList, Long> {

    @Query("SELECT b FROM BlackList as b WHERE b.userId = :userId AND b.clubId = :clubId")
    BlackList findByUserAndClubId(long userId, long clubId);

}
