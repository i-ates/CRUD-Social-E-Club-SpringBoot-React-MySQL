import React, { Component } from "react";

import UserService from "../services/user.service";
import ListMyClubs from "../components/listMyClubs";
import ListClubs from "./ListClubs";
import {Tab, Tabs} from "react-bootstrap";
import AuthService from "../services/auth.service";
import OtherClubs from "./listOtherClubs"
import {Link} from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div className="container">
        {currentUser ? (
            <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
              <Tab eventKey={1} title="Enrolled Club">
                <div className="container mt-3">
                  <ListMyClubs/>
                </div>
              </Tab>
              <Tab eventKey={2} title="Other Club">
                <div className="container mt-3">
                  <div className="container mt-3">
                    <OtherClubs/>
                  </div>
                </div>
              </Tab>
            </Tabs>
        ) :  (
            <div>
              <ListClubs/>
            </div>
        )}

      </div>
    );
  }
}
