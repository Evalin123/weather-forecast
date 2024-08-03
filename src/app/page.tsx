"use client";

import CityWeatherCard from "@/components/Card/CityWeatherCard";
import LocationWeatherCard from "@/components/Card/LocationWeatherCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "lucide-react";
import { isNotEmpty } from "ramda";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DragUpdate,
  Droppable,
} from "@hello-pangea/dnd";

export default function Home() {
  const [cityInput, setCityInput] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [coords, setCoords] = useState<{
    latitude?: number;
    longitude?: number;
  }>({});

  const addCity = () => {
    if (isNotEmpty(cityInput) && !cities.includes(cityInput)) {
      setCities([...cities, cityInput]);
      setCityInput("");
    }
  };

  const addUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  const removeCity = (target: string) => {
    setCities((prev) => prev.filter((city) => city !== target));
  };

  const removeUserLocation = () => {
    setCoords({});
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
    <div>
      <h1 className="mb-4">Weather App</h1>
      <div className="mb-5 flex w-full max-w-md items-center space-x-2">
        <Input
          value={cityInput}
          placeholder="Enter city name"
          onChange={(e) => setCityInput(e.target.value)}
        />
        <Button onClick={addCity}>Get Weather</Button>
        <Button variant="ghost" size="icon" onClick={addUserLocation}>
          <Navigation className="h-5 w-5" />
        </Button>
      </div>
      <div>
        {isNotEmpty(cities) && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="drop-id">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  demo
                  {cities.map((city, index) => (
                    <div key={city}>
                      <Draggable draggableId={city} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <CityWeatherCard
                              key={index}
                              city={city}
                              onDelete={() => removeCity(city)}
                            />
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
      </div>
      <div>
        {isNotEmpty(coords) && (
          <LocationWeatherCard
            latitude={coords?.latitude}
            longitude={coords?.longitude}
            onDelete={removeUserLocation}
          />
        )}
      </div>
    </div>
  );
}
