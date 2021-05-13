import React, { Component } from "react";
import UserService from "../services/user.service";
import { Tab, Tabs } from 'react-bootstrap';
import DeleteClub from "./deleteclub.component";
import CreateClub from "./createClub";
import AssignAdmin from "./assignadmin.component";
import BanUser from "./banuser.component";
import ManageUser from "./manageuser.component";
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
        <Tabs>
            <Tab eventKey={1} title="Club Browser">
                    <ListClubWithId/>
            </Tab>
            <Tab eventKey={2} title="Create Club">
                    <CreateClub/>
            </Tab>
            <Tab eventKey={3} title="Delete Club">
                    <DeleteClub />
            </Tab>
            <Tab eventKey={4} title="Assign Sub Club Admin">
                    <AssignAdmin />
            </Tab>
            <Tab eventKey={5} title="Ban User">
                    <BanUser />
            </Tab>
            <Tab eventKey={6} title="Manage User">
                    <ManageUser />
            </Tab>
        </Tabs>

    );
  }
}


