'use client';

import CityWeatherCard from '@/components/Card/CityWeatherCard';
import LocationWeatherCard from '@/components/Card/LocationWeatherCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DragDropContext, Draggable, DragUpdate, Droppable } from '@hello-pangea/dnd';
import { Navigation } from 'lucide-react';
import { isNotEmpty } from 'ramda';
import { useStore } from './store';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getWeatherByCity } from './api/weather/byCity/route';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export default function Home() {
    const { cities, coords, setCities, setCoords } = useStore();

    const addUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCoords({ latitude, longitude });
                },
                error => {
                    toast.error(`Error get user location: ${error.message}`);
                }
            );
        } else {
            toast.warning('Geolocation is not supported by this browser');
        }
    };

    const onDragEnd = (event: DragUpdate) => {
        const { source, destination } = event;

        if (!destination) {
            return;
        }
        const newItems = [...cities];
        const [remove] = newItems.splice(source.index, 1);

        newItems.splice(destination.index, 0, remove);

        setCities(newItems);
    };

    return (
        <div className="weather-container flex flex-col items-center">
            <h1 className="weather-title text-center">Weather Forecast</h1>
            <div className="search-container flex w-full items-center gap-3">
                <AddCityItem />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={addUserLocation}
                    className="btn-primary shrink-0 bg-white hover:bg-gray-100 border-2"
                >
                    <Navigation className="h-5 w-5" />
                </Button>
            </div>
            <div className="cards-grid w-full">
                {isNotEmpty(cities) && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="drop-id">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {cities.map((city, index) => (
                                        <div key={city}>
                                            <Draggable draggableId={city} index={index}>
                                                {provided => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <CityWeatherCard key={index} city={city} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        </div>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
                {isNotEmpty(coords) && (
                    <LocationWeatherCard
                        latitude={coords?.latitude}
                        longitude={coords?.longitude}
                    />
                )}
            </div>
        </div>
    );
}

const AddCityItem = () => {
    const { cities, setCities } = useStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const { mutateAsync, isPending } = useMutation({
        mutationFn: getWeatherByCity,
    });

    const handleClick = async () => {
        if (inputRef.current && inputValue.trim()) {
            try {
                const response = await mutateAsync({
                    city: inputRef.current.value.trim(),
                });
                setCities([...cities, response.name]);
            } catch (error) {
                if (isAxiosError(error)) {
                    console.warn(error.message);
                    toast.error('City Not Found');
                }
            } finally {
                inputRef.current.value = '';
                setInputValue('');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <Input
                ref={inputRef}
                placeholder="Enter city name"
                className="input-field flex-1 h-12 text-lg border-2"
                onChange={handleInputChange}
                value={inputValue}
            />
            <Button
                onClick={handleClick}
                disabled={!inputValue.trim() || isPending}
                className="btn-primary h-12 px-6 text-base font-semibold"
            >
                {isPending ? 'Loading...' : 'Get Weather'}
            </Button>
        </>
    );
};
