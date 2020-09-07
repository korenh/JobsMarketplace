import React, { Component } from "react";
import "./Loading.css";

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-page">
        <div className="loading-center">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
