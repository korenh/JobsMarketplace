import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "./icons/altro.png";
import firebase from "../protected/Firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Signin.css";
import UserContext from "../protected/UserContext";

export default class Signin extends Component {
  static contextType = UserContext;

  componentDidMount() {
    const { setUser } = this.context;
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("😊");
    });
    if (localStorage.getItem("altro_jwt") !== null) {
      firebase
        .firestore()
        .collection("users")
        .where("uid", "==", localStorage.getItem("altro_jwt"))
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            sessionStorage.setItem("uid", doc.data().uid);
            sessionStorage.setItem("name", doc.data().name);
            sessionStorage.setItem("url", doc.data().profileImageURL);
            sessionStorage.setItem("description", doc.data().description);
            setUser(
              doc.data().uid,
              doc.data().name,
              doc.data().profileImageURL,
              doc.data().description
            );
          });
        });
      this.props.history.push("/main/jobs");
      setTimeout(() => {
        this.props.history.push("/main/jobs");
      }, 2000);
    } else {
      return;
    }
  }
  handleLogin = (e) => {
    const { setUser } = this.context;
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .firestore()
          .collection("users")
          .where("uid", "==", response.user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              sessionStorage.setItem("uid", doc.data().uid);
              sessionStorage.setItem("name", doc.data().name);
              sessionStorage.setItem("url", doc.data().profileImageURL);
              sessionStorage.setItem("description", doc.data().description);
              localStorage.setItem("altro_jwt", doc.data().uid);
              setUser(
                doc.data().uid,
                doc.data().name,
                doc.data().profileImageURL,
                doc.data().description
              );
            });
          });
        this.props.history.push("/main/jobs");
        setTimeout(() => {
          this.props.history.push("/main/jobs");
        }, 1000);
      })
      .catch(function (error) {
        toast.configure();
        toast.error(error.message, {
          autoClose: 2000,
        });
      });
  };

  render() {
    return (
      <div className="signin">
        <div className="signin-header">
          <img src={Altro} alt="img" style={{ height: "40px" }} />
          <p>
            Single jobs for everyone , <br /> by everyone
          </p>
        </div>
        <div className="signin-body"></div>
        <form className="login-form" onSubmit={this.handleLogin}>
          <input
            type="mail"
            placeholder="Email"
            className="signin-inp"
            name="email"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="signin-inp"
            name="password"
          />
          <br />
          <button className="signin-btn">Sign in</button>
          <div className="signin-footer">
            <div className="signin-footer-top">
              <span>Dont have an acoount? </span>
              <Link to="/signup" className="signin-link">
                Sign up
              </Link>
              <br />
              <span className="signin-or">or</span>
              <a href="!#" className="signin-guest">
                Continue as a guest
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
