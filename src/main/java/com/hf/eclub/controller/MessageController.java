package com.hf.eclub.controller;


import com.hf.eclub.repository.MessageRepository;
import com.hf.eclub.repository.UserClubsRepository;
import com.hf.eclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserClubsRepository userClubsRepository;


    // Mesajlari dondururken, requesti yapan kisinin rolune gore dondur.

}
