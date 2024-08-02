import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getWeatherByCoordsQuery } from "@/app/api/weather/byCoords/route";
import { isNotNil } from "ramda";

type LocationWeatherCardProps = {
  latitude?: number;
  longitude?: number;
};

const LocationWeatherCard = ({
  latitude,
  longitude,
}: LocationWeatherCardProps) => {
  const { data, isPending, isError } = useQuery({
    ...getWeatherByCoordsQuery({ latitude, longitude }),
    enabled: isNotNil(latitude) && isNotNil(longitude),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          priority
          src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
          width={48}
          height={48}
          alt="Weather Icon"
        />
        <p>{data?.main.temp} °C</p>
        <p>{data?.weather[0].description}</p>
      </CardContent>
    </Card>
  );
};

export default LocationWeatherCard;
