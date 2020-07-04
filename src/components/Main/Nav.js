import React, { Component } from "react";
import "./Main.css";
import Circle from "../../icons/circle.png";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link className="nav-item" to="/main">
          <img src={Circle} alt="img" style={{ height: "40px" }} />
          <p>Search</p>
        </Link>
        <Link className="nav-item" to="/main/myjobs">
          <img src={Circle} alt="img" style={{ height: "40px" }} />
          <p>My Jobs</p>
        </Link>
        <Link className="nav-item" to="/main/jobs">
          <img src={Circle} alt="img" style={{ height: "40px" }} />
          <p>Publish & Manage</p>
        </Link>
        <Link className="nav-item" to="/main/profile">
          <img src={Circle} alt="img" style={{ height: "40px" }} />
          <p>Profile</p>
        </Link>
        <Link className="nav-item" to="/main/notifications">
          <img src={Circle} alt="img" style={{ height: "40px" }} />
          <p>Notifications</p>
        </Link>
      </div>
    );
  }
}
