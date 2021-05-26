import React, {Component} from 'react'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import {RiUserFollowFill, RiUserUnfollowFill} from "react-icons/ri";
import {BsSearch} from "react-icons/bs";
import Card from "react-bootstrap/Card";
import {CgProfile} from "react-icons/cg";
import {IoEnter} from "react-icons/io5";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class SearchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
            flag: true,
            clubs2: [],
            flag2: true,
            setSearchTerm:"",
            searchTerm:"",
            users : [],
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            clubs3: [],
        }
        this.showPage = this.showPage.bind(this);
        this.showPage2 = this.showPage2.bind(this);
    }


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            this.setState({
                currentUser: currentUser,
                showModeratorBoard: currentUser.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: currentUser.roles.includes("ROLE_ADMIN"),
            });
            UserService.getOtherClubs(currentUser.id).then((res) =>{
                this.setState({clubs2: res.data});
            }).catch(err=>
                console.log(err.response.data)) ;

            UserService.getUserClubs(currentUser.id).then((res) =>{
                this.setState({clubs: res.data});
            }).catch(err=>
                console.log(err.response.data)) ;

            UserService.getCommonUsers(currentUser.id).then((res) =>{
                this.setState({users: res.data});
            }).catch(err=>
                console.log(err.response.data)) ;
            console.log(this.state.users)
        }

        UserService.getClubs().then((res) =>{
            this.setState({clubs3: res.data});
        });
    }

    showPage(id) {
        this.props.history.push(`/club-page/${id}`, this.state.flag);
    }
    showPage2(id) {
        this.props.history.push(`/club-page/${id}`, this.state.flag2);
    }

    showPage3(id) {
        this.props.history.push(`/club-page/${id}`);
    }

    showUser(id) {
        this.props.history.push(`/user-page/${id}`);
    }
    setSearchTerm = (event) =>{
        this.setState({searchTerm: event.target.value});
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;
        return (
            <div className="panel-container" style={{maxHeight:600}}>
                {
                    currentUser ? (
                    <div>
                        <BsSearch size={25} style={{marginBottom: 6, marginRight: 5}}/>
                        <input className="input" type="text" placeholder="Enter Club or Username"
                               onChange={this.setSearchTerm}/>
                        <div>
                            <Row>

                                <Col style={{overflowY: "scroll",scrollBehaviour: "smooth", marginRight:50, maxHeight:400}}>
                                    <h2>Members of the same sub-clubs</h2>
                                    {
                                        this.state.users.filter((user) => {
                                                if (this.state.searchTerm == "") {
                                                    return user.username
                                                } else if (user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                                    return user.username
                                                }
                                            }
                                        ).map(
                                            user =>
                                                <Card style={{
                                                    width: 300, display: "inline-block", marginRight: 10, borderRadius: 25,
                                                    marginTop: 20, marginBottom: 0, opacity:1
                                                }}>
                                                    <Button variant="None" style={{color: "white", fontSize: 20}}
                                                            onClick={() => this.showUser(user.userId)}>
                                                        <CgProfile size={25}
                                                                   style={{marginBottom: 3, marginRight: 5}}/> {user.username}
                                                    </Button>
                                                </Card>
                                        )
                                    }
                                </Col>

                                <Col style={{overflowY: "scroll",scrollBehaviour: "smooth", marginRight:50, maxHeight:400}}>
                                    <h2>Sub-clubs</h2>
                                    {
                                        this.state.clubs.filter((club) => {
                                                if (this.state.searchTerm == "") {
                                                    return club.clubName
                                                } else if (club.clubName.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                                    return club.clubName
                                                }
                                            }
                                        ).map(
                                            club2 =>
                                                <Card style={{
                                                    width: 300,
                                                    display: "inline-block",
                                                    marginRight: 10,
                                                    borderRadius: 25,
                                                    marginTop: 20,
                                                    marginBottom: 0,
                                                    opacity:1
                                                }}>
                                                    <Button variant="None" style={{color: "white", fontSize: 20}}
                                                            onClick={() => this.showPage(club2.id)}>
                                                        <RiUserFollowFill size={25} style={{
                                                            marginBottom: 6,
                                                            marginRight: 5
                                                        }}/> {club2.clubName}
                                                    </Button>
                                                </Card>
                                        )
                                    }
                                    {
                                        this.state.clubs2.filter((club) => {
                                                if (this.state.searchTerm == "") {
                                                    return club.clubName
                                                } else if (club.clubName.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                                    return club.clubName
                                                }
                                            }
                                        ).map(
                                            club2 =>
                                                <Card style={{
                                                    width: 300, display: "inline-block", marginRight: 10, borderRadius: 25,
                                                    marginTop: 20, marginBottom: 0
                                                }}>
                                                    <Button variant="None" style={{color: "white", fontSize: 20}}
                                                            onClick={() => this.showPage2(club2.id)}>
                                                        <RiUserUnfollowFill size={25} style={{
                                                            marginBottom: 6,
                                                            marginRight: 5
                                                        }}/> {club2.clubName}
                                                    </Button>
                                                </Card>
                                        )
                                    }
                                </Col>


                            </Row>
                        </div>
                    </div>
                ) : (
                    <div>
                        <BsSearch size={25} style={{marginBottom: 6, marginRight: 5}}/>
                        <input className="input" type="text" placeholder="Enter Club or Username"
                               onChange={this.setSearchTerm}/>
                        <div>
                            <h2>Sub-clubs</h2>
                            {
                                this.state.clubs3.filter((club) => {
                                        if (this.state.searchTerm == "") {
                                            return club.clubName
                                        } else if (club.clubName.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                            return club.clubName
                                        }
                                    }
                                ).map(
                                    club =>
                                        <Card style={{
                                            width: 300, display: "inline-block", marginRight: 10, borderRadius: 25,
                                            marginTop: 20, marginBottom: 0
                                        }}>
                                            <Button variant="None" style={{color: "white", fontSize: 20}}
                                                    onClick={() => this.showPage3(club.id)}>
                                                <IoEnter size={25} style={{marginBottom:6,marginRight:5}}/> {club.clubName}
                                            </Button>
                                        </Card>
                                )

                            }
                        </div>


                    </div>
                )


                }
            </div>
        )


    }
}

export default SearchBar;