import React, {Component} from 'react';
import Rate from "./rate";
import ClubService from "../services/club.service";
import AuthService from "../services/auth.service";
import { VscStarFull } from "react-icons/vsc";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


class ClubPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 0.0,
            showPrivateMessage: false,
            showRateBoard: false,
            currentUser: undefined,
            clubId: this.props.match.params.id,
            comments:[],
            events:[]
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user && this.props.location.state) {
            this.setState({
                currentUser: user,
                showRateBoard: user.roles.includes("ROLE_USER"),
            });
        }

        ClubService.getRate(this.state.clubId).then((res) =>{
            this.setState({rate: res.data})});

        ClubService.getComment(this.state.clubId).then((res) =>{
            this.setState({comments: res.data})});
        ClubService.getEvent(this.state.clubId).then((res) =>{
            this.setState({events: res.data})});
        console.log("adsadsa")
        console.log(this.state.events)
        console.log(this.state.comments)
    }

    render() {
        return (
            <div>
                <Row>
                <Col className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                    height:600,opacity:0.9,marginTop:0}}>
                    <Card style={{ width: 430, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                        <Card.Body>
                            <Card.Title>Message Title</Card.Title>
                            <Card.Text>
                                Bla bla Bla bla Bla bla Bla bla
                            </Card.Text>
                            <Card.Text>
                                Sender(Username)
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button href="#" variant="outline-light">Reply</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: 430, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                        <Card.Body>
                            <Card.Title>Message Title</Card.Title>
                            <Card.Text>
                                Bla bla Bla bla Bla bla Bla bla
                            </Card.Text>
                            <Card.Text>
                                Sender(Username)
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button href="#" variant="outline-light">Reply</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: 430, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                        <Card.Body>
                            <Card.Title>Message Title</Card.Title>
                            <Card.Text>
                                Bla bla Bla bla Bla bla Bla bla
                            </Card.Text>
                            <Card.Text>
                                Sender(Username)
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button href="#" variant="outline-light">Reply</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Row className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                        height:290,opacity:0.9,marginTop:0,marginBottom:10, maxWidth:377}}>
                        {
                            this.state.events.map(
                                event =>
                                    <Card style={{ width: 350, height:270, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                                        <Card.Body>
                                            <Card.Title>{event.title}</Card.Title>
                                            <Card.Text>
                                                {event.content}
                                            </Card.Text>
                                            <Card.Text>
                                                {event.username}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body>
                                            <Button href="#" variant="outline-light" >Join Event</Button>
                                        </Card.Body>
                                    </Card>
                            )
                        }

                    </Row>
                    <Row>
                        <div className='panel-container' style={{marginTop:0,marginBottom:0,overflowY: "scroll",scrollBehaviour: "smooth",
                            height:300,opacity:0.9 , maxWidth:377}}>
                            <h2 className='text-center'>Comments </h2>
                            <table className="table table-striped table-bordered" style={{color:"white", backgroundColor: "#05082B",opacity: 0.8}}>
                                <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>Users Comment</th>
                                    <th>Rate</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.comments.map(
                                        comment =>
                                            <tr key ={comment.id}>
                                                <th>{comment.userId}</th>
                                                <th>{comment.comment}</th>
                                                <th>
                                                    {comment.rate} <VscStarFull style={{color:"yellow",marginBottom:5}}/>
                                                </th>
                                            </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </Row>
                </Col>
                <Col className="panel-container" style={{height:600,opacity:0.9,marginTop:0,marginBottom:10}}>
                    <Row>
                        <Button style={{width:150,marginLeft:130,marginBottom:20}} variant="outline-light">Send Message</Button>
                        <h5 style={{margin:"auto", paddingBottom:15}}>
                            You want to be admin in this sub club?
                        </h5>
                        <Button style={{width:200,margin:"auto",marginBottom:20}} variant="outline-light"  >Request to be an Admin</Button>
                    </Row>
                    <Row style={{marginTop:50}}>
                        <h3 style={{margin:"auto"}}>Rate Of Club: {this.state.rate.toFixed(1)}</h3>
                        {
                          this.state.showRateBoard && <Rate style={{marginTop:20}} clubId={this.state.clubId} />
                        }
                    </Row>
                </Col>
                </Row>

            </div>
        );
    }
}

export default ClubPage;
