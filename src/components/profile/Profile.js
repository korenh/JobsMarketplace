import React, { Component } from "react";
import "./Profile.css";

export default class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="profile-head">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
            alt="img"
            className="profile-pic"
          />
          <h3>Koren Hamra</h3>
          <button className="profile-button">Edit Profile</button>
        </div>
      </div>
    );
  }
}
