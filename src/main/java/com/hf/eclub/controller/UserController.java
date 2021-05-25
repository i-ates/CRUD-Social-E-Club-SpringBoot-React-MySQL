package com.hf.eclub.controller;

import com.hf.eclub.models.User;
import com.hf.eclub.payload.request.ChangePasswordRequest;
import com.hf.eclub.payload.request.SetUserInfoRequest;
import com.hf.eclub.payload.request.UserIdRequest;
import com.hf.eclub.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
        userList.get(0).setRoles(user.getRoles());
        return userList;
    }

    @PostMapping("/updateuserinfo")
    public void setUserName(@Valid @RequestBody SetUserInfoRequest setUserInfoRequest){
        User user=userRepository.findById(setUserInfoRequest.getId()).get(0);
        if (setUserInfoRequest.getType().equals("fullname")){
            user.setFullname(setUserInfoRequest.getArea());
        }else if(setUserInfoRequest.getType().equals("bio")){
            user.setBio(setUserInfoRequest.getArea());
        }else{
            user.setCity(setUserInfoRequest.getArea());
        }
        userRepository.save(user);
    }


}
