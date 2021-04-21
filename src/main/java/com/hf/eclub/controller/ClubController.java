package com.hf.eclub.controller;

import com.hf.eclub.models.Club;
import com.hf.eclub.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
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

    @PostMapping("/createClub")
    public Club createClub(@Valid @RequestBody Club club){
        return clubRepository.save(club);
    }
}
