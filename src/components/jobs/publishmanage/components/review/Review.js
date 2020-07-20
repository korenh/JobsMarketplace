import React, { Component } from "react";
import "./Review.css";
import Ok from "../../../../../icons/ok.png";

export default class Review extends Component {
  render() {
    return (
      <div className="review-main">
        <div className="review-head">
          <img alt="img" src={Ok} />
          <p>
            Your marked the job 'korenjob' as <br />
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
          <button className="review-yes">Go to rating</button>
          <button className="review-rate">Rate all 5 stars</button>
          <p>
            Did you have any other feedback regarding the job process or the
            employee? if not , you may leave this field blank.{" "}
          </p>
          <textarea
            typeof="text"
            className="review-textarea"
            placeholder="Write your feedback here"
          />
          <br />
          <button className="review-submit">Submit</button>
          <button className="review-close">x</button>
        </div>
      </div>
    );
  }
}
