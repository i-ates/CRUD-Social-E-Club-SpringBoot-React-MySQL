package com.hf.eclub.controller;

import com.hf.eclub.models.Club;
import com.hf.eclub.models.Question;
import com.hf.eclub.repository.ClubRepository;
import com.hf.eclub.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/questions")
    @PreAuthorize("hasRole('USER')")
    public List<Question> getAllQuestions(){
        return questionRepository.findAll();
    }
}
