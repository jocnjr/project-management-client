// components/navbar/Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null
    }
    this.service = new AuthService()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      loggedInUser: nextProps.userInSession
    })
  }

  logoutUser = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.getUser(null);
      })
  }


  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="http://martinsfinedesserts.com/wp-content/uploads/parser/beard-logo-1.png" alt='some text' height="150" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to='/projects'>
                Projects
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                Welcome, {this.state.loggedInUser.username}
              </div>
              <div className="navbar-item">
                <div className="buttons">
                  <Link to='/' className="button is-primary">
                    <strong onClick={() => this.logoutUser()}>Logout</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
    } else {
      return (
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="http://martinsfinedesserts.com/wp-content/uploads/parser/beard-logo-1.png" alt='some text' height="150" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to='/signup' className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to='/' className="button is-light">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
    }
  }
}

export default NavBar;