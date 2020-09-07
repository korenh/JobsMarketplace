import React, { Component } from "react";
import "./Loading.css";

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-page">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
