import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ClubService from "../services/club.service";
import Card from "react-bootstrap/Card";
import {BsTrash} from "react-icons/bs";

export default class DeleteClub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:-1,
            activities: []
        }
        this.setId = this.setId.bind(this);
        this.deleteClub = this.deleteClub.bind(this);
    }

    componentDidMount(){

        ClubService.getAllClubActivity().then((res) => {
            this.setState({activities: res.data})
        });
    }

    setId = (event) =>{
        this.setState({id: event.target.value});
    }

    deleteClub(id){
        ClubService.deleteClub(id).then();
        ClubService.deleteQuestion(id).then();
        ClubService.deleteUserClubs(id).then();
        ClubService.deleteActivity(id).then();
        this.navigate();
    }
    async navigate() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.reload();
    }

    render() {

        return (
            <div className="panel-container" style={{height:450,opacity:0.9,maxWidth: 1500}}>
                <Row>
                    <Col style={{overflowY: "scroll",scrollBehaviour: "smooth", marginRight:50, maxHeight:400}}>
                        {
                            this.state.activities.map(
                                activity =>
                                    <Card style={{height:150, width: 350, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                        margin:"auto",marginBottom:10, marginTop:0}}>
                                        <Card.Body style={{margin:"auto"}}>
                                            <Card.Title>
                                                "{activity.clubName}" with id {activity.clubId}
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col style={{marginTop:8}}>
                                                        Last Activity: {activity.lastActivity}
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                            )
                        }
                    </Col>
                    <Col style={{marginTop:40}}>
                        <InputGroup size="lg" className="mb-3" value={this.state.id} onChange={this.setId} style={{width:400, margin:"auto"}}>
                            <FormControl placeholder="Club ID" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                        </InputGroup>
                        <ButtonGroup vertical>
                            <Col ><Button onClick={()=>this.deleteClub(this.state.id)} style={{width:150,marginTop:20}} variant="outline-light">Delete Club</Button></Col>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        )
    }

}