import React, { Component } from "react";
import "../Jobs.css";
import Dashboard from "./components/dashboard/Dashboard";
import Chat from "./components/chat/Chat";
import Editjob from "./components/editjob/Editjob";
import firebase from "../../protected/Firebase";
import { addNotification } from "../../functions/helper";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker } from "react-map-gl";
import DatePicker from "react-datepicker";
import Close from "../../../icons/close.png";
import Arrow from "../../../icons/arrow.png";
import Time from "../../../icons/time.png";
import Car from "../../../icons/car.png";
import Man from "../../../icons/man.png";

export default class Jobs extends Component {
  state = {
    job: {},
    jobdash: {},
    tags: [
      { id: 1, name: "human" },
      { id: 2, name: "men" },
      { id: 3, name: "woman" },
      { id: 4, name: "delivery" },
      { id: 5, name: "sell" },
    ],
    hours: [
      { id: 1, name: "< 3hrs" },
      { id: 2, name: "< 6hrs" },
      { id: 3, name: "< 12hrs" },
      { id: 4, name: "< 1d" },
      { id: 5, name: "1d +" },
    ],
    title: "",
    hour: { id: 1, name: "< 3hrs" },
    description: "",
    numberRequired: 0,
    payment: 0,
    endDate: new Date(),
    startDate: new Date(),
    jobs: [],
    time: "null",
    hourly: false,
    transportation: false,
    agree: false,
    popUp: false,
    popUp2: false,
    jobDashboard: false,
    jobChat: false,
    editJob: false,
    lat: undefined,
    lng: undefined,
  };

  handleEnd = (date) => {
    this.setState({
      endDate: date,
    });
  };

  handleStart = (date) => {
    this.setState({
      startDate: date,
    });
  };

  getCoord = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ lat: position.coords.latitude });
      this.setState({ lng: position.coords.longitude });
    });
  };

  Continue = () => {
    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.payment === 0 ||
      this.state.numberRequired === 0
    ) {
      alert("Fill required fields");
      return;
    }
    this.setState({ popUp: false, popUp2: true });
  };

  componentDidMount() {
    this.getData();
    this.getCoord();
  }

  getData = () => {
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .orderBy("dateCreated", "desc")
      .limit(20)
      .where("creatingUserId", "==", sessionStorage.getItem("uid"))
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            geo: doc.data().location,
            description: doc.data().description,
            duration: doc.data().duration,
            requiredEmployees: doc.data().requiredEmployees,
            payment: doc.data().payment,
            startDate: doc.data().startDate,
            location: doc.data().location,
            categories: doc.data().stringCategories,
            viewport: {
              latitude: doc.data().location.Oa,
              longitude: doc.data().location.Ba,
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

  addJob = () => {
    if (this.state.agree === false) {
      alert("Please accept Terms of Services & Privacy Policy");
      return;
    }
    this.setState({ popUp2: false });
    firebase
      .firestore()
      .collection("jobs")
      .add({
        id: "2hg32h1jg321",
        creatingUserId: sessionStorage.getItem("uid"),
        dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
        title: this.state.title,
        description: this.state.description,
        stringCategories: ["backend", "science", "developer", "network"],
        payment: this.state.payment,
        isPaymentPerHour: this.state.hourly,
        isPayingForTransportation: this.state.transportation,
        requiredEmployees: this.state.numberRequired,
        duration: this.state.hour.id,
        numberOfSaves: 0,
        numberOfViews: 0,
        location: new firebase.firestore.GeoPoint(
          this.state.lat,
          this.state.lng
        ),

        shouldUseCustomTime: true,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        acceptedIds: [],
        confirmedIds: [],
        acceptedUsers: [],
        confirmedUsers: [],
        requests: [],
      })
      .then((docRef) => {
        this.setState({ popUp2: false });
        firebase.firestore().collection("jobs").doc(docRef.id).update({
          id: docRef.id,
        });
        addNotification({
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          fromUser: sessionStorage.getItem("uid"),
          fromUsername: sessionStorage.getItem("name"),
          jobId: docRef.id,
          notificationType: "New Job created",
          toUser: sessionStorage.getItem("uid"),
        });
        this.getData();
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

  Dashboard = (job) => {
    this.setState({ jobDashboard: !this.state.jobDashboard, jobdash: job });
  };

  Chat = (job) => {
    this.setState({ jobChat: !this.state.jobChat, jobdash: job });
  };

  Editjob = (job) => {
    this.setState({ editJob: !this.state.editJob, jobdash: job });
  };

  deleteJob = (job) => {
    firebase.firestore().collection("jobs").doc(job.id).delete();
    setInterval(() => {
      this.setState({ jobDashboard: false });
      this.getData();
    }, 100);
  };

  FinishJob = (job) => {
    let docRef = firebase.firestore().collection("jobs").doc(job.id);
    docRef.get().then((doc) => {
      firebase.firestore().collection("jobs").doc(job.id).delete();
      firebase.firestore().collection("archive").add(doc.data());
      setInterval(() => {
        this.setState({ jobDashboard: false });
        this.getData();
      }, 100);
    });
  };

  render() {
    return (
      <div>
        <div className="myjobs-main-head-flex">
          <p
            className="job-top-flex-p"
            onClick={() => this.setState({ popUp: true, popUp2: false })}
            style={{ color: "rgb(45, 123, 212)" }}
          >
            New Job
          </p>
          <p className="job-top-flex-p" style={{ color: "rgb(45, 123, 212)" }}>
            Archive
          </p>
        </div>

        <div className="jobs">
          <br />
          <br />
          {this.state.editJob ? (
            <div className="dashboard-card">
              <Editjob
                job={this.state.jobdash}
                Editjob={this.Editjob}
                getData={this.getData}
              />
            </div>
          ) : (
            ""
          )}
          {this.state.jobDashboard ? (
            <div className="dashboard-card">
              <Dashboard
                job={this.state.jobdash}
                jobDashboard={this.state.jobDashboard}
                Dashboard={this.Dashboard}
                deleteJob={this.deleteJob}
              />
            </div>
          ) : (
            ""
          )}
          {this.state.jobChat ? (
            <div className="dashboard-card">
              <Chat job={this.state.jobdash} Chat={this.Chat} />
            </div>
          ) : (
            ""
          )}
          <br />
          {this.state.popUp ? (
            <div className="new-job">
              <img
                onClick={() => this.setState({ popUp: false, popUp2: false })}
                className="newjob-close-btn"
                src={Close}
                alt="img"
              />
              <h2>New Job</h2>
              <input
                type="text"
                placeholder="Job Title"
                className="new-job-input"
                defaultValue={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <br />
              <textarea
                type="text"
                placeholder="Job Description & Requirements"
                className="new-job-textarea"
                defaultValue={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
              <br />
              <p>Pick up to 5 categories which your job applies.</p>
              {this.state.tags.map((tag) => (
                <span className="newjob-tag-list-item" key={tag.id}>
                  #{tag.name}
                </span>
              ))}
              <p>How many employees requires for the job?</p>
              <div className="newjob-number-flex">
                <p
                  className="newjob-plus-button"
                  onClick={() =>
                    this.setState({
                      numberRequired: this.state.numberRequired + 1,
                    })
                  }
                >
                  +
                </p>
                <p className="newjob-required">{this.state.numberRequired}</p>
                <p
                  className="newjob-minus-button"
                  onClick={() =>
                    this.setState({
                      numberRequired: this.state.numberRequired - 1,
                    })
                  }
                >
                  -
                </p>
              </div>
              <p>What is approximated job duration?</p>
              <div className="newjob-hours-list">
                {this.state.hours.map((tag) =>
                  this.state.hour.id === tag.id ? (
                    <span key={tag.id} className="newjob-hours-list-item2">
                      {tag.name}
                    </span>
                  ) : (
                    <span
                      key={tag.id}
                      className="newjob-hours-list-item"
                      onClick={() => this.setState({ hour: tag })}
                    >
                      {tag.name}
                    </span>
                  )
                )}
              </div>
              <h3>Payment infornmation</h3>
              <p>How much will you pay for the job (per emplyee)?</p>
              <div className="newjob-number-flex">
                <p
                  className="newjob-plus-button"
                  onClick={() =>
                    this.setState({
                      payment: this.state.payment + 5,
                    })
                  }
                >
                  +
                </p>
                <p className="newjob-required">{this.state.payment}$</p>
                <p
                  className="newjob-minus-button"
                  onClick={() =>
                    this.setState({
                      payment: this.state.payment - 5,
                    })
                  }
                >
                  -
                </p>
              </div>
              <input
                type="checkbox"
                style={{ fontSize: "20px" }}
                onChange={(e) => this.setState({ hourly: !this.state.hourly })}
              />
              <span> Payment is hourly</span>
              <br />
              <br />
              <input
                type="checkbox"
                style={{ fontSize: "20px" }}
                onChange={(e) =>
                  this.setState({ transportation: !this.state.transportation })
                }
              />
              <span> I shall be paying for emplyers transportation fees</span>
              <h3>When & Where</h3>
              <p>When is the job taking place?</p>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEnd}
                className="jobs-datepicker"
              />
              <span> Select End date </span>
              <br />
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStart}
                className="jobs-datepicker"
              />
              <span> Select Start time </span>

              <p>Where is the job taking place?</p>
              <span className="signup-link">Use my current location </span>
              <br />
              <span className="signup-link">Do not specify location </span>
              <br />
              <br />
              <br />
              <button onClick={() => this.Continue()} className="signup-button">
                Continue
              </button>
            </div>
          ) : (
            ""
          )}
          {this.state.popUp2 ? (
            <div className="new-job">
              <img
                onClick={() => this.setState({ popUp: true, popUp2: false })}
                className="newjob-back-btn"
                src={Arrow}
                alt="img"
              />
              <h2>Confirm detailes</h2>
              <p>
                Please review the details of your job before posting it. you may
                go back and edit details if necessary.
              </p>
              <div className="new-job-details">
                <p>
                  Title: <span> {this.state.title} </span>
                </p>
                <p>
                  Description/Requirements:{" "}
                  <span> {this.state.description} </span>
                </p>
                <p>Categories: </p>
                <p>
                  Number of workers: <span> {this.state.numberRequired} </span>
                </p>
                <p>
                  Estimated duration: <span>{this.state.hour.name}</span>
                </p>
                <p>
                  Payment:
                  <span>
                    ${this.state.payment} {this.state.hourly ? "hourly" : ""}
                  </span>
                </p>
                <p>
                  Covering transportation fees:
                  <span> {this.state.transportation ? "yes" : "no"} </span>
                </p>
                <p>
                  Date: <span>{this.state.startDate.toString()}</span>
                </p>
                <p>
                  Time: <span>{this.state.time}</span>{" "}
                </p>
                <p>Location: </p>
              </div>
              <div>
                <input
                  type="checkbox"
                  style={{ fontSize: "20px" }}
                  onChange={(e) => this.setState({ agree: !this.state.agree })}
                />
                <span> I agree to Altro's </span>
                <Link to="/" className="signup-link">
                  Terms of Services & Employment
                </Link>
                <br />
                <span>and</span>
                <Link to="/" className="signup-link ">
                  Privacy Policy
                </Link>
              </div>
              <br />
              <button onClick={() => this.addJob()} className="signup-button">
                Publish Job
              </button>
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
              <div
                className="jobs-selected-card"
                key={job.description}
                onClick={() => this.jobPopUp(job)}
              >
                <ReactMapGL
                  {...job.viewport}
                  // center={[32.958984, -5.353521]}
                  // fitBounds={[[32.958984, -5.353521], [43.50585, 5.615985]]}}
                  mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
                  mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
                >
                  <Marker
                    offsetTop={-48}
                    offsetLeft={-24}
                    latitude={job.geo.Oa}
                    longitude={job.geo.Ba}
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
                        <p className="jobs-selected-card-tag-item" key={tag}>
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
                        <p>
                          {
                            this.state.hours.find((o) => o.id === job.duration)
                              .name
                          }
                        </p>
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
                      <p style={{ lineHeight: "0" }}>Manage your job</p>
                      <br />
                      <button className="jobs-selected-boost-button">
                        Boost
                      </button>
                      <br />
                      <button
                        className="jobs-selected-save-button"
                        onClick={() => this.Dashboard(job)}
                      >
                        Manage
                      </button>
                      <br />
                      <button
                        className="jobs-selected-save-button"
                        onClick={() => this.Editjob(job)}
                      >
                        Edit
                      </button>
                      <br />
                      <button
                        className="jobs-selected-save-button"
                        onClick={() => this.Chat(job)}
                      >
                        Chat
                      </button>
                      <br />
                      <button
                        className="jobs-selected-finish-button"
                        onClick={() => this.FinishJob(job)}
                      >
                        Finish Job
                      </button>
                      <br />
                      <button
                        className="jobs-selected-delete-button"
                        onClick={() => this.deleteJob(job)}
                      >
                        Delete Job
                      </button>
                    </div>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
                      alt="img"
                      className="jobs-selected-profile"
                    />
                    <p style={{ lineHeight: "0" }}>
                      {sessionStorage.getItem("name")}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}
