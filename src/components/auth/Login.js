import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link, Redirect } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    this.service.login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response)
        return <Redirect to={{
          pathname: '/projects'
        }} />
      })
      .catch(error => console.log(error))
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
        path: '/',
        title: 'Login'
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
          <div className="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Login</button>
            </div>
            <div className="control">
              <button type='reset' className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
        <div className="section">
          <h6 className="subtitle is-6">
            Don't have account?
            <br />
            <Link className='button' to={"/signup"}>
              Signup
          </Link>
          </h6>
        </div>
      </section>
    )
  }
}

export default Login;