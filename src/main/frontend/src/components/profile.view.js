import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import AuthService from "../services/auth.service";
import ClubService from "../services/club.service";
import UserService from "../services/user.service";

class ProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.match.params.id,
            users : [],
        }
    }
    componentDidMount() {

        ClubService.getRate(this.state.clubId).then((res) =>{
            this.setState({rate: res.data})});

        UserService.getUserInfo(this.state.userId).then((res) =>{
            this.setState({users: res.data});
        }).catch(err=>
            console.log(err.response.data)) ;

    }
    render() {
        return (
            <div className="panel-container" style={{width:1000,fontSize:20}}>
                <h2> {
                    this.state.users.map(
                        user =>
                                user.username
                    )
                }'s Profile</h2>
                <Table style={{color:"white", backgroundColor: "#05082B",opacity: 0.8}} striped bordered size="sm">
                    <thead>
                    <tr>
                        <th>User Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key ={user.id}>
                                    <td>{user.username}</td>
                                </tr>
                        )
                    }
                    </tbody>
                    <thead>
                    <tr>
                        <th>Full Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key ={user.id}>
                                    <td>{user.fullname}</td>
                                </tr>
                        )
                    }
                    </tbody>
                    <thead>
                    <tr>
                        <th>Biography</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key ={user.id}>
                                    <td>{user.bio}</td>
                                </tr>
                        )
                    }
                    </tbody>
                    <thead>
                    <tr>
                        <th>City</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key ={user.id}>
                                    <td>{user.city}</td>
                                </tr>
                        )
                    }
                    </tbody>
                    <thead>
                    <tr>
                        <th>E-Mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key ={user.id}>
                                    <td>{user.email}</td>
                                </tr>
                        )
                    }
                    </tbody>
                    <thead>
                    <tr>
                        <th>Roles</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>

                                    <td>{user.roles.map(
                                        role =>
                                            <div>
                                                {role.name}
                                            </div>
                                    )}</td>

                        )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProfileView;