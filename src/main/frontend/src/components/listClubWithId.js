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
            <div>
                <h2 className='text-center'>Clubs </h2>
                <div className='row'>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Club Name</th>
                            <th>Id</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.clubs.map(
                                club =>
                                    <tr key ={club.id}>
                                        <td>
                                            <Link to={"/"+club.clubName} >
                                                {club.clubName}
                                            </Link></td>
                                        <td>
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