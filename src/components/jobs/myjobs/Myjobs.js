import React, { Component } from "react";
import "../Jobs.css";
import { addNotification, GeoName } from "../../functions/helper";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import ChatIcon from "@material-ui/icons/Chat";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import BackspaceIcon from "@material-ui/icons/Backspace";
import StarIcon from "@material-ui/icons/Star";
import NearMeIcon from "@material-ui/icons/NearMe";
import firebase from "../../protected/Firebase";
import Chat from "../publishmanage/components/chat/Chat";
import ReactMapGL, { Marker } from "react-map-gl";
import StarsIcon from "@material-ui/icons/Stars";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Contact from "../publishmanage/components/contact/Contact";
import StarRatingComponent from "react-star-rating-component";

export default class Myjobs extends Component {
  state = {
    jobs: [],
    jobsConfirmed: [],
    job: {},
    saved: true,
    going: false,
    lat: undefined,
    lng: undefined,
    ContactPopup: false,
  };

  getCoord = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ lat: position.coords.latitude });
      this.setState({ lng: position.coords.longitude });
    });
  };

  removeA(arr) {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }

  setSaved = (async) => {
    setTimeout(() => {
      this.setState({ saved: true, going: false });
      this.getData();
    }, 1);
  };

  setGoing = (async) => {
    setTimeout(() => {
      this.setState({ saved: false, going: true });
      this.getData();
    }, 1);
  };

  componentDidMount() {
    this.getData();
    this.getData2();
  }
  getData = (async) => {
    this.getCoord();
    const field = ["savedIds", "acceptedIds"];
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .where(
        this.state.saved ? field[0] : field[1],
        "array-contains",
        sessionStorage.getItem("uid")
      )
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
            categories: doc.data().stringCategories,
            isPaymentPerHour: doc.data().isPaymentPerHour,
            duration: doc.data().duration,
            requiredEmployees: doc.data().requiredEmployees,
            isPayingForTransportation: doc.data().isPayingForTransportation,
            creatingUserId: doc.data().creatingUserId,
            numberOfSaves: doc.data().numberOfSaves,
            numberOfViews: doc.data().numberOfViews,
            km: this.calcCrow(doc.data().location.Ba, doc.data().location.Oa),
            Geoname: GeoName(doc.data().location.Ba, doc.data().location.Oa),

            viewport: {
              latitude: 32.12257459473794,
              longitude: 34.8154874641065,
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

  getData2 = (async) => {
    this.getCoord();
    const allData = [];
    firebase
      .firestore()
      .collection("jobs")
      .where("confirmedIds", "array-contains", sessionStorage.getItem("uid"))
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
            categories: doc.data().stringCategories,
            isPaymentPerHour: doc.data().isPaymentPerHour,
            duration: doc.data().duration,
            requiredEmployees: doc.data().requiredEmployees,
            isPayingForTransportation: doc.data().isPayingForTransportation,
            creatingUserId: doc.data().creatingUserId,
            numberOfSaves: doc.data().numberOfSaves,
            numberOfViews: doc.data().numberOfViews,
            km: this.calcCrow(doc.data().location.Ba, doc.data().location.Oa),
            Geoname: GeoName(doc.data().location.Ba, doc.data().location.Oa),
            viewport: {
              latitude: 32.12257459473794,
              longitude: 34.8154874641065,
              width: "100%",
              height: "40vh",
              zoom: 10,
            },
          };
          allData.push(data);
        });
        this.setState({ jobsConfirmed: allData });
      });
  };

  jobPopUp = (job) => {
    this.setState({ job });
    this.setState({
      viewport: {
        latitude: 32.12257459473794,
        longitude: 34.8154874641065,
        width: "100%",
        height: "40vh",
        zoom: 10,
      },
    });
  };

  ContactPopup = (job) => {
    this.setState({ ContactPopup: !this.state.ContactPopup, jobdash: job });
  };

  Chat = (job) => {
    this.setState({ jobChat: !this.state.jobChat, jobdash: job });
  };

  unsaveJob = (job) => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .get()
      .then((doc) => {
        let savedIds = doc.data().savedIds;
        this.removeA(savedIds, sessionStorage.getItem("uid"));
        firebase.firestore().collection("jobs").doc(job.id).update({
          savedIds,
        });
      });
    this.getData();
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

  toconfirmedUsers = (job) => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .get()
      .then((doc) => {
        let acceptedIds = doc.data().acceptedIds;
        let confirmedIds = doc.data().confirmedIds;
        this.removeA(acceptedIds, sessionStorage.getItem("uid"));
        confirmedIds.push(sessionStorage.getItem("uid"));
        firebase.firestore().collection("jobs").doc(job.id).update({
          acceptedIds,
          confirmedIds,
        });
        addNotification({
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          fromUser: sessionStorage.getItem("uid"),
          fromUsername: sessionStorage.getItem("name"),
          jobId: job.id,
          notificationType: "userConfirmed",
          toUser: job.creatingUserId,
        });
        setTimeout(() => {
          this.getData();
        }, 1);
      });
  };

  removeConfirmed = (job) => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .get()
      .then((doc) => {
        let confirmedIds = doc.data().confirmedIds;
        this.removeA(confirmedIds, sessionStorage.getItem("uid"));
        firebase.firestore().collection("jobs").doc(job.id).update({
          confirmedIds,
        });
        addNotification({
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          fromUser: sessionStorage.getItem("uid"),
          fromUsername: sessionStorage.getItem("name"),
          jobId: job.id,
          notificationType: "userLeft",
          toUser: job.creatingUserId,
        });
        setTimeout(() => {
          this.getData();
        }, 1);
      });
  };

  render() {
    return (
      <div>
        <div className="myjobs-main-head-flex">
          <p
            onClick={() => this.setSaved()}
            style={{
              background: this.state.saved ? "rgb(45, 123, 212)" : "none",
              color: this.state.saved ? "white" : "gray",
            }}
          >
            <StarIcon style={{ color: "white", fontSize: 15 }} />
            Saved
          </p>
          <p
            onClick={() => this.setGoing()}
            style={{
              background: this.state.going ? "rgb(45, 123, 212)" : "none",
              color: this.state.going ? "white" : "gray",
            }}
          >
            <NearMeIcon style={{ color: "white", fontSize: 15 }} />
            Going
          </p>
        </div>
        {this.state.ContactPopup ? (
          <Contact job={this.state.jobdash} ContactPopup={this.ContactPopup} />
        ) : (
          ""
        )}
        {this.state.saved ? (
          <div>
            <div className="myjobs">
              {this.state.jobChat ? (
                <div className="dashboard-card">
                  <Chat job={this.state.jobdash} Chat={this.Chat} />
                </div>
              ) : (
                ""
                //--------------------------------------------------------------------------------//
                //--------------------------------------------------------------------------------//
                //--------------------------------------------------------------------------------//
              )}

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
                        {Math.round(job.km)} km
                      </p>
                    </div>
                    <div className="jobs-card-tags">
                      {job.categories.map((tag) => (
                        <p className="jobs-card-tags-item" key={tag}>
                          {tag}
                        </p>
                      ))}
                    </div>
                    <StarsIcon
                      style={{
                        color: "rgb(45, 123, 212)",
                        fontSize: 30,
                        float: "right",
                        margin: "5px",
                      }}
                    />
                  </div>
                ) : (
                  <div className="jobs-selected-card" key={job.description}>
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
                        latitude={32.12257459473794}
                        longitude={34.8154874641065}
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
                          <p>{job.dateCreated.toDate().toDateString()}</p>
                          <p> {Math.round(job.km)} km</p>
                        </div>
                        <div className="jobs-card-tags">
                          {job.categories.map((tag) => (
                            <p
                              className="jobs-selected-card-tag-item"
                              key={tag}
                            >
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
                            <p>{job.duration}</p>
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
                            <p>
                              {job.isPayingForTransportation
                                ? "covered"
                                : "not covered"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="jobs-selected-card-body-right">
                        <div className="jobs-selected-bottom-line">
                          <br />
                          <button
                            className="jobs-selected-save-button"
                            onClick={() => this.ContactPopup(job)}
                          >
                            <PhoneIphoneIcon
                              style={{
                                fontSize: 15,
                                color: "rgb(45, 123, 212)",
                              }}
                            />
                            Contact
                          </button>
                          <br />
                          <button className="jobs-selected-finish-button">
                            <CheckCircleIcon
                              style={{
                                fontSize: 15,
                                color: "white",
                              }}
                            />
                            Apply Job
                          </button>
                          <br />
                          <button
                            className="jobs-selected-delete-button"
                            onClick={() => this.unsaveJob(job)}
                          >
                            <BackspaceIcon
                              style={{
                                fontSize: 15,
                                color: "white",
                              }}
                            />
                            Unsave
                          </button>
                        </div>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
                          alt="img"
                          className="jobs-selected-profile"
                        />
                        <p>{sessionStorage.getItem("name")}</p>
                        <StarRatingComponent starCount={5} value={4} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          //--------------------------------------------------------------------------------//
          //--------------------------------------------------------------------------------//
          //--------------------------------------------------------------------------------//
          <div>
            <div className="myjobs">
              {this.state.jobChat ? (
                <div className="dashboard-card">
                  <Chat job={this.state.job} Chat={this.Chat} />
                </div>
              ) : (
                ""
              )}
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
                        {Math.round(job.km)} km
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
                  <div className="jobs-selected-card" key={job.description}>
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
                        latitude={32.12257459473794}
                        longitude={34.8154874641065}
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
                          <p>{job.dateCreated.toDate().toDateString()}</p>
                          <p> {Math.round(job.km)} km</p>
                        </div>
                        <div className="jobs-card-tags">
                          {job.categories.map((tag) => (
                            <p
                              className="jobs-selected-card-tag-item"
                              key={tag}
                            >
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
                            <p>{job.duration}</p>
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
                            <p>
                              {job.isPayingForTransportation
                                ? "covered"
                                : "not covered"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="jobs-selected-card-body-right">
                        <div className="jobs-selected-bottom-line">
                          <br />
                          <button
                            className="jobs-selected-save-button"
                            onClick={() => this.ContactPopup(job)}
                          >
                            <PhoneIphoneIcon
                              style={{
                                fontSize: 15,
                                color: "rgb(45, 123, 212)",
                              }}
                            />
                            Contact
                          </button>
                          <br />
                          <button
                            className="jobs-selected-save-button"
                            onClick={() => this.Chat()}
                          >
                            <ChatIcon
                              style={{
                                fontSize: 15,
                                color: "rgb(45, 123, 212)",
                              }}
                            />
                            Chat
                          </button>
                          <br />
                          <button
                            className="jobs-selected-finish-button"
                            onClick={() => this.toconfirmedUsers(job)}
                          >
                            <CheckCircleIcon
                              style={{
                                fontSize: 15,
                                color: "white",
                              }}
                            />
                            Confirm
                          </button>
                          <br />
                          <button className="jobs-selected-delete-button">
                            <BackspaceIcon
                              style={{
                                fontSize: 15,
                                color: "white",
                              }}
                            />
                            Abort
                          </button>
                        </div>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
                          alt="img"
                          className="jobs-selected-profile"
                        />
                        <p>{sessionStorage.getItem("name")}</p>
                        <StarRatingComponent starCount={5} value={4} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            {this.state.jobChat ? (
              <div className="dashboard-card">
                <Chat job={this.state.job} Chat={this.Chat} />
              </div>
            ) : (
              ""
            )}
            {
              //--------------------------------------------------------------------------------//
              //--------------------------------------------------------------------------------//
              //--------------------------------------------------------------------------------//
              this.state.jobsConfirmed.map((job) =>
                this.state.job.id !== job.id ? (
                  <div
                    className="jobs-card2"
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
                        {Math.round(job.km)} km
                      </p>
                    </div>
                    <div className="jobs-card-tags">
                      {job.categories.map((tag) => (
                        <p className="jobs-selected-card-tag-item" key={tag}>
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="jobs-selected-card" key={job.description}>
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
                        latitude={32.12257459473794}
                        longitude={34.8154874641065}
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
                          <p>{job.dateCreated.toDate().toDateString()}</p>
                          <p> {Math.round(job.km)} km</p>
                        </div>
                        <div className="jobs-card-tags">
                          {job.categories.map((tag) => (
                            <p
                              className="jobs-selected-card-tag-item"
                              key={tag}
                            >
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
                            <p>{job.duration}</p>
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
                            <p>
                              {job.isPayingForTransportation
                                ? "covered"
                                : "not covered"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="jobs-selected-card-body-right">
                        <div className="jobs-selected-bottom-line">
                          <br />
                          <button
                            className="jobs-selected-save-button"
                            onClick={() => this.ContactPopup(job)}
                          >
                            <PhoneIphoneIcon
                              style={{
                                fontSize: 15,
                                color: "rgb(45, 123, 212)",
                              }}
                            />
                            Contact
                          </button>
                          <br />
                          <button
                            className="jobs-selected-save-button"
                            onClick={() => this.Chat()}
                          >
                            <ChatIcon
                              style={{
                                fontSize: 15,
                                color: "rgb(45, 123, 212)",
                              }}
                            />
                            Chat
                          </button>
                          <br />

                          <button
                            className="jobs-selected-delete-button"
                            onClick={() => this.removeConfirmed(job)}
                          >
                            <BackspaceIcon
                              style={{
                                fontSize: 15,
                                color: "white",
                              }}
                            />
                            Remove
                          </button>
                        </div>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a"
                          alt="img"
                          className="jobs-selected-profile"
                        />
                        <p>{sessionStorage.getItem("name")}</p>
                        <StarRatingComponent starCount={5} value={4} />
                      </div>
                    </div>
                  </div>
                )
              )
            }
          </div>
        )}
      </div>
    );
  }
}
