import React, { Component } from "react";
import firebase from "../../protected/Firebase";
import "../Jobs.css";
import ReactMapGL, { Marker } from "react-map-gl";
import Time from "../../../icons/time.png";
import Car from "../../../icons/car.png";
import Man from "../../../icons/man.png";

export default class Myjobs extends Component {
  state = {
    jobs: [],
    job: {},
  };
  componentDidMount() {
    this.getData();
  }
  getData = (async) => {
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .where("savedIds", "array-contains", sessionStorage.getItem("uid"))
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
            categories: doc.data().categories,
            isPaymentPerHour: doc.data().isPaymentPerHour,
            duration: doc.data().duration,
            requiredEmployees: doc.data().requiredEmployees,
            isPayingForTransportation: doc.data().isPayingForTransportation,
            numberOfSaves: doc.data().numberOfSaves,
            numberOfViews: doc.data().numberOfViews,
            viewport: {
              latitude: doc.data().location.Ba,
              longitude: doc.data().location.Oa,
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
        latitude: 31.952110800000003,
        longitude: 34.906551,
        width: "100%",
        height: "40vh",
        zoom: 10,
      },
    });
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
              onClick={() => this.jobPopUp()}
            >
              <ReactMapGL
                {...job.viewport}
                mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
                mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
              >
                <Marker
                  offsetTop={-48}
                  offsetLeft={-24}
                  latitude={job.geo.Ba}
                  longitude={job.geo.Oa}
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
                    <button className="jobs-selected-save-button">Chat</button>
                    <br />
                    <button className="jobs-selected-delete-button">
                      Abort
                    </button>
                    <br />
                    <button className="jobs-selected-finish-button">
                      Confirm
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
    );
  }
}
