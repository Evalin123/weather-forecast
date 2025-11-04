import React from 'react';
import { getWeatherType } from './constants';
import RainAnimation from './RainAnimation';
import ThunderstormAnimation from './ThunderstormAnimation';
import DrizzleAnimation from './DrizzleAnimation';
import SnowAnimation from './SnowAnimation';
import AtmosphereAnimation from './AtmosphereAnimation';
import ClearAnimation from './ClearAnimation';
import CloudsAnimation from './CloudsAnimation';

type WeatherAnimationProps = {
    weatherId: number;
};

const WeatherAnimation = ({ weatherId }: WeatherAnimationProps) => {
    const weatherType = getWeatherType(weatherId);

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
        case 'clouds':
            animationComponent = <CloudsAnimation />;
            break;
        default:
            return <div className="absolute inset-0 bg-gray-200 rounded-lg"></div>;
    }

    return (
        <div className="absolute inset-0 rounded-lg">
            <DrizzleAnimation />
        </div>
    );
};

export default WeatherAnimation;
