import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import listQuestion from "./components/listQuestions"
import listMyClubs from "./components/listMyClubs";
import ClubPage from "./components/clubPage";
import Searchbar from "./components/searchbar";
import Dropdown from 'react-bootstrap/Dropdown';
import { GiHighFive } from "react-icons/gi";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
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
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

          <Link to={"/"} className="navbar-brand">
              <GiHighFive className="navbar-icon"></GiHighFive>
              hiclub
          </Link>
          <div className="navbar-nav mr-auto">
            {/*<li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>*/}

            {/*{showModeratorBoard && (*/}
            {/*  <li className="nav-item">*/}
            {/*    <Link to={"/mod"} className="nav-link">*/}
            {/*      Moderator Board*/}
            {/*    </Link>*/}
            {/*  </li>*/}
            {/*)}*/}

            {/*{showAdminBoard && (
            {/*  <li className="nav-item">*/}
            {/*    <Link to={"/admin"} className="nav-link">*/}
            {/*      Admin Board*/}
            {/*    </Link>*/}
            {/*  </li>*/}
            {/*)}*/}

            {/*{currentUser && (*/}
            {/*  <li className="nav-item">*/}
            {/*    <Link to={"/user"} className="nav-link">*/}
            {/*      User*/}
            {/*    </Link>*/}
            {/*  </li>*/}
            {/*)}*/}
            {/*currentUser && (
                <li className="nav-item">
                  <Link to={"/getuserclubs"} className="nav-link">
                    MyClubs
                  </Link>
                </li>

            )*/}
            {showAdminBoard && (<li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Panel
              </Link>
            </li>
            )}

          </div>

          <div>
            <Searchbar/>
          </div>

          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <Dropdown>
                  <Dropdown.Toggle variant="dark" >
                    {currentUser.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Edit Profile</Dropdown.Item>
                    <Dropdown.Item href="/home" onClick={this.logOut}>LOGOUT</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
          ) :  (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LOGIN
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  SIGN UP
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch> localhost:3000/club-page/
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            {/*<Route path="/user" component={BoardUser} />*/}
            {/*<Route path="/mod" component={BoardModerator} />*/}
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/questions" component={listQuestion} />
            <Route path="/getuserclubs" component={listMyClubs}/>
            <Route path="/club-page/:id" component={ClubPage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
