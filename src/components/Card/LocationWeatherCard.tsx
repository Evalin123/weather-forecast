import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getWeatherByCoordsQuery } from "@/app/api/weather/byCoords/route";
import { isNil, isNotNil } from "ramda";
import { Button } from "../ui/button";
import { SkeletonCard } from "../shared/Card/SkeletonCard";
import { getWeatherBackgroundColor } from "@/utils/getWeatherBackgroundColor";
import { useStore } from "@/app/store";

type LocationWeatherCardProps = {
  latitude?: number;
  longitude?: number;
};

const LocationWeatherCard = ({
  latitude,
  longitude,
}: LocationWeatherCardProps) => {
  const removeUserLocation = useStore((state) => state.removeUserLocation);
  const { data, refetch, isPending, isPlaceholderData, isError } = useQuery({
    ...getWeatherByCoordsQuery({ latitude, longitude }),
    enabled: isNotNil(latitude) && isNotNil(longitude),
    placeholderData: keepPreviousData,
  });

  if (isNil(data) || isError) {
    return null;
  }

  if (isPending || isPlaceholderData) {
    return <SkeletonCard />;
  }

  const bgColor = getWeatherBackgroundColor(data.weather[0].id);
  return (
    <Card className={`w-[700px] ${bgColor}`}>
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
      <CardFooter>
        <Button className="mr-2" onClick={removeUserLocation}>
          Delete
        </Button>
        <Button
          onClick={() => {
            refetch();
          }}
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationWeatherCard;
