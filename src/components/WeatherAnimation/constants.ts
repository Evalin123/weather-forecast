export const weatherRanges = [
    { start: 200, end: 300, color: 'bg-slate-700', type: 'thunderstorm' },
    { start: 300, end: 400, color: 'bg-blue-200', type: 'drizzle' },
    { start: 500, end: 600, color: 'bg-blue-300', type: 'rain' },
    { start: 600, end: 700, color: 'bg-cyan-50', type: 'snow' },
    { start: 700, end: 800, color: 'bg-amber-100', type: 'atmosphere' },
    { start: 800, end: 801, color: 'bg-sky-200', type: 'clear' },
    { start: 801, end: 900, color: 'bg-gray-200', type: 'clouds' },
];

export const getWeatherBackgroundColor = (id: number) => {
    for (const range of weatherRanges) {
        if (id >= range.start && id < range.end) {
            return range.color;
        }
    }
    return 'bg-gray-200';
};

export const getWeatherType = (id: number): string => {
    for (const range of weatherRanges) {
        if (id >= range.start && id < range.end) {
            return range.type;
        }
    }
    return 'clear';
};
