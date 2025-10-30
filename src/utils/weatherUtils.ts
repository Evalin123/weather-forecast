/**
 * 將風向角度轉換為 8 個方位（英文）
 * @param deg 風向角度 (0-360)
 * @returns 方位字符串 (N, NE, E, SE, S, SW, W, NW)
 */
export const degToDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
};

/**
 * 將 Unix timestamp 轉換為 HH:MM 格式
 * @param timestamp Unix timestamp (秒)
 * @param timezone 時區偏移（秒）
 * @returns 時間字符串 (HH:MM)
 */
export const formatTime = (timestamp: number, timezone: number = 0): string => {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

/**
 * 格式化風速（米/秒 轉為 公里/小時）
 * @param speed 風速（米/秒）
 * @returns 格式化的風速字符串
 */
export const formatWindSpeed = (speed: number): string => {
    const kmh = (speed * 3.6).toFixed(1);
    return `${kmh} km/h`;
};

/**
 * 格式化能見度
 * @param visibility 能見度（米）
 * @returns 格式化的能見度字符串
 */
export const formatVisibility = (visibility: number): string => {
    if (visibility >= 1000) {
        return `${(visibility / 1000).toFixed(1)} km`;
    }
    return `${visibility} m`;
};
