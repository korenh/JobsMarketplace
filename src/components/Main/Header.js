import React, { Component } from "react";
import "./Main.css";
import Menu from "../../icons/menu.png";
import Bell from "../../icons/bell2.png";
import Altro from "../../icons/altro.png";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";

export default class Header extends Component {
  state = {
    popup: false,
    notification: false,
    profile: false,
    menu: false,
  };

  menu = () => {
    this.setState({
      menu: !this.state.menu,
      profile: false,
      notification: false,
    });
  };

  notification = () => {
    this.setState({
      notification: !this.state.notification,
      profile: false,
      menu: false,
    });
  };

  profile = () => {
    this.setState({
      profile: !this.state.profile,
      notification: false,
      menu: false,
    });
  };

  logout = () => {
    sessionStorage.clear();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="header">
        <img src={Altro} alt="img" className="header-icon2" />
        <div className="header-flex">
          <div onClick={this.profile}>
            <img
              src={sessionStorage.getItem("url")}
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
            onClick={this.notification}
          />
          <img
            src={Menu}
            alt="img"
            className="header-icon"
            onClick={this.menu}
          />
          {this.state.notification ? (
            <div className="profile-slide">
              <Notifications />
            </div>
          ) : (
            ""
          )}
          {this.state.profile ? (
            <div className="profile-slide">
              <Profile />
            </div>
          ) : (
            ""
          )}
          {this.state.menu ? (
            <div className="notifications-slide">
              <div className="header-menu">
                <button>About Altro</button>
                <br />
                <button>Contact Us</button>
                <br />
                <button>Legal</button>
                <br />
                <button className="header-menu-share">Share the App</button>
                <br />
                <button
                  className="header-menu-logout"
                  onClick={() => this.logout()}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
