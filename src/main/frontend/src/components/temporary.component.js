import React, {Component} from 'react';
import UserService from '../services/user.service';

class TemporaryComponent extends Component {
    constructor(props) {
        super(props);

        this.state ={
            userId: this.props.location.state,
            clubId: this.props.match.params.id,
            date:""
        }
    }

    componentDidMount(){
        console.log(this.state.clubId);
        UserService.getDate(this.state.userId, this.state.clubId).then((res) => {
            this.setState({date: res.data})
        });

        console.log(this.state.date);
    }

    render() {
        return (
            <div>
                <h1>You banned temporarily from this club until {this.state.date}</h1>
            </div>
        );
    }
}

export default TemporaryComponent;