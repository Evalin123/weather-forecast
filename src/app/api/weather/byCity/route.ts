import axios from "axios";
import { queryOptions } from "@tanstack/react-query";
import { GetWeatherResponse } from "../constant";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type GetWeatherByCityParams = {
  city?: string;
};

export const getWeatherByCity = async ({ city }: GetWeatherByCityParams) => {
  const { data } = await axios.get<GetWeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
  );
  return data;
};

export const getWeatherByCityQuery = (params: GetWeatherByCityParams) =>
  queryOptions({
    queryKey: ["getWeatherByCity", params],
    queryFn: () => getWeatherByCity(params),
  });

export const headWeatherByCity = async ({ city }: GetWeatherByCityParams) => {
  const { data } = await axios.head<GetWeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
  );
  return data;
};
