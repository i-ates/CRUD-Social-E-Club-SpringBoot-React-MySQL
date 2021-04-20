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
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/getuserinfo")
    public List<User> getUserInfo(@Valid @RequestBody UserIdRequest userIdRequest){
        User user=userRepository.findById(userIdRequest.getId()).get(0);
        List<User> userList=new ArrayList<>();
        userList.add(new User());
        userList.get(0).setBio(user.getBio());
        userList.get(0).setEmail(user.getEmail());
        userList.get(0).setUsername(user.getUsername());
        userList.get(0).setCity(user.getCity());
        userList.get(0).setFullname(user.getFullname());
        return userList;
    }
}