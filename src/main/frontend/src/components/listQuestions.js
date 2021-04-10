import React, {Component} from 'react'
import UserService from "../services/user.service";
import tap from "lodash/fp/tap";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import AuthService from "../services/auth.service";

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
            "clubId":clubId
        }
        let prevanswer=this.state.answers.find(answer=>answer.id===id);
        if (prevanswer==null){
            this.setState({
                answers: this.state.answers.concat([answer])
            })
            console.log(id+" "+ans+" clicked");
        }else{
           this.setState({
               answers:this.state.answers.map(el=>(el.id===id ? Object.assign({},el,answer):el))
           })
            console.log(id+" "+"answer updated");
        }
    }
    submit(){
        const currentUser = AuthService.getCurrentUser();
        const map = require('lodash/fp/map').convert({ 'cap': false });
        const result = flow(
            groupBy('clubId'),
            map((answers, clubId) => ({clubId, answers}))
        )(this.state.answers)
        let correctCount=0;
        // console.log(result);
        for (const [key,value] of result.entries()){
            correctCount=0;
            for (const [key1,value1] of value.answers.entries()){
                if (value1.answer===value1.expectedAnswer){
                    correctCount++;
                }
            }
            if (correctCount/3 >0.5){
                console.log(value.clubId+" will added"+" userid="+currentUser.id);
            }
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
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                                       value="option1" onClick={()=>this.getAnswer(question.id,"yes",question.clubId,question.answer)} />
                                                <label className="form-check-label"
                                                       htmlFor="inlineCheckbox1">Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                                                       value="option2" onClick={()=>this.getAnswer(question.id,"no",question.clubId,question.answer)}/>
                                                <label className="form-check-label"
                                                       htmlFor="inlineCheckbox2">No</label>

                                                {/*<div className="form-check form-check-inline">*/}
                                                {/*    <input className="form-check-input" type="radio"*/}
                                                {/*           name="inlineRadioOptions" id="inlineRadio1"  value="option1"*/}
                                                {/*           onClick={()=>this.getAnswer(question.id,"yes",question.clubId,question.answer)}/>*/}
                                                {/*        <label className="form-check-label"*/}
                                                {/*               htmlFor="inlineRadio1">Yes</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="form-check form-check-inline">*/}
                                                {/*    <input className="form-check-input" type="radio"*/}
                                                {/*           name="inlineRadioOptions" id="inlineRadio2" value="option2"*/}
                                                {/*           onClick={()=>this.getAnswer(question.id,"no",question.clubId,question.answer)}/>*/}
                                                {/*        <label className="form-check-label"*/}
                                                {/*               htmlFor="inlineRadio2">No</label>*/}
                                                {/*</div>*/}
                                            </div>

                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-primary" onClick={()=>this.submit()}>Submit</button>
            </div>
        )
    }

}

export default ListQuestions