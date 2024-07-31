import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

type WeatherCardProps = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
};

const WeatherCard = (props: WeatherCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.city}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
          width={48}
          height={48}
          alt="Weather Icon"
        />
        <p>{props.temperature} °C</p>
        <p>{props.description}</p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
