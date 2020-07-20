import React, { Component } from "react";
import "../Jobs.css";
import firebase from "../../protected/Firebase";
import Chat from "../publishmanage/components/chat/Chat";
import ReactMapGL, { Marker } from "react-map-gl";
import Time from "../../../icons/time.png";
import Car from "../../../icons/car.png";
import Man from "../../../icons/man.png";

export default class Myjobs extends Component {
  state = {
    jobs: [],
    job: {},
    saved: true,
    going: false,
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

  setSaved = (async) => {
    setTimeout(() => {
      this.setState({ saved: true, going: false });
      this.getData();
    }, 1);
  };

  setGoing = (async) => {
    setTimeout(() => {
      this.setState({ saved: false, going: true });
      this.getData();
    }, 1);
  };

  componentDidMount() {
    this.getData();
  }
  getData = (async) => {
    const field = ["savedIds", "confirmedIds"];
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .where(
        this.state.saved ? field[0] : field[1],
        "array-contains",
        sessionStorage.getItem("uid")
      )
      .orderBy("dateCreated", "desc")
      .limit(20)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            geo: doc.data().location,
            description: doc.data().description,
            dateCreated: doc.data().dateCreated,
            payment: doc.data().payment,
            startDate: doc.data().startDate,
            location: doc.data().location,
            categories: doc.data().stringCategories,
            isPaymentPerHour: doc.data().isPaymentPerHour,
            duration: doc.data().duration,
            requiredEmployees: doc.data().requiredEmployees,
            isPayingForTransportation: doc.data().isPayingForTransportation,
            numberOfSaves: doc.data().numberOfSaves,
            numberOfViews: doc.data().numberOfViews,
            viewport: {
              latitude: 32.12257459473794,
              longitude: 34.8154874641065,
              width: "100%",
              height: "40vh",
              zoom: 10,
            },
          };
          allData.push(data);
        });
        this.setState({ jobs: allData });
      });
  };

  jobPopUp = (job) => {
    this.setState({ job });
    this.setState({
      viewport: {
        latitude: 32.12257459473794,
        longitude: 34.8154874641065,
        width: "100%",
        height: "40vh",
        zoom: 10,
      },
    });
  };

  Chat = (job) => {
    this.setState({ jobChat: !this.state.jobChat, jobdash: job });
  };

  unsaveJob = (job) => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .get()
      .then((doc) => {
        let savedIds = doc.data().savedIds;
        this.removeA(savedIds, sessionStorage.getItem("uid"));
        firebase.firestore().collection("jobs").doc(job.id).update({
          savedIds,
        });
      });
    this.getData();
  };

  toconfirmedUsers = (job) => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .get()
      .then((doc) => {
        let confirmedIds = doc.data().confirmedIds;
        let confirmedUsers = doc.data().confirmedUsers;
        this.removeA(confirmedIds, sessionStorage.getItem("uid"));
        confirmedUsers.push({
          confirmingUserId: sessionStorage.getItem("uid"),
          dateConfirmed: firebase.firestore.Timestamp.fromDate(new Date()),
        });
        firebase.firestore().collection("jobs").doc(job.id).update({
          confirmedIds,
          confirmedUsers,
        });
        this.getData();
      });
  };

  confirmes;

  render() {
    return (
      <div>
        <div className="myjobs-main-head-flex">
          <p
            onClick={() => this.setSaved()}
            style={{
              background: this.state.saved ? "rgb(45, 123, 212)" : "none",
              color: this.state.saved ? "white" : "gray",
            }}
          >
            Saved
          </p>
          <p
            onClick={() => this.setGoing()}
            style={{
              background: this.state.going ? "rgb(45, 123, 212)" : "none",
              color: this.state.going ? "white" : "gray",
            }}
          >
            Going
          </p>
        </div>
        {this.state.saved ? (
          <div>
            <div className="myjobs">
              {this.state.jobChat ? (
                <div className="dashboard-card">
                  <Chat job={this.state.jobdash} Chat={this.Chat} />
                </div>
              ) : (
                ""
              )}
              {this.state.jobs.map((job) =>
                this.state.job.id !== job.id ? (
                  <div
                    className="jobs-card"
                    key={job.id}
                    onClick={() => this.jobPopUp(job)}
                  >
                    <div className="jobs-card-title">
                      <p className="jobs-card-description">{job.title}</p>
                      <h3>${job.payment}</h3>
                    </div>
                    <div className="jobs-card-info">
                      <p>Today , 6:30pm </p>
                      <p>Tel Aviv , 2.6 km</p>
                    </div>
                    <div className="jobs-card-tags">
                      {job.categories.map((tag) => (
                        <p className="jobs-card-tags-item" key={tag}>
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="jobs-selected-card" key={job.description}>
                    <ReactMapGL
                      {...job.viewport}
                      mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
                      mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
                    >
                      <Marker
                        offsetTop={-48}
                        offsetLeft={-24}
                        latitude={32.12257459473794}
                        longitude={34.8154874641065}
                      >
                        <img
                          src=" https://img.icons8.com/color/48/000000/marker.png"
                          alt="img"
                        />
                      </Marker>
                    </ReactMapGL>
                    <div className="jobs-selected-card-body">
                      <div className="jobs-selected-card-body-left">
                        <div className="jobs-card-title">
                          <p>{job.title}</p>
                          <h3>${job.payment}</h3>
                        </div>
                        <div className="jobs-card-info">
                          <p>Today , 6:30pm </p>
                          <p>Tel Aviv , 2.6 km</p>
                        </div>
                        <div className="jobs-card-tags">
                          {job.categories.map((tag) => (
                            <p
                              className="jobs-selected-card-tag-item"
                              key={tag}
                            >
                              {tag}
                            </p>
                          ))}
                        </div>
                        <p className="jobs-selected-desc">{job.description}</p>
                        <div className="jobs-selected-flex">
                          <div>
                            <img
                              src={Time}
                              className="jobs-selected-flex-img"
                              alt="img"
                            />
                            <p>{job.duration}</p>
                          </div>
                          <div>
                            <img
                              src={Man}
                              className="jobs-selected-flex-img"
                              alt="img"
                            />
                            <p>{job.requiredEmployees}</p>
                          </div>
                          <div>
                            <img
                              src={Car}
                              className="jobs-selected-flex-img"
                              alt="img"
                            />
                            <p>
                              {job.isPayingForTransportation
                                ? "covering transportation"
                                : "not covering transportation"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="jobs-selected-card-body-right">
                        <div className="jobs-selected-bottom-line">
                          <br />
                          <button className="jobs-selected-save-button">
                            Contact
                          </button>
                          <br />
                          <button className="jobs-selected-finish-button">
                            Apply Job
                          </button>
                          <br />
                          <button
                            className="jobs-selected-delete-button"
                            onClick={() => this.unsaveJob(job)}
                          >
                            Unsave
                          </button>
                        </div>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
                          alt="img"
                          className="jobs-selected-profile"
                        />
                        <p>{sessionStorage.getItem("name")}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="myjobs">
              {this.state.jobChat ? (
                <div className="dashboard-card">
                  <Chat job={this.state.job} Chat={this.Chat} />
                </div>
              ) : (
                ""
              )}
              {this.state.jobs.map((job) =>
                this.state.job.id !== job.id ? (
                  <div
                    className="jobs-card"
                    key={job.id}
                    onClick={() => this.jobPopUp(job)}
                  >
                    <div className="jobs-card-title">
                      <p className="jobs-card-description">{job.title}</p>
                      <h3>${job.payment}</h3>
                    </div>
                    <div className="jobs-card-info">
                      <p>Today , 6:30pm </p>
                      <p>Tel Aviv , 2.6 km</p>
                    </div>
                    <div className="jobs-card-tags">
                      {job.categories.map((tag) => (
                        <p className="jobs-card-tags-item" key={tag}>
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="jobs-selected-card" key={job.description}>
                    <ReactMapGL
                      {...job.viewport}
                      mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
                      mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
                    >
                      <Marker
                        offsetTop={-48}
                        offsetLeft={-24}
                        latitude={32.12257459473794}
                        longitude={34.8154874641065}
                      >
                        <img
                          src=" https://img.icons8.com/color/48/000000/marker.png"
                          alt="img"
                        />
                      </Marker>
                    </ReactMapGL>
                    <div className="jobs-selected-card-body">
                      <div className="jobs-selected-card-body-left">
                        <div className="jobs-card-title">
                          <p>{job.title}</p>
                          <h3>${job.payment}</h3>
                        </div>
                        <div className="jobs-card-info">
                          <p>Today , 6:30pm </p>
                          <p>Tel Aviv , 2.6 km</p>
                        </div>
                        <div className="jobs-card-tags">
                          {job.categories.map((tag) => (
                            <p
                              className="jobs-selected-card-tag-item"
                              key={tag}
                            >
                              {tag}
                            </p>
                          ))}
                        </div>
                        <p className="jobs-selected-desc">{job.description}</p>
                        <div className="jobs-selected-flex">
                          <div>
                            <img
                              src={Time}
                              className="jobs-selected-flex-img"
                              alt="img"
                            />
                            <p>{job.duration}</p>
                          </div>
                          <div>
                            <img
                              src={Man}
                              className="jobs-selected-flex-img"
                              alt="img"
                            />
                            <p>{job.requiredEmployees}</p>
                          </div>
                          <div>
                            <img
                              src={Car}
                              className="jobs-selected-flex-img"
                              alt="img"
                            />
                            <p>
                              {job.isPayingForTransportation
                                ? "covering transportation"
                                : "not covering transportation"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="jobs-selected-card-body-right">
                        <div className="jobs-selected-bottom-line">
                          <br />
                          <button className="jobs-selected-save-button">
                            Contact
                          </button>
                          <br />
                          <button
                            className="jobs-selected-save-button"
                            onClick={() => this.Chat()}
                          >
                            Chat
                          </button>
                          <br />
                          <button
                            className="jobs-selected-finish-button"
                            onClick={() => this.toconfirmedUsers(job)}
                          >
                            Confirm
                          </button>
                          <br />
                          <button className="jobs-selected-delete-button">
                            Abort
                          </button>
                        </div>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
                          alt="img"
                          className="jobs-selected-profile"
                        />
                        <p>{sessionStorage.getItem("name")}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
