import React, { useState, useEffect } from 'react';
import Clock from './clock/Clock';
import Neo from './neo/Neo';
import MarsRover from '../marsrover/MarsRover';
import Donki from '../donki/Donki';
import Button from './button/Button';

import background from '../assets/background-cropped.jpg';

import './App.scss';

const App = () => {

  const [data, setData] = useState([]);

  // State for the PotD info
  const [text, setText] = useState('Read More');
  const [show, setShow] = useState(false);

  //State for the Outer Clock container {
  const [textClock, setTextClock] = useState('Read More');
  const [showClock, setShowClock] = useState(false);

  // State for the Mars Rover container
  const [textMarsRover, setTextMarsRover] = useState('Read More');
  const [showMarsRover, setShowMarsRover] = useState(false);

  // State for the Neo container
  const [textNeo, setTextNeo] = useState('Read More');
  const [showNeo, setShowNeo] = useState(false);

  // State for the Coronal Mass Ejections container 
  const [textDonki, setTextDonki] = useState('Read More');
  const [showDonki, setShowDonki] = useState(false)

  const API_KEY = 'ezzostJDZ3GXsvbLL9vBkJ2iy6Z20vWtqlvsWraL';

  const appStyle = {
    background: `url(${data.hdurl}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  const appStyleNoPic = {
    background: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }

  const onSetShow = (e) => {
    switch(e.currentTarget.id) {
      case 'set-show':
        setShow(!show);
        show ? setText('Read More') : setText('Read Less');
        break;
      case('set-show-clock'):
        setShowClock(!showClock);
        showClock ? setTextClock('Read More') : setTextClock('Read Less');
        break;
      case 'set-show-mars-rover':
        setShowMarsRover(!showMarsRover);
        showMarsRover ? setTextMarsRover('Read More') : setTextMarsRover('Read Less');
        break;
      case 'set-show-neo':
        setShowNeo(!showNeo);
        showNeo ? setTextNeo('Read More') : setTextNeo('Read Less');
        break;
      case 'set-show-donki':
        setShowDonki(!showDonki);
        showDonki ? setTextDonki('Read More') : setTextDonki('Read Less'); 
        break;
      default: 
        return;
    }
  }

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }, []);

  return (
    <div className="main-container" style={data.hurl ? appStyle : appStyleNoPic}>
      <header className="main-heading"><h2>NASA API</h2></header>
      <Clock className={showClock ? 'container clock-outer-container set-show' : 'container clock-outer-container'} />
      <Button id={"set-show-clock"} onSetShow={onSetShow} btnClass={"btn-clock"} btnText={textClock}>
        <h3>Local Time</h3>
      </Button>
      <MarsRover className={showMarsRover ? 'container mars-rover-container set-show' : 'container mars-rover-container'} apiKey={API_KEY} />
      <Button id={"set-show-mars-rover"} onSetShow={onSetShow} btnClass={"btn-mars-rover"} btnText={textMarsRover}>
        <h3>Mars Rover</h3>
      </Button>
      <Neo className={showNeo ? 'container neo-container set-show' : 'container neo-container'} apiKey={API_KEY} />
      <Button id={"set-show-neo"} onSetShow={onSetShow} btnClass={"btn-neo"} btnText={textNeo}>
        <h3>Near Earth Objects</h3>
      </Button>
      <Donki className={showDonki ? 'container donki-container set-show' : 'container donki-container'} apiKey={API_KEY} />
      <Button id={"set-show-donki"} onSetShow={onSetShow} btnClass={"btn-donki"} btnText={textDonki}>
        <h3>Coronal Mass Ejections</h3>
      </Button>
      <Button id={"set-show"} onSetShow={onSetShow} btnClass={"btn-potd"} btnText={text} />
      <div className={show ? 'potd-info set-show' : 'potd-info'}>
        <h3>{data.title}</h3>
        <p>{data.date}</p>
        <p>{data.explanation}</p>
      </div>
    </div>
  );
}

export default App;
