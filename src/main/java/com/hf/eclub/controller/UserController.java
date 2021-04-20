package com.hf.eclub.controller;

import com.hf.eclub.models.User;
import com.hf.eclub.models.UserClubs;
import com.hf.eclub.payload.request.UserClubsRequest;
import com.hf.eclub.payload.request.UserIdRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/getuserinfo")
    public List<User> getUserInfo(@Valid @RequestBody UserIdRequest userIdRequest){
        return userRepository.findById(userIdRequest.getId());
    }
}
