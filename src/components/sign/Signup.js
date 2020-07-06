import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "../../icons/altro.png";
import "./Signup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../protected/Firebase";

export default class Signup extends Component {
  state = {
    startDate: new Date(),
  };

  handleRegister = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert("Signed up");
        this.props.history.push("/");
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
    console.log(this.state.startDate);
  };

  render() {
    return (
      <div className="signup">
        <div className="signup-header">
          <img src={Altro} alt="img" style={{ height: "40px" }} />
        </div>
        <form className="signup-form" onSubmit={this.handleRegister}>
          <h2>Sign up</h2>
          <p> i will be primarily using Altro as a...</p>
          <br />
          <input type="file" />
          <br />
          <p>Add your profile picture(optional)</p>
          <br />{" "}
          <input className="signup-input" placeholder="email" name="email" />
          <br />{" "}
          <input
            className="signup-input"
            placeholder="Password"
            name="password"
          />
          <br />
          <input className="signup-input" placeholder="Confirm Password" />
          <br /> <input className="signup-input" placeholder="Phone Number" />
          <br /> <input className="signup-input" placeholder="Business Name" />
          <br />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            className="signup-input"
          />
          <br />
          <textarea
            placeholder="Write about your business"
            className="signup-textarea"
          />
          <br />
          <br /> <span>Already have an acoount?</span>
          <Link to="/" className="signup-link">
            Sign in
          </Link>
          <br />
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
          <br /> <button className="signup-button">Sign up</button>
        </form>
      </div>
    );
  }
}
