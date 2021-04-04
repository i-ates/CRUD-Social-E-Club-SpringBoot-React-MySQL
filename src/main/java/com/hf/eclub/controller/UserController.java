package com.hf.eclub.controller;


import com.hf.eclub.error.ApiError;
import com.hf.eclub.modal.User;
import com.hf.eclub.repository.UserRepository;
import com.hf.eclub.service.UserService;
import com.hf.eclub.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.MethodInvocationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class UserController {
    @Autowired
    UserService userService;

    private static final Logger log= LoggerFactory.getLogger(UserController.class);

    @CrossOrigin
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user){
        ApiError error = new ApiError(400,"Validation error","api/users");
        ApiError error500= new ApiError(500,"Unique error","api/users");

        Map<String,String > validationErrors = new HashMap<>();
        Map<String,String > uniqueErrors = new HashMap<>();
        if (user.getUsername()==null || user.getUsername().isEmpty()){
            validationErrors.put("username","Username cannot be null!");

        }
        if (user.getEmail() == null || user.getEmail().isEmpty()){
            validationErrors.put("email","Email cannot be null!");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()){
            validationErrors.put("password","Password cannot be null!");
        }

        if (userService.getUserRepository().findByUsername(user.getUsername())!=null){
                uniqueErrors.put("username","Username must be unique!");
        }

        if (userService.getUserRepository().findByEmail(user.getEmail())!=null){
            uniqueErrors.put("email","Email must be unique!");
        }

        if (!validationErrors.isEmpty()){
            error.setValidationErrors(validationErrors);
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        if (!uniqueErrors.isEmpty()){
            error500.setValidationErrors(uniqueErrors);
            return ResponseEntity.status(HttpStatus.valueOf(500)).body(error500);
        }


        userService.save(user);
        return ResponseEntity.ok(new GenericResponse("user created"));
    }



}
