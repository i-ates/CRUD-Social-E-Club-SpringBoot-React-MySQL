package com.hf.eclub.repository;

import com.hf.eclub.models.UserClubs;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.jws.soap.SOAPBinding;
import java.util.List;

@Repository
public interface UserClubsRepository extends JpaRepository<UserClubs,Long> {


    List<UserClubs> findByClubIdAndUserId(long clubId,long userId);

    List<UserClubs> findByUserId(long userId);
}
