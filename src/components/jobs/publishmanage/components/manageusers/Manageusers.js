import React, { Component } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import firebase from "../../../../protected/Firebase";
import { addNotification } from "../../../../functions/helper";

import "./Manageusers.css";

export default class Manageusers extends Component {
  state = {
    date: new Date(),
    acceptedIds: [],
    confirmedIds: [],
    Requests: [],
    name: "",
    Request: true,
    Accepted: false,
    Confirmed: false,
    user: {},
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

  removeOBJ(arr, id) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i].requestingUserId === id) {
        arr.splice(i, 1);
        return arr;
      }
  }

  componentDidMount() {
    this.getData();
    this.getUser(sessionStorage.getItem("uid"));
  }

  getData = () => {
    let docRef = firebase.firestore().collection("jobs").doc(this.props.job.id);
    docRef.get().then((doc) => {
      let acceptedIds = doc.data().acceptedIds;
      let confirmedIds = doc.data().confirmedIds;
      let Requests = doc.data().requests;
      this.setState({ acceptedIds, confirmedIds, Requests });
    });
  };

  deleteconfirmedIds = (v) => {
    let confirmedIds = this.state.confirmedIds;
    this.removeA(confirmedIds, v);
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      confirmedIds,
    });
    addNotification({
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      fromUser: sessionStorage.getItem("uid"),
      fromUsername: sessionStorage.getItem("name"),
      jobId: this.props.job.id,
      notificationType: "removedFromJob",
      toUser: v,
    });
    setTimeout(() => {
      this.getData();
    }, 1);
  };

  deleteacceptedIds = (v) => {
    let acceptedIds = this.state.acceptedIds;
    this.removeA(acceptedIds, v);
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      acceptedIds,
    });
    setTimeout(() => {
      this.getData();
    }, 1);
  };

  removeRequest = (v) => {
    let requests = this.state.Requests;
    requests = this.removeOBJ(requests, v.requestingUserId);
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      requests,
    });
    setTimeout(() => {
      this.getData();
    }, 1);
  };

  toacceptedIds = (v) => {
    let requests = this.state.Requests;
    let acceptedIds = this.state.acceptedIds;
    acceptedIds.push(v.requestingUserId);
    requests = this.removeOBJ(requests, v.requestingUserId);
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      acceptedIds,
      requests,
    });
    addNotification({
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      fromUser: sessionStorage.getItem("uid"),
      fromUsername: sessionStorage.getItem("name"),
      jobId: this.props.job.id,
      notificationType: "acceptedToJob",
      toUser: v,
    });
    setTimeout(() => {
      this.getData();
    }, 1);
  };

  getUser = async (v) => {
    const doc = await firebase.firestore().collection("users").doc(v).get();
    this.setState({ user: doc.data() });
  };

  render() {
    return (
      <div>
        <div className="manage-employees">
          <ChevronLeftIcon
            onClick={() => this.props.Dashboard()}
            className="newjob-back-btn"
            alt="img"
            style={{ fontSize: 25, color: "white" }}
          />
          <h3>Manage Employees</h3>
          <div className="manage-employees-flex">
            <p
              className="manage-employees-flex-item"
              onClick={() =>
                this.setState({
                  Request: true,
                  Confirmed: false,
                  Accepted: false,
                })
              }
              style={{
                background: this.state.Request ? "rgb(45, 123, 212)" : "none",
              }}
            >
              Request
            </p>
            <p
              className="manage-employees-flex-item"
              onClick={() =>
                this.setState({
                  Request: false,
                  Confirmed: false,
                  Accepted: true,
                })
              }
              style={{
                background: this.state.Accepted ? "rgb(45, 123, 212)" : "none",
              }}
            >
              Accepted
            </p>
            <p
              className="manage-employees-flex-item"
              onClick={() =>
                this.setState({
                  Request: false,
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
          {this.state.Request ? (
            <div>
              <p>Request</p>
              {this.state.Requests.map((v) => (
                <div key={v.requestingUserId} className="manageusers-user-card">
                  <div className="dashboard-card-person-flex">
                    <img
                      alt="img"
                      src={sessionStorage.getItem("url")}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="dashboard-card-person-info">
                      <p>{v.requestingUserId}</p>
                      <p>{this.state.date.toISOString()}</p>
                    </div>
                  </div>
                  <div className="manageusers-button-flex">
                    <p
                      onClick={() => this.toacceptedIds(v)}
                      className="manageusers-button-confirm"
                    >
                      Confirm
                    </p>
                    <p
                      onClick={() => this.removeRequest(v)}
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
              {this.state.acceptedIds.map((v) => (
                <div key={v} className="manageusers-user-card">
                  <div className="dashboard-card-person-flex">
                    <img
                      alt="img"
                      src={sessionStorage.getItem("url")}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="dashboard-card-person-info">
                      <p>{v}</p>
                      <p>{this.state.date.toISOString()}</p>
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
          {this.state.Confirmed ? (
            <div>
              <p>Confirmed</p>
              {this.state.confirmedIds.map((v) => (
                <div key={v} className="manageusers-user-card">
                  <div className="dashboard-card-person-flex">
                    <img
                      alt="img"
                      src={sessionStorage.getItem("url")}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="dashboard-card-person-info">
                      <p>{v}</p>
                      <p>{this.state.date.toISOString()}</p>
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
          <br />
        </div>
      </div>
    );
  }
}
