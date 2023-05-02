import { Grid, Typography, Card, CardContent } from "@mui/material";

import ExpendedInfo from "./ExpendedInfo";
import HandleDate from "../../hooks/HandleDate";

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
}

export default function WeatherCard(props: WeatherInfo) {
  const date = HandleDate(props.data.date);
  return (
    <Card className="WeatherCard">
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            {`${props.data.name}, ${props.data.country}`}
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
