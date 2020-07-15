import React, { Component } from "react";
import "./Chat.css";
import Logout from "../../../../../icons/logout.png";
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
          <img
            src={Logout}
            onClick={() => this.props.Chat()}
            alt="img"
            className="chat-top-logout"
          />
          <p className="chat-top-title">{this.props.job.title}</p>
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
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}
