import React, { useEffect, useRef } from 'react';

const Clock = () => {

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
    setInterval(setClock, 1000);
  });
  

  return (
    <div className="clock-container">
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
  )
}

export default Clock;