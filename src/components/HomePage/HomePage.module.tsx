import { useCallback, useEffect, useState } from "react";
import logo from "../../media/WeatherAppLogo.svg";

import { CircularProgress } from "@mui/material";

import { HandleLocation } from "../hooks/Location";
import LocationFetch from "../hooks/LocationFetch";
import WeatherCard from "../card/WeatherCard.module";

import Cities from "./Cities.module";

interface data {
  name: string;
  country: string;
  date: Date;
  description: string;
  icon_id: string;
  temp: number;
}

export default function HomePage() {
  const { locationAccess, isLoaded, location } = HandleLocation();
  const [curWeather, setCurWeather] = useState<data | undefined>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      LocationFetch(location, "coords")
        .then((response) => {
          setCurWeather(response);
        })
        .catch((err) => {
          setError(true);
          console.log("Error on server");
        });
    }
  }, [location]);

  if (curWeather) {
    if (locationAccess) {
      return (
        <div className="HomePage">
          <img src={logo} alt="W logo" data-testid="logo" />
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
    if (error) {
      return <p>Error on server</p>;
    } else {
      return <CircularProgress color="inherit" aria-label="loader" />;
    }
  }
}
