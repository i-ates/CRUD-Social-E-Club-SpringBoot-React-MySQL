import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";


export default class DeleteClub extends Component {

    render() {

        return (

            <Container>
                <Row>
                    <Col style={{marginTop:70,marginLeft:100}}>
                        <p>
                            SubCLUB-1 inactive for x days y hours
                        </p>
                        <p>
                            SubCLUB-2 inactive for x days y hours
                        </p>
                        <p>
                            SubCLUB-3 inactive for x days y hours
                        </p>
                    </Col>
                    <Col>
                        <div className="container mt-3">
                            <Row>
                                <Col></Col>
                                <Col xs={6} style={{marginTop:50}}>
                                    <Row style={{marginTop:20}}>
                                        <InputGroup size="lg" className="mb-3" >
                                            <FormControl placeholder="Club ID" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <Col></Col>
                                        <Col>
                                            <ButtonGroup vertical>
                                                <Col ><Button style={{marginLeft:15,width:150,marginTop:20}} variant="dark">Delete Club</Button></Col>
                                            </ButtonGroup>
                                        </Col>
                                        <Col>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

        )
    }

}