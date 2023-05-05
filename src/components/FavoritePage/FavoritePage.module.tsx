import { useAppDispatch, useAppSelector } from "../helpers/constants";
import { removeCity, selectActions } from "../action-slice";

import { Grid, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./FavoritePage.css";

export default function FavoritePage() {
  const store = useAppSelector(selectActions);
  const dispatch = useAppDispatch();

  function handleCityDelete(name: string) {
    dispatch(removeCity(name));
  }

  return (
    <div className="FavoritePage">
      {store.map((el: string) => {
        return (
          <Grid container className="list-element">
            <Grid item xs={10}>
              <Typography paragraph>
                {" "}
                <p>{el}</p>
              </Typography>
            </Grid>
            <Grid item xs={2} className="button-box">
              <Button
                onClick={() => {
                  handleCityDelete(el);
                }}
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
