import React, {Component, useState} from 'react';
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa";
import ClubService from "../services/club.service";
import AuthService from "../services/auth.service";

import StarRatingComponent from 'react-star-rating-component';


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
            id:-1,
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

    saveRate = (e) => {
        const currentUser = AuthService.getCurrentUser();
        this.setState({id: currentUser.id})
        ClubService.createRate(this.state.id, this.props.clubId, this.state.comm, this.state.rating).then();
        window.location.reload();
    }

    render() {
        const { rating } = this.state;

        return (
            <div>
                <h2> Give Rate</h2>
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
                <textarea value={this.state.comm} onChange={this.saveComment}
                          placeholder="Leave a comment"
                          style={styles.textarea}
                />

                <button
                    style={styles.button} onClick={this.saveRate}
                >
                    Rate Club
                </button>
            </div>
        );
    }
}

export default Rate;