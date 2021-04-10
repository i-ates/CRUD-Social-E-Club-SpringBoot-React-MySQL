package com.hf.eclub.controller;

import com.hf.eclub.models.UserClubs;
import com.hf.eclub.payload.request.UserClubsRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.UserClubsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserClubsController {
    @Autowired
    UserClubsRepository userClubsRepository;


    @PostMapping("/userclubs")
    public ResponseEntity<?> saveSurvey(@Valid @RequestBody UserClubsRequest userClubsRequest) {
        UserClubs userClubs= new UserClubs(userClubsRequest.getClubId(),userClubsRequest.getUserId());
//        if (userClubsRepository.findByClubIdAndUserId(userClubsRequest.getClubId(), userClubs.getUserId())){
//            return ResponseEntity
//                    .badRequest()
//                    .body(new MessageResponse("Error: Username is already taken!"));
//        }
        userClubsRepository.save(userClubs);
        return ResponseEntity.ok(new MessageResponse("User Clubs added!"));
    }
}
