/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import MainImage from "./components/MainImage";
import Location from "./components/Location";
import axios from "axios";
import "./App.scss";

const WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KAY = process.env.REACT_APP_WEATHER_API_KAY;

const App: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<string>("hare");
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [currentLocation, setCurrentLocation] = useState<string>(
    "current location"
  );
  const isFirstRef = useRef(false);

  useEffect(() => {
    isFirstRef.current = true;
    if (!navigator.geolocation) {
      setIsError(true);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ latitude, longitude });
      });
      setIsError(false);
    }
  }, []);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
    } else {
      fetchCurrentWeather();
      setIsLoading(false);
    }
  }, [currentPosition]);

  const fetchCurrentWeather = () => {
    axios
      .get(WEATHER_ENDPOINT, {
        params: {
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
          appid: WEATHER_API_KAY,
        },
      })
      .then((result) => {
        const data = result.data;
        setCurrentLocation(data.name);
        setWeather(data.weather[0].icon);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <div className="content">
      <div className="content__weather">
        <MainImage name={weather} isLoading={isLoading} isError={isError} />
      </div>
      <Location address={currentLocation} />
    </div>
  );
};

export default App;
