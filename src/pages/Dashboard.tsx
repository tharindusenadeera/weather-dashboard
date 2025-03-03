import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Search from '../components/Search';
import WeatherCard from '../components/WeatherCard';

const Dashboard = () => {
  const cities = useSelector((state: RootState) => state.weather.cities);

  return (
    <div className="p-6">
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cities.map((city) => (
          <WeatherCard key={city} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
