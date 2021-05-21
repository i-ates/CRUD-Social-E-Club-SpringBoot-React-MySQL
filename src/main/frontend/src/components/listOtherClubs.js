import React, {Component} from 'react';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { RiUserUnfollowFill} from "react-icons/ri";
import { AiOutlinePlus} from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ClubService from "../services/club.service";

class listOtherClubs extends Component{

    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
            flag: false,
            offerSubClub:''
        }

        this.showPage = this.showPage.bind(this);
        this.solveQuestion = this.solveQuestion.bind(this);
        this.offerClub = this.offerClub.bind(this);
        this.saveOffer = this.saveOffer.bind(this);
    }


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        let json= {"id":currentUser.id};

        UserService.getOtherClubs(currentUser.id).then((res) =>{
            this.setState({clubs: res.data});
        }).catch(err=>
            console.log(err.response.data)) ;
    }

    showPage(id) {
        this.props.history.push(`/club-page/${id}`, this.state.flag);
    }

    solveQuestion(subClubId, name) {
        this.props.history.push(`/subclub-questions/${subClubId}`,name);
    }

    offerClub = (event) =>{
        this.setState({offerSubClub: event.target.value});
    }

    saveOffer = (e) =>{
        e.preventDefault();

        const currentUser = AuthService.getCurrentUser();
        ClubService.createSubClubRequest(currentUser.id, currentUser.username, this.state.offerSubClub).then();
        window.location.reload();
    }

    render() {
        return (
            <Row style={{marginTop:50}}>

                <Col style={{marginRight:20}}>
                    <h2>Other Clubs </h2>
                    <table className="table table-striped table-bordered" style={{backgroundColor: "#05082B",opacity: 0.8,width:900}}>
                        <thead>
                        <tr>
                            <th style={{color:"white",fontSize:25}}>
                                 Club Name
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.clubs.map(
                                club =>
                                    <tr key ={club.id}>
                                        <td>

                                            <Button variant="None" style={{color:"white", fontSize:20}} onClick={() => this.showPage(club.id)} >
                                                <RiUserUnfollowFill size={25} style={{marginBottom:6,marginRight:5}}/> {club.clubName}
                                            </Button>
                                            <Button variant="None" style={{color:"white", fontSize:15, marginLeft:40}} onClick={() => this.solveQuestion(club.id, club.clubName)} >
                                                <AiOutlinePlus size={25} style={{marginBottom:6,marginRight:5}}/> Join to {club.clubName}
                                            </Button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </Col>
                <Col style={{marginTop:60}}>
                    <Card style={{ width: 430, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                        <Card.Body style={{ marginTop:-30,marginLeft:-40,marginRight:-40}}>
                            <Card.Title>Are There Any Suggestions about a New Club?</Card.Title>
                            <Card.Text>
                                (Note:Please enter a single club name otherwise, we can not consider your offer.)
                            </Card.Text>
                            <Row>
                                <Col>
                                    <input placeholder="Club Name" name="clubName" className="form-control"
                                           value={this.state.offerSubClub} onChange={this.offerClub} style={{width:200, margin:"auto"}}/>

                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Body style={{marginBottom:-40,marginTop:-20}}>
                            <Button href="#" variant="outline-light" onClick={this.saveOffer}>Offer a New Club</Button>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

        )
    }


}

export default withRouter(listOtherClubs);