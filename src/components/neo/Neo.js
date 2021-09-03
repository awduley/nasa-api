import React, { useState, useEffect } from 'react';
import './neo.scss';

const Neo = ({ className, apiKey }) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [theDate, setTheDate] = useState('');
  const [neoCount, setNeoCount] = useState(3);
  const [neoArrayState, setNeoArrayState] = useState();

  useEffect(() => {
    setTheDate(new Date().toLocaleDateString('en-ca', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }));

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${theDate}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoaded(true);

      let neoArray = [];

      for(let thing in data.near_earth_objects) {
        neoArray.push(data.near_earth_objects[thing]);
      }
      setNeoArrayState([...neoArray]);
    }); 
  }, []);
  
  const neoCountSubtract = () => {
    neoCount >= 1 && setNeoCount(prevNeoCount => prevNeoCount - 1);
  }

  const neoCountAdd = () => {
    neoCount <= (neoArrayState.length) && setNeoCount(prevNeoCount => prevNeoCount + 1);
  }

  return (
    <section className={className}>
      {
        !isLoaded ? <p>Loading...</p> :
        <div className="donki-info">
          <h3>Near Earth Objects</h3>
          <h3>From {theDate}</h3>
          <p>Name: {neoArrayState && neoArrayState[0][neoCount].name}</p>
          <p>Close Approach Date: {neoArrayState && neoArrayState[0][neoCount].close_approach_data[0].close_approach_date_full}</p>
          <p>Estimated Diameter Max - km: {neoArrayState && neoArrayState[0][neoCount].estimated_diameter.kilometers.estimated_diameter_max}</p>
          <p>Estimated Diameter Min - km: {neoArrayState && neoArrayState[0][neoCount].estimated_diameter.kilometers.estimated_diameter_min}</p>
          <p>Potentially Hazardous: {neoArrayState && neoArrayState[0][neoCount].is_potentially_hazardous_asteroid}</p>
          <p>Sentry Object: {neoArrayState && neoArrayState[0][neoCount].is_sentry_object}</p>
          <p>Absolute Magnitude: {neoArrayState && neoArrayState[0][neoCount].absolute_magnitude_h}</p>
        </div>
      }
      <footer className="donki-footer">
        <button className="btn-neo-info btn-neo-info-subtract" onClick={neoCountSubtract}>&lt;&lt;</button>
        <button className="btn-neo-info btn-neo-info-add" onClick={neoCountAdd}>&gt;&gt;</button>
      </footer>
    </section>
  )
}

export default Neo;  