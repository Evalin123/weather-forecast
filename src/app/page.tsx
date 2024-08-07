"use client";

import CityWeatherCard from "@/components/Card/CityWeatherCard";
import LocationWeatherCard from "@/components/Card/LocationWeatherCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DragDropContext,
  Draggable,
  DragUpdate,
  Droppable,
} from "@hello-pangea/dnd";
import { Navigation } from "lucide-react";
import { isNotEmpty, isNotNil } from "ramda";
import { useStore } from "./store";

export default function Home() {
  const { cityInput, cities, coords, setCityInput, setCities, setCoords } =
    useStore();

  const addCity = () => {
    if (isNotNil(cityInput) && !cities.includes(cityInput)) {
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
      <div className="w-[700px]">
        {isNotEmpty(cities) && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="drop-id">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {cities.map((city, index) => (
                    <div key={city}>
                      <Draggable draggableId={city} index={index}>
                        {(provided) => (
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
      </div>
      <div>
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
