import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignupPage from './page/SignUpPage'
import ListClubs from "./Components/ListClubs";
import ListQuestions from "./Components/ListQuestions";
//mert + mustafa2
function App() {
  return (
    <div>
      <Router>
          <div className="container">
              <Switch>
                  <Route path = "/" exact component = {ListClubs}/>
                  <Route path = "/clubs" component= {ListClubs}/>
                  <Route path = "/add-user" component= {SignupPage}/>
                  <Route path = "/questions" component={ListQuestions}/>
              </Switch>
          </div>
      </Router>
    </div>

  );
}

export default App;
