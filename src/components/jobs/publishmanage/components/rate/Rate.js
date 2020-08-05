import React, { Component } from "react";
import firebase from "../../../../protected/Firebase";
import "./Rate.css";
import StarRatingComponent from "react-star-rating-component";

export default class Rate extends Component {
  state = {
    array: [],
  };

  componentDidMount() {
    let docRef = firebase.firestore().collection("jobs").doc(this.props.job.id);
    docRef.get().then((doc) => {
      let array = [];
      let confirmedIds = doc.data().confirmedIds;
      for (let i = 0; i < confirmedIds.length; i++) {
        array.push({ rate: 5, id: confirmedIds[i] });
      }
      this.setState({ array });
    });
  }

  onStarClick(nextValue, prevValue, name) {
    let array = this.state.array;
    for (var i in array) {
      if (array[i].id === name) {
        array[i].rate = nextValue;
      }
      this.setState({ array });
    }
  }

  Rate = () => {
    this.props.popupRate();
  };

  render() {
    return (
      <div className="rate-main">
        <h1>Rating</h1>
        <br />
        {this.state.array.map((user) => (
          <div key={user.id}>
            <p>{user.id}</p>
            <StarRatingComponent
              name={user.id}
              starCount={5}
              value={user.rate}
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>
        ))}
        <br />
        <button onClick={() => this.Rate()}>Rate</button>
      </div>
    );
  }
}
