import React from 'react';
import classNames from 'classnames';

import * as helpers from 'modules/helpers';
import Spinner from 'modules/spinner';

class Image extends React.Component {

  state = {
    loaded: false,
    finished: false,
  }

  componentDidMount() {
    setTimeout(() => this.preLoad(this.props.src));
  }

  preLoad(src) {
    // preload
    helpers.preloadImage(src)
      .then(() => {
        this.setState({ loaded: true });
        this.props.onload();
      });
  }

  checkLoaded = () => {
    console.log('checkLoaded called in Image');
    if (this.state.loaded) {
      this.setState({ finished: true });
      this.props.onFinish();
    }
  }

  render() {
    const { src, className, background } = this.props;
    const { loaded, finished } = this.state;
    const classes = [
      'image',
      className,
      background ? 'image--background' : 'image--img',
      !loaded ? 'image--loading' : 'image--loaded'
    ];

    return (
      <div className={classNames(classes)}>
        {background &&
          <div className="image__bg" style={{ backgroundImage: `url(${src})`}} />
        }
        {!background &&
          <img className="image__img" src={src} alt={this.props.alt} />
        }
        {!finished &&
          <Spinner animate onLoop={this.checkLoaded} />
        }
      </div>
    );
  }
}

export default Image;
