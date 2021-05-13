import React, {Component} from 'react'
import UserService from "../services/user.service";
import {Link} from "react-router-dom";

class ListClubWithId extends Component{

    constructor(props) {
        super(props);

        this.state = {
            clubs: []
        }
    }


    componentDidMount() {
        UserService.getClubs().then((res) =>{
            this.setState({clubs: res.data});
        });
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
                                            <Link to={"/"+club.clubName} style={{color:"white"}}>
                                                {club.clubName}
                                            </Link></td>
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

export default ListClubWithId;