interface DetailedWeather {
  now: {
    feels_like: string;
    humidity: number;
    pressure: number;
    wind: string;
  };
  1: timeStemp;
  2: timeStemp;
  3: timeStemp;
  4: timeStemp;
}
interface timeStemp {
  icon: string;
  temp: string;
  time: string;
}

export type { DetailedWeather, timeStemp };
