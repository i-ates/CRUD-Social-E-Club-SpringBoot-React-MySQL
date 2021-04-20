import React, { Component } from "react";
import UserService from "../services/user.service";
import { Tab, Tabs } from 'react-bootstrap';


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
      this.state = {
          clubs: []
      }
    this.state = {
      content: "Admin content"
    };
  }

  componentDidMount() {
      UserService.getClubs().then((res) =>{
          this.setState({clubs: res.data});
      });
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={1} title="Club Browser">Tab 1 content</Tab>
            <Tab eventKey={2} title="Create Club">Tab 2 content</Tab>
            <Tab eventKey={3} title="Delete Club">Tab 3 content</Tab>
            <Tab eventKey={4} title="Assign Sub Club">Tab 4 content is displayed by default</Tab>
            <Tab eventKey={5} title="Ban User">Tab 5 content</Tab>
            <Tab eventKey={6} title="Manage User">
                <div className="container mt-3">
                    <p>
                        asdasd
                    </p>
                </div>
            </Tab>
        </Tabs>

    );
  }
}


