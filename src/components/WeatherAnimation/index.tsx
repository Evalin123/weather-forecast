import React from 'react';
import { getWeatherType, getWeatherBackgroundColor } from './constants';
import RainAnimation from './RainAnimation';
import ThunderstormAnimation from './ThunderstormAnimation';

type WeatherAnimationProps = {
    weatherId: number;
};

const WeatherAnimation = ({ weatherId }: WeatherAnimationProps) => {
    const weatherType = getWeatherType(weatherId);
    const bgColor = getWeatherBackgroundColor(weatherId);

    let animationComponent = null;
    switch (weatherType) {
        case 'rain':
            animationComponent = <RainAnimation />;
            break;
        case 'thunderstorm':
            animationComponent = <ThunderstormAnimation />;
            break;
        default:
            animationComponent = null;
    }

    return <div className={`absolute inset-0 ${bgColor} rounded-lg`}>{animationComponent}</div>;
};

export default WeatherAnimation;
