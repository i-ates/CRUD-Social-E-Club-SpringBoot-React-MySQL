package com.hf.eclub.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class MessageRequest {

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

    @NotBlank
    private Boolean isPrivate;

    public MessageRequest() {
    }

    public MessageRequest(@NotBlank @Size(max = 100) String title, @NotBlank Long clubId, @NotBlank @Size(max = 1000) String content, @NotBlank Long userId, @NotBlank Boolean isPrivate) {
        this.title = title;
        this.clubId = clubId;
        this.content = content;
        this.userId = userId;
        this.isPrivate = isPrivate;
    }
}
