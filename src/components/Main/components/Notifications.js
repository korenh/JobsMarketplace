import React, { Component } from "react";
import firebase from "../../protected/Firebase";
import Check from "../../../icons/noticheck.png";
//import X from "../../../icons/noticlose.png";
//import User from "../../../icons/notiuser.png";
import "./Notifications.css";

export default class Notifications extends Component {
  state = {
    notifications: [],
  };

  deleteNotification = (notification) => {
    firebase
      .firestore()
      .collection("notifications")
      .doc(notification.id)
      .delete();
    setInterval(() => {
      this.getData();
    }, 100);
  };

  componentDidMount() {
    this.getData();
  }

  getData = (async) => {
    const allData = [];
    firebase
      .firestore()
      .collection("notifications")
      .where("toUser", "==", sessionStorage.getItem("uid"))
      .orderBy("date", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            date: doc.data().date,
            fromUser: doc.data().fromUser,
            fromUsername: doc.data().fromUsername,
            jobId: doc.data().jobId,
            notificationType: doc.data().notificationType,
            toUser: doc.data().toUser,
          };
          allData.push(data);
        });
        this.setState({ notifications: allData });
      });
  };

  render() {
    return (
      <div className="notifications">
        {this.state.notifications.map((notification) => (
          <div className="card-notification" key={notification.id}>
            <div>
              <button
                onClick={() => this.deleteNotification(notification)}
                className="notifications-delete"
              >
                x
              </button>
              <img src={Check} alt="img" className="notifications-card-img" />
            </div>
            <div>
              <p className="notifications-status">
                {notification.notificationType}
              </p>
              <p className="notifications-name">
                by {notification.fromUsername}
              </p>
              <p className="notifications-time">May 16th , 18:32</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
