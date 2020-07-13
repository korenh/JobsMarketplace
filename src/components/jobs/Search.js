import React, { Component } from "react";
import firebase from "../protected/Firebase";
import ReactMapGL from "react-map-gl";
import Filter from "../../icons/filter.png";
import Map from "../../icons/map.png";
import Time from "../../icons/time.png";
import Car from "../../icons/car.png";
import Man from "../../icons/man.png";

export default class Search extends Component {
  state = {
    limit: 10,
    jobs: [],
    job: {},
    viewport: {
      latitude: 31.952110800000003,
      longitude: 34.906551,
      width: "100%",
      height: "40vh",
      zoom: 10,
    },
  };

  loadMore = () => {
    this.setState({ limit: this.state.limit + 10 });
    this.getData();
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
      .limit(this.state.limit)
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

  jobPopUp = (job) => {
    this.setState({ job });
    this.setState({
      viewport: {
        latitude: 31.952110800000003,
        longitude: 34.906551,
        width: "100%",
        height: "40vh",
        zoom: 10,
      },
    });
  };

  applyJob = (job) => {
    sessionStorage.setItem("acceptedIds", []);
    let docRef = firebase.firestore().collection("jobs").doc(job.id);
    docRef.get().then(function (doc) {
      sessionStorage.setItem("acceptedIds", doc.data().acceptedIds);
    });
    let acceptedIds = sessionStorage.getItem("acceptedIds").split(",");
    if (acceptedIds.includes(sessionStorage.getItem("uid"))) {
      alert("Request already sent");
      return;
    }
    acceptedIds.push(sessionStorage.getItem("uid"));
    firebase.firestore().collection("jobs").doc(job.id).update({ acceptedIds });
    alert("Request sent");
  };

  saveJob = (job) => {
    sessionStorage.setItem("savedIds", []);
    let docRef = firebase.firestore().collection("jobs").doc(job.id);
    docRef.get().then(function (doc) {
      sessionStorage.setItem("savedIds", doc.data().savedIds);
    });
    let savedIds = sessionStorage.getItem("savedIds").split(",");
    if (savedIds.includes(sessionStorage.getItem("uid"))) {
      alert("Job already saved");
      return;
    }
    savedIds.push(sessionStorage.getItem("uid"));
    firebase.firestore().collection("jobs").doc(job.id).update({ savedIds });
    alert("Job saved");
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="jobs">
          <br />
          <br />
          <br />
          <button className="job-filter-button">
            <img src={Filter} className="job-img-button2" alt="img" />
          </button>
          <button className="job-mapview-button">
            <img src={Map} className="job-img-button" alt="img" />
          </button>
          {this.state.jobs.map((job) =>
            this.state.job.id !== job.id ? (
              <div
                className="jobs-card"
                key={job.id}
                onClick={() => this.jobPopUp(job)}
              >
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
            ) : (
              <div
                className="jobs-selected-card"
                key={job.description}
                onClick={() => this.jobPopUp(job)}
              >
                <ReactMapGL
                  {...this.state.viewport}
                  mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
                  mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
                ></ReactMapGL>
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
                    <p>{job.description}</p>
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
                      <button
                        className="jobs-selected-save-button"
                        onClick={() => this.saveJob(job)}
                      >
                        Save job
                      </button>
                      <br />
                      <button
                        className="jobs-selected-apply-button"
                        onClick={() => this.applyJob(job)}
                      >
                        Apply to job
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
        <button onClick={() => this.loadMore()} className="jobs-load-more">
          More results
        </button>
      </div>
    );
  }
}
