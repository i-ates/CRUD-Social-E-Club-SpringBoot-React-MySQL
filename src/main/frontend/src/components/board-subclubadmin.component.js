import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {FaBan} from "react-icons/fa";
import {BsTrash} from "react-icons/bs";

class BoardSubClubAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applies:[]
        }
    }
    render() {
        return (
            <div  className="panel-container">
                <Row>
                    <table className="table table-striped table-bordered" style={{backgroundColor: "#05082B",opacity: 0.8}}>
                        <thead>
                        <tr>
                            <th style={{color:"white",fontSize:25}}>Club Name,clubId</th>
                            <th style={{color:"white",fontSize:25}}>Username,userId</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.applies.map(
                                apply =>
                                    <tr key ={apply.id}>
                                        <td style={{color:"white",fontSize:20}}>
                                            {apply.clubName}{apply.clubId}
                                        </td>
                                        <td style={{color:"white",fontSize:20}}>
                                            {apply.username} {apply.userId}
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

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