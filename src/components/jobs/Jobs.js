import React, { Component } from "react";
import "./Jobs.css";
import firebase from "../protected/Firebase";

export default class Jobs extends Component {
  state = {
    jobs: [],
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
      .limit(4)
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
        <div className="jobs-filter">
          <p>Active jobs</p>
          <p>Full jobs</p>
        </div>
        <br />
        <br />
        <br />
        {this.state.jobs.map((job) => (
          <div className="jobs-card" key={job.description}>
            <div className="jobs-card-title">
              <p>{job.description}</p>
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
