import React, { Component } from "react";
import "./Main.css";

import Search from "../../icons/search.png";
import Publish from "../../icons/publish.png";
import Star from "../../icons/star.png";

import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link className="nav-item" to="/main">
          <img src={Search} alt="img" style={{ height: "30px" }} />
          <p>Search</p>
        </Link>
        <Link className="nav-item" to="/main/myjobs">
          <img src={Star} alt="img" style={{ height: "30px" }} />
          <p>My Jobs</p>
        </Link>
        <Link className="nav-item" to="/main/jobs">
          <img src={Publish} alt="img" style={{ height: "30px" }} />
          <p>Publish</p>
        </Link>
      </div>
    );
  }
}
