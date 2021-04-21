import React, {Component} from 'react'
import ClubService from "../services/club.service";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

class createClub extends Component {


    constructor(props) {
        super(props);

        this.state = {
            clubName: '',
            question1: '',
            question2: '',
            question3: '',
            answer1: '',
            answer2: '',
            answer3: '',
        }

        this.changeClubName = this.changeClubName.bind(this);
        this.changeQuestion1 = this.changeQuestion1.bind(this);
        this.changeQuestion2 = this.changeQuestion2.bind(this);
        this.changeQuestion3 = this.changeQuestion3.bind(this);
        this.changeAnswer1 = this.changeAnswer1.bind(this);
        this.changeAnswer2 = this.changeAnswer2.bind(this);
        this.changeAnswer3 = this.changeAnswer3.bind(this);
        this.saveClub = this.saveClub.bind(this);
    }

    changeClubName = (event) =>{
        this.setState({clubName: event.target.value});
    }

    changeQuestion1 = (event) =>{
        this.setState({question1: event.target.value});
    }

    changeAnswer1 = (event) =>{
        this.setState({answer1: event.target.value});
    }

    changeQuestion2 = (event) =>{
        this.setState({question2: event.target.value});
    }

    changeAnswer2 = (event) =>{
        this.setState({answer2: event.target.value});
    }

    changeQuestion3 = (event) =>{
        this.setState({question3: event.target.value});
    }

    changeAnswer3 = (event) =>{
        this.setState({answer3: event.target.value});
    }

    saveClub = async (e) => {
        e.preventDefault();

        await ClubService.createClub(this.state.clubName);
        await this.timeout(1000);
        ClubService.createQuestion(this.state.question1, this.state.answer1, this.state.clubName).then();
        ClubService.createQuestion(this.state.question2, this.state.answer2, this.state.clubName).then();
        ClubService.createQuestion(this.state.question3, this.state.answer3, this.state.clubName).then();
    }

    timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }


    render() {
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col xs lg="3">
                            <Row style={{marginTop:20,marginLeft:10}}>
                                Requested Club
                            </Row>
                            <Row style={{marginTop:50,marginLeft:10}}>
                                Request 1
                            </Row>
                            <Row style={{marginTop:10,marginLeft:10}}>
                                Request 2
                            </Row>
                            <Row style={{marginTop:10,marginLeft:10}}>
                                Request 3
                            </Row>
                        </Col>
                        <Col >
                            <Row>

                                <Col>
                                    <input placeholder="Club Name" name="clubName" className="form-control"
                                           value={this.state.clubName} onChange={this.changeClubName}/>
                                </Col>

                            </Row>

                            <Row style={{marginTop:50}}>
                                <Col>
                                    <input placeholder="Question1" name="question" className="form-control"
                                           value={this.state.question1} onChange={this.changeQuestion1}/>
                                </Col>
                                <Col xs lg="3">
                                    <input placeholder="Answer1" name="answer" className="form-control"
                                           value={this.state.answer1} onChange={this.changeAnswer1}/>
                                </Col>
                            </Row>

                            <Row style={{marginTop:10}}>
                                <Col>
                                    <input placeholder="Question2" name="question" className="form-control"
                                           value={this.state.question2} onChange={this.changeQuestion2}/>
                                </Col>
                                <Col xs lg="3">
                                    <input placeholder="Answer2" name="answer" className="form-control"
                                           value={this.state.answer2} onChange={this.changeAnswer2}/>
                                </Col>
                            </Row>

                            <Row style={{marginTop:10}}>
                                <Col>
                                    <input placeholder="Question3" name="question" className="form-control"
                                           value={this.state.question3} onChange={this.changeQuestion3}/>
                                </Col>
                                <Col xs lg="3">
                                    <input placeholder="Answer3" name="answer" className="form-control"
                                           value={this.state.answer3} onChange={this.changeAnswer3}/>
                                </Col>
                            </Row>
                            <Row style={{marginTop:20}}>
                                <Col></Col>
                                <Col xs={6}>
                                    <ButtonGroup vertical>
                                        <Col ><Button style={{width:200}} variant="dark"  onClick={this.saveClub}>Add Club</Button></Col>
                                    </ButtonGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

        )
    }

}

export default createClub