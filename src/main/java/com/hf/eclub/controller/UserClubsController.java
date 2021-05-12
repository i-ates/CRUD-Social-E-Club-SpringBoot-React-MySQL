package com.hf.eclub.controller;

import com.hf.eclub.models.Club;
import com.hf.eclub.models.UserClubs;
import com.hf.eclub.payload.request.UserClubsRequest;
import com.hf.eclub.payload.request.UserIdRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.ClubRepository;
import com.hf.eclub.repository.UserClubsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserClubsController {
    @Autowired
    UserClubsRepository userClubsRepository;

    @Autowired
    ClubRepository clubRepository;


    @PostMapping("/userclubs")
    public ResponseEntity<?> saveSurvey(@Valid @RequestBody UserClubsRequest userClubsRequest) {
        UserClubs userClubs= new UserClubs(userClubsRequest.getClubId(),userClubsRequest.getUserId());
        if (userClubsRepository.findByClubIdAndUserId(userClubsRequest.getClubId(), userClubs.getUserId()).isEmpty()){
            userClubsRepository.save(userClubs);
            return ResponseEntity.ok(new MessageResponse("User Club added!"));
        }else{
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

    }
    @PostMapping("/getuserclubs")
    public List<Club> getUserClubs(@Valid @RequestBody UserIdRequest userIdRequest){

        return userClubsRepository.findUserClubsByUserId(userIdRequest.getId());
    }

    @PostMapping("/getotheruserclubs")
    public List<Club> getOtherClubs(@Valid @RequestBody UserIdRequest userIdRequest){
        return userClubsRepository.findUserOtherClubsByUserId(userIdRequest.getId());
    }

    @DeleteMapping("/deleteuserclubs/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteClub(@PathVariable long id){
        userClubsRepository.deleteUserClubById(id);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
