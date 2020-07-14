import React, { Component } from "react";
import "./Dashboard.css";
import Arrow from "../../../../../icons/arrow.png";

export default class Dashboard extends Component {
  state = {
    manageEmplyees: false,
  };

  render() {
    return (
      <div className="dashboard">
        {this.state.manageEmplyees ? (
          <div className="manage-employees">
            <img
              onClick={() => this.props.Dashboard()}
              className="newjob-back-btn"
              src={Arrow}
              alt="img"
            />
            <h3>Manage Employees</h3>
            <div className="manage-employees-flex">
              <p>Requests</p>
              <p>Accepted</p>
              <p>Confirmed</p>
            </div>
            <br />
            <br />
            <div className="dashboard-card-person">
              <div className="dashboard-card-person-flex">
                <img alt="img" />
                <div className="dashboard-card-person-info">
                  <p>Koren Hamra</p>
                  <p>Accepted on may 3</p>
                  <p>(293)</p>
                </div>
              </div>
              <button>submit</button>
            </div>
          </div>
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
          <div style={{ display: "flex" }}>
            <div>
              <p>Requests</p>
            </div>
            <div>
              <p>Accepted</p>
            </div>
            <div>
              <p>Confirmed</p>
            </div>
          </div>
          <button
            onClick={() =>
              this.setState({ manageEmplyees: !this.state.manageEmplyees })
            }
          >
            View All
          </button>
        </div>
      </div>
    );
  }
}
