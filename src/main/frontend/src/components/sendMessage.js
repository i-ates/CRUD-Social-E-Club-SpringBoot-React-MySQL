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
    }

    state = {
        editorState: EditorState.createWithText(""),
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    render() {
        const {editorState} = this.state;

        return(
            <div className="panel-container" >
                <Row>
                    <Col>
                        <InputGroup size="sm" className="mb-3" style={{width:530, marginLeft:366}}>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Enter title"/>
                        </InputGroup>
                    </Col>
                    <Col style={{marginRight:370}}>
                        <Form.Check type="checkbox" name="inStock[]" style={{display:"inline-block"}}/>Private
                        <Form.Check type="checkbox" name="inStock[]" style={{display:"inline-block"}}/>Public
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
