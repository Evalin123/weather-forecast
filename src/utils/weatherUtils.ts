/**
 * Convert wind direction angle to 8 directions
 * @param deg Wind direction angle (0-360)
 * @returns Directions string (N, NE, E, SE, S, SW, W, NW)
 */
export const degToDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
};

/**
 * Convert Unix timestamp to HH:MM format
 * @param timestamp Unix timestamp (seconds)
 * @param timezone Timezone offset (seconds)
 * @returns Time string (HH:MM)
 */
export const formatTime = (timestamp: number, timezone: number = 0): string => {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

/**
 * Format wind speed (meters/second to kilometers/hour)
 * @param speed Wind speed (meters/second)
 * @returns Formatted wind speed string
 */
export const formatWindSpeed = (speed: number): string => {
    const kmh = (speed * 3.6).toFixed(1);
    return `${kmh} km/h`;
};

/**
 * Format visibility (meters to kilometers)
 * @param visibility Visibility (meters)
 * @returns Formatted visibility string
 */
export const formatVisibility = (visibility: number): string => {
    if (visibility >= 1000) {
        return `${(visibility / 1000).toFixed(1)} km`;
    }
    return `${visibility} m`;
};
