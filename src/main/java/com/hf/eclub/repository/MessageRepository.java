package com.hf.eclub.repository;

import com.hf.eclub.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

    List<Message> findByClubId(Long clubId);
    List<Message> findByClubIdAndIsPrivate(Long clubId, Boolean isPrivate);
    Message findById(long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Message as msg WHERE msg.clubId = :id")
    void deleteAllMessagesByClubId(@Param("id") long id);

}
