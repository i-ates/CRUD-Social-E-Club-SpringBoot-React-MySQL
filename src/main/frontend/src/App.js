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
import {IoLogOutOutline} from "react-icons/io5";
import {CgProfile} from "react-icons/cg";
import SendMessage from "./components/sendMessage";

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
      <div className="container">
        <nav className="navbar navbar-expand navbar-dark" style={{paddingBottom:-3}}>

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
              <Link to={"/admin"} className="nav-link" style={{color:"white"}}>
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
                  <Dropdown.Toggle variant="None" style={{color:"white"}} >
                    {currentUser.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile" style={{color:"#004FB1"}}>
                      Edit Profile <CgProfile size={18} style={{marginBottom:3,marginRight:5}}/>
                    </Dropdown.Item>
                    <Dropdown.Item href="/home" onClick={this.logOut} style={{color:"#004FB1"}}>
                      LOGOUT <IoLogOutOutline size={18} style={{marginBottom:3,marginRight:5}}/>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
          ) :  (
            <div className="navbar-nav ml-auto">
              <li className="nav-item" >
                <Link to={"/login"} className="nav-link" style={{color:"white"}}>
                  LOGIN
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link" style={{color:"white"}}>
                  SIGN UP
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div style={{marginTop:40,marginLeft:20,marginRight:20,color:"white"}}>
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
            <Route path="/sendmessage" component={SendMessage}/>

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
