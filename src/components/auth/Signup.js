// auth/Signup.js

import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb';

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
    const breadCrumbitems = [
      {
        path: '/',
        title: 'Home'
      },
      {
        path: '/signup',
        title: 'Signup'
      }
    ]


    return (
      <section className='section'>
        <BreadCrumb items={breadCrumbitems} />
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input className="input" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          {
            this.state.errorMsg &&
            (<article className="message is-warning">
              <div className="message-header">
                <p>Error</p>
                <button className="delete" aria-label="delete"></button>
              </div>
              <div className="message-body">
                <strong>Pellentesque risus mi</strong>
              </div>
            </article>)
          }
          <div classNameName="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Sign up</button>
            </div>
            <div className="control">
              <button type='reset' className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
        <div className="section">
          <h6 className="subtitle is-6">
            Do you have an account?
            <br />
            <Link className='button' to={"/"}>
              Login
          </Link>
          </h6>
        </div>
      </section>
    )
  }
}

export default SignUp;