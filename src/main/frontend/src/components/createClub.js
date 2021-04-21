import React, {Component} from 'react'
import ClubService from "../services/club.service";

class createClub extends Component {


    constructor(props) {
        super(props);

        this.state = {
            clubName: '',
            question1: '',
            question2: '',
            question3: '',
            answer1: '',
            answer2: '',
            answer3: '',
        }

        this.changeClubName = this.changeClubName.bind(this);
        this.changeQuestion1 = this.changeQuestion1.bind(this);
        this.changeQuestion2 = this.changeQuestion2.bind(this);
        this.changeQuestion3 = this.changeQuestion3.bind(this);
        this.changeAnswer1 = this.changeAnswer1.bind(this);
        this.changeAnswer2 = this.changeAnswer2.bind(this);
        this.changeAnswer3 = this.changeAnswer3.bind(this);
        this.saveClub = this.saveClub.bind(this);
    }

    changeClubName = (event) =>{
        this.setState({clubName: event.target.value});
    }

    changeQuestion1 = (event) =>{
        this.setState({question1: event.target.value});
    }

    changeAnswer1 = (event) =>{
        this.setState({answer1: event.target.value});
    }

    changeQuestion2 = (event) =>{
        this.setState({question2: event.target.value});
    }

    changeAnswer2 = (event) =>{
        this.setState({answer2: event.target.value});
    }

    changeQuestion3 = (event) =>{
        this.setState({question3: event.target.value});
    }

    changeAnswer3 = (event) =>{
        this.setState({answer3: event.target.value});
    }

    saveClub () {

        //let club = {clubName: this.state.clubName};
        //let question = {ques: this.state.question1, answer: this.state.answer1, clubName: this.state.clubName}
        //let questionTwo = {ques: this.state.question2, answer: this.state.answer2, clubName: this.state.clubName}
        //let questionThree = {ques: this.state.question3, answer: this.state.answer3, clubName: this.state.clubName}

        ClubService.createClub(this.state.clubName);
        console.log(this.state.question1);
        console.log(this.state.answer1);
        console.log(this.state.clubName);
        ClubService.createQuestion(this.state.question1, this.state.answer1, this.state.clubName);
        //ClubService.createQuestion(this.state.question2, this.state.answer2, this.state.clubName).then();
        //ClubService.createQuestion(this.state.question3, this.state.answer3, this.state.clubName).then();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-10 offset-md-5 offset-md-5">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Club Name</label>
                                        <input placeholder="Club Name" name="clubName" className="form-control"
                                            value={this.state.clubName} onChange={this.changeClubName}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Question1</label>
                                        <input placeholder="Question1" name="question" className="form-control"
                                               value={this.state.question1} onChange={this.changeQuestion1}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Answer1</label>
                                        <input placeholder="Answer1" name="answer" className="form-control"
                                               value={this.state.answer1} onChange={this.changeAnswer1}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Question2</label>
                                        <input placeholder="Question2" name="question" className="form-control"
                                               value={this.state.question2} onChange={this.changeQuestion2}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Answer2</label>
                                        <input placeholder="Answer2" name="answer" className="form-control"
                                               value={this.state.answer2} onChange={this.changeAnswer2}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Question3</label>
                                        <input placeholder="Question2" name="question" className="form-control"
                                               value={this.state.question3} onChange={this.changeQuestion3}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Answer3</label>
                                        <input placeholder="Answer3" name="answer" className="form-control"
                                               value={this.state.answer3} onChange={this.changeAnswer3}/>
                                    </div>

                                    <button className="btn-outline-success" onClick={this.saveClub}>Add Club</button>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        )
    }

}

export default createClub