import React, { Component } from "react";
import Arrow from "../../../../../icons/arrow.png";
import firebase from "../../../../protected/Firebase";
import { addNotification } from "../../../../functions/helper";

import "./Manageusers.css";

export default class Manageusers extends Component {
  state = {
    acceptedIds: [],
    confirmedIds: [],
    acceptedUsers: [],
    name: "",
    Requests: true,
    Accepted: false,
    Confirmed: false,
  };

  removeA(arr) {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let docRef = firebase.firestore().collection("jobs").doc(this.props.job.id);
    docRef.get().then((doc) => {
      let acceptedIds = doc.data().acceptedIds;
      let confirmedIds = doc.data().confirmedIds;
      let confirmedUsers = doc.data().confirmedUsers;
      this.setState({ acceptedIds, confirmedIds, confirmedUsers });
      console.log(this.state.confirmedUsers);
    });
  };

  deleteacceptedIds = (v) => {
    let acceptedIds = this.state.acceptedIds;
    this.removeA(acceptedIds, v);
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      acceptedIds,
    });
    this.getData();
  };

  deleteconfirmedIds = (v) => {
    let confirmedIds = this.state.confirmedIds;
    this.removeA(confirmedIds, v);
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      confirmedIds,
    });
    this.getData();
  };

  toconfirmedIds = (v) => {
    let acceptedIds = this.state.acceptedIds;
    this.removeA(acceptedIds, v);
    let confirmedIds = this.state.confirmedIds;
    confirmedIds.push(v);
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      acceptedIds,
      confirmedIds,
    });
    addNotification({
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      fromUser: sessionStorage.getItem("uid"),
      fromUsername: sessionStorage.getItem("name"),
      jobId: this.props.job.id,
      notificationType: "Accepted to job",
      toUser: v,
    });
    this.getData();
  };

  getUserName = (v) => {
    var docRef = firebase.firestore().collection("users").doc(v);
    docRef.get().then((doc) => {
      this.setState({ name: doc.data().name });
    });
  };

  render() {
    return (
      <div>
        <div className="manage-employees">
          <img
            onClick={() => this.props.Dashboard()}
            className="newjob-back-btn"
            src={Arrow}
            alt="img"
          />
          <h3>Manage Employees</h3>
          <div className="manage-employees-flex">
            <p
              className="manage-employees-flex-item"
              onClick={() =>
                this.setState({
                  Requests: true,
                  Confirmed: false,
                  Accepted: false,
                })
              }
              style={{
                background: this.state.Requests ? "rgb(45, 123, 212)" : "none",
              }}
            >
              Requests({this.state.acceptedIds.length})
            </p>
            <p
              className="manage-employees-flex-item"
              onClick={() =>
                this.setState({
                  Requests: false,
                  Confirmed: false,
                  Accepted: true,
                })
              }
              style={{
                background: this.state.Accepted ? "rgb(45, 123, 212)" : "none",
              }}
            >
              Accepted({this.state.confirmedIds.length})
            </p>
            <p
              className="manage-employees-flex-item"
              onClick={() =>
                this.setState({
                  Requests: false,
                  Confirmed: true,
                  Accepted: false,
                })
              }
              style={{
                background: this.state.Confirmed ? "rgb(45, 123, 212)" : "none",
              }}
            >
              Confirm
            </p>
          </div>
          <br />
          {this.state.Requests ? (
            <div>
              <p>Requests</p>
              {this.state.acceptedIds.map((v) => (
                <div key={v} className="manageusers-user-card">
                  <div className="dashboard-card-person-flex">
                    <img
                      alt="img"
                      src={sessionStorage.getItem("url")}
                      style={{ height: "50px", borderRadius: "50%" }}
                    />
                    <div className="dashboard-card-person-info">
                      <p>{v}</p>
                      <p>Accepted on may 3</p>
                      <p>(293)</p>
                    </div>
                  </div>
                  <div className="manageusers-button-flex">
                    <p
                      onClick={() => this.toconfirmedIds(v)}
                      className="manageusers-button-confirm"
                    >
                      Confirm
                    </p>
                    <p
                      onClick={() => this.deleteacceptedIds(v)}
                      className="manageusers-button-delete"
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {this.state.Accepted ? (
            <div>
              <p>Accepted</p>
              {this.state.confirmedIds.map((v) => (
                <div key={v} className="manageusers-user-card">
                  <div className="dashboard-card-person-flex">
                    <img
                      alt="img"
                      src={sessionStorage.getItem("url")}
                      style={{ height: "50px", borderRadius: "50%" }}
                    />
                    <div className="dashboard-card-person-info">
                      <p>{v}</p>
                    </div>
                  </div>
                  <div className="manageusers-button-flex">
                    <p
                      onClick={() => this.deleteconfirmedIds(v)}
                      className="manageusers-button-delete"
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {this.state.Confirmed ? (
            <div>
              <p>Confirmed</p>
              {this.state.confirmedUsers.map((v) => (
                <div key={v.confirmingUserId} className="manageusers-user-card">
                  <div className="dashboard-card-person-flex">
                    <img
                      alt="img"
                      src={sessionStorage.getItem("url")}
                      style={{ height: "50px", borderRadius: "50%" }}
                    />
                    <div className="dashboard-card-person-info">
                      <p>{v.confirmingUserId}</p>
                      <p>{v.dateConfirmed.toString()}</p>
                    </div>
                  </div>
                  <div className="manageusers-button-flex">
                    <p
                      onClick={() => this.deleteacceptedIds(v)}
                      className="manageusers-button-delete"
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <br />
        </div>
      </div>
    );
  }
}
