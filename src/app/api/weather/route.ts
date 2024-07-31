import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type GetWeatherParams = {
  city: string;
};

type GetWeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const getWeather = async ({ city }: GetWeatherParams) => {
  const { data } = await axios.get<GetWeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
  );
  return data;
};

export const getWeatherQuery = (params: GetWeatherParams) =>
  queryOptions({
    queryKey: ["getWeather", params],
    queryFn: () => getWeather(params),
  });
