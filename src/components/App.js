import React, { useState, useEffect } from 'react';
import Clock from './Clock';
import PictureOfTheDay from './PictureOfTheDay';

import './App.scss';

const App = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const API_KEY = 'ezzostJDZ3GXsvbLL9vBkJ2iy6Z20vWtqlvsWraL';

  const appStyle = {
    background: `url(${data.hdurl}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoaded(true);
      console.log(data);
    });
  }, [])

  return (
    <div className="main-container" style={isLoaded ? appStyle : null}>
      <Clock />
      <PictureOfTheDay apiKey={API_KEY} />
    </div>
  )
}

export default App;
