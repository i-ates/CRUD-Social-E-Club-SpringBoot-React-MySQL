import React, {Component} from 'react';
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";


class PasswordRecovery extends Component {

    constructor() {
        super();
        this.state = {
            email:"",
        }
    }


    setEmail = (event) =>{
        this.setState({email: event.target.value});
    }


    render() {
        return (
            <div className="panel-container" style={{marginTop:150,width:500}}>
                <h2>Password Recovery</h2>
                <FormControl type="text" placeholder="Enter your e-mail" style={{marginTop:15}}
                             onChange={this.setEmail}/>
                <Button variant="outline-light" type="submit" style={{marginTop:35, marginLeft:20}}>
                    Send Mail
                </Button>
            </div>
        );
    }
}

export default PasswordRecovery;