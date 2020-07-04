import React, { Component } from "react";
import Pic from "../../icons/head.jpg";
import "./Profile.css";

export default class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="profile-head">
          <img src={Pic} alt="img" className="profile-pic" />
          <h3>Koren Hamra</h3>
          <button className="profile-button">Edit Profile</button>
        </div>
      </div>
    );
  }
}
