/*
Controller class for Events
*/

package com.hf.eclub.controller;

import com.hf.eclub.models.Event;
import com.hf.eclub.payload.request.EventForm;
import com.hf.eclub.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;



    // To create a new event, send POST request with json EventForm body, to path /api/events/create
    @PostMapping("/create")
    public void createEvent(/*@Valid*/ @RequestBody EventForm eventForm){
        Event eventToAdd = new Event (
                eventForm.getTitle(),
                eventForm.getDate(),
                eventForm.getParentClubId(),
                eventForm.getContent(),
                eventForm.getAuthorId()
                );
        eventRepository.save(eventToAdd);
    }

    // To fetch a certain club's events, make a GET request /api/events/fetch/1 for example
    @GetMapping("/fetch/{id}")
    public List<Event> getEventsByClub(@PathVariable long id){
        return eventRepository.findByParentClubId(id);
    }

    // TODO : Other event operations.
}
