import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CardContent,
  CardActions,
  Collapse,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DetailedWeather } from "../helpers/interfaces";

import ExtendedInfoFetch from "../hooks/ExtendedInfoFetch";
import ExpendedInfo from "./ExpendedInfo";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function ExpendedHandler(props: { name: string }) {
  const [expanded, setExpanded] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState<DetailedWeather>();
  useEffect(() => {
    if (expanded) {
      ExtendedInfoFetch(props.name).then((response) => {
        setWeatherInfo(response);
      });
    }
  }, [expanded]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {weatherInfo && <ExpendedInfo data={weatherInfo} />}
        </CardContent>
      </Collapse>
    </>
  );
}
