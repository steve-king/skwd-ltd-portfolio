import React from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'vendor/parallax-js';
import classNames from 'classnames';

import { getRandomItem } from 'modules/helpers';
import Button from 'modules/button';
import Hexagons from 'modules/hexagons';
import Image from 'modules/image';

class Home extends React.Component {

  state = {
    imagesLoaded: false,
    imageUrl: null,
  }

  componentDidMount = () => this.props.getData()

  componentWillUpdate(newProps) {
    if (!this.props.loaded && newProps.loaded && newProps.data.images) {
      this.setState({
        imageUrl: getRandomItem(newProps.data.images).url
      });
    }
  }

  onImageLoaded = () => {
    this.setState({ imageLoaded: true });
    this.doParallax();
  }

  doParallax() {
    const scene = this.refs.scene;
    const parallax = new Parallax(scene);
  } 

  render() {
    const { data, loaded } = this.props;
    const { imageUrl, imageLoaded } = this.state;
    return (
      <div className={classNames('template template--home', !imageLoaded ? 'loading' : '')}>
        <div className="parallax-scene" ref="scene">
          <div className="parallax-scene__item layer" data-depth="0.5">
            <div className="parallax-scene__item__inner">
              {loaded && imageUrl &&
                <Image background className="template--home__image"
                       src={imageUrl} onFinish={this.onImageLoaded} />
              }
            </div>
          </div>
          <Hexagons ready={imageLoaded} />
          <div className="parallax-scene__item layer layer--hex" data-depth="1.5">
            <div className="template--home__hex" />
          </div>
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
              <Button type="hexFill" text="About me" icon="chevron" direction="down" />
            </Link>
            <Link to="/projects" className="nav__btn nav__btn--projects">
              <Button type="hexFill" text="Projects" icon="chevron" direction="right" />
            </Link>
          </nav>
        </main>
      </div>
    );
  }
};

export default Home;
