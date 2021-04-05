import React, {Component} from 'react'
import UserService from "../services/user.service";

class ListClubs extends Component{

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
                            <th>Active User</th>
                            <th>Registered User</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.clubs.map(
                                club =>
                                    <tr key ={club.id}>
                                        <td>{club.clubName}</td>
                                        <td>{club.activeUser}</td>
                                        <td>{club.registeredUser}</td>
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

export default ListClubs