const weatherRanges = [
    { start: 200, end: 300, color: 'bg-slate-700' }, // Thunderstorm - 深灰色
    { start: 300, end: 400, color: 'bg-blue-200' }, // Drizzle - 淺藍色
    { start: 500, end: 600, color: 'bg-blue-300' }, // Rain - 中藍色
    { start: 600, end: 700, color: 'bg-cyan-50' }, // Snow - 極淺青色
    { start: 700, end: 800, color: 'bg-amber-100' }, // Atmosphere - 淺琥珀色
    { start: 800, end: 801, color: 'bg-sky-200' }, // Clear - 天藍色
    { start: 801, end: 900, color: 'bg-gray-200' }, // Clouds - 淺灰色
];

export const getWeatherBackgroundColor = (id: number) => {
    // 遍歷範圍數組
    for (const range of weatherRanges) {
        if (id >= range.start && id < range.end) {
            return range.color;
        }
    }
    return '#cccccc';
};
