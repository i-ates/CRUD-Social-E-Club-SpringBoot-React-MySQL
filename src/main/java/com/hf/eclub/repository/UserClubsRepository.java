package com.hf.eclub.repository;

import com.hf.eclub.models.UserClubs;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserClubsRepository extends JpaRepository<UserClubs,Long> {


    boolean findByClubIdAndUserId(Long clubId,long userId);
}
