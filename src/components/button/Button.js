import React from 'react';
import './button.scss';

const Button = ({ children, id, btnClass, btnText, onSetShow }) => {
  return (
    <button id={id} onClick={onSetShow} className={btnClass} data-testid="button">
      {children}
      <p className="read-more">{btnText}</p>
    </button>
  )
}

export default Button;