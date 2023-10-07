import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import {useGeolocation} from "../hooks/useGeolocation";
import {useUrlPosition} from "../hooks/useUrlPosition";
import Button from "./components/Button";

const Map = () => {
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geolocationPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, geolocationPosition);
  return (
    <div className={styles.mapContainer}>
      {/* Map position lat: {mapLat} lng:{mapLng}
      <button onClick={() => setSearchParams({lat: 10, lng: 20})}>
        change pos
      </button> */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      //console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
};
const ChangeCenter = ({position}) => {
  const map = useMap();
  map.setView(position);
  return null;
};
export default Map;
