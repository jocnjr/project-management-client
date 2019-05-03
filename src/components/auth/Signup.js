// auth/Signup.js

import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      errorMsg: null
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.signUp(username, password)
      .then(newUser => {
        this.setState({
          username: "",
          password: "",
        });
        this.props.getUser(newUser)
      })
      .catch(error => {
        // console.log(`no dounut for you ${error}`, error.response.data)
        this.setState({
          errorMsg: `${error.response.data.message}`
        })
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h3>{this.state.errorMsg}</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Sign Up" />
        </form>

        <p>Already have account?
          <Link to={"/"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default SignUp;