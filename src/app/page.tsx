"use client";

import { useState } from "react";
import WeatherCard from "@/components/Card/WeatherCard";
import { useQuery } from "@tanstack/react-query";
import { getWeatherQuery } from "./api/weather/route";

export default function Home() {
  const [city, setCity] = useState("Taipei");
  const { data, isPending } = useQuery({
    ...getWeatherQuery({ city: city }),
    enabled: !!city,
  });

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter city name" />
      <button>Get Weather</button>
      <div>
        {data && (
          <WeatherCard
            city={data?.name}
            temperature={data?.main.temp}
            description={data.weather[0].description}
          />
        )}
      </div>
    </div>
  );
}
