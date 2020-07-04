import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "../../icons/altro2.png";
import "./Signup.css";

export default class Signup extends Component {
  render() {
    return (
      <div className="signup">
        <div className="signup-header">
          <img src={Altro} alt="img" style={{ height: "40px" }} />
        </div>
        <div className="signup-form">
          <h2>Sign up</h2>
          <p> i will be primarily using Altro as a...</p>
          <br /> <input className="signup-input" placeholder="email" />
          <br /> <input className="signup-input" placeholder="Password" />
          <br />
          <input className="signup-input" placeholder="Confirm Password" />
          <br /> <input className="signup-input" placeholder="Phone Number" />
          <br /> <input className="signup-input" placeholder="Business Name" />
          <br /> <input className="signup-input" placeholder="Date of Birth" />
          <br />
          <br /> <span>Already have an acoount?</span>
          <Link to="/" className="signup-link">
            Sign in
          </Link>
          <br /> <button className="signup-button">Continue</button>
        </div>
      </div>
    );
  }
}
