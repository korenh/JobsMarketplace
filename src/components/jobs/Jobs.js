import React, { Component } from "react";
import "./Jobs.css";

export default class Jobs extends Component {
  render() {
    return (
      <div className="jobs">
        <div className="jobs-filter">
          <p>Active jobs</p>
          <p>Full jobs</p>
        </div>
        <div className="jobs-card">
          <div className="jobs-card-title">
            <p>deliver food to various companies</p>
            <h3>$ 450 /hr </h3>
          </div>
          <div className="jobs-card-info">
            <p>Today , 6:30pm </p>
            <p>Tel Aviv , 2.6 km</p>
          </div>
          <div className="jobs-card-tags">
            <p>#physical</p>
            <p>#delivery</p>
            <p>#foreveryone</p>
          </div>
        </div>

        <div className="jobs-card">
          <div className="jobs-card-title">
            <p>develop a web engine</p>
            <h3>$ 300 /hr </h3>
          </div>
          <div className="jobs-card-info">
            <p>Today , 6:30pm </p>
            <p>Tel Aviv , 2.6 km</p>
          </div>
          <div className="jobs-card-tags">
            <p className="jobs-card-tags-item">#physical</p>
            <p className="jobs-card-tags-item">#delivery</p>
            <p className="jobs-card-tags-item">#foreveryone</p>
          </div>
        </div>
      </div>
    );
  }
}
