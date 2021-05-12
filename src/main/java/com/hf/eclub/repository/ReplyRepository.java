package com.hf.eclub.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hf.eclub.models.Reply;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
}
