import axios from "axios";

import { API_ID_KEY } from "../helpers/constants";

export default async function ExtendedInfoFetch(location: string) {
  let data;
  const url = `https://api.openweathermap.org/data/2.5/forecast/?q=${location}&appid=${API_ID_KEY}&units=metric&cnt=5`;
  function timeStempDescription(timestemp: any) {
    let hour = new Date(timestemp.dt).getHours();

    return {
      time: ` ${hour < 10 ? `0${hour}` : hour}:00`,
      temp: `${Math.round(timestemp.main.temp)}°C`,
      icon: `https://openweathermap.org/img/wn/${timestemp.weather[0].icon}@2x.png`,
    };
  }
  await axios.get(url).then((response) => {
    data = {
      now: {
        feels_like: `${Math.round(response.data.list[0].main.feels_like)}°C`,
        humidity: response.data.list[0].main.humidity,
        pressure: response.data.list[0].main.pressure,
        wind: ` ${response.data.list[0].wind.speed} km/h`,
      },
      1: timeStempDescription(response.data.list[1]),
      2: timeStempDescription(response.data.list[2]),
      3: timeStempDescription(response.data.list[3]),
      4: timeStempDescription(response.data.list[4]),
    };
  });
  return data;
}
