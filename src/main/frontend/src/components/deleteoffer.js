import React, {Component} from 'react';
import ClubService from "../services/club.service";
import {withRouter} from "react-router-dom";

class Deleteoffer extends Component {
    constructor(props) {
        super(props);

        this.deleteOffer = this.deleteOffer.bind(this);
    }

    deleteOffer = () =>{
        ClubService.deleteOffer(this.props.location.state).then();
    }
    render() {
        return (
            <div>
                <h3>Are you sure for deleting this offer?</h3>
                <button color="green" onClick={() => this.deleteOffer()}>Yes</button>
                <button color="red">No</button>
            </div>
        );
    }
}

export default withRouter(Deleteoffer);