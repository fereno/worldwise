import React from "react";
import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";
import {useCities} from "../../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    //    weekday: "long",
  }).format(new Date(date));

const CityItem = ({city}) => {
  const {currentCity, deleteCity} = useCities();
  const {cityName, emoji, date, id, position} = city;
  const deleteHandler = (e) => {
    e.preventDefault();
    console.log("delete");
    deleteCity(id);
  };
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={deleteHandler}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
