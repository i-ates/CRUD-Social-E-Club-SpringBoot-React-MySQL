package com.hf.eclub.repository;

import com.hf.eclub.models.BannedUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface BannedUserRepository extends JpaRepository<BannedUser, Long> {

    @Query("SELECT b FROM BannedUser as b WHERE b.userId = :userId AND b.clubId = :clubId")
    BannedUser findByUserAndClubId(long userId, long clubId);

    @Query("SELECT b.howManyTimes FROM BannedUser as b WHERE b.userId = :userId AND b.clubId = :clubId")
    int findHowManyTimes(long userId, long clubId);

    @Query("SELECT b.date FROM BannedUser as b WHERE b.userId = :userId AND b.clubId = :clubId")
    Date findDate(long userId, long clubId);

    @Transactional
    @Modifying
    @Query("UPDATE BannedUser SET date = :currentDate WHERE userId = :userId AND clubId = :clubId")
    void updateDate(long userId, long clubId, Date currentDate);

    @Transactional
    @Modifying
    @Query("UPDATE BannedUser SET howManyTimes = howManyTimes + 1 WHERE userId = :userId AND clubId = :clubId")
    void updateHowManyTimes(long userId, long clubId);



}
