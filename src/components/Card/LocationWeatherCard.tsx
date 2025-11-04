import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getWeatherByCoordsQuery } from '@/app/api/weather/byCoords/route';
import { isNotNil } from 'ramda';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { SkeletonCard } from '../shared/Card/SkeletonCard';
import { useStore } from '@/app/store';
import WeatherAnimation from '../WeatherAnimation';
import { Navigation, X, Info } from 'lucide-react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from '../ui/drawer';
import {
    degToDirection,
    formatTime,
    formatWindSpeed,
    formatVisibility,
} from '@/utils/weatherUtils';

type LocationWeatherCardProps = {
    latitude?: number;
    longitude?: number;
};

const LocationWeatherCard = ({ latitude, longitude }: LocationWeatherCardProps) => {
    const removeUserLocation = useStore(state => state.removeUserLocation);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { data, refetch, isPending, isPlaceholderData, isError } = useQuery({
        ...getWeatherByCoordsQuery({ latitude, longitude }),
        enabled: isNotNil(latitude) && isNotNil(longitude),
        placeholderData: keepPreviousData,
    });

    if (isError) {
        return null;
    }

    if (isPending || isPlaceholderData) {
        return <SkeletonCard />;
    }

    return (
        <>
            <Card className={clsx('weather-card w-full relative overflow-hidden')}>
                <WeatherAnimation weatherId={data.weather[0].id} />
                <CardHeader className="pb-2 pr-12 relative z-10">
                    <CardTitle className="weather-card-title flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Navigation className="h-5 w-5" />
                            <span>{data?.name}</span>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600"
                            onClick={removeUserLocation}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pb-4 relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="weather-icon-wrapper">
                                <Image
                                    priority
                                    src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                                    width={64}
                                    height={64}
                                    alt="Weather Icon"
                                />
                            </div>
                            <p className="weather-description mt-2">
                                {data?.weather[0].description}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="weather-temp">{Math.round(data?.main.temp)}°</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Feels like {Math.round(data?.main.feels_like)}°
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                H: {Math.round(data?.main.temp_max)}° L:{' '}
                                {Math.round(data?.main.temp_min)}°
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="gap-2 pt-4 border-t border-gray-200/50 relative z-10">
                    <Button
                        variant="outline"
                        className="flex-1 btn-primary"
                        onClick={() => {
                            refetch();
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        variant="default"
                        className="flex-1 btn-primary"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <Info className="h-4 w-4 mr-2" />
                        Details
                    </Button>
                </CardFooter>
            </Card>

            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader className="sticky top-0 bg-background z-10 border-b">
                        <DrawerTitle className="text-2xl flex items-center gap-2">
                            <Navigation className="h-6 w-6" />
                            {data?.name} Weather Details
                        </DrawerTitle>
                        <DrawerDescription>
                            {data?.weather[0].description} •{' '}
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 py-6 max-w-4xl mx-auto w-full overflow-y-auto flex-1">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
                                        width={100}
                                        height={100}
                                        alt="Weather Icon"
                                    />
                                    <div>
                                        <p className="text-5xl font-bold text-gray-800">
                                            {Math.round(data?.main.temp)}°C
                                        </p>
                                        <p className="text-lg text-gray-600 mt-1">
                                            Feels like {Math.round(data?.main.feels_like)}°C
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Temperature Range</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {Math.round(data?.main.temp_min)}° -{' '}
                                    {Math.round(data?.main.temp_max)}°C
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Wind</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {formatWindSpeed(data?.wind.speed)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Direction: {degToDirection(data?.wind.deg)} ({data?.wind.deg}°)
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Humidity</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {data?.main.humidity}%
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Pressure</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {data?.main.pressure} hPa
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Sunrise</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {formatTime(data?.sys.sunrise, data?.timezone)}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Sunset</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {formatTime(data?.sys.sunset, data?.timezone)}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Visibility</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {formatVisibility(data?.visibility)}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="text-sm text-gray-500 mb-1">Cloud Coverage</p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {data?.clouds.all}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <DrawerFooter className="sticky bottom-0 bg-background border-t">
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default LocationWeatherCard;
