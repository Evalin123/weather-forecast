import React from "react";

type WeatherCardProps = {
  city: string;
  temperature: number;
  description: string;
};

const WeatherCard = (props: WeatherCardProps) => {
  return (
    <div className="weather-card">
      <h2>{props.city}</h2>
      <p>Temperature: {props.temperature} °C</p>
      <p>Description: {props.description}</p>
    </div>
  );
};

export default WeatherCard;
