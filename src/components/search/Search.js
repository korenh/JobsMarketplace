import React, { Component } from "react";
import "./Search.css";

export default class Search extends Component {
  render() {
    return (
      <div className="jobs">
        <div className="jobs-filter">
          <p>Jobs</p>
          <p>Volunteer</p>
        </div>
        <br />
        <br />
        <br />
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
        <button className="search-filter-button">Filter</button>
      </div>
    );
  }
}
