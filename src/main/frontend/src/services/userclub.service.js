import axios from "axios";

const API_URL = "http://localhost:8080/api/test";

class userClubsService{
    saveClubs(clubId, userId) {
        return axios.post(API_URL + "/userclubs", {
            clubId,
            userId
        });
    }
}

export default new userClubsService();

