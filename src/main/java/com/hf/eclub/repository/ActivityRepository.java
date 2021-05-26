package com.hf.eclub.repository;

import com.hf.eclub.models.Activity;
import com.hf.eclub.models.BannedUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query("SELECT a FROM Activity as a WHERE a.clubId = :clubId")
    Activity findByClubId( long clubId);

    @Transactional
    @Modifying
    @Query("UPDATE Activity SET lastActivity = :currentDate WHERE clubId = :clubId")
    void updateTime(long clubId, Date currentDate);
}
