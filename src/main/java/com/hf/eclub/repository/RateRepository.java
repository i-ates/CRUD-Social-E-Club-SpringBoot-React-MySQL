package com.hf.eclub.repository;

import com.hf.eclub.models.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RateRepository extends JpaRepository<Rate, Long> {

    @Query("SELECT AVG(r.rate) FROM Rate as r WHERE r.clubId = :clubId")
    Double findById(@Param("clubId") long clubId);

    @Query("SELECT r FROM Rate as r WHERE r.clubId = :clubId")
    List<Rate> findCommentById(@Param("clubId") long clubId);

}
