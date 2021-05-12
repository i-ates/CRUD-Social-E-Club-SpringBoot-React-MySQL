import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";


export default class BanUser extends Component {

    render() {

        return (

            <div>
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
                        <FormControl type="text" placeholder="Enter an username" style={{marginTop:15}}>

                        </FormControl>

                        <Button variant="outline-light" type="submit" style={{marginTop:35, marginLeft:20}}>
                            Ban User
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}