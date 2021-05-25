package com.hf.eclub.controller;

import com.hf.eclub.models.BannedUser;
import com.hf.eclub.models.BlackList;
import com.hf.eclub.payload.request.BannedUserRequest;
import com.hf.eclub.payload.response.MessageResponse;
import com.hf.eclub.repository.BannedUserRepository;
import com.hf.eclub.repository.BlackListRepository;
import com.hf.eclub.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class BannedUserController {

    @Autowired
    private BannedUserRepository bannedUserRepository;

    @Autowired
    private BlackListRepository blackListRepository;

    @PostMapping("/createbanneduser")
    public ResponseEntity<?> banUser(@Valid @RequestBody BannedUserRequest bannedUserRequest){

        Calendar currentTimeNow = Calendar.getInstance();
        currentTimeNow.add(Calendar.MINUTE, 5);
        Date crDate = currentTimeNow.getTime();

        if( bannedUserRepository.findByUserAndClubId(bannedUserRequest.getUserId(), bannedUserRequest.getClubId()) == null){
            //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            //LocalDateTime fiveMinutesLater = LocalDateTime.now().plusMinutes(5);
            //LocalDateTime now = LocalDateTime.now();
            //now = now.plusMinutes(5);
            BannedUser bannedUser = new BannedUser(bannedUserRequest.getUserId(), bannedUserRequest.getUserName(),
                    bannedUserRequest.getClubId(), bannedUserRequest.getClubName(), crDate, 1);

            bannedUserRepository.save(bannedUser);
            return ResponseEntity.ok(new MessageResponse("added"));
        }else if ( bannedUserRepository.findHowManyTimes(bannedUserRequest.getUserId(), bannedUserRequest.getClubId()) == 3){
            BlackList blackList = new BlackList(bannedUserRequest.getUserId(), bannedUserRequest.getUserName(),
                    bannedUserRequest.getClubId(), bannedUserRequest.getClubName());

            blackListRepository.save(blackList);
            return ResponseEntity.ok(new MessageResponse("user added to blacklist"));
        } else{
            bannedUserRepository.updateDate(bannedUserRequest.getUserId(), bannedUserRequest.getClubId(), crDate);

            bannedUserRepository.updateHowManyTimes(bannedUserRequest.getUserId(), bannedUserRequest.getClubId());

            return ResponseEntity.ok(new MessageResponse("date and howmanytimes field are updated"));
        }

    }

    @PostMapping("/blacklistcontrol")
    public Boolean blackListControl(@Valid @RequestBody BannedUserRequest bannedUserRequest){

        return blackListRepository.findByUserAndClubId(bannedUserRequest.getUserId(), bannedUserRequest.getClubId()) != null;
    }

    @PostMapping("/bannedusercontrol")
    public Boolean bannedUserControl(@Valid @RequestBody BannedUserRequest bannedUserRequest){

        if(bannedUserRepository.findByUserAndClubId(bannedUserRequest.getUserId(), bannedUserRequest.getClubId()) == null){
            return false;
        }else{
            Calendar currentTimeNow = Calendar.getInstance();
            Date crDate = currentTimeNow.getTime();
            Date registeredDate = bannedUserRepository.findDate(bannedUserRequest.getUserId(), bannedUserRequest.getClubId());
            if ( crDate.compareTo(registeredDate) > 0){
                return false;
            }
            return true;
        }
    }

    @PostMapping("/getdate")
    public String getLastUpdate(@Valid @RequestBody BannedUserRequest bannedUserRequest){
        Date d = bannedUserRepository.findDate(bannedUserRequest.getUserId(), bannedUserRequest.getClubId());
        return d.toString().substring(0, d.toString().length()-2);
    }


}
