import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "../../icons/altro.png";
import "./Signup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../protected/Firebase";

export default class Signup extends Component {
  state = {
    asa: ["Individual", "Business"],
    asastate: "Business",
    userDate: new Date(),
    name: "",
    isBusiness: true,
    isVerified: false,
    description: [],
  };

  handleRegister = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let confirm = e.target.elements.confirm.value;
    let name = e.target.elements.name.value;
    let description = e.target.elements.description.value;

    if (password !== confirm) {
      alert("Passwords do not match");
    } else {
      if (name === "" || description === "") {
        alert("Fill all fields");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            this.setState({ popUp2: false });
            firebase
              .firestore()
              .collection("users")
              .add({
                uid: response.user.uid,
                name,
                profileImageURL:
                  "https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a",
                isBusiness: this.state.isBusiness,
                isVerified: false,
                employeeRating: { numberOfRatings: 0, averageRating: 0 },
                employerRating: { numberOfRatings: 0, averageRating: 0 },
                saved: [],
                description,
                birthDate: this.state.userDate,
                fcmToken: "",
              })
              .then((ref) => {
                alert("signed up!");
              });
            this.props.history.push("/");
          })
          .catch(function (error) {
            var errorMessage = error.message;
            alert(errorMessage);
          });
      }
    }
  };

  handleChange = (date) => {
    this.setState({
      userDate: date,
    });
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
          <div className="signup-type-list">
            {this.state.asa.map((tag) =>
              tag === this.state.asastate ? (
                <span
                  key={tag}
                  className="signup-hours-list-item2"
                  onClick={() =>
                    this.setState({ isBusiness: true, asastate: tag })
                  }
                >
                  {tag}
                </span>
              ) : (
                <span
                  key={tag}
                  className="signup-hours-list-item"
                  onClick={() =>
                    this.setState({ isBusiness: false, asastate: tag })
                  }
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <br />
          <input type="file" />
          <br />
          <p>Add your profile picture(optional)</p>
          <br />
          <input className="signup-input" placeholder="email" name="email" />
          <br />
          <input
            className="signup-input"
            placeholder="Password"
            name="password"
          />
          <br />
          <input
            className="signup-input"
            placeholder="Confirm Password"
            name="confirm"
          />
          <br /> <input className="signup-input" placeholder="Phone Number" />
          <br />{" "}
          <input
            className="signup-input"
            placeholder="Name/Business Name"
            type="text"
            name="name"
          />
          <br />
          <DatePicker
            selected={this.state.userDate}
            onChange={this.handleChange}
            className="signup-input"
          />
          <br />
          <textarea
            placeholder="Write about your self/business"
            className="signup-textarea"
            type="text"
            name="description"
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
