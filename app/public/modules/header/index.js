import React from 'react';
import classNames from 'classnames';

const Header = ({ children, className }) => {
  return (
    <header className={classNames('header', 'header--' + className)}>
      {children}
    </header>
  );
}

export default Header;
