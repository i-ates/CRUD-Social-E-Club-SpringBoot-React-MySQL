import React, {Component} from 'react';
import Rate from "./rate";
import ClubService from "../services/club.service";
import AuthService from "../services/auth.service";
import { VscStarFull } from "react-icons/vsc";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BiCalendarPlus } from "react-icons/bi";
import {withRouter} from "react-router-dom";
import {BsTrash} from "react-icons/bs";
import {FaBan} from "react-icons/fa";
import {GrFavorite} from "react-icons/gr";

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
            events:[],
            messages:[],
            username:"",
            showSubClubAdminBoard:false,
            showUserButtons: false,
            isSubClubAdmin: false,
            nameOfClub:"",
            user: AuthService.getCurrentUser()
        }

        this.banUser = this.banUser.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.requestAdmin = this.requestAdmin.bind(this);
    }

    componentDidMount() {


        if (this.state.user && this.props.location.state) {
            this.setState({
                currentUser: this.state.user,
                username: this.state.user.username,
                showRateBoard: this.state.user.roles.includes("ROLE_USER"),
                showSubClubAdminBoard: this.state.user.roles.includes("ROLE_ADMIN"),
                showUserButtons: this.state.user.roles.includes("ROLE_USER"),
            });
            ClubService.checkSubClubAdmin(this.state.user.id, this.state.clubId).then((res) =>{
                this.setState({isSubClubAdmin: res.data})
            });
        }

        ClubService.getClubName(this.state.clubId).then((res) =>{
            this.setState({nameOfClub: res.data})
        });

        ClubService.getRate(this.state.clubId).then((res) =>{
            this.setState({rate: res.data})});

        ClubService.getComment(this.state.clubId).then((res) =>{
            this.setState({comments: res.data})});
        ClubService.getEvent(this.state.clubId).then((res) =>{
            this.setState({events: res.data})});
        if (this.state.user){
            ClubService.getMessages(this.state.clubId,this.state.user.id).then((res) =>
                this.setState({messages: res.data}));
        }else{
            ClubService.getMessages(this.state.clubId,-1).then((res) =>
                this.setState({messages: res.data}));
        }

    }

    showMessage(clubid) {
        this.props.history.push(`/sendmessage/${clubid}`);
    }
    showBanUSer() {
        this.props.history.push(`/subclubadmin`);
    }

    banUser = (id, name) =>{

        ClubService.createBannedUser(id, name, this.state.clubId, this.state.nameOfClub).then();
        window.location.reload();

    }

    requestAdmin = () =>{
        ClubService.createCandidate(this.state.user.id, this.state.clubId).then();
        window.location.reload();
    }

    deleteMessage = async (id) => {
        ClubService.deleteUserMessage(id).then();
        await this.timeout(1000);
        window.location.reload();
    }


    timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                        height:600,opacity:0.9,marginTop:0}}>

                        {
                            this.state.messages.map(
                                message =>
                                    <Card style={{ width: 430, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                                        <Card.Body style={{ marginTop:-30,marginLeft:-40,marginRight:-40}}>
                                            <Card.Title>
                                                {message.title}
                                                {
                                                    (this.state.showSubClubAdminBoard || this.state.isSubClubAdmin) &&
                                                    <Col xs={6} md={4} >
                                                        <Button variant="outline-light" style={{marginLeft:15,marginBottom:0}}>
                                                            <BsTrash onClick={() => this.deleteMessage(message.messageId)}/>
                                                        </Button>
                                                    </Col>
                                                }
                                            </Card.Title>
                                            <Card.Text>
                                                {message.content}
                                            </Card.Text>
                                            <Card.Text>
                                                Sender: {message.username}
                                                {
                                                    (this.state.showSubClubAdminBoard || this.state.isSubClubAdmin) &&
                                                    <Button variant="outline-light" style={{marginLeft:15,marginBottom:0}}>
                                                        <FaBan onClick={() => this.banUser(message.userId, message.username)}
                                                        style={{margin:"auto"}}/>
                                                    </Button>
                                                }
                                            </Card.Text>
                                            {
                                                <Button variant="outline-light" style={{marginLeft:15,marginBottom:0}}>
                                                    <GrFavorite/>
                                                </Button>
                                            }
                                        </Card.Body>
                                    </Card>
                            )
                        }

                    </Col>
                <Col>
                    <Row className="panel-container" style={{overflowY: "scroll",scrollBehaviour: "smooth",
                        height:290,opacity:0.9,marginTop:0,marginBottom:10, maxWidth:377}}>
                        {
                            this.state.events.map(
                                event =>
                                    <Card style={{ width: 350, height:200, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                        marginTop:-20,marginLeft:-20,marginRight:-20}}>
                                        <Card.Body style={{marginTop:-30,marginLeft:-40,marginRight:-40}}>
                                            <Card.Title>
                                                {event.title}
                                            </Card.Title>
                                            <Card.Text>
                                                {event.content}
                                            </Card.Text>
                                            <Card.Text>
                                                {event.username}
                                            </Card.Text>
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
                                    <th>Username</th>
                                    <th>Users Comment</th>
                                    <th>Rate</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.comments.map(
                                        comment =>
                                            <tr key ={comment.id}>
                                                <th>{comment.userName}</th>
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
                        {this.state.showSubClubAdminBoard ? (<div style={{marginBottom:50}}>
                            {this.state.showSubClubAdminBoard && (<div style={{marginLeft:130}}>
                                    <Row style={{marginLeft:10,marginBottom:10}}>
                                        <Button onClick={()=> this.showMessage(this.state.clubId)} style={{width:150,marginBottom:10}} variant="outline-light">
                                            Send Message
                                        </Button>
                                    </Row>
                            </div>
                            )}
                        </div>):(<div>
                            {this.state.showUserButtons && (
                                <div style={{marginLeft:50}}>
                                    <Button onClick={()=> this.showMessage(this.state.clubId)} style={{width:150,marginBottom:10}} variant="outline-light">
                                        Send Message
                                    </Button>
                                    {
                                        (!this.state.isSubClubAdmin && !this.state.showSubClubAdminBoard) && (
                                            <div>
                                                <h5 style={{paddingBottom:15}}>
                                                    You want to be admin in this sub club?
                                                </h5>
                                                <Button onClick={()=> this.requestAdmin()} style={{width:200,marginBottom:20}} variant="outline-light" >Request to be an Admin</Button>
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                        </div>)}
                    </Row>
                    <Row style={{marginTop:50}}>
                        <h3 style={{margin:"auto"}}>Rate Of Club: {this.state.rate.toFixed(1)}
                             <VscStarFull style={{color:"yellow",marginBottom:8,marginLeft:2}}/>
                        </h3>
                        {this.state.showRateBoard ? (<div>
                            <Rate style={{marginTop:20}} clubId={this.state.clubId}
                                  username={this.state.username} />
                        </div>):(<div>
                            <h4 style={{fontFamily:"Arial, Helvetica, Cursive", color:"red", marginTop:50}}>
                                You must be a member to view private messages for club members or
                                to vote on the club. If you are a registered user,
                                you must click the join club button on the Other Club page
                                and answer more than half of the club questions correctly.
                            </h4>
                        </div>)}
                    </Row>
                </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(ClubPage);
