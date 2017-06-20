import React from 'react';

export const Button = ({ text, className }) => {
  return (
    <span className={'button'}>
      <span className="button__text">{text}</span>
    </span>
  );
};

export default Button;
