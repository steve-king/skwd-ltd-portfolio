import React from 'react';
import classNames from 'classnames';

export const Button = ({ type, colour, text, className, icon, direction }) => {
  const buttonClass = 'button--' + type;
  const colourClass = 'button--' + colour;
  const iconClass = buttonClass + '__icon';
  return (
    <div className="button__container">
      <span className={classNames(buttonClass, colourClass, className)}>
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
