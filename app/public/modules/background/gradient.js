import React from 'react';
import classNames from 'classnames';

class Gradient extends React.Component {
  render() {
    const classes = [
      'gradient',
      'gradient--' + this.props.name,
    ];
    return (
      <div className={classNames(classes)} />
    );
  }
}

export default Gradient;
