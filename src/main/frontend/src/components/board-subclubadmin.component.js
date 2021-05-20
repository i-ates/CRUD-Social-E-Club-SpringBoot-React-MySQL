import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class BoardSubClubAdminComponent extends Component {
    render() {
        return (
            <div  className="panel-container">
                <Row>
                    <Col sm style={{marginTop:50, marginLeft:50}}>
                        <p>
                            Banned Users
                        </p>
                        <p>
                            USER-1
                        </p>
                        <p>
                            USER-2
                        </p>
                        <p>
                            USER-3
                        </p>
                    </Col>

                    <Col sm style={{marginTop:50, marginRight:150}}>
                        <Row>
                            <FormControl type="text" placeholder="Enter an username" style={{marginTop:15}}>

                            </FormControl>
                        </Row>
                        <Row>
                            <Button variant="outline-light" type="submit" style={{margin:"auto",marginTop:35}}>
                                Search User
                            </Button>
                        </Row>
                        <Row>
                            <Card style={{ width: 430, backgroundColor: "#3E1875", opacity: 0.9, borderRadius: 50,
                                margin:"auto",marginTop:35}}>
                                <Card.Body style={{ marginTop:-30,marginLeft:-40,marginRight:-40,marginBottom:-30}}>
                                    <Card.Text>
                                        User banned X times
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="outline-light" type="submit" style={{margin:"auto",marginTop:35}}>
                                    Kick User
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="outline-light" type="submit" style={{margin:"auto",marginTop:35}}>
                                    Ban User
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="outline-light" type="submit" style={{margin:"auto",marginTop:35}}>
                                    Unban User
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BoardSubClubAdminComponent;