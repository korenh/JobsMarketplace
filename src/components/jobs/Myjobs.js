import React, { Component } from "react";
import firebase from "../protected/Firebase";
import "./Jobs.css";

export default class Myjobs extends Component {
  state = {
    jobs: [],
  };
  componentDidMount() {
    this.getData();
  }
  getData = (async) => {
    let docRef = firebase
      .firestore()
      .collection("users")
      .doc(sessionStorage.getItem("uid"));
    docRef.get().then(function (doc) {
      sessionStorage.setItem("saved", doc.data().saved);
    });

    let list = sessionStorage.getItem("saved").split(",");
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .where("id", "in", list)
      .orderBy("dateCreated", "desc")
      .limit(10)
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
            categories: doc.data().categories,
            isPaymentPerHour: doc.data().isPaymentPerHour,
            duration: doc.data().duration,
            requiredEmployees: doc.data().requiredEmployees,
            isPayingForTransportation: doc.data().isPayingForTransportation,
            numberOfSaves: doc.data().numberOfSaves,
            numberOfViews: doc.data().numberOfViews,
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
        <br />
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
