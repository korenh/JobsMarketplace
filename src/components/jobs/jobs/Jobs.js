import React, { Component } from "react";
import "./Job.css";
import firebase from "../../protected/Firebase";
import ReactMapGL, { Marker } from "react-map-gl";
import Filter from "../../../icons/filter.png";
import Map from "../../../icons/map.png";
import Time from "../../../icons/time.png";
import Car from "../../../icons/car.png";
import Man from "../../../icons/man.png";

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
    filterpop: false,
  };

  loadMore = () => {
    this.setState({ limit: this.state.limit + 9 });
    this.getData();
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      sessionStorage.setItem("lat", position.coords.latitude);
      sessionStorage.setItem("lng", position.coords.longitude);
    });
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
            km: this.calcCrow(doc.data().location.Ba, doc.data().location.Oa),
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

  setFilter = () => {
    this.setState({ filterpop: !this.state.filterpop });
  };

  calcCrow(lat2, lon2) {
    var lat1 = sessionStorage.getItem("lat");
    var lon1 = sessionStorage.getItem("lng");
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    lat1 = lat1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = 6371 * c;
    return d;
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.filterpop ? (
          <div className="filter-card-main">
            <div className="filter-card-main-inner">
              <h3>Job filter</h3>
              <p>How far can you go?</p>
              <div className="filter-card-flex">
                <p>5 km</p>
                <p>15 km</p>
                <p>25 km</p>
                <p>50 km</p>
                <p>100 km</p>
              </div>
              <p>When?</p>
              <div className="filter-card-flex">
                <p>Today</p>
                <p>Tomorrow</p>
                <p>This week</p>
                <p>Next week</p>
              </div>
            </div>
            <div className="filter-card-flex2">
              <button
                className="filter-card-cancel"
                onClick={() => this.setFilter()}
              >
                Cancel
              </button>
              <button className="filter-card-search">Search</button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="jobs">
          <br />
          <br />
          <br />
          <button className="job-filter-button">
            <img
              src={Filter}
              className="job-img-button2"
              alt="img"
              onClick={() => this.setFilter()}
            />
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
                  <p className="jobs-card-description">{job.title}</p>
                  <h3>${job.payment}</h3>
                </div>
                <div className="jobs-card-info">
                  <p>Today , 6:30pm </p>
                  <p> {Math.round(job.km)} km</p>
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
                >
                  <Marker
                    offsetTop={-48}
                    offsetLeft={-24}
                    latitude={31.952110800000003}
                    longitude={34.906551}
                  >
                    <img src=" https://img.icons8.com/color/48/000000/marker.png" />
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
