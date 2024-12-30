export enum WeatherType {
  Sunny = 'sunny',
  Cloudy = 'cloudy',
  Rainy = 'rainy',
  Snowy = 'snowy',
}

export interface DailyWeather {
  date: string;
  type: WeatherType;
  averageTemperature: number;
}

export interface DailyWeatherUS {
  Weather: {
    date: string;
    type: string;
    average_temperature: number;
  } []
}

export interface LocationWeatherResponse {
  city: string;
  country: string;
  weatherDetails: DailyWeather[] | DailyWeatherUS;
}

export interface LocationWeather {
  city: string;
  country: string;
  weatherDetails: DailyWeather[];
}
