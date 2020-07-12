import React, { Component } from "react";
import User from "../../icons/notiuser.png";
import Check from "../../icons/noticheck.png";
import X from "../../icons/noticlose.png";
import "./Notifications.css";

export default class Notifications extends Component {
  render() {
    return (
      <div className="notifications">
        <div className="card-accepted">
          <img src={Check} alt="img" className="notifications-card-img" />
          <div>
            <p className="notifications-status">Accepted to job</p>
            <p className="notifications-name">by Koren Hamra</p>
            <p className="notifications-time">May 16th , 18:32</p>
          </div>
        </div>
        <div className="card-removed">
          <img src={X} alt="img" className="notifications-card-img" />
          <div>
            <p className="notifications-status">Accepted to job</p>
            <p className="notifications-name">by Koren Hamra</p>
            <p className="notifications-time">May 16th , 18:32</p>
          </div>
        </div>
        <div className="card-employee">
          <img src={User} alt="img" className="notifications-card-img" />
          <div>
            <p className="notifications-status">Accepted to job</p>
            <p className="notifications-name">by liron Hamra</p>
            <p className="notifications-time">May 16th , 18:32</p>
          </div>
        </div>
      </div>
    );
  }
}
