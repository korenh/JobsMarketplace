import React, { Component } from "react";
import "./Main.css";

import Search from "../../icons/search.png";
import Publish from "../../icons/publish.png";
import Star from "../../icons/star.png";

import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <NavLink
          className="nav-item"
          activeClassName="nav-item-active"
          to="/main/jobs"
        >
          <img src={Search} alt="img" style={{ height: "30px" }} />
          <p style={{ lineHeight: "0" }}>Search</p>
        </NavLink>
        <NavLink
          className="nav-item"
          to="/main/myjobs"
          activeClassName="nav-item-active"
        >
          <img src={Star} alt="img" style={{ height: "30px" }} />
          <p style={{ lineHeight: "0" }}>My Jobs</p>
        </NavLink>
        <NavLink
          className="nav-item"
          to="/main/publishmanage"
          activeClassName="nav-item-active"
        >
          <img src={Publish} alt="img" style={{ height: "30px" }} />
          <p style={{ lineHeight: "0" }}>Publish</p>
        </NavLink>
      </div>
    );
  }
}
