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
    rating: 5,
    acceptedIdsAll: [],
    confirmedIdsAll: [],
    RequestsAll: [],
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
    firebase
      .firestore()
      .collection("jobs")
      .doc(this.props.job.id)
      .get()
      .then((doc) => {
        let acceptedIds = doc.data().acceptedIds;
        let confirmedIds = doc.data().confirmedIds;
        let Requests = doc.data().requests;
        this.setState({ acceptedIds, confirmedIds, Requests });
        const acceptedIdsAll = [];
        acceptedIds.map((v) => {
          firebase
            .firestore()
            .collection("users")
            .doc(v)
            .get()
            .then((doc) => {
              acceptedIdsAll.push(doc.data());
              this.setState({ acceptedIdsAll });
            });
          return "done";
        });
        const confirmedIdsAll = [];
        confirmedIds.map((v) => {
          firebase
            .firestore()
            .collection("users")
            .doc(v)
            .get()
            .then((doc) => {
              confirmedIdsAll.push(doc.data());
              this.setState({ confirmedIdsAll });
            });
          return "done";
        });
        const RequestsAll = [];
        Requests.map((v) => {
          firebase
            .firestore()
            .collection("users")
            .doc(v.requestingUserId)
            .get()
            .then((doc) => {
              RequestsAll.push(doc.data());
              this.setState({ RequestsAll });
            });
          return "done";
        });
      });
  };

  /*
  this.state.acceptedIds.map((v) => {
        firebase
          .firestore()
          .collection("users")
          .doc(v)
          .get()
          .then((doc) => {
            acceptedIdsAll.push(doc.data());
          });
      });
  */

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
    requests = this.removeOBJ(requests, v.uid);
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
    acceptedIds.push(v.uid);
    requests = this.removeOBJ(requests, v.uid);
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

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

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
              Request({this.state.Requests.length})
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
              Accepted({this.state.acceptedIds.length})
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
              Confirm({this.state.confirmedIds.length})
            </p>
          </div>
          <br />
          {this.state.Request ? (
            <div>
              <p>Request</p>
              {this.state.RequestsAll.map((v) => (
                <div key={v.uid} className="manageusers-user-card">
                  <img alt="img" src={v.profileImageURL} />
                  <div>
                    <p>{v.name}</p>
                    <p>{v.phone}</p>
                  </div>
                  <p
                    onClick={() => this.toacceptedIds(v)}
                    className="manageusers-button-confirm"
                  >
                    ✓
                  </p>
                  <p
                    onClick={() => this.removeRequest(v)}
                    className="manageusers-button-delete"
                  >
                    x
                  </p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {this.state.Accepted ? (
            <div>
              <p>Accepted</p>
              {this.state.acceptedIdsAll.map((v) => (
                <div key={v.uid} className="manageusers-user-card">
                  <img alt="img" src={v.profileImageURL} />
                  <div>
                    <p>{v.name}</p>
                    <p>{v.phone}</p>
                  </div>
                  <p
                    onClick={() => this.deleteacceptedIds(v.uid)}
                    className="manageusers-button-delete"
                  >
                    x
                  </p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {this.state.Confirmed ? (
            <div>
              <p>Confirmed</p>
              {this.state.confirmedIdsAll.map((v) => (
                <div key={v.uid} className="manageusers-user-card">
                  <img alt="img" src={v.profileImageURL} />
                  <div>
                    <p>{v.name}</p>
                    <p>{v.phone}</p>
                  </div>
                  <p
                    onClick={() => this.deleteconfirmedIds(v.uid)}
                    className="manageusers-button-delete"
                  >
                    x
                  </p>
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
