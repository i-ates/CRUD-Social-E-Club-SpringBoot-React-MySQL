package com.hf.eclub.controller;

import com.hf.eclub.models.SubClubRequest;
import com.hf.eclub.payload.request.SubClubOffer;
import com.hf.eclub.payload.request.UserClubsRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.SubClubRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class SubClubRequestController {
    @Autowired
    SubClubRequestRepository subClubRequestRepository;

    @GetMapping("/subclubrequest")
    public List<SubClubRequest> getAllSubClubRequest(){
        return subClubRequestRepository.findAll();
    }

    @PostMapping("/createsubclubrequest")
    public ResponseEntity<?> createSubClubRequest(@Valid @RequestBody SubClubOffer subClubOffer){
        SubClubRequest subClubRequest = new SubClubRequest(subClubOffer.getUserId(), subClubOffer.getUserName(),
                subClubOffer.getOffer());
        subClubRequestRepository.save(subClubRequest);
        return ResponseEntity.ok(new MessageResponse("subclub request added"));
    }
}
