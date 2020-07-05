import React, { Component } from "react";
import "./Main.css";
import User from "../../icons/user.png";
import Bell from "../../icons/bell.png";
import Search from "../../icons/search.png";
import Publish from "../../icons/publish.png";
import Star from "../../icons/star.png";

import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link className="nav-item" to="/main">
          <img src={Search} alt="img" style={{ height: "40px" }} />
          <p>Search</p>
        </Link>
        <Link className="nav-item" to="/main/myjobs">
          <img src={Star} alt="img" style={{ height: "40px" }} />
          <p>My Jobs</p>
        </Link>
        <Link className="nav-item" to="/main/jobs">
          <img src={Publish} alt="img" style={{ height: "40px" }} />
          <p>Publish & Manage</p>
        </Link>
        <Link className="nav-item" to="/main/profile">
          <img src={User} alt="img" style={{ height: "40px" }} />
          <p>Profile</p>
        </Link>
        <Link className="nav-item" to="/main/notifications">
          <img src={Bell} alt="img" style={{ height: "40px" }} />
          <p>Notifications</p>
        </Link>
      </div>
    );
  }
}
