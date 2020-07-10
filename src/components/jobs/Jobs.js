import React, { Component } from "react";
import "./Jobs.css";
import firebase from "../protected/Firebase";
import { Link } from "react-router-dom";
import Plus from "../../icons/plus.png";
import DatePicker from "react-datepicker";
import Close from "../../icons/close.png";
import Arrow from "../../icons/arrow.png";

export default class Jobs extends Component {
  state = {
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
    popUp: false,
    popUp2: false,
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

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .orderBy("dateCreated", "desc")
      .limit(10)
      .where("creatingUserId", "==", sessionStorage.getItem("uid"))
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            description: doc.data().description,
            payment: doc.data().payment,
            startDate: doc.data().startDate,
            location: doc.data().location,
            categories: doc.data().categories,
          };
          allData.push(data);
        });
        this.setState({ jobs: allData });
      });
  };

  addJob = () => {
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
        categories: ["backend", "science", "developer", "network"],
        payment: this.state.payment,
        isPaymentPerHour: this.state.hourly,
        isPayingForTransportation: this.state.transportation,
        requiredEmployees: this.state.numberRequired,
        duration: 3,
        numberOfSaves: 0,
        numberOfViews: 0,
        location: new firebase.firestore.GeoPoint(37.33028312, 122.02805328),
        shouldUseCustomTime: true,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        acceptedIds: [],
        confirmedIds: [],
        acceptedUsers: [],
        confirmedUsers: [],
        requests: [],
      })
      .then((ref) => {
        alert("added!");
      });
  };

  render() {
    return (
      <div className="jobs">
        <br />
        <br />
        <button
          onClick={() => this.setState({ popUp: true, popUp2: false })}
          className="job-add-button"
        >
          <img src={Plus} className="job-img-button3" alt="img" />
        </button>
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
            <button
              onClick={() => this.setState({ popUp: false, popUp2: true })}
              className="signup-button"
            >
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
              <input type="checkbox" style={{ fontSize: "20px" }} />
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
        {this.state.jobs.map((job) => (
          <div className="jobs-card" key={job.id}>
            <div className="jobs-card-title">
              <p className="jobs-card-description">{job.description}</p>
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
        ))}
      </div>
    );
  }
}
