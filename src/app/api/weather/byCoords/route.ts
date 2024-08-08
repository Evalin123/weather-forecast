import axios from 'axios';
import { queryOptions } from '@tanstack/react-query';
import { GetWeatherResponse } from '../constant';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type GetWeatherByCoordsParams = {
    latitude?: number;
    longitude?: number;
};

const getWeatherByCoords = async ({ latitude, longitude }: GetWeatherByCoordsParams) => {
    const { data } = await axios.get<GetWeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    return data;
};

export const getWeatherByCoordsQuery = (params: GetWeatherByCoordsParams) =>
    queryOptions({
        queryKey: ['getWeatherByCoords', params],
        queryFn: () => getWeatherByCoords(params),
    });
