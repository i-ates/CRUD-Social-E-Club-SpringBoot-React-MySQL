import React, {Component} from 'react'
import UserService from "../services/user.service";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import AuthService from "../services/auth.service";
import userClubsService from "../services/userclub.service"
import  $ from "jquery"
import { Button, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class SubclubQuestions extends Component{

    constructor(props) {
        super(props);

        this.state = {
            questions: [], //soruid-soru-cevap-clubid
            answers:[],
            show: false,
            close: false
        }
    }

    componentDidMount() {
        UserService.getSubClubQuestions(this.props.match.params.id).then((res) =>{
            this.setState({questions: res.data});
            let newQuestions= [];
            for (let i=0; i<this.state.questions.length; i++){
                let question={question:this.state.questions[i]};
                newQuestions.push(question);
            }
            this.setState({questions: newQuestions});
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
        }else{
            this.setState({
                answers:this.state.answers.map(el=>(el.id===id ? Object.assign({},el,answer):el))
            })
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
        for (const [key,value] of result.entries()){
            correctCount=0;
            for (const [key1,value1] of value.answers.entries()){
                if (value1.answer===value1.expectedAnswer){
                    correctCount++;
                }
            }
            if (correctCount/3>0.5){
                userClubsService.saveClubs(value.clubId, currentUser.id).then(
                );
            }
        }
    }
    navigate(){
        this.props.history.push("/home");
        window.location.reload();
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>{this.props.location.state} Club's Questions</h2>
                <h4 style={{fontFamily:"Arial, Helvetica, Cursive", color:"red"}}>
                    Thank you for your interest in {this.props.location.state} club.
                    We hope you can become a member of {this.props.location.state} club.
                    Please read the questions carefully.
                    If you want to join a club, you have to answer more than half of the questions of that club correctly.
                    As HiClub, we wish you success.
                </h4>
                <div>
                    <table className="table table-striped table-bordered" style={{backgroundColor: "#05082B",opacity: 0.8}}>
                        <thead>
                        <tr>
                            <th style={{color:"white",fontSize:25}}>Question</th>
                            <th style={{color:"white",fontSize:25}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.questions.map(
                                question =>
                                    <tr key ={question.question?.id}>
                                        <td style={{color:"white",fontSize:20}}>{question.question?.ques}</td>
                                        <td style={{color:"white",fontSize:20}}>
                                            <Row>
                                                <Col xs={6}>
                                                    <input  type="checkbox" name="inStock[]"  onClick={o=>{this.handleToggle();
                                                        this.getAnswer(question.question.id,"yes",question.question.clubId,question.question.answer)}}/>Yes
                                                </Col>
                                                <Col xs={6}>
                                                    <input type="checkbox" name="inStock[]"  onClick={o=>{this.handleToggle();
                                                        this.getAnswer(question.question.id,"no",question.question.clubId,question.question.answer)}}/>No
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <Button
                    className="btn btn-outline-light"
                    variant="none"
                    onClick={() => {this.setState({ show: true });this.submit()}}
                    style={{width:200}}
                >Submit</Button>
                <Modal
                    show={this.state.show}
                    animation={true}
                    size="md" className=" shadow-lg border">
                    <Modal.Header className="modal-header">
                        <Modal.Title className="text-center">
                            <h5>Answer Saved</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="py-0 border">
                        You are navigated to "MyClubs"
                    </Modal.Body>
                    <Modal.Footer className="py-1 d-flex justify-content-center">
                        <div>
                            <Button variant="outline-dark" className="mx-2 px-3" onClick={()=>this.navigate()}>Okay</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default SubclubQuestions