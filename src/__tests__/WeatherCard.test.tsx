import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';

test('renders weather card correctly', () => {
  render(<WeatherCard city="London" temperature={25} humidity={60} windSpeed={10} />);
  expect(screen.getByText('London')).toBeInTheDocument();
  expect(screen.getByText('25°C')).toBeInTheDocument();
});
