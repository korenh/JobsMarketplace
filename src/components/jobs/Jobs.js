import React, { Component } from "react";
import "./Jobs.css";
import Add from "../../icons/add.png";
import firebase from "../protected/Firebase";
import { Link } from "react-router-dom";

export default class Jobs extends Component {
  state = {
    jobs: [],
    popUp: false,
    popUp2: false,
    numberRequired: 0,
  };

  componentDidMount() {
    this.getData();
  }

  getData = (async) => {
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .orderBy("dateCreated", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = {
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

  render() {
    return (
      <div className="jobs">
        <br />
        <br />
        <img
          onClick={() => this.setState({ popUp: true, popUp2: false })}
          src={Add}
          className="add-job-icon"
          alt="img"
        />
        <br />
        {this.state.popUp ? (
          <div className="new-job">
            <h2>New Job</h2>
            <input
              type="text"
              placeholder="Job Title"
              className="new-job-input"
            />
            <br />
            <textarea
              type="text"
              placeholder="Job Description & Requirements"
              className="new-job-textarea"
            />
            <br />
            <p>Pick up to 5 categories which your job applies.</p>
            <p>#item#item#item#item</p>
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
            <p>3hrs , 6hrs, 9hrs</p>
            <h3>Payment infornmation</h3>
            <p>How much will you pay for the job (per emplyee)?</p>
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
            <input type="checkbox" />
            <p>Payment is hourly</p>
            <input type="checkbox" />
            <p>I shall be paying for emplyers transportation fees</p>
            <h3>When & Where</h3>
            <p>When is the job taking place?</p>
            <button>Select date </button>
            <button>Select Start time </button>

            <p>Where is the job taking place?</p>
            <button>Use my current location </button>
            <button>Do not specify location </button>
            <br />
            <br />
            <br />
            <button
              onClick={() => this.setState({ popUp: false, popUp2: true })}
            >
              Continue
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.popUp2 ? (
          <div className="new-job">
            <h2>Confirm detailes</h2>
            <p>
              Please review the details of your job before posting it. you may
              go back and edit details if necessary.
            </p>
            <div className="new-job-details">
              <p>Title: </p>
              <p>Description/Requirements: </p>
              <p>Categories: </p>
              <p>Number of workers: </p>
              <p>Estimated duration: </p>
              <p>Payment: </p>
              <p>Covering transportation fees: </p>
              <p>Date: </p>
              <p>Time: </p>
              <p>Location: </p>
            </div>
            <div>
              <input type="checkbox" />
              <span>I agree to Altro's </span>
              <Link>Terms of Services & Employment</Link>
              <br />
              <span>and</span>
              <Link>Privacy Policy</Link>
            </div>
            <br />
            <button onClick={() => this.setState({ popUp2: false })}>
              Publish Job
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.jobs.map((job) => (
          <div className="jobs-card" key={job.description}>
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
