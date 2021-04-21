package com.hf.eclub.controller;

import com.hf.eclub.models.Club;
import com.hf.eclub.models.Question;
import com.hf.eclub.payload.request.CreateQuestionRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.ClubRepository;
import com.hf.eclub.repository.QuestionRepository;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")

public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ClubRepository clubRepository;

    @GetMapping("/questions")
    //@PreAuthorize("hasRole('USER')")
    public List<Question> getAllQuestions(){
        return questionRepository.findAll();
    }

    @PostMapping("/test/createquestion")
    public ResponseEntity<?> createQuestions(@Valid @RequestBody CreateQuestionRequest createQuestionRequest){
            Question q = new Question(createQuestionRequest.getQues(),createQuestionRequest.getAnswer(),
                    createQuestionRequest.getClubName());
            //Club c = clubRepository.findByClubName(createQuestionRequest.getClubName());
            //Question q = questions;
            Club cl = clubRepository.findByclubName(createQuestionRequest.getClubName());
            q.setClubId(cl.getId());

            //q.setClubId(c.getId());
            questionRepository.save(q);
        return ResponseEntity.ok(new MessageResponse("Questions added"));
    }
}
