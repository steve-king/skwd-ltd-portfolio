import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

class Transition extends React.Component {
  render() {
    return (
      <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
        {this.props.children}
      </CSSTransitionGroup>
    );
  }
}

export default Transition;