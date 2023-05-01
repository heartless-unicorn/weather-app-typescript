import { useEffect, useState } from "react";
import logo from "../../../media/WeatherAppLogo.svg";

import { HandleLocation } from "../hooks/Location";
import LocationFetch from "../hooks/LocationFetch";
import WeatherCard from "./WeatherCard.module";

export default function HomePage() {
  const { locationAccess, isLoaded, location } = HandleLocation();
  const [curWeather, setCurWeather] = useState();
  useEffect(() => {
    if (isLoaded) {
      LocationFetch(location).then((response) => {
        setCurWeather(response);
      });
    }
  }, [location]);
  if (isLoaded) {
    if (locationAccess) {
      return (
        <div className="HomePage">
          <img src={logo} alt="W logo" />
          <WeatherCard />
          <WeatherCard />
        </div>
      );
    } else {
      return <p>Please allow your location</p>;
    }
  } else {
    return <p>Waiting...</p>;
  }
}
