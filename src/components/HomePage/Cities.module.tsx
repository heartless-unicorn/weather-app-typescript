import { useAppSelector } from "../helpers/constants";
import { selectActions } from "../action-slice";
import LocationFetch from "../hooks/LocationFetch";
import WeatherCard from "../card/WeatherCard.module";
import { useEffect, useState } from "react";

interface ResponseData {
  name: string;
  country: string;
  date: Date;
  description: string;
  icon_id: string;
  temp: number;
}
export default function Cities() {
  const store = useAppSelector(selectActions);
  const [cities, setCities] = useState<ResponseData[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {});
  useEffect(() => {
    const fetchCitiesDetails = async () => {
      const citiesDetails: ResponseData[] = await Promise.all(
        store.map((el: string) => {
          return LocationFetch({ name: el }, "city");
        })
      );
      setCities(citiesDetails.filter((city) => city !== undefined));
      setLoading(false);
    };
    fetchCitiesDetails();
  }, [store, loading]);

  const Update = () => {
    setLoading(true);
  };
  if (!loading) {
    if (cities) {
      return (
        <>
          {cities.map((el, id) => {
            if (el !== undefined) {
              return (
                <WeatherCard data={el} format="city" key={id} update={Update} />
              );
            }
          })}
        </>
      );
    } else {
      return <p>No cities</p>;
    }
  } else {
    return <p>Waiting...</p>;
  }
}
