import React from 'react';
import AuthService from "../services/auth.service";
import {withRouter} from "react-router-dom";


class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:undefined,
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        this.setState({
            id: user.id
        })
    }
    timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.validate()){

            AuthService.changePassword(this.state.id,this.state.input.password)
            AuthService.logout()
            this.props.history.push("/home")
            window.location.reload()

        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;


        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] != input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <div className="panel-container" style={{width:500}}>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">New Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.input.password}
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter new password"
                                id="password"/>

                            <div className="text-danger">{this.state.errors.password}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Confirm Password:</label>
                            <input
                                type="password"
                                name="confirm_password"
                                value={this.state.input.confirm_password}
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter confirm password"
                                id="confirm_password"/>

                            <div className="text-danger">{this.state.errors.confirm_password}</div>
                        </div>

                        <input type="submit" value="Submit" style={{width:100}}/>
                    </form>
                </div>
            </div>


        );
    }
}

export default withRouter(ChangePassword);