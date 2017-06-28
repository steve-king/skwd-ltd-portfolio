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

  componentWillUpdate(next) {
    if (this.props.src !== next.src) {
      this.preLoad(next.src);
    }
  }

  preLoad(src) {
    if (src) {
      helpers.preloadImage(src)
        .then(() => {
          this.setState({ loaded: true });
          if (typeof this.props.onLoad === 'function'){
            this.props.onLoad();
          }
        });
    }
  }

  checkLoaded = () => {
    if (this.state.loaded) {
      this.setState({ finished: true });
      if (typeof this.props.onFinish === 'function'){
        this.props.onFinish();
      }
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
        {!finished &&
          <Spinner animate onLoop={this.checkLoaded} />
        }
        {background &&
          <div className="image__bg" style={{ backgroundImage: `url(${src})`}} />
        }
        {!background &&
          <img className="image__img" src={src} alt={this.props.alt} />
        }
      </div>
    );
  }
}

export default Image;
