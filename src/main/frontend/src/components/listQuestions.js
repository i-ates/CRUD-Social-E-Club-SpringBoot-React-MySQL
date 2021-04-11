import React, {Component} from 'react'
import UserService from "../services/user.service";
import tap from "lodash/fp/tap";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import AuthService from "../services/auth.service";
import userClubsService from "../services/userclub.service"
import  $ from "jquery"
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
            let newQuestions= [];
            for (let i=0; i<this.state.questions.length; i++){
                let question={question:this.state.questions[i]};
                newQuestions.push(question);
            }
            console.log(newQuestions);
            this.setState({questions: newQuestions});
            console.log(this.state.questions);

        });

    }
    handleToggle= ()=>{
        $( document ).ready(function() {
            $('input[type="checkbox"]').on('change', function() {
                var checkedValue = $(this).prop('checked');
                // uncheck sibling checkboxes (checkboxes on the same row)
                $(this).closest('tr').find('input[type="checkbox"]').each(function(){
                    $(this).prop('checked',false);
                });
                $(this).prop("checked",checkedValue);

            });
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
                userClubsService.saveClubs(value.clubId, currentUser.id).then(
                    console.log(value.clubId+" will added"+" userid="+currentUser.id)
                );


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
                                    <tr key ={question.question?.id}>
                                        <td>{question.question?.ques}</td>
                                        <td>
                                            <input type="checkbox" name="inStock[]"  onClick={o=>{this.handleToggle();
                                            this.getAnswer(question.question.id,"yes",question.question.clubId,question.question.answer)}}/>Yes
                                            <input type="checkbox" name="inStock[]"  onClick={o=>{this.handleToggle();
                                                this.getAnswer(question.question.id,"no",question.question.clubId,question.question.answer)}}/>No
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