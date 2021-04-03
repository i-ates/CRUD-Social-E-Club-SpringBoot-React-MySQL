package com.hf.eclub.repository;

import com.hf.eclub.modal.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
