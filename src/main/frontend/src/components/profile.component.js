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
import ListGroup from 'react-bootstrap/ListGroup'
import UserService from "../services/user.service";
import Table from 'react-bootstrap/Table'


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      users : []

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
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
        <Container>

          <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={1} title="Edit Profile">
              <Row>
                <Col>
                  <div className="container mt-3">
                    {(this.state.userReady) ?
                        <div>
                          <h2 className='text-center'>User Info </h2>
                          <div className='row'>
                            <Table striped bordered hover size="sm">
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
                            </Table>
                            <Table striped bordered hover size="sm">
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
                            </Table>
                            <Table striped bordered hover size="sm">
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
                            </Table>
                            <Table striped bordered hover size="sm">
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
                            </Table>
                            <Table striped bordered hover size="sm">
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
                            </Table>
                            <Table striped bordered hover size="sm">
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

                <Col style={{marginTop:62}}>
                  <Container>
                    <Row>
                      <InputGroup size="sm" className="mb-3">
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col>
                        <ButtonGroup vertical>
                          <Col xs={5}><Button style={{width:150}} variant="dark">Update Name</Button></Col>
                        </ButtonGroup>
                      </Col>
                      <Col>
                        <ButtonGroup vertical>
                          <Col xs={5}><Button style={{width:150}}variant="dark">Update City</Button></Col>
                        </ButtonGroup>
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row style={{marginTop:62}}>
                      <InputGroup>
                        <FormControl as="textarea" aria-label="With textarea" />
                      </InputGroup>
                    </Row>
                    <Row style={{marginTop:20}}>
                      <Col></Col>
                      <Col xs={6}>
                        <ButtonGroup vertical>
                          <Col ><Button style={{width:200}} variant="dark">Update Biography</Button></Col>
                        </ButtonGroup>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

            </Tab>
            <Tab eventKey={2} title="Change Password">
              <div className="container mt-3">
                <h3>
                  Will serve as soon as possible.
                </h3>
              </div>
            </Tab>
          </Tabs>
        </Container>
    );
  }
}
