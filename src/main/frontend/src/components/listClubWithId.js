import React, {Component} from 'react'
import UserService from "../services/user.service";
import {Link, withRouter} from "react-router-dom";
import Button from "react-bootstrap/Button";

class ListClubWithId extends Component{

    constructor(props) {
        super(props);

        this.state = {
            clubs: []
        }
        this.showPage = this.showPage.bind(this);
    }


    componentDidMount() {
        UserService.getClubs().then((res) =>{
            this.setState({clubs: res.data});
        });
    }
    showPage(id) {
        this.props.history.push(`/club-page/${id}`);
    }
    render() {
        return (
            <div style={{marginTop:50}}>
                <h2 className='text-center'>Clubs </h2>
                <div className='row'>
                    <table className="table table-striped table-bordered" style={{backgroundColor: "#05082B",opacity: 0.8}}>
                        <thead>
                        <tr>
                            <th style={{color:"white"}}>Club Name</th>
                            <th style={{color:"white"}}>Id</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.clubs.map(
                                club =>
                                    <tr key ={club.id}>
                                        <td>
                                            <Button variant="None" style={{color:"white"}} onClick={() => this.showPage(club.id)} >
                                                {club.clubName}
                                            </Button>
                                        </td>
                                        <td style={{color:"white"}}>
                                            {club.id}
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}

export default withRouter(ListClubWithId);