import React, { useState, useEffect } from 'react'

const Space1 = ({ apiKey }) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoaded(true);
      console.log(data);
    });
  }, [])

  return (
    
    <div className="potd-container">
      {
        !isLoaded ? <p>Loading...</p> :
        <div className="image-container">
          <img src={data.hdurl} alt="" />
        </div>
      }
    </div>
  )
}

export default Space1
