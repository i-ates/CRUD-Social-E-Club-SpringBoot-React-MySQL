import React, {Component} from 'react'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';

class listMyClubs extends Component{

    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
            flag: true
        }

        this.showPage = this.showPage.bind(this);
    }


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser);
        let json= {"id":currentUser.id};
        console.log(currentUser.id)
        UserService.getUserClubs(currentUser.id).then((res) =>{
            this.setState({clubs: res.data});
        }).catch(err=>
        console.log(err.response.data)) ;
    }

    showPage(id) {
        //this.props.history.push(`/club-page/${id}`);
        this.props.history.push(`/club-page/${id}`, this.state.flag);
    }

    render() {
        return (
            <div style={{marginTop:50}}>
                <h2 className='text-center' >My Clubs </h2>
                <div className='row'>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th style={{color:"white"}}>Club Name</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.clubs.map(
                                club =>
                                    <tr key ={club.id}>
                                        <td>
                                            <button variant="warning" onClick={() => this.showPage(club.id)} >
                                                {club.clubName}
                                            </button>

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

export default withRouter(listMyClubs);