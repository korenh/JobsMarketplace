import React, { Component } from "react";
import "./Chat.css";
import { toast } from "react-toastify";
import firebase from "../../../../protected/Firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import SendIcon from "@material-ui/icons/Send";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import axios from "axios";
export default class Chat extends Component {
  state = {
    allUsers: [],
    message: "",
    messages: [],
  };

  componentDidMount() {
    this.getData();
    this.getUsers();
  }

  getData = (async) => {
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

  getUsers = () => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(this.props.job.id)
      .get()
      .then((doc) => {
        const allUsers = [];
        doc.data().confirmedIds.map((v) => {
          firebase
            .firestore()
            .collection("users")
            .doc(v)
            .get()
            .then((doc) => {
              allUsers.push(doc.data());
              this.setState({ allUsers });
            });
          return "done";
        });
      });
  };

  jobInfo = () => {
    toast.configure();
    toast.info("Job title :  " + this.props.job.title, {
      autoClose: 5000,
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
        this.getData();
      });
  };

  getUserName = (id) => {
    const arr = this.state.allUsers;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].uid === id) {
        console.log(arr[i].name);
        return arr[i].name;
      }
    }
  };

  getUserPic = (id) => {
    const arr = this.state.allUsers;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].uid === id) {
        console.log(arr[i].name);
        return arr[i].profileImageURL;
      }
    }
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
            onClick={() => this.jobInfo()}
            alt="img"
            className="chat-top-logout"
            style={{ color: "white", fontSize: 25 }}
          />
        </div>
        <div className="chat-section">
          <p>Confirmed their participation</p>
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
                  {new Date(message.dateSent).toLocaleDateString()}
                </p>
                <div className="chat-each-flex">
                  <img
                    src={sessionStorage.getItem("url")}
                    alt="img"
                    className="chat-each-profile"
                  />
                  <div>
                    <p>{sessionStorage.getItem("name")}</p>
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div key={message.dateSent} className="chat-each-message2">
                <p className="chat-each-date">
                  {new Date(message.dateSent).toLocaleDateString()}
                </p>
                <div className="chat-each-flex">
                  <img
                    src={this.getUserPic(message.from)}
                    alt="img"
                    className="chat-each-profile"
                  />
                  <div>
                    <p>{this.getUserName(message.from)}</p>
                    <p>{message.message}</p>
                  </div>
                </div>
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
