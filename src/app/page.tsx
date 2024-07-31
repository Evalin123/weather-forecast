"use client";

import { useState } from "react";
import WeatherCard from "@/components/Card/WeatherCard";
import { useQuery } from "@tanstack/react-query";
import { getWeatherQuery } from "./api/weather/route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [city, setCity] = useState("Taipei");
  const { data, isPending } = useQuery({
    ...getWeatherQuery({ city: city }),
    enabled: !!city,
  });

  return (
    <div>
      <h1 className="mb-4">Weather App</h1>
      <div className="mb-5 flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Enter city name" />
        <Button type="submit">Get Weather</Button>
      </div>
      <div>
        {data && (
          <WeatherCard
            icon={data.weather[0].icon}
            city={data?.name}
            temperature={data?.main.temp}
            description={data.weather[0].description}
          />
        )}
      </div>
    </div>
  );
}
