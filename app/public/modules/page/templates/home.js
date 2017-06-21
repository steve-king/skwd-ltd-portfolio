import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'modules/button';
import Hexagons from 'modules/hexagons';
import Image from 'modules/image';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  onReady(ready) {
    this.setState({ ready });
  }

  imagesLoaded() {
    this.onReady(true);
  }

  render() {
    const { content } = this.props;
    const { ready } = this.state;
    return (
      <div className="template template--home">
        {content &&
          <Image
            background
            className="template--home__image" content={content.images}
            onload={() => this.imagesLoaded()}
          />
        }
        <Hexagons ready={ready} />
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
        </main>
        <nav className="nav template--home__nav">
          <Link to="/about" className="template--home__btn--about">
            <Button text="About me" chevron direction="down" />
          </Link>
          <Link to="/projects" className="template--home__btn--projects">
            <Button text="Projects" chevron direction="right" />
          </Link>
        </nav>
      </div>
    );
  }

};

export default Home;
