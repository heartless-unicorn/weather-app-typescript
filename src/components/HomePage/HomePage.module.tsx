import { useCallback, useEffect, useState } from "react";
import logo from "../../media/WeatherAppLogo.svg";

import { CircularProgress } from "@mui/material";

import { HandleLocation } from "../hooks/Location";
import LocationFetch from "../hooks/LocationFetch";
import WeatherCard from "../card/WeatherCard.module";

import Cities from "./Cities.module";

export default function HomePage() {
  const { locationAccess, isLoaded, location } = HandleLocation();
  const [curWeather, setCurWeather] = useState();

  useEffect(() => {
    if (isLoaded) {
      LocationFetch(location, "coords").then((response) => {
        setCurWeather(response);
      });
    }
  }, [location]);

  if (curWeather) {
    if (locationAccess) {
      return (
        <div className="HomePage">
          <img src={logo} alt="W logo" />
          <WeatherCard data={curWeather} format="current" />
          <div>
            <Cities />
          </div>
        </div>
      );
    } else {
      return <p>Please allow your location</p>;
    }
  } else {
    return <CircularProgress color="inherit" aria-label="loader" />;
  }
}
