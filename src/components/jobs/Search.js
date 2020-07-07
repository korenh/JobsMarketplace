import React, { Component } from "react";
import firebase from "../protected/Firebase";
import ReactMapGL, { Marker } from "react-map-gl";

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
            geo: doc.data().location,
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
                <div>
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
                      <p className="jobs-selected-card-tag-item" key={tag}>
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="jobs-selected-card-body-right">
                  <div className="jobs-selected-bottom-line">
                    <button className="jobs-selected-save-button">
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
        <button className="search-filter-button">Filter</button>
      </div>
    );
  }
}