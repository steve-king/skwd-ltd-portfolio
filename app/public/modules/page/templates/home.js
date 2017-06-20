import React from 'react';
import { Link } from 'react-router-dom';


import Button from 'modules/button';
import Slideshow from 'modules/slideshow';

class Home extends React.Component {

  render() {
    const { content } = this.props;
    return (
      <div className="page__template template--home">
        <Slideshow content={content.images} />
        <main className="container template--home__main">
          <div className="template--home__content">
            <span className="icon--large icon-hex-logo"/>
            <div>
              <h1 className="title title--large">
                Stephen King
              </h1>
              <p className="subtitle">
                <span>Javascript App Developer | London</span>
              </p>
            </div>
          </div>
          <nav className="nav template--home__nav">
            <Link to="/about">
              <Button text="About me" />
            </Link>
          </nav>
        </main>
      </div>
    );
  }

};

export default Home;
