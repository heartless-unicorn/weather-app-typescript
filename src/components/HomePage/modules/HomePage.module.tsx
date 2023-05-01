import logo from "../../../media/WeatherAppLogo.svg";
import { HandleLocation } from "../hooks/Location";
import WeatherCard from "./WeatherCard.module";

export default function HomePage() {
  const { locationAccess, isLoaded, location } = HandleLocation();
  if (isLoaded) {
    if (locationAccess) {
      return (
        <div className="HomePage">
          <img src={logo} alt="W logo" />
          <WeatherCard />
          <WeatherCard />
        </div>
      );
    } else {
      return <p>Please allow your location</p>;
    }
  } else {
    return <p>Waiting...</p>;
  }
}
