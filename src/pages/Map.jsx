import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Map position lat: {lat} lng:{lng}
      <button onClick={() => setSearchParams({lat: 10, lng: 20})}>
        change pos
      </button>
    </div>
  );
};

export default Map;
