import React, { Component } from "react";
import "./Dashboard.css";
import Arrow from "../../../../../icons/arrow.png";
import Manageusers from "../manageusers/Manageusers";

export default class Dashboard extends Component {
  state = {
    manageEmplyees: false,
  };

  render() {
    return (
      <div className="dashboard">
        {this.state.manageEmplyees ? (
          <Manageusers Dashboard={this.props.Dashboard} job={this.props.job} />
        ) : (
          ""
        )}
        <img
          onClick={() => this.props.Dashboard()}
          className="newjob-back-btn"
          src={Arrow}
          alt="img"
        />
        <h1>Job Dashboard</h1>
        <div className="dashboard-info">
          <p>Statistics & info</p>
          <p>Views , saves </p>
          <p>Attending , requests</p>
          <p>confirmed participating</p>
          <p>Published on Date </p>
        </div>
        <div className="dashboard-quick">
          <p>Quick Actions</p>
          <button className="jobs-selected-boost-button">Boost</button>
          <button className="jobs-selected-save-button">Manage</button>
          <button className="jobs-selected-save-button">Edit</button>
          <button className="jobs-selected-save-button">Chat</button>
          <br />
          <button className="jobs-selected-finish-button">Finish Job</button>
          <button
            className="jobs-selected-delete-button"
            onClick={() => this.props.deleteJob(this.props.job)}
          >
            Delete Job
          </button>
        </div>
        <div className="dashboard-manage">
          <p>Manage Employees</p>

          <button
            onClick={() =>
              this.setState({ manageEmplyees: !this.state.manageEmplyees })
            }
            className="jobs-selected-finish-button"
          >
            View All
          </button>
        </div>
      </div>
    );
  }
}
