import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Dashboard />
    </div>
  );
}

export default App;
