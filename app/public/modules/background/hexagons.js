import React from 'react';
import classNames from 'classnames';

class FlyingHexagons extends React.Component {

  render() {
    const { ready, overlay, type } = this.props;
    const classes = [
      'hexagons', 
      ready ? '' : 'start-position',
      type ? `hexagons--${type}` : ''
    ];

    // console.log('hexagons ready', ready);
    return (
      <div className={classNames(classes)}>
        <div className="hex hex__01" />
        { type === 'overlay' &&
          <div className="hex hex__01" />
        }
        <div className="hex hex__02" />
        { type === 'overlay' &&
          <div className="hex hex__02" />
        }
        {/* <div className="hex hex__03" /> */}
        {/* <div className="hex hex__04" /> */}
      </div>
    );
  }
}

export default FlyingHexagons;
