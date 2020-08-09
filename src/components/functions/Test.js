import React, { Component } from "react";
import "./Test.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};

export default class Test extends Component {
  state = initialState;

  state = {
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
  };

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    // let passwordError = "";

    if (!this.state.name) {
      nameError = "Empty field";
    }

    if (!this.state.email.includes("@" && ".")) {
      emailError = "Invalid email";
    }

    if (emailError || nameError) {
      this.setState({ emailError, nameError });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState(initialState);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="signup-form">
        <div>
          <input
            className="signin-input"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <span>{this.state.name.length}</span>
          <p className="err-msg">{this.state.nameError}</p>
        </div>
        <div>
          <input
            className="signin-input"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <span>{this.state.email.length}</span>
          <p className="err-msg">{this.state.emailError}</p>
        </div>
        <div>
          <input
            className="signin-input"
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <span>{this.state.password.length}</span>
          <p className="err-msg">{this.state.passwordError}</p>
        </div>
        <button className="signup-button" type="submit">
          Test
        </button>
      </form>
    );
  }
}
