import React, { Component } from "react";
import { addNotification, GeoName } from "../../functions/helper";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Job.css";
import Filter from "@material-ui/icons/FilterList";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import MapIcon from "@material-ui/icons/Map";
import StarIcon from "@material-ui/icons/Star";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import NearMeIcon from "@material-ui/icons/NearMe";
import Mapview from "../map/Mapview";
import firebase from "../../protected/Firebase";
import ReactMapGL, { Marker } from "react-map-gl";
import StarRatingComponent from "react-star-rating-component";

export default class Search extends Component {
  state = {
    hours: [
      { id: 1, name: "< 3hrs" },
      { id: 2, name: "< 6hrs" },
      { id: 3, name: "< 12hrs" },
      { id: 4, name: "< 1d" },
      { id: 5, name: "1d +" },
    ],
    Filter: [5, 15, 25, 50, 100],
    kmFilter: 10000,
    limit: 10,
    jobs: [],
    job: {},
    filterpop: false,
    mappop: false,
    acceptedIds: [],
    lat: undefined,
    lng: undefined,
    savedIds: [],
    dateValID: 11,
    radiusValID: 11,
    dateValue: new Date(new Date().setDate(new Date().getDate() - 1)),
    endDateValue: new Date("05 October 2024 14:48 UTC"),
    locations: [],
    requests: [],
    allUsers: [],
    allLocations: [],
  };

  loadMore = () => {
    this.setState({ limit: this.state.limit + 10 });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }

  getCoord = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ lat: position.coords.latitude });
      this.setState({ lng: position.coords.longitude });
    });
  };

  getData = (async) => {
    this.getCoord();
    const allData = [];
    const locations = [];
    const allUsers = [];
    const allLocations = [];
    firebase
      .firestore()
      .collection("jobs")
      .orderBy("startDate")
      .where("startDate", ">=", this.state.dateValue)
      .where("startDate", "<=", this.state.endDateValue)
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
            creatingUserId: doc.data().creatingUserId,
            location: doc.data().location,
            categories: doc.data().stringCategories,
            isPaymentPerHour: doc.data().isPaymentPerHour,
            duration: doc.data().duration,
            requiredEmployees: doc.data().requiredEmployees,
            isPayingForTransportation: doc.data().isPayingForTransportation,
            numberOfSaves: doc.data().numberOfSaves,
            numberOfViews: doc.data().numberOfViews,
            savedIds: doc.data().savedIds,
            km: this.calcCrow(doc.data().location.Ba, doc.data().location.Oa),
            Geoname: GeoName(doc.data().location.Ba, doc.data().location.Oa),
            viewport: {
              latitude: doc.data().location.Oa,
              longitude: doc.data().location.Ba,
              width: "100%",
              height: "40vh",
              zoom: 10,
            },
          };
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${
              doc.data().location.Oa
            }&longitude=${
              doc.data().location.Ba
            }&localityLanguage=en&key=5305f546fbc84e378acc3138bdd5a82f`
          )
            .then((response) => response.json())
            .then((data) => {
              const Geo = { Geo: data.city, id: doc.id };
              allLocations.push(Geo);
              this.setState({ allLocations });
            });
          firebase
            .firestore()
            .collection("users")
            .doc(doc.data().creatingUserId)
            .get()
            .then((doc) => {
              const data = {
                name: doc.data().name,
                profileImageURL: doc.data().profileImageURL,
                id: doc.data().uid,
                employerRating: doc.data().employerRating.sumOfRatings,
              };
              allUsers.push(data);
              this.setState({ allUsers });
            });
          //-----method ends here-----//
          allData.push(data);
          locations.push(doc.data().location);
        });
        this.setState({ jobs: allData, locations });
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
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .get()
      .then((doc) => {
        this.setState({ requests: doc.data().requests });
      });

    this.state.requests.push({
      requestingUserId: sessionStorage.getItem("uid"),
      dateRequested: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .update({ requests: this.state.requests });
    addNotification({
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      fromUser: sessionStorage.getItem("uid"),
      fromUsername: sessionStorage.getItem("name"),
      jobId: job.id,
      notificationType: "newRequest",
      toUser: job.creatingUserId,
    });
    toast.configure();
    toast.info("Job apllied", { autoClose: 2000 });
  };

  saveJob = (job) => {
    let docRef = firebase.firestore().collection("jobs").doc(job.id);
    docRef.get().then((doc) => {
      this.setState({ savedIds: doc.data().savedIds });
    });
    if (this.state.savedIds.includes(sessionStorage.getItem("uid"))) {
      toast.configure();
      toast.warning("Already saved", { autoClose: 2000 });
      return;
    }
    this.state.savedIds.push(sessionStorage.getItem("uid"));
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .update({ savedIds: this.state.savedIds });
    toast.configure();
    toast.info("Job saved", { autoClose: 2000 });
  };

  setFilter = () => {
    this.setState({ filterpop: !this.state.filterpop, mappop: false });
  };

  handleSearch = () => {
    this.setState({ filterpop: !this.state.filterpop });
    setTimeout(() => {
      this.getData();
    }, 1);
  };

  setMap = () => {
    this.setState({ mappop: !this.state.mappop, filterpop: false });
  };

  calcCrow(lon2, lat2, unit) {
    var radlat1 = (Math.PI * this.state.lat) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = this.state.lng - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }

  dateFilterFunc = (v) => {
    this.setState({
      endDateValue: new Date(new Date().setDate(new Date().getDate() + v)),
      dateValID: v,
    });
  };

  RadiusFilterFunc = (v) => {
    this.setState({ kmFilter: v, radiusValID: v });
  };

  getUserName = (id) => {
    const arr = this.state.allUsers;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return arr[i].name;
      }
    }
  };

  getUserPic = (id) => {
    const arr = this.state.allUsers;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return arr[i].profileImageURL;
      }
    }
  };

  getUserRate = (id) => {
    const arr = this.state.allUsers;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return arr[i].employerRating;
      }
    }
  };

  getUserGeoName = (id) => {
    const arr = this.state.allLocations;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        if (arr[i].Geo === "") {
          return "";
        } else {
          return ", " + arr[i].Geo;
        }
      }
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="myjobs-main-head-flex">
          <p
            className="job-top-flex-p"
            onClick={() => this.setFilter()}
            style={{ color: "rgb(45, 123, 212)" }}
          >
            <Filter style={{ color: "rgb(45, 123, 212)", fontSize: 15 }}>
              add_circle
            </Filter>
            Filter
          </p>
          <p
            className="job-top-flex-p"
            onClick={() => this.setMap()}
            style={{ color: "rgb(45, 123, 212)" }}
          >
            <MapIcon style={{ color: "rgb(45, 123, 212)", fontSize: 15 }}>
              add_circle
            </MapIcon>
            MapView
          </p>
        </div>
        {this.state.filterpop ? (
          <div className="filter-card-main">
            <div className="filter-card-main-inner">
              <h3>Job filter</h3>
              <p>How far can you go?</p>
              <div className="filter-card-flex">
                <p
                  style={
                    this.state.radiusValID === 5
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.RadiusFilterFunc(5)}
                >
                  5 km
                </p>
                <p
                  style={
                    this.state.radiusValID === 15
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.RadiusFilterFunc(15)}
                >
                  15 km
                </p>
                <p
                  style={
                    this.state.radiusValID === 25
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.RadiusFilterFunc(25)}
                >
                  25 km
                </p>
                <p
                  style={
                    this.state.radiusValID === 50
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.RadiusFilterFunc(50)}
                >
                  50 km
                </p>
                <p
                  style={
                    this.state.radiusValID === 100
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.RadiusFilterFunc(100)}
                >
                  100 km
                </p>
                <p
                  style={
                    this.state.radiusValID === 10000
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.RadiusFilterFunc(10000)}
                >
                  100+ km
                </p>
              </div>
              <p>When?</p>
              <div className="filter-card-flex">
                <p
                  style={
                    this.state.dateValID === 0
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.dateFilterFunc(0)}
                >
                  Today
                </p>
                <p
                  style={
                    this.state.dateValID === 1
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.dateFilterFunc(1)}
                >
                  Tomorrow
                </p>
                <p
                  style={
                    this.state.dateValID === 7
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.dateFilterFunc(7)}
                >
                  This week
                </p>
                <p
                  style={
                    this.state.dateValID === 1000
                      ? {
                          background: "rgb(45, 123, 212)",
                          padding: "0.1em 0.5em",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => this.dateFilterFunc(1000)}
                >
                  Next week
                </p>
              </div>
            </div>
            <div className="filter-card-flex2">
              <button
                className="filter-card-cancel"
                onClick={() => this.setFilter()}
              >
                Cancel
              </button>
              <button
                className="filter-card-search"
                onClick={() => this.handleSearch()}
              >
                Search
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.mappop ? (
          <div className="map-card-main">
            <Mapview
              locations={this.state.locations}
              setMap={this.setMap}
              lat={this.state.lat}
              lng={this.state.lng}
            />
          </div>
        ) : (
          ""
        )}
        <div className="jobs">
          {this.state.jobs.map((job) =>
            /*this.state.job.km < this.state.kmFilter ? diaplay : notDisplay*/
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
                  <p>
                    <span>
                      <CalendarTodayIcon
                        style={{ fontSize: 20, margin: "0", color: "gray" }}
                      />
                    </span>
                    {job.dateCreated.toDate().toDateString()}
                  </p>
                  <p>
                    <span>
                      <LocationOnIcon
                        style={{ fontSize: 20, margin: "0", color: "gray" }}
                      />
                    </span>
                    {Math.round(job.km)} km {this.getUserGeoName(job.id)}
                  </p>
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
                key={job.id}
                onClick={() => this.jobPopUp(job)}
              >
                <ReactMapGL
                  {...job.viewport}
                  mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
                  mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
                  pitch="60"
                  bearing="-60"
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
                      <p>
                        <span>
                          <CalendarTodayIcon
                            style={{
                              fontSize: 20,
                              margin: "0",
                              color: "white",
                            }}
                          />
                        </span>
                        {job.dateCreated.toDate().toDateString()}
                      </p>
                      <p>
                        <span>
                          <LocationOnIcon
                            style={{
                              fontSize: 20,
                              margin: "0",
                              color: "white",
                            }}
                          />
                        </span>
                        {Math.round(job.km)} km , {job.Geoname}
                      </p>
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
                        <QueryBuilderIcon
                          className="jobs-selected-flex-img"
                          style={{ fontSize: 40, color: "white" }}
                        />
                        <p>
                          {
                            this.state.hours.find((o) => o.id === job.duration)
                              .name
                          }
                        </p>
                      </div>
                      <div>
                        <AccessibilityNewIcon
                          className="jobs-selected-flex-img"
                          style={{ fontSize: 40, color: "white" }}
                        />
                        <p>{job.requiredEmployees}</p>
                      </div>
                      <div>
                        <DirectionsCarIcon
                          className="jobs-selected-flex-img"
                          style={{ fontSize: 40, color: "white" }}
                        />
                        <p>{job.isPayingForTransportation ? "✓" : "x"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="jobs-selected-card-body-right">
                    <div className="jobs-selected-bottom-line">
                      <button
                        className="jobs-selected-save-button"
                        onClick={() => this.saveJob(job)}
                      >
                        <StarIcon
                          style={{ color: "rgb(45, 123, 212)", fontSize: 14 }}
                        ></StarIcon>
                        Save job
                      </button>
                      <br />
                      <button
                        className="jobs-selected-apply-button"
                        onClick={() => this.applyJob(job)}
                      >
                        <NearMeIcon
                          style={{ color: "white", fontSize: 14 }}
                        ></NearMeIcon>
                        Apply to job
                      </button>
                    </div>
                    <img
                      src={this.getUserPic(job.creatingUserId)}
                      alt="img"
                      className="jobs-selected-profile"
                    />
                    <p>{this.getUserName(job.creatingUserId)}</p>
                    <StarRatingComponent
                      starCount={5}
                      value={this.getUserRate(job.creatingUserId)}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {this.state.jobs.length > 9 ? (
          <button onClick={() => this.loadMore()} className="jobs-load-more">
            More results
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
