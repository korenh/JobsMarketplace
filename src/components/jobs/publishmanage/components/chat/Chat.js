import React, { Component } from "react";
import "./Chat.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import SendIcon from "@material-ui/icons/Send";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import axios from "axios";
export default class Chat extends Component {
  state = {
    message: "",
    messages: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(`https://altro-db7f0.firebaseio.com/chats/${this.props.job.id}.json`)
      .then((res) => {
        const data = res.data;
        try {
          this.setState({ messages: Object.values(data) });
        } catch {
          this.setState({ messages: [] });
        }
      });
  };

  AddData = (e) => {
    e.preventDefault();
    const dateSent = Date.now();
    const from = sessionStorage.getItem("uid");
    axios
      .post(
        `https://altro-db7f0.firebaseio.com/chats/${this.props.job.id}.json`,
        {
          dateSent,
          from,
          message: e.target.message.value,
        }
      )
      .then((res) => {
        return;
      });
    setInterval(() => {
      this.getData();
    }, 10);
  };

  render() {
    return (
      <div className="chat-main">
        <div className="chat-top">
          <ExitToAppIcon
            onClick={() => this.props.Chat()}
            alt="img"
            className="chat-top-logout"
            style={{ color: "white", fontSize: 25 }}
          />
          <p className="chat-top-title">{this.props.job.title}</p>
          <InfoIcon
            onClick={() => this.props.Chat()}
            alt="img"
            className="chat-top-logout"
            style={{ color: "white", fontSize: 25 }}
          />
        </div>
        <div className="chat-section">
          <p>'3' of '5' confirmed their participation.</p>
          <span>listofpics</span>
          <button className="chat-confirmed">
            <VerifiedUserIcon style={{ color: "white", fontSize: 15 }} />
            Confirm Participation
          </button>
        </div>
        <div className="chat-content">
          {this.state.messages.map((message) =>
            message.from === sessionStorage.getItem("uid") ? (
              <div key={message.dateSent} className="chat-each-message">
                <p className="chat-each-date">
                  {new Date(message.dateSent).toUTCString()}
                </p>
                <p>{message.message}</p>
              </div>
            ) : (
              <div key={message.dateSent} className="chat-each-message2">
                <p className="chat-each-date">
                  {new Date(message.dateSent).toUTCString()}
                </p>
                <p>{message.message}</p>
              </div>
            )
          )}
        </div>
        <div className="chat-div-form">
          <form className="chat-form" onSubmit={this.AddData}>
            <input type="text" name="message" />
            <button type="submit">
              <SendIcon style={{ color: "white", fontSize: 25 }} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
