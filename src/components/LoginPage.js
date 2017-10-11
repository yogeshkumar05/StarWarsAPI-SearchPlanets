import React from 'react';
import { fetchUsers } from "./../action-creators/starwars_actions";
import { connect } from "react-redux";
import constants from '../common/constants';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: "",
            password: "",
        }
        this.nameHandler = this.nameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
    }

    nameHandler(event) {
        this.setState({ name: event.target.value });
    }

    passwordHandler(event) {
        this.setState({ password: event.target.value });
    }

    componentWillMount() {
        fetchUsers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users != undefined) {
            this.setState({ users: nextProps.users });
        }
    }

    validateLogin() {
        let users = this.state.users;
        let matched = false;
        users.map(item => {
            if (item.name == this.state.name && item.birth_year == this.state.password) {
                matched = true;
            }
        });

        if (matched == false) {
            alert(constants.INVALID_LOGIN);
        }
        else{
            this.props.updateLogin(matched, this.state.name);
        }
    }
    render() {
        return (<div className="login-page">
            <div className="planet-name">{constants.LOGIN_INFO}</div>
            <div className="form-label">{constants.USERNAME}</div>
            <input type="text" className="form-input" value={this.state.name} onChange={this.nameHandler} />
            <div className="form-label">{constants.PASSWORD}</div>
            <input type="password" className="form-input" value={this.state.password} onChange={this.passwordHandler} />
            <button className="form-button" onClick={this.validateLogin}>Login</button>
        </div>)
    }
}
export default connect(state => (
    {
        users: state.starwarsReducer.users
    }
))(Login);