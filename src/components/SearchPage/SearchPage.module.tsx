import { useState, useEffect } from "react";
import LocationFetch from "../hooks/LocationFetch";
import WeatherCard from "../card/WeatherCard.module";
import { CircularProgress } from "@mui/material";

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState("");
  const [curWeather, setCurWeather] = useState();
  const [loader, setLoader] = useState<Boolean | null>(null);
  const [isFavorite, setisFavorite] = useState(false);
  useEffect(() => {
    console.log("render in search");
  });
  useEffect(() => {}, [curWeather]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoader(false);
    const result = e.currentTarget.elements[0] as HTMLInputElement;
    LocationFetch({ name: result.value }, "city").then((result) => {
      setCurWeather(result);
      setLoader(true);
    });
  }
  const result = () => {
    if (searchResult !== "") {
      if (curWeather) {
        return (
          <WeatherCard data={curWeather} format="city" isFavorite={true} />
        );
      } else if (loader === false) {
        return <CircularProgress color="inherit" aria-label="loader" />;
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
          />
          <input type="submit" placeholder="Look" />
        </form>
        {result()}
      </div>
    </>
  );
}
