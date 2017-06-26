import React from 'react';
import classNames from 'classnames';

export const Button = ({ type, colour, size, text, className, icon, direction, active }) => {
  const buttonClass = 'button--' + type;
  const sizeClass = 'button__container--' + size || '';
  const colourClass = 'button--' + colour;
  const iconClass = buttonClass + '__icon';
  const activeClass = active ? 'button--active' : '';
  return (
    <div className={classNames('button__container', sizeClass)}>
      <span className={classNames(buttonClass, colourClass, activeClass, className)}>
        <span className={buttonClass + '__bg'} />
        <span className={buttonClass + '__text'}>{text}</span>
        {icon &&
          <span className={classNames(iconClass, iconClass + '--' + direction)}>
            <span className={classNames(
              `icon--${icon}`,
              direction ? `icon--${icon}--${direction}` : '',
            )}/>
          </span>
        }
      </span>
    </div>
  );
};

export default Button;
