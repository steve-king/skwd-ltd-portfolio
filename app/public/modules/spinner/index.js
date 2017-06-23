import React from 'react';
import classNames from 'classnames';

class Spinner extends React.Component {

  componentDidMount() {
    this.refs.spinner.addEventListener('animationiteration', this.onLoop);
  }

  onLoop = (e) => {
    if (typeof this.props.onLoop === 'function') {
      this.props.onLoop();
    }
  }

  render() {
    const animateClass = this.props.animate ? 'spinner--animate' : '';
    return (
      <div className={classNames('spinner', animateClass)} ref="spinner" />
    );
  }
}

export default Spinner;
