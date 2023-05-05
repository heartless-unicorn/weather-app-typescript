import { Grid, Typography } from "@mui/material";
import { DetailedWeather, timeStemp } from "../helpers/interfaces";

export default function ExpendedInfo(props: { data: DetailedWeather }) {
  function displayTimestemp(timestemp: timeStemp) {
    return (
      <>
        <Typography paragraph>t{timestemp.time} </Typography>
        <img src={timestemp.icon} />
        <Typography>{timestemp.temp}</Typography>
      </>
    );
  }
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography paragraph>
            Feels like: {props.data.now.feels_like}
          </Typography>
          <Typography paragraph>Wind: {props.data.now.wind}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph>Humidity: {props.data.now.humidity}</Typography>
          <Typography paragraph>Pressure: {props.data.now.pressure}</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            {displayTimestemp(props.data[1])}
          </Grid>
          <Grid item xs={3}>
            {displayTimestemp(props.data[2])}{" "}
          </Grid>
          <Grid item xs={3}>
            {displayTimestemp(props.data[3])}
          </Grid>
          <Grid item xs={3}>
            {displayTimestemp(props.data[4])}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
