import React, { Component } from "react";
import "./Notifications.css";

export default class Notifications extends Component {
  render() {
    return (
      <div className="notifications">
        <button>Clear All Notifications</button>
        <div className="card-accepted">
          <p className="notifications-status">Accepted to job</p>
          <p className="notifications-name">by Koren Hamra</p>
          <p className="notifications-time">May 16th , 18:32</p>
        </div>
        <div className="card-removed">
          <p className="notifications-status">Accepted to job</p>
          <p className="notifications-name">by Koren Hamra</p>
          <p className="notifications-time">May 16th , 18:32</p>
        </div>
        <div className="card-employee">
          <p className="notifications-status">Accepted to job</p>
          <p className="notifications-name">by liron Hamra</p>
          <p className="notifications-time">May 16th , 18:32</p>
        </div>
      </div>
    );
  }
}
