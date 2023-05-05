import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useEffect, useState } from "react";

import ExpendedHandler from "./ExpendedHandler";
import HandleDate from "../hooks/HandleDate";

import { useAppDispatch, useAppSelector } from "../helpers/constants";
import { addCity, removeCity, selectActions } from "../action-slice";

import "./WeatherCard.css";

interface WeatherInfo {
  data: {
    name: string;
    country: string;
    date: Date;
    description: string;
    icon_id: string;
    temp: number;
  };
  format: string;
  isFavorite?: boolean;
}

export default function WeatherCard(props: WeatherInfo) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActions);
  const [button, setButton] = useState(true);
  const isAddable = props.format === "city" ? true : false;
  const date = HandleDate(props.data.date);

  useEffect(() => {
    if (selector.includes(props.data.name)) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [button, props]);
  function HandleFavorite(name: string) {
    if (selector.includes(name)) {
      dispatch(removeCity(name));
      setButton(false);
    } else {
      dispatch(addCity(name));
      setButton(true);
    }
  }

  return (
    <Card className="WeatherCard">
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            <Typography>
              {`${props.data.name}, ${props.data.country}`}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {isAddable && (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  HandleFavorite(props.data.name);
                }}
              >
                {button ? "-" : "+"}
              </Button>
            )}
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                HandleFavorite(props.data.name);
              }}
            >
              Update
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h2" component="h2">
              {`${props.data.temp} °C`}
            </Typography>
            <Typography>{date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <img
                src={`https://openweathermap.org/img/wn/${props.data.icon_id}@2x.png`}
                alt="Weather icon"
              />
              {props.data.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <ExpendedHandler name={props.data.name} />
    </Card>
  );
}
