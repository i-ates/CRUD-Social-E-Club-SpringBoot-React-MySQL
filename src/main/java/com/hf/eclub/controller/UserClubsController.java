package com.hf.eclub.controller;

import com.hf.eclub.models.Club;
import com.hf.eclub.models.UserClubs;
import com.hf.eclub.payload.request.UserClubsRequest;
import com.hf.eclub.payload.request.UserIdRequest;
import com.hf.eclub.payload.response.UserBriefResponse;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.ClubRepository;
import com.hf.eclub.repository.UserClubsRepository;
import com.hf.eclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserClubsController {
    @Autowired
    UserClubsRepository userClubsRepository;

    @Autowired
    ClubRepository clubRepository;

    @Autowired
    UserRepository userRepository;

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

    @PostMapping("/getcommonusers/{uid}")
    public List<UserBriefResponse> getCommonUsers(@PathVariable Long uid){ // returns all users that are common (in same club) with the given user id
        List<Club> listOfEnrolledClubs = userClubsRepository.findUserClubsByUserId(uid);
        Set<Long> commonUserIds = new HashSet<>();   // Set is used to avoid duplicates

        for (Club club : listOfEnrolledClubs){
            commonUserIds.addAll(userClubsRepository.findMemberIdsByClubId(club.getId()));
        }
        commonUserIds.remove(uid); // remove user thyself from the list

        List<UserBriefResponse> result = new ArrayList<>();
        for (Long userid : commonUserIds){
            Map<String, Object> tempMap = new HashMap<>();
            Long userId= userid;
            String userName=userRepository.findUsernameById(userid);
            result.add(new UserBriefResponse(userId,userName));
        }
        return result;
    }
}
