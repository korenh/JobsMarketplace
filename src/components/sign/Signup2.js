import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "../../icons/altro2.png";
import Arrow from "../../icons/arrow.png";
import "./Signup.css";

export default class Signup2 extends Component {
  render() {
    return (
      <div className="signup">
        <div className="signup-header">
          <Link to="/signup">
            <img className="signup-back" alt="img" src={Arrow} />
          </Link>
          <img src={Altro} alt="img" style={{ height: "40px" }} />
        </div>
        <div className="signup-form">
          <br />
          <br />
          <input type="file" />
          <br />
          <p>Add your profile picture(optional)</p>
          <textarea
            placeholder="Write about your business"
            className="signup-textarea"
          />
          <br />
          <span>i agree to Altro's</span>
          <Link to="/" className="signup-link">
            Terms of service
          </Link>
          <br />
          <span>and</span>
          <Link to="/" className="signup-link">
            Privacy Policy
          </Link>
          <Link to="/">
            <br /> <button className="signup-button">Sign up</button>
          </Link>
        </div>
      </div>
    );
  }
}
