import { Grid, Typography, Paper } from "@mui/material";
import { DetailedWeather, timeStemp } from "../helpers/interfaces";
import "./ExpendedInfo.css";

export default function ExpendedInfo(props: { data: DetailedWeather }) {
  function displayTimestemp(timestemp: timeStemp) {
    return (
      <>
        <Typography paragraph>{timestemp.time} </Typography>
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
        <Grid container spacing={1} className="timestemp">
          <Grid item xs={3}>
            <Paper>{displayTimestemp(props.data[1])}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>{displayTimestemp(props.data[2])} </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>{displayTimestemp(props.data[3])}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>{displayTimestemp(props.data[4])}</Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
