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
import { isNotEmpty } from "ramda";
import { useStore } from "./store";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { getWeatherByCity } from "./api/weather/byCity/route";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export default function Home() {
  const { cities, coords, setCities, setCoords } = useStore();

  const addUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
        },
        (error) => {
          toast.error(`Error get user location: ${error.message}`);
        }
      );
    } else {
      toast.warning("Geolocation is not supported by this browser");
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
        <AddCityItem />
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

const AddCityItem = () => {
  const { cities, setCities, removeCity } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useMutation({
    mutationFn: getWeatherByCity,
  });

  const handleClick = async () => {
    if (inputRef.current) {
      try {
        const response = await mutateAsync({ city: inputRef.current.value });
        setCities([...cities, response.name]);
      } catch (error) {
        if (isAxiosError(error)) {
          removeCity(inputRef.current.value);
          toast.error("City Not Found");
        }
      } finally {
        inputRef.current.value = "";
      }
    }
  };
  return (
    <>
      <Input ref={inputRef} placeholder="Enter city name" />
      <Button onClick={handleClick}>Get Weather</Button>
    </>
  );
};
