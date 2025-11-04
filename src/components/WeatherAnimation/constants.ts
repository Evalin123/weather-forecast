export const weatherRanges = [
    { start: 200, end: 300, type: 'thunderstorm' },
    { start: 300, end: 400, type: 'drizzle' },
    { start: 500, end: 600, type: 'rain' },
    { start: 600, end: 700, type: 'snow' },
    { start: 700, end: 800, type: 'atmosphere' },
    { start: 800, end: 801, type: 'clear' },
    { start: 801, end: 900, type: 'clouds' },
] as const;

export const getWeatherType = (id: number): (typeof weatherRanges)[number]['type'] | undefined => {
    for (const range of weatherRanges) {
        if (id >= range.start && id < range.end) {
            return range.type;
        }
    }
    return undefined;
};
