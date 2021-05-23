import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getQuestion(){
    return axios.get("http://localhost:8080/api/questions",{headers:authHeader()});
  }
  getSubClubQuestions(clubId){
    return axios.get("http://localhost:8080/api/test/subclubquestions"+"/"+clubId);
  }
  getClubs(){
    return axios.get("http://localhost:8080/api/test/clubs");
  }
  getCommonUsers(userId){
    return axios.post(API_URL +"getcommonusers"+"/"+userId);
  }

  getUserClubs(userid){
    return axios.post("http://localhost:8080/api/test/getuserclubs", {
      id:userid
      });
  }
  getOtherClubs(userid){
    return axios.post("http://localhost:8080/api/test/getotheruserclubs", {
      id:userid
    });
  }
  getUserInfo(userid){
    return axios.post("http://localhost:8080/api/test/getuserinfo", {
      id:userid
    });
  }
  updateUserInfo(UserId,UserArea,UserType){
    return axios.post("http://localhost:8080/api/test/updateuserinfo",{
      id:UserId,
      area:UserArea,
      type:UserType
    })
  }

  getBlackList(userId, clubId){
    return axios.post(API_URL+"blacklistcontrol", {
      userId: userId,
      clubId: clubId
    });

  }

  getBannedList(userId, clubId){
    return axios.post(API_URL+"bannedusercontrol", {
      userId: userId,
      clubId: clubId
    });

  }

}

export default new UserService();
