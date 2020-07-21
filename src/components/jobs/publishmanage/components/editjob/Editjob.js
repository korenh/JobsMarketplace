import React, { Component } from "react";
import firebase from "../../../../protected/Firebase";
import "./Editjob.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export default class Editjob extends Component {
  state = {
    payment: this.props.job.payment,
    title: this.props.job.title,
    description: this.props.job.description,
  };
  Update = () => {
    firebase.firestore().collection("jobs").doc(this.props.job.id).update({
      description: this.state.description,
      title: this.state.title,
      payment: this.state.payment,
    });
    this.props.getData();
    this.props.Editjob();
  };

  render() {
    return (
      <div className="editjob-main">
        <ChevronLeftIcon
          onClick={() => this.props.Editjob()}
          className="newjob-back-btn"
          alt="img"
          style={{ color: "white", fontsize: 40 }}
        />
        <br />
        <div className="newjob-number-flex">
          <p
            className="newjob-plus-button"
            onClick={() =>
              this.setState({
                payment: this.state.payment + 5,
              })
            }
          >
            +
          </p>
          <p className="newjob-required">{this.state.payment}$</p>
          <p
            className="newjob-minus-button"
            onClick={() =>
              this.setState({
                payment: this.state.payment - 5,
              })
            }
          >
            -
          </p>
        </div>
        <br />
        <input
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
          className="new-job-input"
        />
        <br />
        <textarea
          value={this.state.description}
          onChange={(e) => this.setState({ description: e.target.value })}
          className="new-job-textarea"
        />
        <br />
        <button onClick={() => this.Update()} className="signup-button">
          Update
        </button>
      </div>
    );
  }
}
