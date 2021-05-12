import React, {Component} from 'react';
import Rate from "./rate";
import UserService from "../services/user.service";
import ClubService from "../services/club.service";

class ClubPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 0.0,
            clubId: this.props.match.params.id,
            comments:[]
        }
    }

    componentDidMount() {
        ClubService.getRate(this.state.clubId).then((res) =>{
            this.setState({rate: res.data})});

        ClubService.getComment(this.state.clubId).then((res) =>{
            this.setState({comments: res.data})});
    }

    render() {
        return (
            <div>
                <h2>Rate Of Club {this.state.rate}</h2>
                <Rate clubId={this.state.clubId} />
                <h2 className='text-center'>Comments </h2>
                <div className='flex-md-column'>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>User and Their Comments</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.comments.map(
                                comment =>
                                    <tr key ={comment.id}>
                                        <td>
                                            {comment.userId} {comment.rate} {comment.comment}
                                        </td>
                                    </tr>
                            )

                        }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ClubPage;
