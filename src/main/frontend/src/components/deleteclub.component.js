import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ClubService from "../services/club.service";

export default class DeleteClub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:-1
        }
        this.setId = this.setId.bind(this);
        this.deleteClub = this.deleteClub.bind(this);
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

            <div  className="panel-container">
                <Row>
                    <Col style={{marginTop:50,marginLeft:100}}>
                        <p>
                            SubCLUB-1 inactive for x days y hours
                        </p>
                        <p>
                            SubCLUB-2 inactive for x days y hours
                        </p>
                        <p>
                            SubCLUB-3 inactive for x days y hours
                        </p>
                    </Col>
                    <Col>
                        <div>
                            <Row>
                                <Col></Col>
                                <Col xs={6} style={{marginTop:50}}>
                                    <Row >
                                        <InputGroup size="lg" className="mb-3" value={this.state.id} onChange={this.setId}>
                                            <FormControl placeholder="Club ID" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <Col></Col>
                                        <Col>
                                            <ButtonGroup vertical>
                                                <Col ><Button onClick={()=>this.deleteClub(this.state.id)} style={{width:150,marginTop:20}} variant="outline-light">Delete Club</Button></Col>
                                            </ButtonGroup>
                                        </Col>
                                        <Col>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }

}