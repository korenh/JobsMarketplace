import React, { Component } from "react";
import "./Review.css";
import firebase from "../../../../protected/Firebase";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default class Review2 extends Component {
  sendReview = () => {
    firebase
      .firestore()
      .collection("doneDeals")
      .doc(this.props.job.jobId)
      .collection(`/feedbacks`)
      .add({
        userId: sessionStorage.getItem("uid"),
        message: "this is a message",
      });
    firebase
      .firestore()
      .collection("notifications")
      .doc(this.props.job.id)
      .delete();
    this.props.jobFinished();
  };

  render() {
    return (
      <div className="review-main">
        <div className="review-head">
          <CheckCircleIcon style={{ fontSize: 40, color: "white" }} />
          <p>
            A job you were attending to {this.props.job.jobId}
            <br />
            was marked as finished by the employer.
          </p>
        </div>
        <div className="review-main-content">
          <p style={{ fontWeight: "600" }}>
            We would love to ask you a few questions regrading the job process
            so we can imporve our service!
          </p>
          <p>Have you took participated in the job?</p>
          <button className="review-yes">Yes</button>
          <button className="review-no">No</button>
          <p>
            Did you get paid according to what was agreed wuth your employer?
          </p>
          <button className="review-yes">Yes</button>
          <button className="review-no">No</button>
          <p>Would you like to rate your employer 'employer-name'?</p>
          <p>'array of 5 stars'</p>
          <p>Did you have any other feedback regarding the job process?</p>
          <textarea
            typeof="text"
            className="review-textarea"
            placeholder="Write your feedback here"
          />
          <br />
          <button className="review-submit" onClick={() => this.sendReview()}>
            Submit
          </button>
          <button className="review-close">x</button>
        </div>
      </div>
    );
  }
}
