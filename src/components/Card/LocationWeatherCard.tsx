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
import { isNotNil } from "ramda";
import { Button } from "../ui/button";
import { SkeletonCard } from "../shared/Card/SkeletonCard";

type LocationWeatherCardProps = {
  latitude?: number;
  longitude?: number;
  onDelete: () => void;
};

const LocationWeatherCard = ({
  latitude,
  longitude,
  onDelete,
}: LocationWeatherCardProps) => {
  const { data, refetch, isPending, isPlaceholderData } = useQuery({
    ...getWeatherByCoordsQuery({ latitude, longitude }),
    enabled: isNotNil(latitude) && isNotNil(longitude),
    placeholderData: keepPreviousData,
  });

  if (isPending || isPlaceholderData) {
    return <SkeletonCard />;
  }
  return (
    <Card className="w-[700px]">
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
        <Button onClick={onDelete}>Delete</Button>
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
