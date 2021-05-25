import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {FaBan} from "react-icons/fa";
import {BsTrash} from "react-icons/bs";
import ClubService from "../services/club.service";


export default class AssignAdmin extends Component {
    constructor(props) {
        super(props);

        this.state ={
            userId:-1,
            clubId:-1,
            applies:[]
        }

        this.updateAdmin = this.updateAdmin.bind(this);
        this.changeSubClubId = this.changeSubClubId.bind(this);
        this.changeUserId = this.changeUserId.bind(this);
        this.deleteCandidate = this.deleteCandidate.bind(this);
    }

    componentDidMount() {
        ClubService.getAllCandidates().then((res) =>{
            this.setState({applies: res.data})
        });
    }

    changeSubClubId = (event) =>{
        this.setState({clubId: event.target.value});
    }

    changeUserId = (event) =>{
        this.setState({userId: event.target.value});
    }

    deleteCandidate = (userId, clubId) =>{
        ClubService.deleteCandidate(userId, clubId).then();
        window.location.reload();

    }

    updateAdmin =()=>{
        ClubService.updateSubClubAdmin(this.state.userId, this.state.clubId).then();
        window.location.reload();
    }

    render() {

        return (

            <div  className="panel-container">
                <Row>
                    <Col className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                        height:600,opacity:0.9,marginTop:0}}>

                        {
                            this.state.applies.map(
                                apply =>
                                    <Card style={{ width: 430, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                                        <Card.Body style={{ marginTop:-30,marginLeft:-40,marginRight:-40}}>
                                            <Card.Title>
                                                {apply.clubName}
                                                <Col xs={6} md={4} >
                                                    <Button variant="outline-light" style={{marginLeft:15,marginBottom:0}}>
                                                        <BsTrash onClick={() => this.deleteCandidate(apply.userId, apply.clubId)}/>
                                                    </Button>
                                                </Col>
                                            </Card.Title>
                                            <Card.Text>
                                                Club id: {apply.clubId}
                                            </Card.Text>
                                            <Card.Text>
                                                Candidate id: {apply.userId}
                                            </Card.Text>
                                            <Card.Text>
                                                Candidate: {apply.userName}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                            )
                        }

                    </Col>

                    <Col sm style={{marginTop:50}}>
                        <FormControl type="text" placeholder="Enter a sub club id"
                                      onChange={this.changeSubClubId}>

                        </FormControl>

                        <FormControl type="text" placeholder="Enter an user id" style={{marginTop:15}}
                                      onChange={this.changeUserId}>

                        </FormControl>

                        <Button onClick={() => this.updateAdmin()} variant="outline-light" type="submit" style={{marginTop:15}}>
                            Update Admin
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}