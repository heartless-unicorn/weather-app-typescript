import { Grid, Typography, Card, CardContent, Button } from "@mui/material";

import ExpendedInfo from "./ExpendedInfo";
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
}

export default function WeatherCard(props: WeatherInfo) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActions);
  console.log(selector);
  const isAddable = props.format === "city" ? true : false;
  const date = HandleDate(props.data.date);
  function HandleFavorite(name: string) {
    if (selector.includes(name)) {
      dispatch(removeCity(name));
    } else {
      dispatch(addCity(name));
    }
  }

  return (
    <Card className="WeatherCard">
      <CardContent>
        <Grid container>
          <Grid item xs={12} justifyContent="space-around">
            <Typography>
              {`${props.data.name}, ${props.data.country}`}
            </Typography>

            {isAddable && (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  HandleFavorite(props.data.name);
                }}
              >
                +
              </Button>
            )}
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
      <ExpendedInfo />
    </Card>
  );
}
