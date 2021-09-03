import React, { useState, useEffect } from 'react';
import './donki.scss';

const Donki = ({ className, apiKey }) => {

  let donkiArray = [];

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [donkiCount, setDonkiCount] = useState(20);

  useEffect(() => {
    fetch(`https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoaded(true);
    }, []); 

  }, [apiKey]);

  isLoaded && data.map(item => {
    return donkiArray.push(item);
  });

  const donkiCountSubtract = () => {
    donkiCount >= 1 && setDonkiCount(prevDonkiCount => prevDonkiCount - 1);
  }

  const donkiCountAdd = () => {
    donkiCount <= (donkiArray.length -2) && setDonkiCount(prevDonkiCount => prevDonkiCount + 1);
  }

  return (

    <section className={className}>
      {
        !isLoaded ? <p>Loading...</p> :
        <div className="donki-info">
          <h3>Coronal Mass Ejection &#40;CME&#41; Analysis</h3>
          <p>Active Region: {donkiArray[donkiCount].activeRegionNum}</p>
          <p>Activity ID: {donkiArray[donkiCount].activityID}</p>
          <p>CME Analysis: {donkiArray[donkiCount].cmeAnalyses[0].time21_5}
            , Latitude: {donkiArray[donkiCount].cmeAnalyses[0].latitude}
            , Longitude: {donkiArray[donkiCount].cmeAnalyses[0].longitude} 
            , Half Angle: {donkiArray[donkiCount].cmeAnalyses[0].halfAngle}
            , Speed: {donkiArray[donkiCount].cmeAnalyses[0].speed}
            , Tyle: {donkiArray[donkiCount].cmeAnalyses[0].type}
          </p>
          <p>Note: {donkiArray[donkiCount].note}</p>
          <p className="link" >Lnk: {donkiArray[donkiCount].link}</p>
        </div>
      }
      <footer className="donki-footer">
        <button className="btn-donki-info btn-donki-info-subtract" onClick={donkiCountSubtract}>&lt;&lt;</button>
        <button className="btn-donki-info btn-donki-info-add" onClick={donkiCountAdd}>&gt;&gt;</button>
      </footer>
    </section>
  )
}

export default Donki;
