import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import withRouter from './withRouter';
import { MContext } from './MyProvider';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'bytecaptain',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked(context) {
        if(this.state.username="bytecaptain" && this.state.password === "bytecaptain"){
            this.setState({ showSuccessMessage: true })
            this.setState({ hasLoginFailed: false })
        } else {
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        }
    }

    render() {
        return (
            <div>
                <h1 data-testid="loginHeader">Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input data-testid="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input data-testid="password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <MContext.Consumer>
                        {(context) => (
                            <button data-testid="login" className="btn btn-success" onClick={()=>{this.loginClicked(context)}}>Login</button>
                        )}</MContext.Consumer>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginComponent);