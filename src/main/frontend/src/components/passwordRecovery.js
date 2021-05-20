import React, {Component} from 'react';
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class PasswordRecovery extends Component {

    showPage() {
        this.props.history.push(`/newpassword`);
    }

    render() {
        return (
            <div  className="panel-container" style={{marginTop:150,width:500}}>
                <h2>Password Recovery</h2>
                <FormControl type="text" placeholder="Enter your e-mail" style={{marginTop:15}}>

                </FormControl>

                <Button variant="outline-light" type="submit" style={{marginTop:35, marginLeft:20}}
                        onClick={() => this.showPage()} >
                    Send Mail
                </Button>
            </div>
        );
    }
}

export default PasswordRecovery;