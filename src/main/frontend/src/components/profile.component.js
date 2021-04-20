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


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
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
                          <p>
                            <h3>
                              <strong>{currentUser.username}</strong> Profile
                            </h3>
                          </p>
                          <p>
                            <strong>Token:</strong>{" "}
                            {currentUser.accessToken.substring(0, 20)} ...{" "}
                            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                          </p>
                          <p>
                            <strong>Id:</strong>{" "}
                            {currentUser.id}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            {currentUser.email}
                          </p>
                          <strong>Authorities:</strong>
                          <ul>
                            {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                          </ul>
                        </div>: null}
                  </div>
                </Col>
                <Col>
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
                          <Col xs={5}><Button>Update Name</Button></Col>
                        </ButtonGroup>
                      </Col>
                      <Col>
                        <ButtonGroup vertical>
                          <Col xs={5}><Button>Update City</Button></Col>
                        </ButtonGroup>
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row>
                      <p>

                      </p>
                    </Row>
                    <Row>
                      <InputGroup>
                        <FormControl as="textarea" aria-label="With textarea" />
                      </InputGroup>
                    </Row>
                    <Row>
                      <p>

                      </p>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col xs={6}>
                        <ButtonGroup vertical>
                          <Col ><Button>Update Biography</Button></Col>
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
