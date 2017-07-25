import React from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'vendor/parallax-js';
import classNames from 'classnames';

import withResource from 'modules/resource';
import { getRandomItem } from 'modules/helpers';
import Background from 'modules/background';
import { IconButton, HexButton } from 'modules/button';

class Home extends React.Component {

  state = {
    imageSrc: null,
    imageLoaded: false,
    imageFinished: false,
  }

  componentWillUpdate(newProps) {
    if (!this.props.dataLoaded && newProps.dataLoaded) {
      this.setState({
        imageSrc: getRandomItem(newProps.data.images).url
      });
    }
  }

  onImageLoaded = () => {
    this.setState({ imageLoaded: true });
  }

  render() {
    const { data, routeWillChange } = this.props;
    const { imageSrc, imageLoaded } = this.state;
    return (
      <div className="grid--fill home">
        <Background parallax ready={imageLoaded && !routeWillChange}
          hexagons blend="overlay" 
          image imageSrc={imageSrc} onLoad={this.onImageLoaded}
          additions={<div className="home__hex" />} />
        <main className="grid--fill grid--container home__main">
          <div className="home__content">
            <span className="icon icon--hexLogo"/>
            <div className="home__content__text">
              <h1 className="title title--large">{data.title}</h1>
              <p className="subtitle">
                <span>{data.body}</span>
              </p>
            </div>
          </div>
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

export default withResource(Home);
