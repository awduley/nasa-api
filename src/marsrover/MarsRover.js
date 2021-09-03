import React, { useState, useEffect } from 'react';
import './marsrover.scss';

const MarsRover = ({ className, apiKey }) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [randNum, setRandNum] = useState(0)

  const randNumFunc = (length) => {
    return Math.floor(Math.random() * length);
  }
  
  useEffect(() => {
    // fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${apiKey}`)
    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${apiKey}')
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoaded(true);
    }); 

    const myInterval = setInterval(() => {
      setRandNum(randNumFunc(25))
    }, 1000 * 10); 
    
    return () => clearInterval(myInterval);

  }, [apiKey]);

  return (
    <section className={className}>
      {
        !isLoaded ? <p>Loading...</p> :
        <div className="image-container">
          {isLoaded ? <img src={data.photos[randNum].img_src} alt="Random shots from the Mars Rover"/> : <h2>Loading...</h2>}
          {isLoaded && console.log(data.photos[randNum].img_src)}
        </div>
      }
      <div className="mars-rover-info">
        <p>Rover Name: {isLoaded && data.photos[randNum].rover.name}</p>
        <p>Status: {isLoaded && data.photos[randNum].rover.status}</p>
        <p>Camera: {isLoaded && data.photos[randNum].camera.full_name}</p>
        <p>Earth Date: {isLoaded && data.photos[randNum].earth_date}</p>
        <p>Launch Date: {isLoaded && data.photos[randNum].rover.launch_date}</p>
        <p>Landing Date: {isLoaded && data.photos[randNum].rover.landing_date}</p>
      </div>
    </section>
  )
}

export default MarsRover
