const weatherRanges = [
  { start: 200, end: 300, color: "bg-orange-900" }, // Thunderstorm
  { start: 300, end: 400, color: "bg-rose-100" }, // Drizzle
  { start: 500, end: 600, color: "bg-indigo-100" }, // Rain
  { start: 600, end: 700, color: "bg-fuchsia-500" }, // Snow
  { start: 700, end: 800, color: "bg-cyan-200" }, // Atmosphere
  { start: 800, end: 801, color: "bg-green-100" }, // Clear
  { start: 801, end: 900, color: "bg-lime-100" }, // Clouds
];

export const getWeatherBackgroundColor = (id: number) => {
  // 遍歷範圍數組
  for (const range of weatherRanges) {
    if (id >= range.start && id < range.end) {
      return range.color;
    }
  }
  return "#cccccc";
};
