import React, { Component } from "react";
import "./Contact.css";
import firebase from "../../../../protected/Firebase";
import CancelIcon from "@material-ui/icons/Cancel";

export default class Contact extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.getUser();
  }
  getUser = async (v) => {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(this.props.job.creatingUserId)
      .get();
    this.setState({ user: doc.data() });
  };

  render() {
    return (
      <div className="contact-card-main">
        <img
          src={this.state.user.profileImageURL}
          alt="img"
          className="profile-pic"
        />
        <p>{this.state.user.name}</p>
        <p>{this.state.user.phone}</p>
        <p>{this.state.user.description}</p>
        <CancelIcon
          onClick={() => this.props.ContactPopup()}
          style={{
            float: "left",
            color: "red",
            fontSize: 30,
            cursor: "pointer",
          }}
        />
      </div>
    );
  }
}
