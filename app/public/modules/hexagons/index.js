import React from 'react';
import classNames from 'classnames';

class FlyingHexagons extends React.Component {
  componentDidMount() {
    setTimeout(() => this.setState({
      rendered: true
    }));
  }

  render() {
    const { ready } = this.props;
    const classes = [
      'hexagons',
      ready ? 'idle' : 'start-position',
    ];
    return (
      <div className={classNames(classes)}>
        <div className="hex hex__01" />
        <div className="hex hex__01" />
        <div className="hex hex__02" />
        <div className="hex hex__02" />
        {/* <div className="hex hex__03" /> */}
        {/* <div className="hex hex__04" /> */}
      </div>
    );
  }
}

export default FlyingHexagons;
