package com.hf.eclub.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class EventRequest {

    @NotBlank
    @Size(max = 100)
    private String title;


    @NotBlank
    private Long clubId;

    @NotBlank
    @Size(max = 1000)
    private String content;

    @NotBlank
    private Long userId;

    public EventRequest(String title, Long clubId, String content, Long userId) {
        this.title = title;
        this.clubId = clubId;
        this.content = content;
        this.userId = userId;
    }

}
