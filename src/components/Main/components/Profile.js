import React, { Component } from "react";
import "./Profile.css";
import firebase from "../../protected/Firebase";
import EditIcon from "@material-ui/icons/Edit";

export default class Profile extends Component {
  state = { user: {}, EME: undefined, EMR: undefined };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(sessionStorage.getItem("uid"))
      .get()
      .then((doc) => {
        this.setState({
          user: doc.data(),
          EME: doc.data().employeeRating.sumOfRatings,
          EMR: doc.data().employerRating.sumOfRatings,
        });
      });
  }

  render() {
    return (
      <div className="profile">
        <div className="profile-head">
          <img
            src={sessionStorage.getItem("url")}
            alt="img"
            className="profile-pic"
          />
          <p style={{ lineHeight: "0", fontSize: "17px" }}>
            {this.state.user.name}
          </p>
          <button className="profile-button">
            {" "}
            <EditIcon
              style={{ color: "rgb(45, 123, 212)", fontSize: 14 }}
            />{" "}
            Edit Profile
          </button>
          <p style={{ lineHeight: "0", fontSize: "17px", textAlign: "left" }}>
            About me
          </p>
          <p style={{ fontSize: "14px", textAlign: "left" }}>
            {this.state.user.description}
          </p>
          <p style={{ lineHeight: "0", fontSize: "17px", textAlign: "left" }}>
            Rating
          </p>
          <div className="profile-flex-info">
            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                {this.state.EME}
              </p>
              <p style={{ fontSize: "12px" }}>Employee</p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                {this.state.EMR}
              </p>
              <p style={{ fontSize: "12px" }}>Employer</p>
            </div>
          </div>
          <p style={{ lineHeight: "0", fontSize: "17px", textAlign: "left" }}>
            History
          </p>
          <div className="profile-flex-info">
            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                18
              </p>
              <p style={{ fontSize: "12px" }}>Jobs Completed</p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                2
              </p>
              <p style={{ fontSize: "12px" }}>Monthly Jobs </p>
            </div>
          </div>
          <div className="profile-flex-info">
            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  color: "rgb(103, 201, 108)",
                }}
              >
                32$
              </p>
              <p style={{ fontSize: "12px" }}>Per Job</p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  color: "rgb(103, 201, 108)",
                }}
              >
                428$
              </p>
              <p style={{ fontSize: "12px" }}>Total Earned</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
