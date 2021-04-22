import React, { Component } from "react";
import UserService from "../services/user.service";
import { Tab, Tabs } from 'react-bootstrap';
import ListClubs from "./ListClubs";
import DeleteClub from "./deleteclub.component";
import CreateClub from "./createClub";
import AssignAdmin from "./assignadmin.component";
import BanUser from "./banuser.component";
import ManageUser from "./manageuser.component";
import  listClubWithId from "./listClubWithId"
import ListClubWithId from "./listClubWithId";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Admin content"
    };
  }

  componentDidMount() {
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
            <Tab eventKey={1} title="Club Browser">
                <div className="container mt-3">
                    <ListClubWithId/>
                </div>
            </Tab>
            <Tab eventKey={2} title="Create Club">
                <div className="container mt-3">
                    <CreateClub/>
                </div>
            </Tab>
            <Tab eventKey={3} title="Delete Club">
                <div className="container mt-3">
                    <DeleteClub />
                </div>
            </Tab>
            <Tab eventKey={4} title="Assign Sub Club Admin">
                <div className="container mt-3">
                    <AssignAdmin />
                </div>
            </Tab>
            <Tab eventKey={5} title="Ban User">
                <div className="container mt-3">
                    <BanUser />
                </div>
            </Tab>
            <Tab eventKey={6} title="Manage User">
                <div className="container mt-3">
                    <ManageUser />
                </div>
            </Tab>
        </Tabs>

    );
  }
}


