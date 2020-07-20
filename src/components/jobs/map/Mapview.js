import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Close from "../../../icons/close.png";

export default function Mapview(props) {
  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.lng,
    width: "100%",
    height: "80vh",
    zoom: 10,
  });
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
        mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <img
          src={Close}
          onClick={() => props.setMap()}
          alt="img"
          style={{ cursor: "pointer", height: "40px", margin: "1em" }}
        />
        <Marker
          offsetTop={-48}
          offsetLeft={-24}
          latitude={props.lat}
          longitude={props.lng}
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
