import React from 'react';
import PropTypes from 'prop-types';
import isEmptyObject from 'is-empty-object';
import classNames from 'classnames';

const animationDelay = 1200;

const withResource = (WrappedComponent) => {
  return class extends React.Component {
    
    static propTypes = {
      resourceUrl: PropTypes.string.isRequired,
      wait: PropTypes.number
    }
    
    state = {
      error: false,
      data: {},
      dataLoaded: false,
      dataRendered: false,
      routeWillChange: false,
    }

    componentDidMount = () => {
      this.mounted = true;
      // Delay allows us to wait for the page transition to complete (app.js)
      setTimeout(() => this.getData(this.props.resourceUrl), this.props.wait);
      
    }

    componentWillLeave = () => {
      console.log('componentWillLeave');
    }

    componentWillUnmount = () => {
      this.mounted = false;
    }

    componentDidUpdate = () => {
      // Update dataRendered prop
      // (allows 'unloaded' data items to render before CSS transition starts)
      if (this.state.dataLoaded && !this.state.dataRendered) {
        setTimeout(() => this.setState({ dataRendered: true }), 50);
      }

      const { history, location } = this.props;
      if (
        // this.state.dataRendered && 
        history.location.pathname !== location.pathname
        && !this.state.routeWillChange
      ) {
        console.log('route will change');
        this.setState({
          routeWillChange: true
        });
      }
    }
  
    getData = (url) => {
      console.log('fetchData', url);
      fetch(url).then(
        response => response.json(),
        error => this.setState({ error })
      ).then(data => 
        this.mounted && 
          this.setState({ data, dataLoaded: true })
      );     
    }

    render = () => {
      const classes = [
        'resource',
        !this.state.dataRendered ? 'loading' : '',
        this.state.routeWillChange ? 'leaving' : '',
        'grid--fill',
      ];
      return (
        <div className={classNames(classes)}>
          <WrappedComponent {...this.state}/>
        </div>
      );
    }
  }
}

export default withResource;