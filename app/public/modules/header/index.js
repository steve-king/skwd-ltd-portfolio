import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Header = ({ href, button, children, titleLoaded, position, hideButtonDesktop, hideTitleDesktop }) => {
  const classes = [
    'header', 
    'header--' + position,
    hideButtonDesktop ? 'header--hideButtonDesktop' : '',
    hideTitleDesktop ? 'header--hideTitleDesktop' : '',
  ];
  return (
    <header className={classNames(classes)}>
      <Link to={href} className="header__btn">
        {button}
      </Link>
      {children && <h1 className="header__title">{children}</h1>}
    </header>
  );
}

export default Header;
