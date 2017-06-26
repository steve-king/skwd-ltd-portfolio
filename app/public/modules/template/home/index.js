import React from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'vendor/parallax-js';
import classNames from 'classnames';

import { getRandomItem } from 'modules/helpers';
import { IconButton, HexButton } from 'modules/button';
import Hexagons from 'modules/hexagons';
import Image from 'modules/image';

class Home extends React.Component {

  state = {
    imageUrl: null,
    imageLoaded: false,
    imageFinished: false,
  }

  componentWillUpdate(newProps) {
    if (!this.props.loaded && newProps.content) {
      this.setState({
        imageUrl: getRandomItem(newProps.content.images).url
      });
    }
  }

  onImageLoaded = () => {
    this.setState({ imageLoaded: true });
    // this.doParallax();
  }

  onImageFinished = () => {
    this.setState({ imageFinished: true });
    this.doParallax();
  }

  doParallax() {
    const scene = this.refs.scene;
    const parallax = new Parallax(scene);
  }

  render() {
    const { content, loaded } = this.props;
    const { imageUrl, imageLoaded, imageFinished } = this.state;
    return (
      <div className={classNames('grid--fill', 'home', !imageLoaded ? 'loading' : '')}>
        <div className="grid--fill home__bg">
          <div className="parallax-scene" ref="scene">
            <div className="parallax-scene__item layer" data-depth="0.5">
              <div className="parallax-scene__item__inner">
                {loaded && imageUrl &&
                  <Image background className="home__image"
                        src={imageUrl} onLoad={this.onImageLoaded} onFinish={this.onImageFinished} />
                }
              </div>
            </div>
            <Hexagons type="overlay" ready={imageLoaded} />
            <div className="parallax-scene__item layer layer--hex" data-depth="1.5">
              <div className="home__hex" />
            </div>
          </div>
        </div>
        <main className="grid--fill grid--container home__main">
          {loaded && content &&
            <div className="home__content">
              <span className="icon--large icon-hex-logo"/>
              <div>
                <h1 className="title title--large">{content.title}</h1>
                <p className="subtitle">
                  <span>{content.body}</span>
                </p>
              </div>
            </div>
          }
          <nav className="home__nav">
            <HexButton action="/about" 
              className="home__nav__btn--about" 
              large 
              text="About me" 
              direction="down" 
            />
            <HexButton action="/projects" 
              className="home__nav__btn--projects" 
              large 
              text="Projects" 
              direction="right" 
            />
          </nav>
        </main>
      </div>
    );
  }
};

export default Home;
