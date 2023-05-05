import { useState, useEffect } from "react";
import LocationFetch from "../hooks/LocationFetch";
import WeatherCard from "../card/WeatherCard.module";

import { CircularProgress, Grid, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "./SearchPage.css";

interface data {
  name: string;
  country: string;
  date: Date;
  description: string;
  icon_id: string;
  temp: number;
}

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState("");
  const [curWeather, setCurWeather] = useState<data | undefined>();
  const [loader, setLoader] = useState<Boolean | null>(null);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    console.log("render in search");
  });
  useEffect(() => {}, [curWeather, update]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoader(false);
    const result = e.currentTarget.elements[0] as HTMLInputElement;
    LocationFetch({ name: result.value }, "city")
      .then((result) => {
        setCurWeather(result);
        setLoader(true);
      })
      .catch(() => {
        setError(true);
      });
  }
  function Update() {
    setUpdate((state) => !state);
  }

  const result = () => {
    if (searchResult !== "") {
      if (!error) {
        if (curWeather) {
          return (
            <WeatherCard data={curWeather} format="city" update={Update} />
          );
        } else if (loader === false) {
          return <CircularProgress color="inherit" aria-label="loader" />;
        }
      } else {
        return (
          <Alert severity="error" className="error">
            Invalid search request
          </Alert>
        );
      }
    }
    return null;
  };
  return (
    <>
      <div className="SearchPage">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Enter a city"
            onChange={(event) => {
              setSearchResult(event.target.value);
            }}
            className="search"
          />

          <input type="submit" value="OK" className="submit" />
        </form>
        <Grid container>{result()}</Grid>
      </div>
    </>
  );
}
