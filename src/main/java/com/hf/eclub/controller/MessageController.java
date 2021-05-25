package com.hf.eclub.controller;

import com.hf.eclub.models.Message;
import com.hf.eclub.models.UserClubs;
import com.hf.eclub.payload.request.MessageRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.MessageRepository;
import com.hf.eclub.repository.UserClubsRepository;
import com.hf.eclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserClubsRepository userClubsRepository;

    @Autowired
    private UserRepository userRepository;

        @PostMapping("/create")
    public ResponseEntity<?> createMessage(@Valid @RequestBody MessageRequest messageRequest){
        //check if user is a member of the subclub
        if (messageRequest.getUserId() == null ) { messageRequest.setUserId(-1L); }
        List<UserClubs> userEnrollment = userClubsRepository.findByClubIdAndUserId(messageRequest.getClubId(), messageRequest.getUserId());

        if (userEnrollment.size() < 1)
        {
            return ResponseEntity.ok(new MessageResponse("You are not a member of this subclub, message can't be sent"));
        }

        Message messageToAdd = new Message (
                messageRequest.getTitle(),
                messageRequest.getClubId(),
                messageRequest.getContent(),
                messageRequest.getUserId(),
                messageRequest.getIsPrivate());

        messageRepository.save(messageToAdd);
        return ResponseEntity.ok(new MessageResponse("Message successfully sent."));
    }


    @PostMapping("/deleteclubmessages/{id}") // id = club id
    public ResponseEntity<?> deleteAllMessagesOfClub(@PathVariable long id){
        messageRepository.deleteAllMessagesByClubId(id);
        return ResponseEntity.ok(new MessageResponse("Messages of club successfully deleted."));
    }

    @DeleteMapping("/deletemessage/{messageid}")
    public ResponseEntity<?> deleteMessage(@PathVariable long messageid){
            Message message2delete = messageRepository.findById(messageid);
            if (message2delete != null ) {messageRepository.delete(message2delete);}
            return ResponseEntity.ok(new MessageResponse("Message successfully deleted."));
    }

    @PostMapping("/fetch/{id}/{userid}")
    public List<Map<String,Object>> getMessagesByClub(@PathVariable long id,@PathVariable long userid){


        List<UserClubs> userEnrollment = userClubsRepository.findByClubIdAndUserId(id, userid);
        List<Message> listOfMessages;

        if (userEnrollment.size() > 0){
            // User is enrolled to the subclub, all massages will be returned.
            listOfMessages = messageRepository.findByClubId(id);
        }
        else{
            // User is not enrolled, only public messages will be returned.
            listOfMessages = messageRepository.findByClubIdAndIsPrivate(id, false);
        }

        List<Map<String,Object>> result = new ArrayList<>();
        for (Message tempMessage : listOfMessages ){
            Map<String, Object> tempMap = new HashMap<>();
            tempMap.put("title", tempMessage.getTitle());
            tempMap.put("content", tempMessage.getContent());
            tempMap.put("username", userRepository.findUsernameById(tempMessage.getUserId()));
            tempMap.put("date", tempMessage.getDate().toString().substring(0,19));
            tempMap.put("userId", tempMessage.getUserId());
            tempMap.put("isPrivate", tempMessage.getIsPrivate());
            tempMap.put("messageId", tempMessage.getId());
            result.add(tempMap);
        }

        return result;
    }

}
