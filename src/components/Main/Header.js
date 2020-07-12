import React, { Component } from "react";
import "./Main.css";
import Menu from "../../icons/menu.png";
import Bell from "../../icons/bell2.png";
import Altro from "../../icons/altro.png";
import Notifications from "../notifications/Notifications";

export default class Header extends Component {
  state = {
    popup: false,
    notification: false,
  };

  notificationDown = () => {
    this.setState({ notification: true });
  };

  notificationUp = () => {
    this.setState({ notification: false });
  };

  render() {
    return (
      <div className="header">
        <img src={Altro} alt="img" className="header-icon2" />
        <div className="header-flex">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
              alt="img"
              className="header-icon3"
            />
            <p className="header-profile-name">
              {sessionStorage.getItem("name")}
            </p>
          </div>
          <img
            src={Bell}
            alt="img"
            className="header-icon"
            onClick={this.notificationDown}
          />
          <img
            src={Menu}
            alt="img"
            className="header-icon"
            onClick={() => alert("menu popup")}
          />
          {this.state.notification ? (
            <div onClick={this.notificationUp} className="notifications-slide">
              <Notifications />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
