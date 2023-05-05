import { useState, useEffect } from "react";

export function HandleLocation() {
  const [locationAccess, setLocationAccess] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const [location, setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCoords, handleLocationError);
    setLoaded(true);
  }, []);

  const getCoords = function (location: GeolocationPosition) {
    setLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  };

  const handleLocationError = function (err: GeolocationPositionError) {
    setLocationAccess(false);
  };

  return { locationAccess, isLoaded, location };
}
