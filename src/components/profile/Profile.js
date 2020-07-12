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
          <p style={{ lineHeight: "0", fontSize: "17px" }}>
            {sessionStorage.getItem("name")}
          </p>
          <button className="profile-button">Edit Profile</button>
          <p style={{ lineHeight: "0", fontSize: "17px", textAlign: "left" }}>
            About me
          </p>
          <p style={{ fontSize: "14px", textAlign: "left" }}>
            {sessionStorage.getItem("description")}
          </p>
          <p style={{ lineHeight: "0", fontSize: "17px", textAlign: "left" }}>
            Rating
          </p>
          <p>(293)</p>
          <p style={{ lineHeight: "0", fontSize: "17px", textAlign: "left" }}>
            History
          </p>
          <p style={{ fontSize: "14px", textAlign: "left" }}>Jobs Completed:</p>
          <p style={{ fontSize: "14px", textAlign: "left" }}>Monthly Jobs:</p>
          <p style={{ fontSize: "14px", textAlign: "left" }}>Per Job:</p>
          <p style={{ fontSize: "14px", textAlign: "left" }}>Total Earned:</p>
        </div>
      </div>
    );
  }
}
