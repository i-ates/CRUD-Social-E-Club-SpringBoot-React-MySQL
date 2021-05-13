/*
Controller class for Events
*/

package com.hf.eclub.controller;

import com.hf.eclub.models.Event;
import com.hf.eclub.models.SubClubAdmin;
import com.hf.eclub.payload.request.EventRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.EventRepository;
import com.hf.eclub.repository.SubClubAdminRepository;
import com.hf.eclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SubClubAdminRepository scaRepository;

    @Autowired
    private UserRepository userRepository;

    // To create a new event, send POST request with EventForm body, to path /api/events/create
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@Valid @RequestBody EventRequest eventRequest){
        List<SubClubAdmin> u = scaRepository.findUserSubClubAdminByIdAndClubId(eventRequest.getUserId(), eventRequest.getClubId());
        if (u.size() < 1)
        {
            return ResponseEntity.ok(new MessageResponse("You have no privileges to create an event in this subclub."));
        }
        Event eventToAdd = new Event (
                eventRequest.getTitle(),
                eventRequest.getClubId(),
                eventRequest.getContent(),
                eventRequest.getUserId()
                );

        eventRepository.save(eventToAdd);
        return ResponseEntity.ok(new MessageResponse("Event succesfully created."));
    }


    // To fetch a certain club's events, make a GET request /api/events/fetch/1 for example
    @GetMapping("/fetch/{id}")
    public List<Map<String,String>> getEventsByClub(@PathVariable long id){

        List<Map<String,String>> result = new ArrayList<>();
        List<Event> listOfEvents = eventRepository.findByClubId(id);

        for (Event tempEvent : listOfEvents) {
            Map<String, String> tempMap = new HashMap<>();
            tempMap.put("title", tempEvent.getTitle());
            tempMap.put("content", tempEvent.getContent());
            tempMap.put("username", userRepository.findUsernameById(tempEvent.getUserId()));
            tempMap.put("date", tempEvent.getDate().toString().substring(0,19));
            result.add(tempMap);
        }

        return result;
    }



}
