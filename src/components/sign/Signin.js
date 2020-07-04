import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "../../icons/altro2.png";
import Facebook from "../../icons/facebook.png";
import Google from "../../icons/google.png";

import "./Signin.css";

export default class Signin extends Component {
  render() {
    return (
      <div className="signin">
        <div className="signin-header">
          <img src={Altro} alt="img" style={{ height: "40px" }} />
          <p>
            Single jobs for everyone , <br /> by everyone
          </p>
        </div>
        <div className="signin-body">
          <h2>Sign in</h2>
          <input type="text" placeholder="Email" className="signin-input" />
          <br />
          <input type="text" placeholder="Password" className="signin-input" />
          <br />
          <Link to="/main">
            <button className="signin-button">Sign in</button>
          </Link>
        </div>
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
          <div className="signin-footer-bottom">
            <p className="signin-also">
              _____ you can also countinue with _____
            </p>
            <button className="siginin-button-facebook">
              <img src={Facebook} alt="img" style={{ height: "16px" }} />
              Facebook
            </button>
            <button className="siginin-button-google">
              <img src={Google} alt="img" style={{ height: "16px" }} />
              Google
            </button>
          </div>
        </div>
      </div>
    );
  }
}
