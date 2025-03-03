import { useWeather } from '../hooks/useWeather';
import { useDispatch } from 'react-redux';
import { removeCity } from '../redux/slices/weatherSlice';

const WeatherCard = ({ city }: { city: string }) => {
  const { weatherData, loading, error } = useWeather(city);
  const dispatch = useDispatch();
  //   console.log('=== weatherData ===', weatherData);

  if (loading) return <div>Loading {city}...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weatherData) return null;

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold text-black">{city}</h2>
      <p className="text-black">Temp: {weatherData?.current?.temp_c}°C</p>
      <p className="text-black">Humidity: {weatherData?.current?.humidity}%</p>
      <p className="text-black">Wind: {weatherData?.current?.wind_kph} kph</p>
      {weatherData.forecast.forecastday.map((day: any) => (
        <div key={day.date} className="mt-2 text-black">
          <p>
            {day?.date}: {day?.temp}°C - {day?.day?.avgtemp_c}
          </p>
        </div>
      ))}
      <button onClick={() => dispatch(removeCity(city))} className="bg-red-500 text-white px-2 py-1 mt-2">
        Remove
      </button>
    </div>
  );
};

export default WeatherCard;
