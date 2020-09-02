import React, { Component } from "react";
import UserContext from "../../protected/UserContext";

export default class Editprofile extends Component {
  static contextType = UserContext;

  state = {
    name: this.props.user.name,
    phone: this.props.user.phone,
    description: this.props.user.description,
    profileImageURL: this.props.user.profileImageURL,
  };

  updateData = () => {
    this.props.editProfile();
  };

  render() {
    const { lang } = this.context;

    return (
      <div className="chat-main2" style={lang ? { direction: "rtl" } : {}}>
        <img
          src={this.state.profileImageURL}
          alt="img"
          className="profile-pic"
        />
        <input
          className="signin-inp"
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <br />
        <input
          className="signin-inp"
          type="text"
          placeholder="Phone"
          value={this.state.phone}
          onChange={(e) => this.setState({ phone: e.target.value })}
        />
        <br />
        <textarea
          className="signin-inp"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={(e) => this.setState({ description: e.target.value })}
        />
        <br />
        <button className="signin-button" onClick={() => this.updateData()}>
          {lang ? "עדכון" : "Update"}
        </button>
      </div>
    );
  }
}
