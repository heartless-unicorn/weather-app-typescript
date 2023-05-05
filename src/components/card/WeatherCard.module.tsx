import { Grid, Typography, Card, CardContent, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReplayIcon from "@mui/icons-material/Replay";

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
  update: () => void;
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
      <CardContent className="content-box">
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h4" component="h3">
              {`${props.data.name}, ${props.data.country}`}
            </Typography>
          </Grid>
          <Grid item xs={2} className="card-buttons">
            {isAddable && (
              <IconButton
                onClick={() => {
                  HandleFavorite(props.data.name);
                }}
              >
                {button ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                props.update();
              }}
            >
              <ReplayIcon />
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h2" component="h2">
              {`${props.data.temp} °C`}
            </Typography>
            <Typography paragraph className="date">
              {date}
            </Typography>
          </Grid>
          <Grid item xs={6} className="icon-box">
            <img
              src={`https://openweathermap.org/img/wn/${props.data.icon_id}@2x.png`}
              alt="Weather icon"
            />
            <Typography paragraph className="description">
              {props.data.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <ExpendedHandler name={props.data.name} />
    </Card>
  );
}
