import React, {Component} from 'react';
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class NewPassword extends Component {


    showPage() {
        this.props.history.push(`/login`);
    }

    render() {
        return (
            <div  className="panel-container" style={{marginTop:150,width:500}}>
                <h2>New Password</h2>
                <FormControl type="text" placeholder="New Password" style={{marginTop:15}}>

                </FormControl>
                <FormControl type="text" placeholder="Confirm New Password" style={{marginTop:15}}>

                </FormControl>

                <Button variant="outline-light" type="submit" style={{marginTop:15, marginLeft:20}}
                        onClick={() => this.showPage()} >
                    Change Password
                </Button>
            </div>
        );
    }
}

export default NewPassword;