import axios from "axios";

const url = "http://localhost:8080/api/clubs";

class ClubService{

    getClubs(){
        return axios.get(url);
    }
}

export default new ClubService();