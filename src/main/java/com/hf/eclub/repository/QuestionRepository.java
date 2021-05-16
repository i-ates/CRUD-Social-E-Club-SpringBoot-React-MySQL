package com.hf.eclub.repository;

import com.hf.eclub.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT q FROM Question as q WHERE q.clubId = :id")
    List<Question> findById(long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Question as q WHERE q.clubId = :clubId")
    void deleteClubById(@Param("clubId") long clubId);

}
