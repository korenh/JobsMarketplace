import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Close from "../../../icons/close.png";

export default class Mapview extends Component {
  state = {
    lat: 0,
    lng: 0,
    viewport: {
      latitude: 32.12257459473794,
      longitude: 34.8154874641065,
      width: "100%",
      height: "80vh",
      zoom: 10,
    },
  };

  dosome = (lat, lng) => {
    this.setState({ lat, lng });
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
          mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
        >
          <img
            src={Close}
            onClick={() => this.props.setMap()}
            alt="img"
            style={{ cursor: "pointer", height: "40px", margin: "1em" }}
          />
          <Marker
            offsetTop={-48}
            offsetLeft={-24}
            latitude={32.12257459473794}
            longitude={34.8154874641065}
          >
            <img
              src=" https://img.icons8.com/color/48/000000/marker.png"
              alt="img"
            />
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}