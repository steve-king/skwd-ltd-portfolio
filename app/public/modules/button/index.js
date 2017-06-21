import React from 'react';
import classNames from 'classnames';

export const Button = ({ text, className, chevron, direction }) => {
  return (
    <span className={classNames('button', className)}>
      <span className="button__bg" />
      <span className="button__text">{text}</span>
      {chevron &&
        <span className={classNames('button__icon', 'button__icon--' + direction)}>
          <span className={classNames(
            'icon-chevron',
            'icon-chevron--white',
            'icon-chevron--' + direction
          )}/>
        </span>
      }
    </span>
  );
};

export default Button;
