"use client";

import { useState } from "react";
import WeatherCard from "@/components/Card/WeatherCard";
import { useQuery } from "@tanstack/react-query";
import {
  GetWeatherByCityParams,
  getWeatherByCityQuery,
} from "./api/weather/byCity/route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "lucide-react";
import {
  GetWeatherByCoordsParams,
  getWeatherByCoordsQuery,
} from "./api/weather/byCoords/route";

export default function Home() {
  const [city, setCity] = useState<string>();
  const [coords, setCoords] = useState<GetWeatherByCoordsParams>();

  const { data: cityWeather, isPending: isCityLoading } = useQuery({
    ...getWeatherByCityQuery({ city: city }),
    enabled: !!city,
  });

  const {
    data: locationWeather,
    isPending: isLocationLoading,
    isError: isLocationError,
  } = useQuery({
    ...getWeatherByCoordsQuery({
      latitude: coords?.latitude,
      longitude: coords?.longitude,
    }),
    enabled: !!coords && !!coords.latitude && !!coords.longitude,
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCoords({ latitude, longitude });
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  return (
    <div>
      <h1 className="mb-4">Weather App</h1>
      <div className="mb-5 flex w-full max-w-md items-center space-x-2">
        <Input type="text" placeholder="Enter city name" />
        <Button type="submit">Get Weather</Button>
        <Button variant="ghost" size="icon" onClick={getUserLocation}>
          <Navigation className="h-5 w-5" />
        </Button>
      </div>
      <div>
        {cityWeather && (
          <WeatherCard
            icon={cityWeather.weather[0].icon}
            city={cityWeather?.name}
            temperature={cityWeather?.main.temp}
            description={cityWeather.weather[0].description}
          />
        )}
      </div>
      <div>
        {isLocationLoading && <p>Loading...</p>}
        {isLocationError && (
          <p>Error fetching weather data for the current location</p>
        )}
        {locationWeather && (
          <WeatherCard
            icon={locationWeather.weather[0].icon}
            city={locationWeather?.name}
            temperature={locationWeather?.main.temp}
            description={locationWeather.weather[0].description}
          />
        )}
      </div>
    </div>
  );
}
