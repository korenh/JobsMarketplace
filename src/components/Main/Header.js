import React, { Component } from "react";
import "./Main.css";
import Menu from "../../icons/menu.png";
import Bell from "../../icons/bell2.png";
import Altro from "../../icons/altro.png";

export default class Header extends Component {
  state = {
    popup: false,
  };
  render() {
    return (
      <div className="header">
        <img
          src={Menu}
          alt="img"
          className="header-icon"
          onClick={() => alert("menu popup")}
        />
        <img src={Altro} alt="img" className="header-icon2" />
        <img src={Bell} alt="img" className="header-icon" />
      </div>
    );
  }
}
