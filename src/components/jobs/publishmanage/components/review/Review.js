import React, { Component } from "react";
import "./Review.css";
import firebase from "../../../../protected/Firebase";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Rate from "../rate/Rate";

export default class Review extends Component {
  state = {
    textarea: "",
    ratepop: false,
  };

  popupRate = () => {
    this.setState({ ratepop: !this.state.ratepop });
  };

  sendReview = () => {
    firebase.firestore().collection("doneDeals").doc(this.props.job.id).set({
      jobId: this.props.job.id,
      employerValidated: true,
      pendingUsers: [],
      validatedUsers: [],
    });
    firebase.firestore().collection("jobs").doc(this.props.job.id).delete();
    firebase
      .firestore()
      .collection("archive")
      .doc(this.props.job.id)
      .set(this.props.doc);
    this.props.ReviewJob();
  };

  closeReview = () => {
    firebase.firestore().collection("jobs").doc(this.props.job.id).delete();
    firebase
      .firestore()
      .collection("archive")
      .doc(this.props.job.id)
      .set(this.props.doc);
    this.props.ReviewJob();
  };

  render() {
    return (
      <div className="review-main">
        {this.state.ratepop ? (
          <Rate job={this.props.job} popupRate={this.popupRate} />
        ) : (
          ""
        )}
        <div className="review-head">
          <CheckCircleIcon style={{ fontSize: 40, color: "white" }} />
          <p>
            Your marked the job {this.props.job.title} as <br />
            finished
          </p>
        </div>
        <div className="review-main-content">
          <p style={{ fontWeight: "600" }}>
            We would love to ask you a few questions regrading the job process
            so we can imporve our service!
          </p>
          <p>Did all employees participate in your job as agreed?</p>
          <button className="review-yes">Yes</button>
          <button className="review-no">No</button>
          <p>Did you pay all your employees as agreed?</p>
          <button className="review-yes">Yes</button>
          <button className="review-no">No</button>
          <p>Please rate your employees , it's especially important for them</p>
          <button className="review-yes" onClick={() => this.popupRate()}>
            Go to rating
          </button>
          <button className="review-rate">Rate all 5 stars</button>
          <p>
            Did you have any other feedback regarding the job process or the
            employee? if not , you may leave this field blank.{" "}
          </p>
          <textarea
            typeof="text"
            className="review-textarea"
            placeholder="Write your feedback here"
            onChange={(e) => this.setState({ textarea: e.target.value })}
          />
          <br />
          <button className="review-submit" onClick={() => this.sendReview()}>
            Submit
          </button>
          <button className="review-close" onClick={() => this.closeReview()}>
            x
          </button>
        </div>
      </div>
    );
  }
}
