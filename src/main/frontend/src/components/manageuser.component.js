import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";


export default class ManageUser extends Component {

    render() {

        return (

            <Container>
                <Row>
                    <Col sm style={{marginTop:50, marginLeft:30}}>
                        <Row>
                            <Col xs={7}><FormControl type="text" placeholder="Search an user"></FormControl></Col>
                            <Col xs={5}><Button variant="dark">Search</Button></Col>
                        </Row>

                        <Row>
                            <Table striped bordered hover size={50} style={{marginTop:25, marginLeft:15, width:372}}>
                                <thead>
                                <tr>
                                    <th>User Name</th>
                                </tr>
                                </thead>
                                <thead>
                                <tr>
                                    <th>Full Name</th>
                                </tr>
                                </thead>
                                <thead>
                                <tr>
                                    <th>Biography</th>
                                </tr>
                                </thead>
                                <thead>
                                <tr>
                                    <th>City</th>
                                </tr>
                                </thead>
                                <thead>
                                <tr>
                                    <th>E-Mail</th>
                                </tr>
                                </thead>
                                <thead>
                                <tr>
                                    <th>Roles</th>
                                </tr>
                                </thead>
                            </Table>
                        </Row>
                    </Col>

                    <Col sm style={{marginTop:50, marginRight:30}}>
                        <InputGroup size="sm" className="mb-3"  onChange={e=>this.onchangeArea(e)}>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                        </InputGroup>

                        <ButtonGroup vertical>
                            <Button style={{width:130, marginLeft:50, marginTop:15}} variant="dark" onClick={o=>this.updateName(this.state.area)}>Update Name</Button>
                        </ButtonGroup>

                        <ButtonGroup vertical>
                            <Button style={{width:120, marginLeft:150, marginTop:15}}variant="dark" onClick={o=>this.updateCity(this.state.area)}>Update City</Button>
                        </ButtonGroup>

                        <InputGroup>
                            <FormControl as="textarea" aria-label="With textarea" style={{marginTop:25}} onChange={e=>this.onchangeArea2(e)} />
                        </InputGroup>

                        <ButtonGroup vertical>
                            <Button style={{width:180, marginLeft:150, marginTop:25}} variant="dark"  onClick={o=>this.updateBio(this.state.area2)}>Update Biography</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>

        )
    }
}