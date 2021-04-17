/*
Controller class for Events
*/

package com.hf.eclub.controller;

import com.hf.eclub.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    // TODO : Handle create event requests
    // TODO : Other event operations.
}
