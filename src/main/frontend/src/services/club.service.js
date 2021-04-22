import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class ClubService{
    createClub(clubName){
        return axios.post(API_URL+"createclub",
            {clubName});

    }

    createQuestion(question, answ, cName){
        return axios.post(API_URL+"createquestion",
            {ques:question,
            answer:answ,
            clubName:cName});
    }

    deleteClub(clubId){
        return axios.delete(API_URL+"deleteclub"+"/"+clubId);
    }

    deleteQuestion(clubId){
        return axios.delete(API_URL+"deletequestion"+"/"+clubId);
    }

    deleteUserClubs(clubId){
        return axios.delete(API_URL+"deleteuserclubs"+"/"+clubId);
    }



}

export default new ClubService();