import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import CancelIcon from "@material-ui/icons/Cancel";

export default function Mapview2(props) {
  const [mark, setMark] = useState([props.lat, props.lng]);
  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.lng,
    width: "100%",
    height: "40vh",
    zoom: 10,
  });

  const onMarkerclick = (e) => {
    setMark(e.lngLat);
    props.parentCallback(e.lngLat);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoia29yZW5oYW1yYSIsImEiOiJjazRscXBqeDExaWw2M2VudDU5OHFsN2tjIn0.Fl-5gMOM35kqUiLLjKNmgg"
        mapStyle="mapbox://styles/korenhamra/ck4lsl9kd2euf1cnruee3zfbo"
        pitch="60"
        bearing="-60"
        onViewportChange={(viewport) => setViewport(viewport)}
        onClick={(e) => onMarkerclick(e)}
      >
        <CancelIcon
          onClick={() => props.setMap()}
          alt="img"
          style={{
            cursor: "pointer",
            fontSize: 45,
            margin: "5px",
            color: "white",
          }}
        />
        <Marker
          offsetTop={-48}
          offsetLeft={-24}
          latitude={mark[1]}
          longitude={mark[0]}
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
