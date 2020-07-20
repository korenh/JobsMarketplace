import React, { Component } from "react";
import "./Review.css";
import Ok from "../../../../../icons/ok.png";

export default class Review2 extends Component {
  render() {
    return (
      <div className="review-main">
        <div className="review-head">
          <img alt="img" src={Ok} />
          <p>
            A job you were attending to 'jobkoren'
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
          <button className="review-submit">Submit</button>
          <button className="review-close">x</button>
        </div>
      </div>
    );
  }
}
