import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import PlanetSearch from './PlanetSearch';
import Login from './LoginPage';
import Constants from '../common/constants';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginValid: false
        }
        this.updateLogin = this.updateLogin.bind(this);
    }

    updateLogin(value) {
        this.setState({ isLoginValid: value });
    }

    render() {

        return (
            <div>
                <header className="header">
                    <Header />
                </header>
                <div className="container">
                    {this.state.isLoginValid ? <PlanetSearch /> : <Login updateLogin={this.updateLogin} />}
                </div>
                <Footer />
            </div>)
    }
}


