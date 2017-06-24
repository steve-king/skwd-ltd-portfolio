import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Header = ({ href, button, title, position }) => {
  return (
    <header className={classNames('header', 'header--' + position)}>
      <Link to={href} className="header__link">
        {button}
      </Link>
      {title && <h1 className="header__title">Projects</h1>}
    </header>
  );
}

export default Header;
