import axios from 'axios';
import type { LocationWeather, DailyWeatherUS, WeatherType, LocationWeatherResponse, DailyWeather } from '../models/LocationWeather';
import { parseLocation } from './LocationParser';
import type { WeatherRequest } from '../models/WeatherRequest';

async function getWeatherData(
  request: WeatherRequest
): Promise<LocationWeather> {
  const { data } = await axios.get<LocationWeatherResponse>(
    `/api/weather?city=${request.city}&country=${request.country}`
  );

  if (data.weatherDetails.hasOwnProperty('Weather')) {
    data.weatherDetails = (data.weatherDetails as DailyWeatherUS).Weather.map<DailyWeather>(
      (weather) => ({
        date: weather.date,
        type: weather.type as WeatherType,
        averageTemperature: weather.average_temperature,
      })
    );
  }

  return data as LocationWeather;
}

export async function fetchWeather(
  locationQuery: string
): Promise<LocationWeather | null> {
  const request = parseLocation(locationQuery);

  if (!request) {
    return null;
  }

  try {
    return await getWeatherData({
      city: request.city,
      country: request.country,
    });
  } catch {
    throw new Error(
      `Cannot fetch weather data for provided location: ${request.city}, ${request.country}`
    );
  }
}
