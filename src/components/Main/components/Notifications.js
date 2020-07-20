import React, { Component } from "react";
import firebase from "../../protected/Firebase";
import Check from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/Clear";
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
            date:
              doc.data().date.toDate().toDateString() +
              " " +
              doc.data().date.toDate().toLocaleTimeString("en-US"),
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
            <Check
              style={{
                color: "rgb(45, 123, 212)",
                fontSize: 40,
                margin: "auto 5px",
              }}
            />
            <div
              style={{ marginLeft: "5px" }}
              className="notifications-div-info"
            >
              <p className="notifications-status">
                {notification.notificationType}
              </p>
              <p className="notifications-name">
                by {notification.fromUsername}
              </p>
              <p className="notifications-time">{notification.date}</p>
              <ClearIcon
                style={{ fontSize: 17 }}
                onClick={() => this.deleteNotification(notification)}
                className="notifications-delete"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
