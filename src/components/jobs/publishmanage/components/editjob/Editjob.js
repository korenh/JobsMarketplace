import React, { Component } from "react";
import firebase from "../../../../protected/Firebase";
import "./Editjob.css";
import Arrow from "../../../../../icons/arrow.png";

export default class Editjob extends Component {
  state = {
    title: "",
    description: "",
  };
  Update = () => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(this.props.job.id)
      .update({ description: this.state.description, title: this.state.title });
    this.props.getData();
    this.props.Editjob();
  };

  render() {
    return (
      <div className="editjob-main">
        <img
          onClick={() => this.props.Editjob()}
          className="newjob-back-btn"
          src={Arrow}
          alt="img"
        />
        <br />
        <input
          defaultValue={this.props.job.title}
          onChange={(e) => this.setState({ title: e.target.value })}
          className="new-job-input"
        />
        <br />
        <textarea
          defaultValue={this.props.job.description}
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
