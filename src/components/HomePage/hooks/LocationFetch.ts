import axios from "axios";

import { API_ID_KEY } from "../../helpers/constants";

interface LocationInfo {
  lat?: number;
  lon?: number;
  name?: string;
}

export default async function LocationFetch(
  location: LocationInfo,
  link: string
) {
  const url =
    link === "city"
      ? `https://api.openweathermap.org/data/2.5/weather?q=${location.name}&appid=${API_ID_KEY}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_ID_KEY}&units=metric`;
  let weatherDescriber;
  await axios.get(url).then((res) => {
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
