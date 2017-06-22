import React from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'parallax-js';
import classNames from 'classnames';

import Button from 'modules/button';
import Hexagons from 'modules/hexagons';
import Image from 'modules/image';

class Home extends React.Component {

  state = {
    dataLoaded: false,
    imagesLoaded: false,
  }

  componentDidMount() {
    this.props.getData()
    .then(() => this.setState({ dataLoaded: true }));
  }

  onImagesLoaded() {
    this.setState({ imagesLoaded: true });
    this.doParallax();
  }

  doParallax() {
    const scene = this.refs.scene;
    const parallax = new Parallax(scene);
  }

  render() {
    const { data } = this.props;
    const { imagesLoaded, dataLoaded } = this.state;
    return (
      <div className={classNames('template template--home', !imagesLoaded ? 'loading' : '')}>
        <div className="parallax-scene" ref="scene">
          <div className="parallax-scene__item layer" data-depth="0.5">
            <div className="parallax-scene__item__inner">
              {dataLoaded &&
                <Image background className="template--home__image"
                       content={data.images} onload={() => this.onImagesLoaded()} />
              }
            </div>
          </div>
          <Hexagons ready={imagesLoaded} />
        </div>
        <main className="template__main">
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
