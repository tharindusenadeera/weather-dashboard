import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/slices/weatherSlice';
import { RootState, AppDispatch } from '../redux/store';

export const useWeather = (city: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector((state: RootState) => state.weather.weatherData[city]);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    if (!weatherData) {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch, weatherData]);

  return { weatherData, loading, error };
};
