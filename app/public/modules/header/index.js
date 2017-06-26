import React from 'react';
import classNames from 'classnames';

const Header = ({ button, children, titleLoaded, position, hideButtonDesktop, hideTitleDesktop }) => {
  const classes = [
    'header', 
    position ? 'header--' + position : '',
    hideButtonDesktop ? 'header--hideButtonDesktop' : '',
    hideTitleDesktop ? 'header--hideTitleDesktop' : '',
  ];
  return (
    <header className={classNames(classes)}>
      {button}
      {children && <h1 className="header__title">{children}</h1>}
    </header>
  );
}

export default Header;
