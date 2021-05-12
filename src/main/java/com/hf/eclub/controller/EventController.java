/*
Controller class for Events
*/

package com.hf.eclub.controller;

import com.hf.eclub.models.Event;
import com.hf.eclub.payload.request.EventRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.EventRepository;
import com.hf.eclub.repository.SubClubAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SubClubAdminRepository scaRepository;

    // To create a new event, send POST request with EventForm body, to path /api/events/create
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(/*@Valid*/ @RequestBody EventRequest eventForm){

        // Check if user is a member of that club.
        if (scaRepository.findUserSubClubAdminByIdAndClubId(
                eventForm.getUserId(), eventForm.getClubId()).size() < 1)
        {
            return ResponseEntity.ok(new MessageResponse("You have no priviledges to create an event."));
        }

        Event eventToAdd = new Event (
                eventForm.getTitle(),
                eventForm.getClubId(),
                eventForm.getContent(),
                eventForm.getUserId()
                );

        eventRepository.save(eventToAdd);
        return ResponseEntity.ok(new MessageResponse("Event succesfully created."));
    }

    // To fetch a certain club's events, make a GET request /api/events/fetch/1 for example
    @GetMapping("/fetch/{id}")
    public List<Event> getEventsByClub(@PathVariable long id){
        return eventRepository.findByParentClubId(id);
    }

    // TODO : Other event operations.
}
