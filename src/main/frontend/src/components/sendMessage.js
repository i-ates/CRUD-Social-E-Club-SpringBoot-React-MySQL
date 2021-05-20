import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FormControl, InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";


class SendMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createWithText(""),
            isPublic: true,
            title:""
        }
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
    }
    onChangeT

    render() {
        const {editorState} = this.state;

        return(
            <div className="panel-container" >
                <Row>
                    <Col>
                        <InputGroup size="sm" className="mb-3" style={{width:530, marginLeft:366}}>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Enter title" onChange={e=> this.onchangeTitle(e)}/>
                        </InputGroup>
                    </Col>
                    <Col style={{marginRight:370}}>
                        <input className="form-check-input" value={true} type="radio" name="fl" id="fl1" onChange={this.onChangeRadioButton}/>
                        <label className="form-check-label">
                            Public
                        </label>
                        <input className="form-check-input" type="radio"  value={false} name="fl" id="fl1" onChange={this.onChangeRadioButton}/>
                        <label className="form-check-label">
                            Private
                        </label>
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
                <Button variant="outline-light" style={{margin:"auto", marginTop:10, marginRight:5}}>Send Message</Button>
                <Button variant="outline-light" style={{margin:"auto", marginTop:10, marginLeft:5}}>Create Event</Button>
            </div>
        )
    }
}

export default SendMessage;
