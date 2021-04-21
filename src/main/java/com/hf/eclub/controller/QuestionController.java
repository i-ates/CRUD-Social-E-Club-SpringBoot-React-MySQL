package com.hf.eclub.controller;

import com.hf.eclub.models.Question;
import com.hf.eclub.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/questions")
    //@PreAuthorize("hasRole('USER')")
    public List<Question> getAllQuestions(){
        return questionRepository.findAll();
    }

    @PostMapping("/createQuestions")
    public List<Question> createQuestions(@RequestBody List<Question> questions){
        for ( Question q: questions){
            questionRepository.save(q);
        }
        return questionRepository.findAll();
    }
}
