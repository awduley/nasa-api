import React, { useEffect, useRef, useState } from 'react';
import './clock.scss';

const Clock = ({ className }) => {

  const [isTransparent, setIsTransparent] = useState(true);

  const getSecond = useRef();
  const getMinute = useRef();
  const getHour = useRef();

  const setRotation = (hand, rotation) => {
    hand.style.setProperty('--rotation', rotation * 360);
  }

  const setClock = () => {
    const currentDate = new Date();
    const currentSeconds = currentDate.getSeconds() / 60;
    const currentMinutes = (currentSeconds + currentDate.getMinutes()) / 60;
    const currentHours = (currentMinutes + currentDate.getHours()) / 12;

    setRotation(getSecond.current, currentSeconds);
    setRotation(getMinute.current, currentMinutes);
    setRotation(getHour.current, currentHours);
  }
    
  useEffect(() => {
    const myInterval = setInterval(setClock, 1000);

    return () => clearInterval(myInterval);
  }, []);

  const setTransparent = () => {
    setIsTransparent(true)
  }

  const setSolid = () => {
    setIsTransparent(false);
  }
  

  return (
    <section className={className}>
      <div onClick={setTransparent} className={isTransparent ? "clock-opacity transparent scale" : "clock-opacity transparent"}><p>Transparent</p></div>
      <div onClick={setSolid} className={isTransparent ? "clock-opacity solid" : "clock-opacity solid scale"}><p>Solid</p></div>
      <div className={isTransparent ? "clock-container" : "clock-container clock-solid"}>
        <div className="hand hour" ref={getHour}></div>
        <div className="hand minute" ref={getMinute}></div>
        <div className="hand second" ref={getSecond}></div>
        <div className="number number1">I</div>
        <div className="number number2">II</div>
        <div className="number number3">III</div>
        <div className="number number4">IV</div>
        <div className="number number5">V</div>
        <div className="number number6">VI</div>
        <div className="number number7">VII</div>
        <div className="number number8">VIII</div>
        <div className="number number9">IX</div>
        <div className="number number10">X</div>
        <div className="number number11">XI</div>
        <div className="number number12">XII</div>
      </div>
    </section>
  )
}

export default Clock;