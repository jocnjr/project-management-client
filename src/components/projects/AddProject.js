// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';
import ServiceFileUpload from '../service-file-upload';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      imageUrl: '',
      isUploading: false
    };
    this.uploadService = new ServiceFileUpload()
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, description, imageUrl } = this.state

    axios.post(`${process.env.REACT_APP_API_URL}/api/projects`, { title, description, imageUrl }, { withCredentials: true })
      .then(response => {
        this.props.getData();
        this.setState({ title: "", description: "", imageUrl: '' });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    this.setState({
      imageUrl: '',
      isUploading: true
    });
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.uploadService.handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ 
          imageUrl: response.secure_url,
          isUploading: false
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return (
      <section className='section'>
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="textarea" name="description" value={this.state.description} placeholder='add your description' onChange={e => this.handleChange(e)} />
            </div>
          </div>

          <div className="file has-name is-boxed">
            <label className="file-label">
              <input className="file-input" type="file" name="imageUrl" onChange={(e) => this.handleFileUpload(e)}/>
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Choose a file…
                  </span>
                </span>
                <span className="file-name">
                  {!this.state.imageUrl && this.state.isUploading && <progress class="progress is-small is-primary" max="100">15%</progress>}
                  {this.state.imageUrl.split('/')[this.state.imageUrl.split('/').length - 1]}
                </span>
              </label>
            </div>
            <div className="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Save New</button>
            </div>
            <div className="control">
              <button type='reset' className="button is-text" onClick={() => null}>Cancel</button>
            </div>
          </div>
        </form>
      </section>
        )
      }
    }
    
export default AddProject;