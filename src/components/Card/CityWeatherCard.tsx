import React, { useEffect } from "react";
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
import { isNil, isNotNil } from "ramda";
import { Button } from "../ui/button";
import { SkeletonCard } from "../shared/Card/SkeletonCard";
import { getWeatherBackgroundColor } from "@/utils/getWeatherBackgroundColor";
import clsx from "clsx";
import { useStore } from "@/app/store";

type CityWeatherCardProps = {
  city?: string;
};

const CityWeatherCard = ({ city }: CityWeatherCardProps) => {
  const removeCity = useStore((state) => state.removeCity);
  const { data, isPending, isPlaceholderData, isError, refetch } = useQuery({
    ...getWeatherByCityQuery({ city }),
    enabled: isNotNil(city),
    placeholderData: keepPreviousData,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      city && removeCity(city);
    }
  }, [isError]);

  if (isNil(data) || isError) {
    return null;
  }

  if (isPending || isPlaceholderData) {
    return <SkeletonCard />;
  }
  const bgColor = getWeatherBackgroundColor(data.weather[0].id);

  return (
    <Card className={clsx(["w-[700px]", "mb-4", bgColor])}>
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
        <Button className="mr-2" onClick={() => city && removeCity(city)}>
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

export default CityWeatherCard;
