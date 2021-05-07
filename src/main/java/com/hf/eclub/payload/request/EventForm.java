package com.hf.eclub.payload.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
public class EventForm {

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    private Date date;

    @NotBlank
    private Long parentClubId;

    @NotBlank
    @Size(max = 1000)
    private String content;

    @NotBlank
    private Long authorId;

    public EventForm(String title, Date date, Long parentClubId, String content, Long authorId) {
        this.title = title;
        this.date = date;
        this.parentClubId = parentClubId;
        this.content = content;
        this.authorId = authorId;
    }

}
