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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @DeleteMapping("/removesubclubrequest/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteSubClubRequest(@PathVariable long id){
        SubClubRequest scr = subClubRequestRepository.findById(id).get(0);
        subClubRequestRepository.delete(scr);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
}
