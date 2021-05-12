package com.hf.eclub.controller;


import com.hf.eclub.models.Rate;
import com.hf.eclub.payload.request.RateRequest;
import com.hf.eclub.repository.ClubRepository;
import com.hf.eclub.repository.RateRepository;
import com.hf.eclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")

public class RateController {
     @Autowired
    private RateRepository rateRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClubRepository clubRepository;

    @GetMapping("/test/rate/{id}")
    public double getRate(@PathVariable long id){
        return rateRepository.findById(id);
    }

    @GetMapping("test/comment/{id}")
    public List<Rate> getComment(@PathVariable long id){
        return rateRepository.findCommentById(id);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/test/createrate")
    public ResponseEntity<?> createRate(@Valid @RequestBody RateRequest rateRequest){
        Rate rate = new Rate(rateRequest.getUserId(), rateRequest.getClubId(), rateRequest.getRate(),
                rateRequest.getComment());
        rateRepository.save(rate);
        return ResponseEntity.ok("rate added");
    }

}
