package com.hf.eclub.controller;

import com.hf.eclub.models.Activity;
import com.hf.eclub.models.Club;
import com.hf.eclub.payload.request.CreateClubRequest;
import com.hf.eclub.payload.response.ActivityResponse;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.ActivityRepository;
import com.hf.eclub.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test")
public class ClubController {
    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @GetMapping("/clubs")
    public List<Club> getAllClubs(){
        return clubRepository.findAll();
    }

    @GetMapping("/getclubname/{id}")
    public String getClubName(@PathVariable long id){
        return clubRepository.findById(id).get(0).getClubName();
    }

    @PostMapping("/createclub")
    public void createClub(@Valid @RequestBody CreateClubRequest createClubRequest){
        System.out.println(createClubRequest.getClubName());
        Club c = new Club(createClubRequest.getClubName(), createClubRequest.getParentName());
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

    @PostMapping("/updateactivity/{id}")
    public ResponseEntity<?> updateActivity(@PathVariable long id){
        Calendar currentTimeNow = Calendar.getInstance();
        Date crDate = currentTimeNow.getTime();

        if ( activityRepository.findByClubId(id) == null){
            String cName = clubRepository.findById(id).get(0).getClubName();
            Activity activity = new Activity(cName, id, crDate);
            activityRepository.save(activity);
        }else{
            activityRepository.updateTime(id, crDate);
        }
        return ResponseEntity.ok("activity is updated.");
    }

    @GetMapping("/getallclubactivities")
    public List<ActivityResponse> getAllActivity(){
        List<ActivityResponse> activities = new ArrayList<>();
        for(Activity a: activityRepository.findAll()){
            long id = a.getId();
            String clubName = a.getClubName();
            String activity = a.getLastActivity().toString().substring(0, a.getLastActivity().toString().length()-2);
            activities.add(new ActivityResponse(id, clubName, activity));
        }
        return activities;
    }

    @DeleteMapping("/deleteactivity/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable long id){
        activityRepository.delete(activityRepository.findByClubId(id));
        return ResponseEntity.ok(new MessageResponse("activity is deleted"));
    }
}
