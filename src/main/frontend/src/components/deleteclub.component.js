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
        this.navigate();
    }
    async navigate() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.reload();
    }

    render() {

        return (
        <div>
            <div>
                <Row>
                    <Col className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                        height:400,opacity:0.9,maxWidth: 350,marginRight:40}}>
                        {
                            this.state.activities.map(
                                activity =>
                                    <Card style={{height:120, width: 300, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                                        <Card.Body style={{ marginTop:-30,marginLeft:-40,marginRight:-40}}>
                                            <Card.Title>
                                                "{activity.clubName}" with id {activity.clubId}
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs={6} md={4}>
                                                    </Col>
                                                    <Col xs={6} md={4} style={{marginTop:8}}>
                                                        {activity.lastActivity}
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                            )
                        }
                    </Col>
                    <Col className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                        height:400,opacity:0.9,maxWidth: 350,marginRight:40}}>
                        <div  className="panel-container" style={{width:500}}>
                            <InputGroup size="lg" className="mb-3" value={this.state.id} onChange={this.setId}>
                                <FormControl placeholder="Club ID" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            </InputGroup>
                            <ButtonGroup vertical>
                                <Col ><Button onClick={()=>this.deleteClub(this.state.id)} style={{width:150,marginTop:20}} variant="outline-light">Delete Club</Button></Col>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        )
    }

}