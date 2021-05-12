import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import {Tab, Tabs} from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import UserService from "../services/user.service";
import Table from 'react-bootstrap/Table'


export default class Profile extends Component {
  constructor(props) {
    super(props);
    // this.onchangeUsername = this.onchangeUsername.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      users : [],
      area:"",
      area2:""

    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    console.log(currentUser.id)
    UserService.getUserInfo(currentUser.id).then((res) =>{
      this.setState({users: res.data});
    }).catch(err=>
        console.log(err.response.data)) ;
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
  updateName(area){
    UserService.updateUserInfo(this.state.currentUser.id, area, "fullname");
    this.navigate();
  }
  updateCity(area){
    UserService.updateUserInfo(this.state.currentUser.id, area, "city");
    this.navigate();
  }
  updateBio(area){
    UserService.updateUserInfo(this.state.currentUser.id, area, "bio");
    this.navigate();
  }

  async navigate() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
        <div>
          <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={1} title="Edit Profile">
              <Row style={{marginTop:50}}>
                <Col>
                  <div>
                    {(this.state.userReady) ?
                        <div>
                          <h2 className='text-center'>User Info </h2>
                          <div className='row'>
                            <Table style={{color:"white", backgroundColor: "#05082B",opacity: 0.8}} striped bordered size="sm">
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
                                            <tr key ={user.id}>
                                              <td>{user.roles.map(
                                                  role =>
                                                      <tr key ={role}>
                                                        <td>{role.name}</td>
                                                      </tr>
                                              )}</td>
                                            </tr>
                                    )
                                  }
                                  </tbody>
                            </Table>

                          </div>
                        </div>: null}
                  </div>

                </Col>

                <Col style={{marginTop:45}}>
                  <div className="panel-container">
                    <Row>
                      <InputGroup style={{width:800}} size="sm" className="mb-3"  onChange={e=>this.onchangeArea(e)}>
                        <FormControl/>
                      </InputGroup>
                    </Row>
                    <Row>
                      <Col>
                        <ButtonGroup vertical>
                          <Col xs={5}><Button style={{width:200,marginLeft:10}} variant="outline-light" onClick={o=>this.updateName(this.state.area)}>Update Full Name</Button></Col>
                        </ButtonGroup>
                      </Col>
                      <Col>
                        <ButtonGroup vertical>
                          <Col xs={5}><Button style={{width:150}} variant="outline-light" onClick={o=>this.updateCity(this.state.area)}>Update City</Button></Col>
                        </ButtonGroup>
                      </Col>
                    </Row>
                    <Row style={{marginTop:62}}>
                      <InputGroup>
                        <FormControl style={{width:500}} as="textarea" aria-label="With textarea" onChange={e=>this.onchangeArea2(e)} />
                      </InputGroup>
                    </Row>
                    <Row style={{marginTop:20}}>
                      <Col xs={6}>
                        <ButtonGroup vertical>
                          <Col ><Button style={{width:200,marginLeft:285}} variant="outline-light"  onClick={o=>this.updateBio(this.state.area2)}>Update Biography</Button></Col>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

            </Tab>
            <Tab eventKey={2} title="Change Password">
              <div className="panel-container">
                <Row>
                  <Col></Col>
                  <Col xs={6} style={{marginTop:50}}>
                    <Row style={{marginTop:20}}>
                      <InputGroup size="sm" className="mb-3" >
                        <FormControl placeholder="Old Password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                    </Row>
                    <Row style={{marginTop:20}}>
                      <InputGroup size="sm" className="mb-3" >
                        <FormControl placeholder="New Password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                    </Row>
                    <Row style={{marginTop:20}}>
                      <InputGroup size="sm" className="mb-3" >
                        <FormControl placeholder="Confirm New Password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col xs={6}>
                        <ButtonGroup vertical>
                          <Col ><Button style={{width:200,marginTop:20}} variant="outline-light">Submit</Button></Col>
                        </ButtonGroup>
                      </Col>
                      <Col>
                      </Col>
                    </Row>
                  </Col>
                  <Col></Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </div>
    );
  }
}
