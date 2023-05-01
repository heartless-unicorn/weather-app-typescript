import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

export default function WeatherCard() {
  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <Card>
      <CardHeader title="Kiev, Ukraine" subheader="September 14, 2016" />

      <CardContent>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
    </Card>
  );
}
