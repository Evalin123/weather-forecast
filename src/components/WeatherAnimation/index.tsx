import React from 'react';
import { getWeatherType, getWeatherBackgroundColor } from './constants';
import RainAnimation from './RainAnimation';
import ThunderstormAnimation from './ThunderstormAnimation';
import DrizzleAnimation from './DrizzleAnimation';
import SnowAnimation from './SnowAnimation';
import AtmosphereAnimation from './AtmosphereAnimation';
import ClearAnimation from './ClearAnimation';

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
        case 'drizzle':
            animationComponent = <DrizzleAnimation />;
            break;
        case 'snow':
            animationComponent = <SnowAnimation />;
            break;
        case 'atmosphere':
            animationComponent = <AtmosphereAnimation />;
            break;
        case 'clear':
            animationComponent = <ClearAnimation />;
            break;
        default:
            animationComponent = null;
    }

    return <div className={`absolute inset-0 ${bgColor} rounded-lg`}>{animationComponent}</div>;
};

export default WeatherAnimation;
