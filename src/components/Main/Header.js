import React, { Component } from "react";
import "./Main.css";
import Altro from "../sign/icons/altro.png";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MenuIcon from "@material-ui/icons/Menu";
import Switch from "@material-ui/core/Switch";

export default class Header extends Component {
  state = {
    popup: false,
    notification: false,
    profile: false,
    menu: false,
    toggle: false,
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

  toggleSwitch = () => {
    this.setState({ toggle: !this.state.toggle });
    sessionStorage.setItem("language", this.state.toggle);
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
          <NotificationsNoneIcon
            className="header-icon"
            onClick={this.notification}
            style={
              this.state.notification
                ? {
                    fontSize: 35,
                    color: "rgb(45, 123, 212)",
                    transition: "0.5s",
                  }
                : { fontSize: 35, transition: "0.5s" }
            }
          />
          <MenuIcon
            alt="img"
            className="header-icon"
            onClick={this.menu}
            style={
              this.state.menu
                ? {
                    fontSize: 35,
                    color: "rgb(45, 123, 212)",
                    transition: "0.5s",
                  }
                : { fontSize: 35, transition: "0.5s" }
            }
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
                <br />
                <p
                  style={{
                    fontSize: "11px",
                    color: "black",
                    float: "right",
                  }}
                >
                  <Switch
                    color="primary"
                    style={{ color: "rgb(45, 123, 212)" }}
                    checked={this.state.toggle}
                    onChange={() => this.toggleSwitch()}
                  />
                  <br />
                  English/Hebrew
                </p>
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
