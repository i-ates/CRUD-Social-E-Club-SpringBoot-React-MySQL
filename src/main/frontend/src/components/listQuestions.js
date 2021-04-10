import React, {Component} from 'react'
import UserService from "../services/user.service";

class ListQuestions extends Component{
    constructor(props) {
        super(props);

        this.state = {
            questions: [], //soruid-soru-cevap-clubid
            answers:[]
            //answerarray[]:soruid-verdiğimizcevap
        }
    }
    //submitbuton fonksiyonu
    // Loop
    //question.cevap==answerarray.cevapp
    //>%51
    //backendde yollucaz. Userid- clubid
    //

    componentDidMount() {
        UserService.getQuestion().then((res) =>{
            this.setState({questions: res.data});
        });
    }
    getAnswer(id,ans,clubId,expected){
        let answer= {
            "id":id,
            "answer":ans,
            "expectedAnswer":expected,
            "clubIdd":clubId
        }
        let prevanswer=this.state.answers.find(answer=>answer.id===id);
        if (prevanswer==null){
            this.setState({
                answers: this.state.answers.concat([answer])
            })
            console.log(id+" "+"yes clicked");
        }else{
           this.setState({
               answers:this.state.answers.map(el=>(el.id===id ? Object.assign({},el,answer):el))
           })
            console.log(id+" "+"answer updated");
        }



    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Questions </h2>
                <div className='row'>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Question</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.questions.map(
                                question =>
                                    <tr key ={question.id}>
                                        <td>{question.ques}</td>
                                        <td>
                                            <button className="btn btn-outline-success"
                                                    onClick={()=>this.getAnswer(question.id,"yes",question.clubId,question.answer)}>Yes</button>
                                            <button className="btn btn-outline-warning"
                                                    onClick={()=>this.getAnswer(question.id,"no",question.clubId,question.answer)}>No</button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-primary" onClick={this.subm}>Submit</button>
            </div>
        )
    }

}

export default ListQuestions