import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import {Redirect} from "react-router-dom";
import UserService from "../services/user.service";


export default class ManageUser extends Component {
    constructor(props) {
        super(props);
        // this.onchangeUsername = this.onchangeUsername.bind(this);
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            users : [],
            area:"",
            area2:"",
            userId: -1,
        };
    }

    componentDidMount() {


    }
    onchangeArea(e){
        this.setState({
            area: e.target.value
        });
    }
    onchangeArea2(e){
        this.setState({
            area2: e.target.value
        });
    }
    onchangeArea3(e){
        this.setState({
            userId: e.target.value
        });
    }
    updateName(area){
        UserService.updateUserInfo(this.state.userId, area, "fullname");
        this.navigate();
    }
    updateCity(area){
        UserService.updateUserInfo(this.state.userId, area, "city");
        this.navigate();
    }
    updateBio(area){
        UserService.updateUserInfo(this.state.userId, area, "bio");
        this.navigate();
    }
    updateUserId(userId){
        UserService.getUserInfo(userId).then((res) =>{
            this.setState({users: res.data});
        }).catch(err=>
            console.log(err.response.data)) ;
    }

    async navigate() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateUserId(this.state.userId)
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <Row>
                    <Col sm style={{marginTop:50, marginLeft:40}}>
                        <Row style={{marginRight:10}}>
                            <Col xs={10}>
                                <InputGroup size="sm" className="mb-3"  onChange={e=>this.onchangeArea3(e)}>
                                    <FormControl type="text" placeholder="Enter an username id" style={{textAlign:"center"}}/>
                                </InputGroup>
                            </Col>
                            <Col xs={1}>
                                <Button variant="outline-light" onClick={o=>this.updateUserId(this.state.userId)}>
                                    Select
                                </Button>
                            </Col>
                        </Row>
                        <Row>

                                <h2 style={{margin:"auto",marginTop:20}}> User Info </h2>

                                    <Table style={{color:"white", backgroundColor: "#05082B",opacity: 0.8,marginRight:20}}
                                           striped bordered size="sm">
                                        <thead>
                                        <tr>
                                            <th>User Name</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map(
                                                user =>
                                                    <tr key ={user.id}>
                                                        <td>{user.username}</td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                        <thead>
                                        <tr>
                                            <th>Full Name</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map(
                                                user =>
                                                    <tr key ={user.id}>
                                                        <td>{user.fullname}</td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                        <thead>
                                        <tr>
                                            <th>Biography</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map(
                                                user =>
                                                    <tr key ={user.id}>
                                                        <td>{user.bio}</td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                        <thead>
                                        <tr>
                                            <th>City</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map(
                                                user =>
                                                    <tr key ={user.id}>
                                                        <td>{user.city}</td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                        <thead>
                                        <tr>
                                            <th>E-Mail</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map(
                                                user =>
                                                    <tr key ={user.id}>
                                                        <td>{user.email}</td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                        <thead>
                                        <tr>
                                            <th>Roles</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map(
                                                user =>
                                                    <td>{user.roles.map(
                                                        role =>
                                                            <div>
                                                                {role.name}
                                                            </div>
                                                    )}</td>
                                            )
                                        }
                                        </tbody>
                                    </Table>

                        </Row>
                    </Col>

                    <Col sm style={{marginTop:155, marginRight:30, height:300}} className="panel-container">
                        <InputGroup size="sm" className="mb-3"  onChange={e=>this.onchangeArea(e)}>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                        </InputGroup>

                        <ButtonGroup vertical>
                            <Button style={{width:130, marginLeft:40, marginTop:15}} variant="outline-light" onClick={o=>this.updateName(this.state.area)}>Update Name</Button>
                        </ButtonGroup>

                        <ButtonGroup vertical>
                            <Button style={{width:120, marginLeft:120, marginTop:15}}variant="outline-light" onClick={o=>this.updateCity(this.state.area)}>Update City</Button>
                        </ButtonGroup>

                        <InputGroup>
                            <FormControl as="textarea" aria-label="With textarea" style={{marginTop:25}} onChange={e=>this.onchangeArea2(e)} />
                        </InputGroup>

                        <ButtonGroup vertical>
                            <Button style={{width:180, marginTop:25}} variant="outline-light"  onClick={o=>this.updateBio(this.state.area2)}>Update Biography</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}