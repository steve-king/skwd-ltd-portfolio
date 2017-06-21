import React from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'parallax-js';
import classNames from 'classnames';

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

  componentDidMount() {

  }

  onReady(ready) {
    this.setState({ ready });
    this.doParallax();
  }

  imagesLoaded() {
    this.onReady(true);
  }

  doParallax() {
    const scene = this.refs.scene;
    const parallax = new Parallax(scene);
  }

  render() {
    const { content } = this.props;
    const { ready } = this.state;
    const loading = !ready;
    return (
      <div className={classNames('template template--home', loading ? 'loading' : '')}>
        <div className="parallax-scene" ref="scene">
          {content &&
            <div className="parallax-scene__item layer" data-depth="0.5">
              <div className="parallax-scene__item__inner">
                <Image
                  background
                  className="template--home__image" content={content.images}
                  onload={() => this.imagesLoaded()}
                />
              </div>
            </div>
          }
          <Hexagons ready={!loading} />
        </div>
        <main className="template--home__main">
          <div className="grid-container">
            <div className="content">
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
          </div>
          <nav className="nav">
            <Link to="/about" className="nav__btn nav__btn--about">
              <Button text="About me" chevron direction="down" />
            </Link>
            <Link to="/projects" className="nav__btn nav__btn--projects">
              <Button text="Projects" chevron direction="right" />
            </Link>
          </nav>
        </main>

      </div>
    );
  }
};

export default Home;
