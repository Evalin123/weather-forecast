import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { getWeatherByCityQuery } from "@/app/api/weather/byCity/route";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { isNotNil } from "ramda";
import { Button } from "../ui/button";
import { SkeletonCard } from "../shared/Card/SkeletonCard";

type CityWeatherCardProps = {
  city?: string;
  onDelete: () => void;
};

const CityWeatherCard = ({ city, onDelete }: CityWeatherCardProps) => {
  const { data, isPending, isPlaceholderData, refetch } = useQuery({
    ...getWeatherByCityQuery({ city }),
    enabled: isNotNil(city),
    placeholderData: keepPreviousData,
  });

  if (isPending || isPlaceholderData) {
    return <SkeletonCard />;
  }

  return (
    <Card className="w-[700px] mb-4">
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

export default CityWeatherCard;
