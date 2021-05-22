import React, {Component} from 'react'
import ClubService from "../services/club.service";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import AuthService from "../services/auth.service";
import Card from "react-bootstrap/Card";
import { BsTrash } from "react-icons/bs";
import {withRouter} from "react-router-dom";

class createClub extends Component {


    constructor(props) {
        super(props);

        this.state = {
            clubName: '',
            parentName: '',
            question1: '',
            question2: '',
            question3: '',
            answer1: '',
            answer2: '',
            answer3: '',
            offers:[]
        }

        this.changeParentName = this.changeParentName.bind(this);
        this.changeClubName = this.changeClubName.bind(this);
        this.changeQuestion1 = this.changeQuestion1.bind(this);
        this.changeQuestion2 = this.changeQuestion2.bind(this);
        this.changeQuestion3 = this.changeQuestion3.bind(this);
        this.changeAnswer1 = this.changeAnswer1.bind(this);
        this.changeAnswer2 = this.changeAnswer2.bind(this);
        this.changeAnswer3 = this.changeAnswer3.bind(this);
        this.saveClub = this.saveClub.bind(this);
        this.deleteOffer = this.deleteOffer.bind(this);
    }

    componentDidMount() {

        ClubService.getAllOffers().then((res) =>{
            this.setState({offers: res.data})});

    }

    changeParentName = (event) =>{
        this.setState({parentName: event.target.value});
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

        await ClubService.createClub(this.state.clubName, this.state.parentName);
        await this.timeout(1000);
        ClubService.createQuestion(this.state.question1, this.state.answer1, this.state.clubName, this.state.parentName).then();
        ClubService.createQuestion(this.state.question2, this.state.answer2, this.state.clubName, this.state.parentName).then();
        ClubService.createQuestion(this.state.question3, this.state.answer3, this.state.clubName, this.state.parentName).then();
        await this.timeout(1000);
        window.location.reload();
    }

    timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    deleteOffer = (id) =>{
        this.props.history.push("/deleteoffer", id);
        window.location.reload();
        //const offers = this.state.offers.filter((_, index) => index !== id)
        //this.setState({ offers });

        //ClubService.deleteOffer(id).then();
        //console.log("idtestttttttt");
        //console.log(id);
        //this.navigate();
    }

    async navigate() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        //window.location.reload();
    }




    render() {
        return (
            <div>
                <div  >
                    <Row >
                        <Col className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                            height:400,opacity:0.9,maxWidth: 350,marginRight:40}}>
                            {
                                this.state.offers.map(
                                    offer =>
                                        <Card style={{height:120, width: 300, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                            marginTop:-20,marginLeft:-20,marginRight:-20}}>
                                            <Card.Body style={{ marginTop:-30,marginLeft:-40,marginRight:-40}}>
                                                <Card.Title>
                                                    {offer.userName}
                                                </Card.Title>
                                                <Card.Text>
                                                    <Row>
                                                        <Col xs={6} md={4}>
                                                        </Col>
                                                        <Col xs={6} md={4} style={{marginTop:8}}>
                                                            {offer.offer}
                                                        </Col>
                                                        <Col xs={6} md={4} >
                                                            <Button variant="outline-light" style={{marginLeft:15,marginBottom:0}}>
                                                                <BsTrash onClick={() => this.deleteOffer(offer.id)}/>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                )
                            }
                        </Col>

                        <Col className="panel-container" style={{opacity:0.9}}>
                            <Row>
                                <Col>
                                    <input placeholder="Club Name" name="clubName" className="form-control"
                                           value={this.state.parentName} onChange={this.changeParentName}/>
                                </Col>
                            </Row>
                            <Row style={{marginTop:10}}>
                                <Col>
                                    <input placeholder="Sub Club Name" name="clubName" className="form-control"
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
                                    <Button style={{width:200 ,margin:"auto"}} variant="outline-light"  onClick={this.saveClub}>Add Club</Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

        )
    }

}

export default withRouter(createClub);