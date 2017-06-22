import React from 'react';
import classNames from 'classnames';

import * as helpers from 'modules/helpers';

class Image extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      imageSrc: null,
    }
  }

  componentDidMount() {
    setTimeout(() => this.loadImage(this.props.content));
  }

  loadImage(images) {
    // select random image
    const imageUrl = helpers.getRandomItem(images).url;

    // preload
    helpers.preloadImage(imageUrl)
      .then(() => {
        this.setState({ imgSrc: imageUrl });
        this.props.onload();
      });
  }

  render() {
    const { imgSrc } = this.state;
    const { background, className } = this.props;
    const classes = [
      'image',
      className,
      background ? 'image--background' : 'image--img',
      !imgSrc ? 'image--loading' : 'image--loaded'
    ];

    return (
      <div className={classNames(classes)}>
          {background &&
            <div className="image__bg"
                 style={{ backgroundImage: imgSrc ? `url(${imgSrc})` : 'none' }} />
          }
          {!background &&
            <img className="image__img"
                 src={imgSrc ? imgSrc : null }
                 alt={this.props.alt} />
          }
      </div>
    );
  }
}

export default Image;
