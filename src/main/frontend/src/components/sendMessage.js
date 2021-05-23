import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FormControl, InputGroup} from "react-bootstrap";
import AuthService from "../services/auth.service";
import ClubService from "../services/club.service";

class SendMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createWithText(""),
            isPublic: false,
            title:"",
            currentUser: undefined,
            clubid:this.props.match.params.clubid,
            showCreateEvent: false
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

       this.setState({
           currentUser:user,
           showCreateEvent: user.roles.includes("ROLE_ADMIN")
           }
       )

    }
    onchangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    // console.log(this.state.editorState.getCurrentContent().getPlainText())
    }
    onChangeRadioButton= (event) =>{
        this.setState( {
            isPublic:event.target.value
        })
        console.log(this.state.isPublic);
    }

    sendMessage= (e) =>{
        e.preventDefault();

        const currentUser = AuthService.getCurrentUser();
        ClubService.createMessage(this.state.title, this.state.clubid,
            this.state.editorState.getCurrentContent().getPlainText(),currentUser.id,
            this.state.isPublic
            )

        this.navigate();
    }

    sendEvent= (e) =>{
        e.preventDefault();

        const currentUser = AuthService.getCurrentUser();
        ClubService.createEvent(this.state.title, this.state.clubid,
            this.state.editorState.getCurrentContent().getPlainText(),currentUser.id
        )

        this.navigate();
    }

    async navigate() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.props.history.push("/home");
    }


    render() {
        const {editorState} = this.state;

        return(
            <div className="panel-container" >
                <Row>
                    <Col>
                        <InputGroup size="sm" className="mb-3" style={{width:500, marginLeft:366}}>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Enter title" onChange={e=> this.onchangeTitle(e)}/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Row style={{width:200}}>
                            <Col>
                                <input className="form-check-input" value={false} type="radio" name="fl" id="fl1"
                                       onChange={this.onChangeRadioButton}/>
                                <label className="form-check-label">
                                    Public
                                </label>
                            </Col>
                            <Col>
                                <input className="form-check-input" type="radio"  value={true} name="fl" id="fl1" onChange={this.onChangeRadioButton}/>
                                <label className="form-check-label">
                                    Private
                                </label>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div className="editor" style={{backgroundColor:"white", color:"black", width:700,
                margin:"auto", maxHeight:500, height:350, borderRadius:50}}>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                    />

                </div>
                <Button variant="outline-light" style={{margin:"auto", marginTop:10, marginRight:5}} onClick={this.sendMessage}>Send Message</Button>
                {this.state.showCreateEvent &&(
                    <Button variant="outline-light" style={{margin:"auto", marginTop:10, marginLeft:5}} onClick={this.sendEvent}>Create Event</Button>)}
            </div>
        )
    }
}

export default SendMessage;
