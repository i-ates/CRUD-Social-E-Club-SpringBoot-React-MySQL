package com.hf.eclub.repository;

import com.hf.eclub.models.UserClubs;
//import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

//import javax.jws.soap.SOAPBinding;
import java.util.List;



@Repository
public interface UserClubsRepository extends JpaRepository<UserClubs,Long> {


    List<UserClubs> findByClubIdAndUserId(long clubId,long userId);

    @Query("SELECT c.clubName FROM UserClubs as uc, Club as c WHERE uc.clubId=c.id and uc.userId= :userId")
    List<String> findUserClubsByUserId(@Param("userId") long userId);

    @Query("SELECT c.clubName FROM Club as c WHERE c.clubName NOT IN( SELECT c.clubName FROM UserClubs as uc, Club as c WHERE uc.clubId=c.id and uc.userId= :userId)")
    List<String> findUserOtherClubsByUserId(@Param("userId") long userId);


}
