import axios from "axios";
import { useState } from "react";
import { API_ID_KEY } from "../../helpers/constants";

interface LocationInfo {
  lat?: number;
  lon?: number;
}

export default async function LocationFetch(location: LocationInfo) {
  let weatherDescriber;
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_ID_KEY}&units=metric`
    )
    .then((res) => {
      weatherDescriber = {
        name: res.data.name,
        country: res.data.sys.country,
        icon_id: res.data.weather[0].icon,
        temp: Math.round(res.data.main.temp),
        description: res.data.weather[0].description,
        date: new Date(),
      };
    });
  return weatherDescriber;
}
