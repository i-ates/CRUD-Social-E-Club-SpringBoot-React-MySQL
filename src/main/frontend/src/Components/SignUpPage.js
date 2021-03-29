import React  from "react";

class SignUpPage extends React.Component{

    state = {
        username: null,
        email:null,
        password:null,
        re_password:null
    }

    onChange = event =>{
        const value = event.target.value;
        const field = event. target.name;
        this.setState({
            [field]:value
        })
    }
    render() {
        return(
            <form>
                <h1>Signup Page</h1>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={this.onChange}/>
                </div>
                <div>
                    <label>E-mail</label>
                    <input name="email"  onChange={this.onChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" onChange={this.onChange} type="password"/>
                </div>
                <div>
                    <label>Re-Password</label>
                    <input name="re_password" onChange={this.onChange} type="password"/>
                </div>
                <button>Sign Up</button>


            </form>

        )
    }

}

export default SignUpPage;