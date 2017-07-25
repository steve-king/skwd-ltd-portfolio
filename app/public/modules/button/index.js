import React from 'react';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const ButtonWrapper = ({action, className, children}) => {
  const classes = classNames('button', className);
  if (action === 'submit') {
    return (
      <button type="submit" className={classes}>
        {children}
      </button>
    );
  }
  else if (typeof action === 'function') {
    return (
      <button type="button" onClick={action} className={classes}>
        {children}
      </button>
    );
  }
  else if (typeof action === 'string') {
    if (action.indexOf('http') === 0 || action.indexOf('mailto:') === 0) {
      // External link
      return (
        <a href={action} className={classes} target="_blank">
          {children}
        </a>
      );
    } else {
      return (
        <Link to={action} className={classes}>
          {children}
        </Link>
      );
    }
  }
}

const HexButton = ({ action, text, icon, active, large, direction, className }) => {
  const buttonClass = 'hexButton';
  const activeClass = active ? `active` : '';
  const largeClass = large ? `${buttonClass}--large` : '';
  return (
    <ButtonWrapper className={classNames(className, activeClass)} action={action}>
      <span className={classNames(buttonClass, largeClass)}>
        {text && !icon &&
          <span className={`${buttonClass}__text`}>{text}</span>
        }
        {icon &&
          <span className={`${buttonClass}__icons`}>
            <span className={`${buttonClass}__icon icon icon--${icon}`}>{text}</span>
            <span className={`${buttonClass}__icon active icon icon--${icon}--white`}>{text}</span>
          </span>
        }
        {direction && 
          <span className={`${buttonClass}__chevron--${direction}`} />
        }
      </span>
    </ButtonWrapper>
  );
};

HexButton.propTypes = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  large: PropTypes.bool
}

const IconButton = ({action, icon, text, direction, className}) => {
  const buttonClass = 'iconButton';
  return (
    <ButtonWrapper className={className} action={action}>
      <span className={classNames(buttonClass)}>
        <span className={`${buttonClass}__icon icon--${icon}`}>{text}</span>
        {direction && 
          <span className={`${buttonClass}__chevron--${direction}`} />
        }
      </span>
    </ButtonWrapper>
  );
}

IconButton.propTypes = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

export { HexButton, IconButton };