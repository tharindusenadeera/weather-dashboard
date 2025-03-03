import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface WeatherState {
  cities: string[];
  weatherData: Record<string, any>;
  loading: boolean;
  error: string | null;
}

// Async thunk for fetching weather
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
    );
    return { city, data: response.data };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch data');
  }
});

const initialState: WeatherState = {
  cities: [],
  weatherData: {},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
      delete state.weatherData[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData[action.payload.city] = action.payload.data;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addCity, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
