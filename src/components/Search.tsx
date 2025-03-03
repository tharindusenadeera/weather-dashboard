import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCity } from '../redux/slices/weatherSlice';

const Search = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleAddCity = () => {
    if (city.trim()) {
      dispatch(addCity(city.trim()));
      setCity('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border p-2 rounded"
      />
      <button onClick={handleAddCity} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
  );
};

export default Search;
