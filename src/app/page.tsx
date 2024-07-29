import WeatherCard from "@/components/Card/WeatherCard";

export default function Home() {
  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter city name" />
      <button>Get Weather</button>
      <div>
        <WeatherCard city={"Taipei"} temperature={24} description="Sunny day" />
      </div>
    </div>
  );
}
