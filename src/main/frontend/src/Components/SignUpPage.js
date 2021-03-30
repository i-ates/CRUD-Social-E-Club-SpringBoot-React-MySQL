import React  from "react";
import {signup} from "../api/apiCall";

class SignUpPage extends React.Component{
    state = {
        username: null,
        email:null,
        password:null,
        re_password:null,
        pendingApiCall:false
    }

    onChange = event =>{
        const { name, value} = event.target;
        this.setState({
            [name]:value
        });
    };

    onClickSignUp = async event => {
        event.preventDefault();

        const {username,email,password}=this.state;
        const body = {username,  email,  password};
        this.setState({pendingApiCall:true});
        try{
            const response= await signup(body);
        }catch (error){}
        this.setState({pendingApiCall:false});
    };

    render() {
        return(
            <div className="container">
                <form>
                    <h1 className={"text-center"}>Signup Page</h1>
                    <div className={"form-group"}>
                        <label>Username</label>
                        <input name="username" className={"form-control"} onChange={this.onChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label>E-mail</label>
                        <input name="email" className={"form-control"} onChange={this.onChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Password</label>
                        <input name="password" className={"form-control"}onChange={this.onChange} type="password"/>
                    </div>
                    <div className={"form-group"}>
                        <label>Re-Password</label>
                        <input name="re_password" className={"form-control"}onChange={this.onChange} type="password"/>
                    </div>
                    <div className={"text-center"}>
                        <button className={"btn btn-primary"} onClick={this.onClickSignUp} disabled={this.state.pendingApiCall}>
                            {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>


        )
    }

}

export default SignUpPage;