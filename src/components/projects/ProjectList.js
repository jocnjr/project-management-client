// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';

class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      listOfProjects: []
    };
  }

  getAllProjects = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/projects`, { withCredentials: true })
      .then(responseFromApi => {
        console.log(responseFromApi)
        this.setState({
          listOfProjects: responseFromApi.data
        })
      })
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <div>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.listOfProjects.map(project => {
            return (

              <div key={project._id} className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    {
                      (project.imageUrl)
                        ?
                        <img src={project.imageUrl} alt={project.title} />
                        :
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                    }
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{project.title}</p>
                      {/* <p className="subtitle is-6">@johnsmith</p> */}
                    </div>
                  </div>
                  <div className="content">
                    {project.description}
                    <hr />
                    <ul>
                      {project.tasks.map((task, index) => {
                        return <li key={index}>{task.title}</li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
        <div style={{ width: '40%', float: "right" }}>
          <AddProject getData={() => this.getAllProjects()} />
        </div>
      </div>
    )
  }
}

export default ProjectList;