import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "../../icons/altro.png";
import firebase from "../protected/Firebase";
import "./Signin.css";

export default class Signin extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.props.history.push("/main/jobs");
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
            });
          });
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
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
          <h2>Sign in</h2>
          <input
            type="text"
            placeholder="Email"
            className="signin-input"
            name="email"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="signin-input"
            name="password"
          />
          <br />
          <button className="signin-button">Sign in</button>
        </form>
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
      </div>
    );
  }
}
