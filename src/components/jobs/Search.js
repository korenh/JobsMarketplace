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

  saveJob = (job) => {
    if (sessionStorage.getItem("saved") === null) {
      sessionStorage.setItem("saved", []);
    }
    var res = sessionStorage.getItem("saved").split(",");
    let saved = res;
    if (saved.includes(job.id)) {
      alert("job already saved");
      return;
    }
    saved.push(job.id);
    sessionStorage.setItem("saved", saved);
    firebase
      .firestore()
      .collection("users")
      .doc(sessionStorage.getItem("uid"))
      .update({
        saved,
      })
      .then(function () {
        console.log("updated");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  jobPopUp = (job) => {
    console.log(job.geo);
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
    console.log(this.state.job);
  };

  render() {
    return (
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
              key={job.description}
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
                    <button className="jobs-selected-apply-button">
                      Apply to job
                    </button>
                  </div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
                    alt="img"
                    className="jobs-selected-profile"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}
