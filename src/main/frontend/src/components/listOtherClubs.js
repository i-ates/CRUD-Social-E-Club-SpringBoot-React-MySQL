import React, {Component} from 'react';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

class listOtherClubs extends Component{

    constructor(props) {
        super(props);

        this.state = {
            clubs: []
        }
    }


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser);
        let json= {"id":currentUser.id};
        console.log(currentUser.id)
        UserService.getOtherClubs(currentUser.id).then((res) =>{
            this.setState({clubs: res.data});
        }).catch(err=>
            console.log(err.response.data)) ;
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Other Clubs </h2>
                <div className='row'>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Club Name</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.clubs.map(
                                club =>
                                    <tr key ={club}>
                                        <td>{club}</td>

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

export default listOtherClubs