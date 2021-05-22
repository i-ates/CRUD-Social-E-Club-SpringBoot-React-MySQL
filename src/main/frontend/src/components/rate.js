import React, {Component, useState} from 'react';
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa";
import ClubService from "../services/club.service";
import AuthService from "../services/auth.service";

import StarRatingComponent from 'react-star-rating-component';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",

    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        background: "orange",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};

class Rate extends React.Component {
    constructor() {
        super();

        this.state = {
            comm:"",
            rating: 1

        };

        this.saveRate = this.saveRate.bind(this);
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    saveComment = (event) =>{
        this.setState({comm: event.target.value});
    }

    saveRate = async (e) => {
        const currentUser = AuthService.getCurrentUser();
        ClubService.createRate(currentUser.id, this.props.username, this.props.clubId, this.state.comm, this.state.rating).then();
        await this.timeout(2000);
        window.location.reload();
    }

    timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    render() {
        const { rating } = this.state;

        return (
            <div style={{marginLeft:90}}>
                <Row style={{marginLeft:100}}>
                    <StarRatingComponent name="rate1" starCount={5} value={rating} onStarClick={this.onStarClick.bind(this)}/>
                </Row>
                <Row>
                    <textarea value={this.state.comm} onChange={this.saveComment} placeholder="Leave a comment" style={styles.textarea}/>
                </Row>
                <Row>
                    <Button variant="outline-light" style={{width:150, margin:"auto"}} onClick={this.saveRate} >
                        Rate Club
                    </Button>
                </Row>
            </div>
        );
    }
}

export default Rate;