package com.hf.eclub.controller;

import com.hf.eclub.models.Club;
import com.hf.eclub.payload.request.CreateClubRequest;
import com.hf.eclub.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test")
public class ClubController {
    @Autowired
    private ClubRepository clubRepository;

    @GetMapping("/clubs")
    public List<Club> getAllClubs(){
        return clubRepository.findAll();
    }

    @PostMapping("/createclub")
    public void createClub(@Valid @RequestBody CreateClubRequest createClubRequest){
        System.out.println(createClubRequest.getClubName());
        Club c = new Club(createClubRequest.getClubName());
        clubRepository.save(c);
    }
    @DeleteMapping("/deleteclub/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteClub(@PathVariable long id){
        Club club = clubRepository.findById(id).get(0);

        clubRepository.delete(club);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);


        return ResponseEntity.ok(response);
    }
}
