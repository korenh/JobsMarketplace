import React, { Component } from "react";
import "./Chat.css";
import Arrow from "../../../../../icons/arrow.png";
import Plane from "../../../../../icons/plane.png";

export default class Chat extends Component {
  render() {
    return (
      <div className="chat-main">
        <div className="chat-top">
          <img
            onClick={() => this.props.Chat()}
            className="newjob-back-btn"
            src={Arrow}
            alt="img"
          />
          <h1>Job Chat</h1>
        </div>
        <div>
          <div></div>
        </div>
        <div className="chat-bottom">
          <input type="text" />
          <img src={Plane} alt="img" className="chat-plane" />
        </div>
      </div>
    );
  }
}
