package com.hf.eclub.payload.request;

import javax.validation.constraints.NotBlank;

public class CreateQuestionRequest {
    @NotBlank
    private String ques;
    @NotBlank
    private String answer;
    @NotBlank
    private String clubName;

    public CreateQuestionRequest() {
    }

    public CreateQuestionRequest(@NotBlank String ques, @NotBlank String answer, @NotBlank String clubName) {
        this.ques = ques;
        this.answer = answer;
        this.clubName = clubName;
    }

    public String getQues() {
        return ques;
    }

    public void setQues(String ques) {
        this.ques = ques;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
}
