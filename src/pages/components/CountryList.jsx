import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountyItem from "./CountryItem";
import Message from "./Message";

const CountryList = ({cities, isLoading}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        {country: city.country, emoji: city.emoji, id: Math.random()},
      ];
    else return arr;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountyItem country={country} key={country.id} />
      ))}
    </div>
  );
};

export default CountryList;
