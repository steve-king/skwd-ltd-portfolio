import React from 'react';
import classNames from 'classNames';
import Parallax from 'vendor/parallax-js';

import Image from 'modules/image';
import Gradient from './gradient';
import Hexagons from './hexagons';

export default class extends React.Component {

  onImageLoaded = () => {
    this.setState({ imageLoaded: true });    
  }

  onImageFinished = () => {
    this.setState({ imageFinished: true });
    this.props.onLoad();
    if (this.props.parallax) {
      setTimeout(() => this.doParallax(), 500);
    }
  }

  doParallax() {
    const scene = this.refs.scene;
    const parallax = new Parallax(scene);
  }

  render () {
    const { parallax, gradient, hexagons, blend, image, imageSrc, additions, ready } = this.props;
    const classes = [
      'background', 'absolute--fill', 'home__bg', 
      parallax ? 'parallax-scene' : '',
      ready ? 'ready' : ''];

    return (
      <div className={classNames(classes)} ref="scene">
        {gradient && <Gradient type={blend} name={gradient} />}
        {image && 
          <div className="parallax-scene__item layer" data-depth="0.5">
            <Image background className="background__image"
                src={imageSrc} 
                onLoad={this.onImageLoaded} 
                onFinish={this.onImageFinished} />
          </div>
        }
        {hexagons && <Hexagons type="overlay" ready={ready} />}
        {additions && 
          <div className="parallax-scene__item layer layer--hex" data-depth="1.5">
            {additions}
          </div>
        }
       </div>
    );
  }
}