
import { useState } from 'react';
import './App.css'


   function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
  
    const fetchWeather = async () => {
      if (!city) 
    {
      alert('Please enter the city name')
    }
      try {
        const apiKey = "45030af649670cd2282ab425aa5038fd"; 
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.cod === 200) {
          setWeather(data);
          setError(null);
        } else {
          setError(data.message);
          setWeather(null);
        }
      } catch (err) {
        setError("Failed to fetch weather.");
        setWeather(null);
      }
      
        
      
    };
    const Reset = () => {
      setCity("");
      setWeather(null);
      setError("");
    };
      
  return (
    <>
    <div className="App ">
      <div className="container  rounded-2xl shadow-lg   max-w-md text-center border border-2 border-secondary">
        <h1 className="text-2xl font-bold mb-4 text-dark mt-4">Weather Forecast</h1>
        <input
          type="text"
          className="border p-2 w-full rounded mb-4"
          placeholder="Enter A City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-green-600 text-success px-4 py-2 rounded border border-2 border-"
          onClick={fetchWeather}
        >
          Show Weather
        </button>
        {error && <p className='text-danger'>{error}</p>}
        {weather && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{weather.name}</h2>
            <p className="text-lg fw-bold">
              {weather.weather[0].main} - {weather.weather[0].description}
            </p>
            <p className="text-4xl mt-2 fw-bold  text-success">{weather.main.temp}°C</p>
            <p className='text-primary fw-bold fs-6xl'>Humidity: {weather.main.humidity}%</p>
            <p className='fw-bold text-danger'>Wind: {weather.wind.speed} m/s</p>
          </div>
          
        )}
        <button className="bg-blue-500 hover:bg-blue-600 text-danger px-4 py-2 rounded mb-4 w-full border border-2 border- m-2 "onClick={Reset}>Reset</button>
        
      </div>
    </div>


      
    </>
  )
}

export default App