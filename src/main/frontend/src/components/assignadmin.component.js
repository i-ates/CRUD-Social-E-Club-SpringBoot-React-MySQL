import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";


export default class AssignAdmin extends Component {

    render() {

        return (

            <div  className="panel-container">
                <Row>
                    <Col sm style={{marginTop:50}}>
                        <p>
                            SUB CLUB-1
                        </p>
                        <p>
                            SUB CLUB-2
                        </p>
                        <p>
                            SUB CLUB-3
                        </p>
                        <p>
                            SUB CLUB-4
                        </p>
                    </Col>

                    <Col sm style={{marginTop:50}}>
                        <p>
                            Current Sub club Admin
                            USER-X
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

                    <Col sm style={{marginTop:50}}>
                        <FormControl type="text" placeholder="Enter a sub club name">

                        </FormControl>

                        <FormControl type="text" placeholder="Enter an username" style={{marginTop:15}}>

                        </FormControl>

                        <Button variant="outline-light" type="submit" style={{marginTop:15}}>
                            Update Admin
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}