import React, {Component} from 'react'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import {RiUserFollowFill, RiUserUnfollowFill} from "react-icons/ri";
import Card from "react-bootstrap/Card";

class searchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
            flag: true,
            clubs2: [],
            flag2: true
        }
        this.showPage = this.showPage.bind(this);
        this.showPage2 = this.showPage2.bind(this);
    }


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser);
        let json= {"id":currentUser.id};
        console.log(currentUser.id)
        UserService.getOtherClubs(currentUser.id).then((res) =>{
            this.setState({clubs2: res.data});
        }).catch(err=>
            console.log(err.response.data)) ;
        UserService.getUserClubs(currentUser.id).then((res) =>{
            this.setState({clubs: res.data});
        }).catch(err=>
            console.log(err.response.data)) ;
    }

    showPage(id) {
        this.props.history.push(`/club-page/${id}`, this.state.flag);
    }
    showPage2(id) {
        this.props.history.push(`/club-page/${id}`, this.state.flag2);
    }

    render() {
        return (
                <div>
                    {
                        this.state.clubs.map(
                            club =>
                                <Card style={{ width: '18rem' }} key ={club.id}>
                                     <Button variant="None" style={{color:"white",fontSize:20}} onClick={() => this.showPage(club.id)} >
                                         <RiUserFollowFill size={25} style={{marginBottom:6,marginRight:5}}/> {club.clubName}
                                     </Button>
                                </Card>
                        )
                    }
                    {
                        this.state.clubs2.map(
                            club2 =>
                                <Card style={{ width: '18rem' }} key ={club2.id}>
                                    <Button variant="None" style={{color:"white", fontSize:20}} onClick={() => this.showPage2(club2.id)} >
                                        <RiUserUnfollowFill size={25} style={{marginBottom:6,marginRight:5}}/> {club2.clubName}
                                    </Button>
                                </Card>
                        )
                    }

                </div>
        )
    }


}

export default withRouter(searchBar);