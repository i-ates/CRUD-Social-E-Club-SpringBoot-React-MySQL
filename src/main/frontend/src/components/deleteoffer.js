import React, {Component} from 'react';
import ClubService from "../services/club.service";
import {withRouter} from "react-router-dom";
import Button from "react-bootstrap/Button";

class Deleteoffer extends Component {
    constructor(props) {
        super(props);

        this.deleteOffer = this.deleteOffer.bind(this);
    }
    backAdminPanel() {
        this.props.history.push(`/admin`);
    }
    deleteOffer = () =>{
        ClubService.deleteOffer(this.props.location.state).then();
    }
    render() {
        return (
            <div className="panel-container"  style={{marginTop:80, width:600, opacity:0.9}}>
                <h3>Are you sure about deleting this offer?</h3>
                <Button variant="outline-light" onClick={() => this.deleteOffer()}
                        style={{marginTop:20,marginRight:20}}  >Yes</Button>
                <Button variant="outline-light" style={{marginTop:20}}
                        onClick={() => this.backAdminPanel()}>No</Button>
            </div>
        );
    }
}

export default withRouter(Deleteoffer);