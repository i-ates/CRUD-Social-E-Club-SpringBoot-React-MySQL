import React, {Component} from 'react'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { RiUserFollowFill } from "react-icons/ri";

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

        let json= {"id":currentUser.id};

        UserService.getUserClubs(currentUser.id).then((res) =>{
            this.setState({clubs: res.data});
        }).catch(err=>
        console.log(err.response.data)) ;
    }

    showPage(id) {
        this.props.history.push(`/club-page/${id}`, this.state.flag);
    }

    render() {
        return (
            <div style={{marginTop:50}}>
                <h2 className='text-center' >My Clubs </h2>
                <div className='row'>
                    <table className="table table-striped table-bordered" style={{backgroundColor: "#05082B",opacity: 0.8}}>
                        <thead>
                        <tr>
                            <th style={{color:"white" ,fontSize:25}}>Club Name</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.clubs.map(
                                club =>
                                    <tr key ={club.id}>
                                        <td>
                                            <Button variant="None" style={{color:"white",fontSize:20}} onClick={() => this.showPage(club.id)} >
                                                <RiUserFollowFill size={25} style={{marginBottom:6,marginRight:5}}/> {club.clubName}
                                            </Button>

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