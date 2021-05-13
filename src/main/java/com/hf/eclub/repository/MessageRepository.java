package com.hf.eclub.repository;

import com.hf.eclub.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

    List<Message> findByClubId(Long clubId);
    List<Message> findByClubIdAndIsPrivate(Long clubId, Boolean isPrivate);

}
