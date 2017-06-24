import React from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'vendor/parallax-js';
import classNames from 'classnames';

import template from 'modules/template';

import { getRandomItem } from 'modules/helpers';
import Button from 'modules/button';
import Hexagons from 'modules/hexagons';
import Image from 'modules/image';

class Home extends React.Component {

  state = {
    imageUrl: null,
    imageLoaded: false,
    imageFinished: false,
  }

  componentWillUpdate(newProps) {
    if (!this.props.loaded && newProps.loaded && newProps.data.images) {
      this.setState({
        imageUrl: getRandomItem(newProps.data.images).url
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
    const { data, loaded } = this.props;
    const { imageUrl, imageLoaded, imageFinished } = this.state;
    return (
      <div className={classNames('template template--home', !imageLoaded ? 'loading' : '', 'transition-item')}>
        <div className="parallax-scene" ref="scene">
          <div className="parallax-scene__item layer" data-depth="0.5">
            <div className="parallax-scene__item__inner">
              {loaded && imageUrl &&
                <Image background className="template--home__image"
                       src={imageUrl} onLoad={this.onImageLoaded} onFinish={this.onImageFinished} />
              }
            </div>
          </div>
          <Hexagons type="overlay" ready={imageLoaded} />
          <div className="parallax-scene__item layer layer--hex" data-depth="1.5">
            <div className="template--home__hex" />
          </div>
        </div>
        <main className="template--home__main">
          {loaded &&
            <div className="template--home__content">
              <span className="icon--large icon-hex-logo"/>
              <div>
                <h1 className="title title--large">{data.title}</h1>
                <p className="subtitle">
                  <span>{data.body}</span>
                </p>
              </div>
            </div>
          }
          <nav className="template--home__nav">
            <Link to="/about" className="template--home__nav__btn--about">
              <Button type="hexFill" colour="white" size="xl" text="About me" icon="chevron" direction="down" />
            </Link>
            <Link to="/projects" className="template--home__nav__btn--projects">
              <Button type="hexFill" colour="white" size="xl" text="Projects" icon="chevron" direction="right" />
            </Link>
          </nav>
        </main>
      </div>
    );
  }
};

export default template(Home);
