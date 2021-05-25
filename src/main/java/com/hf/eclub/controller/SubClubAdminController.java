package com.hf.eclub.controller;


import com.hf.eclub.models.SubClubAdmin;
import com.hf.eclub.models.SubClubAdminCandidate;
import com.hf.eclub.models.User;
import com.hf.eclub.models.UserClubs;
import com.hf.eclub.payload.request.UserIdRequest;
import com.hf.eclub.payload.response.CandidateResponse;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.payload.response.UserBriefResponse;
import com.hf.eclub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/subclubadmin")
public class SubClubAdminController {

    @Autowired
    private SubClubAdminRepository scaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private UserClubsRepository ucRepository;

    @Autowired
    private SubClubAdminCandidateRepository scacRepository;


    @PostMapping("/check/{clubid}/{userid}")
    public Boolean checkSubClubAdmin(@PathVariable long userid, @PathVariable long clubid){
        List<SubClubAdmin> u = scaRepository.findUserSubClubAdminByIdAndClubId (userid, clubid);
        return u.size() >= 1;
    }

    @PostMapping("/currentadmin/{clubid}")
    public UserBriefResponse currentSubClubAdmin (@PathVariable long clubid){
        List<SubClubAdmin> u = scaRepository.findBySubClubId(clubid);
        if (u.size() >= 1) {
            return new UserBriefResponse(u.get(0).getUserId(), userRepository.findUsernameById(u.get(0).getUserId()));
        }
        return new UserBriefResponse(null, "NOT_ASSIGNED");
    }

    @PostMapping("/updateadmin/{clubid}")
    public ResponseEntity<?> updateSubClubAdmin (@Valid @RequestBody UserIdRequest uidRequest, @PathVariable long clubid){

        List<UserClubs> userEnrollment = ucRepository.findByClubIdAndUserId(clubid, uidRequest.getId());
        if (userEnrollment.size() < 1) { return ResponseEntity.ok(new MessageResponse("User is not a member of subclub, subclub admin assignment failed."));}

        scaRepository.deleteSubClubAdminByClubId(clubid);       // delete any existing subclub admin
        scaRepository.save( new SubClubAdmin(uidRequest.getId(), clubid) );

        return ResponseEntity.ok(new MessageResponse("User successfully assigned as subclub admin."));
    }

    @PostMapping("/deleteadmin/{clubid}")
    public ResponseEntity<?> deleteSubClubAdmin (@PathVariable long clubid){
        scaRepository.deleteSubClubAdminByClubId(clubid);
        return ResponseEntity.ok(new MessageResponse("SubClub admin successfully deleted."));
    }

    @PostMapping("/addcandidate/{clubid}")
    public ResponseEntity<?> addCandidate (@Valid @RequestBody UserIdRequest uidRequest, @PathVariable long clubid){
        //check if user is member of the subclub
        List<UserClubs> userEnrollment = ucRepository.findByClubIdAndUserId(clubid, uidRequest.getId());
        if (userEnrollment.size() < 1) { return ResponseEntity.ok(new MessageResponse("Your request to become a subclub admin failed, you are not a member of this subclub"));}

        // check if user already is a candidate.
        if (scacRepository.findByUserIdAndSubClubId(uidRequest.getId(), clubid) != null) {
            return ResponseEntity.ok(new MessageResponse("Your request to become a subclub admin already applied."));
        }

        scacRepository.save( new SubClubAdminCandidate(uidRequest.getId(), clubid));
        return ResponseEntity.ok(new MessageResponse("Your request to become a subclub admin has been successfully applied."));
    }

    @PostMapping("/deletecandidate/{clubid}")
    public ResponseEntity<?> deleteCandidate(@Valid @RequestBody UserIdRequest uidRequest, @PathVariable long clubid){
        scacRepository.deleteCandidateByUserIdAndClubId(clubid, uidRequest.getId());
        return ResponseEntity.ok(new MessageResponse("Candidate deleted."));
    }

    @GetMapping("/fetchcandidates")
    public  List<CandidateResponse> getCandidates() {

        List<SubClubAdminCandidate> candidateIdList = scacRepository.findAll();

        List<CandidateResponse> result = new ArrayList<>();
        
        for (SubClubAdminCandidate candidate : candidateIdList){
            String name = userRepository.findById(candidate.getUserId()).get().getUsername();
            String clubName = clubRepository.findById(candidate.getSubClubId()).get().getClubName();
            CandidateResponse candidateResponse = new CandidateResponse(candidate.getUserId(),name,
                    candidate.getSubClubId(), clubName);
            result.add(candidateResponse);
        }


        return result;
    }


}
