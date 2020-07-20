import React, { Component } from "react";
import { Link } from "react-router-dom";
import Altro from "../../icons/altro.png";
import "./Signup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../protected/Firebase";
import { storage } from "../protected/Firebase";
import User from "../../icons/notiuser.png";

export default class Signup extends Component {
  state = {
    asa: ["Individual", "Business"],
    asastate: "Business",
    userDate: new Date(),
    name: "",
    isBusiness: true,
    isVerified: false,
    description: [],
    selectedfile: null,
  };

  handleRegister = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let confirm = e.target.elements.confirm.value;
    let name = e.target.elements.name.value;
    let description = e.target.elements.description.value;
    let phone = e.target.elements.phone.value;
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
              .doc(response.user.uid)
              .set({
                uid: response.user.uid,
                name,
                profileImageURL: sessionStorage.getItem("imgurl")
                  ? sessionStorage.getItem("imgurl")
                  : "https://firebasestorage.googleapis.com/v0/b/altro-db7f0.appspot.com/o/users%2F1593953149041.jpg?alt=media&token=62bd1a4f-78f6-4a94-b0b6-3b9ecbf27c8a",
                phone,
                isBusiness: this.state.isBusiness,
                isVerified: false,
                employeeRating: { numberOfRatings: 0, averageRating: 0 },
                employerRating: { numberOfRatings: 0, averageRating: 0 },
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
            alert("somthing went wrong");
          });
      }
    }
  };

  handleChange = (date) => {
    this.setState({
      userDate: date,
    });
  };

  fileselecthandler = (e) => {
    const uploadTask = storage
      .ref(`/users/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          sessionStorage.setItem("imgurl", url);
        });
      }
    );
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
          <label htmlFor="file-input" style={{ cursor: "pointer" }}>
            <img src={User} alt="img" />
          </label>
          <input
            style={{ display: "none" }}
            id="file-input"
            type="file"
            onChange={this.fileselecthandler}
          />
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
          <br />{" "}
          <input
            className="signup-input"
            placeholder="Phone Number"
            name="phone"
          />
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
